export { warShip, warshipBullets, moveWarship, warshipShoot }
import { frame } from "./frame.js";
import { keys } from "./main.js";

const warshipBullets = []
// create warShip
const warShip = {
    htmlElem: (() => {
        const div = document.createElement('div');
        div.id = 'war-ship';
        div.style.position = 'absolute';
        div.style.width = '6vmin';
        div.style.height = '6vmin';
        div.style.backgroundImage = 'url(/imgs/warship.png)';
        div.style.backgroundSize = 'contain';
        div.style.backgroundRepeat = 'no-repeat';
        return div;
    })(),
    width: 6,
    height: 6,
    position: {
        x: (frame.width - 20) / 2,
        y: frame.height - 15
    },
    speedX: 0.7

};


// movement
const moveWarship = () => {
    if (keys.left && warShip.position.x >= 1) {
        warShip.speedX = -0.7
    } else if (keys.right && warShip.position.x + 6 <= frame.width - 18) {
        warShip.speedX = 0.7
    } else {
        warShip.speedX = 0
    }
    
    warShip.position.x += warShip.speedX
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}vmin, ${warShip.position.y}vmin)`
}

// shoot
const warshipShoot = () => {
    const bullet = {
        htmlElem: document.createElement('img'),
        width: 2,
        height: 2,
        position: {
            x: warShip.position.x + 1.8,
            y: warShip.position.y
        },
        speedY: -1
    }
    bullet.htmlElem.src = 'imgs/bullet.png'
    bullet.htmlElem.classList.add("bullet")
    bullet.htmlElem.style.transform = `translate(${bullet.position.x}vmin, ${bullet.position.y}vmin)`
    frame.htmlElem.appendChild(bullet.htmlElem)
    warshipBullets.push(bullet)
}
