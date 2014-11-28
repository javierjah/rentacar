'use strict';

describe('Controller: CarCtrl', function () {

  // load the controller's module
  beforeEach(module('rentaCarApp'));

  var CarCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarCtrl = $controller('CarCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
