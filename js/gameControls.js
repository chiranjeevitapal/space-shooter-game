// This works with dynamic speed rocket.
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

    // Calculate dynamic speed based on distance to the most threatening rock
    const targetX = mostThreateningRock.x + mostThreateningRock.width / 2;
    const rocketCenterX = rocket.x + rocket.width / 2;
    const distanceX = targetX - rocketCenterX;

    // Dynamic speed adjustment
    const speedMultiplier = 0.15;  // Adjust this for faster or slower response
    const dynamicSpeed = distanceX * speedMultiplier;

    // Optional: Cap the maximum speed to prevent the rocket from moving too fast
    const maxSpeed = 10;  // Set a maximum speed
    const finalSpeed = Math.max(-maxSpeed, Math.min(maxSpeed, dynamicSpeed));

    // Move the rocket
    rocket.x += finalSpeed;

    // Ensure the rocket stays within canvas bounds
    rocket.x = Math.max(0, Math.min(canvas.width - rocket.width, rocket.x));

    // Fire bullet when aligned with the rock
    const isAligned = Math.abs(distanceX) < 10;
    if (isAligned) {
        fireBullet(rocket, bullets, gameSettings);
    }
}

// This works with fixed speed rocket.
/* export function autoMoveRocket(rocket, rocks, bullets, canvas, gameSettings, isGameOver) {
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
} */


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
