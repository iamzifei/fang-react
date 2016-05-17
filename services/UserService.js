'use strict';
const User = require('../models/user');

class UserService {
    //for signup validation
    findUserWithEmail(req, res, next){
        try{
            var email = req.query.email;
            User.findOne({email: email}, function(err, user){
                if (err) return next(err);
                if (!user){
                    return res.send({
                      userFound: false,
                      userEmail: '',
                      userName: ''
                    });
                }
                res.send({
                  userFound: true,
                  userEmail: user.email,
                  userName: user.name
                });
            })
        }catch(error){
            console.log(error);
        }
    }

    //register new user
    signupUser(req, res, next){
      try{
        var newUser = new User({
          email : req.query.email,
          name : req.query.name,
          password : req.query.password
        })
        newUser.save(function(err, newUser){
          if(err) return console.error(err);
          else {
            return res.send({
              isAuthenticated : true,
              currentUser : {
                email : newUser.email,
                name : newUser.name
              }
            })
          }
        })
      }
      catch(error){
          console.log(error);
      }
    }

    passportLoginStrategy(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        user.comparePassword(password, function(err, isMatch){
          if (err)
            return done(null, false, { message: err })
          if (!isMatch)
            return done(null, false, { message: 'Incorrect password.' })
          return done(null, user);
        })
      })
    }

}

module.exports = UserService;
