// here will all the game moves ..

export { moveWarShip, shoot }

const frame = document.getElementById('main-frame');
const warShip = document.getElementById('game-warship');
warShip.style.left = `${frame.offsetWidth / 2 - 30}px`;
const bullets = document.getElementById('game-bullets');

const moveWarShip = (move) => {
    if (move == "right" && (parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) < frame.offsetWidth - 2 * warShip.offsetWidth - 10)) {
        warShip.style.left = `${parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) + 10}px`
    } else if (parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) > 0) {
        warShip.style.left = `${parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) - 10}px`
    }
}

const shoot = () => {
    let img = document.createElement('img');
    img.src = '/assets/imgs/bullet.png';
    img.style.left = warShip.style.left;
    frame.appendChild(img)
}
