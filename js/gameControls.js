import { strategy } from './gameState.js';


export function applyLLMInstructions(instructions) {
    strategy.dodgeAggressively = false;
    strategy.focusOnShooting = false;
    strategy.balance = false;

    if (instructions.includes('Dodge more aggressively')) {
        strategy.dodgeAggressively = true;
    } else if (instructions.includes('Focus on shooting')) {
        strategy.focusOnShooting = true;
    } else if (instructions.includes('Balance shooting and dodging')) {
        strategy.balance = true;
    }

    console.log('Updated Strategy from LLM:', strategy);
}

export function autoMoveRocket(rocket, rocks, bullets, canvas, gameSettings, isGameOver, strategy) {
    if (rocks.length === 0 || isGameOver) return;

    const threats = rocks.map(rock => {
        const horizontalDistance = Math.abs((rock.x + rock.width / 2) - (rocket.x + rocket.width / 2));
        const verticalDistance = rock.y;
        const threatScore = (horizontalDistance * 0.5) + (verticalDistance * 1.5);
        return { rock, threatScore };
    });

    const mostThreateningRock = threats.sort((a, b) => a.threatScore - b.threatScore)[0].rock;
    const targetX = mostThreateningRock.x + mostThreateningRock.width / 2;
    const distanceX = targetX - (rocket.x + rocket.width / 2);

    const dynamicSpeed = distanceX * (0.15 * strategy.riskFactor) + strategy.movementSpeedAdjustment;
    rocket.x += Math.max(-10, Math.min(10, dynamicSpeed));
    rocket.x = Math.max(0, Math.min(canvas.width - rocket.width, rocket.x));

    if (Math.abs(distanceX) < 15) {
        rocket.alignmentCounter = (rocket.alignmentCounter || 0) + 1;
    } else {
        rocket.alignmentCounter = 0;
    }

    if (rocket.alignmentCounter >= 2 && (strategy.focusOnShooting || strategy.balance)) {
        fireBullet(rocket, bullets, gameSettings, strategy.firingRateAdjustment);
    }
}

function fireBullet(rocket, bullets, gameSettings, firingRateAdjustment) {
    const cooldown = 300 - (firingRateAdjustment * 50);
    if (!rocket.lastFired || performance.now() - rocket.lastFired > cooldown) {
        bullets.push({
            x: rocket.x + rocket.width / 2 - gameSettings.bulletWidth / 2,
            y: rocket.y,
            width: gameSettings.bulletWidth,
            height: gameSettings.bulletHeight,
            speed: gameSettings.bulletSpeed,
            color: Math.random() > 0.5 ? 'red' : 'orange'
        });
        rocket.lastFired = performance.now();
        console.log('Bullet fired with cooldown:', cooldown);
    }
}
