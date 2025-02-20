// here will the game logic and collision algo

const warShip = document.getElementById('game-warship')
warShip.style.left = '0px'
document.addEventListener(
    "keydown",
    (event) => {
        switch (event.key) {
            case 'ArrowRight':
                console.log('>>>')
                warShip.style.left = `${parseInt(warShip.style.left.slice(0, warShip.style.left.length-2))+10}px`

                console.log(warShip.style.left)
                
                break
            case 'ArrowLeft':
                if (parseInt(warShip.style.left.slice(0, warShip.style.left.length-2)) >= 10)
                warShip.style.left = `${parseInt(warShip.style.left.slice(0, warShip.style.left.length-2))-10}px`
                console.log('<<<')
                break
            case 'p':
                console.log('pause')
                break
            case 'r':
                console.log('restart')
                break
            case 'enter':
                console.log('continue')
                break

            case ' ':
                console.log('shoot')
                break
            default:
                console.log(event.key)
                break
        }

    })