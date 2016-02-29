var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var suburbSchema = new Schema({
  postcode: String,
  suburb: { type: String, lowercase: true, trim: true },
  state: { type: String, uppercase: true, trim: true }
});

suburbSchema.index({ postcode: 1, suburb: -1 }); // schema level

module.exports = mongoose.model('Suburb', suburbSchema, 'suburb');
