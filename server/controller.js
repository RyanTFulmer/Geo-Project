const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Geo', { useNewUrlParser: true });
const csv = require('fast-csv');
const formidable = require('formidable');
const csv_parser = require('csv-parse');
const fs = require('fs');
const geoSchema = require('./db/geo_schema');
const indexModel = require('./db/indexSchema');

module.exports = {
  retrieveIndexes: function (req, res) {
    //get the database name

    indexModel
      .find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        if (err) {
          res.send(500);
          console.log(err);
        }
      });
  },
  retrieveData: function (req, res) {
    //get the database name
    var PopulationModel = mongoose.model(req.query.dataType, geoSchema);
    PopulationModel.find()
      .sort({ Year: 1 })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        if (err) {
          res.send(500);
          console.log(err);
        }
      });
  },
  createData: function (req, res) {
    const form = new formidable.IncomingForm();
    // Parse `req` and upload all associated files
    form.parse(req, function (err, fields, files) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      var PopulationModel = mongoose.model(files.myFile.name, geoSchema);
      newIndexEntry = new indexModel({ dataName: files.myFile.name });
      newIndexEntry.save(function (err) {
        if (err) console.log(err);
      });

      fs.createReadStream(files.myFile.path)
        .pipe(csv_parser())
        .on('data', (row) => {
          if (row[0] !== 'Year') {
            var newPopulation = new PopulationModel({
              Year: parseInt(row[0], 10),
              AL: parseInt(row[1], 10),
              AZ: parseInt(row[2], 10),
              AR: parseInt(row[3], 10),
              CA: parseInt(row[4], 10),
              CO: parseInt(row[5], 10),
              CT: parseInt(row[6], 10),
              DC: parseInt(row[7], 10),
              DE: parseInt(row[8], 10),
              FL: parseInt(row[9], 10),
              GA: parseInt(row[10], 10),
              ID: parseInt(row[11], 10),
              IL: parseInt(row[12], 10),
              IN: parseInt(row[13], 10),
              IA: parseInt(row[14], 10),
              KS: parseInt(row[15], 10),
              KY: parseInt(row[16], 10),
              LA: parseInt(row[17], 10),
              ME: parseInt(row[18], 10),
              MD: parseInt(row[19], 10),
              MA: parseInt(row[20], 10),
              MI: parseInt(row[21], 10),
              MN: parseInt(row[22], 10),
              MS: parseInt(row[23], 10),
              MO: parseInt(row[24], 10),
              MT: parseInt(row[25], 10),
              NE: parseInt(row[26], 10),
              NV: parseInt(row[27], 10),
              NH: parseInt(row[28], 10),
              NJ: parseInt(row[29], 10),
              NM: parseInt(row[30], 10),
              NY: parseInt(row[31], 10),
              NC: parseInt(row[32], 10),
              ND: parseInt(row[33], 10),
              OH: parseInt(row[34], 10),
              OK: parseInt(row[35], 10),
              OR: parseInt(row[36], 10),
              PA: parseInt(row[37], 10),
              RI: parseInt(row[38], 10),
              SC: parseInt(row[39], 10),
              SD: parseInt(row[40], 10),
              TN: parseInt(row[41], 10),
              TX: parseInt(row[42], 10),
              UT: parseInt(row[43], 10),
              VT: parseInt(row[44], 10),
              VA: parseInt(row[45], 10),
              WA: parseInt(row[46], 10),
              WV: parseInt(row[47], 10),
              WI: parseInt(row[48], 10),
              WY: parseInt(row[49], 10),
            });
            return newPopulation.save(function (err) {
              if (err) console.log(err);
            });
          }
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
        });

      res.json(200, { name: files.myFile.name });
    });
  },
};
