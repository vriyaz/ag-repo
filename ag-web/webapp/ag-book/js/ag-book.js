(function () {
    var app = angular.module('AgBookApp', []);

    app.service('AgBookService', function() {
    });
                 
    app.controller('AgBookController', ['$scope', '$http', 'AgBookService', function ($scope, $http, service) {
    	$scope.book = {};
        $scope.bookJson = "";
    	$scope.currentChapter = { "chapterTitle":"" };
        
        $scope.init = function(bookJson, type) {
        	$scope.bookJson = bookJson;
        	$scope.type = type;
        	$http.get('assets/' + bookJson + '.json').success($scope.load);
        };
        
        $scope.load = function(data) {
        	$scope.book = data;
        };
        
        $scope.getChapter = function(title) {
        	console.log("title:" + title);
        	angular.forEach($scope.book.sections, function(section) {
//        		$scope.currentChapter = _.find(s.chapters, function(c) {
//        			if (c.chapterTitle != undefined && c.chapterTitle.toLowerCase() == title.toLowerCase()) {
//        				return c;
//        			}
//        		});
        		angular.forEach(section.chapters, function(chapter) {
        			if (title.toLowerCase() === chapter.chapterTitle.toLowerCase()) {
	        			$scope.currentChapter = chapter;
	        			$scope.currentChapter.chapterTitle = title;
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
    
    app.directive('agTitle', function() {
    	return {
    		restrict: 'E',
    		scope: { agTitle: '@', agSubtitle: '@' },
    		template: '<div class="jumbotron"><h3>{{agTitle | agTitleCase}} <small><small><span ng-if="agSubtitle">/</span> {{agSubtitle | agTitleCase}} </small></small></h3></div>' 
    	};    	
    });
    
    app.directive('agHeading', function() {
    	return {
    		restrict: 'E',
    		scope: { agText: '@' },
    		template: '<h3 class="text text-danger">{{agText | agTitleCase}}<hr></h3>' 
    	};    	
    });
})();