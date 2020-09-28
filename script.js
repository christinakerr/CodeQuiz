// initialize DOM variables
var startButton = document.getElementById("start");
var timerEl = document.getElementById("timer");
var headerDiv = document.getElementById("col-head");
var bodyDiv = document.getElementById("col-body");
var footerDiv = document.getElementById("col-foot");

// Count starts at 60 seconds
var secondsLeft = 60;


var highScoreList = [];

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
        var answer = i + 1; // NOt working!!
        var answerIndex = questions[answer];

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
    submit.setAttribute("type", "submit");

    submitForm.appendChild(formLabel); // Add to form
    submitForm.appendChild(textField);
    submitForm.appendChild(submit);

    bodyDiv.appendChild(submitForm); // Add to page

    submit.addEventListener("click", function() {

        headerDiv.innerHTML = ""; // Clear previous screen
        bodyDiv.innerHTML = "";
        footerDiv.innerHTML = "<hr />";

        var highScoreHead = document.createElement("h2"); // Creates "High Scores" heading
        highScoreHead.textContent = "High Scores";
        headerDiv.appendChild(highScoreHead);

        var highScoreTable = document.createElement("table"); // Create the table
        highScoreTable.setAttribute("id", "scoretable");

        var storedHighScores = JSON.parse(localStorage.getItem("highScoreList")); // Retrieve old high scores

        if (storedHighScores !== null) { // When there's scores already saved

        
            var userScore = [textField.value, secondsLeft];
            var allHighScores = storedHighScores + userScore;
            console.log(userScore);
            console.log(allHighScores);

            // Sort them???

            for (var i = 0; i < allHighScores.length; i++) {
                var row = document.createElement("tr"); // Create row
                var cell = document.createElement("td"); //Create cell
                cell.textContent = (i + 1) + ". " + allHighScores[i][0] + allHighScores[i][1]; // Display each initial and score
                row.appendChild(cell);
                highScoreTable.appendChild(row);
            }
            
            localStorage.setItem("highScoreList", JSON.stringify(allHighScores)); // Save all high scores for later

            
        } else { // When there are no scores saved yet
            var userScore = [textField.value, secondsLeft];
            var row = document.createElement("tr"); // Create row
            var cell = document.createElement("td"); //Create cell
            cell.textContent = userScore; // Display each initial and score
            row.appendChild(cell);
            highScoreTable.appendChild(row);

            localStorage.setItem("highScoreList", JSON.stringify(allHighScores)); // Save user high score for later

        }
        var goBack = document.createElement("button"); // Go back button
        goBack.textContent = "Go Back";

        var clearHighScores = document.createElement("button");
        clearHighScores.textContent = "Clear High Scores";

        clearHighScores.addEventListener("click", function() {
            window.localStorage.clear();
        });
    });
}


// Event listener for start button
startButton.addEventListener("click",() => {
    startTimer();
    changeQuestions();
});
