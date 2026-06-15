require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/authRoutes');
const doc = require('./routes/documentRoutes');
const contact = require('./routes/contactRoutes');
const vehicle = require('./routes/vehicleRoutes');
const coupon = require('./routes/couponRoutes');
const path = require('path');
const cookieParser = require('cookie-parser')
const server = express();

server.use(express.json());

server.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

server.use(cookieParser());

server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI) 
    .then(() => console.log('mongodb connected successfully'))
    .catch((error) => console.log('Faild to connect database', error));

// mount routes
server.use(auth);
server.use(coupon);
server.use(doc);
server.use(contact);
server.use(vehicle);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));