(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'naif.base64',
    'ngStorage',

    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
    ])
  .config(config)
  .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }
})();

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
      console.log("$scope.user.friends", $scope.user.friends)
    })
    .catch(function(err) {
      console.log(err);
    });

    // fetch all users
    $scope.allUsers = [];
    UserSvc.getAllUsers().then(function(resp){
      $scope.allUsers = resp.data.filter(function(user){
        return (userId !== user._id) && 
               ($scope.user.friends.indexOf(user._id) === -1);
      });
    });

    $scope.addFriend = function(friendId, idx){
      UserSvc.addFriend(userId, friendId);
      $scope.allUsers.splice(idx, 1);
    }
  }
})();

(function() {
  'use strict';

  angular.module('application').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$timeout', 'FoundationApi', 'UserSvc', '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage'];

  function HomeCtrl($timeout, FoundationApi, UserSvc, $cookies, $scope, $stateParams, $state, $controller, $localStorage) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.welcome = 'Welcome to Friend Finder!';

    $scope.loginUser = function() {
      UserSvc.login($scope.login)
      .then(function() {
        $state.go('profile');
      })
      .catch(function(err) {
        console.log(err);
        err.type = 'loginError';
        $scope.$broadcast('error', err);
      });
    }

    $scope.$storage = $localStorage;

    $scope.signup = function(email){
      var email = $scope.email;

      UserSvc.checkEmail(email)
      .then(function(resp){
        console.log(resp)
        $scope.$storage.email = email;
        $state.go('signup');
      })
      .catch(function(err){
        // email is taken
        console.log(err);
        err.type = 'signupError';
        $scope.$broadcast('error', err);
      })
    };


  }
})();

(function() {
  'use strict';

  angular.module('application').controller('NavBarCtrl', NavBarCtrl);

  NavBarCtrl.$inject = ['$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller'];

  function NavBarCtrl($cookies, $scope, $rootScope, $stateParams, $state, $controller) {

    // angular.extend(this, $controller('DefaultController', {
    //   $scope: $scope,
    //   $stateParams: $stateParams,
    //   $state: $state,
    // }));

    $scope.logout = function(){
      console.log('logout');
      $cookies.remove('token');
      $state.go('home');
    }

    $rootScope.amILoggedIn = function() {
      return !!$cookies.get('token');
    }

    $rootScope.amIAdmin = function() {
      let token = $cookies.get('token');
      return JSON.parse( atob(token.split('.')[1]) ).admin;
    }

  }
})();

(function() {
  'use strict';

  angular.module('application').controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['UserSvc', '$scope', '$stateParams', '$state', '$controller', '$http', '$localStorage'];

  function SignUpCtrl(UserSvc, $scope, $stateParams, $state, $controller, $http, $localStorage) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.welcome = 'Tell Us About Yourself!';

    $scope.$storage = $localStorage;

    $scope.userImage = function(){
      return $scope.pic ? 'data:image/jpeg;base64,' + $scope.pic.base64 : "http://placehold.it/250x200";
    }

    $scope.allDone = function(user){
      var newUser = {
        name: user.name,
        phone: user.phone,
        address: user.address,
        password: user.password,
        password2: user.confirmpassword,
        email: $scope.$storage.email,
        profilePic: 'data:image/jpeg;base64,' + $scope.pic.base64
      }

      console.log("user", newUser)

      UserSvc.register(newUser)
      .then(function(resp){
        $state.go('profile');
      })
      .catch(function(error){
        console.log("error:", error)
      })
    }

    $scope.validate = function(){
      return $scope.user && $scope.user.name && $scope.user.password && ($scope.user.password === $scope.user.confirmpassword) && $scope.pic;
    }
  }
})();

