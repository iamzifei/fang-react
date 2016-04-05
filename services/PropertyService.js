'use strict';

const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: '../data/upload/'}).any();

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'hbp3fdj8n',
  api_key: '814451126269292',
  api_secret: 'GCjMnFL85OEpbY_4AsAdNjk_QK4'
});

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
    var thisPropertyService = this;

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

      // upload photos if any
      if (req.files) {
        property.imageCount = req.files.length;

        // move uploaded images to target folder and rename them with id
        var uploadPhotoPromises = [];

        for (var i = 0; i < property.imageCount; i++) {
          var uploadPhotoPromise = new Promise(
            function(resolve, reject) {
              console.log("uploading " + req.files[i].path);
              cloudinary.uploader.upload(req.files[i].path, function(result) {
                console.log(result);
                property.photos.push(result.url);
                resolve(result);
              });
            }
          );

          uploadPhotoPromise.then(
            function(result) {
              console.log('uploadPhotoPromise() uploaded the file, url is: ' + result.url);
            }
          ).catch(
            function(err) {
              console.log('uploadPhotoPromise() failed due to: ' + err);
            }
          );

          uploadPhotoPromises.push(uploadPhotoPromise);
        }

        // execute all the promises and send response after all of them have finished resolve/reject
        Promise.all(uploadPhotoPromises).then(
          function() {
            console.log('upload all the photos');
            console.log(property);
            thisPropertyService.saveProperty(property, res);
          }
        ).catch(
          function(err) {
            console.log('upload photos failed due to: ' + err);
          }
        );
      } else { // no photos, save the property
        this.saveProperty(property, res);
      }
    });
  }

  saveProperty(property, res) {
    try {
      property.save(function(err) {
        if (err) return next(err);

        res.send({
          message: 'Property at ' + property.address + ' has been added successfully!',
          id: property["_id"]
        });
      });
    } catch (e) {
      res.status(404).send({ message: ' Could not save the property to database due to: ' + e });
    }
  }
}

module.exports = PropertyService;
