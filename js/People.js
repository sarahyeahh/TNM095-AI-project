/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26
 	File for functions related to the people.
 	The file includes the functions:
 	- generateGroupsize()   --> Previously called generatePeople
 	- generatePeople()
 	- goalState() 
***********************************************************************************************************/

//Attribut för grupp: Antal, stress(hastighet).


//Prototype constructor
function People(width, height){

	this.width = width; 		//width of the world
	this.height = height; 		//height of the world

	this.groups = [];			//array to store all groups
	this.activeGroups = 0;		//counter of generated groups of people

	//Get the variable freeSpaces to be able to include it when calling BehaviorTree
	// !! SKA ÄNDRAS !! Det är inte Elevator() man ska kalla på, utan en annan funktion.
	var allElevators = new Elevator.prototype.implement();
	var freeSpaces = allElevators.freeSpaces;

//TODO: x och y ska vara något annat. 
	this.x = 0;
    this.y = 0;
    //this.currentGrid = 0; 
    this.start = 0; 
    this.goal = 9;

	//To the constructor Move. 
	this.move = new Move(this.start, this.goal, this.x, this.y, this.width, this.height);
 
}

/****** DET NEDANFÖR ANVÄNDS EJ ÄNNU ******/

	//List possible actions for the People
	People.prototype.AVAILABLE_ACTIONS = ["waitForElevator", "takeElevator", "takeStairs"];

/*
	//Static constants
	People.prototype.STATIC = {
		MAX_STRESSED = 100,
		MAX_TIRED = 100,
		MAX_WAIT_TIME = 30
	}
*/

	//Call the correct action
	People.prototype.act = function (){
		var actionName = this.decision.getAction();
		this[actionName].call(this);
		this.update();
	}

	//Update function for alla parameters
	People.prototype.update = function () {

		//Update stressfactor, tiredness and waiting time
		this.stressed++;
		this.tired++;
		this.waitTime++;

		//"Kill" people if exceeded max values
		if(this.stressed > this.STATIC.MAX_STRESSED || this.tired > this.STATIC.MAX_TIRED || this.waitTime > this.STATIC.MAX_WAIT_TIME){
			if(Math.random() > 0.999){
				this.kill();
				return;
			}
		}
	}




	