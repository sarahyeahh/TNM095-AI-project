/**********************************************************************************************************
 	Authors:  Sarah Fosse and Hanna Johansson
 	Date: Created 2017-09-28

 	Data

***********************************************************************************************************/

//time - tid mellan 8-17
//avgPeople - antal människor schemalagda i klassrummen per timme i genomsnitt. 
var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
var avgPeople= [105, 105, 157.5, 157.5, 0, 150, 150, 112.5, 112.5, 112.5]; 


for (var i = 0; i < avgPeople.length; i++) {
    //Antal personer som faktiskt kommer? 
    avgPeople[i] *=0.7; 
	//Gör till heltal
    avgPeople[i] = Math.floor(avgPeople[i]);  
} 

//console.log(avgPeople);

//TODO
//Dela in antalet personer i grupper.