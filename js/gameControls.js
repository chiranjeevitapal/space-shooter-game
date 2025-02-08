export function autoMoveRocket(rocket, rocks, bullets, canvas, gameSettings, isGameOver) {
    if (rocks.length === 0 || isGameOver) return;

    // Calculate threat score for each rock
    const threats = rocks.map(rock => {
        const horizontalDistance = Math.abs((rock.x + rock.width / 2) - (rocket.x + rocket.width / 2));
        const verticalDistance = rock.y;
        const threatScore = (horizontalDistance * 0.5) + (verticalDistance * 1.5); // Weighted scoring

        return { rock, threatScore };
    });

    // Find the most threatening rock
    const mostThreateningRock = threats.sort((a, b) => a.threatScore - b.threatScore)[0].rock;

    // Move towards or fire at the most threatening rock
    if (mostThreateningRock.x + mostThreateningRock.width / 2 < rocket.x + rocket.width / 2 - 10) {
        rocket.x -= gameSettings.rocketSpeed;
    } else if (mostThreateningRock.x + mostThreateningRock.width / 2 > rocket.x + rocket.width / 2 + 10) {
        rocket.x += gameSettings.rocketSpeed;
    } else {
        fireBullet(rocket, bullets, gameSettings);  // Fire when aligned
    }

    // Ensure rocket stays within bounds
    rocket.x = Math.max(0, Math.min(canvas.width - rocket.width, rocket.x));
}

// Helper function to fire bullets
function fireBullet(rocket, bullets, gameSettings) {
    if (!rocket.lastFired || performance.now() - rocket.lastFired > 300) {
        bullets.push({
            x: rocket.x + rocket.width / 2 - gameSettings.bulletWidth / 2,
            y: rocket.y,
            width: gameSettings.bulletWidth,
            height: gameSettings.bulletHeight,
            speed: gameSettings.bulletSpeed,
            color: Math.random() > 0.5 ? 'red' : 'orange'
        });
        rocket.lastFired = performance.now();
        console.log('Bullet fired!');
    }
}
