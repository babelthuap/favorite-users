angular.module('application').directive('friendCard', friendCard);

function friendCard() {
  return {
    restrict: "AE",
    templateUrl: "templates/friendCard.html",
    scope: {
      user: "@"
    },
    controller: function($scope) {
      'use strict';
      
    }
  };
}
