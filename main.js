import { controlsSetup } from './controls.js'

const frame = {
    htmlElem: document.getElementById('main-frame'),
    width: 1150,
    height: 850
}

const warShip = {
    htmlElem: document.getElementById('war-ship'),
    position: {
        x: 1150 / 2 - 48 / 2,
        y: 850 - 48 - 15
    },
    speedX: 0
}

const keys = { left: false, right: false, shoot: false }

const moveWarship = () => {
    warShip.position.x += warShip.speedX
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`
}
const init = () => {
    frame.htmlElem.style.width = "1150px"
    frame.htmlElem.style.height = "850px"
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`

    // Setup keyboard event listeners
    controlsSetup(keys)

    gameLoop()
}

const gameLoop = () => {
    requestAnimationFrame(gameLoop)
    moveWarship()

    if (keys.left && warShip.position.x >= 15) {
        warShip.speedX = -10
    } else if (keys.right && warShip.position.x + 48 <= 1150 - 15) {
        warShip.speedX = 10
    } else {
        warShip.speedX = 0
    }
}


init() // Entry point

