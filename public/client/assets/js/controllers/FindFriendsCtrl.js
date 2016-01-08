(function() {
  'use strict';

  angular.module('application').controller('FindFriendsCtrl', FindFriendsCtrl);

  FindFriendsCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$stateParams', '$state', '$controller'];

  function FindFriendsCtrl(UserSvc, $cookies, $scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Find Some New Friends';

    $scope.allUsers = [];
    UserSvc.getAllUsers().then(function(resp){
      $scope.allUsers = resp.data;
    })

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

    $scope.addFriend = function(friend){
      let friendId = friend._id;
      let token = $cookies.get('token');
      let userId = JSON.parse( atob(token.split('.')[1]) ).id;

      UserSvc.addFriend(userId, friendId);
    }


  }
})();
