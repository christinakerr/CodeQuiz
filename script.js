// initialize DOM variables
var startButton = document.getElementById("start");
var timerEl = document.getElementById("timer");

// Count starts at 60
var secondsLeft = 60;

// Questions and answers stored in objects nested in an array

var questions = [
    { //Question 1
        question: "Commonly used data types DO NOT include:",
        answer1: "1. strings",
        answer2: "2. booleans",
        correctanswer: "3. alerts",
        answer4: "4. numbers"
    },
    { // Question 2
        question: "The condition in an if / else statement is enclosed within ____.",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        correctanswer: "3. parentheses",
        answer4: "4. square brackets"
    },
    { //Question 3
        question: "Arrays in JavaScript can be used to store ____.",
        answer1: "1. numbers and strings",
        answer2: "2. other arrays",
        answer3: "3. booleans",
        correctanswer: "4. all of the above"
    },
    { // Question 4
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answer1: "1. commas",
        answer2: "2. curly brackets",
        correctanswer: "3. quotes",
        answer4: "4. parentheses"
    },
    { // Question 5
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "1. JavaScript",
        answer2: "2. terminal / bash",
        answer3: "3. for loops",
        correctanswer: "4. console.log"
    }
]

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
