'use strict';

angular.module('neloApp')
  .directive('fileUpload', function ($parse, $timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        
        element.bind('change', function() {
          $parse(attrs.fileUpload)
          .assign(scope, element[0].files)
        });

        $timeout(function() {
          scope.$apply();
        },0);
      }
    };
  });
