const Joi = require('joi');
const joi = require('joi');

const ArticleSchema = joi.object({
    thumbnail: 
        joi.string()
        .required(),
    title: 
        joi.string()
        .required(),
    titleToLowerCase: 
        joi.string()
        .required(),
    description : 
        joi.string()
        .required(),
    content: 
        Joi.string()
        .required(),
    url: 
        Joi.string()
        .required(),
});

module.exports = { ArticleSchema };