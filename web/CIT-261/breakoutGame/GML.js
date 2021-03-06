var canvas = document.getElementById("space");
var ctx = canvas.getContext("2d");
var xT = canvas.width/2;
var yT = canvas.height-20;
//cordinates of ship
var RightXT = xT+20;
var LeftXT = xT-20;
var TCornerHight = yT+20;
//bullet var
var bullets = [];
var numOfBullets = 25;
var canfire = 0;

var bulletSound;

//brick variables
var brickRowCount = 3;
var brickColumnCount = 1;
var brickWidth = 40;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = canvas.width/2.6;
//brick array creation
var bricks = [];

var create = true;
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/*///////////////////////////////////////////////////////////
Show controls when the canvas and video tag are visible
//////////////////////////////////////////////////////////*/

function show(){
  var video = document.getElementById("showMe");
    video.classList.toggle("show");
  var game = document.getElementById("space");
  game.classList.toggle("hide");
}


/*///////////////////////////////////////////////////////////
// start creates the brick matrix and calls the
// Audio constructor
//////////////////////////////////////////////////////////*/
function start(){
  for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
      var newbrick = new brick((c*(brickWidth+brickPadding))+brickOffsetLeft, (r*(brickHeight+brickPadding))+brickOffsetTop, 1 );
        bricks[c][r] = newbrick;
      }
    }
    bulletSound = new bang("bang.m4a");
    create = false;
  }

/*///////////////////////////////////////////////////////////
// bang() is the Audio constroctor.
//////////////////////////////////////////////////////////*/
function bang(soundFile){
    //create an audio element
  this.bang = document.createElement("audio");
  //audio file src assigned to the sound file
  this.bang.src = soundFile;
  //audio atribute prload auto: the browser "should"
    //load the entire file when page loads
  this.bang.setAttribute("preload", "auto");
  this.bang.style.display = "none";
  document.body.appendChild(this.bang);
  this.play = function(){
      this.bang.play();
  }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if (e.keyCode == 32) {
      spacePressed = true;
    }
}
function keyUpHandler(e) {
  if (e.keyCode == 32) {
    spacePressed = false;
  }
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }

}

