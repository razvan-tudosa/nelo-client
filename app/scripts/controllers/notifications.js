'use strict';

angular.module('neloApp')
  .controller('NotificationsCtrl', [
    '$scope',
    'RestApi',
    function ($scope, RestApi) {
      

      $scope.notifications = [];

      $scope.selectedAlerts = [];

      $scope.messageToSend = '';

      $scope.$watch(function () {
        return $scope.notifications;
      }, function (notifications) {
        $scope.selectedAlerts = [];
        angular.forEach(notifications, function(alert) {
          if(alert.isSelected) {
            $scope.selectedAlerts.push(alert._id);
          }
        });

        console.log($scope.selectedAlerts);
      }, true);

      function loadAlerts() {
        //Fetch notifications
        RestApi.notifications.getAlerts().$promise
        .then(function (res) {
          $scope.notifications = res.data;
        }, function (res) {
          console.log(res);
        });
      };

      loadAlerts();

      $scope.markAlerts = function(status) {

        RestApi.notifications.markAlerts({
          alerts: $scope.selectedAlerts,
          'status': status
        }).$promise
        .then(function (res) {
          $scope.$emit('addAlert', {
            type: 'success',
            message: res.message
          });
          loadAlerts();
        }, function (res) {
          $scope.$emit('addAlert', {
            type: 'danger',
            message: res.message
          });
        });

      };

      $scope.changeBookingStatus = function(status, alert, msg) {
        RestApi.rooms.changeBookingStatus({
          newStatus: status,
          bookingId: alert.booking.id,
          clientEmail: alert.user.email,
          userId: alert.user.userid,
          alertId: alert._id,
          roomId: alert.booking.roomid,
          message: msg

        }).$promise
        .then(function (res) {
          $scope.$emit('addAlert', {
            type: 'success',
            message: res.message
          });
          loadAlerts();
        }, function (res) {
          $scope.$emit('addAlert', {
            type: 'danger',
            message: res.message
          });
        });
      };

      $scope.aprooveBooking = function(alert) {
        //$scope.showModal = true;
        $scope.changeBookingStatus('aprooved', alert, '');
      };

      var cacheAlert;

      $scope.rejectBooking = function(alert) {
        $scope.showModal = true;
        cacheAlert = alert;
      };

      $scope.sendMessage = function() {
        console.log($scope.messageToSend);
        $scope.changeBookingStatus('rejected', cacheAlert, $scope.messageToSend);
        $scope.close();
      };

      $scope.close = function() {
        $scope.showModal = false;
      }

    }]);
