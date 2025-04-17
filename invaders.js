export {createInvaders,invadersShoot,moveInvaders,invaders,invaders_bullets}
import { frame } from "./frame.js"
import { keys } from "./main.js"

// create invaders 
const invaders = []
const invaders_bullets = []
const invadersProprietys = {
    Rows: 3,
    Cols: 8,
    SpeedX: 3,
    SpeedY: 2,
    Direction: 1
}

function createInvaders() {
    const grid = document.createElement('div')
    grid.id = 'invaders-grid'
    grid.style.width = '100%';
    grid.style.height = 'auto';
    const gap = 15
    for (let row = 0; row < invadersProprietys.Rows; row++) {
        for (let col = 0; col < invadersProprietys.Cols; col++) {
            const invader = {
                htmlElem: document.createElement('img'),
                width: 48,
                height: 48,
                position: {
                    x: col * (48 + gap),
                    y: row * (48 + gap)
                }
            }
            invader.htmlElem.src = '/imgs/invader.png'
            invader.htmlElem.style.width = '48px'
            invader.htmlElem.style.height = '48px'
            invader.htmlElem.classList.add("invader")
            invader.htmlElem.style.position = 'absolute'
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
        if (nextX < 0 || nextX + invader.htmlElem.getBoundingClientRect().width > frame.htmlElem.getBoundingClientRect().width) {
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
        invader.htmlElem.style.transform = `translate(${invader.position.x}px, ${invader.position.y}px)`
    })
}

// shoot
const invadersShoot = () => {
    setInterval(() => {
        if (!keys.pause) {

            let nbr = Math.floor(Math.random() * invaders.length)

            const invader_bullet = {
                htmlElem: document.createElement('img'),
                width: 22,
                height: 22,
                position: {
                    x: invaders[nbr].position.x + 10,
                    y: invaders[nbr].position.y + 40
                },
                speedY: 5
            }

            invader_bullet.htmlElem.src = 'imgs/invader-bullet.png'
            invader_bullet.htmlElem.classList.add("bullet")
            frame.htmlElem.appendChild(invader_bullet.htmlElem)
            invader_bullet.htmlElem.style.transform = `translate(${invader_bullet.position.x}px, ${invader_bullet.position.y}px)`
            invaders_bullets.push(invader_bullet)
        }
    }, invaders.length * 100)
}