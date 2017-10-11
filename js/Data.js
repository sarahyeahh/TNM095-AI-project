/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-28

 	Data

***********************************************************************************************************/

//time - tid mellan 8-17
//avgPeople - antal människor schemalagda i klassrummen per timme i genomsnitt. 

//Prototypes constructor  
function Data(){
	this.dividedGroups = [];

	this.avgPeople = [105, 105, 157.5, 157.5, 0, 150, 150, 112.5, 112.5, 112.5]; 
	this.time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

	this.calc();
}

Data.prototype.calc = function(){

	for (var i = 0; i < this.avgPeople.length; i++) {
	    //Antal personer som faktiskt kommer? 
	    this.avgPeople[i] *=0.7; 
		//Gör till heltal
	    this.avgPeople[i] = Math.floor(this.avgPeople[i]);  

	    this.dividedGroups.push(this.splitIntoGroups(this.avgPeople[i]));
	} 

	console.log(this.dividedGroups);	

	return this.dividedGroups; 
}

<<<<<<< HEAD
//console.log(avgPeople);
var dividedGroups = [];
dividedGroups = splitIntoGroups(50);
console.log("Groups to plot: " + dividedGroups);
=======
>>>>>>> 838e6d81eaef9756ab19cb4b81846ab8c78f424c

//Split one bigger number/integer into smaller integers and save in array
//In our case: Split avgPeople into smallerGroups
//function splitIntoGroups (totalNmbrPeople) {
Data.prototype.splitIntoGroups = function(totalNmbrPeople){
	
	var maxSizeOfGroup = 10;
	var smallerGroups = [];
	console.log("total number: " + totalNmbrPeople);

	while (totalNmbrPeople > 0) {
	  //Generate random number between maxSizeOfGroup and 1;
	  var s = Math.round(Math.random() * maxSizeOfGroup) + 1;
	  smallerGroups.push(s);
	  totalNmbrPeople -= s;
	}
	return smallerGroups;
}


