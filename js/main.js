
	var isEmpty = true; 
	//var freeSpaces = 0; //som en count
	var group = 0; 
	var capacity = 0; 
	var elevatorPeople = 0; 

	console.log("Hej!");

	decision();

	function decision(){

		var group = generatePeople(); 
		var capacity = generateElevator(); 
		var freeSpaces = capacity; 
		checkEmpty(group, capacity, freeSpaces);
		//console.log(g); 

	}

	
	//Generate people
	function generatePeople(){

		var max = 5; 
		var min = 1; 
		var group = Math.floor(Math.random() * (max - min + 1)) + min; //3; 

		document.getElementById("personerihissen").innerHTML = group; 
		
		return group; 

	}

	//Generate elevator 
	function generateElevator(){

		var capacity = 10; 

		return capacity; 

	}

	function checkEmpty(group, capacity, freeSpaces){
 		
 		console.log( "check empty" + group + capacity + freeSpaces);
 		

 		if(freeSpaces==0){
 			isEmpty = false; 
 			console.log("Hissen är full, ta trappan.")
 		}
 		else{
			
			spacesLeft(group, capacity, freeSpaces);
 			
 		}

 		return isEmpty; 
	}

	function spacesLeft(group, capacity, freeSpaces){

			var temp = group; 
			var spacetemp = freeSpaces; 
			
			spacetemp -= temp; 

			if(spacetemp<0){
				console.log("Ta trappan");
			}
			else{
				//Gruppen får gå in i hissen och antal freespaces minskar. 
				console.log("Grattis du fick plats i hissen!");
				freeSpaces -= group; //ändra till antal människor sen. 
				elevatorPeople+=group; 
				group=0; 
				console.log("Det är "+ elevatorPeople + " i hissen just nu.")
			}
			
	}



	//Queue to the elevator

	//Generate stairs

	//Draw people

	
