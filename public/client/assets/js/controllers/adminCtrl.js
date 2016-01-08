(function(){

  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$controller', '$http', '$stateParams']

  function AdminCtrl($scope, $controller, $http, $stateParams){
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

  let users = []; 

  const populateUsers = () => {
    $http.get('/users').then((res) => {
      console.log('res', res) 
      $scope.users = res.data;
    }).catch((err) => {
      console.log('err', err)
    })     
  }

  populateUsers ();  
  $scope.username = 'PAMN';

  $scope.deleteUser = (user) => {
    let id = user._id
    $http.delete(`/users/remove/${id}`).then((res) => {
      populateUsers();
    }).catch((err) => {
      console.log('err', err)
    })
  }
  };
})();
