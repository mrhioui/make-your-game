export { controlsSetup, restart }
import { menu, frame, createlives } from "./frame.js"
import { createInvaders, invadersShoot, invaders_bullets, invaders } from "./invaders.js"
import { warShip, warshipShoot, warshipBullets } from "./warshap.js"
import { gameLoop, keys, setScore, animationId } from "./main.js"

let timePast = 0


function controlsSetup(keys) {
    document.addEventListener('keydown', ({ code }) => {
        switch (code) {
            case 'KeyP':
                pause()
                keys.pause = true
                break

            case 'KeyR':
                restart()
                break

            case 'Escape':
                resume()
                keys.pause = false
                break

            case 'KeyA':
            case 'ArrowLeft':
                keys.left = true
                break

            case 'KeyS':
            case 'ArrowRight':
                keys.right = true
                break

            default:
                break

        }
    })
    document.addEventListener('keyup', ({ code }) => {
        switch (code) {
            case 'KeyA':
            case 'ArrowLeft':
                keys.left = false
                break

            case 'KeyS':
            case 'ArrowRight':
                keys.right = false
                break

            case 'Space':
                if (!keys.start) {
                    start()
                    keys.start = true
                } else if (!keys.pause) {
                    warshipShoot()
                }
                break

            default:
                break
        }
    })
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            pause()
            keys.pause = true
        }
    });

}



const start = () => {
    const message = document.getElementById('end-message')
    if (message != null) frame.htmlElem.removeChild(message)

    createlives()
    menu.htmlElem.style.display = "none"
    createInvaders()
    invadersShoot()
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`
    frame.htmlElem.appendChild(warShip.htmlElem);
    timer()
    const livesContainer = document.getElementById('game-lives');
    livesContainer.innerHTML = '';

    for (let live = 0; live < 3; live++) {
        let htmlLive = document.createElement('img');
        htmlLive.src = '/imgs/heart.png';
        livesContainer.appendChild(htmlLive);
    }
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    gameLoop()
}

const pause = () => {
    let message = document.getElementById('start-message')
    message.style.display = 'none'
    menu.htmlElem.style.display = "block"

    invaders.forEach((invader) => {
        invader.htmlElem.style.display = 'none'
    })
    invaders_bullets.forEach((bullet) => {
        bullet.htmlElem.style.display = 'none'
        frame.htmlElem.removeChild(bullet.htmlElem)
    })
    warshipBullets.forEach((bullet) => {
        bullet.htmlElem.style.display = 'none'
        frame.htmlElem.removeChild(bullet.htmlElem)
    })
    warShip.htmlElem.style.display = 'none'
}

const resume = () => {
    menu.htmlElem.style.display = "none"
    invaders.forEach((invader) => {
        invader.htmlElem.style.display = 'block'
    })
    warShip.htmlElem.style.display = 'block'
}

const restart = () => {
    const message = document.getElementById('end-message')
    if (message != null) frame.htmlElem.removeChild(message)

    createlives()

    setScore(0)
    timePast = 0


    invaders.forEach(inv => inv.htmlElem.remove());
    invaders.length = 0;

    warshipBullets.forEach(b => b.htmlElem.remove());
    warshipBullets.length = 0;
    invaders_bullets.forEach(b => b.htmlElem.remove());
    invaders_bullets.length = 0;

    warShip.position.x = (frame.width - warShip.width) / 2;
    warShip.position.y = frame.height - ((48 * 4) - 25);
    warShip.speedX = 0;
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`;

    keys.pause = false;

    createInvaders();

    warShip.htmlElem.style.display = 'block';

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    gameLoop()
    menu.htmlElem.style.display = "none";
}

// timer
const timer = () => {
    const timerDisplay = document.getElementById('timer');
    timePast = 0

    const updateTimer = () => {
        const minutes = String(Math.floor(timePast / 60)).padStart(2, '0');
        const seconds = String(timePast % 60).padStart(2, '0');
        timerDisplay.innerHTML = `${minutes}:${seconds} <img src="/imgs/clock.png" alt="time-icon">`;

        if (keys.pause == false && keys.start == true) {
            timePast++;
        }
    };
    setInterval(updateTimer, 1000);
};