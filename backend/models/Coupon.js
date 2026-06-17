const { required } = require('joi');
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        code: {
            type: String,
            required: true,
            trim: true,
        },
        benefits: [
            {
                type: String,
                required: true
            }
        ],
        expirationDate: {
            type: Date,
            required: true
        },
        isUsed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Coupon', couponSchema);