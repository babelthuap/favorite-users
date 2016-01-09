angular.module('application').directive('errorMessage', errorMessage);

function errorMessage() {
  return {
    restrict: "AE",
    templateUrl: "templates/errorMessage.html",
    scope: {
      type: "=",
    },
    controller: function($scope) {
      'use strict';
      $scope.$on('login', function(event, error){
        console.log('in directive', $scope.type, event);
        $scope.message = error.data;
      })
    }
  };
}
