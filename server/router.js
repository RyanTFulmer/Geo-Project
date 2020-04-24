var geoRouter = require('express').Router();
var geoController = require('./controller');

// Create route handlers for each of the six methods in pokemonController

geoRouter.get('/data', geoController.retrieveData);
geoRouter.get('/indexes', geoController.retrieveIndexes);
geoRouter.post('/data', geoController.createData);

module.exports = geoRouter;
