/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-20

 	Declares variables and include functions representing a decision tree for an elevator-stairs problem.

 	The file includes the functions:
 	- onload
 	- onclick

***********************************************************************************************************/
	var canvas = document.createElement("canvas");
	//var GUI = document.createElement("GUI"); //Behövs denna?

	var width = canvas.width;
    var height = canvas.height;
	
	//Det som skapas direkt när rutan laddats. 
	var load = document.getElementById("load");
	load.onload = (event) => {
 	console.log("************************Load**************************");
 		new World(width, height);	
 		Elevator.prototype.implement();
 		Elevator.prototype.generateElevator(); //TODO: Implement borde kunna kalla på generateElevator....
 		Time.prototype.startTime();
 		//Time.prototype.startTimer(); //funktion som inte funkar i nuläget
	}

	var start = document.getElementById("start");
	start.onclick = (event) => {
 		console.log("************************START**************************");
 		createDataSet(hour);
	}

	 



	
