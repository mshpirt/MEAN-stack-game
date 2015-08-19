// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

    $scope.tagline = 'ur all nerds lol';

    $http.get('load')
    .success(function (response) 
      {

      });   

});