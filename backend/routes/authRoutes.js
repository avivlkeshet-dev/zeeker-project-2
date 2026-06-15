const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../controllers/authControlls');
const { createDefaultCoupons } = require('../controllers/CouponControllers');
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
        const personalIdExist = await User.findOne({ personal_id: req.body.personalId });
        if(personalIdExist) {
            return res.status(400).json({ message: 'תעודת זהות כבר קיימת'})
        }

        if(emailExist) {
            return res.status(400).json({ message: 'אימייל זה כבר קיים'})
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashPersonalId = await bcrypt.hash(req.body.personalId, salt);

        // storea it in the database
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            personalId: req.body.personalId,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            plateNumber: req.body.plateNumber
        })

        const savedUser = await user.save();
        
        await createDefaultCoupons(savedUser._id);

        const token = jwt.sign(
            { id: savedUser._id, firstName: savedUser.firstName },
            process.env.JWT_SECRET || 'randomsecret5241',
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 1000      // 7 days
        })
        
        return res.status(200).json({ messsage: 'משתמש נרשם בהצלחה' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login endpoint
router.post('/api/users/login', async (req, res) => {
    const { phone, plateNumber } = req.body;

    if(!phone || !plateNumber) {
        return res.status(404).json({
            message: 'נא למלא את כל השורות'
        });
    }

    try {
        const user = await User.findOne({
            phone,
            plateNumber
        });

        if(!user) {
            return res.status(400).json({
                message: 'הפרטים שהוזנו שגויים, אנא סה להתחבר עוד פעם'
            });
        }

        const token = jwt.sign(
            {
                id: user._id, firstName: user.firstName
            },
            process.env.JWT_SECRET || 'randomsecret5241',
            {
                expiresIn: '7d'
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 1000      // 7 days
        })

        return res.status(200).json({
            message: 'החברות הושלמה',
            user: {
                id: user._id, firstName: user.firstName
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'שגיאת שרת',
            error: error.message
        });
    }
});

// currently using this get request in order to get the user data
router.get('/api/users/me', async (req, res) => {
    const token= req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: 'לא מחובר'
        });
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET || 'randomsecret5241');

        const user = await User.findById(verify.id);

        if(!user) {
            return res.status(404).json({
                message: 'משתמש לא נמצא'
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: 'בעיה בזמן חיבור',
            error: error.message
        })
    }
});

// this remain in question even though it was asked to be done in the zeekr-project README guideline
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