'use strict';

angular.module('neloApp')
  .controller('ManageroomsCtrl', [
    '$scope',
    'RestApi',
    function ($scope, RestApi) {

      $scope.date = {
        startDate: null,
        endDate: null
      };

      $scope.showLoader = true;

      $scope.rooms = {};
      $scope.showEditModal = false;
      $scope.showAddModal = false;

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

      

      $scope.filterSearch = function() {
        //filtersToSend = $scope.filters;
        loadData();
      };

      var loadData = function() {

        $scope.showLoader = true;

        RestApi.rooms.getAllRooms({
          filters: filtersToSend
        }).$promise
        .then(function (res) {
          $scope.rooms = res.data.rooms;
        }, function (res) {
          console.log(res);
        })
        .then(function() {
          $scope.showLoader = false;
        });
      };

      loadData();

      $scope.utilityFilter = function(utils) {
        var result = [];
        angular.forEach(utils, function (val, key) {
          if(val) {
            result.push(key);
          }
        });

        return result;
      };

      $scope.edit = function(room) {
        $scope.selectedRoom = room;
        $scope.showEditModal = true;
      };

      $scope.addRoom = function() {
        $scope.showAddModal = true;
      };

      $scope.$on('closeModal', function() {
        loadData();
        $scope.showEditModal = false;
        $scope.showAddModal = false;
      });

    }]);
