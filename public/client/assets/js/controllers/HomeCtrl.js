(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$timeout', 'FoundationApi', 'UserSvc', '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage'];

  function HomeCtrl($timeout, FoundationApi, UserSvc, $cookies, $scope, $stateParams, $state, $controller, $localStorage) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.welcome = 'Welcome To Friend Finder!';

    $scope.loginUser = function() {
      UserSvc.login($scope.login)
      .then(function() {
        $state.go('profile');
      })
      .catch(function(err) {
        console.log(err);
        err.type = 'loginError';
        $scope.$broadcast('error', err);
      });
    }

    $scope.$storage = $localStorage;

    $scope.signup = function(email){
      var email = $scope.email;

      UserSvc.checkEmail(email)
      .then(function(resp){
        console.log(resp)
        $scope.$storage.email = email;
        $state.go('signup');
      })
      .catch(function(err){
        // email is taken
        console.log(err);
        err.type = 'signupError';
        $scope.$broadcast('error', err);
      })
    };


  }
})();
