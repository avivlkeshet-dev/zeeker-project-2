require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

const seedData = [
    {
        "name": "זיקר תל אביב",
        "description": "רכב ספורטבק חשמלי יוקרתי ומנקר עיניים, טווח נסיעה ענק, שמור ברמת תצוגה, חווית נהיגה פרימיום יוצאת דופן.",
        "shortDescription": "זיקר 001 במצב מושלם, טווח ארוך",
        "imageUrl": "https://images.example.com/zeekr001.jpg",
        "price": 245000,
        "category": "Electric",
        "features": ["דליברי" ,"טיפול ראשון חינם" ,"ביטוח מקיף" ,"הצעות לביטוח" ,"חליפים ואביזרים"],
        "location": {
            "name": "Zeekr Center Tel Aviv",
            "address": "Tel Aviv, Israel",
            "lat": 32.1436284,
            "lng": 34.8035426
        }
    },
    {
        "name": "אבי בניו",
        "description": "קרוסאובר עירוני קומפקטי ומעוצב להפליא, מאיץ מ-0 ל-100 קמ\"ש בתוך פחות מ-4 שניות, יד ראשונה מפרטי, נקי מתאונות.",
        "shortDescription": "זיקר X חזק, מהיר ומפואר",
        "imageUrl": "https://images.example.com/zeekrx.jpg",
        "price": 185000,
        "category": "Electric",
        "features": ["אולם מכירות" ,"דינאמיקה" ,"מגוון מסלולי" ,"הצעות לביטוח" ,"חליפים ואביזרים" ,"מכונאות", "רכב יד שנייה", "טרייד אין"],
        "location": {
            "name": "Zeekr Haifa",
            "address": "Haifa, Israel",
            "lat": 32.8077112,
            "lng": 35.075621
        }
    },
    {
        "name": "freesbe",
        "description": "מכונית סדאן טכנולוגית מתקדמת, ארכיטקטורת טעינה אולטרה-מהירה 800V, מרווחת, מפנקת ועתידנית במיוחד.",
        "shortDescription": "זיקר 007 חדישה וטכנולוגית",
        "imageUrl": "https://images.example.com/zeekr007.jpg",
        "price": 210000,
        "category": "Electric",
        "features": ["דליברי" ,"טיפול ראשון חינם" ,"ביטוח מקיף", "ליסינג", "השכרת רכבים"],
        "location": {
            "name": "Zeekr Petah Tikva",
            "address": "Petah Tikva, Israel",
            "lat": 32.1072235,
            "lng": 34.8903769
        }
    }
];

const runSeed = async () => {
    try {
        console.log('מתחבר לשרת בשביל הסיד');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('חיבור סיד הצליח');

        console.log('מנקה רשימת רכבים קיימים');
        await Vehicle.deleteMany({});

        console.log('מוסיף נתוני סיד');
        await Vehicle.insertMany(seedData);

        console.log('נתונים נכנסו בהצלחה');
        process.exit(0);
    } catch(error) {
        console.log('שגיאה בעת ברצת סיד', error.message);
        process.exit(1);
    }
}

runSeed();