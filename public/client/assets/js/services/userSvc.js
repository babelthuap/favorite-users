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

    this.getAllUsers = function(){
      return $http.get('/users');
    }

    this.addFriend = function(userId, friendId){
      $http.post(`/users/addfriend/${userId}/${friendId}`)
      .then(function(resp){
        console.log('success', resp);
      })
      .catch(function(err){
        console.error(err);
      })
    }
  }
})();
