const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");

const animations = {
    normal: { frames: [], totalFrames: 3 }, // Normal animation with 3 frames
    damage: { frames: [], totalFrames: 5 }, // Damage animation with 4 frames
    won: { frames: [], totalFrames: 4 },     // Won animation with 2 frames
    over: { frames: [], totalFrames: 3 },      // Game over animation with 3 frames
};

let currentAnimation = "normal"; // Track which animation to use
let currentFrame = 0; // Track the current frame index
let loadedFrames = 0; // Counter for loaded frames
let frameRate = 25; // Number of frames to skip (lower means slower animation)
let frameCount = 0; // Counter to track frames

// Load frames for each animation
for (const animation in animations) {
    for (let i = 0; i < animations[animation].totalFrames; i++) {
        const levinAnimation = {
            img: new Image(),
            x: canvas.width / 10 - 20, // Adjust x position
            y: canvas.height - 100, // Adjust y position
            width: 90, // Adjust width to scale down the image
            height: 100 // Adjust height to scale down the image
        };

        levinAnimation.img.src = `images/${animation}${i}.png`; // Load animation frames
        animations[animation].frames.push(levinAnimation); // Store frames for the current animation

        // Check if the image loads successfully
        levinAnimation.img.onload = function () {
            loadedFrames++;
            if (loadedFrames === Object.values(animations).reduce((sum, anim) => sum + anim.totalFrames, 0)) {
                console.log("All images loaded, starting animation.");
                animate(); // Start animation when all frames are loaded
            }
        };

        // Check if the image fails to load
        levinAnimation.img.onerror = function () {
            console.error(`Failed to load image: images/${animation}${i}.png`);
        };
    }
}

// Function to draw the current frame
function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for the next frame

    // Draw the current frame image based on the current animation
    ctx.drawImage(
        animations[currentAnimation].frames[currentFrame].img,
        animations[currentAnimation].frames[currentFrame].x,
        animations[currentAnimation].frames[currentFrame].y,
        animations[currentAnimation].frames[currentFrame].width,
        animations[currentAnimation].frames[currentFrame].height
    );

    // Update frame index based on frameRate
    frameCount++;
    if (frameCount >= frameRate) {
        currentFrame = (currentFrame + 1) % animations[currentAnimation].totalFrames; // Update frame index
        frameCount = 0; // Reset frame count
    }
}

// Animation loop using requestAnimationFrame
function animate() {
    drawFrame();
    requestAnimationFrame(animate); // Continue animation loop
}

// Function to switch animations based on a specific occurrence
function switchAnimation() {
    if (currentAnimation === "normal") {
        currentAnimation = "damage";
    } else if (currentAnimation === "damage") {
        currentAnimation = "won";
    } else if (currentAnimation === "won") {
        currentAnimation = "over";
    } else {
        currentAnimation = "normal"; // Loop back to normal
    }
    currentFrame = 0; // Reset frame index for the new animation
}

// Example of using the switchAnimation function
document.addEventListener("keydown", (event) => {
    if (event.key === "a") { // Press 'a' to switch animations
        switchAnimation();
    }
});
