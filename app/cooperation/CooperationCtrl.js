'use strict';

angular.module('cooperationApp')
  .controller('CooperationCtrl',
    function ($scope, CooperationService) {

      $scope.bar = CooperationService.getFoo();

    });
