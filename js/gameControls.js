import { gameSettings } from './gameSettings.js';

export function setupControls(canvas, rocket, bullets) {
    let isFiring = false;
    let fireInterval;

    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        rocket.x = Math.max(0, Math.min(canvas.width - rocket.width, mouseX - rocket.width / 2));
    });

    canvas.addEventListener('mousedown', () => {
        isFiring = true;
        fireInterval = setInterval(() => {
            if (isFiring) {
                bullets.push({
                    x: rocket.x + rocket.width / 2 - gameSettings.bulletWidth / 2,
                    y: rocket.y,
                    width: gameSettings.bulletWidth,
                    height: gameSettings.bulletHeight,
                    speed: gameSettings.bulletSpeed,
                    color: Math.random() > 0.5 ? 'red' : 'orange'
                });
            }
        }, 200);
    });

    canvas.addEventListener('mouseup', () => {
        isFiring = false;
        clearInterval(fireInterval);
    });
}
