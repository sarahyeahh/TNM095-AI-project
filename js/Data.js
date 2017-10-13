/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-28

 	Data

***********************************************************************************************************/

//time - tid mellan 8-17
//avgPeople - antal människor schemalagda i klassrummen per timme varje dag i genomsnitt. 

//Prototypes constructor  
function Data(){
	this.dividedGroups = [];
	this.avgPeople = [105, 105, 157.5, 157.5, 0, 150, 150, 112.5, 112.5, 112.5]; 
	this.avgPeopleLength = this.avgPeople.length;
	this.time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

	this.calc();

	//this.theTime = new Time();	?
	//this.hour = this.theTime.startTime();	?

}

//Calculate whow many people that actually will go, 70%.
Data.prototype.calc = function(){

	console.log("  --- Dividing people into groups in calc function: ---");
	//console.log("i funktionen calc: ");
	//console.log(this.avgPeople);

	for (var i = 0; i < this.avgPeopleLength; i++) {
	    
	    //Antal personer som faktiskt kommer? 
	    this.avgPeople[i] *= 0.7;

		//Gör till heltal
	    this.avgPeople[i] = Math.floor(this.avgPeople[i]);  

	    this.dividedGroups.push(this.splitIntoGroups(this.avgPeople[i], this.time[i]));
	
	} 

	return this.dividedGroups; 
}

//Split one bigger number/integer into smaller integers and save in array
//In our case: Split avgPeople into smallerGroups
//function splitIntoGroups (totalNmbrPeople) {
Data.prototype.splitIntoGroups = function(totalNmbrPeople, hour){
	
	//var maxSizeOfGroup = 10; //Group.prototype.getMaxSize(); 
	var maxSizeOfGroup = gui.groupMaxSize;
	var smallerGroups = [];
	//console.log("total number: " + totalNmbrPeople);

	var tempTotal = totalNmbrPeople;
	var singleFactor = 1;
	var pairFactor = 1;

	//How big the generated groups are depends on the hour of the day
	if(hour == 8){
		singleFactor = 0.5; //50% come alone at 8:00
		pairFactor = 0.3; 	//30% come in pairs at 8:00
	}
	else if (hour == 9) {
		singleFactor = 0.6; //60% come alone at 9:00
		pairFactor = 0.1; 	//10% come in pairs at 9:00
	}

	//Divide the total number of people into smaller groups
	while (totalNmbrPeople > 0) {
		
		//Smaller "groups" consisting of only one singel person
		while(totalNmbrPeople > tempTotal*singleFactor) {	
  			var s = 1;
  			smallerGroups.push(s);
  			totalNmbrPeople -= s;
		}

		//People coming in pairs
		while(totalNmbrPeople < tempTotal*singleFactor && totalNmbrPeople > tempTotal*pairFactor) {		
			var s = 2;
  			smallerGroups.push(s);
  			totalNmbrPeople -= s;
		}

		//Generate random number between maxSizeOfGroup and 1;
	  	var s = Math.round(Math.random() * maxSizeOfGroup) + 1;		//The rest comes in random groups
	  	smallerGroups.push(s);
	  	totalNmbrPeople -= s;	  
	}

	return smallerGroups;
}


