
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