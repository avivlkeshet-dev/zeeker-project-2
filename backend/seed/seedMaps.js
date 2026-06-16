try {
    require('dotenv').config();
} catch (error) {
    console.warn('dotenv is not installed. Using existing environment variables only.');
}
const mongoose = require('mongoose');
const Map = require('../models/Map');

const mapsData = [
    {
        name: 'Zeeker Tel Aviv',
        address: 'Tel Aviv, Israel',
        lat: 32.0853,
        lng: 34.7818,
        time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
        email: 'info@',
        services: [
            'טרייד-אין',
            'רכבי יד שניה',
            'מכונאות',
            'חלפים ואביזרים',
            'הצעות לביטוח'
        ]
    },
    {
        name: 'Zeeker Jerusalem',
        address: 'Jerusalem, Israel',
        lat: 31.7683,
        lng: 35.2137,
        time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
        email: 'info@ron.co.il',
        services: [
            'רכבי יד שניה',
            'חלפים ואביזרים',
            'הצעות לביטוח',
            'מגוון מסלולי',
            'דיאגנוסטיקה',
            'אולם מכירות'
        ]
    },
    {
        name: 'Zeeker Haifa',
        address: 'Haifa, Israel',
        lat: 32.7940,
        lng: 34.9896,
        time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
        email: 'info@zeeker-haifa.co.il',
        services: [
            'רכבי יד שניה',
            'חלפים ואביזרים',
            'דיאגנוסטיקה',
            'אולם מכירות'
        ]
    }
];

async function seedMaps() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Map.deleteMany({});
        await Map.insertMany(mapsData);

        console.log(`Seed completed. Inserted ${mapsData.length} map entries.`);
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error.message);
        process.exit(1);
    }
}

seedMaps();
