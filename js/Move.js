/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-29

 	File with functions related to the movement for the people. 
 	Uses Astar.js.

 	The file includes the functions:


***********************************************************************************************************/

//Kombination av Grid.js/Pathfinding.js/Gridsection.js
function Move(current, width, height){
	
	this.currentGrid = current; //From People.js
	this.width = width;
	this.height = height;

	this.size = 5; 
	this.start = 0; 
	this.goal = 5; 
	this.index = -1

	this.visitedList = [];
	this.queue = [];
	this.sections = [];	
	
//Kallar på funktionen.
	this.calculate();
	this.init();

	this.astar = new Astar(this.start, this.goal); 
}

Move.prototype.init = function (){

	console.log("This size " +  this.size); 

//Lägger till i arrayen sections hur stor griden är. 
	for (var i = 0; i < (this.size * this.size); i++) {
			//console.log(this.sections.push(new Astar()));
			this.sections.push(new Astar());
			console.log("forloop i "); 
		}

	var counter = 0;

//TODO
//Vill man ha kvar samma mått eller vill man ändra till koordinat?
//Räknar ut vad hörnen är i griden i förhållande till canvas width och height. 
	for(var y = 1; y <= this.size; y++){
		for (var x = 1; x <= this.size; x++) {
				// Calculate center positions for grid 0-8 in the canvas. 
				this.sections[counter].centerX = (this.width*x) / 2;
				this.sections[counter].centerY = (this.height*y) / 2;
				this.sections[counter].index = counter;
				//console.log("counter " + counter + " " + this.sections[counter].centerX + " " +  this.sections[counter].centerY); 
				counter++

				console.log("for x y");
		}
	}
}

Move.prototype.getGridSection = function(index) {

	console.log("getgridsection function"); 

		console.log("		getgridsection" + index);
		return this.sections[index];
}


Move.prototype.getCurrentGridSection = function (position) {

	console.log("getCurrentGridSection function"); 
	//While getting the current grid index we update the 
	//occupations on the grid.
	
	//var index = -1;
	var counter = 0;
	
	firstLoop:
	for(var y = 1; y <= this.size; y++){
		for (var x = 1; x <= this.size; x++) {
			if(position.x <= (this.width * x) && position.y <= (this.height*y)){
				index = counter;
				break firstLoop; //Hur funkar denna?
			}
			counter++;
			console.log("Counter i getcurrentgridsection: " +counter); 
		}
	}
}

//Ändra på namnet på denna!!!
//Find the best grid. 
Move.prototype.getGridSectionsWithLeastOccupation = function() {

	console.log("getGridSectionsWithLeastOccupation function"); 
	
	var leastOccupiedGrid = this.sections[0];
	var leastOccupiedArray = [];
	var better = false;

	for (var i = 1; i < this.sections.length; i++){
		if(this.sections[i].occupation <= leastOccupiedGrid.occupation) {
			leastOccupiedArray.push(this.sections[i]);
			leastOccupiedGrid = this.sections[i];
			better = true;
		}
	}
	if (!better)
		leastOccupiedArray.push(leastOccupiedGrid);
	
	return leastOccupiedArray;
}
		 
// currentGrid ska implementeras i People.
//Calculate the Astar?
Move.prototype.calculate = function(){

	//console.log("calculate function"); 

	this.currentGrid.g = 0; //Zero from the start. 
	this.currentGrid.h = this.manhattan(this.index, this.goal);

	/*console.log("		current h    "+ this.currentGrid.h); 
	console.log("		current h    "+ this.index); 
	console.log("		current h    "+ this.goal); */

	this.currentGrid.f = this.currentGrid.g + this.currentGrid.h;

	this.addToQueue(this.currentGrid); 

	while(this.queue.length > 0 ){
		this.currentGrid = this.queue.pop(); 
		this.visitedList.push(this.currentGrid); 

		if(Astar.prototype.reachedGoal()){

			//console.log("		The goal is reached.");
			return; 
		}

		this.currentGrid = this.queue.pop();
				this.visitedList.push(this.currentGrid);
				if (Astar.prototype.reachedGoal()) {
					return;
				}

//Kollar närliggande positioner som man kan flytta till i gridet. 
//Har dock inte implementerat grid än. 
		var adjArr = []; //Adjacent - närliggande
		var adjArr = this.setAdjacentSections(this.positionCheck());
		for (var i = 0; i < adjArr.length; i++) {

			//console.log("		adj arr manhattan " + this.manhattan(adjArr[i] + "goal " + this.goal));
			this.sections[adjArr[i]].h = this.manhattan(adjArr[i], this.goal);
			this.sections[adjArr[i]].g++;
			this.sections[adjArr[i]].f = this.sections[adjArr[i]].g + this.sections[adjArr[i]].h;
			this.addToQueue(this.sections[adjArr[i]]);
		}
	}

}

