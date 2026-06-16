try {
    require('dotenv').config();
} catch (error) {
    console.warn('dotenv is not installed. Using existing environment variables only.');
}
const mongoose = require('mongoose');
const User = require('../models/User');

const users = [
    {
        firstName: 'יואב',
        lastName: 'כהן',
        personalId: '123456789',
        birthDate: new Date('1990-04-12'),
        phone: '0501234567',
        email: 'yoav.cohen@example.com',
        city: 'תל אביב',
        street: 'הרצל',
        houseNumber: '12',
        plateNumber: '123-45-67'
    },
    {
        firstName: 'נועה',
        lastName: 'לוי',
        personalId: '234567891',
        birthDate: new Date('1988-09-03'),
        phone: '0529876543',
        email: 'noa.levi@example.com',
        city: 'חיפה',
        street: 'הנביאים',
        houseNumber: '8',
        plateNumber: '456-78-90'
    },
    {
        firstName: 'דניאל',
        lastName: 'מזרחי',
        personalId: '345678912',
        birthDate: new Date('1995-01-21'),
        phone: '0541122334',
        email: 'daniel.mizrahi@example.com',
        city: 'ירושלים',
        street: 'יפו',
        houseNumber: '101',
        plateNumber: '789-12-34'
    }
];

function isValidPlate(plate) {
    return /^\d{3}-\d{2}-\d{2}$/.test(plate);
}

function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

async function seedUsers() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing in environment variables');
        }

        for (const user of users) {
            if (!isValidPlate(user.plateNumber)) {
                throw new Error(`Invalid plate format for ${user.firstName}: ${user.plateNumber}`);
            }

            if (!isValidPhone(user.phone)) {
                throw new Error(`Invalid phone format for ${user.firstName}: ${user.phone}`);
            }
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany({});
        const inserted = await User.insertMany(users);

        console.log(`Seed completed. Inserted ${inserted.length} users.`);
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error.message);
        process.exit(1);
    }
}

seedUsers();
