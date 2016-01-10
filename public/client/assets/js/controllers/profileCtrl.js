(function() {
  'use strict';

  angular.module('application').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller'];

  function ProfileCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller) {
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

    getUserInfo();

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
