/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-28

 	Data

***********************************************************************************************************/

//time - tid mellan 8-17
//avgPeople - antal människor schemalagda i klassrummen per timme i genomsnitt. 

//Prototypes constructor  
function Data(){
	this.avgPeople = [105, 105, 157.5, 157.5, 0, 150, 150, 112.5, 112.5, 112.5]; 
	this.time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
}

var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
var avgPeople= [105, 105, 157.5, 157.5, 0, 150, 150, 112.5, 112.5, 112.5]; 

for (var i = 0; i < avgPeople.length; i++) {
    //Antal personer som faktiskt kommer? 
    avgPeople[i] *=0.7; 
	//Gör till heltal
    avgPeople[i] = Math.floor(avgPeople[i]);  
} 

//console.log(avgPeople);
var dividedGroups = [];
dividedGroups = splitIntoGroups(20);
console.log("Groups to plot: " + dividedGroups);

//Split one bigger number/integer into smaller integers and save in array
//In our case: Split avgPeople into smallerGroups
function splitIntoGroups (totalNmbrPeople) {

	var maxSizeOfGroup = 10;
	var smallerGroups = [];
	console.log("total number: " + totalNmbrPeople);

	while (totalNmbrPeople > 0) {
	  //var s = Math.round(Math.random()*n);
	  //var groupsize = Math.floor(Math.random() * (max - min + 1)) + min; 
	  //var s = Math.round(Math.random() * (totalNmbrPeople - 1)) + 1;

	  //Generate random number between maxSizeOfGroup and 1;
	  var s = Math.round(Math.random() * maxSizeOfGroup) + 1;
	  smallerGroups.push(s);
	  totalNmbrPeople -= s;
	}
	return smallerGroups;
}