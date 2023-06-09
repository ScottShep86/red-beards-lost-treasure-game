const canvas = document.getElementById("canvas");
//canvas.style.border = "2px solid black";
const ctx = canvas.getContext("2d");

let startScreen = document.querySelector(".game-intro");
let creditLogo = document.querySelector(".credit-logo");
let restartBtn = document.querySelector("#restart-btn");
let musicBtn = document.querySelector("#music-btn");

let gameBackground = new Image();
gameBackground.src = "images/parchmentAncient.png";
let gameBackground1X = 0;
let gameBackground2X = -canvas.width;

let larsPirate = new Image();
larsPirate.src = "images/lars.png";

let skeleton = new Image();
skeleton.src = "images/skeleton.png";

let crab = new Image();
crab.src = "images/redCrab.png";

let gameOverSkull = new Image();
gameOverSkull.src = "images/pirate skull.png";
let gameOverSkullWidth = 400;
let gameOverSkullHeight = 400;

let tree = new Image();
tree.src = "images/rocks.png";

let coin = new Image();
coin.src = "images/coin.png";

let youWonChest = new Image();
youWonChest.src = "images/chest.png";
let youWonChestWidth = 400;
let youWonChestHeight = 400;

let larsPirateWidth = 70;
let larsPirateHeight = 90;
const larsPirateSpeed = 3;
let larsPirateX = canvas.width - larsPirateWidth - 20;

let isMovingUp = false;
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;
let larsPirateY = canvas.height / 2 - larsPirateHeight / 2;

let gameOver = false;
let animateId;
let score = 0;

let skeletons = [];
let crabs = [];
let stones = [];
let coins = [];

let loadingPageAudio = new Audio();
loadingPageAudio.src = "./sounds/redbeardslosttreasurepart1.mp3";

let gameAudio = new Audio();
gameAudio.src = "./sounds/redbeardslosttreasurepart2.mp3";

let gameOverAudio = new Audio();
gameOverAudio.src = "./sounds/gameover.wav";

let youWonAudio = new Audio();
youWonAudio.src = "./sounds/youwon.wav";

let youWonCheersAudio = new Audio();
youWonCheersAudio.src = "./sounds/cheers.wav";

let coinsAudio = new Audio();
coinsAudio.src = "./sounds/coins.wav";



class Stone {
  constructor(y) {
    this.xPos = -50;
    this.yPos = y;
    this.width = 64;
    //this.height = 128;
    this.height = 64;
  }

  move() {
    this.xPos += 3;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    // xPos, yPos, width, height
    ctx.drawImage(tree, this.xPos, this.yPos, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }
}

class Skeleton {
  constructor(y) {
    this.xPos = -50;
    this.yPos = y;
    this.width = 60;
    this.height = 80;
  }

  move() {
    this.xPos += 4;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    // xPos, yPos, width, height
    ctx.drawImage(skeleton, this.xPos, this.yPos, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }

  checkCollision() {
    if (
      larsPirateY < this.yPos + (this.height - 13) &&
      larsPirateY + larsPirateHeight > this.yPos + 10 &&
      larsPirateX < this.xPos + (this.width - 18) &&
      larsPirateWidth + larsPirateX > this.xPos + 10
    ) {
      gameOver = true;
      console.log("Collision");
    }
  }
}

class Crab {
  constructor(y) {
    this.xPos = -150;
    this.yPos = y;
    this.width = 150;
    this.height = 99;
  }

  move() {
    this.xPos += 1.5;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    // xPos, yPos, width, height
    ctx.drawImage(crab, this.xPos, this.yPos, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }

  checkCollision() {
    if (
      larsPirateY < this.yPos + (this.height - 20) &&
      larsPirateY + larsPirateHeight > this.yPos + 10 &&
      larsPirateX < this.xPos + (this.width - 20) &&
      larsPirateWidth + larsPirateX > this.xPos + 10
    ) {
      // Collision detected!
      // Game Over
      gameOver = true;
      console.log("Collision");
    }
  }
}

class Coin {
  constructor(y) {
    this.xPos = -50;
    this.yPos = y;
    this.width = 50;
    this.height = 50;
  }

