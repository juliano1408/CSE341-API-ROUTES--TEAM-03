const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle')
const uuid = require('uuid');
const mongoose = require('mongoose');

const checkAuth = require('../middleware/is-auth');
const controller = require('../controllers/controllers');


/**
* @swagger
*  components:
*      schemas:
*          Vehicle:
*              type: object
*              properties:
*                  name:
*                      type: string
*                  price:
*                      type: string
*                  description:
*                      type: string
*/



/**
* @swagger
* /add/vehicle:
*  post:
*      summary: Used to insert data into mongodb
*      description: This api used for get all product data
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      $ref: '#components/schemas/Vehicle'
*      responses:
*          200:
*              description: Added Successfully
*/
// router.post('/add/vehicle', checkAuth, controller.postVehicleData);
router.post('/add/vehicle', controller.postVehicleData);



/**
* @swagger
* /get/vehicle:
*  get:
*      summary: To get all vehicle from database
*      description: This api used for get all product data
*      responses:
*          200:
*              description: To test get method
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components/schemas/Vehicle'
*/
// router.get('/get/vehicle', checkAuth, controller.getVehicleData);
router.get('/get/vehicle', controller.getVehicleData);

/**
* @swagger
* /get/vehicle/{id}:
*  get:
*      summary: To get vehicle by unique id
*      description: This api used for get all product data
*      parameters:
*          - in: path
*            name: id
*            required: true
*            description: String id required
*            schema:
*              type: string
*      responses:
*          200:
*              description: Successfully
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components/schemas/Vehicle'
*/
// router.get('/get/vehicle/:id', checkAuth, controller.getVehicleByID);
router.get('/get/vehicle/:id', controller.getVehicleByID);


/**
* @swagger
* /delete/vehicle/{_id}:
*  get:
*      summary: Delete vehicle by unique id
*      description: This api used for get all product data
*      parameters:
*          - in: path
*            name: _id
*            required: true
*            description: String id required
*            schema:
*              type: string
*      responses:
*          200:
*              description: Deleted Successfully
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components/schemas/Vehicle'
*/
// router.get('/delete/vehicle/:_id', checkAuth, controller.deleteVehicle);
router.get('/delete/vehicle/:_id', controller.deleteVehicle);


/**
* @swagger
* /update/vehicle/{_id}:
*  put:
*      summary: update vehicle by unique id
*      description: This api used for update vehicle data by using unique id
*      parameters:
*          - in: path
*            name: _id
*            required: true
*            description: String id required
*            schema:
*              type: string
*      requestBody:
*          required: true
*          content:
*              application/json:
*                  schema:
*                      $ref: '#components/schemas/Vehicle'
*      responses:
*          200:
*              description: Updated Successfully
*              content:
*                  application/json:
*                      schema:
*                          type: array
*                          items:
*                              $ref: '#components/schemas/Vehicle'
*/
// router.put('/update/vehicle/:_id', checkAuth, controller.updateVehicle);
router.put('/update/vehicle/:_id', controller.updateVehicle);


// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         msg: 'This is vehicle get request',
//     })
// })

// router.post('/', (req, res, next) => {
//     const { name, price, description } = req.body;
//     const vehicle = new Vehicle({
//         _id: new mongoose.Types.ObjectId,
//         name: name,
//         price: price,
//         description: description,
//         uniqueId: uuid(),
//     })

//     vehicle.save()
//         .then(result => {
//             res.status(200).json({
//                 newVehicle: result
//             })
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 error: err
//             })
//         })
// })


module.exports = router