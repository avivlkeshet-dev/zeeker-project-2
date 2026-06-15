const { required } = require('joi');
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    extractedText: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Document', DocumentSchema);