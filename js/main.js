import { gameSettings } from './gameSettings.js';
import { assets } from './assetsLoader.js';
import { createRocket, createRock } from './gameObjects.js';
import { applyLLMInstructions } from './gameControls.js';
import { gameLoop, drawGameOver } from './gameEngine.js';
import { setGameOver, performanceData} from './gameState.js';


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const highScoreElement = document.getElementById('highScore');
const currentScoreElement = document.getElementById('currentScore');

let rocket, bullets = [], rocks = [], explosions = [], currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;

function initializeGame() {
    rocket = createRocket(canvas, gameSettings);
    bullets = [];
    rocks = [];
    explosions = [];
    setGameOver(false);
    currentScore = 0;

    performanceData.missedShots = 0;
    performanceData.successfulHits = 0;
    performanceData.collisions = 0;
    performanceData.totalThreatScore = 0;
    performanceData.threatsAnalyzed = 0;

    restartButton.style.display = 'none';
    updateScoreBoard();

    const savedInstructions = sessionStorage.getItem('llmInstructions');
    if (savedInstructions) {
        applyLLMInstructions(savedInstructions);
    }
}

function updateScoreBoard() {
    currentScoreElement.textContent = currentScore;
    highScoreElement.textContent = highScore;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (rocket) {
        rocket.x = canvas.width / 2 - rocket.width / 2;
        rocket.y = canvas.height - rocket.height - gameSettings.rocketMarginBottom;
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

restartButton.addEventListener('click', () => {
    initializeGame();
    gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver);
});

assets.backgroundImg.onload = () => {
    initializeGame();
    gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver);
};

function detectCollisions(bullets, rocks, explosions, updateScoreBoard) {
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
                performanceData.successfulHits += 1;
                updateScoreBoard();
            }
        });
    });

    rocks.forEach((rock) => {
        if (
            rocket.x < rock.x + rock.width &&
            rocket.x + rocket.width > rock.x &&
            rocket.y < rock.y + rock.height &&
            rocket.y + rocket.height > rock.y
        ) {
            explosions.push({ x: rocket.x, y: rocket.y, size: 150, lifetime: 30 });
            performanceData.collisions += 1;
            setGameOver(true);
            console.log('Rocket collided with a rock! Game Over triggered.');
        }
    });
}

function spawnRock(rocks, canvas, gameSettings) {
    if (Math.random() < gameSettings.spawnRate) {
        rocks.push(createRock(canvas, gameSettings));
    }
}
