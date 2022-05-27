
let jumperSize = 60;
let jumperX;
let jumperY;
let jumperVelocity;
let jumperXSpeed = 4;
let platformWidth = 85;
let platformHeight = 15;
let platformNr = 5;
let platforms = [];
let platformY = 0;
let gameStarted;
let score = 0;
let highscore = 0;
let jumperLeftImg;
let jumperRightImg;
let platformImg;
let backgroundImg;

function preload() {
	backgroundImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Graph-paper.svg/1024px-Graph-paper.svg.png");
	jumperLeftImg = loadImage("assets/duck.png");
	jumperRightImg = loadImage("https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-doodler-right.png");
	platformImg = loadImage('assets/leaf.png');
}

function setup(){
	createCanvas(400, 600);
	frameRate(60);
	gameStarted = false;
}

function draw(){
	background(247, 239, 231);
	image(backgroundImg, 0, 0, 400, 600);

	if(gameStarted){
		drawPlatforms();
		drawJumper();
		checkCollision();
		moveJumper();
		moveScreen();
	}else{
		//menu
		fill(0);
		textSize(60);
		text("Start", 140, 275);
		textSize(30);
		text("Score: " + score, 150, 325);
		textSize(20);
		text("High Score: " + highscore, 150, 360);
	}
}

function moveScreen(){
	if (jumperY < 250) {
		platformY = 3;
		jumperVelocity += 0.25;
	}else{
		platformY = 0;
	}

}

function mousePressed(){
	if(!gameStarted){
		score = 0;
		setupPlatforms();
		jumperY = 350;
		jumperX = platforms[platforms.length - 1].xPos + 15;
		jumperVelocity = 0.1;
		gameStarted = true;
	}
}

function drawJumper(){
	fill(204, 200, 52);
	image(jumperLeftImg, jumperX, jumperY, jumperSize, jumperSize);
}

function moveJumper(){
	jumperVelocity += 0.2;
	jumperY += jumperVelocity;

	if(keyIsDown(LEFT_ARROW)) {
		jumperX -= jumperXSpeed;
	}
	if(keyIsDown(RIGHT_ARROW)) {
		jumperX += jumperXSpeed;
	}
}

function setupPlatforms(){
	for (let i = 0; i < platformNr; i++) {
		let platformGap = height / platformNr;
		let newPlatformYPos = i * platformGap;
		let platform  = new Platform(newPlatformYPos);
		platforms.push(platform);
		
	}
}

function drawPlatforms(){
	fill(123, 40, 36);
	platforms.forEach(function(platform){
		platform.yPos += platformY;
		image(platformImg, platform.xPos, platform.yPos, platform.width, platform.height);

		if (platform.yPos > 600) {
			score++;
			platforms.pop();
			let newPlatform = new Platform(0);
			platforms.unshift(newPlatform);
		}
	});
}

class Platform {
	constructor(newPlatformYPos) {
		this.xPos = random(15, 300);
		this.yPos = newPlatformYPos;
		this.width = platformWidth;
		this.height = platformHeight;

	}
}

function checkCollision() {
	platforms.forEach(function(plat) {
	  if(
		jumperX < plat.xPos + plat.width &&
		jumperX + jumperSize > plat.xPos &&
		jumperY + jumperSize < plat.yPos + plat.height &&
		jumperY + jumperSize > plat.yPos &&
		jumperVelocity > 0
	  ) {
		jumperVelocity = -10;
	  }
	});
	
	if(jumperY > height) {
	  if(score > highscore) {
		highscore = score;
	  }
	  gameStarted = false;
	  platforms = [];
	}
	
	// screen wraps from left to right
	if(jumperX < -jumperSize) {
	  jumperX = width;
	} else if(jumperX > width) {
	  jumperX = -jumperSize;
	}
  }