/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-02

 	File for functions for the AStar search.

 	Based on the A*algorithm f(n) = g(n) + h(n)

 	The file includes the functions:
 

***********************************************************************************************************/

function Astar() {
/*
	this.start = start; 
	this.goal = goal; 
*/
	this.occupation = 0; 
	this.centerX = 0;  
	this.centerY = 0;  
	this.g = 0; //Cost/Moves done 
	this.h = 0; //Heuristic
	this.f = 0; //Astar calculated. 
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

//Checks if the Heuristic has no more steps to go to reach the goal. 
Astar.prototype.reachedGoal = function(){
		
		if (this.h == 0){
			return true;
		}
		else{
			return false;
		}	
}
