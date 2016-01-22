// start slingin' some d3 here.

//make an object with gameOptions (play area height, width), number of enemies
var gameOptions = {
  containerHeight: 500,
  containerWidth: 500,
  enemyNumber : 25
  //padding: 20;
}

var scoreBoard = {
  highestScore: 0,
  currentScore: 0,
  collisions: 0
}
//updates the scoreboard after a collision
var postCollisionScoreboardUpdater = function(){
  if(scoreBoard.currentScore > scoreBoard.highestScore){
    scoreBoard.highestScore = scoreBoard.currentScore;
    d3.select('.high span').text(scoreBoard.highestScore);
  }
  scoreBoard.currentScore = 0;
  d3.select('.current span').text(scoreBoard.currentScore);
  scoreBoard.collisions += 1;
  d3.select('.collisions span').text(scoreBoard.collisions);
}

// create function to increment score on an interval
var scoreUpdater = function(){
  setInterval(function(){
    scoreBoard.currentScore++;  
    d3.select('.current span').text(scoreBoard.currentScore);
  }, 100);
}
//Uncomment this to run scoreboard
// scoreUpdater();



//make an object for the game stats (score and best score)

//potentially use
//   Axes

// Our game coordinates range from 0 to 100 in both x and y axes. This gets mapped to our pixelled game area using these scale functions

//make a container to play the game in
//make the enemies
  //start with circles

//make a draggable player
  //using d3.behavior.drag, on dragstart, drag, dragend

//collision detection
  //Collision Detection
    //very simple collision detection find the distance between the centers of an enemy and the players and if it's less the sum of their radii, there's been a collision so invoke the callback