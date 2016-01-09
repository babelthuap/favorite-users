(function() {
  'use strict';

  angular.module('application').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$stateParams', '$state', '$controller'];

  function ProfileCtrl(UserSvc, $cookies, $scope, $stateParams, $state, $controller) {
    'use strict';

    let token = $cookies.get('token');
    let userId = JSON.parse( atob(token.split('.')[1]) ).id;

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    function getUserInfo() {
      UserSvc.getUserInfo(userId)
      .then(function(res) {
        $scope.user = res.data;
        $scope.friends = $scope.user.friends
      })
      .catch(function(err) {
        console.log(err);
      });
    }

    getUserInfo();

    // dummy data
    // $scope.friends = [
    //   {name: "Nicholas", email: "n@yahoo.com", phone: "111-111-1111", address: "123 Minnesota"},
    //   {name: "Asami", email: "a@gmail.com", phone: "222-222-2222", address: "345 Tokyo"},
    //   {name: "Zarathustra", email: "z@spake.co", phone: "333-333-3333", address: "000 Persia"},
    //   {name: "Patrick", email: "p@gmail.com", phone: "444-444-4444", address: "789 California"}
    // ];

    $scope.friends = [];
    $scope.filterFriends = function(query) {
      if (!query) {
        return $scope.friends.sort(function(a, b) {
          return a.name > b.name;
        });
      } else {
        query = query.toLowerCase();
        return $scope.friends.filter(function(user) {
          return ['name', 'address'].some(function(field) {
            // '' to catch error if field is not defined
            return (user[field] || '').toLowerCase().indexOf(query) !== -1;
          });
        });
      }
    }

    $scope.removeFriend = function(friendId) {
      console.log("removing friend...", friendId);
      UserSvc.removeFriend(userId, friendId)
        .then(function(resp){
          console.log('removed friend', resp);
          getUserInfo();
        })
        .catch(function(err){
          console.error(err);
        });
    }
  }
})();
