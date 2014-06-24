'use strict';

//This simple service remembers our user
//so we can have acces to the user details throughout the app

angular.module('neloApp')
  .factory('userDetails', function() {
    
    var userDetails = {};

    return {
      setDetails: function(user) {
        userDetails = user;
      },
      getDetails: function() {
        return userDetails;
      },
      logout: function() {
        userDetails = {};
      }
    };
  });
