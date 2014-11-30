'use strict';

var _ = require('lodash');
var Reserva = require('./reserva.model');

// Get list of reservas
exports.index = function(req, res) {
  Reserva.find(function (err, reservas) {
    if(err) { return handleError(res, err); }
    return res.json(200, reservas);
  });
};

// Get a single reserva
exports.show = function(req, res) {
  Reserva.findById(req.params.id, function (err, reserva) {
    if(err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    return res.json(reserva);
  });
};

// Creates a new reserva in the DB.
exports.create = function(req, res) {
  Reserva.create(req.body, function(err, reserva) {
    if(err) { return handleError(res, err); }
    return res.json(201, reserva);
  });
};

// Updates an existing reserva in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reserva.findById(req.params.id, function (err, reserva) {
    if (err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    var updated = _.merge(reserva, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reserva);
    });
  });
};

// Deletes a reserva from the DB.
exports.destroy = function(req, res) {
  Reserva.findById(req.params.id, function (err, reserva) {
    if(err) { return handleError(res, err); }
    if(!reserva) { return res.send(404); }
    reserva.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}