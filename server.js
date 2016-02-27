// Babel ES6/JSX Compiler
require('babel-register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var config = require('./config');

const PropertyService = require('./services/PropertyService');
const propertyService = new PropertyService();

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var _ = require('underscore');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

// Express middleware
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/properties/count
 * Returns the total number of properties.
 */
app.get('/api/properties/count', function(req, res, next) {
  return propertyService.getNumberOfProperties(req, res, next);
});

/**
 * GET /api/properties/search
 * Looks up a property by suburb or postcode.
 */
app.get('/api/properties/search', function(req, res, next) {
  res.send({suburb:req.query.suburb});
});

/**
 * GET /api/properties/:suburb
 * List all properties in suburb.
 */
app.get('/api/properties/:suburb', function(req, res, next) {
  propertyService.getPropertyBySuburb(req, res, next);
});

/**
 * GET /api/property/:id
 * Returns detailed property information.
 */
app.get('/api/property/:id', function(req, res, next) {
    propertyService.getPropertyById(req, res, next);
});

/**
 * GET /api/properties
 * Returns all properties.
 */
app.get('/api/properties', function(req, res, next) {
  propertyService.getAllProperties(req, res, next);
});

/**
 * POST /api/properties
 * Adds new property to the database.
 */
app.post('/api/properties', function(req, res, next) {
  propertyService.addProperty(req, res, next);
});

/**
 * GET /api/load
 * Load test data into database, for testing purpose
 * TODO: this needs removed in prod environment
 */
app.get('/api/load', function(req, res, next) {
  propertyService.loadProperties(req, res, next);
});

// React middleware
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
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
