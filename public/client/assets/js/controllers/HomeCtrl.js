(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$localStorage'];

  function HomeCtrl($scope, $stateParams, $state, $controller, $localStorage) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.welcome = 'Welcome To Friend Finder!';

    $scope.$storage = $localStorage;

    $scope.signup = function(email){
      var email = $scope.email;
      console.log(email);
      $scope.$storage.email = email;
      $state.go('signup');
    };
  }
})();

// run(run);
  // run.$inject = ['$rootScope'];
  //   console.log('working')


  // function run($rootScope) {
  //   // $rootScope.$storage = $localStorage;
  //   // $rootScope.$storage.$email = [];
  // }
