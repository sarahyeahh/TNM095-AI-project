/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-29

 	File with functions related to the movement for the people. 
 	Uses Astar.js.

 	The file includes the functions:


***********************************************************************************************************/

//Kombination av Grid.js/Pathfinding.js/Gridsection.js
function Move(x, y, current, width, height){
	//ANVÄNDS EJ
	this.currentSection = current; //From People.js, Number between 0-8 (9st grids)

	this.visitedList = [];
	this.queue = [];
	this.sections = [];	
	
	this.width = width;
	this.height = height;

	this.size = 9; 
	this.start = 0; 
	this.goal = 5; 
	this.index = 0; 
	


	this.position = {
			    x: x,
			    y: y
			};

	this.init();

	this.currentGrid = this.getCurrentGridSection(this.position);
	//console.log(this.currentGrid.centerY); 
	
	console.log("Start: " + this.start + " Goal: " + this.goal); 
	
	//Kallar på funktionen.
	//Vilken ordning? 
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
	console.log("this.sections: ");
	console.log(this.sections);

//TODO
//Vill man ha kvar samma mått eller vill man ändra till koordinat?
//Räknar ut vad hörnen är i griden i förhållande till canvas width och height. 
	var counter = 0;
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

	//Sätter in index: 
	firstLoop:
	for(var y = 1; y <= this.size; y++){
		for (var x = 1; x <= this.size; x++) {

			if(position.x <= (this.width * x) && position.y <= (this.height*y)){
				index = counter;
		
				break firstLoop; //Hur funkar denna?
				//break; 
			}
			counter++;
		}
	}

	return this.sections[index];
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

	console.log(this.currentGrid);  
	
	this.currentGrid.g = 0;
	this.currentGrid.h = this.manhattan(this.index, this.goal);

	console.log("		Moves left: "+ this.currentGrid.h); 

	//Calculates the A*star
	this.currentGrid.f = this.currentGrid.g + this.currentGrid.h;

	console.log("F" +  this.currentGrid.f + " = G" + this.currentGrid.g + " + H" + this.currentGrid.h );

	this.addToQueue(this.currentGrid); 

	console.log("		queue length: " + this.queue.length); 

	//queue = openList
	//currentGrid = node; 
	//

	while(this.queue.length > 0 ){
		
		//pop() removes the last element from an array and returns that element. 
		//This method changes the length of the array.
		this.currentGrid = this.queue.pop();  
		//Adds to the visited list. 
		this.visitedList.push(this.currentGrid); 
		//console.log(this.visitedList);

		// Astar.prototype.reachedGoal() returns true or false. 
		if(this.currentGrid.reachedGoal()){
			console.log("		The goal is reached!");
			return; 
		}

		//Adjacent - närliggande
		//Kollar närliggande positioner som man kan flytta till i gridet. 
		//Har dock inte implementerat grid än. 
		var adjArr = []; 

		//Kollar vilka 3-4 värden i arrayen som är lediga. 
	/*	 --- --- ---
		|   | L |   |
		 --- --- --- 
		| L | X | L |
		 --- --- --- 
		|   | L |   |
		 --- --- --- */

		// setAdjacentSections = getNeighbors
		var adjArr = this.setAdjacentSections(this.positionCheck());		
		console.log(adjArr);
		
		//adjArr = neighbors
		for (var i = 0; i < adjArr.length; i++) {
			//console.log(this.sections[i]);
			//console.log(adjArr[i]);
			
			this.sections[adjArr[i]].h = this.manhattan(adjArr[i], this.goal);

			//console.log(this.sections[adjArr[i]].h);
			
			//Increase the g-value, aka moves done. 
			this.sections[adjArr[i]].g++;

			//Använder sig av A*star funktionen. 
			this.sections[adjArr[i]].f = this.sections[adjArr[i]].g + this.sections[adjArr[i]].h;
			//console.log(this.sections[i]);
			//console.log(adjArr[i]);

			//Lägger till nya sections i queue.
			this.addToQueue(this.sections[adjArr[i]]);
		}
	}

}

