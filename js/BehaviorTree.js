/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	Behavior Tree.

***********************************************************************************************************/

	//Decision is generated every time the button is pushed.  
	function decision(){

		group = generatePeople(); 
		console.log("Grupp med " + group + " personer."); 

		//Check if the elevator is full or not
		console.log("	Kollar om hissen är full..."); 
		isEmpty = checkEmpty(group, freeSpaces);

		//If there are spaces left, check how many spaces are free.
		if(isEmpty){
			freeSpaces = spacesLeft(group, capacity, freeSpaces);
		}
		else{
			//Do nothing. The elevator is full.
		}

		console.log("Platser kvar: "  + freeSpaces); 

	}