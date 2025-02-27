export { keysSetup, bullets }
import { Bullet } from "./bullets.js"
import { warShip } from "./warship.js"

const bullets = []

const keysSetup = (keys) => {
    document.addEventListener('keydown', ({ code }) => {
        switch (code) {
            case 'KeyP':
                console.log('Pause')
                break

            case 'KeyR':
                console.log('Restart')
                break

            case 'Enter':
                console.log('Continue')
                break

            case 'KeyA':
            case 'ArrowLeft':
                keys.left = true
                console.log('move Left')
                break

            case 'KeyS':
            case 'ArrowRight':
                keys.right = true
                console.log('move Right')
                break

            case 'Space':
                keys.shoot = true
                console.log('Shoot')
                bullets.push(
                    new Bullet({
                        position: {
                            x: warShip.position.x+13,
                            y: warShip.position.y+20
                        },
                        speed: {
                            x: 0,
                            y: -5
                        }
                    })
                )
                break

            default:
                console.log(code)
                break

        }
    })
    document.addEventListener('keyup', ({ code }) => {
        switch (code) {
            case 'KeyP':
                console.log('Pause')
                break

            case 'KeyR':
                console.log('Restart')
                break

            case 'Enter':
                console.log('Continue')
                break

            case 'KeyA':
            case 'ArrowLeft':
                keys.left = false
                console.log('move Left')
                break

            case 'KeyS':
            case 'ArrowRight':
                keys.right = false
                console.log('move Right')
                break

            case 'Space':
                keys.shoot = false
                console.log('Shoot')
                break

            default:
                console.log(code)
                break

        }
    })
}

