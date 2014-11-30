'use strict';

var _ = require('lodash');
var Garage = require('./garage.model');

// Get list of garages
exports.index = function(req, res) {
  Garage.find(function (err, garages) {
    if(err) { return handleError(res, err); }
    return res.json(200, garages);
  });
};

// Get a single garage
exports.show = function(req, res) {
  Garage.findById(req.params.id, function (err, garage) {
    if(err) { return handleError(res, err); }
    if(!garage) { return res.send(404); }
    return res.json(garage);
  });
};

// Creates a new garage in the DB.
exports.create = function(req, res) {
  Garage.create(req.body, function(err, garage) {
    if(err) { return handleError(res, err); }
    return res.json(201, garage);
  });
};

// Updates an existing garage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Garage.findById(req.params.id, function (err, garage) {
    if (err) { return handleError(res, err); }
    if(!garage) { return res.send(404); }
    var updated = _.merge(garage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, garage);
    });
  });
};

// Deletes a garage from the DB.
exports.destroy = function(req, res) {
  Garage.findById(req.params.id, function (err, garage) {
    if(err) { return handleError(res, err); }
    if(!garage) { return res.send(404); }
    garage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}