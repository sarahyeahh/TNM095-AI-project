/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for functions related to the canvas.

***********************************************************************************************************/
	var context = canvas.getContext('2d');

	
	function draw() {
	  //var canvas = document.getElementById('canvas');
	  	if (canvas.getContext) {
	  		
		    var x = canvas.width/2;
		    var y = canvas.height;
		    var r = 10;
		    var speed = 3;

	    	//window.requestAnimationFrame(draw);

	    	window.addEventListener("keydown", function(e) {
		    switch (e.key) {
		        case 'ArrowUp':
		            if (y > r) y -= speed;
		            console.log("upp");
		            break;
		        case 'ArrowDown':
		            if (y < canvas.height) y += speed;
		            console.log("ner");
		            break;
		        case 'ArrowLeft':
		            if (x > r) x -= speed;
		            console.log("vänster");
		            break;
		        case 'ArrowRight':
		            if (x < canvas.width/2) x += speed;
		            console.log("höger");
		            break;
		    	}
			});

			drawRectangle();

			//y=150 till en början, ökar y-värdet till 160. 
			while(y<160){	
				drawCircle(x, y, r); 
				y++;
			}
		    	
		}
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
		
		//console.log(y);  		

	}	

	function drawRectangle(){

		//Hissen/blå rektangel
		context.fillStyle = 'blue';
	    context.fillRect(canvas.width/2-25, 0, 50, 15);

	}

	function createCanvas(width, height) {

		this.player.addListeners();

	} 

	/****************************************************
		Moving circle/ball
	****************************************************/
	var element = document.getElementById('ball');
    var angle = 0;
	var x = canvas.width/2;
	var y = canvas.height;
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
