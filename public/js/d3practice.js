$(document).ready(function(){

var bardata = [20, 30, 105, 15, 85];

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

    var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);
    var xScale=d3.scale.ordinal()
        .domain(d3.range(0,bardata.length))
        .rangeBands([0,width])

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)

    d3.selectAll("#chart").append('svg')
      .attr("width",width)
      .attr("height", height)
      .style("background",'#C9D7D6')
      .selectAll("rect")
      .data(bardata).enter().append("rect")
      .style("fill","#c161d1")
           .attr('width', xScale.rangeBand)
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('x', function(d,i) {
            return xScale(i);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .on("mouseover",function(d){
            tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY - 30) + 'px')


          d3.select(this).
          transition().duration(800).
          style("opacity",0.5)})
        .on("mouseout",function(d){d3.select(this)
          .transition().duration(800)
          .style("opacity",1)})

var vGuideScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([height, 0])
var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10)

    var vGuide = d3.select('svg').append('g')
    .attr('transform', 'translate(35, 0)')
    .call(vAxis)

})





