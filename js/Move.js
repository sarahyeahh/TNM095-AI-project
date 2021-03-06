/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-29

 	File with functions related to the movement for the people. 
 	Uses Astar.js.

 	The file includes the functions:
 	- Move()
 	- init()
 	- getGridSection()
 	- getCurrentGridSection()
 	- getSmallestFValue()
 	- calculate()
 	- addToQueue()
 	- update()
 	- manhattan()
 	- positionCheck()
 	- setAdjacentSections()

***********************************************************************************************************/

function Move(start, goal, x, y,  width, height){
	
	this.start = start; 
	this.goal = goal; 

	this.print = false; //Sätt till true om den ska visa console.logs. 

	this.visitedList = [];
	this.queue = [];
	this.sections = [];	
	
	this.width = width; //The canvas. 
	this.height =height;

	this.gridWidth = 9; //Number of grids wide. 
	this.index = this.start; 

	this.position = {
			    x: x,
			    y: y
	};

	init(); 

	this.currentGrid = getCurrentGridSection(this.position);
	
	if(this.print){
		console.log(this.position); 
		console.log("Start: " + this.start + " Goal: " + this.goal); 
	}

	this.astar = new Astar(this.start, this.goal); 
	this.calculate();
}


//Move.prototype.init = function (){
function init(){

	//Lägger till i arrayen sections hur stor griden är. 
	for (var i = 0; i < (this.gridWidth * this.gridWidth); i++) {
			this.sections.push(new Astar());
		}

	if(this.print){
		console.log("Init function"); 
		//console.log(this.sections);
	}

//Räknar ut vad hörnen är i griden i förhållande till canvas width och height.
	var counter = 0;
	for(var y = 1; y <= this.gridWidth; y++){ 
		for (var x = 1; x <= this.gridWidth; x++) {
			// Calculate where the xy values in the grid for index. 
			this.sections[counter].centerX = Math.floor((this.width*x)/300);
			this.sections[counter].centerY =  Math.floor((this.width*y)/300);
			this.sections[counter].index = counter;
			//console.log("counter " + counter + " " + this.sections[counter].centerX + " " +  this.sections[counter].centerY); 
			counter++;				
		}
	}
}

//Används ej?
Move.prototype.getGridSection = function(index) {
	
	if(this.print){
		console.log("Getgridsection function"); 
		console.log("		getgridsection" + index);
	}

	return this.sections[index];
}

//Move.prototype.getCurrentGridSection = function (position) {
function getCurrentGridSection(position){
	
	if(this.print){
		console.log("GetCurrentGridSection function"); 
	}

	index = this.start; //Will always be the same. 

	//var index = -1;

	//var counter = 0;
 
	//Sätter in index: 
	/*firstLoop:
	for(var y = 1; y <= this.gridWidth; y++){

		for (var x = 1; x <= this.gridWidth; x++) {
			
			//console.log("if " + position.x + " <= " + this.height)
			//console.log("if " + position.y + " <= " + this.height*y)

			if(position.x <= (this.width * x) && position.y <= (this.height*y)){
				index = 6;//counter;
				break firstLoop; 
			}
			counter++;
			console.log(counter); 
		}
	}*/

	return this.sections[index];
}

//Find the best grid. 
//Move.prototype.getSmallestFValue = function() {
function getSmallestFValue() {

	if(this.print){
		console.log("getSmallestFValue function"); 
	}

	var smallestF = this.sections[0];
	var smallestFArray = [];
	var better = false;

	for (var i = 1; i < this.sections.length; i++){
		if(this.sections[i].occupation <= smallestF.occupation) {
			smallestFArray.push(this.sections[i]);
			smallestF = this.sections[i];
			better = true;
		}
	}
	if (!better)
		smallestFArray.push(smallestF);
	
	return smallestFArray;
}

