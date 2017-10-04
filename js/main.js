/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-20

 	Declares variables and include functions representing a decision tree for an elevator-stairs problem.

 	The file includes the functions:
 	- reset()

***********************************************************************************************************/
	//var canvas = document.createElement("canvas");
	var GUI = document.createElement("GUI");
	
	//Declare variables
	var nmbrOfElevators = 0;			//Borde vara i constructor
	var elevatorID = -1; 				//Sätt in i en constructor! 

	//Reset the application by restarting everything
	function reset(){
		Elevator.prototype.implement(); 
		console.log("**********STARTAR OM*************"); 
	}

	var start = document.getElementById("start");
	start.onclick = (event) => {
 		new BehaviorTree(0 , 0 , 0).decision();
 		Elevator.prototype.implement(); 
	}

	var load = document.getElementById("load");
	load.onload = (event) => {
 		draw(); 
 		
	}

//generateElevator()
	var elevator = document.getElementById("elevator");
	elevator.onclick = (event) => {
		Elevator.prototype.generateElevator(); 
	}


//OBS behövs inte användas än men kanske sen om reset() flyttas till en constructor. 
//reset()
/*	var reset = document.getElementById("reset");
	reset.onclick = (event) => {
 		reset();
 		console.log("**********STARTAR OM*************");  
	}
	*/



	 



	
