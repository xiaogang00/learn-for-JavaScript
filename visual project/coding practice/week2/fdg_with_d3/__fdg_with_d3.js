/**
 * Created by pengsida on 2017/5/16.
 */

var svg = d3.select("svg");
var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation();
simulation.force("link", d3.forceLink().id(function (d) {
    return d.id;
}));
simulation.force("charge", d3.forceManyBody());
simulation.force("center", d3.forceCenter(svg.attr("width")/2, svg.attr("height")/2));

d3.json("miserables.json", function (err, graph) {
    if(err)
        throw err;

    var lines = svg.append("g").attr("class", "links")
        .selectAll("line").data(graph.links).enter().append("line")
        .attr("stroke-width", function (d) {
            return Math.sqrt(d.value);
        });

    var nodes = svg.append("g").attr("class", "nodes")
        .selectAll("circle").data(graph.nodes).enter().append("circle")
        .attr("r", 5)
        .attr("fill", function (d) {
            return color(d.group);
        });

    nodes.append("title").text(function (d) {
        return d.id;
    });

    nodes.call(d3.drag()
        .on("start", drag_start)
        .on("drag", dragging)
        .on("end", drag_end)
    );

    simulation.nodes(graph.nodes);
    simulation.on("tick", ticked);
    simulation.force("link").links(graph.links);

    function ticked() {
        lines
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        nodes
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    }
});

function drag_start(d) {
    if (!d3.event.active)
        simulation.alphaTarget(0.3).restart();

    d.fx = d.x;
    d.fy = d.y;
}

function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function drag_end(d) {
    if (!d3.event.active)
        simulation.alphaTarget(0);

    d.fx = null;
    d.fy = null;
}