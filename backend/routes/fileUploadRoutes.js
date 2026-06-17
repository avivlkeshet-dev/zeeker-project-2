const express = require('express');
const {
  uploadMiddleware,
  uploadUserFile,
  getFilesByUserId,
  deleteUserFile,
} = require('../controllers/fileUploadController');

const router = express.Router();

router.post('/api/files/upload', uploadMiddleware.single('file'), uploadUserFile);
router.get('/api/files/:userId', getFilesByUserId);
router.delete('/api/files/:fileId', deleteUserFile);

module.exports = router;
