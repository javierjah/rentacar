'use strict';

describe('Controller: GarageCtrl', function () {

  // load the controller's module
  beforeEach(module('rentaCarApp'));

  var GarageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GarageCtrl = $controller('GarageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
