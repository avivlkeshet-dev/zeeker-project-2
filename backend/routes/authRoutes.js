const express = require('express');
const bcrypt = require('bcrypt');
const { registerValidation } = require('../controllers/authControlls');
const User = require('../models/User');

const router = express.Router();

router.post(`/api/users`, async (req,res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    try {
        // should not allow to duplicate the accounts
        const emailExist = await User.findOne({ email: req.body.personal_id });
        // Change { email: req.body.personal_id } to:
        const personalIdExist = await User.findOne({ personal_id: req.body.personal_id });
        if(personalIdExist) {
            return res.status(400).json({ message: 'תעודת זהות כבר קיימת'})
        }

        if(emailExist) {
            return res.status(400).json({ message: 'אימייל זה כבר קיים'})
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashPersonalId = await bcrypt.hash(req.body.personal_id, salt);

        // storea it in the database
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            personal_id: req.body.personal_id,
            birth_date: req.body.birth_date,
            phone_number: req.body.phone_number,
            email: req.body.email,
            city: req.body.city,
            street: req.body.street,
            house_number: req.body.house_number
        })

        await user.save();
        res.status(200).json({ messsage: 'משתמש נרשם בהצלחה' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        }

        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ message: 'שגיאה בשרת', error: error.message });
    }
});

module.exports = router;