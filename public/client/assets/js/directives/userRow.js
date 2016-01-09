angular.module('application').directive('userRow', userRow);

function userRow() {
  return {
    restrict: "A",
    templateUrl: "templates/userRow.html",
    scope: {
      data: "@"
    },
    controller: function(UserSvc, $scope, $http) {
      'use strict';

      $scope.user = JSON.parse($scope.data);
      $scope.updatedUser = JSON.parse($scope.data);

      $scope.makeNewAdmin = function(user){
        UserSvc.updateToAdminUser(user)
          .then(res => {
          // populateUsers();
          console.log('Updated to admin successfully', res);
        }).catch(err => {
          console.error(err);
        })
      }

      $scope.deleteUser = function(user) {
        $http.delete(`/users/remove/${user._id}`)
          .then(res => {
            // populateUsers();
            console.log('deleted user');
          })
          .catch(err => {
            console.log('err', err);
          });
      }

      $scope.saveChanges = function() {
        UserSvc.updateUser($scope.updatedUser)
          .then(res => {
            // populateUsers();
            console.log('updated user');
          })
          .catch(err => {
            console.log('err', err);
          });
      }

    }
  };
}
