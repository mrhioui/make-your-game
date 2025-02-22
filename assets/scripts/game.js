// here will the game logic and collision algo

import { moveWarShip, shoot } from "./move.js"

const enemies = document.getElementById('game-enemies');
const frame = document.getElementById('main-frame');

let enemiesStepX = 10;
let enemiesStepY = 10;

setInterval(() => {
    let currentX = parseInt(enemies.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    let currentY = parseInt(enemies.style.transform.replace('translateY(', '').replace('px)', '')) || 0;

    if (currentX > frame.offsetWidth - enemies.offsetWidth - 40 || currentX < 0) {
        enemiesStepX *= -1;
    }

    if (currentX === 0) {
        enemiesStepY += 10;
    }

    enemies.style.transform = `translateX(${currentX + enemiesStepX}px) translateY(${currentY + enemiesStepY}px)`;
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