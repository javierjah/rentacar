'use strict';

angular.module('rentaCarApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('reserva', {
        url: '/reserva/:id',
        templateUrl: 'app/main/reserva/reserva.html',
        controller: 'ReservaCtrl'
      });
  });