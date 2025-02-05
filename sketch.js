let spriteSheets = [];
let characters = [];
let frameWidth = 80;
let frameHeight = 80;
let totalFrames = 4; // Number of frames in walking animation
let frameDelay = 8; // Adjust timing so the animation looks natural

function preload() {
  // Load at least three different character sprite sheets
  spriteSheets.push(loadImage('assets/character1.png'));
  spriteSheets.push(loadImage('assets/character2.png'));
  spriteSheets.push(loadImage('assets/character3.png'));
}

function setup() {
  createCanvas(800, 600);

  // Instantiate three characters from different sprite sheets at random positions
  for (let i = 0; i < spriteSheets.length; i++) {
    characters.push(new Character(random(width), random(height - 80), spriteSheets[i]));
  }
}

function draw() {
  background(255);

  // Update and display all characters
  for (let character of characters) {
    character.update();
    character.display();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    for (let character of characters) {
      character.move(-3); // Move left
    }
  } else if (keyCode === RIGHT_ARROW) {
    for (let character of characters) {
      character.move(3); // Move right
    }
  }
}

class Character {
  constructor(x, y, spriteSheet) {
    this.x = x;
    this.y = y;
    this.spriteSheet = spriteSheet;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.walking = false;
    this.direction = 1; // 1 = right, -1 = left
  }

  update() {
    // Only animate when walking
    if (this.walking) {
      this.frameCounter++;
      if (this.frameCounter >= frameDelay) {
        this.frameCounter = 0;
        this.currentFrame = (this.currentFrame + 1) % totalFrames;
      }
    } else {
      this.currentFrame = 0; // Standing frame
    }
  }

  display() {
    let frameX = this.currentFrame * frameWidth;
    let frameY = 0; // Assuming walking frames are in the top row

    push();
    translate(this.x, this.y);

    if (this.direction === -1) {
      scale(-1, 1);
      image(this.spriteSheet, -frameWidth, 0, frameWidth, frameHeight, frameX, frameY, frameWidth, frameHeight);
    } else {
      image(this.spriteSheet, 0, 0, frameWidth, frameHeight, frameX, frameY, frameWidth, frameHeight);
    }

    pop();
  }

  move(dx) {
    this.x += dx;
    this.direction = dx > 0 ? 1 : -1;
    this.walking = true;
  }
}
