/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-02

 	File for functions related to the whole world.

 	The file includes the functions:
 	- World
 
***********************************************************************************************************/


function World (width, height) {
//Constructors for eg. Canvas
	this.width = width;
	this.height = height;	
	this.elevator = new Elevator(); 

//Constructors for the People
	this.people = new People();

	this.visualizer = new Visualizer(); 

	this.canvas = new Canvas(this.width, this.height); 

//Constructors till Astar, Move och Canvas. 
 	this.gridSize = 9; 
 	this.grid = new Move(this.gridSize, this.width, this.height);

//Finns inte än
	this.Stairs = []; 

};

