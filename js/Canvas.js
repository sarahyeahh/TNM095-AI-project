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
    	this.ctx = this.canvas.context;
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
		};
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
			
		ballCircle(90,150); 
  		drawRectangle();
		drawCircle(x, y, r); 
	}

	function drawCircle(x, y, r){

		//Röd prick
	    context.beginPath();
	   	context.arc(x, y, r, 0, 2 * Math.PI, true);
	    context.fillStyle = 'red';
	    context.fill();
	    context.lineWidth = 2;
	    context.strokeStyle = 'red';
	    context.stroke();	

	}	

	function drawRectangle(x,y){

		//Hissen/blå rektangel
		context.fillStyle = 'blue';
	    context.fillRect(x, y, 20, 6);

	}

	/****************************************************
		Moving circle/ball
	****************************************************/
/*	
	var ball = document.getElementById('ball');
    var angle = 102; //default:0 //the angle corresponding to where the ball begins to move
	var ball_x = canvas.width/2;
	var ball_y = canvas.height;
    var w = 1;
    var h = canvas.height/2;

    //Draw the moving circle/ball
    function ballCircle() {
    	//Draw the ball as a circle
        ball_x = w + w * Math.cos(angle * Math.PI / 180);   //horisontal movement (x)
        ball_y = h + h * Math.sin(angle * Math.PI / 180);	  //vertical movement (y)
        
        //The top property sets or returns the top position of a positioned element.
        ball.style.top = ball_y + 'px';
        ball.style.bottom = ball_y/2 + 'px';

        //Increase angle to move the circle 360 degrees
        angle++;
        if (angle > 192) {  //default: 360
            angle = 192;	//the angle corresponding to where the elevator is/ball stops moving
        }

        //Call function 'ballCircle' after 80 milliseconds
        setTimeout(ballCircle,50); //default: 20, higher value = slower movement
    }
*/

	//Draw the moving circle/ball
    function ballCircle(x,y) {
	    var r = 2;

	    //Draw the circle
 		context.beginPath();
	   	context.arc(x, y, r, 0, 2 * Math.PI, true);
	    context.fillStyle = 'green';
	    context.fill();
	    context.lineWidth = 2;
	    context.strokeStyle = 'green';
	    context.stroke();

	    //Change y value and call the function again
        y = y-10;
        if (y > -10) {
        	//Clear the previous circle
        	context.clearRect(x-4, y+15, 8, 9);
        	
        	//Call the function again to draw the next cirle.
        	setTimeout(function(){ 
        		ballCircle(x,y);}, 500);  

        }
    } 
	