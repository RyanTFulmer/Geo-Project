const mongoose = require('mongoose');

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect('mongodb://localhost/Geo', { useNewUrlParser: true });

// Schema
var indexSchema = new mongoose.Schema({
  dataName: String,
});

//Model
var indexModel = mongoose.model('index', indexSchema);

module.exports = indexModel;
