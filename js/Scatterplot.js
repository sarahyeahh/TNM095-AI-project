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

/*_______________________________

    Setup settings for graphic
_________________________________*/

//Creates the constructor dataset
function DataSet(){
    this.xval= (canvas_width/9)*2.5;  
    this.yval = canvas_height-padding;//0; 
    this.radius = 1; 
    this.speed = 1; 
}

function draw(group){

    console.log("************* Draw **************");
    
    this.dataset = []; 

    //Get value from group that are created in Group.js
    for(var i = 0; i < group.length; i++){
        this.dataset.push(new DataSet());  // Add new number to array
        this.dataset[i].radius = group[i].groupSize;
        this.dataset[i].xval = group[i].initialX;
        this.dataset[i].yval = group[i].initialY;
    }
    
    createCircles(svg);  
}

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

//var dataset = data.dataset;
//var dataset = createDataSet(hour);

var svg = createSVG();

drawEntrance(143, 570);  //Draw an entrance at this position
drawElevator(540, 210); //Draw an elevator at this position
drawStairs(10,150);     //Draw the stairs at this position
drawAxes(svg);          //Draw the axes. If this function is not called, no axes are visible.

//createCircles(svg);     //Create the circles
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

    console.log("*************Creating SVG**************");
    // "h4" is where we put our visualization
    var svg = d3.select("h4")  
        .append("svg")
        .attr("width", canvas_width)
        .attr("height", canvas_height)

    return svg;
}

//Create the circles
function createCircles (svg) {

    console.log("*************Creating circles**************");
    // Create Circles
    svg.selectAll("circle")
        .data(this.dataset)
        .enter()
        .append("circle")  // Add circle svg
        .attr("fill", "red")  
        .style("fill-opacity", .3)
        .attr("cx", function(d) {
            return xScale(d.xval);  // Circle's X
        })
        .attr("cy", function(d) {  // Circle's Y
            return yScale(d.yval);
        }) 
        .attr("r", function(d) { 
            return 2*d.radius;
        });  // radius
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


function updateCanvas(group, i) {

    console.log("  --- Updating the canvas/plotting dots ---");

    this.dataset[group.ID].xval = group.goal.x;
    this.dataset[group.ID].yval = group.goal.y; 
    this.dataset[group.ID].speed = group.speed; 

    // Update circles
    svg.selectAll("circle")
        .data(this.dataset)  // Update with new data
        .transition()  // Transition from old to new
        .duration(function(d){
            return 2000*d.speed; 
        })  // Length of animation, default = 1000
        .each("start", function() {  // Start animation
            d3.select(this)  // 'this' means the current element
                .attr("fill", "green")  // Change color
                .style("fill-opacity", .4)
                .attr("r", function (d) { 
                    return 3*d.radius; 
                });  // Change size
        })
        .delay(function(d, j) {    
            return j /  15 * 6000;  // Dynamic delay (i.e. each item delays a little longer), default = 500
        })
        .attr("cx", function(d) { 
            return xScale(d.xval);  // Circle's X
        })
        .attr("cy", function(d) { 
            return yScale(d.yval);  // Circle's Y
        })
        .each("end", function() {  // End animation
            d3.select(this)  // 'this' means the current element
                .transition()
                .attr("fill", "black")
                .style("fill-opacity", 0) //Disappears when reach goal
                .duration(500);    //default = 500
        });            
} 

/*

function updateElevator()  {

    document.getElementById("rect").style.fill = yellow;

}
*/



