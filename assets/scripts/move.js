// here will all the game moves ..

export { moveWarShip, shoot }

const frame = document.getElementById('main-frame')
const bullets = document.getElementById('game-bullets')
const warShip = document.getElementById('game-warship')

let warShipX = frame.offsetWidth / 2 - 30
warShip.style.transform = `translateX(${warShipX}px)`

const moveWarShip = (move) => {
    let transform = warShip.style.transform
    let currentX = parseInt(transform.replace('translateX(', '').replace('px)', '')) || 0
    if (move === "right" && currentX < frame.offsetWidth - 2 * warShip.offsetWidth - 10) {
        warShipX += 10
    } else if (move === "left" && currentX > 0) {
        warShipX -= 10
    }
    warShip.style.transform = `translateX(${warShipX}px)`
}

const shoot = () => {
    let bullet = document.createElement('img')
    bullet.src = '/assets/imgs/bullet.png'
    // bullet.classList.add('bullet')

    let rect = warShip.getBoundingClientRect()
    let frameRect = frame.getBoundingClientRect()
    
    let bulletX = rect.left - frameRect.left + warShip.offsetWidth / 2 - 5-28 
    let bulletY = rect.top - frameRect.top-50 

    bullet.style.position = 'absolute'
    bullet.style.left = `${bulletX}px`
    bullet.style.top = `${bulletY}px`

    bullets.appendChild(bullet)

    function moveBullet() {
        bulletY -= 5
        bullet.style.top = `${bulletY}px`

        if (bulletY > 0) {
            requestAnimationFrame(moveBullet)
        } else {
            bullet.remove()
        }
    }

    requestAnimationFrame(moveBullet)
}
