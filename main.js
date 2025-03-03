export {frame, warShip, bullets}
import { controlsSetup } from './controls.js'

const frame = {
    htmlElem: document.getElementById('main-frame'),
    width: 1150,
    height: 850
}

const warShip = {
    htmlElem: document.getElementById('war-ship'),
    width: 48,
    height: 48,
    position: {
        x: (frame.width - 48) / 2,
        y: frame.height - 48 - 15
    },
    speedX: 0
}

const bullets = []


const keys = { left: false, right: false, shoot: false }

const invaders = []
const invaderRows = 3
const invaderCols = 8
const invaderSpeedX = 3
const invaderSpeedY = 2
let invaderDirection = 1




function moveInvaders() {
    let edgeReached = false
  
    invaders.forEach(invader => {
      const nextX = invader.position.x + invaderSpeedX * invaderDirection
      if (nextX < 0 || nextX + invader.htmlElem.getBoundingClientRect().width > frame.htmlElem.getBoundingClientRect().width) {
        edgeReached = true
      }
    })
  
    if (edgeReached) {
      invaderDirection *= -1
      invaders.forEach(invader => {
        invader.position.y += invaderSpeedY
      })
    } else {
      invaders.forEach(invader => {
        invader.position.x += invaderSpeedX * invaderDirection
      })
    }
  
    invaders.forEach(invader => {
      invader.htmlElem.style.transform = `translate(${invader.position.x}px, ${invader.position.y}px)`
    })
  }

const moveWarship = () => {
    warShip.position.x += warShip.speedX
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`
}

const moveBullet = (bullet) => {
    bullet.position.y += bullet.speedY
    bullet.htmlElem.style.transform = `translate(${bullet.position.x}px, ${bullet.position.y}px)`
}


function createInvaders() {
    const grid = document.getElementById('invaders-grid')
    const gap = 20
  const top = frame.htmlElem.getBoundingClientRect().height / 6
    for (let row = 0; row < invaderRows; row++) {
      for (let col = 0; col < invaderCols; col++) {
        const invader = {
          htmlElem: document.createElement('img'),
          width: 48,
          height: 48,
          position: {
            x:  col * (48 + gap),
            y:top+ row * (48 + gap)
          }
        }
        invader.htmlElem.src = '/imgs/invader.png'
        invader.htmlElem.classList.add("invader")
        invader.htmlElem.style.transform = `translate(${invader.position.x}px, ${invader.position.y}px)`
        grid.appendChild(invader.htmlElem)
        invaders.push(invader)
      }
    }
  }

const init = () => {
    frame.htmlElem.style.width = `${frame.width}px`
    frame.htmlElem.style.height = `${frame.height}px`
    createInvaders()
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`

    // Setup keyboard event listeners
    controlsSetup(keys)
    gameLoop()
}

const gameLoop = () => {
    requestAnimationFrame(gameLoop)

    moveInvaders()

    bullets.forEach((bullet, bltIndex) => {

        if (bullet.htmlElem.getBoundingClientRect().y <= frame.htmlElem.getBoundingClientRect().top) {
            // console.log(frame.height, '>>>', frame.htmlElem.getBoundingClientRect().top)
            bullet.htmlElem.remove()
            bullets.splice(bltIndex, 1)
        } else {
            moveBullet(bullet)
        }
    })
    moveWarship()

    if (keys.left && warShip.position.x >= 15) {
        warShip.speedX = -5
    } else if (keys.right && warShip.position.x + 48 <= frame.width - 15) {
        warShip.speedX = 5
    } else {
        warShip.speedX = 0
    }
}


init() // Entry point

