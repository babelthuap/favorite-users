(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['UserSvc', '$scope', '$stateParams', '$state', '$controller'];

  function HomeCtrl(UserSvc, $scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Welcome To Friend Finder!';

    $scope.loginUser = function() {
      UserSvc.login($scope.login)
      .then(function(token) {
        console.log('token:', token);
        $state.go('profile');
      })
      .catch(function(err) {
        console.log(err);
      });
    }

  }
})();
