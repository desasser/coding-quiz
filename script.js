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
var questionArr = ["Which of the below heroes is not from Damacia?", "Who freed Sylas from the mageseeker compound?", "What race are Veigar, Rumble, and Poppy?", "Where is Miss Fortune from?"];

//Declare answer arrays
var answersOne = ["Fiora", "Shyvana", "Poppy", "Darius"];
var answersTwo = ["Senna", "Lux", "Swain", "Bard"];
var answersThree = ["Yordle", "Human", "Vastayan", "Golem"];
var answersFour = ["Noxus", "Ionia", "Piltover", "Bilgewater"];
var answerArr = [answersOne, answersTwo, answersThree, answersFour];
var correctAnswers = ["Darius", "Lux", "Yordle", "Bilgewater"];

//Declare p-tag for answer feedback and tracking
var newP = document.createElement("p");
var newRule = document.createElement("hr");

//Declare counters
var answerCount = 0;
var secondsLeft = 60;
var btnCounter = 0;

//Declare high score variables
var hsArr = JSON.parse(localStorage.getItem("gameData")) || [];

//Declare timer variable
var timerInterval;

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeDisplay.textContent = "Time: " + secondsLeft;

        timeDisplay.setAttribute("id", "timeDisplay");

        //When timer reaches 0, the quiz ends
        if (secondsLeft <= 0) {
            gameOver();
        };
    }, 1000);
};

//Display end of game screen
//Stop timer and display remainder as score
function gameOver() {
    clearInterval(timerInterval);
    headerDisplay.textContent = "Game Over!";
    answersEl.textContent = "";

    pText.textContent = "Your Score: " + secondsLeft;
    //Turn off hr and answer feedback
    // newRule.style.visibility = "hidden";
    // newP.style.visibility = "hidden";

    pText.setAttribute("class", "fontFun");
    timeDisplay.textContent = "";

    var newInput = document.createElement("input");
    newInput.setAttribute('type', 'text');
    feedbackEl.textContent = "Your Initials: ";
    feedbackEl.appendChild(newInput);
    var newBtn = document.createElement("button");
    newBtn.textContent = "SUBMIT";
    newBtn.setAttribute('class', 'btnFlavor');
    feedbackEl.appendChild(newBtn);


    // used click event on a submit button because I couldn't get the 'submit' event to work, I think due to creating an input dynamically
    // tried creating a form in the html, but couldn't get submit to work when the enter key was pressed
    newBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var hsObj = {
            initials: newInput.value.trim(),
            score: secondsLeft
        }
        if (newInput.value === '') {
            return;
        }

        hsArr.push(hsObj);
        newInput.value = "";

        localStorage.setItem("gameData", JSON.stringify(hsArr));

        for (var i = 0; i < hsArr.length; i++) {
            var liElToo = document.createElement("li");
            liElToo.setAttribute("class", "fontFun");

            //Sort array by highest to lowest
            function compare(a, b) {
                var scoreOne = a.score;
                var scoreTwo = b.score;

                return scoreTwo - scoreOne;
            }

            hsArr.sort(compare);

            if (i % 2 === 0) {
                liElToo.setAttribute('class', 'evenFlavor');
            } else {
                liElToo.setAttribute('class', 'oddFlavor');
            }
            liElToo.textContent = `Player: ${hsArr[i].initials} Score: ${hsArr[i].score}`;
            answersEl.appendChild(liElToo);
        }

        newInput.style.visibility = "hidden";
        // feedbackEl.style.visibility = "hidden";
        feedbackEl.textContent = '';
        var newBtnAlso = document.createElement("button");
        newBtnAlso.textContent = "Restart Quiz";
        newBtnAlso.setAttribute('class', 'btnFlavor');
        feedbackEl.appendChild(newBtnAlso);

        //reset game to beginning, refreshing timer
        newBtnAlso.addEventListener("click", function (event) {
            event.preventDefault();
            location.reload();
        });
    });
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
            var currentAnswers = answerArr[index];
            var buttonToo = document.createElement("button");
            buttonToo.textContent = i + 1 + ". " + currentAnswers[i];

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
});


//Click buttons not list
answersEl.addEventListener("click", function (event) {
    event.preventDefault();

    //Display the next question and beneath the answers, display whether the previous answer was right or wrong    
    //If button is clicked, then proceed
    var element = event.target;

    if (element.matches("button") === true) {
        //Checks the answer from the user clicking the button against the answer array
        var checkAnswer = event.target.textContent.split(" ")[1];
        if (checkAnswer === correctAnswers[btnCounter - 1]) {
            answerCount++;
            newP.textContent = `Correct! You have answered ${answerCount} questions correctly!`;
        } else {
            secondsLeft -= 10;
            newP.textContent = `Wrong! You have answered ${answerCount} questions correctly!`;
        }
        setTimeout(function () {
            newP.textContent = '';
            newRule.style.display = 'none';
        }, 1500);
        //Wipe off the screen when clicked and update with next question or gameover screen
        nextQuestion(btnCounter);

        btnCounter++;
        //Append feedback on correct or wrong answers below the answer list
        feedbackEl.appendChild(newRule);
        feedbackEl.appendChild(newP);
    }
});

//Button that directs to the highscores page
highscoreBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Clear display on front page when clicked
    answersEl.innerHTML = '';
    headerDisplay.textContent = 'High Scores';
    timeDisplay.textContent = '';
    btnClick.style.visibility = 'hidden';
    pText.textContent = '';

    for (var i = 0; i < hsArr.length; i++) {
        var liElToo = document.createElement("li");
        liElToo.setAttribute("class", "fontFun");

        //Sort array by highest to lowest
        function compare(a, b) {
            var scoreOne = a.score;
            var scoreTwo = b.score;

            return scoreTwo - scoreOne;
        }

        hsArr.sort(compare);

        if (i % 2 === 0) {
            liElToo.setAttribute('class', 'evenFlavor');
        } else {
            liElToo.setAttribute('class', 'oddFlavor');
        }
        liElToo.textContent = `Player: ${hsArr[i].initials} Score: ${hsArr[i].score}`;
        answersEl.appendChild(liElToo);
    }

    feedbackEl.textContent = '';
    var newBtnAlso = document.createElement("button");
    newBtnAlso.textContent = "Restart Quiz";
    newBtnAlso.setAttribute('class', 'btnFlavor');
    feedbackEl.appendChild(newBtnAlso);

    //reset game to beginning, refreshing timer
    newBtnAlso.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });
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

