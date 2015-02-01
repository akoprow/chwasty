angular.module('chwasty', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main.html'
        })
        .when('/katalog', {
          templateUrl: 'catalogue.html',
          controller: 'CatalogueCtrl'
        })
        .when('/katalog/:plantId', {
          templateUrl: 'plant.html',
          controller: 'PlantCtrl'
        })
        .otherwise('/');
      $locationProvider.html5Mode(false);
  }])

  .controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.menuItems = [
      { href: '/#/', text: 'Strona główna' },
      { href: '/#/katalog', text: 'Katalog chwastów' }
    ];
    $scope.isActive = function(menuItem) {
      var url = '/#' + $location.path();
      var itemUrl = menuItem.href;
      // Strict matching for the main location; prefix-matching for the rest.
      if (url == '/#/' || itemUrl == '/#/') {
        return url == itemUrl;
      } else {
        return _.startsWith(url, itemUrl);
      }
    };
  }])

  .controller('CatalogueCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.plants = [];

    $scope.getDetailsUrl = function(plantId) {
      return '/#/katalog/' + plantId;
    };

    $http.get('data/plants.json').success(function(data) {
      $scope.plants = data;
    });
  }])

  .controller('PlantCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('data/plants.json').success(function(data) {
      $scope.plant = data[$routeParams.plantId];
    });
  }]);
