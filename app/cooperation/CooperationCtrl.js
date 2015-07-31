'use strict';

angular.module('cooperationApp')
  .controller('CooperationCtrl',
  function ($scope, CooperationService) {
    CooperationService.getConnectionPoints().then(function (data) {
      $scope.connectionPoints = data;
    });

    $scope.selectedServiceConsumer = {};
    $scope.serviceConsumers = [];

    $scope.$watch('selectedConnectionPoint', function (connectionPoint) {
      if (connectionPoint && connectionPoint.id) {
        $scope.selectedServiceConsumer = {};
        $scope.cooperations = [];
        console.log('connection point selected', connectionPoint);
        CooperationService.getServiceConsumers(connectionPoint.id).then(function (data) {
          $scope.serviceConsumers = data;
        });
      }
    });

    $scope.$watch('selectedServiceConsumer.selected', function(serviceConsumer) {
      if (serviceConsumer && serviceConsumer.id) {
        console.log('service consumer selected', serviceConsumer);
        CooperationService.getCooperations($scope.selectedConnectionPoint.id, serviceConsumer.id).then(function (data) {
          console.log('data', data);
          $scope.cooperations = data;
        });
      }
    });

    $scope.filterServiceConsumers = function(filterBy) {
      if (!_.isUndefined(filterBy)) {
        return _.filter($scope.serviceConsumers, function(serviceConsumer) {
          return serviceConsumer.hsaId.indexOf(filterBy) > -1 || serviceConsumer.description.indexOf(filterBy) > -1;
        });
      } else {
        return $scope.serviceConsumers;
      }
    };

  });
