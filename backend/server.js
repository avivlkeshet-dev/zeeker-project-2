require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/authRoutes');
const doc = require('./routes/documentRoutes');
const contact = require('./routes/contactRoutes');
const vehicle = require('./routes/vehicleRoutes');

const server = express();

server.use(express.json());
server.use(cors());

mongoose.connect(process.env.MONGODB_URI) 
    .then(() => console.log('mongodb connected successfully'))
    .catch((error) => console.log('Faild to connect database', error));

// mount routes
server.use(auth);
server.use(doc);
server.use(contact);
server.use(vehicle);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));