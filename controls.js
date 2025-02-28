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
                // bullets.push(
                //     new Bullet({
                //         x: warShip.position.x + 13,
                //         y: warShip.position.y + 20
                //     }, -10
                //     )
                // )
                // console.log(bullets);
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

