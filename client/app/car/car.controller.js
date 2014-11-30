'use strict';

angular.module('rentaCarApp')
  .controller('CarCtrl', function ($scope, $http, socket, $state) {

$scope.garage = '';

 $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.nombre === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.nombre });
      $scope.nombre = '';
      $scope.patente = '';
      $scope.color = '';
      $scope.marca = '';
      $scope.tipo = '';
      $scope.garage = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });


  $scope.addAuto = function (){
    $state.go('car');

	};



  });
