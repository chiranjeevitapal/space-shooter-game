import { gameSettings } from './gameSettings.js';
import { assets } from './assetsLoader.js';
import { createRocket, createRock } from './gameObjects.js';
import { setupControls } from './gameControls.js';
import { gameLoop, drawGameOver } from './gameEngine.js';
import { setGameOver } from './gameState.js';


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const highScoreElement = document.getElementById('highScore');
const currentScoreElement = document.getElementById('currentScore');
const backgroundAudio = document.getElementById('backgroundAudio');

let rocket, bullets = [], rocks = [], explosions = [], isGameOver = false, currentScore = 0, highScore = localStorage.getItem('highScore') || 0;

function initializeGame() {
    rocket = createRocket(canvas, gameSettings);  // Reset rocket position
    bullets = [];  // Clear bullets
    rocks = [];  // Clear rocks
    explosions = [];  // Clear explosions
    currentScore = 0;  // Reset score
    updateScoreBoard();  // Update scoreboard
    
    // Hide the restart button on new game start
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'none';

    // Reattach controls after restarting
    setupControls(canvas, rocket, bullets);
}



function updateScoreBoard() {
    currentScoreElement.textContent = currentScore;
    highScoreElement.textContent = highScore;
}

window.addEventListener('resize', () => resizeCanvas(canvas));
resizeCanvas(canvas);

initializeGame();  // Ensure rocket is initialized
setupControls(canvas, rocket, bullets);  // Now setup controls

restartButton.addEventListener('click', () => {
    console.log('Restart button clicked!');
    initializeGame();
    setGameOver(false);  // Reset the game over state
    gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver);
});



assets.backgroundImg.onload = () => {
    gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver);
};


function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function detectCollisions(bullets, rocks, explosions, updateScoreBoard) {
    // Bullet-rock collisions
    bullets.forEach((bullet, bIndex) => {
        rocks.forEach((rock, rIndex) => {
            if (
                bullet.x < rock.x + rock.width &&
                bullet.x + bullet.width > rock.x &&
                bullet.y < rock.y + rock.height &&
                bullet.y + bullet.height > rock.y
            ) {
                console.log('Bullet hit a rock!');
                explosions.push({ x: rock.x, y: rock.y, size: 100, lifetime: 20 });
                bullets.splice(bIndex, 1);
                rocks.splice(rIndex, 1);
                currentScore += 10;
                updateScoreBoard();
            }
        });
    });

    // Rocket-rock collisions
    rocks.forEach((rock) => {
        if (
            rocket.x < rock.x + rock.width &&
            rocket.x + rocket.width > rock.x &&
            rocket.y < rock.y + rock.height &&
            rocket.y + rocket.height > rock.y
        ) {
            console.log('Rocket collided with a rock!');
            explosions.push({ x: rocket.x, y: rocket.y, size: 150, lifetime: 30 });
            setGameOver(true);  // Update game state
        }
    });
}

function spawnRock(rocks, canvas, gameSettings) {
    if (Math.random() < gameSettings.spawnRate) {
        rocks.push(createRock(canvas, gameSettings));
    }
}

// Play audio after the first user interaction
window.addEventListener('click', () => {
    if (backgroundAudio.paused) {
        backgroundAudio.play();
        console.log('Background audio started!');
    }
});