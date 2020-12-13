//Declare reference variables to HTML
var highscoreBtn = document.getElementById("highscoreBtn");
var timeDisplay = document.getElementById("timeDisplay");
var headerDisplay = document.getElementById("header");
var pText = document.getElementById("pText");
var btnClick = document.getElementById("btnFlavor");
var timeEl = document.getElementById("timer");
//Need to confirm getElementsByClassName works here or switch to getElementsById
var quiz = document.getElementsByClassName("quiz");


//TODO: When the button is clicked, start a timer for 100 seconds and present the first question
    //TODO: Timer should display in top right corner, counting down
    //TODO: Each question should have four multiple choice options, each is a button
    //TODO: When a button is clicked, check the answer corresponding to the button against the correct answer to the question
        //TODO: If the answer is wrong, subtract 10 seconds from the timer
    //TODO: Display the next question and beneath the answers, display whether the previous answer was right or wrong
    //TODO: BONUS: Track the number of right and wrong answers
    console.log(btnClick);

var secondsLeft = 5;

//Initialize and increment timer
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
    if (secondsLeft === 0) {
        clearInterval(timerInterval);
        gameOver();
    }
    console.log(secondsLeft);
    }, 1000);
};

//TODO: Display end of game screen
function gameOver() {

}

btnClick.addEventListener("click", function(event) {
    event.preventDefault();
    setTime();
    console.log('click');
});

//TODO: When timer reaches 0 or all questions have been answered, the quiz ends
//TODO: When the quiz ends, display your score and display input for initals to save the highscore into a list
    //TODO: BONUS: Display the total number of right and wrong answers
    //TODO: BONUS BONUS: Display the questions that were answered wrong and their correct answers against what was answered
//TODO: Display a button to 'Go Back' to the beginning of the quiz and try again
    //TODO: When clicked, takes the user back to the main display to start the quiz again
//TODO: Display a button to 'Clear Highscores'
    //TODO: When clicked, clears the highscores list, otherwise they will be saved for the next time the quiz is finished
//TODO: Button should display in top left corner to view highscores


//TODO: Finish Up
//TODO: Deploy
//TODO: Check errors on deployed site
//TODO: Submit GitHub URL
//TODO: Submit GitHub repo
//TODO: ReadMe
    //TODO: Description
    //TODO: Screenshot
    //TODO: Link