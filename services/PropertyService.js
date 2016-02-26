'use strict';

const Property = require('../models/property');

class PropertyService {
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
