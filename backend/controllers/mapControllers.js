const Joi = require('joi');

const mapValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().trim().required(),
        address: Joi.string().trim().required(),
        lat: Joi.number().min(-90).max(90).required(),
        lng: Joi.number().min(-180).max(180).required(),
        time: Joi.string().trim().required(),
        email: Joi.string().trim().required(),
        services: Joi.array().items(Joi.string().trim()).min(1).required()
    });

    return schema.validate(data);
};

module.exports = {
    mapValidation
};
