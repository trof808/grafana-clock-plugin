'use strict';

System.register(['jquery', 'd3'], function (_export, _context) {
    "use strict";

    var $, d3;
    function link(scope, elem, attrs, ctrl) {
        var panel = ctrl.panel;

        ctrl.events.on('render', function () {
            render();
        });

        function render() {
            console.log(panel);
            renderHist();
        }

        function renderHist() {
            var data = panel.histData[0];
            var xData = data.items.map(function (d) {
                return d.x;
            });
            var yData = data.items.map(function (d) {
                return d.y;
            });
            console.log(xData);
            console.log(yData);
            var margin = { top: 10, right: 30, bottom: 30, left: 30 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = d3.scaleTime().domain([xData[0], xData[xData.length - 1]]).rangeRound([0, width]);
            console.log(x);

            var y = d3.scaleLinear().range([height, 0]);

            var histogram = d3.histogram().value(function (d) {
                return d.format("DD-MM-YYYY");
            }).domain(x.domain()).thresholds(x.ticks(d3.timeWeek));

            var svg = d3.select("div.panel-content > .panel-height-helper").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

            var bins = histogram(xData);

            y.domain([0, d3.max(yData)]);

            console.log(bins);

            var bar = svg.selectAll(".bar").data(bins).enter().append("g").attr("class", "bar").attr("transform", function (d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")";
            });

            bar.append("rect").attr("x", 1).attr("width", function (d) {
                return x(d.x1) - x(d.x0) - 1;
            }).attr("height", function (d) {
                return height - y(d.length);
            });

            bar.append("text").attr("dy", ".75em").attr("y", 6).attr("x", function (d) {
                return (x(d.x1) - x(d.x0)) / 2;
            }).attr("text-anchor", "middle").text(function (d) {
                return formatCount(d.length);
            });

            function type(d) {
                d.date = parseDate(d.date);
                return d;
            }
        }
    }

    _export('default', link);

    return {
        setters: [function (_jquery) {
            $ = _jquery.default;
        }, function (_d) {
            d3 = _d;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=rendering.js.map
