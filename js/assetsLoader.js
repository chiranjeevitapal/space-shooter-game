export const assets = {
    backgroundImg: new Image(),
    rocketImg: new Image(),
    rockImg: new Image(),
    explosionImg: new Image(),
    gameOverImg: new Image(),
};

assets.backgroundImg.src = 'assets/images/background.jpg';
assets.rocketImg.src = 'assets/images/rocket.png';
assets.rockImg.src = 'assets/images/rock.png';
assets.explosionImg.src = 'assets/images/blast.png';
assets.gameOverImg.src = 'assets/images/game-over.png';

assets.gameOverImg.onload = () => {
    console.log('Game Over image loaded successfully!');
};

