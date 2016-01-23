// start slingin' some d3 here.

//make an object with gameOptions (play area height, width), number of enemies
var gameOptions = {
  containerHeight: 400,
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

//potentially use
//   Axes
var containerForSvg = d3.select('.container')
                        .append('svg')
                        .attr('width', gameOptions.containerWidth)
                        .attr('height', gameOptions.containerHeight)
                        .classed('playArea', true);
//d3.range([start, ]stop[, step])
// (0, ene, 1).map


// Creating an array of all the enemyUnits
var enemies = d3.range(gameOptions.enemyNumber);
                // .map(function(){
                //   return {
                //     xPosition: Math.random()*gameOptions.containerWidth,
                //     yPosition: Math.random()*gameOptions.containerHeight
                //   }
                // });

// Appending each enenmyUnit to the SVG
var enemyUnits = containerForSvg.selectAll('circle')
                                .data(enemies)
                                .enter()
                                .append('circle')
                                .attr('cx', function(){ return Math.random()*gameOptions.containerWidth; })
                                .attr('cy', function(){ return Math.random()*gameOptions.containerHeight; })
                                .attr('r', 10)
                                .attr('fill', 'red');

var swappingUnits = function(){enemyUnits.transition()
          .duration(1000)
          .attr('cx', function (){return Math.random()*gameOptions.containerWidth})
          .attr('cy', function (){return Math.random()*gameOptions.containerHeight})
        };
setInterval(swappingUnits, 1000);
          //maybe change colors as well


//make a draggable player
  //using d3.behavior.drag, on dragstart, drag, dragend

//collision detection
  //Collision Detection
    //very simple collision detection find the distance between the centers of an enemy and the players and if it's less the sum of their radii, there's been a collision so invoke the callback