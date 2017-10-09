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

	//Call functions
	this.people = new People(this.width, this.height);
	this.elevator = new Elevator(); 
	this.visualizer = new Visualizer(); 
	this.canvas = new Canvas(this.width, this.height); 

	//Arrays
	this.allElevators = [];		//store all generated elevators
	this.allGroups = [];		//store all generated groups of people

//Finns inte än
	this.stairs =  new Stairs();

	this.start(); 
};


World.prototype.start = function() {
	
	
};

