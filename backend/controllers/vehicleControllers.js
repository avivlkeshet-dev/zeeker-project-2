const Joi = require('joi');

const vehicleValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        shortDescription: Joi.string().allow('', null).optional(),
        imageUrl: Joi.string().allow('', null).optional(),
        price: Joi.number().optional(),
        category: Joi.string().allow('', null).optional(),
        features: Joi.array().items(Joi.string()).optional(),
        location: Joi.object({
            name: Joi.string().allow('', null).optional(),
            address: Joi.string().required(),
            lat: Joi.number().min(-90).max(90).required(),
            lng: Joi.number().min(-180).max(180).required()
        }).required()
    })
    return schema.validate(data);
};

module.exports = { vehicleValidation };