/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-20

 	Declares variables and include functions representing a decision tree for an elevator-stairs problem.

 	The file includes the functions:
 	- reset()

***********************************************************************************************************/
	var canvas = document.createElement("canvas");
	var GUI = document.createElement("GUI"); //Behövs denna?

	var width = canvas.width;
    var height = canvas.height;
	
	//Declare variables
	var nmbrOfElevators = 0;			//Borde vara i constructor
	var elevatorID = -1; 				//Sätt in i en constructor! 


//Det som skapas direkt när rutan laddats. 
	var load = document.getElementById("load");
	load.onload = (event) => {
 		draw();  //Ritar upp första cirkeln och första hissen.
 		new World(width, height);	
 		Elevator.prototype.implement();
 		Elevator.prototype.generateElevator(); 
 		console.log("implement");
	}

//Ny grupp-knapp
	var newgroup = document.getElementById("newgroup");
	newgroup.onclick = (event) => {
 		BehaviorTree.prototype.decision();
 		//Elevator.prototype.implement(); 
	}

//Ny hiss-knapp
//generateElevator()
	var elevator = document.getElementById("elevator");
	elevator.onclick = (event) => {
		//Elevator.prototype.implement();
		Elevator.prototype.generateElevator(); 
	}
//Starta om-knapp
	//Reset the application by restarting everything
	function reset(){
		Elevator.prototype.implement(); 
		console.log("**********STARTAR OM*************"); 
	}


//OBS behövs inte användas än men kanske sen om reset() flyttas till en constructor. 
//reset()
/*	var reset = document.getElementById("reset");
	reset.onclick = (event) => {
 		reset();
 		console.log("**********STARTAR OM*************");  
	}
	*/



	 



	
