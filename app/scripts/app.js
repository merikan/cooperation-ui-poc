'use strict';

angular
  .module('cooperationApp', [
    'services.config',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // Now set up the states
    $stateProvider
      .state('onlyPage', {
        url: '/',
        templateUrl: 'cooperation/cooperation.html',
        controller: 'CooperationCtrl'
      });
  }]);
