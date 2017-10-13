/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	Behavior Tree.

 	The file includes the functions:
 	- decision()

***********************************************************************************************************/
//TODO 


//BehaviorTree needs:
// - variables concerning the People --> stress, tired, speed, waitTime, groupsize, position
// - variables concering the Elevators --> freeSpaces, elevatorID, (capacity?), position


function BehaviorTree(stress, tired, speed, freespaces){

		this.newSpacesLeft = 0; 
		this.stressed = stress;
		this.tired = tired;
		this.speed = speed; 
		this.freeSpaces = freespaces;
		
		this.goal = this.goalState(); 
}


//Decision is generated every time the button is pushed.  
BehaviorTree.prototype.decision = function(){

	var groupsize = People.prototype.generateGroupsize(); 
	console.log("Grupp med " + groupsize + " personer."); 

	//Steg 1: Finns lediga platser? 
	isEmpty = Elevator.prototype.checkEmpty(groupsize);

	if(isEmpty){

		this.goalState('elevator'); 
		//If there are spaces left, check how many spaces are free.
		var freeTemp = Elevator.prototype.spacesLeft(groupsize);

		//Get the new spaces after taking the elevator. 
		newSpacesLeft = Elevator.prototype.takeElevator(groupsize, freeTemp);
		console.log("Platser kvar: "  + newSpacesLeft); 

	}
	else{

		this.goalState('stairs'); 
		//Wait
		console.log("Tyvärr du måste vänta...");
		//Steg 3: När kommer nästa? 
//TODO
		//getWaitingtime()

		//While waiting on an empty elevator. 
				
		//Steg 4A: Trött?
		if(this.tired>0.5){
			this.speed = speed-0.3; //Går långsammare.
			console.log("Ta hissen, du är " + speed*100 + "% pigg."); 
		}
		else{
			//Steg 4B: Stressad? 
			if(this.stressed>0.5){
				
				speed = speed+0.3; //Går långsammare.
				console.log("Ta trappan du är " + speed*100 + "% pigg."); 
			}
			else{
				console.log("Ta hissen."); 
			}	
		}		
	}
}


//Decides which goal the group should go to. 
BehaviorTree.prototype.goalState = function(state){

	console.log("State: " + state);

	var goal; 

	var goalElevator = { 
		x:9,
		y:5.5
	};

	var goalStairs = { 
		x:0,
		y:6.5
	};

	//If the elevator is empty, the goal is to take the elevator. 
	if(state == "elevator"){
		goal = goalElevator;
	}
	else {
		goal = goalStairs; 
	}	
/*	else{
		console.log("State not defined.")
	}*/

 	console.log(goal); 
	
	return goal; 
}

