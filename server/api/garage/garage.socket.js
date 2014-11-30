/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Garage = require('./garage.model');

exports.register = function(socket) {
  Garage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Garage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('garage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('garage:remove', doc);
}