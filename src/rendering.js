import $ from 'jquery';
import * as d3 from "d3";

export default function link(scope, elem, attrs, ctrl) {
    let data;
    const panel = ctrl.panel;

    elem = elem.find('.panel-content');

    ctrl.events.on('render', function () {
        render();
    });

    function render() {
        console.log(elem);
        console.log(panel);
    }

    function renderHist() {
        var margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scaleTime()
            .domain([new Date(2015, 0, 1), new Date(2016, 0, 1)])
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var histogram = d3.histogram()
            .value(function(d) { return d.date; })
            .domain(x.domain())
            .thresholds(x.ticks(d3.timeWeek));

        var svg = d3.select("div.panel-content > .panel-height-helper").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        d3.csv("https://bl.ocks.org/mbostock/raw/b2fee5dae98555cf78c9e4c5074b87c3/homicides.csv", type, function(error, data) {
            if (error) throw error;

            var bins = histogram(data);

            y.domain([0, d3.max(bins, function(d) { return d.length; })]);

            var bar = svg.selectAll(".bar")
                .data(bins)
                .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

            bar.append("rect")
                .attr("x", 1)
                .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
                .attr("height", function(d) { return height - y(d.length); });

            bar.append("text")
                .attr("dy", ".75em")
                .attr("y", 6)
                .attr("x", function(d) { return (x(d.x1) - x(d.x0)) / 2; })
                .attr("text-anchor", "middle")
                .text(function(d) { return formatCount(d.length); });
        });

        function type(d) {
            d.date = parseDate(d.date);
            return d;
        }
    }

}
