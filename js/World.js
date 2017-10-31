/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-02

 	File for functions related to the whole world.

 	The file includes the functions:
 	- World
 
***********************************************************************************************************/


function World (width, height) {
	//Size of the world
	this.width = width;
	this.height = height;

	this.state = "elevator"; 
	this.BT = new BehaviorTree(this.state, gui.stress, gui.tired, gui.speed, gui.freespaces);

//	this.ourdata = new Data(); //changed from data to 'ourdata'
	//console.log(this.ourdata);

	this.ourTime = new Time();

	//Arrays
	this.allElevators = [];		//store all generated elevators
	this.allGroups = [];		//store all generated groups of people
	this.number = 1; 
	this.stairs =  new Stairs(this.number);
};
