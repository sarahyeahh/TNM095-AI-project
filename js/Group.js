/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-09
 
***********************************************************************************************************/

function Group() {
	this.stressed = 1;
	this.tired = 1;
	//this.waitTime = 1;
	//this.speed = 2; 
	this.ID = -1;
	this.groupSize = People.prototype.generatePeople();
}

Group.prototype.getMaxSize = function (){
	var slider3 = document.getElementById("myGroups");
	var groupsizeInput = slider3.value;
 	console.log("Max size of group: " + groupsizeInput);

 	var output3 = document.getElementById("demo3");
	output3.innerHTML = groupsizeInput;

 	return groupsizeInput;
}