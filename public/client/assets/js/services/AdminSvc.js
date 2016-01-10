(function() {
  'use strict';

  angular.module('application').service('AdminSvc', AdminSvc);

  AdminSvc.$inject = ['$http', "$cookies"];

  function AdminSvc($http, $cookies) {
    this.userInfo = null;

    this.makeAdmin = function(user) {
      return $http.put(`/admins/makeadmin/${user._id}`);
    }

    this.removeUser = function(user) {
      return $http.delete(`/admins/remove/${user._id}`);
    }

    this.editUser = function(user) {
      return $http.put(`/admins/edit/${user._id}`, {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      });
    }
  }
})();
