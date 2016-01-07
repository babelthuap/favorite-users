(function(){

  'use strict';

  angular.module('application').controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$controller']

  function AdminCtrl($scope, $controller){
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope
    }));

    $scope.username = 'PAN';

    $scope.users =  [
    {
      username: 'Kurokirishima',
      email: 'kurokiri@gmail.com',
      phone: '02564',
      address: 'in the Cloud Blvd, Bahamas', 
      avatar: 'this would be a picture'
    },
    {
      username: 'Satsumabijin',
      email: 'satsuma@gmail.com',
      phone: '12989',
      address: 'underwater', 
      avatar: 'this would be a picture, too!'
    }
    ]  
  };
})();
