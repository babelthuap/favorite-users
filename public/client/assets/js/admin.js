'use strict';

angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

var name = 'PAN'
angular.module('application')
.controller("adminCtrl", adminCtrl);

adminCtrl.$inject = [$scope]

function adminCtrl($scope){
  $scope.username = name;

  $scope.users =   
});

