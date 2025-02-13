const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const spriteSheet = new Image();
spriteSheet.src = "Sprite_2.png"; // Load your sprite sheet

// Sprite details
const spriteWidth = 64;  // Width of each frame
const spriteHeight = 64; // Height of each frame
const totalFrames = 4;   // Total number of frames in the sprite sheet
let currentFrame = 0;    // Track the current frame
let frameX = 0;          // X position of the frame in the sprite sheet

const frameRate = 10;    // Adjusts animation speed
let frameCount = 0;

// Draw function
function animateSprite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw the current frame
    ctx.drawImage(spriteSheet, frameX, 0, spriteWidth, spriteHeight, 200, 200, spriteWidth, spriteHeight);

    // Update frame every few cycles
    frameCount++;
    if (frameCount >= frameRate) {
        currentFrame = (currentFrame + 1) % totalFrames; // Loop frames
        frameX = currentFrame * spriteWidth; // Move to the next frame
        frameCount = 0;
    }

    requestAnimationFrame(animateSprite); // Loop animation
}

// Start animation after image loads
spriteSheet.onload = () => {
    animateSprite();
};