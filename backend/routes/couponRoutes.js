const express = require('express');
const { createDefaultCoupons } = require('../controllers/couponControllers');
const jwt = require('jsonwebtoken');
const Coupon = require('../models/Coupon');

const router = express.Router();

router.get('/api/coupons/me', async (req,res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            message: 'לא מחובר'
        });
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET || 'randomsecret5241');
        const coupons = await Coupon.find({ userId: verify.id });
        return res.status(200).json(coupons)
    } catch (error) {
        return res.status(500).json({
            message: 'שגיאה בקבלת ההטבות',
            error: error.message
        });
    }
});

module.exports = router;