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

	function getSpeed(speedValue){
		speed = speedValue;
		console.log("Speed: " +  speed);
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
	var element = document.getElementById('ball');
    var angle = 0;
	//var x = canvas.width/2;
	//var y = canvas.height;
    var w = 1;
    var h = canvas.height/2;

    function ballCircle() {
        x = w + w * Math.cos(angle * Math.PI / 180);
        y = h + h * Math.sin(angle * Math.PI / 180);
        
        ball.style.left = x + 'px';
        ball.style.top = y + 'px';

        angle++;
        if (angle > 360) {
            angle = 0;
        }
        setTimeout(ballCircle,20);
    }

	ballCircle(); 
