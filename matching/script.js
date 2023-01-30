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
    ["Tioata mo le la", "Sunglasses"],
    ["Moana", "Water"]];

//sets a standard variable for all button checking
var button = document.getElementById("box-1");

//Variable to determine which is correct box to work everything out with
var box;

//variable to determine if match is found
var match = false;

//array for knowing which boxes are clicked at one time
var btnClicked = []

//checks which buttons are correct and dont need to be clicked
var btnCorrect = []

//array for checking answers
var guesses = []

//Variables Relating to resetting the Game
var score = 0
var gameWords = []

//Resetting the words to choose from
function reset(){
    gameWords = []
    guesses = []
    btnClicked = []
    btnCorrect = []
    let num = 0
    //gets the random words and then pushes to array
    for(let i = 0; gameWords.length <= 4; i++){
        num = getRandomNumber(WORDS.length)
        let word = (WORDS[num][0])
        while(gameWords.includes(word)){
            num = getRandomNumber(WORDS.length)
            word = WORDS[num][0]
        }
        gameWords.push(WORDS[num][0])
        gameWords.push(WORDS[num][1])
    }
    //sorts to get a little bit of a randomised order
    gameWords.sort()
    console.log(gameWords)
    for(let i=0; i<= 5; i++){
        let box = "box-" + (i+1)
        document.getElementById(box).style.backgroundColor = "black";
        document.getElementById(box).innerHTML = gameWords[i]
    }
}

//gets a random number
function getRandomNumber(max){
    return Math.floor(Math.random() * max)
}

//setting wrong answers back to black
function setToBlack(){
    //loops through array so it can do all the elements
    for(let j = 0; j != 2; j++){
        //changes style to black
        document.getElementById(btnClicked[j]).style.backgroundColor = "black";
        score = 0;
        document.getElementById('score').innerHTML = "Score: " + score
    }
}

//checks if there is two answers then checks what to do next
function checks(){
    //sets match == false to restart matching process
    match = false
    //checks theres 2 items to compare
    console.log(btnClicked)
    if(btnClicked.length == 2){
        //for loop to loop through the words
        for(var i = 0; i != WORDS.length; i ++){
            //checks if it matches
            if((WORDS[i][0] == guesses[0] && WORDS[i][1] == guesses[1]) ||  WORDS[i][0] == guesses[1] && WORDS[i][1] == guesses[0]){
                //loops through clicked boxes
                for(let j = 0; j != btnClicked.length; j++){
                    //adds the correct boxes to array
                    btnCorrect.push(btnClicked[j])
                    //changes style to green
                    document.getElementById(btnClicked[j]).style.backgroundColor = "green";
                    match = true;
                }
                score++;
                document.getElementById('score').innerHTML = "Score: " + score
            }
            if(btnCorrect.length == 6){
                setTimeout(() => {
                    reset()
                }, 1000);
            }
        }
        if(match == false){
            for(let j = 0; j != btnClicked.length; j++){
                //changes style to red
                document.getElementById(btnClicked[j]).style.backgroundColor = "red";
            }

            setTimeout(() => {
                console.log(btnClicked.length)
                setToBlack()
            }, 1000);
        }
        //empties arrays so next guesses can be made
        guesses = []
    }
}

function buttonChanges(){
    if(btnCorrect.includes(box) || btnClicked.includes(box)){
    }else{
        if(btnClicked.length == 2){
            btnClicked = []
        }
        btnClicked.push(box)
        guesses.push((document.getElementById(box).innerHTML))
        document.getElementById(box).style.backgroundColor = "blue";
            console.log(guesses)
            checks()
    }
}

//Click Event Listeners for the game to work
var button = document.getElementById("box-1");

button.addEventListener("click", function(){
    box = "box-1"
    buttonChanges()
})
var button = document.getElementById("box-2");

button.addEventListener("click", function(){
    box = "box-2"
    buttonChanges()
})
var button = document.getElementById("box-3");

button.addEventListener("click", function(){
    box = "box-3"
    buttonChanges()
})
var button = document.getElementById("box-4");

button.addEventListener("click", function(){
    box = "box-4"
    buttonChanges()
})
var button = document.getElementById("box-5");

button.addEventListener("click", function(){
    box = "box-5"
    buttonChanges()
})
var button = document.getElementById("box-6");

button.addEventListener("click", function(){
    box = "box-6"
    buttonChanges()
})