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
	this.goal = 7; 
	this.index = -1

	this.visitedList = [];
	this.queue = [];
	this.sections = [];	
	
//Kallar på funktionen.
	//Vilken ordning? 

	this.init();
	this.astar = new Astar(this.start, this.goal); 
	this.calculate();

}

Move.prototype.init = function (){

	console.log("Init function"); 
	console.log("		this.size: " +  this.size); 

//Lägger till i arrayen sections hur stor griden är. 
	for (var i = 0; i < (this.size * this.size); i++) {

			this.sections.push(new Astar());
		}
	console.log("this.sections: ")
	console.log(this.sections);
	

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
				//Bra att ha console.logen för att veta måtten för gridet. 
				//console.log("counter " + counter + " " + this.sections[counter].centerX + " " +  this.sections[counter].centerY); 
				counter++

				
		}
	}
}

Move.prototype.getGridSection = function(index) {

	console.log("Getgridsection function"); 

		console.log("		getgridsection" + index);
		return this.sections[index];
}

//Ska kallas på från BehaviorTree eller People?
// Tex: this.getCurrentGridSection(nästa position)
Move.prototype.getCurrentGridSection = function (position) {

	console.log("GetCurrentGridSection function"); 
	//While getting the current grid index we update the 
	//occupations on the grid.
	
	var index = -1;
	var counter = 0;
	
	firstLoop:
	for(var y = 1; y <= this.size; y++){
		for (var x = 1; x <= this.size; x++) {
			if(position.x <= (this.width * x) && position.y <= (this.height*y)){
				index = counter;
				break firstLoop; //Hur funkar denna?
			}
			counter++;
			console.log("		Counter i getcurrentgridsection: " +counter); 
		}
	}
}

//Ändra på namnet på denna!!!
//Find the best grid. 
Move.prototype.getGridSectionsWithLeastOccupation = function() {

	console.log("GetGridSectionsWithLeastOccupation function"); 
	
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

	console.log("Calculate function"); 

	Astar.prototype.g = 0;
	//this.Astar.g = 0; //Zero from the start. 
	Astar.prototype.h = this.manhattan(this.index, this.goal);
	//this.currentGrid.h = this.manhattan(this.index, this.goal);
	//this.Astar.h = this.manhattan(locIdx, locGl);

	console.log("		current h: "+ Astar.prototype.h); 
/*	console.log("		this index: "+ this.index); 
	console.log("		this goal: "+ this.goal); */

//Räknar ut Astar här också????
	Astar.prototype.f = Astar.prototype.g + Astar.prototype.h;

	this.addToQueue(this.currentGrid); 

	console.log("		currentGrid is: " + this.currentGrid); 

	while(this.queue.length > 0 ){
		this.currentGrid = this.queue.pop(); 
		this.visitedList.push(this.currentGrid); 

		if(Astar.prototype.reachedGoal()){

			console.log("		The goal is reached.");
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
		/*console.log("		setAdjacentSections " + this.setAdjacentSections(1)); 
		console.log("		The position is in the " + this.positionCheck(81));*/
		console.log("		adjArr: " + adjArr);

		for (var i = 0; i < adjArr.length; i++) {

//TODO- Kolla upp dessa manhattananrop! 

			this.sections[adjArr[i]].h = this.manhattan(adjArr[i], this.goal);
			console.log("		adj arr h" + this.sections[adjArr[i]]);
			
			this.sections[adjArr[i]].g++;
			
			this.sections[adjArr[i]].f = this.sections[adjArr[i]].g + this.sections[adjArr[i]].h;
			
			this.addToQueue(this.sections[adjArr[i]]);
		}
	}

}

Move.prototype.addToQueue = function (thing){

	console.log("Addqueue function"); 

	var found = false;

//Kollar om man redan har undersökt platsen. 
	for (var i = 0; i < this.visitedList.length; i++) {
		if (this.visitedList[i].index == thing.index) {
			found = true;
			//console.log("		found true");
		}
		
	}

//Om man inte hittar platsen bland redan besökta. 
	if (!found) {

//Lägg till i kön. 
		this.queue.push(thing);

		console.log("		queue: " + this.queue);

		this.queue.sort(function(a, b) {

		console.log("		Sort function: " + a + "  " + b);

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

	console.log("Update function"); 
	
	this.currentGrid = currentGrid;
	this.visitedList = [];
	this.queue = [];

	//set g, f and h to 0 on all grid sections before recalculating
	for (var i = 0; i < this.sections.length; i++) {
		this.sections[i].g = 0;
		this.sections[i].h = 0;
		this.sections[i].f = 0;
	}
	
	this.calculate();
}

// find the minimum cost X for moving from one space to an adjacent space.
Move.prototype.manhattan = function(index, goal) {		

	console.log("Manhattan function"); 	

	console.log("		index: " + index + "  goal: " + goal); 
	
	var manhattan = Math.abs((index / 9) - ((goal-1) / 9)) + Math.abs((index % 9) - ((goal-1) % 9));

	console.log("		The manhattan is: " + manhattan); 
	//return manhattan;
	return manhattan; //Math.abs((index / 9) - ((goal-1) / 9)) + Math.abs((index % 9) - ((goal-1) % 9));
}

Move.prototype.positionCheck = function() {

	console.log("PositionCheck function"); 

		var i = Astar.prototype.index;
		console.log("		i in positionCheck: " + i); 
		//var i = currentGrid.index;
		var position;

//TODO - Kom på bättre namn på gridsen nedan:  

		//The position of the grids. 
		//It finds where the corner is and then decides which
		// grid that is the current one. 
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

	console.log("SetAdjacentSections function"); 

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
		else if(check == "MIDDLE") {
			/*adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 9);
			adjSections.push(this.currentGridSection.index - 9);*/

			adjSections.push(this.currentGrid + 1);
			//console.log(Astar.prototype.index);
			adjSections.push(Astar.prototype.index - 1);
			adjSections.push(Astar.prototype.index + 9);
			adjSections.push(Astar.prototype.index - 9);
			

		}
		else{
			console.log("		Error"); 
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