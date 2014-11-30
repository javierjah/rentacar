'use strict';

angular.module('rentaCarApp')
  .factory('Auto', function ($http) {
    var values = {};
    var url = '/api/things';

    values.get = function(){
      return $http.get(url);
    };

    values.post = function(value){
      return $http.post(url, value);
    };

    values.delete = function(value){
      return $http.delete(url + '/' + value);
    };

    values.getOne = function(value){
      return $http.get(url + '/' + value);
    };

    return values;

  });
