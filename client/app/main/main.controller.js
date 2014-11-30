'use strict';

angular.module('rentaCarApp')
  .controller('MainCtrl', function ($scope, $http, socket, $state) {
    $scope.Things = [];
    $scope.autos = {};

    $http.get('/api/things').success(function(Things) {
      $scope.Things = Things;
      socket.syncUpdates('thing', $scope.Things);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
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
