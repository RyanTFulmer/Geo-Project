const mongoose = require('mongoose');

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect('mongodb://localhost/Geo', { useNewUrlParser: true });

// Schema
var geoSchema = new mongoose.Schema({
  Year: Number,
  AL: Number,
  AZ: Number,
  AR: Number,
  CA: Number,
  CO: Number,
  CT: Number,
  DE: Number,
  DC: Number,
  FL: Number,
  GA: Number,
  ID: Number,
  IL: Number,
  IN: Number,
  IA: Number,
  KS: Number,
  KY: Number,
  LA: Number,
  ME: Number,
  MD: Number,
  MA: Number,
  MI: Number,
  MN: Number,
  MS: Number,
  MO: Number,
  MT: Number,
  NE: Number,
  NV: Number,
  NH: Number,
  NJ: Number,
  NM: Number,
  NY: Number,
  NC: Number,
  ND: Number,
  OH: Number,
  OK: Number,
  OR: Number,
  PA: Number,
  RI: Number,
  SC: Number,
  SD: Number,
  TN: Number,
  TX: Number,
  UT: Number,
  VT: Number,
  VA: Number,
  WA: Number,
  WV: Number,
  WI: Number,
  WY: Number,
});

//Model
var PopulationModel = mongoose.model('population', geoSchema);

module.exports = PopulationModel;
module.exports = geoSchema;
