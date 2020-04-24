var pokemonRouter = require('express').Router();
var pokemonController = require('./pokemonController');

// Create route handlers for each of the six methods in pokemonController

pokemonRouter.get('/api/pokemon', pokemonController.retrieve);
pokemonRouter.post('/api/pokemon', pokemonController.createOne);
pokemonRouter.delete('/api/pokemon', pokemonController.delete);
pokemonRouter.get('/api/pokemon/:number', pokemonController.retrieveOne);
pokemonRouter.put('/api/pokemon/:number', pokemonController.updateOne);
pokemonRouter.delete('/api/pokemon/:number', pokemonController.deleteOne);

module.exports = pokemonRouter;
