'use strict';

angular.module('rentaCarApp')
  .controller('ReservaCtrl', function ($scope, Auto, $stateParams) {
    $scope.autos = [];


     Auto.getOne($stateParams.id).success(function(autos) {
      $scope.autos = autos;
      console.log($scope.autos);
    });

  });
