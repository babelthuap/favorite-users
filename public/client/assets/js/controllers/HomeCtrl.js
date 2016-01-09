(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['FoundationApi', 'UserSvc', '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage'];

  function HomeCtrl(FoundationApi, UserSvc, $cookies, $scope, $stateParams, $state, $controller, $localStorage) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    FoundationApi.

    $scope.welcome = 'Welcome To Friend Finder!';

    $scope.loginUser = function() {
      UserSvc.login($scope.login)
      .then(function() {
        $state.go('profile');
      })
      .catch(function(err) {
        console.log(err);
        $scope.loginError = err.data;
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
        $scope.signupError = err.data;
      })

    };
  }
})();
