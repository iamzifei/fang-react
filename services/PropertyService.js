'use strict';

const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: '../data/upload/'}).any();

const Property = require('../models/property');
const config = require('../config');

const Logger = require('../utils/Logger');

class PropertyService {

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
