import $ from 'jquery';
import * as d3 from "d3";
import moment from 'moment';

export default function link(scope, elem, attrs, ctrl) {
    const panel = ctrl.panel;
    ctrl.events.on('render', function () {
        render();
    });

    function render() {
        console.log(panel);
        document.getElementsByClassName("panel-content")[0].style.backgroundColor = "#ddd";
        const nodes = document.querySelectorAll("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper svg");
        if (nodes.length > 0) {
            nodes[0].remove();
        }
        if (panel.histData.length > 0 && panel.histData[0].items.length > 0) {
            renderHist();
            ctrl.renderingCompleted();
        }
    }


    function renderHist() {
        const values = panel.histData[0].items;

        var parseDate = d3.timeParse("%Y-%m-%d");
        values.forEach(function(d) {
           d.x = parseDate(d.x);
        });
        console.log(values);

        var margin = {top: 10, right: 30, bottom: 70, left: 40},
            width = 460 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var max = d3.max(values, function(v) { return v.y });

        var x = d3.scaleBand()
            .domain(values.map(function(v) { return v.x }))
            .range([margin.left, width - margin.right])
            .padding(0.1);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );

        var y = d3.scaleLinear()
            .domain([0, max])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", "translate(35,0)")
            .call(d3.axisLeft(y));

        console.log(values);

        svg.selectAll("bar")
            .data(values)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.y); })
            .attr("height", function(d) { return height - y(d.y); });
    }

}
