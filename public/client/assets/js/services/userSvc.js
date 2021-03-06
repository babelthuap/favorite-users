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
