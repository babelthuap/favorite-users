(function() {
  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$controller', '$http', '$stateParams', 'UserSvc']

  function AdminCtrl($scope, $controller, $http, $stateParams, UserSvc) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

    $scope.allUsers = [];
    
    if(UserSvc.userInfo) {
      $scope.user = UserSvc.userInfo;
    } else {
      UserSvc.getUserInfo()
      .then(function(res) {
        UserSvc.userInfo = res.data;
        $scope.user = UserSvc.userInfo;
      })
      .catch(function(err) {
        console.log(err);
      });
    }

    function populateUsers() {
      UserSvc.getAllUsers()
        .then(res => {
          $scope.allUsers = res.data.filter(user => !user.admin);
        })
        .catch(err => {
          console.log('err', err)
        });
    }

    populateUsers();

    let sortBy = "name";
    $scope.setSortBy = function(field){
      console.log("field", field)
      sortBy = field;
    }

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

      filteredPeople.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        return 0;
      });

      return filteredPeople;
    }

    $scope.makeNewAdmin = function(user){
      console.log("user", user)
      UserSvc.updateToAdminUser(user)
        .then(res => {
        populateUsers();  
        console.log('Updated to admin successfully', res)
      }).catch(err => {
        console.error(err)
      })
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
