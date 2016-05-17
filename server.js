import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, Router, match } from 'react-router'
import configureStore from './app/stores/configureStore'

var swig  = require('swig');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var mongoose = require('mongoose');
var config = require('./config');

const PropertyService = require('./services/PropertyService');
const propertyService = new PropertyService();
const LocationService = require('./services/LocationService');
const locationService = new LocationService();
const SearchService = require('./services/SearchService');
const searchService = new SearchService();

//zack user related
const UserService = require('./services/UserService');
const userService = new UserService();
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport  from 'passport'
var LocalStrategy = require('passport-local').Strategy;
//zack to fix server render warning
//const rootReducer = require('./app/reducers')
import User from './models/user'

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var _ = require('underscore');

var counterpart = require('counterpart');

counterpart.registerTranslations('en', require('./locales/en.json'));
counterpart.registerTranslations('cn', require('./locales/cn.json'));
counterpart.setLocale('cn');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

// Express middleware
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(favicon('./public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

//zack Passport module config
app.use(session({
  secret: 'keyboard cat',
  cookie : {maxAge : 3600000}
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  userService.passportLoginStrategy
));
passport.serializeUser(function(user, done){
  console.log('serializeUser')
   	  done(null, user.email);
});
passport.deserializeUser(function(userEmail, done){
  console.log('deserializeUser')
  User.findOne({email : userEmail}, function(err, user){
    if(err){
      return done(err, null);
    }
    user.password = '';
    done(null, user);
  });
});

/**
 * GET /api/suburb
 * Looks up a suburb auto suggestions.
 */
app.get('/api/suburb', function(req, res, next) {
  locationService.getSuburbSuggestions(req, res, next);
});

/**
 * GET /api/properties
 * Returns all properties.
 */
app.get('/api/properties', function(req, res, next) {
  searchService.getProperties(req, res, next);
});

/**
 * GET /api/search
 * ?suburb=2134&sort=time&term=s&room=single&property=house&feature=furnished
 * &feature=femalePrefer&feature=nonSmoker&feature=petAllowed&feature=billInclude&feature=fastInternet
 * Looks up a property by search refinement criteria
 */
app.get('/api/search', function(req, res, next) {
  searchService.getProperties(req, res, next);
});

/**
 * GET /api/count
 * Returns the total number of properties by filters
 */
app.get('/api/count', function(req, res, next) {
  searchService.getPropertiesCount(req, res, next);
});

/**
 * GET /api/property/:id
 * Returns detailed property information.
 */
app.get('/api/property/:id', function(req, res, next) {
    propertyService.getPropertyById(req, res, next);
});

/**
 * POST /api/properties
 * Adds new property to the database.
 */
app.post('/api/properties', function(req, res, next) {
  propertyService.addProperty(req, res, next);
});

/**
 * GET /api/find_user
 * find user by email.
 */
app.get('/api/find_user', function(req, res, next){
     userService.findUserWithEmail(req, res, next);
})

/**
  * POST /api/signup_user
  * save new user to database.
  */
app.post('/api/signup_user', function(req, res, next){
  userService.signupUser(req, res, next);
})

/**
 * POST /api/login
 * authenticate user login.
 */
 app.post('/api/login', function(req, res, next){
      passport.authenticate('local', function(err, user, info){
        if (err) {return next(err)}
        if (!user)
          return res.send(info)
       //logIn() is attached by passport middleware
       req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.send({
            isAuthenticated: true,
            email : user.email,
            name : user.name
          })
        })
      })(req, res, next)
    })

/**
 * GET /api/logout
 * logout and remove user from session.
 */
app.get('/api/logout', function(req, res){
    req.logout();
    res.send(true)
})

/**
 * GET /api/loadUserFromSession
 * check is user exist in passport session,
 * if user exist in session, passport middleware will attach user to req.user
 * then send user info back
 */
 app.get('/api/loadUserFromSession', function(req, res){
    res.send(req.user)
 })

// React middleware
app.use(function(req, res) {
  match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = configureStore()
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )
      var title = counterpart('site.title');
      var desc = counterpart('site.desc');
      var page = swig.renderFile('views/index.html', { html: html, title: title, desc: desc });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

var server = require('http').createServer(app);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
