'use strict';

//This is the Rest Service for the client side

angular.module('neloApp')
  .factory('RestApi', function ($resource) {
    
    var url = {
      cloud: 'http://nelo-server.herokuapp.com/:service/:location/:id',
      local: 'http://127.0.0.1:3000/:service/:location/:id'
    };

    //We can configure the evironment here (for the API)
    var apiUrl = url.local;

    var paramDefaults = {
      service: '@service',
      location: '@location',
      id: '@id'
    }

    return {

      authenticate: $resource(apiUrl, paramDefaults, {
        login: { method: 'POST', params: { service: 'login' }, withCredentials: true},
        logout: { method: 'POST', params: { service: 'logout' }, withCredentials: true},
        testAccess: { method: 'GET', params: { service: 'test-access' }, withCredentials: true}
      }),

      users: $resource(apiUrl, paramDefaults, {
        getAllUsers: { method: 'GET', params: { service: 'users' }, withCredentials: true},
        register: { method: 'POST', params: { service: 'register' }, withCredentials: true},
        getBookings: { method: 'GET', params: { service: 'my-bookings' }, withCredentials: true}
      }),

      rooms: $resource(apiUrl, paramDefaults, {
        getAllRooms: { method: 'POST', params: { service: 'get-rooms' }, withCredentials: true},
        getRoom: { method: 'GET', params: { service: 'room' }, withCredentials: true},
        bookRoom: { method: 'POST', params: { service: 'book-room' }, withCredentials: true},
        changeBookingStatus: { method: 'POST', params: { service: 'change-booking-status' }, withCredentials: true},
        addRoom: { method: 'POST', params: { service: 'room' }, withCredentials: true},
        updateRoom: { method: 'PUT', params: { service: 'room' }, withCredentials: true},
        deletePhoto: { method: 'DELETE', params: { service: 'photo' }, withCredentials: true},
      }),

      notifications: $resource(apiUrl, paramDefaults, {
        getAlerts: { method: 'GET', params: { service: 'notifications' }, withCredentials: true},
        countNewAlerts: { method: 'GET', params: { service: 'notifications', location: 'new' }, withCredentials: true},
        markAlerts: { method: 'PUT', params: { service: 'notifications', location: 'mark' }, withCredentials: true},
      }),

      file: $resource(apiUrl, paramDefaults, {
        upload: { 
          method: 'POST', 
          params: { service: 'upload' }, 
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}, 
          withCredentials: true
        },

      }),

      getApiUrl: function() { 

        var parser = document.createElement('a');
        parser.href = apiUrl;

        var url = parser.protocol + '//' + parser.host;
        return url; 
      }
    }
  });
