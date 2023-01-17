//Samoan Numbers
const NUMBERS = ["siro", "tasi", "lua", "tolu",
 "fa", "lima", "ono", "fitu", "valu",
  "iva", "sefulu", "sufulutasi", "sefululua",
"sefulutolu", "sefulufa", "sefululima", "sefuluono",
"sefulufitu", "sefuluvalu", "sefuluiva", "luasefulu",
"luasefulu tasi", "luasefulu lua", "luasefulu tolu",
"luasefulu fa", "luasefulu lima", "luasefulu ono",
"luasefulu fitu", "luasefulu valu", "luasefulu iva",
"tolusefulu", "tolusefulu tasi", "tolusefulu lua",
"tolusefulu tolu", "tolusefulu fa", "tolusefulu lima",
"tolusefulu ono", "tolusefulu fitu", "tolusefulu valu",
"tolusefulu iva", "fasefulu", "fasefulu tasi", "fasefulu lua",
"fasefulu tolu", "fasefulu fa", "fasefulu lima", "fasefulu ono",
"fasefulu fitu", "fasefulu valu", "fasefulu iva", "limasefulu"];

//signs
const SIGN = ["+", "-", "x"]

//global answer variable to be used in multiple function
var answer = 0;

//score for the game]
var score = 0;

//positional variables to be used in flashing system when checking answer
var position = "left";
var correctWordPos = "left";

//gets a random number used throughout
function getRandomNumber(max){
    return Math.floor(Math.random() * max)
}

//gets a random sign for the problem
function getRandomSign(){
    return SIGN[getRandomNumber(SIGN.length)]
}

//this function is where everything happens in relation the the problem
function makeProblem(){

    //resets the styling of the boxes when the checking has been finished
    document.getElementById("solution-box").style.backgroundColor = 'white';
    document.getElementById(position).style.backgroundColor = 'rgb(' + 141 + ',' + 141 + ',' + 141 + ')';
    document.getElementById(correctWordPos).style.backgroundColor = 'rgb(' + 141 + ',' + 141 + ',' + 141 + ')';
    document.getElementById("solution-box").style.border = ""
    document.getElementById("solution").innerHTML = "?"

    //empty array for the fake answers
    var choices = [];

    //gets the numbers and sign for the game
    var num1 = getRandomNumber(10);
    var num2 = getRandomNumber(10);
    var sign = getRandomSign();

    //checks that num1 is bigger if not gets another number if it is a subtraction
    while(sign == "-" && num2>num1){
        num1 = getRandomNumber(10);
    }

    //changes the text in the boxed to the new solution
    document.getElementById("num1").innerHTML = num1
    document.getElementById("sign").innerHTML = sign
    document.getElementById("num2").innerHTML = num2

    //checks what sign it is and then makes the answer
    if(sign == "-"){
        answer = num1 - num2
    }
    if(sign == "+"){
        answer = num1 + num2
    }
    if(sign == "x"){
        answer = num1 * num2
    }

    //Adds the correct answer and fake answers to the choices array
    choices.push(NUMBERS[answer])
    console.log(choices);
    for(i = 0; i!= 2; i++){
        var number = getRandomNumber(NUMBERS.length)
        //checks this number hasnt already been used
        while(number == answer || choices.includes(number)){
            number = getRandomNumber(NUMBERS.length)
        }
        choices.push(NUMBERS[number])
        console.log(choices)
    }

    //sorts the array to randomize where the answers will be placed
    choices.sort()

    //changes the text of the selection to the answer selection
    document.getElementById("middle").innerHTML = choices[0]
    document.getElementById("right").innerHTML = choices[1]
    document.getElementById("left").innerHTML = choices[2]

    //finds the correct position of the correct answer
    if(choices.indexOf(NUMBERS[answer]) == 0){
        correctWordPos = "middle"
    }if(choices.indexOf(NUMBERS[answer]) == 1){
        correctWordPos = "right"
    }if(choices.indexOf(NUMBERS[answer]) == 2){
        correctWordPos = "left"
    }
    console.log(correctWordPos)
    
}

//this is where we check if the answer chosen is correct
function checkAnswer(pos){

    //to be used when flashing in makeProblem()
    position = pos

    //finds out what you have guessed
    var guess = document.getElementById(pos).innerHTML

    //checks what the answer and decides which path to take
    if(guess == NUMBERS[answer]){
        console.log("correct")
        score += 1
        document.getElementById("scoreBoard").innerHTML = "Score: " + score;
        document.getElementById("solution-box").style.backgroundColor = "#AACC00"
        document.getElementById("solution-box").style.border = "0.2em solid #BFD200"
    }else{
        console.log("incorrect")
        document.getElementById("solution").innerHTML = NUMBERS[answer]
        //sets the style of incorrect answer
        document.getElementById(pos).style.backgroundColor = "red";
        document.getElementById(correctWordPos).style.backgroundColor = "#AACC00";
    }

    //reveals the correct answer
    document.getElementById("solution").innerHTML = answer

    //not all numbers entered need to do to 100
    if(NUMBERS.length >= answer){
        console.log(NUMBERS[answer])
    }else{
        console.log("not enough numbers entered")
    }

    //sets a delay for the next answer to be made
    var delayMS = 1000;

    setTimeout(function() {
        makeProblem();
    }, delayMS);
}

makeProblem();