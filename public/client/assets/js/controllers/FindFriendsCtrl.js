(function() {
  'use strict';

  angular.module('application').controller('FindFriendsCtrl', FindFriendsCtrl);

  FindFriendsCtrl.$inject = ['UserSvc', '$scope', '$stateParams', '$state', '$controller'];

  function FindFriendsCtrl(UserSvc, $scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Find Some New Friends';

    $scope.allUsers = UserSvc.getAllUsers()
    console.log($scope.allUsers);

    $scope.query = {};
    $scope.filterPeople = function() {
      var filteredPeople = [].concat($scope.allUsers);
      // filter by name
      if ($scope.query.name){
        filteredPeople = filteredPeople.filter(function(user){
          return user.name.toLowerCase().indexOf($scope.query.name.toLowerCase()) !== -1;
        })
      }
      // filter by email
      if ($scope.query.email){
        filteredPeople = filteredPeople.filter(function(user){
          return user.email.toLowerCase().indexOf($scope.query.email.toLowerCase()) !== -1;
        })
      }

      // filter by range

      // return array of filtered people
      return filteredPeople;
    }
  }
})();
