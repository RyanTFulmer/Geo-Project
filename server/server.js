var express = require('express');
var bodyParser = require('body-parser');
const geoRouter = require('./router.js');

// Create the Express application:
const app = express();

// Attach middleware:
app.use(bodyParser.json());
app.use(express.static(__dirname + '../../react-client/dist'));

//router
app.use('/', geoRouter);

module.exports = app;
