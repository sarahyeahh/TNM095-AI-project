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

//Nya saker som ska implementeras för första gången 
	this.isEmpty = true; 
	this.freeSpaces = 0; //som en count
	this.group = 0; 
	this.capacity = 0; 
	this.elevatorPeople = 0; 
	this.elevatorID = -1;
	this.allElevators = [];

//Constructors for the People
	this.people = new People();

//Constructors till Astar, Move och Canvas. 
 	this.gridSize = 9; 
 	this.grid = new Move(this.gridSize, this.width, this.height);

//Finns inte än
	this.Stairs = []; 

};

