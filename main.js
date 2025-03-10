export { frame, warShip, bullets }
import { controlsSetup } from './controls.js'

const frame = {
  htmlElem: document.getElementById('main-frame'),
  width: window.innerWidth / 2,
  height: window.innerHeight - (window.innerHeight / 4)
}

const warShip = {
  htmlElem: document.getElementById('war-ship'),
  width: 48,
  height: 48,
  position: {
    x: (frame.width - 48) / 2,
    y: frame.height - ((48 * 4) - 25)
  },
  speedX: 0
}

const bullets = []
const invaders_bullets = []


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
  // const top = frame.htmlElem.getBoundingClientRect().height / 6
  for (let row = 0; row < invaderRows; row++) {
    for (let col = 0; col < invaderCols; col++) {
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
      invader.htmlElem.classList.add("invader")
      // invader.htmlElem.style.transform = `translate(${invader.position.x}px, ${invader.position.y}px)`
      grid.appendChild(invader.htmlElem)
      invaders.push(invader)
    }
  }
}

const invadersShoot = () => {
  setInterval(() => {
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
  }, invaders.length * 100)
}

const checkCollisionInvaderBullet = (bullet, invader) => {
  if (
    bullet.position.x < invader.position.x + invader.width &&
    bullet.position.x + bullet.width > invader.position.x &&
    bullet.position.y < invader.position.y + invader.height &&
    bullet.position.y + bullet.height > invader.position.y
  ) {
    return true;
  }
  return false;
}

const checkCollisionWarShipBullet = (bullet) => {
  if (
    bullet.position.x < warShip.position.x + warShip.width &&
    bullet.position.x + bullet.width > warShip.position.x &&
    bullet.position.y < warShip.position.y + warShip.height &&
    bullet.position.y + bullet.height > warShip.position.y
  ) {
    return true;
  }
  return false;
}

const init = () => {
  frame.htmlElem.style.width = `${frame.width}px`
  frame.htmlElem.style.height = `${frame.height}px`
  createInvaders()
  warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`
  invadersShoot()
  // Setup keyboard event listeners
  controlsSetup(keys)
  gameLoop()
}

const gameLoop = () => {
  requestAnimationFrame(gameLoop)
  moveInvaders()
  moveWarship()

  invaders_bullets.forEach((bullet, bltIndex) => {
    if (bullet.position.y >= frame.htmlElem.getBoundingClientRect().height - 140) {
      bullet.htmlElem.remove();
      invaders_bullets.splice(bltIndex, 1);
    } else {
      moveBullet(bullet);
    }
  });

  bullets.forEach((bullet, bltIndex) => {
    if (bullet.htmlElem.getBoundingClientRect().y <= frame.htmlElem.getBoundingClientRect().top + 90) {
      bullet.htmlElem.remove()
      bullets.splice(bltIndex, 1)
    } else {
      moveBullet(bullet)
    }
  })

  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < invaders.length; j++) {
      if (checkCollisionInvaderBullet(bullets[i], invaders[j])) {
        console.log("Collision detected!");
        bullets[i].htmlElem.remove()
        bullets.splice(i, 1)
        invaders[j].htmlElem.remove()
        invaders.splice(j, 1)
      }
    }
  }

  for (let i = 0; i < invaders_bullets.length; i++) {
    if (checkCollisionWarShipBullet(invaders_bullets[i])) {
      console.log("Collision detected!");
      invaders_bullets[i].htmlElem.remove()
      invaders_bullets.splice(i, 1)
      warShip.htmlElem.remove()
    }
  }

  if (keys.left && warShip.position.x >= 15) {
    warShip.speedX = -5
  } else if (keys.right && warShip.position.x + 48 <= frame.width - 15) {
    warShip.speedX = 5
  } else {
    warShip.speedX = 0
  }
}


init() // Entry point

