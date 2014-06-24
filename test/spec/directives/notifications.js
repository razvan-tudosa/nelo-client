'use strict';

describe('Directive: notifications', function () {

  // load the directive's module
  beforeEach(module('neloApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<notifications></notifications>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the notifications directive');
  }));
});
