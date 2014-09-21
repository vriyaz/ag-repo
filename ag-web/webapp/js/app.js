(function () {
    var app = angular.module('AgApp', []);

    app.service('AgService', function() {
    });
                 
    app.controller('AgController', function (AgService) {
        this.book = book;
        this.currentChapter = undefined;
        
        this.setChapter = function(title) {
        	var found = false;
        	for (var s in this.book.section) {
        		if (! found) {
            		var chapters = this.book.section[s].chapter;
            		for (var c in chapters) {
            			var chapter = chapters[c];
    	        		if (title == chapter.title) {
    	        			this.currentChapter = chapter;
    	        			found = true;
    	        			break;
    	        		}
            		}
            	}
        	}
        };        
    });
    
    app.filter('agTitleCase', function() {
    	return function(input) {
    		if (!input) return "";
            var skipThese = ['of', 'in', 'is', 'by', 'on', 'and'];
            return input.split('-').join(' ').replace(/\w\S*/g, function(text) {
            			if (skipThese.indexOf(text.toLowerCase()) != -1) {
            				return text.toLowerCase();
            			}
            			return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            		});
    	};
    });
    
    app.directive('AgJumboText', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			agText: '@'
    		},
    		template: '<div class="jumbotron"><h1>{{agText}}</h1></div>' 
    	};    	
    });
})();