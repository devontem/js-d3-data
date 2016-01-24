// start slingin' some d3 here.

//make an object with gameOptions (play area height, width), number of enemies
var gameOptions = {
  containerHeight: 450,
  containerWidth: 700,
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

//function to increment score on an interval of 1/10 of a second
var scoreUpdater = function(){
  setInterval(function(){
    scoreBoard.currentScore++;  
    d3.select('.current span').text(scoreBoard.currentScore);
  }, 100);
}
scoreUpdater();
// Container SVG used for gameboard
var containerForSvg = d3.select('.container')
                        .append('svg')
                        .attr('width', gameOptions.containerWidth)
                        .attr('height', gameOptions.containerHeight)
                        .classed('playArea', true);


// Creating an array of all the enemyUnits
var enemies = d3.range(gameOptions.enemyNumber);

// Appending each enenmyUnit to the SVG
var enemyUnits = containerForSvg.selectAll('circle')
                                .data(enemies)
                                .enter()
                                // .append('div')
                                // .attr('class', 'spin')
                                .append("svg:image")
                                .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/4/49/Pacman.svg")
                                .attr('x', function(){ return Math.random()*gameOptions.containerWidth; })
                                .attr('y', function(){ return Math.random()*gameOptions.containerHeight; })
                                // .attr('r', 10)
                                // .attr('height', '50px')
                                // .attr('width', '50px')
                                .attr("width", 20)
                                .attr("height", 20);

                                //.attr("class", 'pacMan');
                                // .attr("x", 228)
                                // .attr("y",53);
                                // .attr('fill', 'red');

var swappingUnits = function(){
					enemyUnits.transition()
                    .duration(2000)
                    .attr('x', function (){ return Math.random()*gameOptions.containerWidth})
                    .attr('y', function (){ return Math.random()*gameOptions.containerHeight})
        };
setInterval(swappingUnits, 2500);
//maybe change colors as well
var drag = d3.behavior.drag()
             .on('drag', function() { 
                playerUnit.attr('x', d3.event.x)
                          .attr('y', d3.event.y);
                          
                //checkCollision(enemyUnits, playerUnit);
});

var playerUnit = containerForSvg
                                .append('svg:image')
                                .attr("xlink:href", "inky.png")
                                .attr('height', 20)
                                .attr('width', 20)
                                .attr('x', 250)
                                .attr('y', 250)
                                // .attr('r', 10)
                                // .attr('fill', 'blue')
                                .call(drag);

// function to check for collisions
var hasCollided = false;
var checkCollision = function(enemyUnits, player){
  //loop over enemy units, on each
  var collided = false;
  for (var i = 0; i < enemyUnits[0].length; i++){
    //console.log(d3.select(enemyUnits[0][i]).attr('cx'));
    var enemyX = d3.select(enemyUnits[0][i]).attr('x');
    var enemyY = d3.select(enemyUnits[0][i]).attr('y');
    var playerX = player.attr('x');
    var playerY = player.attr('y');
    
    var xDistance = enemyX - playerX;
    var yDistance = enemyY - playerY;
    var proximity = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  
    if ( proximity < 20 ){
      collided = true;
    }
  }
  if(collided){
      if(hasCollided !== collided){
        postCollisionScoreboardUpdater();
      }
    }
  hasCollided = collided;
};
d3.timer(function(){checkCollision(enemyUnits,playerUnit)});
// setInterval(function(){
//   checkCollision(enemyUnits, playerUnit)
// }, 50);

//make a draggable player
  //using d3.behavior.drag, on dragstart, drag, dragend


//collision detection
  //Collision Detection
    //very simple collision detection find the distance between the centers of an enemy and the players and if it's less the sum of their radii, there's been a collision so invoke the callback