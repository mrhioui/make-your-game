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

const moveWarship = () => {
    warShip.position.x += warShip.speedX
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`
}

const moveBullet = (bullet) => {
    bullet.position.y += bullet.speedY
    bullet.htmlElem.style.transform = `translate(${bullet.position.x}px, ${bullet.position.y}px)`
}

const init = () => {
    frame.htmlElem.style.width = `${frame.width}px`
    frame.htmlElem.style.height = `${frame.height}px`
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`

    // Setup keyboard event listeners
    controlsSetup(keys)

    gameLoop()
}

const gameLoop = () => {
    requestAnimationFrame(gameLoop)

    bullets.forEach((bullet, bltIndex) => {

        if (bullet.htmlElem.getBoundingClientRect().y <= frame.htmlElem.getBoundingClientRect().top) {
            console.log(frame.height, '>>>', frame.htmlElem.getBoundingClientRect().top)
            bullet.htmlElem.remove()
            bullets.splice(bltIndex, 1)
        } else {
            moveBullet(bullet)
        }
    })
    moveWarship()

    if (keys.left && warShip.position.x >= 15) {
        warShip.speedX = -10
    } else if (keys.right && warShip.position.x + 48 <= frame.width - 15) {
        warShip.speedX = 10
    } else {
        warShip.speedX = 0
    }
}


init() // Entry point

