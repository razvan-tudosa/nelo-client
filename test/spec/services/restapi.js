'use strict';

describe('Service: Restapi', function () {

  // load the service's module
  beforeEach(module('neloApp'));

  // instantiate service
  var Restapi;
  beforeEach(inject(function (_Restapi_) {
    Restapi = _Restapi_;
  }));

  it('should do something', function () {
    expect(!!Restapi).toBe(true);
  });

});
