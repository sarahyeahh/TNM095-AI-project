/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-02

 	File for functions related to the whole world.

 	The file includes the functions:
 	- World
 
***********************************************************************************************************/


function World (width, height) {
	this.width = width;
	this.height = height;	

	this.people = new People(this.width, this.height);

	this.elevator = new Elevator(); 

	this.visualizer = new Visualizer(); 

	this.canvas = new Canvas(this.width, this.height); 

//Finns inte än
	this.stairs =  new Stairs();

	this.start(); 
};


World.prototype.start = function() {
	
	
};

