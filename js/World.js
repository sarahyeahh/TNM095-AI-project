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

	this.groups = [];

//Nya saker som ska implementeras för första gången 
	this.isEmpty = true; 
	this.freeSpaces = 0; //som en count
	this.group = 0; 
	this.capacity = 0; 
	this.elevatorPeople = 0; 
	this.elevatorID = -1;
	this.allElevators = [];

//Finns inte än
	this.Stairs = []; 

	//this.grid(map); //Någon slags funktion som implementar grid. Eller är det Canvas? 


};

//*********************OBS INGEN NEDAN ANVÄNDS!!*******************************************************

//Exempel på hur man kan generera grids. OBS Används ej!
/*World.prototype.grid = function(map) {
	//Convencience vars
	var cx = this.width/2;
	var cy = this.height/2;
	var w = this.width;
	var h = this.height;

	var canvas = document.createElement('canvas');
	canvas.width = foodMap.width;
	canvas.height = foodMap.height;
	var mapCtx = canvas.getContext('2d');


	// Create ref to this in current scope for passing to closures
	var thisWorld = this;

	this.food = Utils.createGrid(w, h, function (i,j){
		if(map){
	
			
		}
		return 0;
	});

	this.obstacles = Utils.createGrid(w, h, false);
};*/

World.prototype.initGrid = function() {
		for (var i = 0; i < this.width * this.height; i++) {
			
		}

		var counter = 0;
		for(var y = 1; y <= this.size; y++){
			for (var x = 1; x <= this.size; x++) {
					// Calculate center positions for grid 0-8
					this.sections[counter].centerX = (this.width*x) / 2;
					this.sections[counter].centerY = (this.height*y) / 2;
					this.sections[counter].index = counter;
					counter++
			}
		}
	}