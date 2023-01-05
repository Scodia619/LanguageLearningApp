import { WORDS } from "./words.js";

var wordgroup = 0
var wordindex = 0

function flip(){
    if(wordindex == 0){
        wordindex = 1
        document.getElementById("word").innerHTML = WORDS[wordgroup][wordindex]
    }else{
        wordindex = 0
        document.getElementById("word").innerHTML = WORDS[wordgroup][wordindex]
    }
}

function getWord(){
    wordgroup = Math.floor(Math.random() * WORDS.length)
    console.log(wordgroup)
    document.getElementById("word").innerHTML = WORDS[wordgroup][wordindex]
}

getWord()