'use strict';

angular.module('neloApp')
  .filter('capitalize', function () {
    return function (input) {
      return input[0].toUpperCase() + input.substr(1);
    };
  });
