'use strict';

describe('Directive: miniGallery', function () {

  // load the directive's module
  beforeEach(module('neloApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mini-gallery></mini-gallery>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the miniGallery directive');
  }));
});
