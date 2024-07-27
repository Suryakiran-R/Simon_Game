// alert("hello");
var userClickedPattern = [];
var gamePattern = [];
const buttonColors = ["red","blue","green","yellow"];
var level=0;

var started=false;
$(document).keypress(function () { 
    if(!started){    
        $('#level-title').text('Level '+level);
        nextSequence();
        started = true;
    }
}); 


$('.btn').click(function () { 
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentAnswer){
    if(gamePattern[currentAnswer]===userClickedPattern[currentAnswer]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else{
        playSound('wrong');
        $('body').addClass('game-over');

        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);

        $('h1').text('GameOver - Press any Key to restart');
        restart();
    }   
}

function nextSequence(){
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randoNumber= Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColors[randoNumber];
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
} 

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function restart(){
    level=0;
    gamePattern=[];
    started=false;
}