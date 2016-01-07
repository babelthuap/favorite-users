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
    .controller('ProfileCtrl', ProfileCtrl)
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


  ProfileCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];

  function ProfileCtrl($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    
    // dummy data
    $scope.user = {
      name: "Bob",
      email: "bob@bob.com",
      phone: "555-555-5555",
      address: "123 Drury Ln Somewhere, CA"
    };
    $scope.friends = [
      {name: "Nicholas", email: "n@yahoo.com"},
      {name: "Asami", email: "a@gmail.com"},
      {name: "Zarathustra", email: "z@spake.co"},
      {name: "Patrick", email: "p@gmail.com"}
    ];

    $scope.friends.sort(function(a, b) {
      return a.name > b.name;
    });

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    $scope.filterFriends = function(query) {
      if (!query) {
        return $scope.friends;
      } else {
        // filter where characters in the query string don’t have to be adjacent in the searched field(s)
        let reRaw = '.*' + query.split('').map(escapeRegExp).join('.*') + '.*';
        let re = new RegExp(reRaw, 'i');
        return $scope.friends.filter(function(user) {
          return ['name', 'email', 'phone', 'address'].some(function(field) {
            return re.test(user[field]);
          });
        });
      }
    }


  }

})();
