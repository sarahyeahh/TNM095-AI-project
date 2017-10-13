
function Time() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.counter;
    this.stop;
    this.started;
    this.counting = false;
}

Time.prototype.startTimer = function() {
    counter = document.getElementById('counter');
    stop = document.getElementById('stop');
    stop.onclick = function () {
        counting = false;
    }
    started = document.getElementById('start');
    start.onclick = function() {
        counting = true;
        timer();
        console.log("Start nedtryckt")
    }

    counting = true;
    displayTime();
}

Time.prototype.displayTime = function() {
    console.log("Time is displayed");
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes >= 60) {
        hours++;
        minutes = 0;
    }
    counter.innerHTML = hours + ":" + minutes + ":" + seconds;
    if (counting) {
        seconds++;
        setTimeout(timer, 1000);
    }
}

Time.prototype.startTime = function() {
    console.log("Time started");
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = Time.prototype.checkTime(m);
    s = Time.prototype.checkTime(s);
    document.getElementById('counter').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

Time.prototype.checkTime = function(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}