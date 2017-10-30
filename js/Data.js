/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-28

 	Data

 	Functions:
 		- calc()
 		- splitIntoGroups()
 		-

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
}

//Calculate whow many people that actually will go, 70%.
Data.prototype.calc = function(){

	console.log("  --- Dividing people into groups in calc function: ---");

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
	
	var maxSizeOfGroup = gui.groupMaxSize;
	var smallerGroups = [];
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

var theTime = new Time();
var hour = theTime.startTime();

// Setup data
function createDataSet(hour) {

    console.log("  --- Creating dataset from generatedGroups ---");

    //call function createGroupArray() to create groups, input = hour of the day
    this.generatedGroups = createGroupsArray(hour);
    var nmbrOfGroups = generatedGroups.length;
    var dataset = [];  // Initialize empty array
    var numDataPoints = 60;  // Number of dummy data points

    //xval and yval = the initial position for the dots
    for(var i = 0; i < nmbrOfGroups; i++) {
        var xval = this.generatedGroups[i].initialX; 
        var yval = this.generatedGroups[i].initialY; 
        var radius = this.generatedGroups[i].groupSize *2;       //Tar *2 enbart för att få större prickar
        dataset.push([xval, yval, radius]);  // Add new number to array
    }

    return dataset;
}

//Create array of all groups entering Täppan at one specific hour
function createGroupsArray(hour) {

    console.log("  --- Creating groups from data ---");
    
    var data = new Data();  //Get all data from Data
    var ourGroups = [];
    var len = data.dividedGroups[hour-8].length; //all groups at 8:00    
    var nmbrOfGroups = 0;
    this.generatedGroups = [];

    for(i=1; i< len+1; i++) {
        this.generatedGroups.push(new Group());
        nmbrOfGroups = i;
        this.generatedGroups[nmbrOfGroups-1].ID += nmbrOfGroups;
        this.generatedGroups[nmbrOfGroups-1].groupSize = data.dividedGroups[hour-8][nmbrOfGroups-1];
    }
    
    console.log("Generated groups at hour " + hour + ":00 : ");
    console.log(this.generatedGroups);

    //Sends the group information to create the circles (to create correct number and size) on the canvas.
    draw(this.generatedGroups);
    //Sends the group information to the decision tree to decise the circles path. 
    BehaviorTree.prototype.decision(this.generatedGroups);

    return this.generatedGroups;
} 


