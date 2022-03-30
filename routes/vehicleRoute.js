const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle')
const uuid = require('uuid');
const mongoose = require('mongoose');

const checkAuth = require('../middleware/is-auth');
const controller = require('../controllers/controllers');


// router.post('/add/vehicle', checkAuth, controller.postVehicleData);
router.post('/add/vehicle', controller.postVehicleData);




// router.get('/get/vehicle', checkAuth, controller.getVehicleData);
router.get('/get/vehicle', controller.getVehicleData);


// router.get('/get/vehicle/:id', checkAuth, controller.getVehicleByID);
router.get('/get/vehicle/:id', controller.getVehicleByID);



// router.get('/delete/vehicle/:_id', checkAuth, controller.deleteVehicle);
router.get('/delete/vehicle/:_id', controller.deleteVehicle);



// router.put('/update/vehicle/:_id', checkAuth, controller.updateVehicle);
router.put('/update/vehicle/:_id', controller.updateVehicle);

module.exports = router