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

	//Prototype constructor for elevator. 
	function Elevator(world) {
	   this.capacity = capacity; 
	   this.freeSpaces = capacity; 
	   this.allElevators = []; 
	   this.elevator = elevator; 
	   this.elevatorID = -1; //Fortfarande kvar i main. 
	   this.elevatorPeople = 0; 

	}

//Implement prototype. 
	Elevator.prototype.implement = function() {
		this.allElevators = Elevator.prototype.elevatorArray();

		var elevator = Elevator.prototype.generateElevator(); 
		elevatorID = elevator[0];
		capacity = elevator[1]; 
		freeSpaces = elevator[2]; 
		activated = elevator[3];
		positionX = elevator[4];
		positionY = elevator[5];
		elevatorPeople = 0;
	}

	//Create an array of elevator objects
	//Properties of an elevator: elevatorID, capacity, freeSpaces, activated
	Elevator.prototype.elevatorArray = function(){
		//Declare variables for the array
		var allElevators = [];
		var len = 6;

		//Declare variables for the elevators
		var capacity = 0;
		var freeSpaces = capacity;
		var activated = false;
		var positionX = 0;
		var positionY = 0;

		//Add elevators in the array allElevators
		for (var i = 0; i < len; i++) {
		    	allElevators.push({
		        elevatorID: i,
		        capacity: capacity,
		        freeSpaces: freeSpaces,
		        activated: activated,
		        positionX: 40*i+40,
		        positionY: positionY
		    });
		}
		return allElevators;
	}

	//Generate elevator 
	Elevator.prototype.generateElevator = function(){
		//Current number of elevators
		++nmbrOfElevators;
		console.log("Antal hissar:" + nmbrOfElevators);
		
		var activated = true;
		var capacity = 5; 
		freeSpaces = capacity;
		++elevatorID;// = allElevators.length;

		//Display capacity of the elevator
		document.getElementById("capacity").innerHTML = "I hissen får det plats " + "<b>" + capacity + "</b> personer.";  

		//Define elevator 
		var elevator = [elevatorID, capacity, freeSpaces, activated];
		//console.log(elevator);

		//Create the object 'elevator', it has the values 'capacity', 'freeSpaces', ´'elevatorID'
		//var elevatorObject = {elevatorID: elevatorID, capacity: capacity, freeSpaces: freeSpaces};

		//Update the array 'allElevators'
		this.allElevators[nmbrOfElevators-1].activated = true;
		this.allElevators[nmbrOfElevators-1].capacity = 5;
		this.allElevators[nmbrOfElevators-1].freeSpaces = capacity;

		//Display array of elevators
		//console.log(allElevators);

		//Draw the new elevator in the canvas
		var posX = this.allElevators[nmbrOfElevators-1].positionX;
		var posY = this.allElevators[nmbrOfElevators-1].positionY;
		drawRectangle(posX, posY);
		
		return elevator; 
	}

	// Check if there are any spaces left in the elevator.
	// Return TRUE if there are spaces left, return FALSE if the elevator is full.
	Elevator.prototype.checkEmpty = function (group, freeSpaces){
 	
 		//Check if the elevator is full or not
		console.log("	Kollar om hissen är full..."); 
		
 		if(freeSpaces==0){
 			isEmpty = false; 
 			console.log("	Hissen är full, ta trappan.")
 			//fullElevator();
 		}
 		else{
 			isEmpty = true; 
			console.log("	Kapacitet: "+ freeSpaces); 
 		}

 		return isEmpty; 
	}

	//Return how many spaces there are left. 
	Elevator.prototype.spacesLeft = function(group, freeSpaces){
	
		//Temporary variables
		var groupTemp = group; 
		var freeTemp = freeSpaces; 
		
		//Check if it is possible to fit the group in the elevator. 
		freeTemp -= groupTemp; 

		return freeTemp; 
	}

	Elevator.prototype.takeElevator  = function(group, freeTemp){

		//If freeTemp is negative, there are not spaces enough to fit the whole group in the elevator.
		if(freeTemp < 0){
			console.log("	Tyvärr, ta trappan.");
			//Reset group. 
			group = 0; 
		}
		else if(freeTemp == 0){
			console.log("	Grattis du fick den sista platsen!");
			freeSpaces -= group;
			elevatorPeople += group;
			//Reset group. 
			group = 0; 

			//The elevator is full
			fullElevator(); 
		}
		//freeTemp is positive and there are enough free spaces to fit the group in the elevator.
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

	//Elevator leaves
	Elevator.prototype.emptyTheElevator = function(){
		
		//Väntar 3 sekunder innan hissen kommer tillbaka tom.
		setTimeout(function(){ 
			//console.log("Hissen är tillbaka."); 
        	alert('Hissen är tillbaka');
        	implement(); 
    	}, 3000);  
	}

	//Check if the elevator is full
	Elevator.prototype.fullElevator = function(){
		console.log("Hissen lämnar éntreplan...")
		emptyTheElevator();
	}

	//TODO
	//Queue to the elevator


			
			
		