# 🚀 Space Shooter Game 🚀

A fun, interactive space shooter game built using HTML5 Canvas and JavaScript. Control your rocket, blast those asteroids 💥, and aim for the highest score! 🎯

## ✨ Features

- **🎨 Pixel Art Graphics:** Retro-style visuals with pixelated spaceship, asteroids, and explosions.
- **⚡ Smooth Animations:** Fast and responsive gameplay using the HTML5 Canvas API.
- **🔊 Sound Effects:** Background music and blast sounds for an immersive experience.
- **🏆 Score Tracking:** Displays current and high scores, saved in local storage.
- **📱 Responsive Design:** Adjusts to fit any screen size.

## 🎮 How to Play

1. **🚀 Control the Rocket:**

   - Move your mouse to control the rocket horizontally.
   - Click and hold to fire bullets at incoming asteroids. 🔫

2. **🎯 Game Objective:**

   - Destroy as many asteroids as possible to increase your score. 🌌
   - Avoid collisions with asteroids; a collision will end the game. 💀

3. **🔄 Restart the Game:**

   - After a collision, click the "Restart Game" button to play again. 🔁

## 🛠️ Installation & Running the Game

### Option 1: Run with a Server 🚀

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/space-shooter-game.git
   cd space-shooter-game
   ```

2. **Start a Local Server:**

   - Using Python:
     ```bash
     python -m http.server
     ```
   - Using Node.js:
     ```bash
     npx http-server
     ```

3. **Open the Game:**

   - Navigate to `http://localhost:8080/index.html` in your preferred web browser. 🌍

### Option 2: Run the Monolithic Version Directly 🚀

1. **Open `monolith-working-game.html`:**

   - This file contains everything bundled together and can be opened directly in your browser without needing a server.

2. **Play and Enjoy! 🎉

## 📁 Folder Structure

```
/SPACE_SHOOTER_GAME
├── assets
│   ├── audio 🎵
│   │   ├── background.mp3
│   │   └── blast.mp3
│   ├── images 🖼️
│   │   ├── background.jpg
│   │   ├── blast.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── game-over.png
│   │   ├── rock.png
│   │   └── rocket.png
├── css 🎨
│   └── main.css
├── js 💻
│   ├── assetsLoader.js
│   ├── gameControls.js
│   ├── gameEngine.js
│   ├── gameObjects.js
│   ├── gameSettings.js
│   ├── gameState.js
│   └── main.js
├── favicon.ico ⭐
├── index.html
└── monolith-working-game.html
```

## 🎨 Customization

- **🎵 Change Background Music:** Replace `assets/audio/background.mp3` with your preferred track.

- **🚀 Modify Rocket and Asteroid Designs:** Replace images in the `assets/images/` folder with your own artwork.

- **⚙️ Adjust Game Difficulty:** Edit `js/gameSettings.js` to tweak settings like bullet speed, asteroid spawn rate, and more.

## 🐞 Known Issues

- **🔇 Autoplay Restrictions:** Some browsers may block background audio until user interaction.
  - **Fix:** Click anywhere on the game screen to start audio. 🖱️

## 🙌 Credits

- **👨‍💻 Developed by:** Chiranjeevi Tapal
- **🔊 Sound Effects:** [Freesound.org](https://freesound.org/)
- **🎨 Graphics:** Custom pixel art & royalty-free assets

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy the game and feel free to contribute or customize it to your liking! 🚀👾🎮

