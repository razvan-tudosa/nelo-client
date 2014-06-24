'use strict';

angular.module('neloApp')
  .controller('MyBookingsCtrl', [
  '$scope', 
  '$rootScope',
  '$location',
  '$timeout',
  'RestApi',
  'userDetails',
  function ($scope, $rootScope, $location, $timeout, RestApi, userDetails) {

    var checkCredentials = function() {

      var user = userDetails.getDetails();

      var isEmpty = function(obj) {
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop)) {
            return false;
          }
        }

        return true;
      };

      if( isEmpty(user) || ( !isEmpty(user) && user.isAdmin ) ) {
        $location.path('/');
      }
    };

    $scope.bookings = [];

    $scope.$on('checkCredentials', function (e) {
      checkCredentials();
    });
  
    RestApi.users.getBookings().$promise
    .then(function (res) {
      $scope.bookings = res.data;
    }, function (res) {
      console.log(res);
    });

  }]);
