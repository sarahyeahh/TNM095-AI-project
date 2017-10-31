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

		//console.log("this.allElevators: ")
		//console.log(this.allElevators);

		return this.allElevators;
	}

	Elevator.prototype.generateElevator = function(){
		//Increase number of elevators

		//Avgör hur många som ska bli set to true; 
		for (var i = 0; i < gui.elevators; i++) {
				this.allElevators[i].activated = true;	

				//Inte så fint gjort men måste typ göra så för att reseta hissen! 
				this.allElevators[i].elevatorPeople = 0; 
				this.allElevators[i].freeSpaces = 6; 
				this.allElevators[i].capacity = 6; 
					
		}

		//Check if maximum number of elevators is reached
		if(gui.elevators > 6) {	//istället för 6 borde det vara längden av allElevators
			console.log("Det går inte att lägga till fler hissar.");
		}
		else { 	//Add a new elevator
		
			console.log("Antal hissar:" + gui.elevators);

			//Display capacity of the elevator
			document.getElementById("capacity").innerHTML = "There is room for " + "<b>" + this.allElevators[0].capacity + "</b> persons in the elevator.";  
		} 
	}

	// Check if there are any spaces left in the elevator.
	// Return TRUE if there are spaces left, return FALSE if the elevator is full.
	Elevator.prototype.checkEmpty = function (groupsize){
 	
 		//Check if the elevator is full or not
		console.log("	Kollar om hissen är full..."); 

		console.log("	freespaces: " + this.allElevators[0].freeSpaces + "   groupsize: " + groupsize); 
		
 		if(this.allElevators[0].freeSpaces == 0){
 			isEmpty = false; 
 			console.log("	Hissen är full, ta trappan.")
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
			console.log("		Tyvärr, ta trappan.");
			//Reset groupsize.

//TODO: Ändra till Datasetet. 
			groupsize = 0; 
		}
		else if(freeTemp == 0){
			console.log("		Grattis du fick den sista platsen!");
			this.allElevators[0].freeSpaces -= groupsize;
			//elevatorPeople += groupsize;
			this.allElevators[0].elevatorPeople += groupsize;
			//Reset groupsize. 
			groupsize = 0; 

			//The elevator is full
			this.allElevators[0].activated = false; 
			//console.log(this.allElevators[0].activated); 
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
        	//alert('Hissen är tillbaka');
        	console.log('				Hissen är tillbaka');
        	Elevator.prototype.generateElevator();
    	}, 3000);
	}

	//Check if the elevator is full
	Elevator.prototype.fullElevator = function(){
		console.log("Hissen lämnar éntreplan...")
		this.emptyTheElevator();
	}


			
			
		