(function() {
  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$cookies', '$state', '$scope', '$rootScope', '$controller', '$stateParams', 'UserSvc']

  function AdminCtrl($cookies, $state, $scope, $rootScope, $controller, $stateParams, UserSvc) {
    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }

    if (!$rootScope.amIAdmin()) {
      return $state.go('profile');
    }

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

    $scope.allUsers = [];
    
    if (UserSvc.userInfo) {
      $scope.user = UserSvc.userInfo;
    } else {
      let token = $cookies.get('token');
      let id = JSON.parse( atob(token.split('.')[1]) ).id;
      UserSvc.getUserInfo(id)
      .then(function(res) {
        UserSvc.userInfo = res.data;
        $scope.user = UserSvc.userInfo;
      })
      .catch(function(err) {
        console.log(err);
      });
    }

    function populateUsers() {
      UserSvc.getAllUsers()
        .then(res => {
          $scope.allUsers = res.data.filter(user => !user.admin);
        })
        .catch(err => {
          console.log('err', err)
        });
    }

    populateUsers();

    $scope.$on('populateUsers', (event, args) => {
      populateUsers();
    })

    let sortBy = "name";
    let sortDirection = 1;

    $scope.sortBy = () => sortBy;
    $scope.sortDirection = () => sortDirection;

    $scope.setSortBy = function(field){
      if (sortBy === field) {
        sortDirection *= -1;
      } else {
        sortDirection = 1;
        sortBy = field;
      }
    }

    $scope.query = {};    
    $scope.filterPeople = function() {
      let filteredPeople = [].concat($scope.allUsers);
      
      ['name', 'email', 'address'].forEach(field => {
        if ($scope.query[field]) {
          let query = $scope.query[field].toLowerCase();
          filteredPeople = filteredPeople.filter(user => {
            return user[field].toLowerCase().indexOf(query) !== -1;
          });
        }
      });

      //Made a separate function for phones to enable search with or without "()" or "-"
      if ($scope.query.phone) {
        let query = $scope.query.phone.replace(/\D/g, "");
        filteredPeople = filteredPeople.filter(user => {
          return user.phone.replace(/\D/g, "").indexOf(query) !== -1;
        });
      }

      filteredPeople.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return sortDirection;
        }
        if (a[sortBy] < b[sortBy]) {
          return -sortDirection;
        }
        return 0;
      });

      return filteredPeople;
    }

  };
})();
(function() {
  'use strict';

  angular.module('application').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$http'];

  function ProfileCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $http) {
    'use strict';

    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }

    $scope.friends = [];

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
        if (!res.data.friends.length){
          $scope.noFriends = true;
        }
        $scope.friends = $scope.user.friends
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    getUserInfo();

    $scope.initializeModal = function() {
      $scope.updatedUser = JSON.parse(JSON.stringify($scope.user));
    }

    $scope.saveChanges = function() {

      console.log($scope.updatedUser)
      UserSvc.updateUser($scope.updatedUser)
      .then(res => {
        console.log(res);
        $scope.user = $scope.updatedUser;
        console.log('updated user');
      })
      .catch(err => {
        console.log('err', err);
      });
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
      $scope.data = JSON.parse($scope.user);
    }
  };
}

angular.module('application').directive('userRow', userRow);

function userRow() {
  return {
    restrict: "A",
    templateUrl: "templates/userRow.html",
    scope: {
      data: "@"
    },
    controller: function(AdminSvc, $scope, $http) {
      'use strict';

      $scope.user = JSON.parse($scope.data);
      $scope.updatedUser = JSON.parse($scope.data);

      function populateUsers() {
        $scope.$emit('populateUsers');
      }

      $scope.makeAdmin = function(user){
        AdminSvc.makeAdmin(user)
          .then(res => {
          populateUsers();
          console.log('Updated to admin successfully', res);
        }).catch(err => {
          console.error(err);
        })
      }

      $scope.removeUser = function(user) {
        AdminSvc.removeUser(user)
          .then(res => {
            populateUsers();
            console.log('deleted user');
          })
          .catch(err => {
            console.log('err', err);
          });
      }

      $scope.editUser = function() {
        AdminSvc.editUser($scope.updatedUser)
          .then(res => {
            populateUsers();
            console.log('updated user');
          })
          .catch(err => {
            console.log('err', err);
          });
      }

    }
  };
}

(function() {
  'use strict';

  angular.module('application').service('AdminSvc', AdminSvc);

  AdminSvc.$inject = ['$http', "$cookies"];

  function AdminSvc($http, $cookies) {
    this.userInfo = null;

    this.makeAdmin = function(user) {
      return $http.put(`/admins/makeadmin/${user._id}`);
    }

    this.removeUser = function(user) {
      return $http.delete(`/admins/remove/${user._id}`);
    }

    this.editUser = function(user) {
      return $http.put(`/admins/edit/${user._id}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      });
    }
  }
})();

(function() {
  'use strict';

  angular.module('application').service('UserSvc', UserSvc);

  UserSvc.$inject = ['$http'];

  function UserSvc($http) {
    this.userInfo = null;

    this.checkEmail = function(email){
      return $http.post('/users/checkemail', {email: email});
    }

    this.register = function(newUser){
      return $http.post('/users/register', newUser);
    }

    this.login = function(info) {
      return $http.post('/users/login', info);
    }

    this.getUserInfo = function(id) {
      return $http.get('/users/' + id);
    }

    this.getUserInfoUnpopulated = function(id) {
      return $http.get('/users/unpopulated/' + id);
    }

    this.getAllUsers = function(){
      return $http.get('/users');
    }

    this.addFriend = function(userId, friendId){
      $http.put(`/users/addfriend/${userId}/${friendId}`)
      .then(function(resp){
        console.log('success', resp);
      })
      .catch(function(err){
        console.error(err);
      })
    }

    this.removeFriend = function(userId, friendId){
      return $http.put(`/users/removefriend/${userId}/${friendId}`);
    }

    this.updateUser = function(user) {
      return $http.put(`/users/edit/${user._id}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      });
    }
  }
})();
