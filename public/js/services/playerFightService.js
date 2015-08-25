// public/js/playerFightervice.js
angular.module('playerFightService', []).factory('playerFightData', function ()
	{

	var playerFightData = {};

    // Get myProperty
    function getProperty(data) 
		{
		playerFightData = data;
		}

    // Set myProperty
    playerFightData.setProperty = function (value) 
    	{
        this.myProperty = value;
        };

    return playerFightData;
	});