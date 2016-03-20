'use strict';

const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: '../data/upload/'}).any();

const Property = require('../models/property');
const config = require('../config');

class PropertyService {

  getPropertyById(req, res, next) {
    var id = req.params.id;

    Property.findOne({ _id: id }, function(err, property) {
      if (err) return next(err);

      if (!property) {
        return res.status(404).send({ message: 'Property not found.' });
      }
      // convert number to string for component
      property.price = property.price ? property.price.toString() : property.price;
      property.minTerm = property.minTerm ? property.minTerm.toString() : property.minTerm;
      property.bond = property.bond ? property.bond.toString() : property.bond;
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
        if (key === 'propertyFeature') {
          property.propertyFeature = req.body.propertyFeature.split(/[\s,]+/);
        } else {
          property[key] = req.body[key];
        }
      });

      if (req.files) {
        property.imageCount = req.files.length;
      }

      try {
        property.save(function(err) {
          if (err) return next(err);

          // get doc id
          var docID = property["_id"];

          // move uploaded images to target folder and rename them with id
          for (var i = 0; i < property.imageCount; i++) {
            var targetPath = `./public/property_images/property_image_${docID}_${i + 1}`;
            fs.rename(req.files[i].path, targetPath,
              function (err) {
                if (err) {
                  console.log("moving the file failed");
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
