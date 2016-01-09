(function() {
  'use strict';

  angular.module('application').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$stateParams', '$state', '$controller'];

  function ProfileCtrl(UserSvc, $cookies, $scope, $stateParams, $state, $controller) {
    'use strict';

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    if(UserSvc.userInfo) {
      $scope.user = UserSvc.userInfo;
      $scope.friends = $scope.user.friends;  
    } else {
      UserSvc.getUserInfo()
      .then(function(res) {
        UserSvc.userInfo = res.data;
        $scope.user = UserSvc.userInfo;
        $scope.friends = $scope.user.friends;
      })
      .catch(function(err) {
        console.log(err);
      });
    }

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
  }
})();
