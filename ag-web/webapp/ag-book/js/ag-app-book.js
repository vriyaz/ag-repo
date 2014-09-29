(function () {
    var app = angular.module('AgBookApp', []);

    app.service('AgBookService', function() {
    });
                 
    app.controller('AgBookController', ['$scope', '$http', 'AgBookService', function ($scope, $http, service) {
        $scope.book = {};
    	$scope.currentChapter = { "chapterTitle":"" };
        
        $scope.init = function(bookJson, type) {
        	$http.get('assets/' + bookJson + '.json').success (function(data) {
        		console.log("data:" + data);
        		$scope.book = data;
        		$scope.type = type;
        		//$scope.getChapter('about-the-author');
        	});
        };
                
        $scope.getChapter = function(title) {
        	console.log("title:" + title);
        	$scope.currentChapter.chapterTitle = title;
        	
        	angular.forEach($scope.book.sections, function(section) {
        		angular.forEach(section.chapters, function(chapter) {
        			if (title.toLowerCase() == chapter.chapterTitle.toLowerCase()) {
	        			$scope.currentChapter = chapter;
        			}	
        		});
        	});		
        };        
    }]);
    
    app.filter('agTitleCase', function() {
    	return function(input) {
    		if (input == undefined || input === "") 
    			return "";
            var skipThese = ['of', 'in', 'is', 'by', 'on', 'and'];
            var romanNos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
            
            return input.split('-').join(' ').replace(/\w\S*/g, function(text) {
            			if (skipThese.indexOf(text.toLowerCase()) != -1) {
            				return text.toLowerCase();
            			}
            			if (romanNos.indexOf(text) != -1) {
            				return text;
            			}
            			return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            		});
    	};
    });
    
    app.directive('agTitleBlock', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			agTitle: '@',
    			agSubtitle: '@'
    		},
    		template: '<div class="jumbotron"><h3>{{agTitle | agTitleCase}} <small><small><span ng-if="agSubtitle">/</span> {{agSubtitle | agTitleCase}} </small></small></h3></div>' 
    	};    	
    });
})();