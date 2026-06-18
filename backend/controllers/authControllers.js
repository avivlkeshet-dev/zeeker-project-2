const Joi = require('joi');
const User = require('../models/User');
const { Schema } = require('mongoose');
const jwt = require('jsonwebtoken');

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        personalId: Joi.string().min(9).max(9).required(),
        birthDate: Joi.date().required(),
        phone: Joi.string().min(10).max(10).required(),
        email: Joi.string().required().email(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.string().required(),
        plateNumber: Joi.string().min(8).max(8).required()
        // password: Joi.string().min(8).max(128)
        //     .pattern(new RegExp('^(?=.*[A-Z])'))
        //     .pattern(new RegExp('^(?=.*[0-9])'))
        //     .pattern(new RegExp('^(?=.*[!@#\$%\^&\*])'))
        //     .required()
        //     .messages({
        //         'string.pattern.base': 'Password must contain at least one uppercase, one number and one special character',
        //         'string.min': 'password must be at least 8 characters long',
        //         'any.required': 'password is required'
        //     })
    });
    return schema.validate(data);
}

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: 'גישה נדחתה: משתשמ לא מחובר'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(403).json({
            message: 'טוקן לא תקף'
        });
    }
}

module.exports = {
    registerValidation,
    requireAuth
};