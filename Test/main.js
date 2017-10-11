    



    var load = document.getElementById("load");
    load.onload = (event) => {
   		console.log("Hej");
       // new AStarFinder.prototype.findPath();
        var start = 0; 
        var goal = 9; 
        Astar(start, goal); 
    }
