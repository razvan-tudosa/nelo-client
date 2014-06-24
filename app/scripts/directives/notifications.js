'use strict';

angular.module('neloApp')
  .directive('notifications', function () {
    return {
      templateUrl: './views/directives/notifications.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', '$timeout', 
      function ($scope, $timeout) {
        $scope.alerts = [];

        var addAlert = function(alert) {
          $scope.alerts.push({
            type: 'alert-' + alert.type,
            message: alert.message
          });

          $timeout(function() {
            $scope.alerts.shift(1);
          }, 2000);

        }

        $scope.$on('addAlert', function (e, obj) {
          addAlert(obj);
        });

      }],
      link: function postLink(scope, element, attrs) {}
    };
  });
