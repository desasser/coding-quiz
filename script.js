//Declare reference variables to HTML
const highscoreBtn = document.getElementById("highscoreBtn");
const timeDisplay = document.getElementById("timeDisplay");
const headerDisplay = document.getElementById("header");
const pText = document.getElementById("pText");
const btnClick = document.getElementById("button-click");
const timeEl = document.getElementById("timer");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const quiz = document.querySelector(".quiz");

//Declare question arrays
const questionArr = ["Which of the below heroes is not from Damacia?", "Who freed Sylas from the mageseeker compound?", "What race are Veigar, Rumble, and Poppy?", "Where is Miss Fortune from?"];

//Declare answer arrays
const answersOne = ["Fiora", "Shyvana", "Poppy", "Darius"];
const answersTwo = ["Senna", "Lux", "Swain", "Bard"];
const answersThree = ["Yordle", "Human", "Vastayan", "Golem"];
const answersFour = ["Noxus", "Ionia", "Piltover", "Bilgewater"];
const answerArr = [answersOne, answersTwo, answersThree, answersFour];
const correctAnswers = ["Darius", "Lux", "Yordle", "Bilgewater"];

//Declare p-tag for answer feedback and tracking
const newP = document.createElement("p");
const newRule = document.createElement("hr");

//Declare counters
let answerCount = 0;
let secondsLeft = 60;
let btnCounter = 0;

//Declare high score variables
const hsArr = JSON.parse(localStorage.getItem("gameData")) || [];

//Declare timer variable
let timerInterval;

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

    pText.setAttribute("class", "fontFun");
    timeDisplay.textContent = "";

    const newInput = document.createElement("input");
    newInput.setAttribute('type', 'text');
    feedbackEl.textContent = "Your Initials: ";
    feedbackEl.appendChild(newInput);
    const newBtn = document.createElement("button");
    newBtn.textContent = "SUBMIT";
    newBtn.setAttribute('class', 'btnFlavor');
    feedbackEl.appendChild(newBtn);


    // used click event on a submit button because I couldn't get the 'submit' event to work, I think due to creating an input dynamically
    // tried creating a form in the html, but couldn't get submit to work when the enter key was pressed
    newBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const hsObj = {
            initials: newInput.value.trim(),
            score: secondsLeft
        }
        if (newInput.value === '') {
            return;
        }

        hsArr.push(hsObj);
        newInput.value = '';

        localStorage.setItem('gameData', JSON.stringify(hsArr));

        for (let i = 0; i < hsArr.length; i++) {
            const liElToo = document.createElement('li');
            liElToo.setAttribute('class', 'fontFun');

            //Sort array by highest to lowest
            function compare(a, b) {
                const scoreOne = a.score;
                const scoreTwo = b.score;

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

        newInput.style.visibility = 'hidden';
        feedbackEl.textContent = '';
        const newBtnAlso = document.createElement('button');
        newBtnAlso.textContent = 'Restart Quiz';
        newBtnAlso.setAttribute('class', 'btnFlavor');
        feedbackEl.appendChild(newBtnAlso);

        //reset game to beginning, refreshing timer
        newBtnAlso.addEventListener('click', function (event) {
            event.preventDefault();
            location.reload();
        });

        const newBtnAgain = document.createElement("button");
        // const newPToo = document.createElement("p");
        newBtnAgain.textContent = "Clear Scores";
        newBtnAgain.setAttribute('class', 'btnFlavor');
        feedbackEl.appendChild(newBtnAgain);
        // quiz.appendChild(newPToo);

        //reset scores in local storage
        newBtnAgain.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.clear();
            answersEl.textContent = '';
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
        for (let i = 0; i < answerArr[index].length; i++) {
            const liEl = document.createElement("li");
            const currentAnswers = answerArr[index];
            const buttonToo = document.createElement("button");
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
    const element = event.target;

    if (element.matches("button") === true) {
        //Checks the answer from the user clicking the button against the answer array
        const checkAnswer = event.target.textContent.split(" ")[1];
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
        }, 2000);
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

    for (let i = 0; i < hsArr.length; i++) {
        const liElToo = document.createElement("li");
        liElToo.setAttribute("class", "fontFun");

        //Sort array by highest to lowest
        function compare(a, b) {
            const scoreOne = a.score;
            const scoreTwo = b.score;

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
    const newBtnAlso = document.createElement("button");
    newBtnAlso.textContent = "Restart Quiz";
    newBtnAlso.setAttribute('class', 'btnFlavor');
    feedbackEl.appendChild(newBtnAlso);

    //reset game to beginning, refreshing timer
    newBtnAlso.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    const newBtnAgain = document.createElement("button");
    // const newPToo = document.createElement("p");
    newBtnAgain.textContent = "Clear Scores";
    newBtnAgain.setAttribute('class', 'btnFlavor');
    feedbackEl.appendChild(newBtnAgain);
    // quiz.appendChild(newPToo);

    //reset scores in local storage
    newBtnAgain.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.clear();
        answersEl.textContent = '';
    });
})