(function () {
    var app = angular.module('AgBookApp', []);

    app.service('AgBookService', function() {
    });
                 
    app.controller('AgBookController', ['$scope', '$http', 'AgBookService', function ($scope, $http, service) {
        $scope.book = {};
    	$scope.currentChapter = { "chapterTitle":"" };
        $scope.currentPlay = { "playTitle":"" };
        
        $scope.init = function(bookJson, type) {
        	$http.get('assets/' + bookJson + '.json').success (function(data) {
        		console.log("data:" + data);
        		$scope.book = data;
        		$scope.type = type;
        		$scope.parseBook(type);
        		$scope.getChapter('about-the-author');
        	});
        };

        $scope.parseBook = function(type) {
        	console.log("type:" + type);
        	if (type == 'plays') {
        		$scope.sections = { "introduction":[{"sectionTitle":"about-the-book"}],"plays":[] };
        		var plays = {};
            	angular.forEach($scope.book, function(line) {
            		if (line.play_name != undefined) {
            			if (plays[line.play_name] == undefined) {
            				plays[line.play_name] = {"chapterTitle":line.play_name, paragraphs: []};
            				if (line.line_id != undefined) {
            					plays[line.play_name].paragraphs.push(line);
            				}
            			} else {
            				if (line.line_id != undefined) {
            					plays[line.play_name].paragraphs.push(line);
            				}
            			}
            		}
            	});
            	angular.forEach(plays, function(play) {
                	$scope.sections["plays"].push(play);            		
            	});
        	}
        	if (type == 'prose') {
            	$scope.sections = $scope.book.sections;
        	}
        	console.log("sections:" + $scope.sections);
        };
         
        $scope.xgetPlayList = function() {
        	var playList = [];
        	angular.forEach($scope.book, function(line) {
        		if (line.play_name != undefined) {
        			if (playList.indexOf(line.play_name) == -1) {
        				playList.push(line.play_name);
        			}
        		}
        	});
        	return playList.sort();
        };
 
        $scope.xgetPlay = function(title) {
        	var currentPlay = {"title":title, text:[]};
        	angular.forEach($scope.book, function(line) {
        		if (line.play_name != undefined && line.play_name == title) {
        			currentPlay.text.push(line);
        		}
        	});        
        	$scope.currentPlay = currentPlay;
        };
        
        $scope.getChapter = function(title) {
        	console.log("title:" + title);
        	
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
    		if (input == undefined || input === "") return "";
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