// public/js/services.js

// service to handle session data
angular.module('sessionService', []).factory('sessionData', ['$http', function ($http) 
    {
    var sessionData = {};

    sessionData.getSession = function () 
        {
        return $http.get('load');
        };

    return sessionData;

    }
]);