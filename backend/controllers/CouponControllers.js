const Coupon = require('../models/Coupons');

const currencyFormat = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
    maximumFractionDigits: 0
})

const createDefaultCoupons = async (userId) => {
    const defaultCoupons = [
        {
            userId,
            code: '52231-89571',
            benefits: [
                '40% הנחה על אמבטיה לתא מטען', 
                `הנחת רכב ${currencyFormat.format(300)}`
            ],
            expirationDate: new Date('2023-10-30')
        },
        {
            userId,
            code: '52231-89571',
            benefits: [
                '40% הנחה על אמבטיה לתא מטען', 
                `הנחת רכב ${currencyFormat.format(300)}`, 
                `מימון על xxx עד ${currencyFormat.format(70000)}`
            ],
            expirationDate: new Date('2023-10-30')
        },
        {
            userId,
            code: '52231-89571',
            benefits: [
                '40% הנחה על אמבטיה לתא מטען',
                `הנחת רכב ${currencyFormat.format(300)}`,
                `מימון על xxx עד ${currencyFormat.format(70000)}`,
                `קנה ב-${currencyFormat.format(1000)} , וקבל הנחה על סך ${currencyFormat.format(1000)} לקניית אביזרים`
            ],
            expirationDate: new Date('2023-10-30')
        }
    ];
    return await Coupon.insertMany(defaultCoupons);
};

module.exports = { createDefaultCoupons };