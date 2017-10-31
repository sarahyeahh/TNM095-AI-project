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

	this.stress = stress;
	this.tired = tired;
	this.speed = speed; 
	this.state = state; 


	this.goal = this.goalState(state); 
}

//Decision is generated every time the button is pushed.  
BehaviorTree.prototype.decision = function(group){

	this.countElevator = 0; 
	this.countStairs = 0; 

	this.x = 2.5; //Start position 0-9
	this.y = 0; //Start position 0-9

	for(var i = 0; i < group.length; i++){

		var groupsize = group[i].groupSize;
		console.log("Grupp med " + groupsize + " personer.");

		//Steg 1: Finns lediga platser? 
		isEmpty = Elevator.prototype.checkEmpty(groupsize);

		//console.log(isEmpty);

		if(isEmpty){

			this.state= this.goalState('elevator'); 
			group[i].goal = this.state; 
			
			//If there are spaces left, check how many spaces are free.
			var freeTemp = Elevator.prototype.spacesLeft(groupsize);

			//Get the new spaces after taking the elevator. 
			var newSpacesLeft = Elevator.prototype.takeElevator(groupsize, freeTemp);
			console.log("Platser kvar: "  + newSpacesLeft); 

		    this.start = 6; 
		    this.newgoal = 45; // (9, 5) in the grid from 0-80
		   
			Move(this.start, this.newgoal, this.x, this.y, width, height);
			init();

			updateCanvas(group[i]); 

		}
		else{

			this.state = this.goalState('stairs'); 
			group[i].goal = this.state; 

		    this.start = 6; 
		    this.newgoal = 62; // (0, 7) in the grid from 0-80

			Move(this.start, this.newgoal, this.x, this.y, width, height);
			
			//Wait
			console.log("	Tyvärr du måste vänta...");
			//Steg 3: När kommer nästa? 
//TODO
			//getWaitingtime()

			//While waiting on an empty elevator. 
					
			//Steg 4A: Trött?
			if(group[i].tired>0.5){
				group[i].speed = group[i].speed-1; //Går långsammare.
				console.log("	Ta hissen, du är " + group[i].tired*100 + "% pigg och har hastigheten: " +  group[i].speed); 
				updateCanvas(group[i]); 

			}
			else{
				//Steg 4B: Stressad? 
				if(group[i].stress>0.5){
					group[i].speed = group[i].speed+1; //Går långsammare.
					console.log("	Ta trappan du är " + group[i].stress*100 + "% pigg och har hastigheten: " +  group[i].speed); 
					updateCanvas(group[i]); 
				}
				else{
					console.log("	Ta hissen."); 
					updateCanvas(group[i]); 
				}	
			}	

			//updateCanvas(group[i]); 	
		}
		
	}

	document.getElementById("goalcounter").innerHTML ="<b>" + this.countStairs + "</b>"
	+  " people went to the stairs and <b>" + this.countElevator 
	+ "</b> went to the elevator.";
}

//Decides which goal the group should go to. 
BehaviorTree.prototype.goalState = function(state){
	
	var goal;
	//console.log("State: " + state);

	//coordinates to the elevator
	var goalElevator = { 
		x:9,
		y:5.5
	};

	//coordinates to second elevator, if used
	var goalElevator2 = {
		x:9,
		y:3.5
	};

	//coordinates to third elevator, if used
	var goalElevator3 = {
		x:9,
		y:1.5
	};

	//coordinates to the stairs
	var goalStairs = { 
		x:0,
		y:6.5
	};

	
	//If the elevator is empty, the goal is to take the elevator. 
	if(state == "elevator"){
		this.countElevator++; 
		goal = goalElevator;
		console.log(goal);
		console.log("	Goal is set to elevator"); 
	}
	else if ( state == "stairs") {
		this.countStairs++; 
		goal = goalStairs; 
		console.log(goal);
		console.log("	Goal is set to stairs"); 
	}	
	else{
		console.log("	State not defined.")
	}

	return goal; 
}


