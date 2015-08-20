// public/js/services.js

// service to handle session data
angular.module('sessionService', []).factory('sessionData', ['$http', function ($http) {

    // var urlBase = 'http://localhost:2307/Service1.svc';
    var sessionData = {};

    sessionData.getSession = function () {
        return $http.get('load');
    };

    /*
    StudentDataOp.addStudent = function (stud) {
        return $http.post(urlBase + '/AddStudent', stud);
    };
    */

    return sessionData;

}]);