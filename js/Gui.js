/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for the GUI.

***********************************************************************************************************/


	/****************************************************
		SLIDER 1: Regulate number of elevators
	****************************************************/
	var slider = document.getElementById("myElevators");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;
	
	slider.oninput = function() {
	  output.innerHTML = this.value;
	  var elevatorInput = this.value;
	  console.log("Chosen number of elevators: " + elevatorInput);
	}

	/****************************************************
		SLIDER 2: Regulate speed
	****************************************************/
	var slider2 = document.getElementById("mySpeed");
	var output2 = document.getElementById("demo2");
	output2.innerHTML = slider2.value;

	slider2.oninput = function() {
	  output2.innerHTML = this.value;
	  getSpeed(this.value); 
	}

	/****************************************************
		SLIDER 3: Regulate group size
	****************************************************/
	var slider3 = document.getElementById("myGroups");
	var output3 = document.getElementById("demo3");
	output3.innerHTML = slider3.value;

	slider3.oninput = function() {
	  output3.innerHTML = this.value;
	  var groupsizeInput = this.value;
	  console.log("Max size of group: " + groupsizeInput);
	}

