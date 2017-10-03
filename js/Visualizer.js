/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-10-03

 	Visualize things in the canvas.

 	//Source: Ant simulation.. 

***********************************************************************************************************/


function Visualizer (world, width, height) {
/*	var game = new Phaser.Game(width, height, Phaser.AUTO, 'canvas-id', { preload: preload, create: create, update: update });
	var bmd;
	var bitmapSprite;


	//Colors for background and the groups
	var backgroundColor = rgb(224, 224, 224);
	var groupColor = rgb(0,255,255);
	
	function preload() {
		
	}
	
	function create() {
        bmd = game.add.bitmapData(game.width, game.height);
        bitmapSprite = game.add.sprite(0, 0, bmd);

        var canvasElement = document.getElementsByTagName('canvas')[0];
        canvasElement.style.float = "left";
	}

	function resize(w, h) {
		game.width = w;
		game.height = h;
		game.stage.bounds.width = w;
		game.stage.bounds.height = h;
		bmd.clear(0,0,game.width, game.height);
	}

	function rgb(r,g,b){
		return'rgb(' + r + ',' + g + ',' + b + ')';
	}

	function rgba(r,g,b,a){
		return'rgb(' + r + ',' + g + ',' + b + ',' + a + ')';
	}
	
	function update() {
		bmd.clear(0,0,width, height);
		
		// To decide what to draw
		var drawAnts = document.getElementById('drawAntsCheckBox').checked;

		//Draw BitMapData objects
		bmd.ctx.fillStyle = backgroundColor;
		bmd.ctx.beginPath();
		bmd.ctx.fillRect(0, 0, game.width, game.height);
		bmd.ctx.closePath();
		bmd.ctx.fill();

		var dw = game.width / world.width;
		var dh = game.height / world.height;

		// Draw groups in the world ?
		for (var i = 0; i < world.width; i++) {
			for (var j = 0; j < world.height; j++) {
				var xPos = dw * i - 0.5 * dw;
				var yPos = dh * j - 0.5 * dh;
				for (var k = 0; k < world.groups.length; k++) {		//antColonies --> groups
					// Draw groups
					var groupRadius = game.width / world.width * 0.5;
					bmd.ctx.fillStyle = groupColor;
					bmd.ctx.beginPath();
					bmd.ctx.fillRect(xPos, yPos, dw, dh);
					//bmd.ctx.arc(xPos + 0.5 * dw, yPos + 0.5 * dh, groupRadius, 0, Math.PI*2, true); 	//eggRadius --> groupRadius
					bmd.ctx.closePath();
					bmd.ctx.fill();
				}
			};
		};

		// Draw ants
		if (drawGroups){
			for (var i = 0; i < world.groups.length; i++) {
				var group = world.groups[i];

				var groupRadius = 0.7;
				groupRadius *= game.width / world.width;

				var xPos = dw * group.x;	//ant --> group
				var yPos = dh * group.y;
			
					var directionVector = {
						x: Math.cos(group.angle / 8 * 2*Math.PI),
						y: Math.sin(group.angle / 8 * 2*Math.PI)
					
					// Center piece
					bmd.ctx.fillStyle = groupColor;
					bmd.ctx.beginPath();
					bmd.ctx.arc(xPos, yPos, groupRadius, 0, Math.PI*2, true); 
					bmd.ctx.closePath();
					bmd.ctx.fill();

					/*bmd.ctx.lineWidth = groupRadius;
					bmd.ctx.beginPath();
					bmd.ctx.moveTo(xPos, yPos);
					bmd.ctx.lineTo(xPos + directionVector.x * groupRadius, yPos + directionVector.y * groupRadius);
					bmd.ctx.stroke();	*/
	/*			}
			}
		}
	}*/

}
