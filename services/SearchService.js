'use strict';

const Property = require('../models/property');
const config = require('../config');


class SearchService {
  // basic search function, shared cross suburb search and refined search
  queryBySuburb(offset, suburb) {
    var autocomplete = new RegExp('^([a-z\']+)[,\\s]*([0-9]+)[,\\s]*([a-z]+)$', 'i');
    var match, query;
    if (!isNaN(parseFloat(suburb)) && isFinite(suburb)) {
      // if the query is all numbers, consider it is postcode
      query = Property.find({ postcode: suburb });
    } else if((match = autocomplete.exec(suburb)) !== null) {
      // if the query contains two commas, consider it is auto complete
      if (match.index === autocomplete.lastIndex) {
        autocomplete.lastIndex++;
      }
      query = Property.find({postcode: match[2], suburb: new RegExp(match[1], 'i')});
    } else {
      // if it is string, consider as suburb name
      query = Property.find({ suburb: new RegExp(suburb, 'i') });
    }
    return query.skip(offset).limit(config.perPage);
  }

  getPropertiesBySuburb(req, res, next) {
    var suburb = req.params.suburb;
    var offset = req.query.offset? parseInt(req.query.offset, 10) : 0;
    this.queryBySuburb(offset, suburb)
      .sort({'_id': -1})
      .exec(function(err, properties) {
        if (err) return next(err);

        if (!properties) {
          return res.status(404).send({ message: 'Property not found.' });
        }

        res.send({limit: config.perPage, properties: properties});
      });
  }

  getPropertiesByRefineCriteria(req, res, next) {
    var suburb = req.params.suburb;
    var offset = req.query.offset? parseInt(req.query.offset, 10) : 0;
    var query = this.queryBySuburb(offset, suburb);
    //refine?offset=10&sort=desc&terms=s&room=private&property=house&feature=furnished&feature=femalePrefer&feature=nonSmoker&feature=petAllowed&feature=billInclude&feature=fastInternet
    var sort = req.query.sort;
    var terms = req.query.terms;
    var room = req.query.room;
    var property = req.query.property;
    var feature = req.query.feature;

    switch (sort) {
      case 'photo':
        query = query.where('imageCount').gt(0);
            break;
      case 'time':
        query = query.sort({'_id': -1});
            break;
      case 'priceUp':
        query = query.sort({'price': 1});
            break;
      case 'priceDown':
        query = query.sort({'price': -1});
            break;
      default:
            query = query;
    }

    switch (terms) {
      case 's':
            query = query.where('minTerm').lt(6);
            break;
      case 'l':
            query = query.where('minTerm').gte(6);
            break;
      default:
            query = query;
    }

    switch (room) {
      case 'private':
            query = query.where('roomType').equals('private');
            break;
      case 'shared':
            query = query.where('roomType').equals('shared');
            break;
      case 'living':
            query = query.where('roomType').equals('living');
            break;
      case 'master':
            query = query.where('roomType').equals('master');
            break;
      default:
            query = query;
    }

    switch (property) {
      case 'apartment':
        query = query.where('propertyType').equals('apartment');
        break;
      case 'studio':
        query = query.where('propertyType').equals('studio');
        break;
      case 'house':
        query = query.where('propertyType').equals('house');
        break;
      case 'whole':
        query = query.where('propertyType').equals('whole');
        break;
      default:
        query = query;
    }

    if (feature && feature.length > 0) {
      query = query.where('propertyFeature', feature);
    }

   query
      .skip(offset)
      .limit(config.perPage)
      .exec(function(err, properties) {
        if (err) return next(err);

        if (!properties) {
          return res.status(404).send({ message: 'Property not found.' });
        }

        res.send({limit: config.perPage, properties: properties});
      });
  }
}

module.exports = SearchService;
