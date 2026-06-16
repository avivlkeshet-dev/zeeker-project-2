const express = require('express');
const Map = require('../models/Map');

const router = express.Router();

router.get('/api/maps', async (req, res) => {
    try {
        const maps = await Map.find().sort({ createdAt: -1 });
        res.status(200).json(maps);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve map entries',
            error: error.message
        });
    }
});

module.exports = router;
