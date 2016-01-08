(function(){

  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$controller']

  function AdminCtrl($scope, $controller){
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

    var users = [
    { name: 'Kurokirishima',
      email: 'kurokiri@gmail.com',
      phone: '02564',
      address: 'in the Cloud Blvd, Bahamas', 
      profilePic: 'this would be a picture'
    },
    { username: 'Satsumabijin',
      email: 'satsuma@gmail.com',
      phone: '12989',
      address: 'underwater', 
      profilePic: 'this would be a picture, too!'
    }]  

    $scope.username = 'PAMN';
    $scope.headers = Object.keys(users[0]);
    $scope.users = users;
  };
})();
