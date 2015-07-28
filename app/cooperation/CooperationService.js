'use strict';

angular.module('cooperationApp')
  .factory('FooService', function () {

    //var self = this;

    this.getFoo = function () {
      return 'foo';
    };

    return {
      getFoo: this.getFoo
    };
  });
