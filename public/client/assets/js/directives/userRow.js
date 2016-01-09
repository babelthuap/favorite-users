angular.module('application').directive('userRow', userRow);

function userRow() {
  return {
    restrict: "A",
    templateUrl: "templates/userRow.html",
    scope: {
      data: "@"
    },
    controller: function($scope, $http) {
      'use strict';

      $scope.user = JSON.parse($scope.data);

      $scope.makeNewAdmin = function(user){
        console.log("user", user)
        UserSvc.updateToAdminUser(user)
          .then(res => {
          // populateUsers();
          console.log('Updated to admin successfully', res)
        }).catch(err => {
          console.error(err)
        })
      }

      $scope.deleteUser = function(user) {
        console.log(user);

        let id = user._id;
        $http.delete(`/users/remove/${id}`)
          .then(res => {
            // populateUsers();
            console.log('deleted user')
          })
          .catch(err => {
            console.log('err', err)
          });
      }
    }
  };
}
