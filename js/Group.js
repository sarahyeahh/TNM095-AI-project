/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-09
 
***********************************************************************************************************/

function Group() {
	
	this.ID = -1;
	this.goal = 0; 
	this.stress = gui.stress;
	this.tired = gui.tired;
	this.speed = gui.speed;  
	this.waitTime = 1;
	this.groupSize = 0; 
	this.initialX = 2.5;	//intial x position
	this.initialY = 0;		//initial y position
};

Group.prototype.update = function() {
	// Update stress and tiredness
	this.stressed++;
	this.tired++;
};

