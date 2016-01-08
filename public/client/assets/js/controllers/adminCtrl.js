(function() {
  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$controller', '$http', '$stateParams']

  function AdminCtrl($scope, $controller, $http, $stateParams) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

    // dummy data
    $scope.user = {
      name: "PAMN"
    };

    // populate users table
    $http.get('/users')
      .then(res => {
        $scope.users = res.data.filter(user => !user.admin);
        console.log($scope.users);
      }).catch(err => {
        console.log('err', err)
      });

    $scope.deleteUser = function(user) {
      let id = user._id;
      $http.delete(`/users/remove/${id}`)
        .then(res => {
          populateUsers();
        })
        .catch(err => {
          console.log('err', err)
        });
    }
  };
})();
