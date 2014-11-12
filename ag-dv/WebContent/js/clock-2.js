function clock(parent) {
    var clockGroup, fields, formatHour, formatMinute, formatSecond, pi, render, scaleHours, scaleSecsMins, vis;
    var _color, _radius, _diameter, _class;
    
    formatSecond = d3.time.format("%S");
    formatMinute = d3.time.format("%M");
    formatHour = d3.time.format("%H");
  
    _diameter = 200;
    _radius = _diameter/2;
    _color = "red";
    _class = "clock";

    scaleSecsMins = d3.scale.linear().domain([0, 59 + 59 / 60]).range([0, 2 * Math.PI]);
    scaleHours = d3.scale.linear().domain([0, 11 + 59 / 60]).range([0, 2 * Math.PI]);

    init = function() {
	    vis = d3.selectAll("." + _class).append("svg:svg").attr("width", _diameter).attr("height", _diameter);
	    clockGroup = vis.append("svg:g").attr("transform", "translate(" + _radius + "," + _radius + ")");
	    clockGroup.append("svg:circle").attr("r", _radius * .95).attr("fill", "none").attr("class", "clock outercircle").attr("stroke", "black").attr("stroke-width", 2);
	    clockGroup.append("svg:circle").attr("r", 4).attr("fill", "black").attr("class", "clock innercircle");
    };
  
    paint = function() {
    	var hourArc, minuteArc, secondArc;
    	
//    	console.log("r:" + _radius + ", d:" + _diameter);
        var d = new Date();       
        var data = [
                        { "unit": "seconds", "numeric": d.getSeconds() }, 
                        { "unit": "minutes", "numeric": d.getMinutes() }, 
                        { "unit": "hours", "numeric": d.getHours() + d.getMinutes() / 60 }
                      ];

        clockGroup.selectAll(".clockhand").remove();

        secondArc = d3.svg.arc().innerRadius(0).outerRadius(_radius * .9)
                    .startAngle(function(d) { return scaleSecsMins(d.numeric); })
                    .endAngle(function(d) { return scaleSecsMins(d.numeric); });

        minuteArc = d3.svg.arc().innerRadius(0).outerRadius(_radius * .9)
                    .startAngle(function(d) { return scaleSecsMins(d.numeric); })
                    .endAngle(function(d) { return scaleSecsMins(d.numeric); });

        hourArc = d3.svg.arc().innerRadius(0).outerRadius(_radius * 0.5)
                    .startAngle(function(d) { return scaleHours(d.numeric % 12); })
                    .endAngle(function(d) { return scaleHours(d.numeric % 12); });

        clockGroup.selectAll(".clockhand").data(data).enter().append("svg:path")
                    .attr("d", function(d) {
                                      if (d.unit === "seconds") {
                                        return secondArc(d);
                                      } else if (d.unit === "minutes") {
                                        return minuteArc(d);
                                      } else if (d.unit === "hours") {
                                        return hourArc(d);
                                      }
                            })
                    .attr("class", "clockhand").attr("stroke", _color).attr("stroke-width", function(d) {
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

    function component() {
    }
    
    component.color = function (_) {
        if (!arguments.length) return _color;
        _color = _;
        return component;
    };
    
    component.class = function (_) {
        if (!arguments.length) return _class;
        _class = _;
        return component;
    };
    
    component.diameter = function (_) {
        if (!arguments.length) return _diameter;
        _diameter = _;
        _radius = _diameter/2;
        return component;
    };
    
    component.render = function() {
    	init();
        paint();
        component();
        return component;
    };
    
    var stop = setInterval(function() { return paint(); }, 1000);
    
    return component;
};
