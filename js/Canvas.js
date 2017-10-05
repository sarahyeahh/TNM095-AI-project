/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for functions related to the canvas.

 	The file includes the functions:
 	- getSpeed()
 	- draw()
 	- drawCircle()
 	- drawRectangle()
 	- ballCircle()

***********************************************************************************************************/
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

 	var x = canvas.width/2;
    var y = canvas.height;
    var r = 10;
    var speed = 0;

	//Prototype constructor for canvas (används inte än!)
    function Canvas(width, height){
    	/*this.ctx = this.canvas.context;
	    this.x = canvas.width/2;
	    this.y = canvas.height;
	    this.r = 10;
	    this.speed = 2;

	    //Nya oanvända
	    this.angle = Math.random() * Math.PI * 2;
	    this.moveAngle = 0;
	    this.position = {
		    x: xpos,
		    y: ypos
		};*/
		this.currentGrid = -1; 
		this.nextGrid = -1; 
    }

	function getSpeed(speedValue){
		speed = speedValue;
		console.log("Speed: " +  speed);
	}

	//Remove the previous dot and draw a new. 
	Canvas.prototype.update = function(){
	
		return 0; 
	}

	function draw() {
		r = 2;	//default radius

		//Call all the functions drawing elements in the canvas
		drawGroup(90,150,r); 
  		drawRectangle();
		drawCircle(x, y, r); 
		drawStairs();
	}

	function drawCircle(x, y, r){

		//Red circle
	    context.beginPath();
	   	context.arc(x, y, r, 0, 2 * Math.PI, true);
	    context.fillStyle = 'red';
	    context.fill();
	    context.lineWidth = 2;
	    context.strokeStyle = 'red';
	    context.stroke();	

	}	

	function drawRectangle(x,y){
		//Elevator = blue rectangle
		context.fillStyle = 'blue';
	    context.fillRect(x, y, 20, 6);

	}

	function drawStairs(){
		var x = 0;
		var y = 100;

		//Stairs = yellow and orange rectangles
		context.fillStyle = 'yellow';
	    context.fillRect(x, y, 2, 20);
	    context.fillStyle = 'orange';
	    context.fillRect(x+2, y, 2, 20);
	    context.fillStyle = 'yellow';
	    context.fillRect(x+4, y, 2, 20);
	    context.fillStyle = 'orange';
	    context.fillRect(x+6, y, 2, 20);
	}

	/****************************************************
		Moving circle/ball
	****************************************************/

	//Draw the moving circle/ball
    function drawGroup(x,y,r) {
	    //var r = 2;

	    //People = green circle 
 		context.beginPath();
	   	context.arc(x, y, r, 0, 2 * Math.PI, true);
	    context.fillStyle = 'green';
	    context.fill();
	    context.lineWidth = 2;
	    context.strokeStyle = 'green';
	    context.stroke();

	    //Change y value and call the function again
        y = y-2*r-5;
        if (y > -10) {
        	//Clear the previous circle
        	context.clearRect(x-4, y+15, 8, 9);
        	
        	//Call the function again to draw the next cirle.
        	setTimeout(function(){ 
        		drawGroup(x,y,r);}, 500);  

        }
    } 
	