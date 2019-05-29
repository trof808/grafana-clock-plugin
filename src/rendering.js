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
        // const xData = data.items.map(d => d.x);
        const values = panel.histData[0].items;
        // let dates = panel.histData[0].items.map(d => d.x);

        var formatCount = d3.format(",.0f");
        var parseDate = d3.timeParse("%Y-%m-%d");
        values.forEach(function(d) {
           d.x = parseDate(d.x);
        });
        console.log(values);

        var margin = {top: 10, right: 30, bottom: 30, left: 40},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var svg = d3.select("panel-plugin-test-clock-plugin.panel-height-helper ng-transclude.panel-height-helper").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var max = d3.max(values.map(v => v.y));

        var x = d3.scaleLinear()
            .domain([new Date(moment(values[0].x)), new Date(moment(values[values.length - 1].x))])
            .range([margin.left, width - margin.right]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .range([height, 0]);

        var data = d3.histogram()
            .value(function(d) { return d.x })
            .domain(x.domain())
            .thresholds(x.ticks(values.length))
            (values);

        y.domain([0, max]);
        svg.append("g")
            .attr("transform", "translate(35,0)")
            .call(d3.axisLeft(y));

        console.log(data);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d[0] || 0) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return (height - y(d[0] || 0)); })
            .style("fill", "#69b3a2")
    }

}
