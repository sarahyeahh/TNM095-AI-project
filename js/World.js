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

	console.log("in World, error in this.people");	

	//Call functions
	this.people = new People(this.width, this.height);
	this.elevator = new Elevator(); 
	this.visualizer = new Visualizer(); 
	this.canvas = new Canvas(this.width, this.height); 

	//Arrays
	this.allElevators = [];		//store all generated elevators
	this.allGroups = [];		//store all generated groups of people

	//Create variable 'elevator'
	var elevator = {
		elevatorID: -1, 
	   	capacity: 6,
	  	freeSpaces: 6,
	   	activated: false,
	   	positionX: 0,
	   	positionY: 0,
	    elevatorPeople: 0,
	};

	//push an elevator into array. (world, posX, posY, elevator)
	this.allElevators.push(new Elevator(this, 0, 0, elevator));
	console.log("allElevators in world: " + allElevators);


//Finns inte än
	this.stairs =  new Stairs();

	this.start(); 
};


World.prototype.start = function() {
	
	
};

