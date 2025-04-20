export { warShip, warshipBullets, moveWarship, warshipShoot }
import { frame, unit } from "./frame.js";

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
    width: 2 * unit,
    height: 2 * unit,
    position: {
        x: (frame.width - 4 * unit) / 2,
        y: frame.height - ((18 * unit ) )
    },
    speedX: 0

};


// movement
const moveWarship = () => {
    warShip.position.x += warShip.speedX
    warShip.htmlElem.style.transform = `translate(${warShip.position.x}px, ${warShip.position.y}px)`
}

// shoot
const warshipShoot = () => {
    const bullet = {
        htmlElem: document.createElement('img'),
        width: 22,
        height: 22,
        position: {
            x: warShip.position.x + 13,
            y: warShip.position.y - 20
        },
        speedY: -5
    }
    bullet.htmlElem.src = 'imgs/bullet.png'
    bullet.htmlElem.classList.add("bullet")
    bullet.htmlElem.style.transform = `translate(${bullet.position.x}px, ${bullet.position.y}px)`
    frame.htmlElem.appendChild(bullet.htmlElem)
    warshipBullets.push(bullet)
}
