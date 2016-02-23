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
var Character = require('./models/character');
var Property = require('./models/property');


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

var PROPERTIES = [
  {"propertyId": "01", "suburb": "Sydney CBD", "postcode": "2000", "price": "600", "address": "1 George Street", "imageCount": 6, "title": "", "details": "gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "02", "suburb": "Chatswood", "postcode": "2030", "price": "500", "address": "2 Victoria Street", "imageCount": 11, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "03", "suburb": "Hornsby", "postcode": "2077", "price": "400", "address": "3 Linda Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "04", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "05", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "06", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "07", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "08", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "09", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "10", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "11", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "12", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "13", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "14", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "15", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "16", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
  {"propertyId": "17", "suburb": "Burwood", "postcode": "2134", "price": "850", "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"}
];

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
 * Returns detailed character information.
 */
app.get('/api/properties/:suburb', function(req, res, next) {
  var suburb = req.params.suburb;
  if (!isNaN(parseFloat(suburb)) && isFinite(suburb)) {
    Property.find({ postcode: suburb }, function(err, properties) {
      if (err) return next(err);

      if (!properties) {
        return res.status(404).send({ message: 'Property not found.' });
      }

      res.send(properties);
    });
  } else {
    suburb = new RegExp(req.params.suburb, 'i');
    Property.find({ suburb: suburb }, function(err, properties) {
      if (err) return next(err);

      if (!properties) {
        return res.status(404).send({ message: 'Property not found.' });
      }

      res.send(properties);
    });
  }
});

/**
 * GET /api/properties
 * Returns all properties.
 */
app.get('/api/properties', function(req, res, next) {
  res.send(PROPERTIES);
});

/**
 * POST /api/properties
 * Adds new property to the database.
 */
app.post('/api/properties', function(req, res, next) {
  var gender = req.body.gender;
  var characterName = req.body.name;
  var characterIdLookupUrl = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?names=' + characterName;

  var parser = new xml2js.Parser();

  async.waterfall([
    function(callback) {
      request.get(characterIdLookupUrl, function(err, request, xml) {
        if (err) return next(err);
        parser.parseString(xml, function(err, parsedXml) {
          if (err) return next(err);
          try {
            var characterId = parsedXml.eveapi.result[0].rowset[0].row[0].$.characterID;

            Character.findOne({ characterId: characterId }, function(err, character) {
              if (err) return next(err);

              if (character) {
                return res.status(409).send({ message: character.name + ' is already in the database.' });
              }

              callback(err, characterId);
            });
          } catch (e) {
            return res.status(400).send({ message: 'XML Parse Error' });
          }
        });
      });
    },
    function(characterId) {
      var characterInfoUrl = 'https://api.eveonline.com/eve/CharacterInfo.xml.aspx?characterID=' + characterId;

      request.get({ url: characterInfoUrl }, function(err, request, xml) {
        if (err) return next(err);
        parser.parseString(xml, function(err, parsedXml) {
          if (err) return res.send(err);
          try {
            var name = parsedXml.eveapi.result[0].characterName[0];
            var race = parsedXml.eveapi.result[0].race[0];
            var bloodline = parsedXml.eveapi.result[0].bloodline[0];

            var character = new Character({
              characterId: characterId,
              name: name,
              race: race,
              bloodline: bloodline,
              gender: gender,
              random: [Math.random(), 0]
            });

            character.save(function(err) {
              if (err) return next(err);
              res.send({ message: characterName + ' has been added successfully!' });
            });
          } catch (e) {
            res.status(404).send({ message: characterName + ' is not a registered citizen of New Eden.' });
          }
        });
      });
    }
  ]);
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
