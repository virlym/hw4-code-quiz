var countdown = document.querySelector("#timeLeft");
var sectionTitle = document.querySelector("#sectionTopic");
var questOne = document.querySelector("#lineOne");
var questTwo = document.querySelector("#lineTwo");
var questThree = document.querySelector("#lineThree");
var questFour = document.querySelector("#lineFour");
var questFive = document.querySelector("#lineFive");
var jumpToBoard = document.querySelector("#toScores");
var mainContainer = document.querySelector("#mainCont");
var clearResult = 0;
var index = 0;
var secondsLeft = 0;
var leaders = [{winner: "" , score: ""}];
// really big array for the questions/answers, sorry
var questArray = [
{
    question: "Commonly used data types DO NOT include : ", 
    answerOne: {
        answer: "strings", 
        verify: "false"
    } ,
    answerTwo: {
        answer: "booleans", 
        verify: "false"
    } ,
    answerThree: {
        answer: "alerts", 
        verify: "true"
    } ,
    answerFour: {
        answer: "numbers", 
        verify: "false"
    }
},
{
    question: "The condition in an if/else statement is inclosed within : ", 
    answerOne: {
        answer: "quotes", 
        verify: "false"
    } ,
    answerTwo: {
        answer: "curly brackets", 
        verify: "false"
    } ,
    answerThree: {
        answer: "parentheses", 
        verify: "true"
    } ,
    answerFour: {
        answer: "square brackets", 
        verify: "false"
    }
},
{
    question: "Arrays in JavaScript can be used to store : ", 
    answerOne: {
        answer: "numbers and strings", 
        verify: "false"
    } ,
    answerTwo: {
        answer: "other arrays", 
        verify: "false"
    } ,
    answerThree: {
        answer: "booleans", 
        verify: "false"
    } ,
    answerFour: {
        answer: "all of the above", 
        verify: "true"
    }
},
{
    question: "What must string values be enclosed within when being assigned to variables?", 
    answerOne: {
        answer: "commas", 
        verify: "false"
    } ,
    answerTwo: {
        answer: "curly brackets", 
        verify: "false"
    } ,
    answerThree: {
        answer: "quotes", 
        verify: "true"
    } ,
    answerFour: {
        answer: "parentheses", 
        verify: "false"
    }
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is : ", 
    answerOne: {
        answer: "JavaScript", 
        verify: "false"
    } ,
    answerTwo: {
        answer: "terminal / bash", 
        verify: "false"
    } ,
    answerThree: {
        answer: "for loops", 
        verify: "false"
    } ,
    answerFour: {
        answer: "console.log", 
        verify: "true"
    }
}
]

// set the initial screen before the quiz starts
function initialize(){
    clearContent();
    secondsLeft = 70;
    clearResult = 0;
    sectionTitle.textContent = "Coding Quiz Challenge";
    questOne.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds.";
    countdown.textContent = secondsLeft;
    jumpToBoard.textContent = "Check scoreboard";
    jumpToBoard.setAttribute("onclick", "displayScore()");


    var startButton = document.createElement("button");
    startButton.textContent = "Begin Test";
    startButton.setAttribute("id", "beginQuizButton");
    startButton.addEventListener("click", quizStart);
    questTwo.appendChild(startButton);

    leaders.length = 0;

}

// clear out values for easy replace
function clearContent(){
    
    jumpToBoard.textContent = "";
    sectionTitle.textContent = "";
    questOne.textContent = "";
    questTwo.textContent = "";
    questThree.textContent = "";
    questFour.textContent = "";
    questFive.textContent = "";
}

// get the next question and create the buttons for the 'answers'
function createButtons(){
    sectionTitle.textContent = questArray[index].question;

    var oneButton = document.createElement("button");
    oneButton.textContent = "1. " + questArray[index].answerOne.answer;
    oneButton.setAttribute("id", "ansOneButton");
    oneButton.addEventListener("click", function(){checkAnswerSelect(1);});
    questOne.appendChild(oneButton);

    var twoButton = document.createElement("button");
    twoButton.textContent = "2. " + questArray[index].answerTwo.answer;
    twoButton.setAttribute("id", "ansTwoButton");
    twoButton.addEventListener("click", function(){checkAnswerSelect(2);});
    questTwo.appendChild(twoButton);

    var threeButton = document.createElement("button");
    threeButton.textContent = "3. " + questArray[index].answerThree.answer;
    threeButton.setAttribute("id", "ansThreeButton");
    threeButton.addEventListener("click", function(){checkAnswerSelect(3);});
    questThree.appendChild(threeButton);

    var fourButton = document.createElement("button");
    fourButton.textContent = "4. " + questArray[index].answerFour.answer;
    fourButton.setAttribute("id", "ansFourButton");
    fourButton.addEventListener("click", function(){checkAnswerSelect(4);});
    questFour.appendChild(fourButton);
}

// clear the screen, reset the question index, create the first question, and start the timer
function quizStart(){
    clearContent();
    index = 0;
    createButtons();
    timerStart();
}

// check if the pressed answer button was correct or not then pull the next section
function checkAnswerSelect(selected){
    var verify = "";
    // clear the screen
    clearContent();
    // set the defined variable to the verify attribute of the selected button
    if(selected === 1){
        verify = questArray[index].answerOne.verify;
    }
    else if(selected === 2){
        verify = questArray[index].answerTwo.verify;
    }
    else if(selected === 3){
        verify = questArray[index].answerThree.verify;
    }
    else{
        verify = questArray[index].answerFour.verify;
    }

    // if the answer was correct
    if(verify === "true"){
        // tell the user they were right
        questFive.textContent = "~~ Correct ~~";
        // set the result to go away in 3 seconds
        clearResult = 3;
    }
    // if the answer was wrong
    else{
        // tell the user they were wrong
        questFive.textContent = "!! Wrong !!";
        // deduct 10 seconds from the time
        secondsLeft = secondsLeft - 10;
        // set the result to go away in 3 seconds
        clearResult = 3;
    }

    // increase the index to grab the next question
    index++;
    // if the index is still less than 5, go to the next question
    if(index < 5){
        createButtons();
    }
    // otherwise, go to the name entry 'screen'
    else{
        addScore();
    }
}

