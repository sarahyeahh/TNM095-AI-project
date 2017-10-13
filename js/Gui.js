/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for the GUI.

***********************************************************************************************************/

function GUI (){
	//Vad vill man skicka vidare till andra funktioner?

	//Elements
	this.elevators = 1; 
	this.stairs = 1; 

	//Mood
	this.stress = 0; 
	this.tired = 0; 
	this.speed = 3; 

	this.groupsize = 10; 
}

var gui = new GUI(); 
console.log(gui); 

	/****************************************************
		SLIDER 0: Regulate number of elevators
	****************************************************/
	var slider = document.getElementById("myElevators");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;
	
	slider.oninput = function() {		
	  output.innerHTML = this.value;
	  gui.elevators = parseInt(slider.value); 
	  var elevatorInput = this.value;
	  console.log("Chosen number of elevators: " + elevatorInput);
	}

	/****************************************************
		SLIDER 1: Regulate number of stairs
	****************************************************/
	var slider1 = document.getElementById("myStairs");
	var output1 = document.getElementById("demo1");
	output1.innerHTML = slider1.value;
	
	slider1.oninput = function() {
	  output1.innerHTML = this.value;
	  gui.stairs = parseInt(slider1.value); 
	  var stairInput = this.value;
	  console.log("Chosen number of stairs: " + stairInput);
	}

	/****************************************************
		SLIDER 2: Regulate speed
	****************************************************/
	var slider2 = document.getElementById("mySpeed");
	var output2 = document.getElementById("demo2");
	output2.innerHTML = slider2.value;

	slider2.oninput = function() {
	  output2.innerHTML = this.value;
	  gui.stairs = parseInt(slider2.value); 
	  var speedInput = this.value;
	  console.log("Chosen speed: " + speedInput);
	}

	/****************************************************
		SLIDER 3: Regulate group size maximum
	****************************************************/
	var slider3 = document.getElementById("myGroups");
	var output3 = document.getElementById("demo3");
	output3.innerHTML = slider3.value;

	console.log("value: " + slider3.value);

	slider3.oninput = function() {
	  output3.innerHTML = this.value;
	  gui.groupsize = parseInt(slider3.value); 
	  var groupsizeInput = this.value;
	  console.log("Max size of group: " + groupsizeInput);

	  console.log(gui); 
	}

/*
	function getMaxSize(){
		var slider3 = document.getElementById("myGroups");
		var groupsizeInput = slider3.value;
	 	console.log("Max size of group: " + groupsizeInput);
	 	return groupsizeInput;
	}
*/


