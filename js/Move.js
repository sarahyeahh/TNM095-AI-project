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

	this.console = false; //Sätt till true om den ska visa console.logs. 

	this.visitedList = [];
	this.queue = [];
	this.sections = [];	
	
	this.width = 2*width; //The canvas. 
	this.height = 2*height;

	this.gridWidth = 9; //Number of grids wide. 
	 
//TODO: Goal och start ska bestämmas någon annanstans!
	this.start = 0;
	this.goal = 2; 

	this.index = 0; 

	this.position = {
			    x: x,
			    y: y
			};

	this.init();

	this.currentGrid = this.getCurrentGridSection(this.position);
	
	if(this.console){
		console.log("Start: " + this.start + " Goal: " + this.goal); 
	}
	
	this.astar = new Astar(this.start, this.goal); 
	this.calculate();
}

Move.prototype.init = function (){


	if(this.console){
		console.log("Init function"); 
		console.log("		this.gridWidth: " +  this.gridWidth); 
	}
	

	//Lägger till i arrayen sections hur stor griden är. 
	for (var i = 0; i < (this.gridWidth * this.gridWidth); i++) {
			this.sections.push(new Astar());
		}


	if(this.console){
		console.log("this.sections: ");
		console.log(this.sections);
	}

//Räknar ut vad hörnen är i griden i förhållande till canvas width och height.
	var counter = 0;
	for(var y = 1; y <= this.gridWidth; y++){
		for (var x = 1; x <= this.gridWidth; x++) {

				// Calculate where the xy values in the grid for index. 
				this.sections[counter].centerX = Math.floor((this.width*x)/600);
				this.sections[counter].centerY =  Math.floor((this.width*y)/600);
				this.sections[counter].index = counter;
				//Bra att ha console.logen för att veta måtten för gridet. 
				//console.log("counter " + counter + " " + this.sections[counter].centerX + " " +  this.sections[counter].centerY); 
				counter++				
		}
	}
}

Move.prototype.getGridSection = function(index) {
	
	if(this.console){
		console.log("Getgridsection function"); 
		console.log("		getgridsection" + index);
	}

	return this.sections[index];
}

Move.prototype.getCurrentGridSection = function (position) {
	
	if(this.console){
		console.log("GetCurrentGridSection function"); 
	}

	var index = -1;
	var counter = 0;

	//Sätter in index: 
	firstLoop:
	for(var y = 1; y <= this.gridWidth; y++){
		for (var x = 1; x <= this.gridWidth; x++) {

			if(position.x <= (this.width * x) && position.y <= (this.height*y)){
				index = counter;
				break firstLoop; 
			}
			counter++;
		}
	}

	return this.sections[index];
}

//Ändra på namnet på denna!!!
//Find the best grid. 
Move.prototype.getGridSectionsWithLeastOccupation = function() {

	if(this.console){
		console.log("GetGridSectionsWithLeastOccupation function"); 
	}

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

	if(this.console){
		console.log("Calculate function");
		console.log(this.currentGrid);  
	}
	
	this.currentGrid.g = 0;
	this.currentGrid.h = this.manhattan(this.index, this.goal);

	//Calculates the A*star
	this.currentGrid.f = this.currentGrid.g + this.currentGrid.h;

	if(this.console){
		console.log("		Moves left: "+ this.currentGrid.h); 
		console.log("F" +  this.currentGrid.f + " = G" + this.currentGrid.g + " + H" + this.currentGrid.h );
	}

	this.addToQueue(this.currentGrid); 


	//queue = openList
	//currentGrid = node; 
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
	
	if(this.console){
		console.log("Addqueue function"); 
	}

	var found = false;

	//Kollar om man redan har undersökt platsen. Går inte in här än eftersom den inte visitat än.
	for (var i = 0; i < this.visitedList.length; i++) {
		
		if (this.visitedList[i].index == thing.index) {
			found = true;
			console.log("		The index " + thing.index +" has already been visited.");
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

	if(this.console){
		console.log("Update function"); 
	}
	
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

	if(this.console){
		console.log("Manhattan function"); 	
		console.log("		index: " + index + "  goal: " + goal); 
	}

	var manhattan = Math.abs(Math.floor(index / 9) - Math.floor(goal / 9)) + Math.abs(index % 9 - goal % 9);
	
	console.log("		The manhattan distance is: " + manhattan); 

	return manhattan; 
}

Move.prototype.positionCheck = function() {
		
	if(this.console){
		console.log("PositionCheck function"); 
	}

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

	var position;

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

	if(this.console){
		console.log("SetAdjacentSections function"); 
		console.log("		check: " + check); 
		console.log(this.currentGrid);
	}

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

	return adjSections;
}



