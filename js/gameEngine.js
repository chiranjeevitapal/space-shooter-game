import { assets } from './assetsLoader.js';
import { gameSettings } from './gameSettings.js';
import { isGameOver } from './gameState.js';

let lastFrameTime = 0;

export function gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver) {
    const currentTime = performance.now();
    
    if (currentTime - lastFrameTime < gameSettings.gameLoopDelay) {
        requestAnimationFrame(() => gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver));
        return;
    }
    
    lastFrameTime = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(ctx, canvas);
    drawRocks(ctx, rocks);

    if (!isGameOver) {
        drawRocket(ctx, rocket);
        drawBullets(ctx, bullets);
        detectCollisions(bullets, rocks, explosions, updateScoreBoard);
        spawnRock(rocks, canvas, gameSettings);
    } else {
        drawGameOver(ctx, canvas);
        return;
    }

    drawExplosions(ctx, explosions);

    requestAnimationFrame(() => gameLoop(ctx, canvas, rocket, bullets, rocks, explosions, updateScoreBoard, detectCollisions, spawnRock, drawGameOver));
}


function drawBackground(ctx, canvas) {
    ctx.drawImage(assets.backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawRocket(ctx, rocket) {
    ctx.drawImage(assets.rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
}

function drawBullets(ctx, bullets) {
    bullets.forEach(bullet => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bullet.speed;
    });
}

function drawRocks(ctx, rocks) {
    rocks.forEach(rock => {
        //console.log(`Rock position - X: ${rock.x}, Y: ${rock.y}`);
        ctx.drawImage(assets.rockImg, rock.x, rock.y, rock.width, rock.height);
        rock.y += rock.speed;
    });
}

function drawExplosions(ctx, explosions) {
    explosions.forEach((explosion, index) => {
        ctx.drawImage(assets.explosionImg, explosion.x, explosion.y, explosion.size, explosion.size);
        explosion.lifetime--;

        // Play blast sound at the start of the explosion
        if (explosion.lifetime === 19) {
            const blastSound = document.getElementById('blastSound');
            blastSound.currentTime = 0;  // Reset sound to start
            blastSound.play();
            console.log('Blast sound played!');
        }

        if (explosion.lifetime <= 0) {
            explosions.splice(index, 1);
        }
    });
}


export function drawGameOver(ctx, canvas) {
    ctx.drawImage(assets.gameOverImg, canvas.width / 2 - 300, canvas.height / 2 - 150, 600, 300);
    
    // Show restart button when game is over
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
}
