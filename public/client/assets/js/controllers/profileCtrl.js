angular.module('application').controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];

function ProfileCtrl($scope, $stateParams, $state, $controller) {
  'use strict';
  
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
    {name: "Nicholas", email: "n@yahoo.com", phone: "111-111-1111"},
    {name: "Asami", email: "a@gmail.com", phone: "222-222-2222"},
    {name: "Zarathustra", email: "z@spake.co", phone: "333-333-3333"},
    {name: "Patrick", email: "p@gmail.com", phone: "444-444-4444"}
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
