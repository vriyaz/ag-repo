angular.module('ag', ['agClock']);

angular.module('agClock',[])
    .directive('agClock', [ '$interval', function($interval) {
        'use strict';

        return {
            restrict: 'EA',

            // sets up the isolate scope so that we don't clobber parent scope
            scope: {
                diameter: '=',
                handColor: '=',
                color: '='
            },

            link: function(scope, element, attrs) {
                var clockGroup, scaleHours, scaleSecsMins, vis;
                var _handColor, _color, _radius, _diameter, _fill, _id;

                _diameter = attrs.diameter;
                _radius = _diameter/2;
                _handColor = attrs.handColor;
                _color = attrs.color;
                _fill = (attrs.fill && attrs.fill.toLowerCase() === 'yes') ? _color : "none";
                _id = attrs.id;

                scaleSecsMins = d3.scale.linear().domain([0, 59 + 59 / 60]).range([0, 2 * Math.PI]);
                scaleHours = d3.scale.linear().domain([0, 11 + 59 / 60]).range([0, 2 * Math.PI]);

                var offSetX = _radius, offSetY = _radius;

                vis = d3.select(document.getElementById(_id)).append("svg:svg").attr("width", _diameter).attr("height", _diameter);
                clockGroup = vis.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")");
                clockGroup.append("svg:circle").attr("r", _radius * .95).attr("fill", _fill)
                            .attr("class", "clock outercircle").attr("stroke", _color).attr("stroke-width", 2);
                clockGroup.append("svg:circle").attr("r", 4).attr("fill", _handColor).attr("class", "clock innercircle");

                paint = function(data) {
                    var hourArc, minuteArc, secondArc;
                    var classHand = _id + "hand";
                    
                    var d = new Date();
                    var data = [ 
                                { "unit": "seconds", "numeric": d.getSeconds() }, 
                                { "unit": "minutes", "numeric": d.getMinutes() }, 
                                { "unit": "hours", "numeric": d.getHours() + d.getMinutes() / 60 }
                               ];
                    
                    clockGroup.selectAll("." + classHand).remove();

                    secondArc = d3.svg.arc().innerRadius(0).outerRadius(_radius * .9)
                                .startAngle(function(d) { return scaleSecsMins(d.numeric); })
                                .endAngle(function(d) { return scaleSecsMins(d.numeric); });

                    minuteArc = d3.svg.arc().innerRadius(0).outerRadius(_radius * .9)
                                .startAngle(function(d) { return scaleSecsMins(d.numeric); })
                                .endAngle(function(d) { return scaleSecsMins(d.numeric); });

                    hourArc = d3.svg.arc().innerRadius(0).outerRadius(_radius * 0.5)
                                .startAngle(function(d) { return scaleHours(d.numeric % 12); })
                                .endAngle(function(d) { return scaleHours(d.numeric % 12); });

                    clockGroup.selectAll("." + classHand).data(data).enter().append("svg:path")
                                .attr("d", function(d) {
                                                  if (d.unit === "seconds") {
                                                    return secondArc(d);
                                                  } else if (d.unit === "minutes") {
                                                    return minuteArc(d);
                                                  } else if (d.unit === "hours") {
                                                    return hourArc(d);
                                                  }
                                        })
                                .attr("class", classHand).attr("stroke", _handColor).attr("stroke-width", function(d) {
                                                  if (d.unit === "seconds") {
                                                    return 1 * (_diameter / 100);
                                                  } else if (d.unit === "minutes") {
                                                    return 2 * (_diameter / 100);
                                                  } else if (d.unit === "hours") {
                                                    return 3 * (_diameter / 100);
                                                  }
                                        })
                                .attr("fill", "none");
                };
                
                var stop = $interval(paint(), 1000)
                scope.$on('$destroy', function() {
                    // Make sure that the interval is destroyed too
                    $interval.cancel(stop);
                });
            }
        }
}]);
