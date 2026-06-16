const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        personalId: {
            type: String,
            required: true,
            validate: {
                validator: function(n) {
                    return /^\d+$/.test(n)
                },
                message: props => `${props.value} is not a valid personal id!`
            }
        },
        birthDate: {
            type: Date,
            required: true
        },
        phone: {
            type: String,
            validate: {
                validator: function(n) {
                    return /^\d+$/.test(n)
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        email: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        houseNumber: {
            type: String,
            required: true
        },
        plateNumber: {
            type: String,
            required: true
        },
        driversLicense: {
            data: {
                type: Buffer,
                required: true
            },
            contentType: {
                type: String,
                required: true
            }
        }
    },
    {
       timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);