function drawTriangle(){
  ctx.beginPath();
  ctx.moveTo(xT,yT);
  ctx.lineTo(RightXT,TCornerHight);
  ctx.lineTo(LeftXT,TCornerHight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
}

function drawBullet(){
  if(bullets.length > 0){
    for(var i=0; i < bullets.length; i++)
    {
      if (bullets[i].alive) {
        ctx.beginPath();
        ctx.arc(bullets[i].xLocation,bullets[i].yLocation, 4, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

/*///////////////////////////////////////////////////////////
// checkBricksLife() checks if any brick is alive
//////////////////////////////////////////////////////////*/
function checkBricksLife(){
  var brickLife0 = bricks[0][0].alive
  var brickLife1 = bricks[0][1].alive
  var brickLife2 = bricks[0][2].alive

  if (brickLife0 || brickLife1 || brickLife2) {
    return 1
  }
  else {
    return 0
  }

}


function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
      for(r=0; r<brickRowCount; r++) {
        if(bricks[c][r].alive == 1) {
            ctx.beginPath();
            ctx.rect(bricks[c][r].xLocation, bricks[c][r].yLocation, brickWidth, brickHeight);
            switch (bricks[c][r].hearts) {
              case 3:
                ctx.fillStyle = "#0000ff";
                break;
              case 2:
                ctx.fillStyle = "#3399ff";
                break;
              case 1:
                ctx.fillStyle = "#66ffff";
                break;
              default:
              ctx.fillStyle = "#99ffcc";

            }

            ctx.fill();
            ctx.closePath();
        }
      }
    }
  }

/*///////////////////////////////////////////////////////////
// Bullet():bullet constructor
//////////////////////////////////////////////////////////*/
function Bullet(xLocation,yLocation,alive){

    this.xLocation = xLocation;
    this.yLocation = yLocation-5 ;
    this.alive = alive;
    this.kill = function(){
      this.alive = 0;
    }
}

/*///////////////////////////////////////////////////////////
// Bullet():bullet constructor
//////////////////////////////////////////////////////////*/
function brick(x,y,alive){
    //brick inherites form the bullet prototype chain
  Bullet.call(this, x, y, alive);
  this.leftOrRight = true;
  this.hearts = 3;
  this.imune = false;
}

/*///////////////////////////////////////////////////////////
// fireBullet() calls the bullet constructor
//////////////////////////////////////////////////////////*/
function fireBullet(){
  if (spacePressed && numOfBullets > 0 &&canfire > 100) {
      var alive = 1;
      var bullet = new Bullet(xT,yT,alive)
      bullets.push(bullet);
      numOfBullets -=1
      canfire = 0;
      bulletSound.play()
  }
  if(canfire < 110){
   canfire += 1;
 }
}

/*///////////////////////////////////////////////////////////
// collision() checks if a bullet had made "contact"
// with a brick
//////////////////////////////////////////////////////////*/
function collision(){
  for (c=0; c < brickColumnCount; c++){
    for ( r=0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.alive == 1) {
        for(i=0; i < bullets.length; ++i){
          if(bullets[i].alive && b.alive)
          {
            var bull = bullets[i]
            if(bull.xLocation > b.xLocation && bull.xLocation < b.xLocation+brickWidth && bull.yLocation > b.yLocation && bull.yLocation < b.yLocation+brickHeight) {
              if (b.hearts <= 0) {
                b.alive = 0;
              }
              bull.alive = 0;
              b.hearts -= 1;
            }
          }
        }
      }
    }
  }
}

/*///////////////////////////////////////////////////////////
// move(): changes the properti value of the bullet and
// and brick objects and the cordinate variables of the
// triangle ship
//////////////////////////////////////////////////////////*/
function move(){
  if(rightPressed && RightXT < canvas.width){
    RightXT += 7;
    LeftXT += 7;
    xT += 7;
  }
  else if (leftPressed && LeftXT > 0) {
    RightXT -= 7;
    LeftXT -= 7;
    xT -= 7;
  }
  for(var i=0; i < bullets.length; i++)
  {
    if (bullets[i].alive) {
      bullets[i].yLocation -= 6;
    }
  }
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      switch (r) {
        case 2:
        if (bricks[c][r].alive && bricks[c][r].leftOrRight) {
          if (bricks[c][r].xLocation < 0) {
            bricks[c][r].leftOrRight = !bricks[c][r].leftOrRight;
          }
          bricks[c][r].xLocation -= 2;
        }else if (bricks[c][r].alive && !bricks[c][r].leftOrRight) {
          if (bricks[c][r].xLocation + brickWidth > canvas.width) {
            bricks[c][r].leftOrRight = !bricks[c][r].leftOrRight;
          }
          bricks[c][r].xLocation +=2;
        }
          break;
          case 1:
          if (bricks[c][r].alive && bricks[c][r].leftOrRight) {
            if (bricks[c][r].xLocation + brickWidth > canvas.width) {
              bricks[c][r].leftOrRight = !bricks[c][r].leftOrRight;
            }
            bricks[c][r].xLocation += 3;
          }else if (bricks[c][r].alive && !bricks[c][r].leftOrRight) {
            if (bricks[c][r].xLocation < 0) {
              bricks[c][r].leftOrRight = !bricks[c][r].leftOrRight;
            }
            bricks[c][r].xLocation -=3;
          }
            break;
        default:
        if (bricks[c][r].alive && bricks[c][r].leftOrRight) {
          if (bricks[c][r].xLocation < 0) {
            bricks[c][r].leftOrRight = !bricks[c][r].leftOrRight;
          }
          bricks[c][r].xLocation -= 4;
        }else if (bricks[c][r].alive && !bricks[c][r].leftOrRight) {
          if (bricks[c][r].xLocation + brickWidth > canvas.width) {
            bricks[c][r].leftOrRight = !bricks[c][r].leftOrRight;
          }
          bricks[c][r].xLocation +=4;
        }

      }
    }
  }
}

/*///////////////////////////////////////////////////////////
// draw() is the game loop
//////////////////////////////////////////////////////////*/
function draw(){
  if (create){start()}
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawTriangle();
  fireBullet();
  drawBullet();
  drawBricks();
  collision();
  move();

    //the if statement will change the background img at the end of the game
    if (checkBricksLife() && numOfBullets <= 0) {
      document.body.style.backgroundImage = "url(black.jpg)";
    }
    else if (!checkBricksLife() && numOfBullets >= 0) {
      document.body.style.backgroundImage = "url(won.jpg)";
    }
}

/*///////////////////////////////////////////////////////////
// setInterval() calls the draw function every 10 milliseconds
//////////////////////////////////////////////////////////*/
setInterval(draw,10);
