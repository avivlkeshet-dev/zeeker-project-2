const upload = require('../controllers/documentController');
const express = require('express');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Document = require('../models/Document');

const router = express.Router();

router.post('/api/documents', upload.single('document'), async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
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

        const newDoc = new Document({
            userId: req.body.userId,
            fileName: req.file.originalname,
            fileType: mimeType,
            extractedText: scannedText
        });

        await newDoc.save();

        res.status(200).json({
            message: 'Document uploaded and scanned successfuly',
            document: newDoc
        });
    } catch (error) {
        res.status(500).json({ message: 'Processing error', error: error.message });
    }
});

router.get("/api/documents/:userId", async (req,res) => {
    try {
        const { userId } = req.params;

        const userDocuments = await Document.find({ userId: userId });

        res.status(200).json(userDocuments);
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

module.exports = router;