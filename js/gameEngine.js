import { assets } from './assetsLoader.js';
import { gameSettings } from './gameSettings.js';
import { autoMoveRocket } from './gameControls.js';
import { getLLMFeedback } from './llmApi.js';
import { isGameOver, performanceData, strategy } from './gameState.js';

let frameCount = 0;

export function gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(ctx, canvas);
    drawRocks(ctx, rocks);

    if (!isGameOver) {
        if (frameCount % 5 === 0) {
            autoMoveRocket(rocket, rocks, bullets, canvas, gameSettings, isGameOver, strategy);
        }
        drawRocket(ctx, rocket);
        drawBullets(ctx, bullets);
        detectCollisions(bullets, rocks, explosions, updateScoreBoard);
        spawnRock(rocks, canvas, gameSettings);
    } else {
        drawGameOver(ctx, canvas);
        handleGameOver();
        return;
    }

    drawExplosions(ctx, explosions);
    frameCount++;
    requestAnimationFrame(() => gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver));
}

function handleGameOver() {
    getLLMFeedback(performanceData).then(feedback => {
        console.log('LLM Feedback:', feedback);
        sessionStorage.setItem('llmInstructions', feedback);
    }).catch(err => {
        console.error('Failed to get LLM feedback:', err);
    });
}

function drawBackground(ctx, canvas) {
    ctx.drawImage(assets.backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawRocket(ctx, rocket) {
    ctx.drawImage(assets.rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
}

function drawBullets(ctx, bullets) {
    bullets.forEach((bullet, index) => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bullet.speed;

        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

function drawRocks(ctx, rocks) {
    rocks.forEach(rock => {
        ctx.drawImage(assets.rockImg, rock.x, rock.y, rock.width, rock.height);
        rock.y += rock.speed;
    });
}

function drawExplosions(ctx, explosions) {
    explosions.forEach((explosion, index) => {
        ctx.drawImage(assets.explosionImg, explosion.x, explosion.y, explosion.size, explosion.size);
        explosion.lifetime--;

        if (explosion.lifetime === 19) {
            const blastSound = document.getElementById('blastSound');
            blastSound.currentTime = 0;
            blastSound.play();
        }

        if (explosion.lifetime <= 0) {
            explosions.splice(index, 1);
        }
    });
}

export function drawGameOver(ctx, canvas) {
    ctx.drawImage(assets.gameOverImg, canvas.width / 2 - 300, canvas.height / 2 - 150, 600, 300);
    document.getElementById('restartButton').style.display = 'block';
}
