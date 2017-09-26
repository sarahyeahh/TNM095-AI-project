/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for functions related to the people.

 	The file includes the functions:
 	- generatePeople()

***********************************************************************************************************/


/*	constructor(width, height, color, x, y, canvas) {

		this.canvas = canvas;
		this.width = width;
		this.height = height;
		//this.speed = 2; //Stress
		this.color = color;
	//	this.addListeners();
		//this.ctx = this.canvas.context;
	
		//this.currentGridSection = -1;
		//this.nextGridSectionIndex = -1;
		this.position = {
		    x: x,
		    y: y
		};

	}*/

	//Generate a group of people
	function generatePeople(){

		var max = 10; 
		var min = 1; 
		var group = Math.floor(Math.random() * (max - min + 1)) + min; 

		//Display number of people that wants to enter the elevator
		document.getElementById("group").innerHTML = "Antal personer som vill gå in i hissen: " + "<b>" + group + "</b>";  
		
		return group; 

	}

	

