// initialize DOM variables
var startButton = document.getElementById("start");
var timerEl = document.getElementById("timer");

var secondsLeft = 60;

function startTimer () {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}


// Event listener for start button
startButton.addEventListener("click", startTimer)
