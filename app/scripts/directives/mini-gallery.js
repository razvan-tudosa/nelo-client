'use strict';

//Reusable directive for a mini gallery - helpful on the listing of the rooms

angular.module('neloApp')
  .directive('miniGallery', function () {
    return {
      templateUrl: './views/directives/mini-gallery.html',
      restrict: 'A',
      scope: {
        room: '=room'
      },
      controller: [
        '$scope',
        'RestApi', 
        function ($scope, RestApi) {

          $scope.miniGallery = {
          isFirst: true,
          isLast: null,
          itemNo: 0,
          lastItem: $scope.room.photos.length - 1,
          photoLink: null, 
          next: function() {
            $scope.miniGallery.itemNo++;
            $scope.miniGallery.doSetup();
          },
          prev: function() {
            $scope.miniGallery.itemNo--;
            $scope.miniGallery.doSetup();
          },
          doSetup: function() {
            if($scope.miniGallery.itemNo == 0) {
              $scope.miniGallery.isFirst = true;
            } else {
              $scope.miniGallery.isFirst = false;
            }

            if($scope.miniGallery.itemNo >= $scope.miniGallery.lastItem) {
              $scope.miniGallery.isLast = true;
            } else {
              $scope.miniGallery.isLast = false;
            } 

            $scope.miniGallery.setActivePhoto();

            setTimeout(function() {
              $scope.$apply();
            }, 0);
          },
          setActivePhoto: function() {
            if($scope.room.photos.length != 0) {
              $scope.miniGallery.photoLink = RestApi.getApiUrl() + '/photos/' + $scope.room.photos[$scope.miniGallery.itemNo];
            } else {
              $scope.miniGallery.photoLink = './images/img-not-available.png';
            }
          },
          reset: function() {
            $scope.miniGallery.lastItem = $scope.room.photos.length - 1;
            $scope.miniGallery.itemNo = 0;
          }
        };

        $scope.miniGallery.doSetup();
        }],
      link: function postLink(scope, element, attrs) {
      }
    };
  });
