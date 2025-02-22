// here will all the game moves ..

export { moveWarShip, shoot }

const frame = document.getElementById('main-frame');
const warShip = document.getElementById('game-warship');

let warShipX = frame.offsetWidth / 2 - 30;
warShip.style.transform = `translateX(${warShipX}px)`;

const moveWarShip = (move) => {
    let transform = warShip.style.transform;
    let currentX = parseInt(transform.replace('translateX(', '').replace('px)', '')) || 0;
    if (move === "right" && currentX < frame.offsetWidth - 2 * warShip.offsetWidth - 10) {
        warShipX += 10;
    } else if (move === "left" && currentX > 0) {
        warShipX -= 10;
    }
    warShip.style.transform = `translateX(${warShipX}px)`;
};
// const frame = document.getElementById('main-frame');
// const warShip = document.getElementById('game-warship');
// warShip.style.left = `${frame.offsetWidth / 2 - 30}px`;
// const bullets = document.getElementById('game-bullets');

// const moveWarShip = (move) => {
//     if (move == "right" && (parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) < frame.offsetWidth - 2 * warShip.offsetWidth - 10)) {
//         warShip.style.left = `${parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) + 10}px`
//     } else if (parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) > 0) {
//         warShip.style.left = `${parseInt(warShip.style.left.slice(0, warShip.style.left.length - 2)) - 10}px`
//     }
// }

const shoot = () => {
    let img = document.createElement('img');
    img.src = '/assets/imgs/bullet.png';
    img.style.position = 'absolute';
    console.log(warShip.x);
    
    img.style.transform = `translateX(${warShip.x}px)`;
    img.style.transform = `translateY(${warShip.y}px)`;
    frame.appendChild(img)
}
