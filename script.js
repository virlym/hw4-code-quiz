/*
    'hyperlink' retake quiz
    set-interval timer
    -onclick event to start quiz
    populate questions and answers
    onclick answer fields
    populate scoreboard at the end
    allow for name input for scoreboard
    store scoreboard to local 

*/
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

function initialize(){
    clearContent();
    secondsLeft = 70;
    clearResult = 0;
    sectionTitle.textContent = "Coding Quiz Challenge";
    questOne.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds.";
    countdown.textContent = secondsLeft;
    jumpToBoard.textContent = "Check scoreboard";


    var startButton = document.createElement("button");
    startButton.textContent = "Begin Test";
    startButton.setAttribute("id", "beginQuizButton");
    startButton.addEventListener("click", quizStart);
    questTwo.appendChild(startButton);

    leaders.length = 0;

}

function clearContent(){
    sectionTitle.textContent = "";
    questOne.textContent = "";
    questTwo.textContent = "";
    questThree.textContent = "";
    questFour.textContent = "";
    questFive.textContent = "";
}

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

function quizStart(){
    clearContent();
    index = 0;
    createButtons();
    timerStart();
}

function checkAnswerSelect(selected){
    console.log("entered selector click check");
    var verify = "";
    clearContent();
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

    if(verify === "true"){
        questFive.textContent = "~~ Correct ~~";
        console.log("entered correct");
        clearResult = 3;
    }
    else{
        questFive.textContent = "!! Wrong !!";
        secondsLeft = secondsLeft - 10;
        console.log("entered false");
        clearResult = 3;
    }

    index++;
    if(index < 5){
        createButtons();
    }
    else{
        addScore();
    }
}

function sortLeaders(){
    console.log("sorting leaders");
    if(leaders){
        for(var i = 0; i < leaders.length - 1; i++){
            for(var j = 0; j < leaders.length - 1; j++){
                if(leaders[j].score < leaders[j+1].score){
                    console.log(`swapping ${leaders[j].winner} and ${leaders[j+1].winner}`);
                    console.log(`swapping ${leaders[j].score} and ${leaders[j+1].score}`);
                    var tempScore = leaders[j].score;
                    var tempName = leaders[j].winner;
                    leaders[j].score = leaders[j+1].score;
                    leaders[j].winner = leaders[j+1].winner;
                    leaders[j+1].score = tempScore;
                    leaders[j+1].winner = tempName;
                    console.log(`result ${leaders[j].winner} and ${leaders[j+1].winner}`);
                    console.log(`result ${leaders[j].score} and ${leaders[j+1].score}`);
                }
            }
        }

    }
}

function displayScore(){
    clearContent();
    sectionTitle.textContent = "Top Scores";
    getStored();
    if(leaders){
        sortLeaders();
        if(leaders.length >= 11){
            for(var i = leaders.length; i > 10; i--){
                deleteLastScore();
            }
        }

        for(var i = 0; i < leaders.length; i++){
            var newDiv = document.createElement("p");
            newDiv.textContent = `${i + 1} ) ${leaders[i].winner} - Score : ${leaders[i].score}`;
            questOne.appendChild(newDiv);
        }
        storeScores();
    }
    else{
        questOne.textContent = "something's wrong here";
    }
    var backButton = document.createElement("button");
    backButton.textContent = "retake test";
    backButton.addEventListener("click", initialize);
    questTwo.appendChild(backButton);

    
    var clearButton = document.createElement("button");
    clearButton.textContent = "Clear Scores";
    clearButton.addEventListener("click", clearScores);
    questTwo.appendChild(clearButton);
    
}

function deleteLastScore(){
    console.log("deleting a score");
    leaders.pop();
}

function getStored(){
    if(JSON.parse(localStorage.getItem("Player"))){
        if((JSON.parse(localStorage.getItem("Player")).length !== 0)){
            leaders = JSON.parse(localStorage.getItem("Player"));
        }
    }
}

function storeScores(){
    var storage = JSON.stringify(leaders);
    localStorage.setItem("Player", storage);
}

function clearScores(){
    localStorage.clear();
    var loop = leaders.length;
    for(var i = 0; i < loop; i++){
        deleteLastScore();
    }
    displayScore();
}

function addScore(){
    sectionTitle.textContent = "Enter your name";
    var nameForm = document.createElement("form");
    nameForm.setAttribute("method", "POST");
    nameForm.addEventListener("submit", addWinner);
    var nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.setAttribute("placeholder", "Enter your name");
    nameField.setAttribute("name", "winner-text");
    nameField.setAttribute("id", "winner-text");
    nameForm.appendChild(nameField);
    questOne.appendChild(nameForm);
}

function addWinner(event){
    event.preventDefault();
    console.log("name return");
    fieldText = document.querySelector("#winner-text");
    if(fieldText.value.trim() === ""){
        return;
    }
    else{
        getStored();
        leaders.push({winner: fieldText.value.trim(), score : secondsLeft});
        leaders.push({winner: "placeholder", score: 1});
        leaders.push({winner: "placeholder", score: 1});
        leaders.push({winner: "placeholder", score: 1});
        leaders.push({winner: "placeholder", score: 1});
        leaders.push({winner: "placeholder", score: 1});
        leaders.push({winner: "placeholder", score: 1});
        leaders.push({winner: "placeholder", score: 1});
        leaders.push({winner: "placeholder", score: 1});
        storeScores();
        displayScore();
    }
}

function timerStart(){
    // Create the countdown timer.
    
    var speed = 0;
    var timerInterval = setInterval(function() {
        if(speed % 1000 === 0){
            secondsLeft--;
            speed = 0;
            clearResult--;
            if(clearResult === 0){
                questFive.textContent = "";
            }
        }

        countdown.textContent = secondsLeft;
        if(secondsLeft <= 0 || index === 5) {
            clearInterval(timerInterval);
            if(secondsLeft <= 0){
                clearContent();
                sectionTitle.textContent = "Out of time";
            }
            setTimeout(function() {
                questFive.textContent = "";
            }, 3000);
        }

        speed += 10;

    }, 10);
}

initialize();
