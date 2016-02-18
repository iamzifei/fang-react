var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
  propertyId: { type: String, unique: true, index: true },
  suburb: String,
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
  preferedContact: String,
  bond: String,
  availableStart: String,
  minTerm: { type: Number, default: 4 },
  furnished: Boolean,
  femalePrefer: Boolean,
  nonSmoker: Boolean,
  petAllowed: Boolean,
  billInclude: Boolean,
  fastInternet: Boolean
});

module.exports = mongoose.model('Property', propertySchema);
