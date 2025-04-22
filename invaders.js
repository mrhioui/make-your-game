export { createInvaders, invadersShoot, moveInvaders, invaders, invaders_bullets }
import { frame } from "./frame.js"
import { keys, vmin } from "./main.js"

// create invaders 
const invaders = []
const invaders_bullets = []
const invadersProprietys = {
    Rows: 3,
    Cols: 8,
    SpeedX: 0.7,
    SpeedY: 4,
    Direction: 1,
    score: 30
}

function createInvaders() {
    const grid = document.createElement('div')
    grid.id = 'invaders-grid'
    grid.style.width = '100%';
    grid.style.height = 'auto';
    const gap = 1
    for (let row = 1; row <= invadersProprietys.Rows; row++) {
        for (let col = 0; col < invadersProprietys.Cols; col++) {
            const invader = {
                htmlElem: document.createElement('img'),
                width: 6,
                height: 6,
                score: invadersProprietys.score / row,
                position: {
                    x: col * (6 + gap),
                    y: (row - 1) * (6 + gap)
                }
            }
            invader.htmlElem.src = '/imgs/invader.png'
            invader.htmlElem.style.width = '6vmin'
            invader.htmlElem.style.height = '6vmin'
            invader.htmlElem.classList.add("invader")
            invader.htmlElem.style.position = 'absolute'
            invader.htmlElem.style.transform = `translate(${invader.position.x}vmin, ${invader.position.y}vmin)`
            invader.htmlElem.style.zIndex = '2';
            grid.appendChild(invader.htmlElem)
            invaders.push(invader)
        }
    }
    frame.htmlElem.appendChild(grid);
}

// movement
function moveInvaders() {
    let edgeReached = false

    invaders.forEach(invader => {
        const nextX = invader.position.x + invadersProprietys.SpeedX * invadersProprietys.Direction
        const invaderWidth = invader.htmlElem.getBoundingClientRect().width / vmin
        const frameWidth = frame.htmlElem.getBoundingClientRect().width / vmin
        if (nextX < 0 || nextX + invaderWidth > frameWidth) {
            edgeReached = true
        }
    })

    if (edgeReached) {
        invadersProprietys.Direction *= -1
        invaders.forEach(invader => {
            invader.position.y += invadersProprietys.SpeedY
        })
    } else {
        invaders.forEach(invader => {
            invader.position.x += invadersProprietys.SpeedX * invadersProprietys.Direction
        })
    }

    invaders.forEach(invader => {
        invader.htmlElem.style.transform = `translate(${invader.position.x}vmin, ${invader.position.y}vmin)`
    })
}

// shoot
let shootInterval = null;

const invadersShoot = () => {
    if (shootInterval) clearInterval(shootInterval);

    shootInterval = setInterval(() => {
        if (keys.start && !keys.pause) {
            if (invaders.length === 0) return;
            let nbr = Math.floor(Math.random() * invaders.length)

            const invader_bullet = {
                htmlElem: document.createElement('img'),
                width: 2,
                height: 2,
                position: {
                    x: invaders[nbr].position.x + 1,
                    y: invaders[nbr].position.y
                },
                speedY: 1
            }

            invader_bullet.htmlElem.src = 'imgs/invader-bullet.png'
            invader_bullet.htmlElem.classList.add("bullet")
            frame.htmlElem.appendChild(invader_bullet.htmlElem)
            invader_bullet.htmlElem.style.transform = `translate(${invader_bullet.position.x}vmin, ${invader_bullet.position.y}vmin)`
            invaders_bullets.push(invader_bullet)
        }
    }, invaders.length * 100)
}