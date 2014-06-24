'use strict';

//This directive takes care of the Edit Room Modal for the Admin CMS

angular.module('neloApp')
  .directive('editRoomModal', function () {
    return {
      templateUrl: './views/directives/editroommodal.html',
      restrict: 'A',
      scope: {
        room: '=selectedRoom'
      },
      controller: [
      '$scope',
      'RestApi',
      function ($scope, RestApi) {

        //Mini Gallery API
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
              $scope.miniGallery.photoLink = '/images/img-not-available.png';
            }
          },
          reset: function() {
            $scope.miniGallery.lastItem = $scope.room.photos.length - 1;
            $scope.miniGallery.itemNo = 0;
          }
        };

        $scope.miniGallery.doSetup();

        //Upload the photos to the server
        $scope.upload = function() {
          var fd = new FormData();
          angular.forEach($scope.files, function (file) {
            fd.append('file', file);
          }); 

          RestApi.file.upload(fd).$promise
          .then(function (res) {
            angular.forEach(res.files, function (item) {
              $scope.room.photos.push(item);
            });
            $scope.update($scope.reloadData);
          }, function (res) {
            console.log(res);
          });
        };

        $scope.close = function() {
          $scope.$emit('closeModal');
        };

        $scope.update = function(callback) {
          RestApi.rooms.updateRoom({
            id: $scope.room._id,
            room: $scope.room
          }).$promise
          .then(function (res) {
            console.log(res);
            $scope.$emit('addAlert', {
              type: 'success',
              message: res.message
            });
            callback();
          }, function (res) {
            console.log(res);
            $scope.$emit('addAlert', {
              type: 'danger',
              message: res.message
            });
          });

        };

        $scope.reloadData = function() {
          RestApi.rooms.getRoom({
            id: $scope.room._id,
          }).$promise
          .then(function (res) {
            $scope.room = res.room[0];
            $scope.miniGallery.reset();
            $scope.miniGallery.doSetup();

          }, function (res) {
            console.log(res);
          });
        };

        $scope.deletePhoto = function() {

          RestApi.rooms.deletePhoto({
            id: $scope.room.photos[$scope.miniGallery.itemNo]
          }).$promise
          .then(function (res) {
            $scope.room.photos.splice($scope.miniGallery.itemNo, 1);
            $scope.update($scope.reloadData);
          }, function (res) {
            console.log(res.message);
          });
        };

      }]
    };
  });
