/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for functions related to the elevator/elevators.

 	The file includes the functions:
 	- implement()
 	- generateElevator()
 	- checkEmpty(group, freeSpaces)
 	- spacesLeft(group, capacity, freeSpaces)
 	- emptyTheElevator()
 	- elevatorLeaves()

***********************************************************************************************************/

	//Things that will only happen once.
	function implement (){

		var elevator = generateElevator(); 
		elevatorID = elevator[0];
		capacity = elevator[1]; 
		freeSpaces = elevator[2]; 
		elevatorPeople = 0; 

	}

	//Generate elevator 
	function generateElevator(){

		var capacity = 5; 
		freeSpaces = capacity;
		++elevatorID;// = allElevators.length;
		var allElevators = []; 

		//Display capacity of the elevator
		document.getElementById("capacity").innerHTML = "I hissen får det plats " + "<b>" + capacity + "</b> personer.";  

		//Define elevator 
		var elevator = [elevatorID, capacity, freeSpaces];
		console.log(elevator);

		//Create the object 'elevator', it has the values 'capacity', 'freeSpaces', ´'elevatorID'
		//var elevatorObject = {elevatorID: elevatorID, capacity: capacity, freeSpaces: freeSpaces};
		//console.log(elevatorObject);

		//Add elevator in array of elevators
		allElevators.push(elevator);

		console.log("Befintliga hissar: "+ allElevators + " [capacity, freeSpaces, ID]");

		return elevator; 

	}


	// Check if there are any spaces left in the elevator.
	// Return TRUE if there are spaces left, return FALSE if the elevator is full.
	function checkEmpty(group, freeSpaces){
 		
 		if(freeSpaces==0){
 			isEmpty = false; 
 			console.log("	Hissen är full, ta trappan.")
 			fullElevator();
 		}
 		else{
 			isEmpty = true; 
			console.log("	Det finns plats för "+ freeSpaces+  " personer i hissen."); 
 		}

 		return isEmpty; 
	}

	//Count how many spaces there are left. 
	function spacesLeft(group, capacity, freeSpaces){

		//Temporary variables
		var groupTemp = group; 
		var freeTemp = freeSpaces; 
		
		//Check if it is possible to fit the group in the elevator. 
		freeTemp -= groupTemp; 

		//If freeTemp is negative, there are not spaces enough to fit the whole group in the elevator.
		if(freeTemp < 0){
			console.log("	Tyvärr, ta trappan.");
			//Reset group. 
			group = 0; 
		}
		//freeTemo is positive and there are enough free spaces to fit the group in the elevator.
		else{
			//The group can enter the elevator and the number of free spaces decreases. 
			console.log("	Grattis du fick plats i hissen!");
			freeSpaces -= group; //ändra till antal människor sen. 
			elevatorPeople += group; 
			
			//Reset group. 
			group = 0; 
			console.log("Antal personer i hissen nu: "+ elevatorPeople )
		}		

		return freeSpaces; 
	}

	//Queue to the elevator

	//Elevator leaves
	function emptyTheElevator(){
		implement(); 
		console.log("Hissen är tillbaka."); 
		//alert('Hissen är tillbaka');

	}

	//Check if the elevator is full
	function fullElevator () {
		console.log("Hissen lämnar éntreplan...")

		//call function 'emptyTheElevator' after 3 seconds
		window.setTimeout(emptyTheElevator(), 3000);	
	}


			
			
		