angular.module('demo', ['dangle', 'demo.controllers']);
angular.module('demo.controllers', [])
    .controller('DemoCtrl', function($scope) {
        'use strict';

        var resultsA = {
        	facets: {
    			Product : {
      				_type : "terms", missing : 0, total : 454, other : 0,
      				terms : [
                                { term : "Prod-A", count : 306 },
                                { term : "Prod-B", count : 148 },
                                { term : "Prod-C", count : 62  }
                            ]
    			},
    			Sex : {
      				_type : "terms", missing : 0, total : 454, other : 0, colorMap: { "Prod-A": "red" },
      				terms : [
                                { term : "Male", count : 36 },
                                { term : "Female", count : 148 }
                            ]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [
                                { time : 1341100800000, count : 9 }, 
                                { time : 1343779200000, count : 32 }, 
                                { time : 1346457600000, count : 78 }, 
                                { time : 1349049600000, count : 45 }, 
                                { time : 1351728000000, count : 134 }
                              ]
        		},
                Progress : {
                    _type: "terms", 
                    terms : [
                                { term: "progress", count: 37 }
                              ]
                }
        	}
        };

        var resultsB = {
        	facets: {
    			Product : {
      				_type : "terms", missing : 0, total : 454, other : 0, colorMap: { "Prod-A": "red" },
      				terms : [
                                { term : "Prod-A", count : 306 },
                                { term : "Prod-B", count : 408 },
                                { term : "Prod-C", count : 100 }
                            ]
    			},
    			Sex : {
      				_type : "terms", missing : 0, total : 454, other : 0,
      				terms : [{ term : "Male", count : 36 }, { term : "Female", count : 40 }]
    			},
        		Times : {
        			_type: "date_histogram",
	        		entries : [
                                { time : 1341100800000, count : 9 }, 
                                { time : 1343779200000, count : 32 }, 
                                { time : 1346457600000, count : 78 }
                              ]
        		},
                Progress : {
                    _type: "terms",
                    terms : [
                                { term: "progress", count: 63 }
                              ]
                }

        	}
        };

        $scope.filterSearchA = function(type, term) {
            switch(currentResults) {
                case 'A':
                    $scope.results = resultsB;
                    currentResults = 'B';
                    break;
                case 'B':
                    $scope.results = resultsA;
                    currentResults = 'A';
                    break;
            }
        };

        $scope.results = resultsA;
        var currentResults = 'A';

    });
