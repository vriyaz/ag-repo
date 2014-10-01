(function () {
    var app = angular.module('AgPixApp', []);

    app.controller('AgPixController', ['$scope', '$http', function ($scope, $http) {
    	$scope.imageList = {};
    	
        $scope.init = function(imageDir) {        	
        	$scope.imageDir = imageDir;
        	$http.get('assets/' + imageDir + '/image-list.json').success ($scope.load);
        };
        
        $scope.load = function(data) {
        	$scope.imageList = data;
        	console.log(data);
        }
        
    }]);
    
})();