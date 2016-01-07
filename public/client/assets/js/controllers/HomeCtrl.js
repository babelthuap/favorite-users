(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];

  function HomeCtrl($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Welcome To Friend Finder!';


  }
})();
