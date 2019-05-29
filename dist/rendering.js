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
            // const xData = data.items.map(d => d.x);
            var values = panel.histData[0].items.map(function (d) {
                return d.y;
            });
            var dates = panel.histData[0].items.map(function (d) {
                return d.x;
            });

            var formatCount = d3.format(",.0f");
            var parseDate = d3.timeParse("%Y-%m-%d");

            console.log(dates);
            dates.forEach(parseDate);
            console.log(dates);

            var margin = { top: 10, right: 30, bottom: 30, left: 40 },
                width = 460 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            d3.select("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var max = d3.max(values);
            var min = d3.min(values);

            var x = d3.scaleLinear().domain([min, max]).range([margin.left, width - margin.right]);
            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

            var y = d3.scaleLinear().range([height, 0]);

            var data = d3.histogram().domain(x.domain()).thresholds(x.ticks(values.length))(values);

            y.domain([0, max]);
            svg.append("g").attr("transform", "translate(35,0)").call(d3.axisLeft(y));

            console.log(data);

            var yMax = d3.max(data, function (d) {
                return d[0];
            });
            var yMin = d3.min(data, function (d) {
                return d[0];
            });

            console.log(yMax);
            console.log(yMin);

            svg.selectAll("rect").data(data).enter().append("rect").attr("x", 1).attr("transform", function (d) {
                return "translate(" + x(d.x0) + "," + y(d[0] || 0) + ")";
            }).attr("width", function (d) {
                return x(d.x1) - x(d.x0) - 1;
            }).attr("height", function (d) {
                return height - y(d[0] || 0);
            }).style("fill", "#69b3a2");
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
