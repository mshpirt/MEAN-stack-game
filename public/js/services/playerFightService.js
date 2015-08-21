// public/js/playerFightervice.js
angular.module('playerFightService', []).factory('playerFightData', function ()
	{
	var savedData = {}
	
	function set(data) 
		{
		savedData = data;
		}
		
 	function get() 
 		{
		return savedData;
 		}

		return 
			{
  			set: set,
  			get: get
 			}

	});