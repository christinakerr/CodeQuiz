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
// var initialsInput = document.getElementById("initials");
var highScoresDiv = document.getElementById("highScores");
var clearHighScores = document.getElementById("clear-high-scores");
var viewHighScoresLink = document.getElementById("highscoreslink");
var goBackButton = document.getElementById("go-back");

var storedHighScores = JSON.parse(localStorage.getItem("highScoreList")) || []; // Retrieve old high scores


// Count starts at 75 seconds
var secondsLeft = 75;

var questionIndex = 0;

var highScoreList = {
    name: "",
    score: 0
};

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
        question: "The condition in an if / else statement is enclosed within ____.", //1
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
    highScoresDiv.setAttribute("class", "hide");
    startTimer();
    changeQuestions();

}
// Start the timer when start button is clicked
function startTimer() {
    var timeInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0 && questionIndex !== questions.length) {
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

    currentQuestion.answers.forEach(function (answer) {
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

        userInitials = document.querySelector("#initials").value;
        console.log(userInitials);


        var userScore = {
            initials: userInitials,
            score: finalScore
        };

        storedHighScores.push(userScore);
        storedHighScores.sort(compare);
        localStorage.setItem("highScoreList", JSON.stringify(storedHighScores));

        endDiv.setAttribute("class", "hide");
        highScoresDiv.removeAttribute("class");



        for (var i = 0; i < storedHighScores.length; i++) { // Build high score table
            var row = document.createElement("tr"); // Create row
            var cell = document.createElement("td"); //Create cell
            cell.textContent = (i + 1) + ". " + storedHighScores[i].initials + " " + storedHighScores[i].score; // Display each initial and score
            row.appendChild(cell);
            highScoreTable.appendChild(row);
        }

    })
}

function compare(player1, player2) { // Sort the high scores from highest to lowest
    return player2.score - player1.score;
}

function clearStorage() { // Clear local storage
    localStorage.clear();
}

// When following "View High Scores" link in upper lefthand corner of the page
function viewHighScores() {
    startDiv.setAttribute("class", "hide");
    questionsDiv.setAttribute("class", "hide");
    endDiv.setAttribute("class", "hide");
    highScoresDiv.removeAttribute("class");
    timerEl.setAttribute("class", "hide");
}


// Event listener for start button
startButton.addEventListener("click", startGame);

// Event listener for clear button
clearHighScores.addEventListener("click", clearStorage);

// Event listener for View High Scores link
viewHighScoresLink.addEventListener("click", viewHighScores);

// Event listener for Go Back button
goBackButton.addEventListener("click", startGame);