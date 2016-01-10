(function() {
  'use strict';

  angular.module('application').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$http'];

  function ProfileCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $http) {
    'use strict';

    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }

    $scope.friends = [];

    let token = $cookies.get('token');
    let userId = JSON.parse( atob(token.split('.')[1]) ).id;

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    function getUserInfo() {
      UserSvc.getUserInfo(userId)
      .then(function(res) {
        $scope.user = res.data;
        if (!res.data.friends.length){
          $scope.noFriends = true;
        }
        $scope.friends = $scope.user.friends
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    getUserInfo();

    $scope.initializeModal = function() {
      $scope.updatedUser = JSON.parse(JSON.stringify($scope.user));
    }

    $scope.saveChanges = function() {

      console.log($scope.updatedUser)
      UserSvc.updateUser($scope.updatedUser)
      .then(res => {
        console.log(res);
        $scope.user = $scope.updatedUser;
        console.log('updated user');
      })
      .catch(err => {
        console.log('err', err);
      });
    }


    $scope.removeFriend = function(friendId) {
      console.log("removing friend...", friendId);
      UserSvc.removeFriend(userId, friendId)
      .then(function(resp){
        console.log('removed friend', resp);
        getUserInfo();
      })
      .catch(function(err){
        console.error(err);
      });
    }
  }
})();