Move.prototype.addToQueue = function (thing){

	console.log("Addqueue function"); 
	//console.log("		visited list length: " + this.visitedList.length); 
	//console.log(this.visitedList); //undefined
	//console.log(thing); 
	//console.log(thing.index);

	var found = false;

	//Kollar om man redan har undersökt platsen. Går inte in här än eftersom den inte visitat än.
	for (var i = 0; i < this.visitedList.length; i++) {
		
		//if (this.visitedList[i].index == thing.index) {
		if (this.visitedList[i].index == thing.index) {
			found = true;
			console.log("		found true");
		}
		else{
				//Continue
		}
		
		
	}

	//Om man inte hittar platsen bland redan besökta. 
	if (!found) {

		//Lägg till i kön. 
		this.queue.push(thing);

//Sorterar queue så att den med högst fscore hamnar längst ner. 
// a och b är två stycken Objekt i griden. 
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

	var manhattan = Math.abs(Math.floor(index / 9) - Math.floor(goal / 9)) + Math.abs(index % 9 - goal % 9);
	//Math.floor(Math.abs((index / 9) - ((goal-1) / 9))) + Math.abs((index % 9) - ((goal-1) % 9));

	console.log("		The manhattan distance is: " + manhattan); 

	return manhattan; 
}

Move.prototype.positionCheck = function() {

		console.log("PositionCheck function"); 
		
		//Gets the index-number of the current grid and checks which position it has.
		var i = this.currentGrid.index;  

		//TOP LEFT = TL
		// MIDDLE = M
		//DOWN RIGHT = DR
	/*   --- --- ---
		| TL| TM| TR|
		 --- --- --- 
		| ML| M | MR|
		 --- --- --- 
		| DL| DM | DR|
		 --- --- --- */

		 //OBS variablerna för ML OCH MR kan vara tvärtom!!!

		//console.log(i); 
	
		var position;

//TODO - Kom på bättre namn på gridsen nedan:  

		//The position of the grids. 
		//It finds where the corner is and then decides which
		// grid that is the current one. 
		if (i == 0) {
			position = "TL";
			console.log("		Position: " + position);
		}
		else if (i == 8) {
			position = "TR";
			console.log("		Position: " + position);
		}
		else if (i == 72) {
			position = "DL";
			console.log("		Position: " + position);
		}
		else if (i == 80) {
			position = "DR";
			console.log("		Position: " + position);
		}
		else if (i > 0 && i < 8) {
			position = "TM";
			console.log("		Position: " + position);
		}
		else if (i > 72 && i < 81) {
			position = "DM";
			console.log("		Position: " + position);
		}
		else if(i % 9 == 0 && i != 72 && i != 0) {
			position = "ML";
			console.log("		Position: " + position);
		}
		else if(i % 9 == 8 && i != 8 && i != 81) {
			position = "MR";
			console.log("		Position: " + position);
		}
		else {
			position = "M";
			console.log("		Position: " + position);
		}
	
		return position;
	}
	

Move.prototype.setAdjacentSections = function(check) {

	console.log("SetAdjacentSections function"); 
	console.log("		check: " + check); 

	//console.log(this.currentGrid);

		var adjSections = [];

		//3 möjliga alternativ.
		if (check == "TM") {
			adjSections.push(this.currentGrid.index + 1);
			adjSections.push(this.currentGrid.index - 1);
			adjSections.push(this.currentGrid.index + 9);

		}
		else if (check == "DM") {
			adjSections.push(this.currentGrid.index + 1);
			adjSections.push(this.currentGrid.index - 1);
			adjSections.push(this.currentGrid.index - 9);
		}
		else if (check == "TR") {
			adjSections.push(this.currentGrid.index - 1);
			adjSections.push(this.currentGrid.index + 9);
		}
		else if (check == "TL") {
			adjSections.push(this.currentGrid.index + 1);
			adjSections.push(this.currentGrid.index + 9);
		}
		else if (check == "DL") {
			adjSections.push(this.currentGrid.index + 1);
			adjSections.push(this.currentGrid.index - 9);
		}
		else if (check == "DR") {
			adjSections.push(this.currentGrid.index - 1);
			adjSections.push(this.currentGrid.index - 9);
		}
		else if(check == "ML") {
			adjSections.push(this.currentGrid.index + 1);
			adjSections.push(this.currentGrid.index - 9);
			adjSections.push(this.currentGrid.index + 9);
		}
		else if(check == "MR") {
			adjSections.push(this.currentGrid.index - 1);
			adjSections.push(this.currentGrid.index - 9);
			adjSections.push(this.currentGrid.index + 9);
		}
		// middle
		else if(check == "M") {
			//Fyra möjliga alternativ!
			adjSections.push(this.currentGrid.index + 1);
			adjSections.push(this.currentGrid.index - 1);
			adjSections.push(this.currentGrid.index + 9);
			adjSections.push(this.currentGrid.index - 9);
		}
		else{
			console.log("		Error"); 
		}

		//console.log(adjSections);
		return adjSections;

	}


/*Move.prototype.newPos = function (){

	if(this.currentGrid.index != this.getCurrentGridSection(this.position).index) {
	   	console.log("newpos");
	   	this.update( this.getCurrentGridSection(this.position) );
	   	this.path = this.visitedList;
	}

	this.currentGrid = this.getCurrentGridSection(this.position);
	var goal = [9,9];
	// if new behavior
	if (goal != -1) {
		console.log("new behavior");
		this.goal = goal;
		this.update(this.currentGrid);
		this.path = this.visitedList;
	}


		if (this.path.length == 0) {
	   	   		
	   			console.log("REACHED GOAL");
	   	   	}
	   	// if part of pathfinding done
	   	else if (this.currentGrid.index == this.path[0].index) {
	   		this.path.shift();
	   		console.log("PART GOAL");
	   	}
	   	// if moving to new index
	
	 
	   	this.position.x += this.speed ;
	   	this.position.y -= this.speed ;

	   	this.update();
}
*/


