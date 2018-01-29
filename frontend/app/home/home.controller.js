(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController)
    .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

  homeController.$inject = ['authService', '$http'];

  function homeController(authService, $http) {

    var vm = this;
    vm.auth = authService;
  }
})();