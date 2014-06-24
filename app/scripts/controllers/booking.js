'use strict';

angular.module('neloApp')
  .controller('BookingCtrl', [
    '$scope',
    '$timeout',
    'RestApi',
    'userDetails',
    function ($scope, $timeout, RestApi, userDetails) {
      
      $scope.date = {
        startDate: null,
        endDate: null
      };

      $scope.minDate = moment();

      $scope.userDetails = userDetails.getDetails();

      $scope.rooms = {};

      $scope.filters = {
        booking: {
          startDate: moment($scope.date.startDate).format('YYYY-MM-DD'),
          endDate: moment($scope.date.endDate).format('YYYY-MM-DD')
        },
        utilities: {
          jacuzzi: false,
          shower: false,
          bathtub: false,
          television: false,
          telephone: false,
          towels: false,
        },
        services: {
          breakfast: false,
          roomservice: false,
          wifi: false
        }
      };

      var filtersToSend = {
        utilities: [],
        services: []
      };
      
      $scope.$watch(function () {
        return $scope.filters;
      }, function (val) {

        filtersToSend.utilities = [];
        filtersToSend.services = [];

        for (var utility in val.utilities) {
          if(val.utilities[utility]) {
            filtersToSend.utilities.push(utility);
          }
        }

        for (var service in val.services) {
          if(val.services[service]) {
            filtersToSend.services.push(service);
          }
        }
      }, true);
      

      $scope.utilityFilter = function(utils) {
        var result = [];
        angular.forEach(utils, function (val, key) {
          if(val) {
            result.push(key);
          }
        });

        return result;
      };

      $scope.formatDate = function(date) {
        return moment(date).format('MMMM Do YYYY');
      };

      $scope.book = function(room) {
        console.log(room, $scope.userDetails._id);
        RestApi.rooms.bookRoom({
          id: room._id,
          booking: {
            startDate: moment($scope.date.startDate).format('YYYY-MM-DD'),
            endDate: moment($scope.date.endDate).format('YYYY-MM-DD')
          }
        }).$promise
        .then(function (res) {
          $scope.$emit('addAlert', {
            type: 'success',
            message: res.message
          });
        }, function (res) {
          $scope.$emit('addAlert', {
            type: 'danger',
            message: res.message
          });
        });
      };

      $scope.search = function() {

        filtersToSend.booking = {
          startDate: moment($scope.date.startDate).format('YYYY-MM-DD'),
          endDate: moment($scope.date.endDate).format('YYYY-MM-DD')
        };

        RestApi.rooms.getAllRooms({
          'filters': filtersToSend
        }).$promise
        .then(function (res) {
          $scope.rooms = res.data.rooms;
        }, function (res) {
          console.log(res);
        });

      };
      //Logout event listener
      $scope.$on('loggedOut', function() {
        $scope.userDetails = userDetails.getDetails();

        setTimeout(function() {
          $scope.$apply();
        }, 0);
      });

    }
  ]);
