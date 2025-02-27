// get game main frame
const frame = document.getElementById('main-frame')
// create a new 2d context
const ctx = frame.getContext('2d')

// default dimensions
frame.width = 850
frame.height = 638

export {frame, ctx } 
import { keysSetup } from "./controls.js"
import { Warship } from "./warship.js"

const keys = {
    left: false,
    right: false,
    shoot: false
}

const warShip = new Warship()

const main = () => {
    requestAnimationFrame(main)
    ctx.fillRect(0, 0, frame.width, frame.height)
    warShip.update()
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



