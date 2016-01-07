(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
    ])
  .config(config)
  .run(run)
  .controller('AdminCtrl', AdminCtrl)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:true,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');

  }

  function run() {
    FastClick.attach(document.body);
  }

  AdminCtrl.$inject = ['$scope', '$controller'];

  function AdminCtrl($scope, $controller){
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
    }));

    $scope.username = 'PAN';

    $scope.users =  [
    {
      username: 'Kurokirishima',
      email: 'kurokiri@gmail.com',
      phone: '02564',
      address: 'in the Cloud Blvd, Bahamas', 
      avatar: 'this would be a picture'
    },
    {
      username: 'Satsumabijin',
      email: 'satsuma@gmail.com',
      phone: '12989',
      address: 'underwater', 
      avatar: 'this would be a picture, too!'
    }
    ]  
  };
})();
