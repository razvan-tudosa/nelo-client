'use strict';

//This directive takes care of the menu

angular.module('neloApp')
  .directive('customHeader', function () {
    return {
      templateUrl: './views/directives/customHeader.html',
      restrict: 'E',
      replace: true,
      controller: [
      '$scope', 
      '$location',
      'RestApi',
      'userDetails',
      '$rootScope',
      function ($scope, $location, RestApi, userDetails, $rootScope) {
        
        $scope.loggedIn = false;
        $scope.userDetails = {};
        $scope.newAlerts;
        
        $scope.isActive = function(viewLocation) {
          return viewLocation === $location.path();
        };

        $scope.logout = function() {

          var query = RestApi.authenticate.logout({});

          query.$promise
          .then(function (res) {
            $scope.loggedIn = false;
            $scope.userDetails = {};
            userDetails.logout();
            $rootScope.$broadcast('loggedOut');
            $location.path('/');
          }, function (res) {
            //Server Error
            console.log(res);
          });
        };

        $scope.$on('loggedIn', function (event) {
          $scope.loggedIn = true;
          $scope.userDetails = userDetails.getDetails();

          if($scope.userDetails.isAdmin) {
            RestApi.notifications.countNewAlerts().$promise
            .then(function (res) {
              console.log(res);
              $scope.newAlerts = res.newMessages;
            }, function (res) {
              console.log(res);
            });
          }
        });

        

      }],
      link: function postLink(scope, element, attrs) {}
    };
  });
