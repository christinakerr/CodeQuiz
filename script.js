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
    {   answer1: "strings", //1
        answer2: "booleans",
        correctanswer: "alerts",
        answer4: "numbers"
    },
     // Question 2
        "The condition in an if / else statement is enclosed within ____.", //2
    {   answer1: "quotes", //3
        answer2: "curly brackets",
        correctanswer: "parentheses",
        answer4: "square brackets"
    },
     //Question 3
        "Arrays in JavaScript can be used to store ____.", //4
    {   answer1: "numbers and strings", //5
        answer2: "other arrays",
        answer3: "booleans",
        correctanswer: "all of the above"
    },
     // Question 4
        "String values must be enclosed within ____ when being assigned to variables.", //6
    {   answer1: "commas", //7
        answer2: "curly brackets",
        correctanswer: "quotes",
        answer4: "parentheses"
    },
     // Question 5
        "A very useful tool used during development and debugging for printing content to the debugger is:", //8
    {   answer1: "JavaScript", //9
        answer2: "terminal / bash",
        answer3: "for loops",
        correctanswer: "console.log"
    }
]

// Start the timer when start button is clicked
function startTimer () {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timeInterval);
            gameOver();
        }
        // also clear interval if they reach game over!!
    }, 1000);
}

// Displaying a new question
function changeQuestions () {
    for (var i = 0; i < questions.length; i+=2) {
        headerDiv.innerHTML = ""; // Clear the start page or old question
        bodyDiv.innerHTML = "";
        footerDiv.innerHTML = "<hr />";

        var questionDisplay = document.createElement("h2"); // Display question
        questionDisplay.textContent = questions[i];
        headerDiv.appendChild(questionDisplay);

        var answerList = document.createElement("ul");
        var answerIndex = questions[i+1];

        for (var answerChoice in answerIndex) {
            console.log(answerIndex[answerChoice]);
            var answerLi = document.createElement("li");

            var answerButton = document.createElement("button"); // Only works in firefox, not in chrome
            answerButton.textContent = answerIndex[answerChoice];
            
            answerLi.appendChild(answerButton);
            answerList.appendChild(answerLi);
        };

        bodyDiv.appendChild(answerList);

        alert("If you're seeing this, you did the thing.")
    }
    gameOver();
}

function gameOver () { // When they go through all the questions or the timer runs out
    headerDiv.innerHTML = ""; // Clear the question
    bodyDiv.innerHTML = "";
    footerDiv.innerHTML = "<hr />";

    var allDone = document.createElement("h2");
    allDone.textContent = "All Done!"
    headerDiv.appendChild(allDone);

    var yourFinalScore = document.createElement("p");
    yourFinalScore.textContent = "Your final score is " + secondsLeft;
    bodyDiv.appendChild(yourFinalScore);

    var submitForm = document.createElement("form"); // Create form

    var formLabel = document.createElement("label"); // Create Label
    formLabel.setAttribute("for", "initials");
    formLabel.textContent = "Enter initials: ";

    var textField = document.createElement("input"); // Create input text box
    textField.setAttribute("type", "text");
    textField.setAttribute("id", "initials");

    var submit = document.createElement("button");
    submit.textContent = "Submit";

    submitForm.appendChild(formLabel); // Add to form
    submitForm.appendChild(textField);
    submitForm.appendChild(submit);

    bodyDiv.appendChild(submitForm); // Add to page

    submit.addEventListener("click", highScores);
}

function highScores() {
    headerDiv.innerHTML = ""; // Clear previous screen
    bodyDiv.innerHTML = "";
    footerDiv.innerHTML = "<hr />";

    var highScoreHead = document.createElement("h2"); // Creates "High Scores" heading
    highScoreHead.textContent = "High Scores";
    headerDiv.appendChild(highScoreHead);

    var highScoreTable = document.createElement("table"); // Create the table
    highScoreTable.id = scoretable;

    var row1 = document.createElement("tr"); // Create row
    var cell1 = document.createElement("td"); //Create cell

    cell1.textContent = textField.value + secondsLeft; // Display the user's score


}


// Event listener for start button
startButton.addEventListener("click",() => {
    startTimer();
    changeQuestions();
});
