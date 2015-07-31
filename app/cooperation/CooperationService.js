'use strict';

angular.module('cooperationApp')
  .factory('CooperationService', function ($q, $http) {

    var getConnectionPoints = function () {
      var deferred = $q.defer();
      $http.get('/v1/connectionPoints')
        .success(function (data) {
          console.log('connection points', data);
          deferred.resolve(data);
        }).error(function () {
          console.log('no error handling implemented');
          deferred.reject();
        });
      return deferred.promise;
    };

    var getServiceConsumers = function (connectionPointId) {
      var deferred = $q.defer();
      $http.get('/v1/serviceConsumers', {
        params: {
          connectionPointId: connectionPointId
        }
      })
        .success(function (data) {
          console.log('service consumers for connectionPointId[' + connectionPointId + ']', data);
          deferred.resolve(data);
        }).error(function () {
          console.log('no error handling implemented');
          deferred.reject();
        });
      return deferred.promise;
    };

    var getCooperations = function(connectionPointId, serviceConsumerId) {
      var deferred = $q.defer();
      $http.get('/v1/cooperations', {
        params: {
          connectionPointId: connectionPointId,
          serviceConsumerId: serviceConsumerId
        }
      })
        .success(function (data) {
          console.log('cooperations for connectionPointId[' + connectionPointId + '], serviceConsumerId[' + serviceConsumerId + ']', data);
          deferred.resolve(data);
        }).error(function () {
          console.log('no error handling implemented');
          deferred.reject();
        });
      return deferred.promise;
    };

    return {
      getConnectionPoints: getConnectionPoints,
      getServiceConsumers: getServiceConsumers,
      getCooperations: getCooperations
    };


  });
