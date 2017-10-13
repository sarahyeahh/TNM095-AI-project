
function Start(world){


	this.world = world;
     

	console.log(this.world); 

};
/*
function Simulator (world) {
	this.world = world;
	this.updatesPerWait = 1;

	for (var i = 0; i < 1; i++) {
		var pos = world.getRandomPosition();
		var foodSpawner = new FoodSpawner(world, pos.x, pos.y, 200, 10);
		world.foodSpawners.push(foodSpawner);
	}

	for (var i = 0; i < 5; i++) {
		var a = Agent.prototype.createAtRandomPosition(world);
		world.agents.push(a);
	}

	for (var i = 0; i < 10; i++) {
		var pos = world.getRandomPosition();
		world.foods.push(new Food(world, pos.x, pos.y));
	};

};*/