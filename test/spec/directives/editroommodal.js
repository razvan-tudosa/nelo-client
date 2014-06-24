'use strict';

describe('Directive: editRoomModal', function () {

  // load the directive's module
  beforeEach(module('neloApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-room-modal></edit-room-modal>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the editRoomModal directive');
  }));
});
