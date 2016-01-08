(function() {
  'use strict';

  angular.module('application').service('UserSvc', UserSvc);

  UserSvc.$inject = ['$http'];

  function UserSvc($http) {

    this.login = function(info) {
      console.log('info:', info);

      return $http.post('/users/login', info);
    }

  }
})();

