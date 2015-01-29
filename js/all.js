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
        .otherwise('/');
      $locationProvider.html5Mode(false);
  }])

  .controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.menuItems = [
      { href: '#/', text: 'Strona główna' },
      { href: '#/katalog', text: 'Katalog chwastów' }
    ];
    $scope.isActive = function(menuItem) {
      return _.endsWith($location.absUrl(), menuItem.href);
    };
  }])

  .controller('CatalogueCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.plants = [];

    $http.get('data/plants.json').success(function(data) {
      $scope.plants = data;
    });
  }]);
