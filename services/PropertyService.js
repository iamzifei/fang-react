'use strict';

const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: '../../data/upload/'}).any();

const Property = require('../models/property');
const config = require('../config');

const Logger = require('../utils/Logger');

class PropertyService {
  loadProperties(req, res, next) {
    var PROPERTIES = [
      {"suburb": "Sydney CBD", "postcode": "2000", "price": 120, "address": "1 George Street", "imageCount": 6, "title": "", "details": "gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"singleRoom","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":"4","availableStart":"2016-01-12","minTerm":"6"},
      {"suburb": "Chatswood", "postcode": "2030", "price": 130, "address": "2 Victoria Street", "imageCount": 11, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"private","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":6},
      {"suburb": "Hornsby", "postcode": "2077", "price": 140, "address": "3 Linda Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"master","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":1},
      {"suburb": "Burwood", "postcode": "2134", "price": 150, "address": "Burwood Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"private","propertyFeature":["femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":8},
      {"suburb": "Burwood", "postcode": "2134", "price": 160, "address": "Burwood Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"studio", "roomType":"private","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":8},
      {"suburb": "Burwood", "postcode": "2134", "price": 170, "address": "Burwood Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"shared","propertyFeature":["furnished", "nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":2,"availableStart":"2016-01-12","minTerm":8},
      {"suburb": "Burwood", "postcode": "2134", "price": 180, "address": "Burwood Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"private","propertyFeature":["furnished", "femalePrefer","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":2,"availableStart":"2016-01-12","minTerm":6},
      {"suburb": "Burwood", "postcode": "2134", "price": 190, "address": "Burwood Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"house", "roomType":"living","propertyFeature":["furnished", "femalePrefer","nonSmoker","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":2,"availableStart":"2016-01-12","minTerm":10},
      {"suburb": "Burwood", "postcode": "2134", "price": 200, "address": "Burwood Street", "imageCount": 0, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"master","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":12},
      {"suburb": "Burwood", "postcode": "2134", "price": 210, "address": "Burwood Street", "imageCount": 1, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"house", "roomType":"living","propertyFeature":["furnished", "nonSmoker","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":6},
      {"suburb": "Burwood", "postcode": "2134", "price": 220, "address": "Burwood Street", "imageCount": 3, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"whole", "roomType":"private","propertyFeature":["furnished", "femalePrefer","nonSmoker","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":8},
      {"suburb": "Burwood", "postcode": "2134", "price": 230, "address": "Burwood Street", "imageCount": 5, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"studio", "roomType":"private","propertyFeature":["furnished", "billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":5},
      {"suburb": "Burwood", "postcode": "2134", "price": 240, "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"whole", "roomType":"shared","propertyFeature":["furnished","nonSmoker","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":4},
      {"suburb": "Burwood", "postcode": "2134", "price": 250, "address": "Burwood Street", "imageCount": 8, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"private","propertyFeature":["furnished", "femalePrefer","nonSmoker","petAllowed","billInclude","fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":3},
      {"suburb": "Burwood", "postcode": "2134", "price": 260, "address": "Burwood Street", "imageCount": 3, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"house", "roomType":"private","propertyFeature":["furnished", "femalePrefer","petAllowed","billInclude"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":2},
      {"suburb": "Burwood", "postcode": "2134", "price": 270, "address": "Burwood Street", "imageCount": 2, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"master","propertyFeature":["femalePrefer","nonSmoker","petAllowed","billInclude"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":1},
      {"suburb": "Burwood", "postcode": "2134", "price": 280, "address": "Burwood Street", "imageCount": 6, "title": "", "details": "Hi, One bed room available on 30/01/16.This room is share room and 1 bed is vacancy now.<p/>we are looking for a nice,friendly,clean girl who like to share with Japanese girl.<p/>This is morderm split level 2 bedroom unit ,set over 2 levels and perfectly located within moments Burwood station(only 6 minutes walk),strathfield station,school,Westfield ,Burwood park,strathfield's amenities .Enjoy the delights of a freshly painted home with brand new floor boards,combined lounge & dining, Kitchen with gas cooking, bedrooms with large builtins, situated on , 1st floor with private large wrap around balcony, airConditioning, courtyard and security building.<p/>Rent $170per person.p/w(include with wifi,electrical,Gas,water) 2weeks of bond 2 weeks of rent required. Minimum 3month stay.<p/>If interested, please give brief description of yourselfAge, gender,nationality,studying or line of work you do etc and text me.", "propertyType":"apartment", "roomType":"living","propertyFeature":["fastInternet"],"contactName":"James Gong","contactNumber":"0414000123","contactEmail":"fake@email.com","contactSocial":"JamesG0ng","preferredContact":"wechact","bond":4,"availableStart":"2016-01-12","minTerm":6}
    ];
    Property.insertMany(PROPERTIES, function(error, docs){
      if (error) return res.send(error);
      res.send('insert successfully');
    });
  }

  getPropertyById(req, res, next) {
    var id = req.params.id;

    Property.findOne({ _id: id }, function(err, property) {
      if (err) return next(err);

      if (!property) {
        return res.status(404).send({ message: 'Property not found.' });
      }

      res.send(property);
    });
  }

  addProperty(req, res, next) {
    upload(req, res, function (err) {
      if (err) {
        return res.end(err);
      }

      var property = new Property();

      //attach all input fields
      Object.keys(req.body).forEach(function(key, index) {
        property[key] = req.body[key];
      });

      if (req.files) {
        property.imageCount = req.files.length;
      }

      Logger.log("PropertyService.addProperty(...)");
      Logger.logObject(property);

      try {
        property.save(function(err) {
          if (err) return next(err);

          // get doc id
          var docID = property["_id"];
          Logger.log("property id: {0}", docID);

          // move uploaded images to target folder and rename them with id
          const imageFilenamePattern = "./public/property_images/property_image_{0}_{1}";
          for (var i = 0; i < property.imageCount; i++) {
            var targetPath = imageFilenamePattern.format(docID, i + 1);
            Logger.log("moving {0} to {1}".format(req.files[i].path, targetPath));
            fs.rename(req.files[i].path, targetPath,
              function (err) {
                if (err) {
                  Logger.log("moving the file failed");
                }
              }
            );
          }

          res.send({
            message: 'Property at ' + property.address + ' has been added successfully!',
            id: docID
          });
        });
      } catch (e) {
        res.status(404).send({ message: ' Could not add the property.' });
      }
    });
  }
}

module.exports = PropertyService;
