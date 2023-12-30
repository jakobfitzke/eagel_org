class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 32:
          game.start();
          break;
        case 37:
          paddle.moveLeft();
          break;
        case 39:
          paddle.moveRight();
          break;
        case 65:
          paddle.moveLeft();
          break;
        case 68:
          paddle.moveRight();
          break;
        case 80:
          game.togglePause();
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) {
            paddle.stop();
          }
          break;
        case 39:
          if (paddle.speed > 0) {
            paddle.stop();
          }
          break;
        case 65:
          if (paddle.speed < 0) {
            paddle.stop();
          }
          break;
        case 68:
          if (paddle.speed > 0) {
            paddle.stop();
          }
          break;
        default:
          break;
      }
    });
  }
}

class Paddle {
  constructor(game) {
    this.width = 150;
    this.height = 30;
    this.gameWidth = game.gameWidth;
    this.maxSpeed = 4;
    this.speed = 0;
    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 80
    };
    this.image = document.getElementById("paddle");
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    this.position.x += this.speed;
    if (this.position.x < 64) {
      this.position.x = 64;
    }
    if (this.position.x + this.width > this.gameWidth - 64) {
      this.position.x = this.gameWidth - this.width - 64;
    }
  }
}

function detectCollision(ball, gameObject) {
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;

  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let sides = [];

  if (
    bottomOfBall >= topOfObject &&
    topOfBall <= bottomOfObject &&
    ball.position.x + ball.size >= leftSideOfObject &&
    ball.position.x <= rightSideOfObject
  ) {
    sides[0] = Math.abs(bottomOfBall - topOfObject);
    sides[1] = Math.abs(ball.position.x - rightSideOfObject);
    sides[2] = Math.abs(topOfBall - bottomOfObject);
    sides[3] = Math.abs(ball.position.x + ball.size - leftSideOfObject);
    let indexOfMinValue = sides.reduce(
      (iMin, x, i, arr) => (x < arr[iMin] ? i : iMin),
      0
    );
    return indexOfMinValue;
  } else {
    return -1;
  }
}

class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");
    this.reset();
    this.size = 16;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.dirChanged = false;
  }

  reset() {
    this.position = {
      x: this.gameWidth / 2 - this.size / 2 + 10,
      y: this.gameHeight - 148
    };
    this.speed = { x: 5, y: -3 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    this.dirChanged = false;

    // collision walls
    if (this.position.x + this.size > this.gameWidth - 64 || this.position.x < 64) {
      this.speed.x = -this.speed.x;
    }
    if (this.position.y < 128) {
      this.speed.y = -this.speed.y;
    }

    // collision bottom
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      if (this.game.lives !== 0) {
        this.reset();
      }
    }

    this.collision = detectCollision(this, this.game.paddle);

    if (this.collision === 0) {
      var paddleRight = this.game.paddle.position.x + this.game.paddle.width
      this.speed.x = (paddleRight - (this.position.x + this.size / 2)) / this.game.paddle.width * (-12) + 6;
      this.speed.y = -8 + Math.abs(this.speed.x);
      this.position.y = this.game.paddle.position.y - this.size;
    }
    else if (this.collision === 3) {
      this.speed.x = -this.speed.x;
      this.position.x = this.game.paddle.position.x - this.size;
    }
    else if (this.collision === 1) {
      this.speed.x = -this.speed.x;
      this.position.x = this.game.paddle.position.x + this.game.paddle.width;
    }
  }
}

