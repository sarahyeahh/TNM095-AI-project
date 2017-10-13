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



function BehaviorTree(state, stress, tired, speed){

 
	this.stressed = stress;
	this.tired = tired;
	this.speed = speed; 
	this.state = state; 

	console.log(state); 
	this.goal = this.goalState(state); 

}


//Decision is generated every time the button is pushed.  
BehaviorTree.prototype.decision = function(){



	var data = new Data(); 

	//data.dividedGroups.length
	for(var i = 0; i < 1; i++){

		//data.dividedGroups[i].length
		for(var j = 0; j < 1; j++){

			var groupsize = data.dividedGroups[i][j];
			console.log("Grupp med " + groupsize + " personer."); 
			//console.log(data.dividedGroups[i][j]);

			//Steg 1: Finns lediga platser? 
			isEmpty = Elevator.prototype.checkEmpty(groupsize);


			if(isEmpty){

				this.state = this.goalState('elevator'); 
				
				//If there are spaces left, check how many spaces are free.
				var freeTemp = Elevator.prototype.spacesLeft(groupsize);

				//Get the new spaces after taking the elevator. 
				var newSpacesLeft = Elevator.prototype.takeElevator(groupsize, freeTemp);
				console.log("Platser kvar: "  + newSpacesLeft); 

			}
			else{

				this.state = this.goalState('stairs'); 
				//Wait
				console.log("Tyvärr du måste vänta...");
				//Steg 3: När kommer nästa? 
//TODO
				//getWaitingtime()

				//While waiting on an empty elevator. 
						
				//Steg 4A: Trött?
				if(this.tired>0.5){
					this.speed = this.speed-0.3; //Går långsammare.
					console.log("Ta hissen, du är " + rhis.speed*100 + "% pigg."); 
				}
				else{
					//Steg 4B: Stressad? 
					if(this.stressed>0.5){
						this.speed = this.speed+0.3; //Går långsammare.
						console.log("Ta trappan du är " + this.speed*100 + "% pigg."); 
					}
					else{
						console.log("Ta hissen."); 
					}	
				}		
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
		console.log("elevator"); 
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

