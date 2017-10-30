/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-09
 
***********************************************************************************************************/

function Group() {
	
	this.ID = -1;

	this.goal = 0; 

	this.stress = gui.stress;
	this.tired = gui.tired;
	this.speed = gui.speed; 
//	console.log(this.speed); 
	this.waitTime = 1;
	
	this.groupSize = 0; 
	this.initialX = 2.5;		//intial x position
	this.initialY = 0;		//initial y position
};

Group.prototype.update = function() {
	// Update stress and tiredness
	this.stressed++;
	this.tired++;
};

var theTime = new Time();
	var hour = theTime.startTime();

// Setup data
function createDataSet(hour) {
    //call function createGroupArray() to create groups, input = hour of the day
    var generatedGroups = createGroupsArray(hour);    
    var nmbrOfGroups = generatedGroups.length;
    var dataset = [];  // Initialize empty array
    var numDataPoints = 60;  // Number of dummy data points

    //xval and yval = the initial position for the dots
    for(var i = 0; i < nmbrOfGroups; i++) {
        var xval = generatedGroups[i].initialX; 
        var yval = generatedGroups[i].initialY; 
        var radius = generatedGroups[i].groupSize *2;       //Tar *2 enbart för att få större prickar
        dataset.push([xval, yval, radius]);  // Add new number to array
    }

    //console.log("data: " + dataset);
   // console.log(dataset); 
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

    draw(this.generatedGroups);
    BehaviorTree.prototype.decision(this.generatedGroups);

    return this.generatedGroups;
} 