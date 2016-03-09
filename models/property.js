var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var propertySchema = new Schema({
  updated: { type: Date, default: Date.now },
  suburb: { type: String, set: capitalize, trim: true },
  postcode: String,
  price: { type: Number },
  address: { type: String, set: capitalize, trim: true },
  imageCount: { type: Number, default: 0 },
  title: String,
  details: String,
  propertyType: { type: String, lowercase: true, trim: true },
  roomType: { type: String, lowercase: true, trim: true },
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

function capitalize (val) {
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1);
}

module.exports = mongoose.model('Property', propertySchema, 'property');
