const canvas = document.getElementById("canvas");
//canvas.style.border = "2px solid black";
const ctx = canvas.getContext("2d");

let startScreen = document.querySelector(".game-intro");
let creditLogo = document.querySelector(".credit-logo");
let restartBtn = document.querySelector("#restart-btn");

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
let larsPirateX = canvas.width - larsPirateWidth - 20;

let isMovingUp = false;
let isMovingDown = false;
let larsPirateY = canvas.height / 2 - larsPirateHeight / 2;

let gameOver = false;
let animateId;
let score = 0;

let skeletons = [];
let crabs = [];
let trees = [];
let coins = [];

/* const loadingPageAudio = new Audio(
  "sounds/RED BEARDS LOST TREASURE part 1.mp3"
).loop() = true; */

/* const gameAudio = new Audio(
  "sounds/RED BEARDS LOST TREASURE part 2.mp3"
).loop(true); */

const audios = document.querySelectorAll('.audio');
	
	if (audios.length != 0){
		for (var i=0; i < audios.length; i++){
			(audios[i].paused) ? audios[i].play() : audios[i].pause();
		}
	}

class Tree {
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
      larsPirateY < this.yPos + (this.height - 15) &&
      larsPirateY + larsPirateHeight > (this.yPos + 10) &&
      larsPirateX < this.xPos + (this.width - 18) &&
      larsPirateWidth + larsPirateX > (this.xPos + 10)
    ) {
      // Collision detected!
      // Game Over
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
      larsPirateY + larsPirateHeight > (this.yPos + 10) &&
      larsPirateX < this.xPos + (this.width - 20) &&
      larsPirateWidth + larsPirateX > (this.xPos + 10)
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
      // Collision detected!
      // 1 coin in the treasure chest
      score += 1;
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
};

const drawScore = () => {
  ctx.beginPath();
  ctx.font = "20pt TreasureMapDeadhand-yLA3";
  ctx.fillText(`Chest : ${score}`, 10, 30);
  ctx.closePath();
};

const animate = () => {
  drawBackground();
  drawLarsPirate();
  drawScore();

  const skeletonsStillInScreen = [];

  console.log(skeletons);
  skeletons.forEach((skeleton) => {
    skeleton.draw();
    skeleton.checkCollision();
    skeleton.move();
    // Is my obstacle still in the screen
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
    // Is my obstacle still in the screen
    if (crab.xPos < canvas.width) {
      crabsStillInScreen.push(crab);
    }
  });
  crabs = crabsStillInScreen;

  if (animateId % 600 === 0) {
    crabs.push(new Crab(Math.random() * (canvas.height - 99)));
  }

  const treesStillInScreen = [];

  console.log(trees);
  trees.forEach((tree) => {
    tree.draw();
    tree.move();
    // Is my obstacle still in the screen
    if (tree.xPos < canvas.width) {
      treesStillInScreen.push(tree);
    }
  });
  trees = treesStillInScreen;

  if (animateId % 20 === 0) {
    trees.push(new Tree(Math.random() * (canvas.height - 200)));
  }

  const coinsStillInScreen = [];

  console.log(coins);
  coins.forEach((coin) => {
    coin.draw();
    coin.checkCollision();
    coin.move();
    // Is my obstacle still in the screen
    if (coin.xPos < canvas.width) {
      coinsStillInScreen.push(coin);
    }
  });
  coins = coinsStillInScreen;

  if (animateId % 600 === 0) {
    coins.push(new Coin(Math.random() * (canvas.height - 99)));
  }

  if (isMovingUp) {
    larsPirateY -= 2.5;
  } else if (isMovingDown) {
    larsPirateY += 2.5;
  }

  if (gameOver) {
    cancelAnimationFrame(animateId);
    restartBtn.style.display = "block";
    //ctx.font = "30pt TreasureMapDeadhand-yLA3";
    //ctx.fillText("GAME OVER", canvas.width / 2 - 125, canvas.height / 2 - 140);
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

  if (score >= 51) {
    cancelAnimationFrame(animateId);
    restartBtn.style.display = "block";
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
  /* loadingPageAudio.play(); */
  document.getElementById("start-btn").onclick = () => {
    startGame();
  };

  function startGame() {
    //console.log("Let's GO!");
    canvas.style.display = "block";
    restartBtn.style.display = "none";
    startScreen.style.display = "none";
    creditLogo.style.display = "none";
    /* loadingPageAudio.pause();
    loadingPageAudio.currentTime = 0;
    gameAudio.play(); */

    animate();
  }

  function restartGame() {
    larsPirateX = canvas.width - larsPirateWidth - 20;
    isMovingUp = false;
    isMovingDown = false;
    larsPirateY = canvas.height / 2 - larsPirateHeight / 2;
    gameOver = false;
    animateId;
    score = 0;
    skeletons = [];
    crabs = [];
    trees = [];
    coins = [];
    startGame();
  }

  document.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === "ArrowUp") {
      isMovingUp = true;
    }
    if (event.key === "ArrowDown") {
      isMovingDown = true;
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
};
