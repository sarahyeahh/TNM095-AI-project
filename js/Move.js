/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-29

 	File with functions related to the movelogic of the people. 

 	The file includes the functions:


***********************************************************************************************************/


//Cases, move right or left. 
//Movement should depend on the decision tree whether the group choose the elevator or the stairs. 

//Not done yet!
var Move = {

	moveForward: function(movable) {
		switch(movable.angle) {
		    case 0:
		        movable.x++;
		        break;
		    case 1:
		        movable.x++;
		        movable.y++;
		        break;
		}
	},

	moveLeft: function(movable) {
		movable.angle--;
		if (movable.angle < 0)
			movable.angle = 7;
		return;
	},

	moveRight: function(movable) {
		movable.angle++;
		if (movable.angle > 7)
			movable.angle = 0;
		return;
	},

}