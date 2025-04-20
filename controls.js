export { controlsSetup, restart }
import { menu, frame, createlives, unit } from "./frame.js"
import { createInvaders, invadersShoot, invaders_bullets, invaders } from "./invaders.js"
import { warShip, warshipShoot, warshipBullets } from "./warshap.js"
import { gameLoop, keys, setScore, animationId } from "./main.js"



function controlsSetup(keys) {
    document.addEventListener('keydown', ({ code }) => {
        switch (code) {
            case 'KeyP':
                pause()
                keys.pause = true
                break

            case 'KeyR':
                keys.start = true
                keys.pause = false
                keys.win = false
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

            case 'Enter':
                if (!keys.start) {
                    start()
                    keys.start = true
                }
                break

            case 'Space':
                if (keys.start && !keys.pause) {
                    warshipShoot()
                }
                break

            default:
                break
        }
    })
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && keys.start && !keys.pause) {
            pause()
            keys.pause = true
        }
    });

}



const start = () => {
    const message = document.getElementById('end-message')
    if (message != null) frame.htmlElem.removeChild(message)
    menu.htmlElem.style.display = "none"

    createlives()
    createInvaders()
    invadersShoot()
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`
    frame.htmlElem.appendChild(warShip.htmlElem);
    console.log(keys);

    if (!keys.win) {
        timer(0)
    }
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
        console.log(keys);

    createlives()
    setScore(0)
    timer(0)


    invaders.forEach(inv => inv.htmlElem.remove());
    invaders.length = 0;
    createInvaders();

    warshipBullets.forEach(b => b.htmlElem.remove());
    warshipBullets.length = 0;
    invaders_bullets.forEach(b => b.htmlElem.remove());
    invaders_bullets.length = 0;

    warShip.htmlElem.style.transform = `translate(${(frame.width - 4 * unit) / 2}px, ${frame.height - ((18 * unit))}px)`;
    frame.htmlElem.appendChild(warShip.htmlElem)

    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    gameLoop()
    menu.htmlElem.style.display = "none";
}

// timer
let timerInterval = null;

const timer = (timePast) => {
    const timerDisplay = document.getElementById('timer');
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const minutes = String(Math.floor(timePast / 60)).padStart(2, '0');
        const seconds = String(timePast % 60).padStart(2, '0');
        timerDisplay.innerHTML = `${minutes}:${seconds} <img src="/imgs/clock.png" alt="time-icon">`;

        if (keys.pause == false && keys.start == true) {
            timePast++;
        }
    }, 1000);
};
