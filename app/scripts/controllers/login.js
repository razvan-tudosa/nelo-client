'use strict';

angular.module('neloApp')
  .controller('LoginCtrl', [
    '$scope', 
    'RestApi', 
    '$location', 
    'userDetails',
    function ($scope, RestApi, $location, userDetails) {
  
      $scope.credentials = {
        username: '',
        password: '',
        email: '',
        phone: '',
        reTypePassword: ''
      };  

      $scope.showLoader = false;

      $scope.actionType = 'login';

      $scope.login = function () {

        var query = RestApi.authenticate.login({
          username: $scope.credentials.username,
          password: $scope.credentials.password
        });

        $scope.showLoader = true;

        query.$promise
        .then(function (res) {

            $scope.$emit('addAlert', {
              type: 'success',
              message: res.message
            });

            userDetails.setDetails(res.user);
            
            setTimeout(function() {
              $scope.$emit('loggedIn');
              $scope.close();
              $scope.showLoader = false;
            }, 100);

            
        }, function (res) {
          //Server Error

          $scope.$emit('addAlert', {
            type: 'danger',
            message: res.data.message
          });

          $scope.showLoader = false;
        });
      };

      $scope.register = function () {

        $scope.showLoader = true;

        var query = RestApi.users.register({
          username: $scope.credentials.username,
          password: $scope.credentials.password,
          email : $scope.credentials.email,
          phone: $scope.credentials.phone
        });

        var userDetails;
        
        query.$promise
        .then(function (res) {

          $scope.credentials = {
            username: '',
            password: '',
            email: '',
            phone: '',
            reTypePassword: ''
          };  

          $scope.actionType = 'login';

          $scope.$emit('addAlert', {
            type: 'success',
            message: res.message
          });

        }, function (res) {
          //Server Error
          
          $scope.$emit('addAlert', {
            type: 'danger',
            message: res.data.message
          });

        })
        .then(function() {
          $scope.showLoader = false;
        });
      };

      function isNumeric(charToTest) {
        var regExp = /[0-9]/;
        return regExp.test(charToTest);
      };

      //Phone Validation only digits allowed
      $scope.$watch(function () {
        return $scope.credentials.phone;
      }, function (newVal, oldVal) {

        if(newVal != oldVal) {
          if( !isNumeric($scope.credentials.phone[$scope.credentials.phone.length - 1]) ) {
            $scope.credentials.phone = $scope.credentials.phone.slice(0, $scope.credentials.phone.length - 1);
          }
        }
      })

      $scope.close = function() {
        $location.path('/');
      };

    }]);
