'use strict';

angular.module('neloApp')
  .controller('RoomsCtrl', [
    '$scope',
    'RestApi',
    function ($scope, RestApi) {

      $scope.rooms = [
        {
          image: './images/rooms/room1.jpg',
          title: 'Single Standard',
          description: 'Spacious, bright and outward facing rooms comes with a modern bathroom equipped with shower and fluffy towels, phone, free Wi-fi and home automation system which automatically regulates the temperature of the room based on guest presence or absence from the room.'
        },
        {
          image: './images/rooms/room2.jpg',
          title: 'Single Deluxe',
          description: 'Special room comes with double bed a modern, fully equipped bathroom including bathtub and fluffy  towels. It also has a home automation system which automatically regulates the temperature of the room based on guest presence or absence from the room. Free Wi-fi and phone are also included, along a big flat tv-screen. Breakfast included.'
        },
        {
          image: './images/rooms/room3.jpg',
          title: 'Twin Standard',
          description: 'Spacious, bright and outward facing rooms comes with two comfortable single beds, a modern bathroom equipped with shower and fluffy towels, phone, free Wi-fi and home automation system which automatically regulates the temperature of the room based on guest presence or absence from the room.'
        },
        {
          image: './images/rooms/room4.jpg',
          title: 'Triple Standard',
          description: 'Spacious, bright and outward facing rooms comes with three comfortable single beds, a modern bathroom equipped with shower and fluffy towels, phone, free Wi-fi and home automation system which automatically regulates the temperature of the room based on guest presence or absence from the room.'
        },
        {
          image: './images/rooms/room5.jpg',
          title: 'Double Standard',
          description: 'Spacious, bright and outward facing rooms comes with a king sized bed and a modern bathroom equipped with shower and fluffy towels, phone, free Wi-fi and home automation system which automatically regulates the temperature of the room based on guest presence or absence from the room.'
        },
        {
          image: './images/rooms/room6.jpg',
          title: 'Double Deluxe',
          description: 'Special room comes with a king sized bed and a modern, fully equipped bathroom including bathtub and fluffy  towels. It also has a home automation system which automatically regulates the temperature of the room based on guest presence or absence from the room. Free Wi-fi and phone are also included, along a big flat tv-screen. Breakfast included and the awesome view is awsome.'
        }
      ];

    }]);