class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.game = game;

    this.markedForDeletion = false;
  }

  update() {
    let collisionSide = detectCollision(this.game.ball, this);
    if (collisionSide === 0 || collisionSide === 2) {
      if (!this.game.ball.dirChanged) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
        this.game.ball.dirChanged = true;
      }
      this.markedForDeletion = true;
    }
    if (collisionSide === 1 || collisionSide === 3) {
      if (!this.game.ball.dirChanged) {
        this.game.ball.speed.x = -this.game.ball.speed.x;
        this.game.ball.dirChanged = true;
      }
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Penguin {
  constructor(game, position) {
    this.image = document.getElementById("penguin");
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.game = game;

    this.markedForDeletion = false;
  }

  update() {
    let collisionSide = detectCollision(this.game.ball, this);
    if (collisionSide >= 0) {
      this.image = document.getElementById("penguin_rotated");
      this.game.gamestate = GAMESTATE.GAMEWON;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class BlueIce {
  constructor(game, position) {
    this.image = document.getElementById("blueIce");
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.game = game;

    this.cracked = false;
    this.markedForDeletion = false;
  }

  update() {
    let collisionSide = detectCollision(this.game.ball, this);
    if (collisionSide === 0 || collisionSide === 2) {
      if (!this.game.ball.dirChanged) {
        this.game.ball.speed.y = -this.game.ball.speed.y;
        this.game.ball.dirChanged = true;
      }
      if (this.cracked) {
        this.markedForDeletion = true;
      }
      else {
        this.cracked = true;
        this.image = document.getElementById("crackedBlueIce");
      }
    }
    if (collisionSide === 1 || collisionSide === 3) {
      if (!this.game.ball.dirChanged) {
        this.game.ball.speed.x = -this.game.ball.speed.x;
        this.game.ball.dirChanged = true;
      }
      if (this.cracked) {
        this.markedForDeletion = true;
      }
      else {
        this.cracked = true;
        this.image = document.getElementById("crackedBlueIce");
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

function buildLevel(game, level) {
  let objects = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 64 + 64 * brickIndex,
          y: 128 + 64 * rowIndex
        };
        objects.push(new Brick(game, position));
      }
      else if (brick === 2) {
        let position = {
          x: 64 + 64 * brickIndex,
          y: 128 + 64 * rowIndex
        };
        objects.push(new Penguin(game, position));
      }
      else if (brick === 3) {
        let position = {
          x: 64 + 64 * brickIndex,
          y: 128 + 64 * rowIndex
        };
        objects.push(new BlueIce(game, position));
      }
    });
  });
  return objects;
}

const level = [
  [1, 0, 1, 0, 3, 2, 3, 0, 1, 0, 1],
  [1, 0, 1, 0, 3, 3, 3, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//const level = [[1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1]];

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  GAMEWON: 5
};

function increase() {
  if (game.gamestate === GAMESTATE.RUNNING) {
    game.time += 0.01;
    game.time = Math.round(game.time * 100) / 100
  }
}

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;

    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.objects = [];
    this.lives = 3;
    this.levels = [level];
    this.currentLevel = 0;
    new InputHandler(this.paddle, this);

    this.time = 0
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL &&
      this.gamestate !== GAMESTATE.GAMEOVER &&
      this.gamestate !== GAMESTATE.GAMEWON
    ) {
      return;
    }
    /*if (!detectMobile()) {
      fullScreen();
    }*/

    this.objects = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball, this.paddle];
    this.gamestate = GAMESTATE.RUNNING;
    this.lives = 3;
    this.ball.reset();
    this.time = 0;
    //setInterval(increase, 10);
    this.paddle.position.x = GAME_WIDTH / 2 - this.paddle.width / 2;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.GAMEWON
    ) {
      return;
    }

    /*if (this.objects.length === 0) {
      this.currentLevel++;
      if (this.currentLevel >= this.levels.length) {
        this.currentLevel = 0;
      }
      this.gamestate = GAMESTATE.GAMEWON;
    }*/
    if (!(this.gamestate === GAMESTATE.GAMEWON)) {
      [...this.gameObjects, ...this.objects].forEach((object) =>
        object.update(deltaTime)
      );
      this.objects = this.objects.filter((brick) => !brick.markedForDeletion);
    }
    if (clicked) {
      if (mouseX <= this.paddle.position.x + this.paddle.width / 2) {
        game.paddle.moveLeft();
      }
      else {
        game.paddle.moveRight();
      }
    }
  }

  draw(ctx) {
    var map = document.getElementById("map");
    var heart = document.getElementById("heart");
    ctx.drawImage(map, 0, 0);
    for (var i = 0; i < this.lives; i++) {
      ctx.drawImage(heart, game.gameWidth - heart.width - 10 - i * (heart.width + 10), 10);
    }

    [...this.gameObjects, ...this.objects].forEach((object) => object.draw(ctx));

    /*ctx.font = "bold 60px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(this.time, 10, 55);*/

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "bold 100px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("Pausiert", this.gameWidth / 2, this.gameHeight / 2 + 20);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fill();

      ctx.font = "bold 50px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText(
        "Klicke, um zu starten",
        this.gameWidth / 2,
        this.gameHeight / 2 + 20
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      /*ctx.font = "bold 100px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);*/
      var lost = document.getElementById("lost");
      ctx.drawImage(lost, 416 - lost.width / 2, 200);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Klicke, um es nochmal zu versuchen",
        this.gameWidth / 2,
        this.gameHeight / 2 + 170);
    }
    if (this.gamestate === GAMESTATE.GAMEWON) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fill();

      /*ctx.font = "bold 50px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.textAlign = "center";
      ctx.fillText("Der Pinguin ist besiegt", this.gameWidth / 2, this.gameHeight / 2);
      ctx.font = "bold 40px Arial";
      ctx.fillText(
        "Du hast " + game.time + " Sekunden gebraucht",
        this.gameWidth / 2,
        this.gameHeight / 2 + 60);*/
      var won = document.getElementById("won");
      ctx.drawImage(won, 416 - won.width / 2, 200);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Klicke, um nochmal zu spielen",
        this.gameWidth / 2,
        this.gameHeight / 2 + 170);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}

let canvas = document.getElementById("gameScreenIceBreaker");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 832;
const GAME_HEIGHT = 832;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

var clicked = false;
var mouseX = 0;

var fullScreenCanvas = document.querySelector('canvas');

function fullScreen() {
  var el = document.getElementById('gameScreenIceBreaker')
  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  }
  else {
    el.mozRequestFullScreen();
  }
}

window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  clicked = true;
  return false;
};

function click(evt, canvas) {
  var rect = canvas.getBoundingClientRect();
  scaleX = canvas.width / rect.width
  mouseX = (evt.clientX - rect.left) * scaleX;
  clicked = true;
  if (!(game.gamestate === GAMESTATE.RUNNING)) {
    game.start();
  }
}

function released(evt, canvas) {
  clicked = false;
  var rect = canvas.getBoundingClientRect();
  scaleX = canvas.width / rect.width
  mouseX = (evt.clientX - rect.left) * scaleX;
  game.paddle.stop();
}

function moved(evt, canvas) {
  var rect = canvas.getBoundingClientRect();
  scaleX = canvas.width / rect.width
  mouseX = (evt.clientX - rect.left) * scaleX;
}

fullScreenCanvas.addEventListener("mousedown", function (evt) { click(evt, fullScreenCanvas) });
fullScreenCanvas.addEventListener("mouseup", function (evt) { released(evt, fullScreenCanvas) });
fullScreenCanvas.addEventListener("mousemove", function (evt) { moved(evt, fullScreenCanvas) });

canvas.addEventListener("touchstart", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

function detectMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  return isMobile;
}

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);