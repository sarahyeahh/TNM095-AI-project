/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-09
 
***********************************************************************************************************/

function Group() {
	
	this.ID = -1;

	this.goal = 0; 

	this.stressed = gui.stressed;
	this.tired = gui.tired;
	this.speed = gui.speed; 
	this.waitTime = 1;
	
	this.groupSize = 0; 
	this.initialX = 60;		//intial x position
	this.initialY = 0;		//initial y position
};

/*Group.prototype.getMaxSize = function (){
	var slider3 = document.getElementById("myGroups");
	var groupsizeInput = slider3.value;
 	//console.log("Max size of group: " + groupsizeInput);

 	var output3 = document.getElementById("demo3");
	output3.innerHTML = groupsizeInput;

	//Data.prototype.splitIntoGroups(50, groupsizeInput);

 	return groupsizeInput;
};*/

Group.prototype.update = function() {
	// Update stress and tiredness
	this.stressed++;
	this.tired++;
};