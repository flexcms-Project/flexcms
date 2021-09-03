const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

// /**
//  * -------------- HELPER FUNCTIONS ----------------
//  */

/**
 * 
 * @param {*} data 
 * @param {*} _id 
 * @returns 
 */
const createPostFilter = async(data) => {
  // matching the data an splitting it using regex
  let b = data.match(/(?<=<p)(.+?)(?=\/p>)/g);

  // split the title of the article from the body
  const title = data.match(/(?<=>)(.+?)(?=<\/h)/)[0].match(/(?<=">)(.+?)(?=<\/span>)/)[0].trim();

  // convert base64 image to file, rewrite the img src with endpoint, and save the file to the uploads folder
  data = await base64ToFile(data);

  // split the thumbnail picture of the article from the body
  const thumbnail = `<img${data.match(/(?<=<img)(.*?)(?=>)/)[0]}>`;

  // defining other variable
  let description;

  // split the description of the article from the body
  let i = 0;
  while(description == null && i<b.length){
    // get the description from the content data
    if(b[i].match(/^(?!.*<img).*$/) && b[i].match(/^(?!.*<br>).*$/)){
        description = b[i].match(/(?<=>)(.+?)(?=<)/)[0].trim();
    }
    i++;
  }

  // creating the url of the post from the title that we splitted early
  const url = title.toLowerCase().trim().match(/[a-z0-9 ]/gi).join('').split(' ').join('-') + '-';
  const title_lowercase = title.toLowerCase();

  // return the data 
  return({thumbnail: thumbnail, title: title, titleToLowerCase: title_lowercase, description: description, content: data, url: url});
}

/**
 * 
 * @param {*} data 
 * @param {*} _id 
 * @returns 
 */
const base64ToFile = (data) => {
  // filtering the img from the content
  const images = data.match(/(?<=<img src=)(.+?)(?=>)/g);

  for(let i=0; i<images.length; i++){
    // Check if the array contain img div that is file or base64

    if(images[i].match(/^(?:(?!articlepictures).)*$/)){
      const base64data = images[i].match(/(?<=base64,)(.+?)(?=")/g)[0];
      const imageName = 'flexcms' + '_' + (Date.now()+i) + '_' + nanoid(16) ;

      fs.writeFile(path.join(__dirname, `../../uploads/pictures/articlesPictures/` + imageName), base64data, 'base64', (err) => {
        if(err){
          console.log(err);
        }
      });

      // Match and replace the base64 encoded img to file type
      const replace = `${images[i].split('/').join('\\/').split('+').join('\\+')}`;
      const re = new RegExp(replace,"");
      data = data.replace(re, `${`"/articlepictures/${imageName}"`}`);
    }

  }
  // return the filtered data
  return data;
}

/**
 * 
 * @param {*} data 
 */
const deleteImagesFromArticle = (data) => {
  // filter the image from the data
  const images = data.match(/(?<=<img src=)(.+?)(?=>)/g);

  if(images != null){
    for(let image of images){
      if(image.match(/^(?:(?!default-).)*$/)){
        let imageName = image.match(/(?<=")(.+?)(?=")/)[0];
  
        fs.unlink(path.join(__dirname, `../../..` + imageName), (err) => {
          if(err){
            console.log(err);
          }
        })
      }
    }
  }
  return;
}

module.exports = { createPostFilter, base64ToFile, deleteImagesFromArticle };