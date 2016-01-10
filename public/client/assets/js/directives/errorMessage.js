angular.module('application').directive('errorMessage', errorMessage);

function errorMessage() {
  return {
    restrict: "AE",
    templateUrl: "templates/errorMessage.html",
    scope: {
      type: "@",
    },
    controller: function($scope, $timeout) {
      'use strict';
      $scope.$on('error', function(event, error){
        console.log('in directive', $scope.type, event, error);
        if ($scope.type === error.type){
          $scope.message = error.data;
          $scope.hasError = true;
          $timeout(function(){
            $scope.hasError = false;
          }, 2500);
        }
      })
    }
  };
}
