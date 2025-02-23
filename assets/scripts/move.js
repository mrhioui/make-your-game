// here will all the game moves ..

export { moveWarShip, shoot }

const frame = document.getElementById('main-frame');
const bullets = document.getElementById('game-bullets');
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

const shoot = () => {
    let img = document.createElement('img');
    img.src = '/assets/imgs/bullet.png';
    let rect = warShip.getBoundingClientRect()
    // img.style.left = rect.left
    // console.log(rect.left, rect.top);
    
    img.style.transform= `translate(${rect.x, rect.y})`
    bullets.appendChild(img)
}
