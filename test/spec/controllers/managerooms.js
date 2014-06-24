'use strict';

describe('Controller: ManageroomsCtrl', function () {

  // load the controller's module
  beforeEach(module('neloApp'));

  var ManageroomsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageroomsCtrl = $controller('ManageroomsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
