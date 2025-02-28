import { frame, warShip, bullets } from "./main.js"

export { controlsSetup }

// const bullets = []

const controlsSetup = (keys) => {
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

                const bullet = {
                    htmlElem: document.createElement('img'),
                    width: 22,
                    height: 22,
                    position: {
                        x: warShip.position.x-warShip.width +13,
                        y: warShip.position.y + 20
                    },
                    speedY: -7
                }
                bullet.htmlElem.src = '/imgs/bullet.png'
                frame.htmlElem.appendChild(bullet.htmlElem)
                bullets.push(bullet)
                console.log(bullets);
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

