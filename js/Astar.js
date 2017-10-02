/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-02

 	File for functions for the AStar search.

 	Based on the A*algorithm f(n) = g(n) + h(n)

 	The file includes the functions:
 

***********************************************************************************************************/


function Astar() {
	this.occupation = 0;
	this.centerX = 0;
	this.centerY = 0;
	this.g = 0;
	this.h = 0;
	this.f = 0; //Behövs den här? 
	this.index = -1;
}

//A*star algoritm F
Astar.prototype.F = function (){
	return (this.g + this.h);
}

//Moves done G
Astar.prototype.G = function (){
	return this.g;
}

//Moves left H
Astar.prototype.H = function (){

	if(this.h == 0 ){
		return 0; 
	}
	return this.h; 
}

/*reachedGoal() {
	if (this.h == 0)
		return true;

		return false;
	
}*/

//Från AI förra kursen	
/*	public void setG(int value) {
		movesDone = value;
	}
	
	//Return the estimated number of moves left
	public void setH(int value) {
		movesLeft = value;
	}*/