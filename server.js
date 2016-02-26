// Babel ES6/JSX Compiler
require('babel-register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var config = require('./config');

const PropertyService = require('./services/PropertyService');

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var _ = require('underscore');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

// Express middleware
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/properties/count
 * Returns the total number of properties.
 */
app.get('/api/properties/count', function(req, res, next) {
  Property.count({}, function(err, count) {
    if (err) return next(err);
    res.send({ count: count });
  });
});

/**
 * GET /api/properties/search
 * Looks up a property by suburb or postcode.
 */
app.get('/api/properties/search', function(req, res, next) {
  res.send({suburb:req.query.suburb});
});

/**
 * GET /api/properties/:suburb
 * List all properties in suburb.
 */
app.get('/api/properties/:suburb', function(req, res, next) {
  var suburb = req.params.suburb;
  if (!isNaN(parseFloat(suburb)) && isFinite(suburb)) {
    Property.find({ postcode: suburb })
      .sort({'_id': 'desc'})
      .exec(function(err, properties) {
      if (err) return next(err);

      if (!properties) {
        return res.status(404).send({ message: 'Property not found.' });
      }

      res.send(properties);
    });
  } else {
    suburb = new RegExp(req.params.suburb, 'i');
    Property.find({ suburb: suburb })
      .sort({'_id': 'desc'})
      .exec(function(err, properties) {
      if (err) return next(err);

      if (!properties) {
        return res.status(404).send({ message: 'Property not found.' });
      }

      res.send(properties);
    });
  }
});

/**
 * GET /api/property/:id
 * Returns detailed property information.
 */
app.get('/api/property/:id', function(req, res, next) {
  var id = req.params.id;

  Property.findOne({ _id: id }, function(err, property) {
    if (err) return next(err);

    if (!property) {
      return res.status(404).send({ message: 'Property not found.' });
    }

    res.send(property);
  });
});

/**
 * GET /api/properties
 * Returns all properties.
 */
app.get('/api/properties', function(req, res, next) {
  Property.find()
    .sort({'_id': 'desc'})
    .exec(function(err, properties) {
      if (err) return next(err);

      if (!properties) {
        return res.status(404).send({ message: 'Properties not found.' });
      }

      res.send(properties);
  })
});

/**
 * POST /api/properties
 * Adds new property to the database.
 */
app.post('/api/properties', function(req, res, next) {
    new PropertyService().addProperty(req, res, next);
});

/**
 * GET /api/load
 * Load test data into database, for testing purpose
 * TODO: this needs removed in prod environment
 */
app.get('/api/load', function(req, res, next) {
  var PROPERTIES = [
    {"suburb": "Sydney CBD", "postcode": "2000", "price": "120", "address": "1 George Street", "imageCount": 6, "title": "", "details": "gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Chatswood", "postcode": "2030", "price": "130", "address": "2 Victoria Street", "imageCount": 11, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Hornsby", "postcode": "2077", "price": "140", "address": "3 Linda Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "150", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "160", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "170", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "180", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "190", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "200", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "210", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "220", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "230", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "240", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "250", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "260", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "270", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
    {"suburb": "Burwood", "postcode": "2134", "price": "280", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"}
  ];
  Property.insertMany(PROPERTIES, function(error, docs){
    if (error) return res.send(error);
    res.send('insert successfully');
  });
});

// React middleware
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

var server = require('http').createServer(app);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
