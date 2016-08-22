'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var driverUtils = require('./utils/driver');

mongoose.connect('mongodb://localhost/homebox');

var drivers = driverUtils.loadDrivers();

//setup the HTTP API
var httpApi = require('./httpApi')(app);
var socketApi = require('./socketApi')(app);


//Error handling middleware
app.use(function(err, req, res, next) {
  switch (err.type) {
    case 'Driver':
      console.log(err);
      res.status(500);
      res.json({
        code: 500,
        type: err.type,
        driver: err.driver,
        message: err.message
      });
      break;
    case 'BadRequest':
      res.status(400);
      return res.json({
        code: 400,
        type: err.type,
        message: err.message
      });
      break;
    case 'NotFound':
      res.status(404);
      return res.json({
        code: 404,
        type: err.type,
        message: err.message
      });
      break;
    case 'Validation':
      res.status(400);
      return res.json({
        code: 400,
        type: err.type,
        message: err.message,
        errors: err.errors
      });
      break;
    case 'Connection':
      res.status(503);
      return res.json({
        code: 503,
        type: err.type,
        message: err.message
      });
      break;
    case 'Authentication':
      res.status(401);
      return res.json({
        code: 401,
        type: err.type,
        message: err.message
      });
      break;
    default:
      console.log(err);
      console.log(err.stack);
      res.status(500);
      res.json({
        type: 'Internal',
        code: 500,
        stack: err.stack
      });
  }

});

app.listen(3000, function() {
  console.log('Homebox listening on port 3000!');
});