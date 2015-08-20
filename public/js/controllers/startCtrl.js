// public/js/controllers/start.js
angular.module('startModule', []).controller('startController', function($scope, $http, $window) 
    {
    $scope.newUser = "";
    $scope.sendPost = function() 
    	{
    	// $scope.newUser = "David";
        

        var data = {user: $scope.newUser};
        
        /*
        $.param
        	({ 
        	json: JSON.stringify({ user: $scope.newUser }) 
        	});
        */

        $http.post('newgame', data).success(function(data, status) 
        	{
            // $scope.hello = data;
            // console.log("New user added.", data);
            $window.location.href = 'public/index.html';
        	})
    	}
    })               