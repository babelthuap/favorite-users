(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$location'];

  function HomeCtrl($scope, $stateParams, $state, $controller, $location) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $location: $location
    }));

    $scope.welcome = 'Welcome To Friend Finder!';
    $scope.signup = function() {
      var email = $scope.email
      console.log("email: ", email);
      $state.go('main.signup')
      // $location.path('/signup')
    }
  }
})();
