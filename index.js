const http = require('http');
const app = require('./app');
const server = http.createServer(app);

require('dotenv').config()
const port = 3000;

server.listen(process.env.PORT || port);