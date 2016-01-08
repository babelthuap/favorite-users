(function() {
  'use strict';

  angular.module('application').controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http', '$localStorage'];

  function SignUpCtrl($scope, $stateParams, $state, $controller, $http, $localStorage) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.welcome = 'Tell Us About Yourself!';

    $scope.$storage = $localStorage;

    $scope.userImage = function(){
      console.log($scope.pic);
      return $scope.pic ? 'data:image/jpeg;base64,' + $scope.pic.base64 : "http://placehold.it/250x200";
    }

    $scope.allDone = function(user){
    console.log("working")
      var newName = user.name
      var newPhone = user.phone
      var newAddress = user.address
      var newPassword = user.password
      var newConfirmPassword = user.confirmpassword
      var newemail = $scope.$storage.email

      var newUser = {
        name: newName,
        phone: newPhone,
        address: newAddress,
        password: newPassword,
        password2: newConfirmPassword,
        email: newemail
      }

      console.log("user", newUser)
      $http.post('/users/register', newUser).then(function cb(res){
        $state.go('profile')
      }).catch(function cb(error){
        console.log("error:", error)
      })
    }
  }
})();