  move() {
    this.xPos += 3;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    // xPos, yPos, width, height
    ctx.drawImage(coin, this.xPos, this.yPos, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }

  checkCollision() {
    if (
      larsPirateY < this.yPos + (this.height - 5) &&
      larsPirateY + larsPirateHeight > this.yPos &&
      larsPirateX < this.xPos + (this.width - 5) &&
      larsPirateWidth + larsPirateX > this.xPos
    ) {
      score += 1;
      coinsAudio.volume = 0.3;
      coinsAudio.play();
      this.xPos = -2000;
    }
  }
}

const drawBackground = () => {
  ctx.beginPath();
  ctx.drawImage(
    gameBackground,
    gameBackground1X,
    0,
    canvas.width,
    canvas.height
  );
  ctx.drawImage(
    gameBackground,
    gameBackground2X,
    0,
    canvas.width,
    canvas.height
  );
  gameBackground1X += 3;
  gameBackground2X += 3;
  if (gameBackground1X > canvas.width) {
    gameBackground1X = -canvas.width;
  }
  if (gameBackground2X > canvas.width) {
    gameBackground2X = -canvas.width;
  }
  ctx.closePath();
};

const drawLarsPirate = () => {
  ctx.beginPath();
  ctx.drawImage(
    larsPirate,
    larsPirateX,
    larsPirateY,
    larsPirateWidth,
    larsPirateHeight
  );
  ctx.closePath();
  if (isMovingUp) {
    if (larsPirateY > 0) {
      larsPirateY -= larsPirateSpeed;
    }
  } else if (isMovingDown) {
    if (larsPirateY < canvas.height - larsPirateHeight) {
      larsPirateY += larsPirateSpeed;
    }
  } else if (isMovingLeft) {
    if (larsPirateX > 0) {
      larsPirateX -= larsPirateSpeed;
    }
  } else if (isMovingRight) {
    if (larsPirateX < canvas.width - larsPirateWidth) {
      larsPirateX += larsPirateSpeed
    }
  }
};

const drawScore = () => {
  ctx.beginPath();
  ctx.font = "20pt TreasureMapDeadhand-yLA3";
  ctx.fillText(`Chest : ${score}`, 10, 30);
  ctx.closePath();
};

const animate = () => {
  drawBackground();
  
  const stonesStillInScreen = [];

  console.log(stones);
  stones.forEach((stone) => {
    stone.draw();
    stone.move();
    if (stone.xPos < canvas.width) {
      stonesStillInScreen.push(stone);
    }
  });
  stones = stonesStillInScreen;

  if (animateId % 20 === 0) {
    stones.push(new Stone(Math.random() * (canvas.height - 200)));
  }

  const coinsStillInScreen = [];

  console.log(coins);
  coins.forEach((coin) => {
    coin.draw();
    coin.checkCollision();
    coin.move();
    if (coin.xPos < canvas.width) {
      coinsStillInScreen.push(coin);
    }
  });
  coins = coinsStillInScreen;

  if (animateId % 600 === 0) {
    coins.push(new Coin(Math.random() * (canvas.height - 99)));
  }

  drawLarsPirate();
  drawScore();

  const skeletonsStillInScreen = [];

  console.log(skeletons);
  skeletons.forEach((skeleton) => {
    skeleton.draw();
    skeleton.checkCollision();
    skeleton.move();
    if (skeleton.xPos < canvas.width) {
      skeletonsStillInScreen.push(skeleton);
    }
  });
  skeletons = skeletonsStillInScreen;

  if (animateId % 100 === 0) {
    skeletons.push(new Skeleton(Math.random() * (canvas.height - 90)));
  }

  const crabsStillInScreen = [];

  console.log(crabs);
  crabs.forEach((crab) => {
    crab.draw();
    crab.checkCollision();
    crab.move();
    if (crab.xPos < canvas.width) {
      crabsStillInScreen.push(crab);
    }
  });
  crabs = crabsStillInScreen;

  if (animateId % 600 === 0) {
    crabs.push(new Crab(Math.random() * (canvas.height - 99)));
  }

  if (gameOver) {
    cancelAnimationFrame(animateId);
    restartBtn.style.display = "block";
    gameAudio.pause();
    gameOverAudio.volume = 0.2;
    gameOverAudio.play();
    ctx.drawImage(
      gameOverSkull,
      280,
      100,
      gameOverSkullWidth,
      gameOverSkullHeight
    );
  } else {
    animateId = requestAnimationFrame(animate);
  }

  if (score === 10) {
    cancelAnimationFrame(animateId);
    restartBtn.style.display = "block";
    gameAudio.pause();
    youWonAudio.volume = 0.3;
    youWonAudio.play();
    youWonCheersAudio.volume = 0.1;
    youWonCheersAudio.play();
    ctx.font = "30pt TreasureMapDeadhand-yLA3";
    ctx.fillStyle = "#28282B";
    ctx.fillText("YOU WON!", canvas.width / 2 - 80, canvas.height / 2 - 100);
    ctx.drawImage(
      youWonChest,
      320,
      100,
      gameOverSkullWidth,
      gameOverSkullHeight
    );
  }
};

window.onload = () => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";
  document.getElementById("start-btn").onclick = () => {
    startGame();
  };

