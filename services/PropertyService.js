'use strict';

const Property = require('../models/property');
const config = require('../config');

class PropertyService {
  getNumberOfProperties(req, res, next) {
    var suburb = req.query.suburb? req.query.suburb: -1;
    if (suburb == -1) {
      Property.count({}, function(err, count) {
        if (err) return next(err);
        res.send({ count: count });
      });
    } else if (!isNaN(parseFloat(suburb)) && isFinite(suburb)) {
      Property.count({postcode: suburb}, function(err, count) {
        if (err) return next(err);
        res.send({ count: count });
      });
    } else {
      suburb = new RegExp(req.query.suburb, 'i');
      Property.count({suburb: suburb}, function(err, count) {
        if (err) return next(err);
        res.send({ count: count });
      });
    }
  }

  getPropertyBySuburb(req, res, next) {
    var suburb = req.params.suburb;
    var offset = req.query.offset? parseInt(req.query.offset, 10) : 0;
    if (!isNaN(parseFloat(suburb)) && isFinite(suburb)) {
      Property.find({ postcode: suburb })
        .skip(offset)
        .limit(config.perPage)
        .sort({'_id': 'desc'})
        .exec(function(err, properties) {
          if (err) return next(err);

          if (!properties) {
            return res.status(404).send({ message: 'Property not found.' });
          }

          res.send({limit: config.perPage, properties: properties});
        });
    } else {
      suburb = new RegExp(req.params.suburb, 'i');
      Property.find({ suburb: suburb })
        .skip(offset)
        .limit(config.perPage)
        .sort({'_id': 'desc'})
        .exec(function(err, properties) {
          if (err) return next(err);

          if (!properties) {
            return res.status(404).send({ message: 'Property not found.' });
          }

          res.send({limit: config.perPage, properties: properties});
        });
    }
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

  getAllProperties(req, res, next) {
    var offset = req.query.offset? parseInt(req.query.offset, 10) : 0;
    Property.find()
      .sort({'_id': 'desc'})
      .skip(offset)
      .limit(config.perPage)
      .exec(function(err, properties) {
        if (err) return next(err);

        if (!properties) {
          return res.status(404).send({ message: 'Properties not found.' });
        }

        res.send({limit: config.perPage, properties: properties});
      })
  }

  loadProperties(req, res, next) {
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
  }

  addProperty(req, res, next) {
    var suburb = req.body.suburb;
    var postcode = req.body.postcode;
    var price = req.body.price;
    var address = req.body.address;
    var title = req.body.title;
    var details = req.body.details;
    var propertyType = req.body.propertyType;
    var roomType = req.body.roomType;
    var contactName = req.body.contactName;
    var contactNumber = req.body.contactNumber;
    var contactEmail = req.body.contactEmail;
    var contactSocial = req.body.contactSocial;
    var preferredContact = req.body.preferredContact;
    var bond = req.body.bond;
    var availableStart = req.body.availableStart;
    var minTerm = req.body.minTerm;
    var imageCount = req.body.imageCount;
    var propertyFeature = [];

    var property = new Property({
      suburb: suburb,
      postcode: postcode,
      price: price,
      address: address,
      imageCount: imageCount,
      title: title,
      details: details,
      propertyType: propertyType,
      roomType: roomType,
      contactName: contactName,
      contactNumber: contactNumber,
      contactEmail: contactEmail,
      contactSocial: contactSocial,
      preferredContact: preferredContact,
      bond: bond,
      availableStart: availableStart,
      minTerm: minTerm,
      propertyFeature: propertyFeature
    });

    try {
      property.save(function(err) {
        if (err) return next(err);
        res.send({ message: 'Property at ' + address + ' has been added successfully!' });
      });
    } catch (e) {
      res.status(404).send({ message: ' Could not add the property.' });
    }
  }
}

module.exports = PropertyService;
