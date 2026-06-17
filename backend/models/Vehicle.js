const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
     userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    features: [String],
    location: {
        name: String,
        address: String,
        lat: Number,
        lng: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);