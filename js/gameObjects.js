export function createRocket(canvas, gameSettings) {
    return {
        width: gameSettings.rocketWidth,
        height: gameSettings.rocketHeight,
        x: canvas.width / 2 - gameSettings.rocketWidth / 2,
        y: canvas.height - gameSettings.rocketHeight - gameSettings.rocketMarginBottom // Ensures it's at the bottom
    };
}

export function createRock(canvas, gameSettings) {
    return {
        x: Math.random() * (canvas.width - gameSettings.rockWidth),
        y: 0,
        width: gameSettings.rockWidth,
        height: gameSettings.rockHeight,
        speed: gameSettings.rockSpeed
    };
}
