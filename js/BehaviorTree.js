/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	Behavior Tree.

***********************************************************************************************************/
var speed = 1; 
var tired = 0.4; 
var stressed = 0.7; 
var newSpacesLeft = 0; 


	//Decision is generated every time the button is pushed.  
	function decision(){

		group = generatePeople(); 
		console.log("Grupp med " + group + " personer."); 

		//Steg 0: Är hissen här? 
		//isHere = checkHere(); 

		//Steg 1: Finns lediga platser? 
		isEmpty = checkEmpty(group, freeSpaces);

		//För att testa om hissen är full och inte där. 
		//isEmpty = false; 

		//Steg 2: Kolla hur många platser.
		
		if(isEmpty){
			//If there are spaces left, check how many spaces are free.
			freeTemp = spacesLeft(group, freeSpaces);
	
			//Get the new spaces after taking the elevator. 
			newSpacesLeft = takeElevator(group, freeTemp);
			console.log("Platser kvar: "  + newSpacesLeft); 
		}
		else{
			//Wait? 
			console.log("Tyvärr du måste vänta...");
			//Steg 3: När kommer nästa? 
			//TODO
			//getWaitingtime()

			//While waiting on an empty elevator. 
			if(!isEmpty){
				
				//Steg 4A: Trött?
				if(tired>0.5){
					
					speed = speed-0.3; //Går långsammare.
					console.log("Ta hissen, du är " + speed*100 + "% pigg."); 
				}
				else{
					//Steg 4B: Stressad? 
					if(stressed>0.5){
						
						speed = speed+0.3; //Går långsammare.
						console.log("Ta trappan du är " + speed*100 + "% pigg."); 
					}
					else{

						console.log("Ta hissen."); 
					}	
				}	
			}
		}


		//Steg : Hur stor grupp? 
	/*	if(group<2){
			console.log("Ta hissen?"); 
		} 
		else if(group<5){
			console.log("Ta hissen?"); 
		}
		else{
			//Ta trappen!
			console.log("Ta trappan"); 
		}
	*/

	}

