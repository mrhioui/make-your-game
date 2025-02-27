// get game main frame
const frame = document.getElementById('main-frame')
// create a new 2d context
const ctx = frame.getContext('2d')

// default dimensions
frame.width = 1150
frame.height = 850
// frame.width = window.innerWidth
// frame.height = window.innerHeight



export { frame, ctx, bullets }
import { keysSetup, bullets } from "./controls.js"
import { warShip } from "./warship.js"

const keys = {
    left: false,
    right: false,
    shoot: false
}


const main = () => {
    // recall func but depends on the machine how many fps supports
    requestAnimationFrame(main)

    // clear the main frame with black
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, frame.width, frame.height)

    // move the warship left/right
    bullets.forEach(bullet => {
        bullet.move()
    })
    warShip.move()


    // set moving speed and set boundries limits
    if (keys.left && warShip.position.x >= 15) {
        warShip.speedX = -10
    } else if (keys.right && warShip.position.x + warShip.width <= frame.width - 15) {
        warShip.speedX = 10
    } else {
        warShip.speedX = 0
    }
}

// setup keyboard event listners
keysSetup(keys)

main() // entry point



