(function() {
  'use strict';

  angular.module('application').service('UserSvc', UserSvc);

  UserSvc.$inject = ['$http', '$cookies', 'jwtHelper'];

  function UserSvc($http, $cookies, jwtHelper) {
    this.userInfo = null;

    this.login = function(info) {
      return $http.post('/users/login', info);
    }

    this.getUserInfo = function() {
      let token = $cookies.get('token');
      let id = jwtHelper.decodeToken(token).id;
      return $http.get('/users/' + id);
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

  }
})();
