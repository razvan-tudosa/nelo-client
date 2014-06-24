'use strict';

describe('Controller: MyBookingsCtrl', function () {

  // load the controller's module
  beforeEach(module('neloApp'));

  var MyBookingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyBookingsCtrl = $controller('MyBookingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
