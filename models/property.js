var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var propertySchema = new Schema({
  updated: { type: Date, default: Date.now },
  suburb: { type: String, trim: true },
  postcode: String,
  price: String,
  address: String,
  imageCount: { type: Number, default: 0 },
  title: String,
  details: String,
  propertyType: String,
  roomType: String,
  contactName: String,
  contactNumber: String,
  contactEmail: String,
  contactSocial: String,
  preferredContact: String,
  bond: String,
  availableStart: String,
  minTerm: { type: Number, default: 4 },
  propertyFeature: []
});

module.exports = mongoose.model('Property', propertySchema, 'property');
