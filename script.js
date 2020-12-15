//Declare reference variables to HTML
var highscoreBtn = document.getElementById("highscoreBtn");
var timeDisplay = document.getElementById("timeDisplay");
var headerDisplay = document.getElementById("header");
var pText = document.getElementById("pText");
var btnClick = document.getElementById("button-click");
var timeEl = document.getElementById("timer");
var answersEl = document.getElementById("answers");
var feedbackEl = document.getElementById("feedback");
//broken?
var quiz = document.getElementsByClassName("quiz");

//Declare question arrays
var questionArr = ["Commonly used data types do not include:", "In Javascript, what symbol do you need at the end of each line?", "Which of the below is not an event listener:", "Objects in javascript are used to store what kind of data?"];

//Declare answer arrays
var answersOne = ["strings", "numbers", "alerts", "boolean"];
var answersTwo = [":", "none", "}", ";"];
var answersThree = ["click", "submit", "keydown", "right-click"];
var answersFour = ["Paired Data", "Alphabets", "Zoo Animals", "People's Souls"];
var answerArr = [answersOne, answersTwo, answersThree, answersFour];
var correctAnswers = ["alerts", "none", "right-click", "paired data"]

//Declare p-tag for answer feedback and tracking
var newP = document.createElement("p");
var newRule = document.createElement("hr");

//Declare counters
var answerCount = 0;
var secondsLeft = 60;
var btnCounter = 0;

//Initialize and increment timer
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeDisplay.textContent = "Time: " + secondsLeft;

        timeDisplay.setAttribute("id", "timeDisplay");

        //When timer reaches 0, the quiz ends
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            gameOver();
        };
    }, 1000);
};

//TODO: Display end of game screen
//TODO: Stop timer and display remainder as score
function gameOver() {
    headerDisplay.textContent = "Game Over!";
    answersEl.textContent = "";
    pText.textContent = "Your Score: " + secondsLeft;
    //Turn off hr and answer feedback
    newRule.style.visibility = "hidden";
    newP.style.visibility = "hidden";
    //TODO: can I set position here?
    pText.setAttribute("id", "timeDisplay");
    //TODO: Stop timer and clear
    // clearInterval(timerInterval);
    // timeDisplay.textContent = "";


    //TODO: Format to -- Your Initials: Input
    var newInput = document.createElement("input");
    newInput.setAttribute('type', 'text');
    feedbackEl.textContent = "Your Initials: ";
    feedbackEl.appendChild(newInput);
}

//Clear the previous screen and post the next question with answers
function nextQuestion(index) {
    //If all questions have been answered, the quiz ends
    if (index < questionArr.length) {
        headerDisplay.textContent = questionArr[index];
        headerDisplay.style.fontSize = "30px";
        pText.textContent = "";
        btnClick.style.display = "none";
        answersEl.textContent = "";
        //Change this block to loop through an array containing arrays

        //Index is the indicator for the question and answer set
        //So I want to access answerArr[index] and render the answers
        //Create buttons
        for (var i = 0; i < answerArr[index].length; i++) {
            var liEl = document.createElement("li");
            // liEl.textContent = i+1 + ". " + answersOne[i];
            // console.log(liEl);
            var currentAnswers = answerArr[index];
            var buttonToo = document.createElement("button");
            buttonToo.textContent = i + 1 + ". " + currentAnswers[i];
            // buttonToo.setAttribute("value", answerArr[i]);

            buttonToo.setAttribute("class", "btnFlavor")


            liEl.appendChild(buttonToo);
            answersEl.appendChild(liEl);
        }
    } else {
        gameOver();
    }
}

btnClick.addEventListener("click", function (event) {
    event.preventDefault();
    timeDisplay.textContent = "Time: " + secondsLeft;
    timeDisplay.setAttribute("id", "timeDisplay");
    setTime();
    //Wipe off the screen when clicked
    nextQuestion(btnCounter);
    btnCounter++;
    // console.log(btnCounter);
});


//TODO: Click buttons not list
answersEl.addEventListener("click", function (event) {
    event.preventDefault();

    //TODO: Display the next question and beneath the answers, display whether the previous answer was right or wrong    
    //Conditional to evaluate right or wrong answer
    //TODO: How do I target the button clicked?
    // for (let i = 0; i < correctAnswers.length; i++) {
    //     var newDiv = document.createElement("div");
    //     if (correctAnswers[i].matches(this)) {
    //         newDiv.textContent = "Correct!";
    //     } else {
    //         newDiv.textContent = "Wrong!";
    //     }        
    // }

    //If button is clicked, then proceed
    var element = event.target;

    if (element.matches("button") === true) {
        //TODO: Improve the efficiency of this code?
        //Checks the answer from the user clicking the button against the answer array
        var checkAnswer = event.target.textContent.split(" ")[1];
        // console.log(checkAnswer);
        if (checkAnswer === correctAnswers[btnCounter - 1]) {
            answerCount++;
            newP.textContent = `Correct! You have answered ${answerCount} questions correctly!`;
        } else {
            secondsLeft -= 10;
            newP.textContent = `Wrong! You have answered ${answerCount} questions correctly!`;
        }
        // console.log("Button Value", event.target.textContent);
        //Wipe off the screen when clicked and update with next question or gameover screen
        nextQuestion(btnCounter);
        btnCounter++;
        //Append feedback on correct or wrong answers below the answer list
        feedbackEl.appendChild(newRule);
        feedbackEl.appendChild(newP);
        // console.log('Button Counter', btnCounter);
    }
});

//TODO: Button should display in top left corner and direct to view highscores
highscoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log('click');

})

//TODO: When the quiz ends, display your score and display input for initals to save the highscore into a list
//TODO: BONUS: Display the total number of right and wrong answers
//TODO: BONUS BONUS: Display the questions that were answered wrong and their correct answers against what was answered
//TODO: Display a button to 'Go Back' to the beginning of the quiz and try again
//TODO: When clicked, takes the user back to the main display to start the quiz again
//TODO: Display a button to 'Clear Highscores'
//TODO: When clicked, clears the highscores list, otherwise they will be saved for the next time the quiz is finished

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

//TODO: BONUS: Track the number of right and wrong answers

//TODO: Finish Up
//TODO: Deploy
//TODO: Check errors on deployed site
//TODO: Submit GitHub URL
//TODO: Submit GitHub repo
//TODO: ReadMe
    //TODO: Description
    //TODO: Screenshot
    //TODO: Link

