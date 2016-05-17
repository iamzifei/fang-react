//import bcrypt from 'bcrypt-nodejs'
import bcrypt from 'bcrypt-nodejs'
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const SALT_ROUND = 10

var userSchema = new Schema({
    email: {type: String, required: true, trim: true, index: { unique: true } },
    name: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number },
    address: {type: String}
})

userSchema.pre('save', function(next) {
    var user = this;

    bcrypt.genSalt(SALT_ROUND, function(err, salt){
      if (err) return next(err)
      else {
        bcrypt.hash(user.password, salt, null, function(err, hash){
          if(err) return next(err)
          else {
            user.password = hash
            next()
          }
        })
      }
    })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err, false);
        return callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema, 'user');
