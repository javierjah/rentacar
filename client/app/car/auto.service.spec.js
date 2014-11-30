'use strict';

describe('Service: auto', function () {

  // load the service's module
  beforeEach(module('rentaCarApp'));

  // instantiate service
  var auto;
  beforeEach(inject(function (_auto_) {
    auto = _auto_;
  }));

  it('should do something', function () {
    expect(!!auto).toBe(true);
  });

});
