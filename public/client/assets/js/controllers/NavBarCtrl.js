(function() {
  'use strict';

  angular.module('application').controller('NavBarCtrl', NavBarCtrl);

  NavBarCtrl.$inject = ['$cookies', '$scope', '$stateParams', '$state', '$controller'];

  function NavBarCtrl($cookies, $scope, $stateParams, $state, $controller) {

    // angular.extend(this, $controller('DefaultController', {
    //   $scope: $scope,
    //   $stateParams: $stateParams,
    //   $state: $state,
    // }));

    console.log('navctrl');

    $scope.logout = function(){
      console.log('logout');
      $cookies.remove('token');
      $state.go('home');
    }

  }
})();
