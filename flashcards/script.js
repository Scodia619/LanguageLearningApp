//2D array for the words first is samoan second is english
const WORDS = [
    ['Ta\'avale', "Car"], 
    ['Fa\'amolemole', "Please"],
    ['Maile', "Dog"],
    ['Fa\'afetai', "Thank You!"],
    ['Ua ou feiloa\'i', "I meet"],
    ['Fa', "Goodbye"],
    ['Ou lelei', "Ok"],
    ['Faletupe', "Bank"],
    ["Ofutino", "Shirt"],
    ["Fale", "House"],
    ["Falaoa", "Bread"],
    ["Pati", "Party"],
    ["Tioata mo le la", "Sunglasses"]];

//Array Variable to determine words
var wordgroup = 0
var wordindex = 0

//Used to update the score for the flashcards
var score = 0

//Position Variables
//sets a global position variable to be used for highlighting correct answers and incorrect answers
var position = "left"
//will be used to set the correct button for highlighting purposes
var correctWordPos = "left"

//will be used to flip the flashcard around
function flip(){
    //checks which side it is on so it can flip to the other language correctly
    if(wordindex == 0){
        wordindex = 1
        //changes the word on the card
        document.getElementById("word").innerHTML = WORDS[wordgroup][wordindex]
    }else{
        wordindex = 0
        document.getElementById("word").innerHTML = WORDS[wordgroup][wordindex]
    }
}

//gets a random number. Made for code reproducability instead of having lots of redundant code.
function getRandomNumber(max){
    return Math.floor(Math.random() * max)
}

//Will get two random english words from the list
function getRandomAnswers(){
    //array where answers will be added so we can determine where to place them
    var answers = [];
    //gets the correct answer so it will defitinely be in there
    answers.push(WORDS[wordgroup][1])
    //gets the two random answers
    for(let i = 0; i < 2; i++){
        var newWord = WORDS[getRandomNumber(WORDS.length)][1]
        //makes sure that the answer returned isnt already in the answers array as we dont want repeat answers
        while(newWord == WORDS[wordgroup][1] || answers.includes(newWord)){
            newWord = WORDS[getRandomNumber(WORDS.length)][1]
        }
        answers.push(newWord)
        //sorts the array so there is a relative amount of randomisation on where the correct answer is placed.
        answers.sort();
    }

    //places the answers on the buttons.
    document.getElementById("middle").innerHTML = answers[0]
    document.getElementById("right").innerHTML = answers[1]
    document.getElementById("left").innerHTML = answers[2]

    //sets the position for the correct answer
    if(answers.indexOf(WORDS[wordgroup][1]) == 0){
        correctWordPos = "middle"
    }if(answers.indexOf(WORDS[wordgroup][1]) == 1){
        correctWordPos = "right"
    }if(answers.indexOf(WORDS[wordgroup][1]) == 2){
        correctWordPos = "left"
    }
}

//gets a new word at random from the 2D array
function getWord(){
    //sets the button colours back to normal
    document.getElementById(position).style.backgroundColor = 'rgb(' + 141 + ',' + 141 + ',' + 141 + ')';
    document.getElementById(correctWordPos).style.backgroundColor = 'rgb(' + 141 + ',' + 141 + ',' + 141 + ')';
    wordindex = 0
    wordgroup = getRandomNumber(WORDS.length)
    document.getElementById("word").innerHTML = WORDS[wordgroup][wordindex]
    getRandomAnswers()
}

//checks the answer upon button clicking
function checkAnswer(pos){
    //sets this variable so we can change the colour outside the function
    position = pos
    //checks if your looking at the word in english
    if(wordindex == 1){
        alert("You cant look at the English while answering")
    }else{
        //if answer is correct add 1 to score update score board and then change button to green
        if(document.getElementById(pos).innerHTML == WORDS[wordgroup][1]){
            score += 1
            document.getElementById("scoreBoard").innerHTML = "Score: " + score;
            document.getElementById(pos).style.backgroundColor = "green";
        }
        //if incorrect then change the guess to red and correct answer to green
        else{
            document.getElementById(pos).style.backgroundColor = "red";
            document.getElementById(correctWordPos).style.backgroundColor = "green";
        }
    }
    //sets a delay so you have chance to look at what correct answer is before setting a new word.
    var delayMS = 1000;

    setTimeout(function() {
        getWord();
    }, delayMS);
}

//gets a word at the start of the program.
getWord()