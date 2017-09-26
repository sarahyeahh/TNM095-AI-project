/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-20

 	Declares variables and include functions representing a decision tree for an elevator-stairs problem.

 	The file includes the functions:
 	- implement()
 	- reset()
 	- generatePeople()
 	- generateElevator()
 	- decision()
 	- checkEmpty(group, freeSpaces)
 	- spacesLeft(group, capacity, freeSpaces)


***********************************************************************************************************/

	//Declare variables
	var isEmpty = true; 
	var freeSpaces = 0; //som en count
	var group = 0; 
	var capacity = 0; 
	var elevatorPeople = 0; 

	implement(); 

	//Things that will only happen once.
	function implement (){

		var elevator = generateElevator(); 
		capacity = elevator[0]; 
		freeSpaces = elevator[1]; 
		elevatorPeople = 0; 

	}

	//Reset the application by restarting everything
	function reset(){

		implement(); 
		console.log("**********STARTAR OM*************"); 

	}

	//Generate a group of people
	function generatePeople(){

		var max = 10; 
		var min = 1; 
		var group = Math.floor(Math.random() * (max - min + 1)) + min; 

		//Display number of people that wants to enter the elevator
		document.getElementById("group").innerHTML = "Antal personer som vill gå in i hissen: " + "<b>" + group + "</b>";  
		
		return group; 

	}

	//Generate elevator 
	function generateElevator(){

		var capacity = 5; 
		freeSpaces = capacity; 

		//Display capacity of the elevator
		document.getElementById("capacity").innerHTML = "I hissen får det plats " + "<b>" + capacity + "</b> personer.";  

		return [capacity, freeSpaces]; 

	}

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
	
	// Check if there are any spaces left in the elevator.
	// Return TRUE if there are spaces left, return FALSE if the elevator is full.
	function checkEmpty(group, freeSpaces){
 		
 		if(freeSpaces==0){
 			isEmpty = false; 
 			console.log("	Hissen är full, ta trappan.")
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

	/*************
		SLIDER
	**************/
	var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;

	slider.oninput = function() {
	  output.innerHTML = this.value;
	}


	//Queue to the elevator

	//Generate stairs

	//Draw people visually 



	
