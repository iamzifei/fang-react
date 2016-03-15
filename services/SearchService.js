'use strict';

const Property = require('../models/property');
const config = require('../config');


class SearchService {
  // helper search function, shared cross suburb search and refined search
  queryBuildHelper(offset, suburb, countFlag) {
    var autocomplete = new RegExp('^([a-z\']+)[,\\s]*([0-9]+)[,\\s]*([a-z]+)$', 'i');
    var match, query;
    var paginateFlag = !countFlag;
    if (suburb == -1) {
      // return all properties number if query is -1 flagged
      query = countFlag ? Property.count() : Property.find();
    } else if (!isNaN(parseFloat(suburb)) && isFinite(suburb)) {
      // if the query is all numbers, consider it is postcode
      query = countFlag ? Property.count({ postcode: suburb }) : Property.find({ postcode: suburb });
    } else if((match = autocomplete.exec(suburb)) !== null) {
      // if the query contains two commas, consider it is auto complete
      if (match.index === autocomplete.lastIndex) {
        autocomplete.lastIndex++;
      }
      query = countFlag ? Property.count({postcode: match[2], suburb: new RegExp(match[1], 'i')})
        : Property.find({postcode: match[2], suburb: new RegExp(match[1], 'i')});
    } else {
      // if it is string, consider as suburb name
      query = countFlag ? Property.count({ suburb: new RegExp(suburb, 'i') })
        : Property.find({ suburb: new RegExp(suburb, 'i') });
    }
    return paginateFlag ? query.skip(offset).limit(config.perPage) : query;
  }

  // helper search function, shared cross suburb search and refined search
  queryCriteriaHelper(countFlag, query, price, sort, term, room, property, feature, misc) {
    if(!countFlag) {
      switch (sort) {
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
          query = query.sort({'_id': -1});
      }
    }

    if (price !== '') {
      query = query.where('price').lte(parseInt(price, 10) + config.rentalBuffer);
    }

    switch (term) {
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
      case 'car':
        query = query.where('roomType').equals('car');
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

    if (feature === 'any') {
      query = query;
    } else if (feature && feature.length > 0) {
      query = query.where('propertyFeature', feature);
    }

    switch (misc) {
      case 'photo':
        query = query.where('imageCount').gt(0);
        break;
      default:
        query = query;
    }

    return query;
  }

  getProperties(req, res, next) {
    var suburb = req.query.suburb? req.query.suburb: -1;
    var price = req.query.price? req.query.price: '';
    var offset = req.query.offset? parseInt(req.query.offset, 10) : 0;
    var sort = req.query.sort;
    var term = req.query.term;
    var room = req.query.room;
    var property = req.query.property;
    var feature = req.query.feature;
    var misc = req.query.misc;
    var query = this.queryBuildHelper(offset, suburb, 0);

    this.queryCriteriaHelper(0, query, price, sort, term, room, property, feature, misc)
    .exec(function(err, properties) {
      if (err) return next(err);

      if (!properties) {
        return res.status(404).send({ message: 'Property not found.' });
      }

      res.send(properties);
    });
  }

  getPropertiesCount(req, res, next) {
    var suburb = req.query.suburb? req.query.suburb: -1;
    var price = req.query.price? req.query.price: '';
    var term = req.query.term;
    var room = req.query.room;
    var property = req.query.property;
    var feature = req.query.feature;
    var misc = req.query.misc;

    var query = this.queryBuildHelper(0, suburb, 1);
    this.queryCriteriaHelper(1, query, price, 'count', term, room, property, feature, misc)
    .exec(function(err, count) {
      if (err) return next(err);
      res.send({ count: count });
    });
  }
}

module.exports = SearchService;
