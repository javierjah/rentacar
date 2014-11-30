'use strict';

angular.module('rentaCarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('garage', {
        url: '/garage',
        templateUrl: 'app/garage/garage.html',
        controller: 'GarageCtrl'
      });
  });