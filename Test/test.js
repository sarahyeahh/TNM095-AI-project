
var openSet = []
var closedSet = []; 

Grid.prototype.getNodeAt = function(x, y) {
    return this.nodes[y][x];
};

function Astar(start, goal) {

console.log(openSet.length);
	while(openSet.length> 0 ){

console.log("hhhehehe");
		//Take the lowest f-value, therefore openSet should be sorted. 
		current = openSet.pop(); //Set of nodes. 

		if(current == goal){
			return reconstruct_path(current); 
		}

		closedSet.push(current); 

		console.log(closedSet); 

		neighbors = getNeighbors(current);

		//For each neighbor of current. 
		for (var i = 0; i < neighbors.length; i++) {
			
			neighbor = neighbors[i];
			//If it is found, continue. 
			if(neighbors == closedSet){
				//continue
				i++;
			}
			//Not found
			else{
				openSet.push(neighbor); 
			}

			//Distance from start to a neighbor
			temp_gScore = gscore[current] + dist_between( current, neighbor); 

			if(temp_gScore >= gScore[neighbor]){
				//continue, not a better path.
				i++; 
			}

			current[neighbor] = current; 
			gScore[neighbor] = temp_gScore; 
			fScore[neighbor] = gScore[neighbor] + hScore(neighbor, goal); 


	
		}
		
	}

	return [];
}


//Find the neighbors for the current grid. 
function getNeighbors(node) {
    
    var x = node.x,
        y = node.y,
        neighbors = [],
        s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false,
        nodes = this.nodes;

    // ↑
    if (this.isWalkableAt(x, y - 1)) {
        neighbors.push(nodes[y - 1][x]);
        s0 = true;
    }
    // →
    if (this.isWalkableAt(x + 1, y)) {
        neighbors.push(nodes[y][x + 1]);
        s1 = true;
    }
    // ↓
    if (this.isWalkableAt(x, y + 1)) {
        neighbors.push(nodes[y + 1][x]);
        s2 = true;
    }
    // ←
    if (this.isWalkableAt(x - 1, y)) {
        neighbors.push(nodes[y][x - 1]);
        s3 = true;
    }

     return neighbors;

    /*

    if (diagonalMovement === DiagonalMovement.OnlyWhenNoObstacles) {
        d0 = s3 && s0;
        d1 = s0 && s1;
        d2 = s1 && s2;
        d3 = s2 && s3;
    } else if (diagonalMovement === DiagonalMovement.IfAtMostOneObstacle) {
        d0 = s3 || s0;
        d1 = s0 || s1;
        d2 = s1 || s2;
        d3 = s2 || s3;
    } else if (diagonalMovement === DiagonalMovement.Always) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    } else {
        throw new Error('Incorrect value of diagonalMovement');
    }

    // ↖
    if (d0 && this.isWalkableAt(x - 1, y - 1)) {
        neighbors.push(nodes[y - 1][x - 1]);
    }
    // ↗
    if (d1 && this.isWalkableAt(x + 1, y - 1)) {
        neighbors.push(nodes[y - 1][x + 1]);
    }
    // ↘
    if (d2 && this.isWalkableAt(x + 1, y + 1)) {
        neighbors.push(nodes[y + 1][x + 1]);
    }
    // ↙
    if (d3 && this.isWalkableAt(x - 1, y + 1)) {
        neighbors.push(nodes[y + 1][x - 1]);
    }

    return neighbors;*/
}

function backtrace(current) {
    var path = [[current.x, current.y]];
    while (current.parent) {
        current = current.parent;
        path.push([current.x, current.y]);
    }
    return path.reverse();
}