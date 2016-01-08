(function() {
  'use strict';

  angular.module('application').controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$http'];

  function SignUpCtrl($scope, $stateParams, $state, $controller, $http) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    $scope.welcome = 'Tell Us About Yourself!';

    $scope.allDone = function(user){
    console.log("working")
      var newName = user.name
      var newPhone = user.phone
      var newAddress = user.address
      var newPassword = user.password
      var newConfirmPassword = user.confirmpassword

      var newUser = {
        name: newName,
        phone: newPhone,
        address: newAddress,
        password: newPassword,
        password2: newConfirmPassword
      }

      console.log("user", newUser)
      $http.post('/users/register', newUser).then(function cb(res){
        console.log("res:", res)
      }).catch(function cb(error){
        console.log("error:", error)
      })
    }
  }
})();
