'use strict';

angular.module('rentaCarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('car', {
        url: '/car',
        templateUrl: 'app/car/car.html',
        controller: 'CarCtrl'
      });
  });