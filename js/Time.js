
function Time() {
    this.hour;
}

/*_______________________

    Test1: Clock
_________________________*/

Time.prototype.startTime = function() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = Time.prototype.checkTime(m);
    s = Time.prototype.checkTime(s);
    document.getElementById('counter').innerHTML = h + ":" + m; // + ":" + s;
    var t = setTimeout(function(){ 
            Time.prototype.startTime();}, 500);

    //hour should always be a value within the range 8-17
    if(h>7 && h<18){
        this.hour = h;
    }
    else if (h>17){
        this.hour = h-7;
    }
    else if (h<0 && h<8){
        this.hour = h+7;
    }

    return this.hour;
}

Time.prototype.checkTime = function(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

/*_______________________

    Test2: Timer
_________________________*/

/*
Time.prototype.startTimer = function() {
    counter = document.getElementById('counter2');
    stop = document.getElementById('stop');
    stop.onclick = function () {
        counting = false;
        console.log("Stop nedtryckt");
    }
    started = document.getElementById('start');
    start.onclick = function() {
        counting = true;
        Time.prototype.displayTime();
        console.log("Start nedtryckt");
    }

    counting = true;
    Time.prototype.displayTime();
}

Time.prototype.displayTime = function() {
    if (this.seconds >= 60) {
        this.minutes++;
        this.seconds = 0;
    }
    if (this.minutes >= 60) {
        this.hours++;
        this.minutes = 0;
    }
    counter.innerHTML = this.hours + ":" + this.minutes + ":" + this.seconds;
    if (counting) {
        this.seconds++;
        setTimeout(function(){ 
            Time.prototype.displayTime();}, 1000);
        }
}
*/


