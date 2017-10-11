/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-06

 	From index2.html

    - make_x_axis()
    - make_y_axis()
    - createDataSet()
    - createSVG()
    - createCircles()
    - drawElevator()
    - drawStairs()
    - drawAxes()
    - updateCanvas()

***********************************************************************************************************/


/* ---------------------------------- TESTAR LITE -------------------------------------*/
        var nmbrOfGroups = 0;
        var generatedGroups = [];

        for(i=1; i<6; i++) {
            generatedGroups.push(new Group());
            nmbrOfGroups = i;
            generatedGroups[nmbrOfGroups-1].ID += nmbrOfGroups;
        }
        
        console.log("generatedGroups: ")
        console.log(generatedGroups);
/* -------------------------------------------------------------------------------------*/


// Setup settings for graphic

var canvas_width = canvas.width*2;
var canvas_height = canvas.width*2;
console.log("canvas w" + canvas_width);

var padding = 30;  // for chart edges

// Create scale functions
var xScale = d3.scale.linear()  // xScale is width of graphic
                .domain([0, 9])   //Domain from the beginning for the xAxis
                .range([padding, canvas_width - padding * 2]); // output range

var yScale = d3.scale.linear()  // yScale is height of graphic
                .domain([0, 9])   //Domain from the beginning for the yAxis
                .range([canvas_height - padding, padding]);  // remember y starts on top going down so we flip

var dataset = createDataSet();
var svg = createSVG();

drawElevator(540, 210);  //Draw an elevator at this position
drawStairs(10,150);     //Draw the stairs at this position
drawAxes(svg);          //Draw the axes. If this function is not called, no axes are visible.

createCircles(svg);     //Create the circles
updateCanvas();         //Move the circles to their final position/update their position


//Make X axis
function make_x_axis() {
    return d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(9)
}

//Make Y axis
function make_y_axis() {
    return d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(9);

}

// Setup data
function createDataSet() {
    //Plottar ut massa random värden. 
    var dataset = [];  // Initialize empty array
    var numDataPoints = 15;  // Number of dummy data points

    //xval and yval = the initial position for the dots
    for(var i = 0; i < nmbrOfGroups; i++) {
        var xval = generatedGroups[i].initialX; 
        var yval = generatedGroups[i].initialY; 
        var radius = generatedGroups[i].groupSize *2;       //Tar *2 enbart för att få större prickar
        dataset.push([xval, yval, radius]);  // Add new number to array
    }

    console.log("data: " + dataset);
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
        /*
        .attr("cx", function(d) {
            return xScale(d[0]);   // Circle's X position
        })
        .attr("cy", function(d) {  // Circle's Y position
            return yScale(d[1]);
        })*/
        .attr("cx", canvas_width/3)
        .attr("cy", canvas_height-padding)
        .attr("r", 1);  // radius
}


//Draw the elevator --> a rectangle, a blue rectangle
function drawElevator(posX, posY) {
    var rectangle = svg.append('rect')
      .attr('x', posX)
      .attr('y', posY)
      .attr('width', 20)
      .attr('height', 60)
      .style('fill', 'rgb(0,0,255)')
}

//Draw the stairs --> a rectangle, a green rectangle
function drawStairs(posX, posY) {
    var rectangle = svg.append('rect')
      .attr('x', posX)
      .attr('y', posY)
      .attr('width', 20)
      .attr('height', 60)
      .style('fill', 'rgb(0,255,0)')
}

function drawAxes(svg) {
    // Add to X axis
    svg.append("g")
        .attr("class", "grid") //förut: "class", "x axis"
        .attr("transform", "translate(0," + (canvas_height - padding) +")")
        .call(make_x_axis(xScale)
            .tickSize(-canvas_height + 2*padding, 0, 0)
            .tickFormat("")
        );

    // Add to Y axis
    svg.append("g")
        .attr("class", "grid") //förut: "class", "y axis"
        .attr("transform", "translate(" + padding +",0)")
        .call(make_y_axis(yScale)
            .tickSize(3*padding - canvas_width, 0, 0)
            .tickFormat("")
        );
}

/*
// On click, update with new data
var starta = document.getElementById("klickahär");
d3.select(starta)
    .on("click", function() {*/

function updateCanvas() {
        var numValues = dataset.length;  // Get original dataset's length

        tempDataset = dataset;
        console.log("tempDataset" + tempDataset);
        dataset = [];  // Tom array med alla x och y värden.

        //For all datapoints set their new position
        for(var i = 0; i<numValues; i++) {

            var newRadius = tempDataset[i][2];

//TODO: Ska baseras BehaviourTree och på Move
            //If the group is small (groupsize is 1, 2 or 3) --> go to the elevator
            if(newRadius < 7) { 
                //540, 210
                var xval = 9;
                var yval = 5.5; 
            }
            else {  //If the group is bigger --> go to the stairs
                var xval = 0;
                var yval = 6.5; 
            }
 
            //Returnerar det nya x och y värdet. 
            dataset.push([xval, yval, newRadius]);  // Add new numbers to array
        }

        console.log(dataset); 

        /*
        // Update scale domains
        xScale.domain([0, d3.max(dataset, function(d) {
            return d[0]; })]);
        yScale.domain([0, d3.max(dataset, function(d) {
            return d[1]; })]);
        */

        // Update circles
        svg.selectAll("circle")
            .data(dataset)  // Update with new data
            .transition()  // Transition from old to new
            .duration(5000)  // Length of animation, default = 1000
            .each("start", function() {  // Start animation
                d3.select(this)  // 'this' means the current element
                    .attr("fill", "red")  // Change color
                    .attr("r", function (d) { return d[2]; });  // Change size
            })
            .delay(function(d, i) {
                return i / dataset.length * 5000;  // Dynamic delay (i.e. each item delays a little longer), default = 500
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
                    .duration(5000);    //default = 500
                    //.attr("fill", "black")  // Change color
                  //  .attr("r", 2);  // Change radius
            });

            /*
            // Update X Axis
            svg.select(".x.axis")
                .transition()
                .duration(1000)
                .call(make_x_axis(xScale)
                    .tickSize(-height, 0, 0)
                    .tickFormat(""))

            // Update Y Axis
            svg.select(".y.axis")
                .transition()
                .duration(100)
                .call(make_y_axis(yScale)
                    .tickSize(-width, 0, 0)
                    .tickFormat("")) 
            */

  }  

