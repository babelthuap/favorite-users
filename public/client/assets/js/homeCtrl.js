

  angular.module('application')
  .controller('HomeCtrl', HomeCtrl)
  ;
  HomeCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];
  function HomeCtrl($scope, $stateParams, $state, $controller) {
    'use strict';
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope, $stateParams: $stateParams, $state: $state
    }));
    $scope.something = 'something cool';
  }
