(function () {
    var app = angular.module('AgBookApp', []);

    app.service('AgBookService', function() {
    });
                 
    app.controller('AgBookController', ['$scope', '$http', 'AgBookService', function ($scope, $http, service) {
        // this.book = book;
        $scope.currentChapter = undefined;
        
        $scope.init = function(bookJson) {
        	$http.get('assets/' + bookJson + '.json')
        		.success (function(data) {
        			$scope.book = data;
        			console.log(data);
        	});
        };
        
        $scope.setChapter = function(currentTitle) {
        	var found = false;
        	for (var sectionNo in this.book.section) {
        		if (! found) {
            		var chapters = this.book.section[sectionNo].chapter;
            		for (var chapterNo in chapters) {
            			var chapter = chapters[chapterNo];
    	        		if (currentTitle.toLowerCase() == chapter.title.toLowerCase()) {
    	        			$scope.currentChapter = chapter;
    	        			found = true;
    	        			break;
    	        		}
            		}
            	}
        	}
        };        
    }]);
    
    app.filter('agTitleCase', function() {
    	return function(input) {
    		if (input == undefined || input === "") return "";
            var skipThese = ['of', 'in', 'is', 'by', 'on', 'and'];
            return input.split('-').join(' ').replace(/\w\S*/g, function(text) {
            			if (skipThese.indexOf(text.toLowerCase()) != -1) {
            				return text.toLowerCase();
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
    		template: '<div class="jumbotron"><h1>{{agTitle | agTitleCase}} <small><small><span ng-if="agSubtitle">/</span> {{agSubtitle | agTitleCase}} </small></small></h1></div>' 
    	};    	
    });
})();