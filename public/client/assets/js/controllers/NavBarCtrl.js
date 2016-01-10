(function() {
  'use strict';

  angular.module('application').controller('NavBarCtrl', NavBarCtrl);

  NavBarCtrl.$inject = ['$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller'];

  function NavBarCtrl($cookies, $scope, $rootScope, $stateParams, $state, $controller) {

    // angular.extend(this, $controller('DefaultController', {
    //   $scope: $scope,
    //   $stateParams: $stateParams,
    //   $state: $state,
    // }));

    $scope.logout = function(){
      console.log('logout');
      $cookies.remove('token');
      $state.go('home');
    }

    $rootScope.amILoggedIn = function() {
      return !!$cookies.get('token');
    }

    $rootScope.amIAdmin = function() {
      let token = $cookies.get('token');
      return JSON.parse( atob(token.split('.')[1]) ).admin;
    }

  }
})();
