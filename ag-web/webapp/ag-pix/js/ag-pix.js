(function () {
    var app = angular.module('AgPixApp', []);

    app.controller('AgPixController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    	$scope.imageList = {};
        
        $scope.init = function() {
        	$scope.imageDir = $location.search()['id'];
        	$http.get('assets/' + $scope.imageDir + '/image-list.json').success ($scope.load);
        };
        
        $scope.load = function(data) {
        	$scope.imageList = data;
        	console.log(data);
        };
        
    }]);
    
})();