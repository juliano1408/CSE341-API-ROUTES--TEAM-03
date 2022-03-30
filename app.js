const express = require('express')
const app = express();
const vehicleRoute = require('./routes/vehicleRoute');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const router = express.Router();
const checkAuth = require('./middleware/auth');

const apiRoutes = require('./routes/vehicleRoute');
const authRoute = require('./routes/auth');

require('dotenv').config()
const mongoose = require('mongoose');
const { postVehicleData, getVehicleData, getVehicleByID, deleteVehicle, updateVehicle, userSignup, userLogin } = require('./controllers/controllers');
// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsirj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
// mongoose.connect ('mongodb+srv://mtunzi:MongoDBJune2022.@firstcluster21.ik5m1.mongodb.net/shop')
mongoose.connect('mongodb+srv://byuiUser:m7CwE7DyUqGQCFbo@cluster0.9q9ak.mongodb.net/Prove?retryWrites=true&w=majority');

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
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(apiRoutes);


app.use(authRoute);



// router.post('/userSignup', userSignup)
// router.post('/userLogin', userLogin)

app.use(router)

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request',
    })
})

// app.use('/quotes', quoteRoutes);

module.exports = app
