
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);

require('dotenv').config()
const port = 3000;


// const vehicleRoute = require('./routes/__original__vehicleRoute');
const vehicleRoutes = require('./routes/vehicleRoute');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const router = express.Router();
// const checkAuth = require('./middleware/auth');


require('dotenv').config()
const mongoose = require('mongoose');
// const { postVehicleData, getVehicleData, getVehicleByID, deleteVehicle, updateVehicle, userSignup, userLogin } = require('./controllers/controllers');
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsirj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

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
                
                // url: 'http://localhost:3000/'
                url: 'https://cse341-api-routes-team-03.herokuapp.com/'
            }
        ]
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
router.use(vehicleRoutes);
router.use(authRoutes);

// router.post('/userSignup', userSignup)
// router.post('/userLogin', userLogin)

app.use(router)

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request',
    })
})



server.listen(process.env.PORT || port);