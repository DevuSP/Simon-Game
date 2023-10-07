// array for random colors.
let buttonColors = ["red", "blue", "green", "yellow"]

//empty array for chosen color.
let gamePattern = [];

// empty array for clicked color id.
let userClickedPattern = [];

// To push id of color clicked.
$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");  //To catch the id of clicked button.
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1); // -1 bcoz array starts from 0 and .length starts from 1.
})

function nextSequence() {                // funtion for random no.
    userClickedPattern = []// Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level. bcoz nextSequence() is triggered after level completed, we could have chosen other funcion too.

    level++; //To change level no. and text.
    $("#level-title").text("Level " + level)


    let randomNumber = Math.random();
    randomNumber = (Math.floor(randomNumber * 4));
    let randomChosenColor = buttonColors[randomNumber];// chosing colors with random number (nextSequence funtion). 
    gamePattern.push(randomChosenColor);     // this will push our random color to the empty array gamePattern.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);// This is flash animation.
    $("#" + randomChosenColor).on("click", function () {  // This is randomly chosen sound/color.
        playSound(randomChosenColor)
    });
}

// Plays sound by its name.
function playSound(name) {

    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

// beginning of the game with "press any key" and increasing level.
let started = false;
let level = 0;
$("body").on("keydown", function () {

    if (!started) { //if started is not true.
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
})

// To check if btn clicked are in correct order
function checkAnswer(currenLevel1) {
    // To check if clicked order are correct.
    if (gamePattern[currenLevel1] === userClickedPattern[currenLevel1]) {
        console.log("success")
    }

    else { // when the clicked sequence is wrong.
            let wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }


    // If clicked sequence is correct then to move on next sequence.
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }

}

// startOver function if answer is wrong
function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}