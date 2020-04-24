var Pokemon = require('./Pokemon');

// Complete each of the following controller methods

module.exports = {
  createOne: function(req, res) {
    console.log('inside create one');
    var poke = new Pokemon({
      number: req.body.number,
      name: req.body.name,
      types: req.body.types,
      imageUrl: req.body.imageUrl,
      upsert: true
    });
    console.log('poke is ', poke);
    poke.save((err, newPoke) => {
      if (err) {
        console.log(err);
        res.send(500);
      }
      if (newPoke) {
        console.log('successful save!');
        res.json(newPoke);
      }
    });
  },

  retrieve: function(req, res) {
    Pokemon.find()
      .sort('number')
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        if (err) {
          res.send(500);
          console.log(err);
        }
      });
  },

  retrieveOne: function(req, res) {
    Pokemon.findOne({ number: req.params.number })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        if (err) {
          res.send(500);
          console.log(err);
        }
      });
  },

  // went back and finished post TA
  updateOne: function(req, res) {
    Pokemon.findOneAndUpdate({ number: req.body.number }, req.body, {
      new: true
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        if (err) {
          res.send(500);
          console.log(err);
        }
      });
  },

  //i think this will send back the data after deleting but not enough time to test
  delete: function(req, res) {
    console.log('inside delete on database side');
    Pokemon.find()
      .sort('number')
      .then(data => {
        Pokemon.deleteMany({}, function(err) {
          if (err) {
            res.send(500);
            console.log(err);
          }
        });
        res.json(data);
      })
      .catch(err => {
        if (err) {
          res.send(500);
          console.log(err);
        }
      });
  },

  //edited post-TA to return JSON of deleted item
  deleteOne: function(req, res) {
    console.log('req.params', req.params);

    Pokemon.findOneAndRemove({ number: req.params.number }, function(
      err,
      data
    ) {
      if (err) {
        res.send(500);
        console.log(err);
      } else {
        res.send(data);
      }
    });
  }
};
