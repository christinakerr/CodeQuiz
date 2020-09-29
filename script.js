// initialize DOM variables
var startButton = document.getElementById("start");
var timerEl = document.getElementById("timer");
var startDiv = document.getElementById("start-screen");
var questionsDiv = document.getElementById("questions");
var endDiv = document.getElementById("endscreen");
var answersDiv = document.getElementById("choices");
var scoreSpan = document.getElementById("finalScore");
var submitButton = document.getElementById("submit");
var highScoreTable = document.getElementById("scoretable");

// Count starts at 75 seconds
var secondsLeft = 75;

var questionIndex = 0;

var highScoreList = [];

// Questions and answers stored in objects nested in an array

var questions = [
    //Question 1
    {
        question: "Commonly used data types DO NOT include:", //0
        answers: ["strings", "booleans", "numbers", "alerts"],
        correctAnswer: "alerts",
    },
    // Question 2
    {
        question:"The condition in an if / else statement is enclosed within ____.", //1
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses",

    },
    //Question 3
    {
        question: "Arrays in JavaScript can be used to store ____.", //2
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    // Question 4
    {
        question: "String values must be enclosed within ____ when being assigned to variables.", //3
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes",
    },
    // Question 5
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:", //4
        answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }
]

function startGame() {
    startDiv.setAttribute("class", "hide");
    questionsDiv.removeAttribute("class");
    startTimer();
    changeQuestions();

}
// Start the timer when start button is clicked
function startTimer() {
    var timeInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
};

// Displaying a new question
function changeQuestions() {
    var currentQuestion = questions[questionIndex];
    var questionDisplay = document.getElementById("questions-title"); // Display question
    questionDisplay.textContent = currentQuestion.question;

    answersDiv.innerHTML = "";

    currentQuestion.answers.forEach(function(answer) {
        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "choice");
        answerButton.setAttribute("value", answer);
        answerButton.textContent = answer;
        answerButton.onclick = questionCheck;
        answersDiv.appendChild(answerButton);
    })
}

function questionCheck() {
    // Check if the choice doesn't match the correct answer
    console.log(this.value);

    if (this.value !== questions[questionIndex].correctAnswer) {
        secondsLeft -= 10;
        alert("Incorrect!");
    } else {
        alert("Correct!");
    }
    questionIndex++;
    if (questionIndex == questions.length) {
        //console.log(questionIndex, this.value, questions[questionIndex].correctAnswer);
        gameOver();
    } else {
        changeQuestions();
    }
}

function gameOver() { // When they go through all the questions or the timer runs out
    
    var finalScore = secondsLeft;
    
    questionsDiv.setAttribute("class", "hide");
    endDiv.removeAttribute("class");
    timerEl.setAttribute("class", "hide");

    scoreSpan.textContent = finalScore;

    submitButton.addEventListener("click", function () {

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

        clearHighScores.addEventListener("click", function () {
            window.localStorage.clear();
        });
    });
}


// Event listener for start button
startButton.addEventListener("click", startGame);
