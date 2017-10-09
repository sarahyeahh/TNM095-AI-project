/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-02

 	File for functions for the AStar search.

 	Based on the A*algorithm f(n) = g(n) + h(n)

 	The file includes the functions:
 

***********************************************************************************************************/

function Astar(start, goal) {

	this.start = start; 
	this.goal = goal; 

	this.occupation = 0; //vad betyder denna?
	this.centerX = 0; //den med ? 
	this.centerY = 0; // den med? 
	this.g = 0;
	this.h = 0;
	this.f = 0; //Behövs den här? 
	this.index = -1;
}


//A*star algoritm F
Astar.prototype.F = function (){
	console.log("G" + this.g + "H" + this.h);
	return (this.g + this.h);
}

//Moves done G
Astar.prototype.G = function (){
	console.log("G" + this.g);
	return this.g;
}

//Moves left H
Astar.prototype.H = function (){

	if(this.h == 0 ){
		console.log("H" + this.h);
		return 0; 
	}
	return this.h; 
}

Astar.prototype.reachedGoal = function(){
		
		if (this.h == 0){
			return true;
		}
		else{
			return false;
		}	
}
/*
//Från AI förra kursen	
Astar.prototype.setG = function(value) {
		movesDone = value;
	}
	
	//Return the estimated number of moves left
Astar.prototype.setH = function(value) {

		movesLeft = value;
	}*/

/*******************************************************/

/*
//Skapa en grid med massa 5x5 1:or
var map = new Array(gridX);

for (var i = 0; i < gridX; i++) {
  map[i] = new Array(gridY);
  for (var j = 0; j < gridY; j++) {
  	map[i][j] = 1; 
  }
}
console.log(map);

var thestart = [0, 2];
var thegoal = [4, 2];

//Lägg till en nolla på (1,3)
map[0][2] = 0; 

console.log(map);

*/


//****************************************************

