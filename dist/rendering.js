'use strict';

System.register(['jquery', 'd3', 'moment'], function (_export, _context) {
    "use strict";

    var $, d3, moment;
    function link(scope, elem, attrs, ctrl) {
        var panel = ctrl.panel;
        ctrl.events.on('render', function () {
            render();
        });

        function render() {
            console.log(panel);
            var nodes = document.querySelectorAll("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper svg");
            if (nodes.length > 0) {
                nodes[0].remove();
            }
            if (panel.histData.length > 0 && panel.histData[0].items.length > 0) {
                renderHist();
                ctrl.renderingCompleted();
            }
        }

        function renderHist() {
            var values = panel.histData[0].items;

            var parseDate = d3.timeParse("%Y-%m-%d");
            values.forEach(function (d) {
                d.x = parseDate(d.x);
            });
            console.log(values);

            var margin = { top: 10, right: 30, bottom: 30, left: 40 },
                width = 460 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var svg = d3.select("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var max = d3.max(values, function (v) {
                return v.y;
            });

            var x = d3.scaleOrdinal().domain(values.map(function (v) {
                return v.x;
            })).range([margin.left, width - margin.right]);
            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")));

            var y = d3.scaleLinear().domain([0, max]).range([height, 0]);

            var data = d3.histogram().value(function (d) {
                return d.x;
            }).domain(x.domain()).thresholds(x.ticks(d3.timeDay))(values);

            svg.append("g").attr("transform", "translate(35,0)").call(d3.axisLeft(y));

            console.log(data);
            console.log(values);

            // svg.selectAll("rect")
            //     .data(data)
            //     .enter()
            //     .append("rect")
            //     .attr("x", 1)
            //     .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d[0] || 0) + ")"; })
            //     .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            //     .attr("height", function(d) { return (height - y(d[0] || 0)); })
            //     .style("fill", "#69b3a2")

            svg.selectAll("bar").data(values).enter().append("rect").style("fill", "steelblue").attr("x", function (d) {
                return x(d.x);
            }).attr("width", x.rangeBand()).attr("y", function (d) {
                return y(d.y);
            }).attr("height", function (d) {
                return height - y(d.y);
            });
        }
    }

    _export('default', link);

    return {
        setters: [function (_jquery) {
            $ = _jquery.default;
        }, function (_d) {
            d3 = _d;
        }, function (_moment) {
            moment = _moment.default;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=rendering.js.map
