/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-06

 	From index2.html

    - createDataSet()
    - createSVG()
    - createCircles()
    - drawElevator()
    - drawStairs()
    - drawAxes()

***********************************************************************************************************/


// Setup settings for graphic
var canvas_width = 700;
var canvas_height = 500;
var padding = 30;  // for chart edges

var dataset = createDataSet();

// Create scale functions
var xScale = d3.scale.linear()  // xScale is width of graphic
                .domain([0, 120])   //Domain from the beginning for the xAxis
                .range([padding, canvas_width - padding * 2]); // output range

var yScale = d3.scale.linear()  // yScale is height of graphic
                .domain([0, 100])   //Domain from the beginning for the yAxis
                .range([canvas_height - padding, padding]);  // remember y starts on top going down so we flip

// Define X axis
var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .ticks(5);

// Define Y axis
var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(5);

var svg = createSVG();

createCircles(svg);     //Create the circles
drawElevator(160, 20);  //Draw an elevator at this position
drawStairs(10,120);     //Draw the stairs at this position
drawAxes(svg);        //Draw the axes. If this function is not called, no axes are visible.


// Setup data
function createDataSet() {
    //Plottar ut massa random värden. 
    var dataset = [];  // Initialize empty array
    var numDataPoints = 15;  // Number of dummy data points

    //xval and yval = the initial position for the dots
    for(var i = 0; i < numDataPoints; i++) {
        var xval = 60; //Math.floor(Math.random() * maxRange);  // New random integer  
        var yval = 0; //Math.floor(Math.random() * maxRange);  // New random integer
        dataset.push([xval, yval]);  // Add new number to array
    }

    return dataset;
}


// Create the SVG element
function createSVG () {
    // "h4" is where we put our visualization
    var svg = d3.select("h4")  
        .append("svg")
        .attr("width", canvas_width)
        .attr("height", canvas_height)

    return svg;
}


//Create the circles
function createCircles (svg) {
    // Create Circles
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")  // Add circle svg
        .attr("cx", function(d) {
            return xScale(d[0]);   // Circle's X position
        })
        .attr("cy", function(d) {  // Circle's Y position
            return yScale(d[1]);
        })
        .attr("r", 2);  // radius
}


//Draw the elevator --> a rectangle, a blue rectangle
function drawElevator(posX, posY) {
    var rectangle = svg.append('rect')
      .attr('x', posX)
      .attr('y', posY)
      .attr('width', 80)
      .attr('height', 20)
      .style('fill', 'rgb(0,0,255)')
}

//Draw the stairs --> a rectangle, a green rectangle
function drawStairs(posX, posY) {
    var rectangle = svg.append('rect')
      .attr('x', posX)
      .attr('y', posY)
      .attr('width', 20)
      .attr('height', 80)
      .style('fill', 'rgb(0,255,0)')
}

function drawAxes(svg) {
    // Add to X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (canvas_height - padding) +")")
        .call(xAxis);

    // Add to Y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding +",0)")
        .call(yAxis);
}

// On click, update with new data
var starta = document.getElementById("klickahär");
d3.select(starta)
    .on("click", function() {

        var numValues = dataset.length;  // Get original dataset's length

        dataset = [];  // Tom array med alla x och y värden.

        for(var i = 0; i<numValues; i++) {
            var xval = 40 + 5*i;//Math.floor(Math.random() * maxRange);  // Random int for x
            var yval = 100; //Math.floor(Math.random() * maxRange);  // Random int for y

            //Returnerar det nya x och y värdet. 
            dataset.push([xval, yval]);  // Add new numbers to array
        }

        console.log(dataset); 

        // Update scale domains
        xScale.domain([0, d3.max(dataset, function(d) {
            return d[0]; })]);
        yScale.domain([0, d3.max(dataset, function(d) {
            return d[1]; })]);

        // Update circles
        svg.selectAll("circle")
            .data(dataset)  // Update with new data
            .transition()  // Transition from old to new
            .duration(4000)  // Length of animation, default = 1000
            .each("start", function() {  // Start animation
                d3.select(this)  // 'this' means the current element
                    .attr("fill", "red")  // Change color
                    .attr("r", 5);  // Change size
            })
            .delay(function(d, i) {
                return i / dataset.length * 500;  // Dynamic delay (i.e. each item delays a little longer)
            })
            //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
            .attr("cx", function(d) {
                return xScale(d[0]);  // Circle's X
            })
            .attr("cy", function(d) {
                return yScale(d[1]);  // Circle's Y
            })
            .each("end", function() {  // End animation
                d3.select(this)  // 'this' means the current element
                    .transition()
                    .duration(500);
                    //.attr("fill", "black")  // Change color
                  //  .attr("r", 2);  // Change radius
            });

            
            // Update X Axis
            svg.select(".x.axis")
                .transition()
                .duration(1000)
                .call(xAxis);

            // Update Y Axis
            svg.select(".y.axis")
                .transition()
                .duration(100)
                .call(yAxis); 
    });