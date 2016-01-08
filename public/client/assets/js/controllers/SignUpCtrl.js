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


    $scope.userImage = function(){
      console.log($scope.pic);
      return $scope.pic ? 'data:image/jpeg;base64,' + $scope.pic.base64 : "http://placehold.it/250x200";
    }

  }
})();
