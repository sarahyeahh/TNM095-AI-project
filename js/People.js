/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for functions related to the people.

 	The file includes the functions:
 	- generatePeople()

***********************************************************************************************************/

//Attribut för grupp: Antal, stress(hastighet).

	//Prototype constructor
	function People(width, height){

		this.width = width; 
		this.height = height; 

		this.groups = [];
		this.currentGrid = -1; 

		//Get the variable freeSpaces to be able to include it when calling BehaviorTree
		// !! SKA ÄNDRAS !! Det är inte Elevator() man ska kalla på, utan en annan funktion.
		var allElevators = new Elevator.prototype.implement();
		var freeSpaces = allElevators.freeSpaces;

		//To the constructor Move. 
		this.move = new Move(this.currentGrid, this.width, this.height);

		//"Brain" to make decision
		//this.decision = new Decision(this);

		//Variables effecting the decision/behavior
		this.stressed = 1;
		this.tired = 1;
		this.waitTime = 1;
		this.speed = 2; 

		this.behavior = new BehaviorTree(this.stressed, this.tired, this.speed, freeSpaces);  
		
	    // Position and orientation of the group/person
	  /*  this.x = x;
	    this.y = y;
	    this.angle = angle; // 0-7*/

	}

	//generatePeoplete a group of people
	People.prototype.generatePeople = function (){
	//function generatePeople(){

		var max = Group.prototype.getMaxSize(); //tidigare satt till 6
		//console.log(max);
		var min = 1;  

		var groupsize = Math.floor(Math.random() * (max - min + 1)) + min; 

		//Display number of people that wants to enter the elevator
		document.getElementById("group").innerHTML = "Antal personer som vill gå in i hissen: " + "<b>" + groupsize + "</b>";  

		//Draw a new circle for each new group
		//drawGroup(90,150,groupsize);

		return groupsize; 
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
		if(this.stressed > this.STATIC.MAX_STRESSED || this.tireed > this.STATIC.MAX_TIRED || this.waitTime > this.STATIC.MAX_WAIT_TIME){
			if(Math.random() > 0.999){
				this.kill();
				return;
			}
		}
	}




	



	

