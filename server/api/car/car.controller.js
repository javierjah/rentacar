'use strict';
var async = require('async');
var _ = require('lodash');
var Car = require('./car.model');
var bdd = require('../../config/bdd.js');

module.exports = function(app, bdd) {
  app.param('carId', function(req, res, next, id) {
    var queryString = 'SELECT * FROM car WHERE id=' + id;
    bdd.query(queryString, function(err, result) {
      if (err) next(err);
      res.locals.carId = result[0];
      next();
    });

  });


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
    var queryString = 'INSERT INTO car  SET ?';
    bdd.query(queryString, req.body, function(err, result) {
      if (err) return handleError(res, err);
      res.json(result);
    });
  };

  // Updates an existing car in the DB.
  exports.update = function(req, res) {
    // if (req.body.id) {
    //   delete req.body.id;
    // }
    var id = req.params.id;
    // console.log(req.body);
    var queryString = 'UPDATE car SET ? WHERE id=' + id;
    bdd.query(queryString, req.body, function(err, result) {
      if (err) return handleError(res, err);
      res.json(result);
    });
  };
  // Deletes a car from the DB.
  exports.destroy = function(req, res) {

    var id = res.locals.carId;
    var queryString = 'SELECT * FROM car WHERE car.id = "' + id + '"';
    bdd.query(queryString, function(err, result) {
      if (err) throw err;
      // an example using an object instead of an array
      async.series({
          one: function(callback) {
            async.each(result, function(data, callback) {
              var queryString = 'DELETE FROM garage WHERE garage.id =' + data.id;
              bdd.query(queryString, function(err, result) {
                if (err) throw err;
                callback();
              });
            }, function(err) {
              if (err) throw err;
              callback(null, 1);
            });
          },
          two: function(callback) {
            var queryString = 'DELETE FROM car WHERE id="' + id + '"';
            bdd.query(queryString, function(err, result) {
              if (err) throw err;
              callback(null, 2);
            });
          }
        },
        function(err, results) {
          if (err) console.log("handleError");
          else res.json(results);
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

}