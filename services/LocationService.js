'use strict';

const Suburb = require('../models/suburb');
const config = require('../config');

var processSuburbs = function (res, suburbs) {
  if (!suburbs) {
    return res.status(404).send({message: 'Suburb not found.'});
  }
  var results = [];

  for (var i = 0; i < suburbs.length; i++) {
    var result = {};
    result.value = suburbs[i].suburb + ', ' + suburbs[i].postcode + ', ' + suburbs[i].state;
    result.label = result.value;
    results.push(result);
  }

  res.send(results);
};

class LocationService {
  getSuburbSuggestions(req, res, next) {
    try {
      var suburb = req.query.suburb;
      // if it's number, consider as postcode
      if (!isNaN(parseFloat(suburb)) && isFinite(suburb)) {
        suburb = new RegExp('^' + req.query.suburb, 'i');
        Suburb.find({postcode: suburb})
          .lean()
          .exec(function (err, suburbs) {
            if (err) return next(err);
            processSuburbs(res, suburbs);
          });
      } else {
        suburb = new RegExp('^' + req.query.suburb, 'i');
        Suburb.find({suburb: suburb})
          .lean()
          .exec(function (err, suburbs) {
            if (err) return next(err);
            processSuburbs(res, suburbs);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = LocationService;
