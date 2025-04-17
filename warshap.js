export { warShip,moveWarship,warshipShoot }
import { frame } from "./frame.js";
import { bullets } from "./main.js";
// create warShip
const warShip = {
    htmlElem: (() => {
        const div = document.createElement('div');
        div.id = 'war-ship';
        div.style.position = 'absolute';
        div.style.width = '48px';
        div.style.height = '48px';
        div.style.backgroundImage = 'url(/imgs/warship.png)';
        div.style.backgroundSize = 'contain';
        div.style.backgroundRepeat = 'no-repeat';
        return div;
    })(),
    width: 48,
    height: 48,
    position: {
        x: (frame.width - 48) / 2,
        y: frame.height - ((48 * 4) - 25)
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
    bullets.push(bullet)
}
