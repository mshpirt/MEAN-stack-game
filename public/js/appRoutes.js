// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })
        .when('/start', {
            templateUrl: 'views/start.html',
            //controller: 'MainController'
        })
        .when('/load', {
            templateUrl: 'views/game.html',
            controller: 'playerGetController'
        })
        .otherwise({
        redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

}]);