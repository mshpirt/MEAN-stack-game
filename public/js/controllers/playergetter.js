var app = angular.module('playerGetModule', []);
app.controller('playerGetController', function($scope, $http) 
    {
    $http.get("playerfetcher")
    .success(function (response) 
      {
      $scope.names = response;
      });
    });

/* $scope.players = [
	{ 
	'playername': 'Rain',
	'team': 'mYi',
	'stats': { 'luck': 6, 'macro': 8 }
	},
	{
	'playername': 'Zest',
	'team': 'KT',
	'stats': { 'luck': 7, 'macro': 9 }
	},
	{
	'playername': 'soO',
	'team': 'SKT',
	'stats': { 'luck': 4, 'macro': 10 }
	},
	{
	'playername': 'Horror',
	'team': 'MVP',
	'stats': { 'luck': 0, 'macro': 4 }
	}];

<div class="container-fluid">

	<div class="row">
    	<div class="col-md-2">
        <!--Sidebar content-->

        Search: <input ng-model="query">

      	</div>
		<div class="col-md-10">
    	<!--Body content-->

    	<ul class="players">
    		<li ng-repeat="player in players | filter:query">
        		<span>{{player.playername}}</span>
            	<p>Team: {{player.team}}</p>
            	<p>Luck: {{player.stats.luck}}</p>
            	<p>Macro: {{player.stats.macro}}</p>
        	</li>
    	</ul>

    	</div>
	</div>
</div>

*/