(function () {
    var app = angular.module('AgPixApp', []);

    app.controller('AgPixController', ['$scope', '$http', function ($scope, $http) {
        $scope.currentChapter = undefined;
        
        $scope.init = function(imageDir) {
        	$http.get('assets/' + imageDir + '.json')
        		.success (function(data) {
        			$scope.imageList = data;
        			console.log(data);
        	});
        };
        
    }]);
    
})();