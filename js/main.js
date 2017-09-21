
	var isEmpty = true; 
	var freeSpaces = 0; //som en count
	var group = 0; 
	var capacity = 0; 
	var elevatorPeople = 0; 

	implement(); 

	//Saker som bara ska ske en gång. 
	function implement (){

		var elevator = generateElevator(); 
		capacity = elevator[0]; 
		freeSpaces = elevator[1]; 

	}

	function reset(){

		implement(); 
		console.log("**********STARTAR OM*************"); 

	}

	//Generate people
	function generatePeople(){

		var max = 10; 
		var min = 1; 
		var group = Math.floor(Math.random() * (max - min + 1)) + min; 

		document.getElementById("group").innerHTML = "Antal personer som vill gå in i hissen: " + "<b>" + group + "</b>";  
		
		return group; 

	}

	//Generate elevator 
	function generateElevator(){

		var capacity = 5; 
		freeSpaces = capacity; 

		document.getElementById("capacity").innerHTML = "I hissen får det plats " + "<b>" + capacity + "</b> personer.";  

		return [capacity, freeSpaces]; 

	}

	//Decision genereras varje gång man trycker på knappen. 
	function decision(){

		group = generatePeople(); 
		console.log("Grupp med " + group + " personer."); 

		console.log("	Kollar om hissen är full..."); 
		isEmpty = checkEmpty(group, freeSpaces);

		if(isEmpty){
			freeSpaces = spacesLeft(group, capacity, freeSpaces);
		}
		else{

		}

		console.log("Platser kvar: "  + freeSpaces); 

	}
	
	// Check if there is any space left. 
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

		var groupTemp = group; 
		var freeTemp = freeSpaces; 
		
		//To check if it is possible to fit the group in the elevator. 
		freeTemp -= groupTemp; 

		if(freeTemp < 0){
			console.log("	Tyvärr, ta trappan.");
			//Reset group. 
			group = 0; 
		}
		else{
			//Gruppen får gå in i hissen och antal freespaces minskar. 
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

	//Generate stairs

	//Draw people visually 



	