Move.prototype.addToQueue = function (thing){

	//console.log("addqueue function"); 

	var found = false;

//Kollar om man redan har undersökt platsen. 
	for (var i = 0; i < this.visitedList.length; i++) {
		if (this.visitedList[i].index == thing.index) {
			found = true;
		//	console.log("		found true");
		}
	//	console.log("		found false");
	}

//Om man inte hittar platsen bland redan besökta. 
	if (!found) {

	//	console.log("		found false");

//Lägg till i kön. 
		this.queue.push(thing);

	//	console.log(this.queue);

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

	//console.log("update function"); 
	
	this.currentGrid = currentGrid;
	this.visitedList = [];
	this.queue = [];

	//set g, f and h to 0 on all grid sections before recalculating
	for (var i = 0; i < this.sections.length; i++) {
		this.sections[i].g = 0;
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

	//console.log("manhattan function"); 	

	//console.log("		index: " + index + "  goal: " + goal); 
	
	var manhattan = Math.abs((index / 9) - ((goal-1) / 9)) + Math.abs((index % 9) - ((goal-1) % 9));

	//console.log("The manhattan is: " + manhattan); 
	//return manhattan;
	return Math.abs((index / 9) - ((goal-1) / 9)) + Math.abs((index % 9) - ((goal-1) % 9));
}

Move.prototype.positionCheck = function() {
		var i = Astar.prototype.index;
		//var i = currentGrid.index;
		var position;

		// corners
		if (i == 0) {
			position = "TOP_LEFT_CORNER";
		}
		else if (i == 8) {
			position = "TOP_RIGHT_CORNER";
		}
		else if (i == 72) {
			position = "BOTTOM_LEFT_CORNER";
		}
		else if (i == 81) {
			position = "BOTTOM_RIGHT_CORNER";
		}
		else if (i > 0 && i < 8) {
			position = "FIRST_ROW_NO_CORNERS";
		}
		else if (i > 72 && i < 81) {
			position = "LAST_ROW_NO_CORNERS";
		}
		else if(i % 9 == 0 && i != 72 && i != 0) {
			position = "FIRST_COLUMN_NO_CORNERS";
		}
		else if(i % 9 == 8 && i != 8 && i != 81) {
			position = "LAST_COLUMN_NO_CORNERS";
		}
		else {
			position = "MIDDLE";
		}
	
		return position;
	}
	

Move.prototype.setAdjacentSections = function(check) {
		var adjSections = [];
		if (check == "FIRST_ROW_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if (check == "LAST_ROW_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 9);
		}
		else if (check == "TOP_RIGHT_CORNER") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if (check == "TOP_LEFT_CORNER") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if (check == "BOTTOM_LEFT_CORNER") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 9);
		}
		else if (check == "BOTTOM_RIGHT_CORNER") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 9);
		}
		else if(check == "FIRST_COLUMN_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 9);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if(check == "LAST_COLUMN_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 9);
			adjSections.push(this.currentGridSection.index + 9);
		}
		// middle
		else {
			/*adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 9);
			adjSections.push(this.currentGridSection.index - 9);*/

			adjSections.push(Astar.prototype.index + 1);
			adjSections.push(Astar.prototype.index - 1);
			adjSections.push(Astar.prototype.index + 9);
			adjSections.push(Astar.prototype.index - 9);
			

		}
		return adjSections;

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