import { gameSettings } from './gameSettings.js';
import { assets } from './assetsLoader.js';
import { createRocket, createRock } from './gameObjects.js';
import { autoMoveRocket } from './gameControls.js';  // Only import autoMoveRocket
import { gameLoop, drawGameOver } from './gameEngine.js';
import { setGameOver } from './gameState.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const highScoreElement = document.getElementById('highScore');
const currentScoreElement = document.getElementById('currentScore');

let rocket, bullets = [], rocks = [], explosions = [], isGameOver = false, currentScore = 0, highScore = localStorage.getItem('highScore') || 0;

function initializeGame() {
    rocket = createRocket(canvas, gameSettings);  // Rocket is controlled automatically
    bullets = [];
    rocks = [];
    explosions = [];
    isGameOver = false;
    currentScore = 0;
    restartButton.style.display = 'none';
    updateScoreBoard();
}

function updateScoreBoard() {
    currentScoreElement.textContent = currentScore;
    highScoreElement.textContent = highScore;
}

window.addEventListener('resize', () => resizeCanvas(canvas));
resizeCanvas(canvas);

initializeGame();  // Initialize game without player controls

restartButton.addEventListener('click', () => {
    initializeGame();
    setGameOver(false);  // Reset the global game state
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
            explosions.push({ x: rocket.x, y: rocket.y, size: 150, lifetime: 30, soundPlayed: false});
            setGameOver(true);  // Use global game state
            console.log('Rocket collided with a rock! Game Over triggered.');
        }
    });
}


function spawnRock(rocks, canvas, gameSettings) {
    if (Math.random() < gameSettings.spawnRate) {
        rocks.push({
            x: Math.random() * (canvas.width - gameSettings.rockWidth),
            y: 0,
            width: gameSettings.rockWidth,
            height: gameSettings.rockHeight,
            speed: gameSettings.rockSpeed  // Correctly using gameSettings
        });
    }
}

