(function() {
  'use strict';

  angular.module('application').controller('FindFriendsCtrl', FindFriendsCtrl);

  FindFriendsCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller'];

  function FindFriendsCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller) {
    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Find Some New Friends';

    // fetch user's info
    let token = $cookies.get('token');
    let userId = JSON.parse( atob(token.split('.')[1]) ).id;
    UserSvc.getUserInfoUnpopulated(userId)
    .then(function(res) {
      $scope.user = res.data;
    })
    .catch(function(err) {
      console.log(err);
    });

    // fetch all users
    $scope.allUsers = [];
    UserSvc.getAllUsers().then(function(resp){
      $scope.allUsers = resp.data;
    })


    $scope.query = {};
    $scope.filterPeople = function() {
      var filteredPeople = [].concat($scope.allUsers);

      // filter by name
      if ($scope.query.name){
        filteredPeople = filteredPeople.filter(function(user){
          return user.name.toLowerCase().indexOf($scope.query.name.toLowerCase()) !== -1;
        })
      }
      // filter by email
      if ($scope.query.email){
        filteredPeople = filteredPeople.filter(function(user){
          return user.email.toLowerCase().indexOf($scope.query.email.toLowerCase()) !== -1;
        })
      }



      // filter by range


      // filter friends
      if ($scope.user && $scope.user.friends){
        console.log('inside filter friends', $scope.user)
        filteredPeople = filteredPeople.filter(function(user){
          return $scope.user.friends.indexOf(user._id) === -1;
        })
      }

      // refilter when new friends added
      if ($scope.query.added){
        filteredPeople = filteredPeople.filter(function(user){
          return $scope.query.added.indexOf(user._id) === -1;
        })
      }



      // return array of filtered people
      filteredPeople.sort(function(a, b){
        return a.name > b.name;
      });
      console.log(filteredPeople.length);
      return filteredPeople;
    }

    $scope.addFriend = function(friendId){
      UserSvc.addFriend(userId, friendId);
      if ($scope.query.added){
        $scope.query.added.push(friendId);
      } else {
        $scope.query.added = [friendId];
      }
      console.log($scope.query);
    }


  }
})();
