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
            controller: 'startController'
        })
        .when('/game', {
            templateUrl: 'views/game.html',
            controller: 'playerGetController'
        })
        .when('/playerfight', {
            templateUrl: 'views/playerfight.html',
            controller: 'playerFightController'
        })
        .otherwise({
        redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

}]);