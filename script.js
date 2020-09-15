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
var jumpToBoard = document.querySelector("#toScores");
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
    sectionTitle.textContent = "Coding Quiz Challenge";
    questOne.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds.";
    countdown.textContent = "70";
    jumpToBoard.textContent = "Check scoreboard";


    var startButton = document.createElement("button");
    startButton.textContent = "Begin Test";
    startButton.setAttribute("id", "beginQuizButton");
    questTwo.appendChild(startButton)

}

function clearContent(){
    sectionTitle.textContent = "";
    questOne.textContent = "";
    questTwo.textContent = "";
    questThree.textContent = ""
    questFour.textContent = "";
}

function quizStart(){
    clearContent();
    sectionTitle.textContent = questArray[0].question;
    questOne.textContent = questArray[0].answerOne.answer;
    questTwo.textContent = questArray[0].answerTwo.answer;
    questThree.textContent = questArray[0].answerThree.answer;
    questFour.textContent = questArray[0].answerFour.answer;
    console.log(questArray[0].answerOne.verify, 
        questArray[0].answerTwo.verify, 
        questArray[0].answerThree.verify, 
        questArray[0].answerFour.verify, );
}

function displayScore(){

}

function addScore(){

}

initialize();
document.querySelector("#beginQuizButton").addEventListener("click", quizStart);