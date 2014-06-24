'use strict';

angular.module('neloApp')
  .controller('MainCtrl', ['$scope', '$http', 'RestApi', function ($scope, $http, RestApi) {
    
    //Home page slider timer
    $scope.myInterval = 5000;

    //Home page slides
    $scope.slides = [
      { image:'./images/carousel/slide-1.jpg'},
      { image:'./images/carousel/slide-3.jpg'},
      { image:'./images/carousel/slide-4.jpg'},
      { image:'./images/carousel/slide-5.jpg'},
      { image:'./images/carousel/slide-6.jpg'},
      { image:'./images/carousel/slide-7.jpg'},
      { image:'./images/carousel/slide-8.jpg'},
      { image:'./images/carousel/slide-9.jpg'},
      { image:'./images/carousel/slide-10.jpg'},
      { image:'./images/carousel/slide-11.jpg'}
    ];

  }]);
