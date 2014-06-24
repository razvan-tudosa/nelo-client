'use strict';

angular
  .module('neloApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'daterangepicker',
  ])
  .run(function ($rootScope, RestApi, userDetails, $timeout) { 
    //This piece of code runs at the app's start up and checks 
    //if the user is already logged in on the server side

    var query = RestApi.authenticate.testAccess({});

    query.$promise
    .then(function (res) {
      userDetails.setDetails(res.user);

      $timeout(function() {
        $rootScope.$broadcast('loggedIn');
      }, 0);

    }, function (res) {
      //Server Error
      console.log(res);
    })
    .then(function() {
      $timeout(function() {
        $rootScope.$broadcast('checkCredentials');
      }, 500);
    });
  })
  .config(function ($routeProvider, $httpProvider, $locationProvider) {
    //This takes care of the app's routing

    $routeProvider
      .when('/', {
        templateUrl: 'views/routes/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/routes/login.html',
        controller: 'LoginCtrl'
      })
      .when('/rooms', {
        templateUrl: 'views/routes/rooms.html',
        controller: 'RoomsCtrl'
      })
      .when('/booking', {
        templateUrl: 'views/routes/booking.html',
        controller: 'BookingCtrl'
      })
      .when('/manage-rooms', {
        templateUrl: 'views/routes/managerooms.html',
        controller: 'ManageroomsCtrl',
        resolve: {
          checkCredentials: function($location, userDetails, $timeout) {
            
            $timeout(function() {
              if(!userDetails.getDetails().isAdmin) {
                $location.path('/');
              }
            }, 500);
          }
        }
      })
      .when('/my-bookings', {
        templateUrl: 'views/routes/my-bookings.html',
        controller: 'MyBookingsCtrl'
      })
      .when('/notifications', {
        templateUrl: 'views/routes/notifications.html',
        controller: 'NotificationsCtrl',
         resolve: {
          checkCredentials: function($location, userDetails, $timeout) {
            
            $timeout(function() {
              if(!userDetails.getDetails().isAdmin) {
                $location.path('/');
              }
            }, 100);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.defaults.headers.withCredentials = true; //This sets up our requests so the server knows we should be authenticated
      $httpProvider.defaults.useXDomain = true; //This enables cross-domain calls
  });
