'use strict';

describe('Service: Userdetails', function () {

  // load the service's module
  beforeEach(module('neloApp'));

  // instantiate service
  var Userdetails;
  beforeEach(inject(function (_Userdetails_) {
    Userdetails = _Userdetails_;
  }));

  it('should do something', function () {
    expect(!!Userdetails).toBe(true);
  });

});
