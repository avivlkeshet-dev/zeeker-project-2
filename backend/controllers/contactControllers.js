const Joi = require('joi');

const contactValidation = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().optional(),
        subject: Joi.string().required(),
        message: Joi.string().max(400).required()
    })
    return schema.validate(data);
}

module.exports = {
    contactValidation
};