const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);

require('dotenv').config();

const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
// const router = express.Router();
const mongoose = require('mongoose');
const apiRoutes = require('./routes/vehicleRoute');
const authRoute = require('./routes/auth');

const PORT = process.env.PORT | 3000;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.xsirj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)

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
                // url: 'http://localhost:3000/'
                url: 'https://cse341-api-routes-team-03.herokuapp.com/'
            }
        ]
    },
    apis: ['./index.js', './routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(apiRoutes);
app.use(authRoute);

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request',
    })
})


server.listen(PORT, () => {
    console.info(`Transport API running on Port ${PORT}`);
})