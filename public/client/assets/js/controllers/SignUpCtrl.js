(function() {
  'use strict';

  angular.module('application').controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];

  function SignUpCtrl($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Tell Us About Yourself!';
    var email = $scope.email
    console.log("email", email)
  }
})();
