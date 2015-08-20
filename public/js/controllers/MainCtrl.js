// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['sessionService']).controller('MainController', function($scope, sessionData) {

    $scope.tagline = 'ur all nerds lol';

    $scope.status;
    $scope.session;
    getSession();

    function getSession() 
    	{
        sessionData.getSession()
        .success(function (sessionResults) { $scope.session = "Welcome back, " + sessionResults; })
        .error(function (error) { $scope.status = 'Unable to retrieve session data: ' + error.message; });
        }

});