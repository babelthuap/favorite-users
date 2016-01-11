(function() {
  'use strict';

  angular.module('application').controller('FindFriendsCtrl', FindFriendsCtrl);

  FindFriendsCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller'];

  function FindFriendsCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller) {
    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Find Some New Friends';

    // fetch user's info
    let token = $cookies.get('token');
    let userId = JSON.parse( atob(token.split('.')[1]) ).id;
    UserSvc.getUserInfoUnpopulated(userId)
    .then(function(res) {
      $scope.user = res.data;
    })
    .catch(function(err) {
      console.log(err);
    });

    // fetch all users
    $scope.allUsers = [];
    UserSvc.getAllUsers().then(function(resp){
      $scope.allUsers = resp.data.filter(function(user){
        return userId !== user._id
      });
    });

    $scope.addFriend = function(friendId, idx){
      UserSvc.addFriend(userId, friendId);
      $scope.allUsers.splice(idx, 1);
    }
  }
})();
