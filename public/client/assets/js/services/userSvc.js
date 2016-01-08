(function() {
  'use strict';

  angular.module('application').service('UserSvc', UserSvc);

  UserSvc.$inject = ['$http'];

  function UserSvc($http) {

    this.login = function(info) {
      return $http.post('/users/login', info);
    }

    this.getUserInfo = function(id) {
      return $http.get('/users/' + id);
    }

    let allUsers;
    $http.get('/users')
    .then(function(resp){
      allUsers = resp.data;
    })
    .catch(function(err){
      console.log(err);
    })

    this.getAllUsers = function(){
      return allUsers;
    }

  }
})();
