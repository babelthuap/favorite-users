(function() {
  'use strict';

  angular.module('application').controller('FindFriendsCtrl', FindFriendsCtrl);

  FindFriendsCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];

  function FindFriendsCtrl($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Find Some New Friends';


  }
})();
