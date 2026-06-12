const { required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true
        },
        personal_id: {
            type: String,
            required: true,
            validate: {
                validator: function(n) {
                    return /^\d+$/.test(n)
                },
                message: props => `${props.value} is not a valid personal id!`
            }
        },
        birth_date: {
            type: Date,
            required: true
        },
        phone_number: {
            type: String,
            required: true,
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
        house_number: {
            type: String,
            required: true
        }
    },
    {
       timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);