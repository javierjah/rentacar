'use strict';

var _ = require('lodash');
var Car = require('./car.model');
var bdd = require('../../config/bdd.js');

// Get list of cars
exports.index = function(req, res) {

  var queryString = 'SELECT * FROM car';

  bdd.query(queryString, function(err, rows, fields) {
    if (err) return handleError(res, err);
    return res.json(200, {
      car: rows
    });
  });
};

// Get a single car
exports.show = function(req, res) {
  Car.findById(req.params.id, function(err, car) {
    if (err) {
      return handleError(res, err);
    }
    if (!car) {
      return res.send(404);
    }
    return res.json(car);
  });
};

// Creates a new car in the DB.
exports.create = function(req, res) {
  var queryString = 'INSERT INTO clientes SET ?';
  bdd.query(queryString, req.body, function(err, result) {
    if (err) return handleError(res, err);
    res.json(result);
  });
};

// Updates an existing car in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var _id = req.params.clienteId;
  // console.log(req.body);
  var queryString = 'UPDATE clientes SET ? WHERE _id=' + _id;
  bdd.query(queryString, req.body, function(err, result) {
    if (err) return handleError(res, err);
    res.json(result);
  });
};
// Deletes a car from the DB.
exports.destroy = function(req, res) {

  var id = res.locals.producto._id;
  var queryString = 'SELECT * FROM ventas_detalles WHERE producto_id = "' + id + '"';
  bdd.query(queryString, function(err, result) {
    if (err) throw err;
    // an example using an object instead of an array
    async.series({
        one: function(callback) {
          async.each(result, function(data, cb) {
            var queryString = 'DELETE FROM garage WHERE garage._id =' + data.garage_id;
            bdd.query(queryString, function(err, result) {
              if (err) throw err;
              cb();
            });
          }, function(err) {
            if (err) throw err;
            callback(null, 1);
          });
        },
        two: function(callback) {
          var queryString = 'DELETE FROM ventas_detalles WHERE producto_id="' + id + '"';
          bdd.query(queryString, function(err, result) {
            if (err) throw err;
            callback(null, 2);
          });
        },
        three: function(callback) {
          var queryString = 'DELETE FROM productos WHERE _id="' + id + '"';
          bdd.query(queryString, function(err, result) {
            if (err) throw err;
            callback(null, 3);
          });
        }
      },
      function(err, results) {
        if (err) console.log("error");
        else res.redirect('/productos');
      });

  });






  Car.findById(req.params.id, function(err, car) {
    if (err) {
      return handleError(res, err);
    }
    if (!car) {
      return res.send(404);
    }
    car.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}