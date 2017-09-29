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
    function Canvas(width, height, x, y, canvas, angle){
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
	function update(){
		return 0; 
	}

	function draw() {
	  //var canvas = document.getElementById('canvas');
	  	if (canvas.getContext) {

	  		drawRectangle();
	  		
	    	//window.requestAnimationFrame(draw);
			
	   /* 	window.addEventListener("keydown", function(e) {
		    switch (e.key) {
		        case 'ArrowUp':
		        	if(y<160){
			            y = y-speed;
			            y= Math.floor(y);
			            drawCircle(x, y, r); 
			           // console.log("upp " + y);
		        	}
		            break;
		        case 'ArrowDown':
		            if(y>150){
			            y = y + speed;
			            y= Math.floor(y);
			            drawCircle(x, y, r); 
			            //console.log("ner " + y);
		        	}
		            break;
		    	}
			});

			*/

			//y=150 till en början, ökar y-värdet till 160. 
			while(y<160){	

				drawCircle(x, y, r); 
				y++;
			}


		    	
		}
	}

	draw(); 

	function drawCircle(x, y, r){

		//Röd prick
	    context.beginPath();
	   	context.arc(x, y, r, 0, 2 * Math.PI, true);
	    context.fillStyle = 'red';
	    context.fill();
	    context.lineWidth = 2;
	    context.strokeStyle = 'red';
	    context.stroke();

	    // setTimeout(drawCircle,20);
		
		//console.log(y);  		

	}	

	function drawRectangle(){

		//Hissen/blå rektangel
		context.fillStyle = 'blue';
	    context.fillRect(canvas.width/2-25, 0, 50, 15);

	}

	/****************************************************
		Moving circle/ball
	****************************************************/
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

	ballCircle(); 
