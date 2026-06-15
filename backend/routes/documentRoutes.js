const upload = require('../controllers/documentController');
const express = require('express');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Document = require('../models/Document');
const { Readable } = require('stream');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/api/documents', upload.single('document'), async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: 'נדרש להעלות לפחות קובץ אחד' });
        }

        let scannedText = '';
        const mimeType = req.file.mimetype;

        if(mimeType === 'application/pdf') {
            const pdfData = await pdfParse(req.file.buffer);
            scannedText = pdfData.text;
        }
        else if(mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                || mimeType === 'application/msword') {
            const result = await mammoth.extractRawText({ buffer: req.file.buffer });
            scannedText = result.value;
        }

        // const uplouadDir = path.join(__dirname, '../uploads');

        // if(!fs.existsSync(uplouadDir)) {
        //     fs.mkdirSync(uplouadDir, { recursive: true });
        // }

        // const uniqueFileName = `${Date.now()}-${req.file.originalname}`;
        // const filePath = path.join(uplouadDir, uniqueFileName);

        // fs.writeFileSync(filePath, req.file.buffer);

        // const generateFileUrl = `/uploads/${uniqueFileName}`;

        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'user_docs'
        });

        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            contentType: mimeType
        });

        // converts the buffer into a readable stream in order to pipe it into the bucket
        await new Promise((resolve, reject) => {
            Readable.from(req.file.buffer)
                .pipe(uploadStream)
                .on('error', reject)
                .on('finish', resolve);
        });

        const fileId = uploadStream.id;

        const generateFileUrl = `api/docs/download/${fileId}`;

        const newDoc = new Document({
            userId: req.body.userId,
            fileName: req.file.originalname,
            fileId: fileId,
            fileUrl: generateFileUrl,
            fileType: mimeType,
            extractedText: scannedText
        });

        await newDoc.save();

        res.status(200).json({
            message: 'קבצים הועלו ונבדקו בהצלחה!',
            document: newDoc
        });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בזמן תהליך', error: error.message });
    }
});

router.get("/api/documents/:userId", async (req,res) => {
    try {
        const { userId } = req.params;
        const userDocuments = await Document.find({ userId: userId });
        res.status(200).json(userDocuments);
    } catch(error) {
        res.status(500).json({ message: 'שגיאת שרת', error: error.message });
    }
})

router.get('/api/documents/download/:fileId', async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'user_docs'
        });

        const fileId = new mongoose.Types.ObjectId(req.params.fileId);

        const files = await bucket.find({
            _id: fileId
        }).toArray();

        if(!files || files.length === 0) {
            return res.status = (404).json({
                message: 'הקובץ לא נמצא'
            });
        }

        const fileMetaData = files[0];

        res.set('Content-Type', fileMetaData.contentType);
        res.set('Content-Disposition', `inline; filename="${encodeURIComponent(fileMetaData.filename)}"`);

        const downloadStream = bocket.openDownloadStream(fileId);
    } catch (error) {
        res.status(500).json({
            message: 'שגיאה בהורדת קובץ',
            error: error.message
        });
    }
})


module.exports = router;