const express = require('express')
const app = express();
const vehicleRoute = require('./routes/vehicleRoute');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const router = express.Router();
const checkAuth = require('./middleware/auth');


require('dotenv').config()
const mongoose = require('mongoose');
const { postVehicleData, getVehicleData, getVehicleByID, deleteVehicle, updateVehicle, userSignup, userLogin } = require('./controllers/controllers');
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsirj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
mongoose.connect ('mongodb+srv://mtunzi:MongoDBJune2022.@firstcluster21.ik5m1.mongodb.net/shop')

mongoose.connection.on('error', err => {
    console.log('Connection Failed');
})

mongoose.connection.on('connected', connected => {
    console.log('Connection Successfully With database...')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const options = {
    definition: {
        openapi: '3.0.0.',
        info: {
            title: 'Node js api project',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ]
    },
    apis: ['./app.js']
}

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

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

router.post('/add/vehicle', checkAuth, postVehicleData)

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


router.get('/get/vehicle', checkAuth, getVehicleData)

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
router.get('/get/vehicle/:id', checkAuth, getVehicleByID);


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
router.get('/delete/vehicle/:_id', checkAuth, deleteVehicle);


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
router.put('/update/vehicle/:_id', checkAuth, updateVehicle);

router.post('/userSignup', userSignup)
router.post('/userLogin', userLogin)

app.use(router)

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request',
    })
})


module.exports = app