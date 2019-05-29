import $ from 'jquery';
import * as d3 from "d3";

export default function link(scope, elem, attrs, ctrl) {
    const panel = ctrl.panel;
    ctrl.events.on('render', function () {
        render();
    });

    function render() {
        console.log(panel);
        if (panel.histData.length > 0 && panel.histData[0].items.length > 0) {
            renderHist();
        }
    }

    function renderHist() {
        // const xData = data.items.map(d => d.x);
        const values = panel.histData[0].items.map(d => d.y);
        var formatCount = d3.format(",.0f");

        var margin = {top: 10, right: 30, bottom: 30, left: 40},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var svg;

        if (document.querySelectorAll("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper svg").length === 0) {
            svg = d3.select("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper").append("svg");
        } else {
            svg = d3.select("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper svg");
        }

        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var max = d3.max(values);
        var min = d3.min(values);

        var x = d3.scaleLinear()
            .domain([min, max])
            .range([margin.left, width - margin.right]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .range([height, 0]);

        var data = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(values.length))
            (values);

        y.domain([0, d3.max(data, function(d) { return d.length; })]);
        svg.append("g")
            .call(d3.axisLeft(y));

        console.log(data);

        var yMax = d3.max(data, function(d){return d[0]});
        var yMin = d3.min(data, function(d){return d[0]});

        console.log(yMax);
        console.log(yMin);

        // var bar = svg.selectAll(".bar")
        //     .data(data)
        //     .enter().append("g")
        //     .attr("class", "bar")
        //     .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d[0]) + ")"; });
        //
        // bar.append("rect")
        //     .attr("x", 1)
        //     .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1; })
        //     .attr("height", function(d) { return (height - y(d[0])) / 2; })
        //     .attr("fill", '#0af');
        //
        // bar.append("text")
        //     .attr("dy", ".75em")
        //     .attr("y", -12)
        //     .attr("x", function(d) { return (x(d.x1) - x(d.x0)) / 2; })
        //     .attr("text-anchor", "middle")
        //     .text(function(d) { return formatCount(d[0]); });

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#69b3a2")
    }

}
