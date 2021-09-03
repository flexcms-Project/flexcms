const joi = require('joi');

exports.userRegisterValidation = (data) => {
    const schema = joi.object({
        name: joi.string()
            .min(6)
            .required(),
        email: joi.string()
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required(),
        role : joi.string()
            .required(),
    });

    //VALIDATE DATA
    return schema.validate(data);
}

exports.adminLoginValidation = (data) => {
    const schema = joi.object({
        email: joi.string()
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required() 
    });

    //VALIDATE DATA
    return schema.validate(data);
}

exports.postCreateValidation = (data) => {
    const schema = joi.object({
        thumbnail: joi.string()
            .required(),
        title: joi.string()
            .required()
            .min(6)
            .max(255),
        content: joi.string()
            .required()
            .min(6)
            .max(5128),
        description: joi.string()
            .required()
            .min(100)
    })

    //VALIDATE DATA
    return schema.validate(data);
}