// sort the scores so the highest are on top (typical bubble sort)
function sortLeaders(){
    if(leaders){
        for(var i = 0; i < leaders.length - 1; i++){
            for(var j = 0; j < leaders.length - 1; j++){
                if(leaders[j].score < leaders[j+1].score){
                    var tempScore = leaders[j].score;
                    var tempName = leaders[j].winner;
                    leaders[j].score = leaders[j+1].score;
                    leaders[j].winner = leaders[j+1].winner;
                    leaders[j+1].score = tempScore;
                    leaders[j+1].winner = tempName;
                }
            }
        }

    }
}

// display the scoreboard 'page', create buttons to restart and clear the scores
function displayScore(){
    // clear the screen
    clearContent();
    // change the section title
    sectionTitle.textContent = "Top Scores";
    // grab the scores stored in local storage
    getStored();
    // if there are any scores
    if(leaders){
        // sort the scores from high to low
        sortLeaders();
        // if there are more than 10 scores, remove the lowest until there are only 10
        if(leaders.length >= 11){
            for(var i = leaders.length; i > 10; i--){
                deleteLastScore();
            }
        }

        // print each score to the screen
        for(var i = 0; i < leaders.length; i++){
            var newDiv = document.createElement("p");
            newDiv.textContent = `${i + 1} ) ${leaders[i].winner} - Score : ${leaders[i].score}`;
            questOne.appendChild(newDiv);
        }
        // store the current scores so they are in sorted order
        storeScores();
    }
    else{
        questOne.textContent = "something's wrong here";
    }
    var backButton = document.createElement("button");
    backButton.textContent = "Retake Test";
    backButton.addEventListener("click", initialize);
    questTwo.appendChild(backButton);

    
    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear Scores";
    clearButton.addEventListener("click", clearScores);
    questTwo.appendChild(clearButton);
    
}

// delete the last name/score
function deleteLastScore(){
    leaders.pop();
}

// get the names/scores stored in local storage
function getStored(){
    if(JSON.parse(localStorage.getItem("Player"))){
        if((JSON.parse(localStorage.getItem("Player")).length !== 0)){
            leaders = JSON.parse(localStorage.getItem("Player"));
        }
    }
}

// assign the current scores to the local storage
function storeScores(){
    var storage = JSON.stringify(leaders);
    localStorage.setItem("Player", storage);
}

// empty the current scores and the ones stored in local storage
function clearScores(){
    // try so hard to clear the local storage
    // both of these clear it completely in the Inspect tool, but leave an empty string when running with javascript
    localStorage.clear();
    localStorage.removeItem('Player');
    // set a loop variable to make sure the changing array doesn't break the loop
    var loop = leaders.length;
    // delete each current score in memory
    for(var i = 0; i < loop; i++){
        deleteLastScore();
    }
    // display the scoreboard
    displayScore();
}

// name entry screen for completing the quiz
function addScore(){
    // change the section title
    sectionTitle.textContent = "Enter your name";
    // show them their score, based on remaining time
    questOne.textContent = "You score : " + secondsLeft;
    // create a form for them to add their name, adding an eventListener to it
    var nameForm = document.createElement("form");
    nameForm.setAttribute("method", "POST");
    nameForm.addEventListener("submit", addWinner);
    // create the input text field
    var nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.setAttribute("placeholder", "Enter your name");
    nameField.setAttribute("name", "winner-text");
    nameField.setAttribute("id", "winner-text");
    // add the field to the form
    nameForm.appendChild(nameField);
    // add the form to the page
    questTwo.appendChild(nameForm);
}

// add the entered name and score to the list and local storage
function addWinner(event){
    event.preventDefault();
    // grab the text input for the winner's name
    fieldText = document.querySelector("#winner-text");
    // if the text field is empty, don't do anything
    if(fieldText.value.trim() === ""){
        return;
    }
    // if there is text in the field
    else{
        // grab the stored scores
        getStored();
        // add the new score to the list
        leaders.push({winner: fieldText.value.trim(), score : secondsLeft});
        // store the current scores
        storeScores();
        // display the scoreboard
        displayScore();
    }
}

// countdown timer, with a quick refresh rate
function timerStart(){
    var speed = 0;
    var timerInterval = setInterval(function() {
        // an check for the seconds
        if(speed % 1000 === 0){
            secondsLeft--;
            speed = 0;
            clearResult--;
            // clear the correct/wrong notice after 3 seconds if it's still on the screen
            if(clearResult === 0){
                questFive.textContent = "";
            }
        }

        // refresh timer number
        countdown.textContent = secondsLeft;

        // when the quiz is over
        if(secondsLeft <= 0 || index === 5) {
            // stop the timer
            clearInterval(timerInterval);
            // if they ran out of time, don't let them set their score
            if(secondsLeft <= 0){
                clearContent();
                sectionTitle.textContent = "Out of time";
                // wait 5 seconds before loading the scoreboard
                setTimeout(function() {
                    displayScore();
                }, 5000);
            }
            // clear the correct/wrong notice after 3 seconds
            setTimeout(function() {
                questFive.textContent = "";
            }, 3000);
        }

        speed += 10;

    }, 10);
}

initialize();