
const express = require('express')
const app = express();
const http = require('http');

require('dotenv').config()
const vehicleRoutes = require('./routes/vehicleRoute');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const router = express.Router();


const PORT = process.env.PORT | 3000;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const SWAGGER_URL = PORT==3000?'http://localhost:3000/':'https://cse341-api-routes-team-03.herokuapp.com/';

require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.xsirj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
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
            title: 'CS341 Rest API - Vehicle_Estimator_API',
            version: '1.0.10'
        },
        servers: [
            {
                url: SWAGGER_URL
            }
        ]
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

router.use(vehicleRoutes);
router.use(authRoutes);
app.use(router)

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request',
    })
})
const server = http.createServer(app);
server.listen(PORT, () => {
    console.info(`Transport API running on Port ${PORT}`);
})