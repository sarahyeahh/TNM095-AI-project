/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-29

 	File with functions related to the movement for the people. 
 	Uses Astar.js.

 	The file includes the functions:


***********************************************************************************************************/

//Kombination av Grid.js/Pathfinding.js/Gridsection.js
function Move (gridSize, width, height){
	this.currentGrid = currentGrid; //From People.js
	this.grid = grid;
	this.visitedList = [];
	this.queue = [];
	this.goal = goal;
	this.calculate();
	
	this.size = gridSize; 
	this.width = width;
	this.height = height;
	this.sections = [];
	this.init();
}

Move.prototype.init = function (){

	console.log("This size" +  this.size); 

	for (var i = 0; i < this.size * this.size; i++) {
			this.sections.push(new Astar());
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

Move.prototype.getGridSection = function(index) {
		return this.sections[index];
}


Move.prototype.getCurrentGridSection = function (position) {
	//While getting the current grid index we update the 
	//occupations on the grid.
	var index = -1;
	var counter = 0;
	firstLoop:
	for(var y = 1; y <= this.size; y++){
		for (var x = 1; x <= this.size; x++) {
			if(position.x <= (this.width * x) && position.y <= (this.height*y)){
				index = counter;
				break firstLoop;
			}
			counter++;
		}
	}
}
		 
// currentGrid ska implementeras i People.
//Calculate the Astar?
Move.prototype.calculate = function(){
	this.currentGrid.g = 0; //Zero from the start. 
	this.currentGrid.h = this.manhattan(this.currentGrid.index, this.goalIndex);
	this.currentGrid.f = this.currentGrid.g + this.currentGrid.h;

	this.addToQueue(this.currentGrid); 

	while(this.queue.length > 0 ){
		this.currentGrid = this.queue.pop(); 
		this.visitedList.push(this.currentGrid); 

		if(this.Astar.reachedGoal()){

			console.log("The goal is reached.");
			return; 
		}

//Kollar närliggande positioner som man kan flytta till i gridet. 
//Har dock inte implementerat grid än. 
		var adjArr = []; //Adjacent - närliggande
		var adjArr = this.setAdjacentSections(this.positionCheck());
		for (var i = 0; i < adjArr.length; i++) {
			this.grid.sections[adjArr[i]].h = this.manhattan(adjArr[i], this.goal);
			this.grid.sections[adjArr[i]].g++;
			this.grid.sections[adjArr[i]].f = this.grid.sections[adjArr[i]].g + this.grid.sections[adjArr[i]].h;
			this.addToQueue(this.grid.sections[adjArr[i]]);
		}
	}

}

Move.prototype.addToQueue = function (thing){

	var found = false;

//Kollar om man redan har undersökt platsen. 
	for (var i = 0; i < this.visitedList.length; i++) {
		if (this.visitedList[i].index == thing.index) {
			found = true;
		}
	}

//Om man inte hittar platsen bland redan besökta. 
	if (!found) {

//Lägg till i kön. 
		this.queue.push(thing);

		this.queue.sort(function(a, b) {

		//Kollar skillnaden mellan tidigare och nuvarande state. 
			if (a.f < b.f)
	    		return 1;
	  		if (a.f > b.f)
	    		return -1;
	  		return 0;
		});
	}
}

Move.prototype.update = function(currentGrid) {
	this.currentGrid = currentGrid;
	this.visitedList = [];
	this.queue = [];
	//set g, f and h to 0 on all grid sections before recalculating
	for (var i = 0; i < this.grid.sections.length; i++) {
		this.grid.sections[i].g = 0;
		this.grid.sections[i].h = 0;
		this.grid.sections[i].f = 0;
	}
	this.calculate();
}


/*NOT USED YET

Move.prototype.heuristic = function(start, goal){

	var heuristic = 0;
	
	for(var i = 0; i < 9; i++){
		if (array[i] != 0)			
			heuristic += manhattan(i, array[i]);
	}
		
	return heuristic;
}

Move.prototype.hamming = function(map){

	var sum = 0;

	for(var i=0; i<board.length; i++) {  	    	  
	  	  var temp = board[i]; 	
	   	  if(temp != 0) { 
	   		  if(temp != i+1) // wrong value at index i
	   			  sum++;
	   	  }
	}

	return sum;
}*/

// find the minimum cost X for moving from one space to an adjacent space.
Move.prototype.manhattan = function(index, goal) {			
	//var manhattan = Math.abs((index / 9) - ((goal-1) / 9)) + Math.abs((index % 9) - ((goal-1) % 9));

	//console.log("Manhattan: " + manhattan); 
	//return manhattan;
	return Math.abs((index / 9) - ((goal-1) / 9)) + Math.abs((index % 9) - ((goal-1) % 9));
}


//Cases, move right or left. 
//Movement should depend on the decision tree whether the group choose the elevator or the stairs. 

/*
//Not done yet!
var Move = {

	moveForward: function(movable) {
		switch(movable.angle) {
		    case 0:
		        movable.x++;
		        break;
		    case 1:
		        movable.x++;
		        movable.y++;
		        break;
		}
	},

	moveLeft: function(movable) {
		movable.angle--;
		if (movable.angle < 0)
			movable.angle = 7;
		return;
	},

	moveRight: function(movable) {
		movable.angle++;
		if (movable.angle > 7)
			movable.angle = 0;
		return;
	},

}*/