  function startGame() {
    //console.log("Let's GO!");
    canvas.style.display = "block";
    restartBtn.style.display = "none";
    startScreen.style.display = "none";
    creditLogo.style.display = "none";
    loadingPageAudio.pause();
    gameAudio.loop = true;
    gameAudio.volume = 0.1;
    gameAudio.play();

    animate();
  }

  function restartGame() {
    larsPirateX = canvas.width - larsPirateWidth - 20;
    isMovingUp = false;
    isMovingDown = false;
    isMovingLeft = false;
    isMovingRight = false;
    larsPirateY = canvas.height / 2 - larsPirateHeight / 2;
    gameOver = false;
    animateId;
    score = 0;
    skeletons = [];
    crabs = [];
   /*  stones = []; */
    coins = [];
    gameAudio.currentTime = 0;
    gameAudio.volume = 0.1;
    startGame();
  }

  function musicStart() {
    loadingPageAudio.loop = true;
    loadingPageAudio.volume = 0.1;
    loadingPageAudio.play();
  }

  function musicStop() {
    loadingPageAudio.pause();
    loadingPageAudio.currentTime = 0;
  }

  document.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === "ArrowUp") {
      isMovingUp = true;
    }
    if (event.key === "ArrowDown") {
      isMovingDown = true;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = true;
    }
    if (event.key === "ArrowRight") {
      isMovingRight = true;
    }
    console.log({ isMovingUp, isMovingDown });
  });

  document.addEventListener("keyup", (event) => {
    console.log(event);
    if (event.key === "ArrowUp") {
      isMovingUp = false;
    }
    if (event.key === "ArrowDown") {
      isMovingDown = false;
    }
    if (event.key === "ArrowLeft") {
      isMovingLeft = false;
    }
    if (event.key === "ArrowRight") {
      isMovingRight = false;
    }
    console.log({ isMovingUp, isMovingDown });
  });

  document.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === "r" || event.key === "R") {
      larsPirate.src = "images/ruby.png";
    }
    if (event.key === "l" || event.key === "L") {
      larsPirate.src = "images/lars.png";
    }
    if (event.key === "n" || event.key === "N") {
      larsPirate.src = "images/nightwing.png";
    }
    if (event.key === "b" || event.key === "B") {
      skeleton.src = "images/bane.png";
    }
    if (event.key === "s" || event.key === "S") {
      musicStop();
    }
  });

  document.addEventListener("keyup", (event) => {
    console.log(event);
    if (event.key === "b" || event.key === "B") {
      skeleton.src = "images/skeleton.png";
    }
  });

  restartBtn.addEventListener("click", () => {
    restartGame();
  });

  musicBtn.addEventListener("click", () => {
    musicStart();
  });
};
