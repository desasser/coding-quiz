//Declare reference variables to HTML
var highscoreBtn = document.getElementById("highscoreBtn");
var timeDisplay = document.getElementById("timeDisplay");
var headerDisplay = document.getElementById("header");
var pText = document.getElementById("pText");
var btnClick = document.getElementById("btnFlavor");
var timeEl = document.getElementById("timer");
var answersEl = document.getElementById("answers");
//Need to confirm getElementsByClassName works here or switch to getElementsById
var quiz = document.getElementsByClassName("quiz");

// TODO: BONUS BONUS BONUS: Make this work with an object
// var objectQA = {
//     "Q1": ["Q1A1, Q1A2, Q1A3, Q1A4"],
//     "Q2": ["Q2A2, Q2A2, Q2A3, Q2A4"],
//     "Q3": ["Q3A3, Q3A2, Q3A3, Q3A4"],
//     "Q4": ["Q4A4, Q4A2, Q4A3, Q4A4"]
//  }
// console.log(objectQA.Q1);
// console.log("length", objectQA.Q1.length);
// for (var i = 0; i < objectQA.Q1.length; i++) {
//    var test = objectQA.Q1
//    console.log('Entry', i, test);   
// }

//When the button is clicked, start a timer for 100 seconds and present the first question
    //Timer should display in top right corner, counting down
    
    //TODO: When a button is clicked, check the answer corresponding to the button against the correct answer to the question
        //TODO: If the answer is wrong, subtract 10 seconds from the timer
    //TODO: Display the next question and beneath the answers, display whether the previous answer was right or wrong
    //TODO: BONUS: Track the number of right and wrong answers

var secondsLeft = 5;
var btnCounter = 0;


//Initialize and increment timer
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeDisplay.textContent = "Time: " + secondsLeft;
        //better way to style this by referencing the css sheet somehow?
        timeDisplay.style.fontFamily = "Arial, Helvetica, sans-serif";
        timeDisplay.style.fontSize = "18px";
        timeDisplay.style.fontWeight = "bold";
        
    if (secondsLeft === 0) {
        clearInterval(timerInterval);
        gameOver();
    };
    }, 1000);
};

//TODO: Each question should have four multiple choice options, each is a button
"Commonly used data types do not include", "strings, boolean, numbers, alerts"
"In Javascript, what symbol do you need at the end of each line", ": ; } none"
"Which of the below is not an event listener", "click, submit, keydown, right-click"
"Objects in javascript are used to store what kind of data", "Paired Data, Alphabets, Zoo Animals, People's Souls"

var questionArr = ["Commonly used data types do not include:", "In Javascript, what symbol do you need at the end of each line?", "Which of the below is not an event listener:", "Objects in javascript are used to store what kind of data?"];

var answersOne = ["strings", "boolean", "numbers", "alerts"];
var answersTwo = [":",  ";", "}", "none"];
var answersThree = ["click", "submit", "keydown", "right-click"];
var answersFour = ["Paired Data", "Alphabets", "Zoo Animals", "People's Souls"];
var answerArr = [answersOne, answersFour, answersThree, answersFour];


// var question1 = "this is my question"
// var answers1 = ["answer1 answer2 answer3 answer4"]

// if (buttonClickedOn === "Daniel") {
//     go on to the next question
// } else {
//     timer = -10seconds;
// }


//TODO: Display end of game screen
function gameOver() {
    headerDisplay.textContent = "Game Over";
    btnClick.style.display = "none";
}

//TODO: Clear the previous screen and post the next question with answers
function nextQuestion(index) {
    if (index < questionArr.length) {
        headerDisplay.textContent = questionArr[index];
        headerDisplay.style.fontSize = "30px";
        pText.textContent = "";
        btnClick.style.display = "none";
        //TODO: Change this block to loop through an array containing arrays
        
        //Index is the indicator for the question and answer set
        //So I want to access answerArr[index] and render the answers
        
        for (var i = 0; i < answerArr.length; i++) {
            var liEl = document.createElement("li");
            // liEl.textContent = i+1 + ". " + answersOne[i];
            console.log(liEl);
            var buttonToo = document.createElement("button");
            buttonToo.textContent = i+1 + ". " + answersOne[i];
    
            //TODO: BONUS BONUS BONUS: Can I call a css style here? Set Attribute?
            buttonToo.style.backgroundColor = "#bada55";
            buttonToo.style.fontSize = "20px";
            buttonToo.style.margin = "5px";
            buttonToo.style.height = "50px";
            buttonToo.style.width = "150px";
            buttonToo.style.borderRadius = "0.25em";
            buttonToo.style.border = "none";
            buttonToo.style.textAlign = "left";
    
            liEl.appendChild(buttonToo);
            answersEl.appendChild(liEl);    
        } 
    } else {
        gameOver();
    }
}

btnClick.addEventListener("click", function(event) {
    event.preventDefault();
    timeDisplay.textContent = "Time: " + secondsLeft;
    timeDisplay.style.fontFamily = "Arial, Helvetica, sans-serif";
    timeDisplay.style.fontSize = "18px";
    timeDisplay.style.fontWeight = "bold";
    setTime();
    //Wipe off the screen when clicked
    nextQuestion(btnCounter);
    btnCounter++;
    console.log(btnCounter);
});

answersEl.addEventListener("click", function(event) {
    event.preventDefault();

    //Wipe off the screen when clicked
    nextQuestion(btnCounter);
    btnCounter++;
    console.log(btnCounter);
});


//TODO: When timer reaches 0 or all questions have been answered, the quiz ends
//TODO: When the quiz ends, display your score and display input for initals to save the highscore into a list
    //TODO: BONUS: Display the total number of right and wrong answers
    //TODO: BONUS BONUS: Display the questions that were answered wrong and their correct answers against what was answered
//TODO: Display a button to 'Go Back' to the beginning of the quiz and try again
    //TODO: When clicked, takes the user back to the main display to start the quiz again
//TODO: Display a button to 'Clear Highscores'
    //TODO: When clicked, clears the highscores list, otherwise they will be saved for the next time the quiz is finished


//TODO: Button should display in top left corner and direct to view highscores
highscoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log('click');

})


//TODO: Finish Up
//TODO: Deploy
//TODO: Check errors on deployed site
//TODO: Submit GitHub URL
//TODO: Submit GitHub repo
//TODO: ReadMe
    //TODO: Description
    //TODO: Screenshot
    //TODO: Link