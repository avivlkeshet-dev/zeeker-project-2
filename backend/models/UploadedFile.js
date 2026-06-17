const mongoose = require('mongoose');

const uploadedFileSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    storagePath: {
      type: String,
      trim: true,
    },
    fileType: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('UploadedFile', uploadedFileSchema);
