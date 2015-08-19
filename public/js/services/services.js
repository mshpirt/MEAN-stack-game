// public/js/services.js

/* example, make my own later

angular.module('app', [])
    .controller('Ctrl', function Ctrl1($scope,  $rootScope, BlahFactory) {
        BlahFactory.setValue('another blah');
    })
    .constant('blah', 'blah')
    .factory('BlahFactory', function() {
        var blah = {
            value: 'blah'
        };
        
        blah.setValue = function(val) {
          this.value = val;
        };
        
        blah.getValue = function() {
            return this.value;
        };
        
        return blah;
    })
    .directive('myTemplate', function() {
        return {
            restrict: 'E',
            templateUrl: 'my-template.html',
            scope: {},
            controller: ["$scope", "blah", "BlahFactory", function($scope, blah, BlahFactory) {
                
                $scope.blah = blah;
                $scope.anotherBlah = BlahFactory.getValue();
                
                $scope.test = function(arg) {
                    console.log(arg);
                }
            }]
        };
    });

*/ 