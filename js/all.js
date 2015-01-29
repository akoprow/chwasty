angular.module('chwasty', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main.html'
        })
        .when('/katalog', {
          templateUrl: 'catalogue.html'
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
  }]);
