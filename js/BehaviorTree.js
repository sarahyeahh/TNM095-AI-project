/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	Behavior Tree.

 	The file includes the functions:
 	- decision()

***********************************************************************************************************/
//TODO 
//Hämta variablerna från någon annanstans. 

/*var speed = 1; 
var tired = 0.4; 
var stressed = 0.7; 
var newSpacesLeft = 0; */

//BehaviorTree needs:
// - variables concerning the People --> stress, tired, speed, waitTime, groupsize, position
// - variables concering the Elevators --> freeSpaces, elevatorID, (capacity?), position


function BehaviorTree(stress, tired, speed, freespaces){

		this.newSpacesLeft = 0; 
		this.stressed = stress;
		this.tired = tired;
		this.speed = speed; 

		//TODO
		//this.freeSpaces = 2;
		this.freeSpaces = freespaces;
}

	//Decision is generated every time the button is pushed.  
	BehaviorTree.prototype.decision = function(){

		groupsize = People.prototype.generateGroupsize(); 
		console.log("Grupp med " + groupsize + " personer."); 

		//Steg 0: Är hissen här? (Bra att ha om flera hissar.)
		//isHere = checkHere(); 

		//Steg 1: Finns lediga platser? 
		isEmpty = Elevator.prototype.checkEmpty(groupsize, this.freeSpaces);

		//För att testa om hissen är full och inte där. 
		//isEmpty = false; 

		//Steg 2: Kolla hur många platser.
		
		if(isEmpty){
			//If there are spaces left, check how many spaces are free.
			var freeTemp = Elevator.prototype.spacesLeft(groupsize, this.freeSpaces);
	
			//Get the new spaces after taking the elevator. 
			newSpacesLeft = Elevator.prototype.takeElevator(groupsize, freeTemp, this.freeSpaces);
			console.log("Platser kvar: "  + newSpacesLeft); 
		}
		else{
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

