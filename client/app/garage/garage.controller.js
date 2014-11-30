'use strict';

angular.module('rentaCarApp')
  .controller('GarageCtrl', function ($scope, $http, socket, $state) {
    $scope.nombre = '';
    $scope.direccion ='';

    $http.get('/api/garages').success(function(garages) {
      $scope.garages = garages;
      socket.syncUpdates('garage', $scope.garages);
    });

    $scope.addGarage = function() {
      if ($scope.nombre === '') {
        return;
      }
      $http.post('/api/garages', {
        nombre: $scope.nombre,
        direccion: $scope.direccion

      });
      $scope.nombre = '';
      $scope.direccion = '';
    };

    $scope.deleteGarage = function(garage) {
      $http.delete('/api/garages/' + garage._id);
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('garage');
    });


    $scope.addAuto = function() {
      $state.go('car');

    };



  });