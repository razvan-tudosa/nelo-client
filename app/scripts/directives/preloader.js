'use strict';

//Fancy preloader directive

angular.module('neloApp')
  .directive('preloader', function () {
    return {
      templateUrl: './views/directives/preloader.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {}
    };
  });
