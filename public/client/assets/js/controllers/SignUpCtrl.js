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