//Move.prototype.calculate = function(){
function calculate(){

	if(this.print){
		console.log("Calculate function"); 
	}
	
	this.currentGrid.g = 0;
	this.currentGrid.h = this.manhattan(this.index, this.goal);

	//Calculates the A*star
	this.currentGrid.f = this.currentGrid.g + this.currentGrid.h;

	if(this.print){
		console.log("		Moves left: "+ this.currentGrid.h); 
		console.log("		F" +  this.currentGrid.f + " = G" + this.currentGrid.g + " + H" + this.currentGrid.h );
	}

	//document.getElementById("astar").innerHTML ="Astar value: <b>" + this.currentGrid.f + "</b>";

	this.addToQueue(this.currentGrid); 

	while(this.queue.length > 0 ){
		
		//pop() removes the last element from an array and returns that element. 
		//This method changes the length of the array.
		this.currentGrid = this.queue.pop();  
		
		//Adds to the visited list. 
		this.visitedList.push(this.currentGrid); 

		// Astar.prototype.reachedGoal() returns true or false. 
		if(this.currentGrid.reachedGoal()){

			if(this.print){
				console.log("		The goal " + this.goal + " is reached!");
			}
			
			return; 
		}

		//Adjacent - närliggande
		//Kollar närliggande positioner som man kan flytta till i gridet. 
		//Har dock inte implementerat grid än. 
		var adjArr = []; 

		//Kollar vilka 2-4 värden i griden som är lediga. 
	/*	 --- --- ---
		|   | L |   |
		 --- --- --- 
		| L | X | L |
		 --- --- --- 
		|   | L |   |
		 --- --- --- */
		//console.log(this.positionCheck()); 

		var adjArr = this.setAdjacentSections(this.positionCheck());		
		
		if(this.print){
			console.log(adjArr);
		}
		
		
		for (var i = 0; i < adjArr.length; i++) {
			
			this.sections[adjArr[i]].h = this.manhattan(adjArr[i], this.goal);
			
			//Increase the g-value, moves done. 
			this.sections[adjArr[i]].g++;

			//Använder sig av A*star funktionen. 
			this.sections[adjArr[i]].f = this.sections[adjArr[i]].g + this.sections[adjArr[i]].h;

			//Lägger till nya sections i queue.
			this.addToQueue(this.sections[adjArr[i]]);
		}
	}

}

// Move.prototype.addToQueue = function (thing){
function addToQueue(thing){
	
	if(this.print){
		console.log("Addqueue function"); 
		//console.log(thing);
	}

	var found = false;

	for (var i = 0; i < this.visitedList.length; i++) {
		
		if (this.visitedList[i].index == thing.index) {
			found = true;
			if(this.print){
				console.log("		The index " + thing.index +" has already been visited.");
			}
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

//Move.prototype.update = function(currentGrid) {
function update(currentGrid) {

	if(this.print){
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
//Move.prototype.manhattan = function(index, goal) {
function manhattan(index, goal){		

	var manhattan = Math.abs(Math.floor(index / 9) - Math.floor(goal / 9)) + Math.abs(index % 9 - goal % 9);

	if(this.print){
		console.log("Manhattan function"); 	
		console.log("		index: " + index + "  goal: " + goal); 
		console.log("		The manhattan distance is: " + manhattan); 

	}
	return manhattan; 
}

// Move.prototype.positionCheck = function() {
function positionCheck(){

	//Gets the index-number of the current grid and checks which position it has.
	var i = this.currentGrid.index;  
		
	if(this.print){
		console.log("PositionCheck function"); 
		console.log("		Current index: " + i); 
	}

	//TOP LEFT = TL
	// MIDDLE = M
	//DOWN RIGHT = DR
/*   --- --- ---
	| TL| TM| TR|
	 --- --- --- 
	| ML| M | MR|
	 --- --- --- 
	| DL| DM| DR|
	 --- --- --- */

	 //OBS variablerna för ML OCH MR kan vara tvärtom!!!

	var position;

	//The position of the grids. 
	//It finds where the corner is and then decides which
	// grid that is the current one. 
	if (i == 0) {
		position = "TL";
		//console.log("		Position: " + position);
	}
	else if (i == 8) {
		position = "TR";
		//console.log("		Position: " + position);
	}
	else if (i == 72) {
		position = "DL";
		//console.log("		Position: " + position);
	}
	else if (i == 80) {
		position = "DR";
		//console.log("		Position: " + position);
	}
	else if (i > 0 && i < 8) {
		position = "TM";
		//console.log("		Position: " + position);
	}
	else if (i > 72 && i < 81) {
		position = "DM";
		//console.log("		Position: " + position);
	}
	else if(i % 9 == 0 && i != 72 && i != 0) {
		position = "ML";
		//console.log("		Position: " + position);
	}
	else if(i % 9 == 8 && i != 8 && i != 81) {
		position = "MR";
		//console.log("		Position: " + position);
	}
	else {
		position = "M";
		//console.log("		Position: " + position);
	}

	return position;
}
	
// Move.prototype.setAdjacentSections = function(check) {
function setAdjacentSections(check) {

	if(this.print){
		console.log("SetAdjacentSections function"); 
		console.log("		check: " + check); 
		//console.log(this.currentGrid);
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



