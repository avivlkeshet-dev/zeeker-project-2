require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');

const seedData = [
    {
        "name": "זיקר 001 (Zeekr 001)",
        "description": "רכב ספורטבק חשמלי יוקרתי ומנקר עיניים, טווח נסיעה ענק, שמור ברמת תצוגה, חווית נהיגה פרימיום יוצאת דופן.",
        "shortDescription": "זיקר 001 במצב מושלם, טווח ארוך",
        "imageUrl": "https://images.example.com/zeekr001.jpg",
        "price": 245000,
        "category": "Electric",
        "features": ["מערכת שמע פרימיום Yamaha", "מתלי אוויר אדפטיביים", "גולף רוף פנורמי חכם"],
        "location": {
            "name": "Zeekr Center Tel Aviv",
            "address": "Tel Aviv, Israel",
            "lat": 32.0853,
            "lng": 34.7818
        }
    },
    {
        "name": "זיקר X (Zeekr X)",
        "description": "קרוסאובר עירוני קומפקטי ומעוצב להפליא, מאיץ מ-0 ל-100 קמ\"ש בתוך פחות מ-4 שניות, יד ראשונה מפרטי, נקי מתאונות.",
        "shortDescription": "זיקר X חזק, מהיר ומפואר",
        "imageUrl": "https://images.example.com/zeekrx.jpg",
        "price": 185000,
        "category": "Electric",
        "features": ["עיצוב מינימליסטי יוקרתי", "מצלמות 360 היקפיות", "מושבים עם פונקציית עיסוי"],
        "location": {
            "name": "Zeekr Jerusalem",
            "address": "Jerusalem, Israel",
            "lat": 31.7683,
            "lng": 35.2137
        }
    },
    {
        "name": "זיקר 007 (Zeekr 007)",
        "description": "מכונית סדאן טכנולוגית מתקדמת, ארכיטקטורת טעינה אולטרה-מהירה 800V, מרווחת, מפנקת ועתידנית במיוחד.",
        "shortDescription": "זיקר 007 חדישה וטכנולוגית",
        "imageUrl": "https://images.example.com/zeekr007.jpg",
        "price": 210000,
        "category": "Electric",
        "features": ["תצוגה עילית AR-HUD", "טעינה סופר מהירה 800V", "חבילת בטיחות אוטונומית מלאה"],
        "location": {
            "name": "Zeekr Haifa",
            "address": "Haifa, Israel",
            "lat": 32.7940,
            "lng": 34.9896
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