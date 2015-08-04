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
          $scope.filteredServiceConsumers = data;
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

    $scope.filteredServiceConsumers = [];

    $scope.filterServiceConsumers = function(filterBy) {
      if (!_.isUndefined(filterBy)) {
        var filterByLower = filterBy.toLowerCase();
        $scope.filteredServiceConsumers = _.filter($scope.serviceConsumers, function (serviceConsumer) {
          var hsaIdLower = serviceConsumer.hsaId.toLowerCase();
          var descriptionLower = serviceConsumer.description.toLowerCase();
          return hsaIdLower.indexOf(filterByLower) > -1 || descriptionLower.indexOf(filterByLower) > -1;
        });
      } else {
        $scope.filteredServiceConsumers = $scope.serviceConsumers;
      }
    };

  });
