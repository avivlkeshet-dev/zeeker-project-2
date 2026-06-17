const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const { contactValidation } = require('../controllers/contactControllers');
const express = require('express');

const router = express.Router();

router.post('/api/contacts', async (req,res) => {
    const { error } = contactValidation(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {

        const { fullName, email, phone, subject, message} = req.body;

        // saving the data into the mongodb server
        const contact = new Contact({
            fullName,
            email,
            phone,
            subject,
            message,
        });
        await contact.save();
 
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: process.env.EMAIL_USER,
            subject: `צורפה הודעה חדשה: ${subject}`,
            html:
            `
                <h3>הודעה מלקוח שנשלחה מהאתר</h3>
                <p><strong>שם:</strong> ${fullName}</p>
                <p><strong>אימייל:</strong> ${email}</p>
                <p><strong>נושא:</strong> ${subject}</p>
                <p><strong>הודעה:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: 'Your message has been submitted and sent successfuly.'
        });
        
    } catch(error) {
        return res.status(500).json({
            messsage: 'Failed to process to contact submission.',
            error: error.message
        });
    }

});

router.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch(error) {
        res.status(500).json({ message: 'Faild to retrieve contacts', error: error.message });
    }
})

module.exports = router;