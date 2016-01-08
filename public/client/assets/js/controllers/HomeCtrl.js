(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage'];

  function HomeCtrl(UserSvc, $cookies, $scope, $stateParams, $state, $controller, $localStorage) {

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
      });
    }

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
