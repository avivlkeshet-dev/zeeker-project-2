const { vehicleValidation } = require('../controllers/vehicleControllers');
const Vehicle = require('../models/Vehicle')
const express = require('express');

const router = express.Router();

router.post('/api/vehicles', async (req, res) => {
    const { error } = vehicleValidation(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const {
            name,
            description,
            shortDescription,
            imageUrl,
            price,
            category,
            features,
            location
        } = req.body;

        const vehicle = new Vehicle ({
            name,
            description,
            shortDescription,
            imageUrl,
            price,
            category,
            features,
            location: {
                name: location.name,
                address: location.address,
                lat: location.lat,
                lng: location.lng
            }
        });

        await vehicle.save();

        res.status(200).json({
            message: 'פרטי הרכב נשמרו בהצלחה',
        })
    } catch (error) {
        return res.status(500).json({
            message: 'אירוע שגיאה באת הוספת רכב, נסו שוב מאוחר יותר',
            error: error.message
        });
    }
});

router.get('/api/vehicles', async (req, res) => {
    try {
        const vehicle = await Vehicle.find().sort({ createdAt: -1 });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({
            message: 'אופס, כנראה שיש שגיאה כרגע, נסו שוב מאוחר יותר',
            error: error.message
        });
    }
});

router.get('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        if(!vehicle) {
            return res.status(404).json({
                message: 'רכב לא נמצא'
            });
        }

        res.status(200).json(vehicle);
    } catch(error) {
        res.status(500).json({
            message: 'אירוע שגיאה באת השגת הנתונים של הרכב',
            error: error.message
        });
    }
});

router.put('/api/vehicles/:id', async (req,res) => {
    const { error } = vehicleValidation(req.body);

    if(error) {
        return res.status(404).json({
            message: error.details[0].message
        });
    }

    try {
        const { id } = req.params;
        const updateData = req.body;

        const updataVehicle = await Vehicle.findByIdAndUpdate(
            id,
            {
                $set: updateData
            },
            {
                new: true, runValidators: true
            }
        );

        if(!updataVehicle) {
            return res.status(404).json({
                message: 'מודעת רכב לא נמצאת'
            });
        }

        res.status(200).json({
            message: 'רכב עודכן בהצלחה',
            vehicle: updataVehicle
        });
    } catch(error) {
        res.status(500).json({
            message: 'אירועי שגיאה באת עדכון הרכב',
            error: error.message
        });
    }
});

router.delete('/api/vehicles/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);

        if(!deletedVehicle) {
            return res.status(404).json({
                message: 'רכב לא נמצא ברשימה'
            });
        }

        res.status(200).json({
            message: 'רכב נמחק בהצלחה',
            deletedVehicleId: id
        });
    } catch(error) {
        res.status(500).json({
            message: 'שגיאה באת מחיקת ברכב מהרשימה',
            error: error.message
        });
    }
})

module.exports = router;