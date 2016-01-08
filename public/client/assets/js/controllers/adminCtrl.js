(function() {
  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$controller', '$http', '$stateParams', 'UserSvc']

  function AdminCtrl($scope, $controller, $http, $stateParams, UserSvc) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

    // dummy data
    $scope.user = {
      name: "PAMNNN"
    };

    $scope.allUsers = [];
    
    function populateUsers() {
      UserSvc.getAllUsers().then(resp => {
        $scope.allUsers = resp.data;
      })
    }

    populateUsers();

    $scope.query = {};    
    $scope.filterPeople = function() {
      let filteredPeople = [].concat($scope.allUsers);
      
      ['name', 'email', 'address'].forEach(field => {
        if ($scope.query[field]) {
          let query = $scope.query[field].toLowerCase();
          filteredPeople = filteredPeople.filter(user => {
            return user[field].toLowerCase().indexOf(query) !== -1;
          });
        }
      });

      //Made a separate function for phones to enable search with or without "()" or "-"
      if ($scope.query.phone) {
        let query = $scope.query.phone.replace(/\D/g, "");
        filteredPeople = filteredPeople.filter(user => {
          return user.phone.replace(/\D/g, "").indexOf(query) !== -1;
        });
      }
      
      return filteredPeople;
    }

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
