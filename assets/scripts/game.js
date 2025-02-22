// here will the game logic and collision algo

import { moveWarShip, shoot } from "./move.js"

const enemies = document.getElementById('game-enemies');
const frame = document.getElementById('main-frame');

let enemiesStep = 10
setInterval(() => {
    let currentLeft = parseInt(enemies.style.left.slice(0, enemies.style.left.length - 2)) || 0;
    if (currentLeft > frame.offsetWidth - enemies.offsetWidth - 40) {
        enemiesStep *= -1
    } else if (currentLeft < 0) {
        enemiesStep *= -1
    }
    enemies.style.left = `${currentLeft + enemiesStep}px`;
}, 100);

document.addEventListener(
    "keydown",
    (event) => {
        switch (event.key) {
            case 'ArrowRight':
                moveWarShip('right')
                break
            case 'ArrowLeft':
                moveWarShip('left')
                break
            case 'p':
                console.log('pause')
                break
            case 'r':
                console.log('restart')
                break
            case 'enter':
                console.log('continue')
                break
            case ' ':
                shoot();
                break
            default:
                console.log(event.key)
                break
        }
    })