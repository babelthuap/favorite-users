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
        $scope.friends = $scope.user.friends
      })
      .catch(function(err) {
        console.log(err);
      });
    }

    $scope.initializeModal = function() {
      $scope.updatedUser = JSON.parse(JSON.stringify($scope.user));
    }

    getUserInfo();

    $scope.saveChanges = function(updatedUser) {

      console.log(updatedUser)
      UserSvc.updateUser(updatedUser)
      .then(res => {
        console.log('updated user');
      })
      .catch(err => {
        console.log('err', err);
      });
    }

    UserSvc.updateUser = function(user) {
      let token = $cookies.get('token');
      let id = JSON.parse( atob(token.split('.')[1]) ).id;
      console.log('in updateUser')
      console.log(user)
      return $http.put(`/users/${id}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      })
      .then(function(resp){
        getUserInfo();
      })
      .catch(function(err){
        console.error(err)
      })
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
