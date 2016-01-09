(function() {
  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$cookies', '$scope', '$controller', '$http', '$stateParams', 'UserSvc']

  function AdminCtrl($cookies, $scope, $controller, $http, $stateParams, UserSvc) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

    $scope.allUsers = [];
    
    if (UserSvc.userInfo) {
      $scope.user = UserSvc.userInfo;
    } else {
      let token = $cookies.get('token');
      let id = JSON.parse( atob(token.split('.')[1]) ).id;
      UserSvc.getUserInfo(id)
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

    $scope.$on('populateUsers', (event, args) => {
      populateUsers();
    })

    let sortBy = "name";
    let sortDirection = 1;
    $scope.setSortBy = function(field){
      if (sortBy === field) {
        sortDirection *= -1;
      } else {
        sortDirection = 1;
        sortBy = field;
      }
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
          return sortDirection;
        }
        if (a[sortBy] < b[sortBy]) {
          return -sortDirection;
        }
        return 0;
      });

      return filteredPeople;
    }

  };
})();