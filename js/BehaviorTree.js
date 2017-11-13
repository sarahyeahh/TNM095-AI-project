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

	this.elevatorQueue = [];
	this.goal = this.goalState(state); 
}

//Decision is generated every time the button is pushed.  
BehaviorTree.prototype.decision = function(group){

	console.log(group); 

	this.countElevator = 0; 
	this.countStairs = 0; 
	this.countQueue = 0; 
	this.elevatorQueue = []; //Empty queue for the ones waiting for the elevator. 

	this.x = 2.5; //Start position 0-9
	this.y = 0; //Start position 0-9

	for(var i = 0; i < group.length; i++){

		var groupsize = group[i].groupSize;
		console.log("Grupp med " + groupsize + " personer.");

		//Steg 1: Finns lediga platser? 
		isEmpty = Elevator.prototype.checkEmpty(groupsize);

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
			//init();

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
			if(group[i].tired>0.7){
				//Borde ställa sig i kön. 
				group[i].speed = group[i].speed -Math.floor(Math.random() * (3 - 1) + 1); //Går långsammare.
				console.log("	Vänta i kön, du är " + group[i].tired*100 + "% trött och har hastigheten: " +  group[i].speed); 
				
				this.state = this.goalState('queue'); 
				group[i].goal = this.state; 
				this.elevatorQueue.push(group[i]);
				//this.treatQueue(this.elevatorQueue);				
				updateCanvas(group[i]); 
			}
			else{
				//Steg 4B: Stressad? 
				if(group[i].stress>0.7){
					group[i].speed = group[i].speed + Math.floor(Math.random() * (3 - 1) + 1); //Går långsammare.
					console.log("	Ta trappan du är " + group[i].stress*100 + "% stressad och har hastigheten: " +  group[i].speed); 
					updateCanvas(group[i]); 
				}
				/*else{
					console.log("	Ta hissen."); 
					updateCanvas(group[i]); 
				}	*/
			}

			updateCanvas(group[i]);	
			
		}
		
	}

	console.log(this.elevatorQueue); 

	document.getElementById("goalcounter").innerHTML ="Stairs: <b>" + this.countStairs + "</b>"
	+  " <br> Elevator: <b>" + this.countElevator 
	+ "</b> <br> Queue: <b>" + this.countQueue + "</b>";
}

//Under construction...
BehaviorTree.prototype.treatQueue = function(queue){
	console.log(queue); 

	var cont = 0; 

	for(var i = 0; i < queue.length; i++){

		var groupsize = queue[i].groupSize;
		console.log("QUEUE Grupp med " + groupsize + " personer.");

		isEmpty = Elevator.prototype.checkEmpty(groupsize);

		if(isEmpty){

			this.state= this.goalState('elevator'); 
			queue[i].goal = this.state; 
			
			//If there are spaces left, check how many spaces are free.
			var freeTemp = Elevator.prototype.spacesLeft(groupsize);

			//Get the new spaces after taking the elevator. 
			var newSpacesLeft = Elevator.prototype.takeElevator(groupsize, freeTemp);
			console.log("QUEUE Platser kvar: "  + newSpacesLeft); 

		    this.start = 6; 
		    this.newgoal = 45; // (9, 5) in the grid from 0-80
		   
			//Move(this.start, this.newgoal, this.x, this.y, width, height);
			//init();

			updateCanvas(group[i]); 

		}
		else{
			console.log("NOOOOOOOOOOOOOOO");
		}
		
	}
	
};

//Decides which goal the group should go to. 
BehaviorTree.prototype.goalState = function(state){
	
	var goal;

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

	//coordinates to the stairs
	var goalQueue = { 
		x:6.5,
		y:5.5
	};

	//If the elevator is empty, the goal is to take the elevator. 
	if(state == "elevator"){
		this.countElevator++; 
		goal = goalElevator;
		//console.log(goal);
		//console.log("	Goal is set to elevator"); 
	}
	else if(state == "stairs") {
		this.countStairs++; 
		goal = goalStairs; 
		//console.log(goal);
		//console.log("	Goal is set to stairs"); 
	}
	else if(state == "queue") {
		this.countQueue++; 
		goal = goalQueue; 
	}		
	else{
		console.log("	State not defined.")
	}

	console.log("Goal is set to "+ state);

	return goal; 
}


