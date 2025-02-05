let spriteSheet;
let characters = [];
let frameWidth = 80;  // Each frame's width in the sprite sheet
let frameHeight = 80; // Each frame's height in the sprite sheet
let totalFrames = 4;  // Assuming 4 frames in the walking animation

function preload() {
  // Load the sprite sheet from the assets folder
  spriteSheet = loadImage('assets/character.png');
}

function setup() {
  createCanvas(800, 600);

  // Instantiate characters at random positions
  for (let i = 0; i < 5; i++) {
    characters.push(new WalkingCharacter(random(width), random(height)));
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
  // Handle left and right arrow key movements
  if (keyCode === LEFT_ARROW) {
    for (let character of characters) {
      character.move(-5); // Move characters left
    }
  } else if (keyCode === RIGHT_ARROW) {
    for (let character of characters) {
      character.move(5); // Move characters right
    }
  }
}

class WalkingCharacter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    this.walking = false;
    this.direction = 1; // 1 for right, -1 for left
    this.speed = 2;
  }

  update() {
    // Update the walking animation frame
    this.currentFrame = (this.currentFrame + 1) % totalFrames; // Loop through frames
  }

  display() {
    let frameX = this.currentFrame * frameWidth; // Get the x position of the frame in the sprite sheet
    let frameY = 0; // Assuming the walking frames are on the top row (y = 0)

    // Draw the character at the current position
    push();
    translate(this.x, this.y);

    // If walking left, flip the character horizontally
    if (this.direction === -1) {
      scale(-1, 1); // Flip horizontally
      image(spriteSheet, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight, frameX, frameY, frameWidth, frameHeight);
    } else {
      image(spriteSheet, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight, frameX, frameY, frameWidth, frameHeight);
    }
    pop();
  }

  move(dx) {
    this.x += dx;
    this.direction = dx > 0 ? 1 : -1; // Determine direction (right = 1, left = -1)
  }
}
