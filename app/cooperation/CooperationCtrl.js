'use strict';

angular.module('cooperationApp')
  .controller('FooCtrl',
    function ($scope, FooService) {

      $scope.bar = FooService.getFoo();

    });
