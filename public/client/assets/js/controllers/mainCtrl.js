(function() {
  'use strict';

  angular.module('application').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];

  function MainCtrl($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    var email = $scope.email
  }
})();
