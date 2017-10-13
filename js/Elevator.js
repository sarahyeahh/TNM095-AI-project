/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for functions related to the elevator/elevators.

 	The file includes the functions:
 	- implement()
 	- generateElevator()
 	- checkEmpty(groupsize, freeSpaces)
 	- spacesLeft(groupsize, capacity, freeSpaces)
 	- emptyTheElevator()
 	- elevatorLeaves()

***********************************************************************************************************/

	//Prototype constructor for elevator. 
	function Elevator(x, y, elevator) {
	
		this.elevatorID = -1; //Fortfarande kvar i main. 
	   	this.capacity = 6; 	//tidigare: 6 -> capacity
	   	this.freeSpaces = 6; //tidigare: 6 -> capacity
	   	this.activated = false;
	   	this.positionX = canvas.width;
	   	this.positionY = 50;
	    this.elevatorPeople = 0;
	}

	//Implement prototype. 
	Elevator.prototype.implement = function() {
		this.allElevators = Elevator.prototype.elevatorArray();

		/*elevatorID = elevator[0];
		capacity = elevator[1]; 
		freeSpaces = elevator[2]; 
		activated = elevator[3];
		positionX = elevator[4];
		positionY = elevator[5];
		elevatorPeople = [6];*/

		//console.log(this.allElevators); 
	}

	//Create an array of elevator objects
	//Properties of an elevator: elevatorID, capacity, freeSpaces, activated
	Elevator.prototype.elevatorArray = function(){
		//Declare variables for the array
		this.allElevators = [];
		var len = 6;

		var counter = 0; 
		var posIncr = 60;  

		for (var i = 0; i < len; i++) {
				this.allElevators.push(new Elevator());
				this.allElevators[counter].elevatorID = counter;
				this.allElevators[counter].positionY += 5*counter; 
				counter++	
			}
		console.log("this.allElevators: ")
		console.log(this.allElevators);

		/*
		//Add elevators in the array allElevators
		for (var i = 0; i < len; i++) {
		    	allElevators.push({
		        elevatorID: i,
		        capacity: capacity,
		        freeSpaces: freeSpaces,
		        activated: activated,
		        positionX: 40*i+40,
		        positionY: positionY,
		        elevatorPeople: elevatorPeople
		    });
		}*/

		return this.allElevators;
	}

	//Generate elevator 
	Elevator.prototype.generateElevator = function(){
		//Increase number of elevators

//Avgör hur många som ska bli set to true; 
		var nmbrOfElevators = 1; 

		for (var i = 0; i < nmbrOfElevators; i++) {
				this.allElevators[i].activated = true;	
					
		}

		console.log(this.allElevators); 

		//++nmbrOfElevators;

		//Check if maximum number of elevators is reached
		if(nmbrOfElevators > 6) {	//istället för 6 borde det vara längden av allElevators
			console.log("Det går inte att lägga till fler hissar.");
		}
		else { 	//Add a new elevator
		
			console.log("Antal hissar:" + nmbrOfElevators);
			/*
			var elevatorPeople = 0;
			var activated = true;
			var capacity = 5; 
			freeSpaces = capacity;
			++elevatorID;// = allElevators.length;*/

			//Display capacity of the elevator
			document.getElementById("capacity").innerHTML = "I hissen får det plats " + "<b>" + this.allElevators[0].capacity + "</b> personer.";  

			//Update the array 'allElevators'
			/*this.allElevators[nmbrOfElevators-1].activated = true;
			this.allElevators[nmbrOfElevators-1].capacity = 5;
			this.allElevators[nmbrOfElevators-1].freeSpaces = capacity;
			this.allElevators[nmbrOfElevators-1].elevatorPeople = elevatorPeople;*/

			//Display array of elevators
			//console.log(this.allElevators);

			//Draw the new elevator in the canvas
			/*var posX = this.allElevators[nmbrOfElevators-1].positionX;
			var posY = this.allElevators[nmbrOfElevators-1].positionY;
			drawRectangle(posX, posY);*/
			//drawElevator(posX, posY);

			//Define elevator 
		//	var elevator = [elevatorID, capacity, freeSpaces, activated, positionX, positionY, elevatorPeople];

		}
		
		return elevator; 
	}

	// Check if there are any spaces left in the elevator.
	// Return TRUE if there are spaces left, return FALSE if the elevator is full.
	Elevator.prototype.checkEmpty = function (groupsize){
 	
 		//Check if the elevator is full or not
		console.log("	Kollar om hissen är full..."); 

		console.log("freespaces: " + this.allElevators[0].freeSpaces + "   groupsize: " + groupsize); 
		
 		if(this.allElevators[0].freeSpaces==0){
 			isEmpty = false; 
 			console.log("	Hissen är full, ta trappan.")
 			//fullElevator();
 		}
 		else{
 			isEmpty = true;
			console.log("	Kapacitet: "+ this.allElevators[0].freeSpaces); 
 		}

 		return isEmpty; 
	}

	//Return how many spaces there are left. 
	Elevator.prototype.spacesLeft = function(groupsize){
	
		//Temporary variables
		var groupTemp = groupsize; 
		var freeTemp = this.allElevators[0].freeSpaces; 
		
		//Check if it is possible to fit the group in the elevator. 
		freeTemp -= groupTemp; 

		return freeTemp; 
	}

	Elevator.prototype.takeElevator  = function(groupsize, freeTemp){

		//If freeTemp is negative, there are not spaces enough to fit the whole group in the elevator.
		if(freeTemp < 0){
			console.log("	Tyvärr, ta trappan.");
			//Reset groupsize. 
//TODO: Ändra till Datasetet. 
			groupsize = 0; 
		}
		else if(freeTemp == 0){
			console.log("	Grattis du fick den sista platsen!");
			this.allElevators[0].freeSpaces -= groupsize;
			//elevatorPeople += groupsize;
			this.allElevators[0].elevatorPeople += groupsize;
			//Reset groupsize. 
			groupsize = 0; 

			//The elevator is full
			this.fullElevator(); 
		}
		//freeTemp is positive and there are enough free spaces to fit the group in the elevator.
		else{
			//The group can enter the elevator and the number of free spaces decreases. 
			console.log("	Grattis du fick plats i hissen!");
			this.allElevators[0].freeSpaces -= groupsize; //ändra till antal människor sen.
			this.allElevators[0].elevatorPeople += groupsize; 
			
			//Reset group. 
			groupsize = 0; 
			console.log("Antal personer i hissen nu: "+ this.allElevators[0].elevatorPeople )
		}

		return this.allElevators[0].freeSpaces; 
	}

	//Elevator leaves
	Elevator.prototype.emptyTheElevator = function(){
		
		//Väntar 3 sekunder innan hissen kommer tillbaka tom.
		setTimeout(function(){ 
			//console.log("Hissen är tillbaka."); 
        	alert('Hissen är tillbaka');
        	Elevator.prototype.implement(); 	//Här ska vi väl egentligen tömma den aktuella hissen, inte kalla på implement()
    	}, 3000);  
	}

	//Check if the elevator is full
	Elevator.prototype.fullElevator = function(){
		console.log("Hissen lämnar éntreplan...")
		this.emptyTheElevator();
	}

	//TODO
	//Queue to the elevator


			
			
		