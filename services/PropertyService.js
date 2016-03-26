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
          var uploadPhotoPromises = [];

          for (var i = 0; i < property.imageCount; i++) {
            var uploadPhotoPromise = new Promise(
              function(resolve, reject) {
                var targetPath = `./public/property_images/property_image_${docID}_${i + 1}`;
                console.log("moving {0} to {1} ".format(req.files[i].path, targetPath));

                fs.rename(req.files[i].path, targetPath,
                  function (err) {
                    if (err) {
                      reject(err);
                    }

                    console.log("moved the file to: " + targetPath);
                    cloudinary.uploader.upload(targetPath, function(result) {
                      console.log(result);
                      resolve(result);
                    });
                  }
                );
              }
            );

            uploadPhotoPromise.then(
              function(result) {
                console.log('uploadPhotoPromise() uploaded the file, public id is: ' + result.public_id);
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
              res.send({
                message: 'Property at ' + property.address + ' has been added successfully!',
                id: docID
              });
            }
          ).catch(
            function(err) {
              console.log('upload photos failed due to: ' + err);
            }
          );
        });
      } catch (e) {
        res.status(404).send({ message: ' Could not add the property.' });
      }
    });
  }
}

module.exports = PropertyService;
