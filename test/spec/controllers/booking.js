'use strict';

describe('Controller: BookingCtrl', function () {

  // load the controller's module
  beforeEach(module('neloApp'));

  var BookingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookingCtrl = $controller('BookingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
