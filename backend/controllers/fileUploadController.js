const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const UploadedFile = require('../models/UploadedFile');
const { getStorageBucket } = require('../config/firebase');
const { fallbackSeedUser } = require('../config/fallbackSeedUser');

const DEBUG_USER_ID = fallbackSeedUser.personalId;

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file format. Allowed: PDF, DOC, DOCX, PNG, JPG, JPEG'));
    }

    return cb(null, true);
  },
});

async function uploadUserFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'file is required' });
    }

    const normalizedUserId = DEBUG_USER_ID;
    const bucket = getStorageBucket();
    const storagePath = `${normalizedUserId}/${Date.now()}-${uuidv4()}-${req.file.originalname}`;
    const file = bucket.file(storagePath);

    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
      public: false,
      resumable: false,
    });

    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    const uploadedFile = await UploadedFile.create({
      userId: normalizedUserId,
      fileName: req.file.originalname,
      fileUrl: signedUrl,
      fileType: req.file.mimetype,
      storagePath,
    });

    return res.status(201).json({
      message: 'File uploaded successfully',
      file: uploadedFile,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to upload file',
      error: error.message,
    });
  }
}

async function getFilesByUserId(req, res) {
  try {
    const normalizedUserId = DEBUG_USER_ID;

    const files = await UploadedFile.find({ userId: normalizedUserId }).sort({ createdAt: -1 });

    return res.status(200).json(files);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch files',
      error: error.message,
    });
  }
}

async function deleteUserFile(req, res) {
  try {
    const { fileId } = req.params;
    const normalizedUserId = DEBUG_USER_ID;

    const fileRecord = await UploadedFile.findOne({ _id: fileId, userId: normalizedUserId });

    if (!fileRecord) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (fileRecord.storagePath) {
      const bucket = getStorageBucket();
      await bucket.file(fileRecord.storagePath).delete({ ignoreNotFound: true });
    }

    await UploadedFile.deleteOne({ _id: fileRecord._id });

    return res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete file',
      error: error.message,
    });
  }
}

module.exports = {
  uploadMiddleware,
  uploadUserFile,
  getFilesByUserId,
  deleteUserFile,
};
