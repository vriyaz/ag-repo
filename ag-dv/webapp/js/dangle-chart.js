angular.module('demo', ['dangle', 'demo.controllers']);
angular.module('demo.controllers', [])
    .controller('DemoCtrl', function($scope) {
        'use strict';

        $scope.dates = {};
        var a = {d: Date()}; a.ts = moment(a.d).valueOf(); a.s = moment(a.ts).format("M/D/YYYY");
        var b = {d: moment(1341100800000)}; b.ts = moment(b.d).valueOf();  b.s = moment(b.d).format("M/D/YYYY");
        $scope.dates.a = a;
        $scope.dates.b = b;
        
        var random = function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min ;
        };
        
        var randomize = function() {
            var results = {
                    Product : { terms : [] },
                    Sex : { terms : [] },
                    Times : { entries : [] },
                    Progress : { terms : [] }
            };
            
            results.Product.terms.push({term: 'prod-a', count: random(10,50)});
            results.Product.terms.push({term: 'prod-b', count: random(10,50)});
            results.Product.terms.push({term: 'prod-c', count: random(10,50)});
            
            results.Sex.terms.push({term: 'Male', count: random(10,100)});
            results.Sex.terms.push({term: 'Female', count: random(10,100)});
                
            results.Progress.terms.push({term: "Progress", count: random(0,100)});
            
            var a = moment(1341100800000);
            for (var i=1; i<=10; i++) {
                a.add(1, "days");
                results.Times.entries.push({time: a.valueOf(), count: i*Math.random(5) + 2});
            }
            return results;
        }
    
        $scope.switchResults = function() {
            $scope.results = randomize();
        };

        $scope.switchResults();
    });
