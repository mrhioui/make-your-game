// here will the game logic and collision algo

import { moveWarShip, shoot, startGame, pauseGame, restartGame } from "./move.js";

// console.log("Document width (viewport):", document.documentElement.clientWidth);
// console.log("Document height (viewport):", document.documentElement.clientHeight);

let started = false;
let paused = false;

document.addEventListener("keydown", (event) => {
    if (!started) {
        startGame();
        started = true;
        return;
    }

    if (paused && event.key === "Enter") {
        pauseGame(false);
        paused = false;
        return;
    }

    switch (event.key) {
        case 'ArrowRight':
            if (!paused) moveWarShip('right');
            break;
        case 'ArrowLeft':
            if (!paused) moveWarShip('left');
            break;
        case 'p':
            pauseGame(true);
            paused = true;
            break;
        case 'r':
            restartGame();
            started = true;
            paused = false;
            break;
        case ' ':
            if (!paused) shoot();
            break;
        default:
            break;
    }
});
