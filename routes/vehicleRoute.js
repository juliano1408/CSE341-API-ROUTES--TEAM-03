const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle')
const uuid = require('uuid');
const mongoose = require('mongoose');
router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'This is vehicle get request',
    })
})

router.post('/', (req, res, next) => {
    const { name, price, description } = req.body;
    const vehicle = new Vehicle({
        _id: new mongoose.Types.ObjectId,
        name: name,
        price: price,
        description: description,
        uniqueId: uuid(),
    })

    vehicle.save()
        .then(result => {
            res.status(200).json({
                newVehicle: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router