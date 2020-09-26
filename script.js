// initialize DOM variables
var startButton = document.getElementById("start");
var timerEl = document.getElementById("timer");
var headerDiv = document.getElementById("col-head");
var bodyDiv = document.getElementById("col-body");
var footerDiv = document.getElementById("col-foot");

// Count starts at 60 seconds
var secondsLeft = 60;

// Questions and answers stored in objects nested in an array

var questions = [
     //Question 1
        "Commonly used data types DO NOT include:", //0
    {   answer1: "1. strings", //1
        answer2: "2. booleans",
        correctanswer: "3. alerts",
        answer4: "4. numbers"
    },
     // Question 2
        "The condition in an if / else statement is enclosed within ____.", //2
    {   answer1: "1. quotes", //3
        answer2: "2. curly brackets",
        correctanswer: "3. parentheses",
        answer4: "4. square brackets"
    },
     //Question 3
        "Arrays in JavaScript can be used to store ____.", //4
    {   answer1: "1. numbers and strings", //5
        answer2: "2. other arrays",
        answer3: "3. booleans",
        correctanswer: "4. all of the above"
    },
     // Question 4
        "String values must be enclosed within ____ when being assigned to variables.", //6
    {   answer1: "1. commas", //7
        answer2: "2. curly brackets",
        correctanswer: "3. quotes",
        answer4: "4. parentheses"
    },
     // Question 5
        "A very useful tool used during development and debugging for printing content to the debugger is:", //8
    {   answer1: "1. JavaScript", //9
        answer2: "2. terminal / bash",
        answer3: "3. for loops",
        correctanswer: "4. console.log"
    }
]

// Start the timer when start button is clicked
function startTimer () {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Displaying a new question
function changeQuestions () {
    for (var i = 0; i < questions.length; i+=2) {
        headerDiv.innerHTML = ""; // Clear the start page or old question
        bodyDiv.innerHTML = "";
        footerDiv.innerHTML = "";

        var questionDisplay = document.createElement("h2"); // Display question
        questionDisplay.textContent = questions[i];
        headerDiv.appendChild(questionDisplay);

        var answerList = document.createElement("ul");
        var answerIndex = questions[i+1];

        for (var answerChoice in answerIndex) {
            var answerLi = document.createElement("li");
            var answerButton = document.createElement("button");
            answerButton.textContent = answerChoice;
             // console.log(answerIndex.answerChoice);  HOW TO ACCESS EACH ANSWER WITHIN THE OBJECT WITHIN THE ARRAY
            answerLi.appendChild(answerButton);
            answerList.appendChild(answerLi);
        }

        bodyDiv.appendChild(answerList);

        alert("If you're seeing this, you did the thing.")

    }
}


// Event listener for start button
startButton.addEventListener("click",() => {
    startTimer();
    changeQuestions();
});
