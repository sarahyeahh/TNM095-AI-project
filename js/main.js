/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-20

 	Declares variables and include functions representing a decision tree for an elevator-stairs problem.

 	The file includes the functions:
 	- reset()

***********************************************************************************************************/
	//var canvas = document.createElement("canvas");
	var GUI = document.createElement("GUI");
	
	//Declare variables
	var nmbrOfElevators = 0;			//Borde vara i constructor
	//var isEmpty = true; 
	//var freeSpaces = 0; //som en count	
	//var group = 0; 
	//var capacity = 0; 	
	//var elevatorPeople = 0; 
	var elevatorID = -1; 				//Sätt in i en constructor! 
	//var allElevators = [];


//Exempel på vad som kan hämtas till de olika klasserna från index.html
	/*var world = new World(800, 600);
	var simulator = new Simulator(world);
	var visualizer = new WorldVisualizer(world);
	var statsMonitor = new StatsMonitor(world, document.body);*/

	//var world = new World(200, 100); 

	implement(); 

//Prototype constructor (not used yet)
	function start(){
		this.isEmpty = true; 
		this.freeSpaces = 0; //som en count
		this.group = 0; 
		this.capacity = 0; 
		this.elevatorPeople = 0; 
		this.elevatorID = -1;
		this.allElevators = [];
	}

	//Reset the application by restarting everything
	function reset(){

		implement(); 
		console.log("**********STARTAR OM*************"); 
	}


	



	 



	
