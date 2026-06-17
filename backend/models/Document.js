const { required } = require('joi');
const mongoose = require('mongoose');

const DOCUMENT_FILE_TYPES = ['myDocs', 'zeekrDocs', 'orderDocs'];

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
        enum: DOCUMENT_FILE_TYPES,
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

DocumentSchema.statics.FILE_TYPES = DOCUMENT_FILE_TYPES;

module.exports = mongoose.model('Document', DocumentSchema);