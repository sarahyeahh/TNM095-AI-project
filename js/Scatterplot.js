/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-06

 	From index2.html

    Functions:
    - createGroupsArray(hour)
    - make_x_axis()
    - make_y_axis()
    - createDataSet(hour)
    - createSVG()
    - createCircles()
    - drawElevator()
    - drawStairs()
    - drawAxes()
    - updateCanvas()

***********************************************************************************************************/

//Get the constructor from BehaviorTree. 
var BT = new BehaviorTree( );
var theTime = new Time();
var hour = theTime.startTime();
var data = new Data();

//console.log("Current hour:" + hour);

//console.log(BT); 
//console.log(BT.goal.x); */

/*_______________________________

    Setup settings for graphic
_________________________________*/

//Only use the canvas width. 
var canvas_width = canvas.width*2;
var canvas_height = canvas.width*2;

var padding = 30;  // for chart edges

// Create scale functions
var xScale = d3.scale.linear()  // xScale is width of graphic
                .domain([0, 9])   //Domain from the beginning for the xAxis
                .range([padding, canvas_width - padding * 2]); // output range

var yScale = d3.scale.linear()  // yScale is height of graphic
                .domain([0, 9])   //Domain from the beginning for the yAxis
                .range([canvas_height - padding, padding]);  // remember y starts on top going down so we flip



/*__________________________________________________

    Call functions to create and draw everything
____________________________________________________*/
var dataset = data.dataset;
//var dataset = createDataSet(hour);

var svg = createSVG();

drawEntrance(143, 570);  //Draw an entrance at this position
drawElevator(540, 210); //Draw an elevator at this position
drawStairs(10,150);     //Draw the stairs at this position
drawAxes(svg);          //Draw the axes. If this function is not called, no axes are visible.

createCircles(svg);     //Create the circles
//updateCanvas();         //Move the circles to their final position/update their position


/*_______________________

        FUNCTIONS
_________________________*/

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
        .data(this.dataset)
        .enter()
        .append("circle")  // Add circle svg
        .attr("cx", (canvas_width/9)*2.5) //Begins at [0,2.5]
        .attr("cy", canvas_height-padding)
        .attr("r", 1);  // radius
}

//Draw the elevator --> a rectangle, a blue rectangle
function drawElevator(posX, posY) {
    var plotElevator = svg.append('rect')
      .attr('x', posX)
      .attr('y', posY)
      .attr('width', 20)
      .attr('height', 60)
      .style('fill', 'rgb(0,0,255)')
}

//Draw the stairs --> a rectangle, a green rectangle
function drawStairs(posX, posY) {
    var plotStairs = svg.append('rect')
      .attr('x', posX)
      .attr('y', posY)
      .attr('width', 20)
      .attr('height', 60)
      .style('fill', 'rgb(0,255,0)')
}

//Draw the entrance
function drawEntrance(posX, posY) {
    var plotEntrance = svg.append('rect')
      .attr('x', posX)
      .attr('y', posY)
      .attr('width', 58)
      .attr('height', 10)
      .style('fill', 'rgb(0,0,0)')
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

function DataSet(){
    this.xval= 0; 
    this.yval = 0; 
    this.radius = 0; 
}

function updateCanvas(group) {

    console.log("  --- Updating the canvas/plotting dots ---");
    this.dataset = new DataSet();  //?? Har vi en constructor för DataSet, borde vi inte kalla på Data.dataset?

    console.log(group); 

    createCircles(svg);


    var numValues = dataset.length;  // Get original dataset's length

    tempDataset = dataset;
    //console.log("tempDataset" + tempDataset);
    dataset = [];  // Tom array med alla x och y värden.

    //For all datapoints set their new position
    for(var i = 0; i < numValues; i++) {

        this.dataset.radius = 2; //tempDataset[i][2];
        this.dataset.xval = group.goal.x;
        this.dataset.yval = group.goal.y; 

        console.log( this.dataset);

        //The goal is set in BT.
       /* var xval = group.goal.x; 
        var yval = group.goal.y; 
        console.log(xval);*/
        
        //Returnerar det nya x och y värdet. 
        dataset.push([xval, yval, newRadius]);  // Add new numbers to array
    }

    // Update circles
    svg.selectAll("circle")
        .data(this.dataset)  // Update with new data
        .transition()  // Transition from old to new
        .duration(6000)  // Length of animation, default = 1000
        .each("start", function() {  // Start animation
            d3.select(this)  // 'this' means the current element
                .attr("fill", "red")  // Change color
                .attr("r", function (d) { 
                    return d[2]; 
                   // return this.dataset.radius; 

                });  // Change size
        })
        .delay(function(d, i) {
            return i /  this.dataset.length * 6000;  // Dynamic delay (i.e. each item delays a little longer), default = 500
        })
        //.ease("linear")  // Transition easing - default 'variable' (i.e. has acceleration), also: 'circle', 'elastic', 'bounce', 'linear'
        .attr("cx", function(d) {

            return xScale(d[0]);  // Circle's X
            //return this.dataset.xval; 
        })
        .attr("cy", function(d) {
            // return this.dataset.yval; 
            return yScale(d[1]);  // Circle's Y
        })
        .each("end", function() {  // End animation
            d3.select(this)  // 'this' means the current element
                .transition()
                .duration(6000);    //default = 500
                //.attr("fill", "black")  // Change color
              //  .attr("r", 2);  // Change radius
        });
            
} 

/*

function updateElevator()  {

    document.getElementById("rect").style.fill = yellow;

}
*/



