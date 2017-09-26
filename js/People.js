/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-26

 	File for functions related to the people.

 	The file includes the functions:
 	- generatePeople()

***********************************************************************************************************/

	//Generate a group of people
	function generatePeople(){

		var max = 10; 
		var min = 1; 
		var group = Math.floor(Math.random() * (max - min + 1)) + min; 

		//Display number of people that wants to enter the elevator
		document.getElementById("group").innerHTML = "Antal personer som vill gå in i hissen: " + "<b>" + group + "</b>";  
		
		return group; 

	}

