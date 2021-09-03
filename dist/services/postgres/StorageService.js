const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink);
const path = require('path');

class StorageService{
    constructor(){
    }

    async deleteProfilePictureByFileName(picture){
        if(picture != "profilepictures/default-profile-picture.jpg"){
            //delete the image file in the uploads folder
            try{
                const splitPicturePath = picture.split('/');
                const profilePicture = splitPicturePath.length == 1? splitPicturePath[0]: splitPicturePath[1];
                const picturePath = path.join(__dirname, '../../uploads/pictures/profilesPictures/', profilePicture);
                unlinkAsync(picturePath);
            }catch(err){
            }
        }
    }
}

module.exports = StorageService;