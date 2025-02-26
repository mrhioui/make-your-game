// here will all the game moves ..

export { moveWarShip, shoot, startGame, pauseGame, restartGame };

const enemies = document.getElementById('game-enemies');
const frame = document.getElementById('main-frame');
const bullets = document.getElementById('game-bullets');
const warShip = document.getElementById('game-warship');

const menuStart = document.getElementById("start-menu");
const gameHeader = document.getElementById("game-header");
const gameBody = document.getElementById("game-body");
const line = document.getElementById("line");

let warShipX = frame.offsetWidth / 2 - 30;
warShip.style.transform = `translateX(${warShipX}px)`;

let enemiesStepX = 15;
let enemiesStepY = 0;
let enemyMoveInterval = null;
let bulletsPaused = false;
let activeBullets = [];

const moveEnemines = () => {
    if (enemyMoveInterval) clearInterval(enemyMoveInterval);

    enemyMoveInterval = setInterval(() => {
        let currentX = parseInt(enemies.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
        let currentY = parseInt(enemies.style.transform.replace('translateY(', '').replace('px)', '')) || 0;

        if (currentX > frame.offsetWidth - enemies.offsetWidth - 40 || currentX < 0) {
            enemiesStepX *= -1;
        }

        if (currentX === 0) {
            enemiesStepY += 10;
        }

        enemies.style.transform = `translateX(${currentX + enemiesStepX}px) translateY(${currentY + enemiesStepY}px)`;
    }, 100);
};

const moveWarShip = (move) => {
    let currentX = parseInt(warShip.style.transform.replace('translateX(', '').replace('px)', '')) || 0;

    if (move === "right" && currentX < frame.offsetWidth - warShip.offsetWidth - 30) {
        warShipX += 10;
    } else if (move === "left" && currentX > 0) {
        warShipX -= 10;
    }

    warShip.style.transform = `translateX(${warShipX}px)`;
};

const shoot = () => {
    if (bulletsPaused) return;

    let bullet = document.createElement('img');
    bullet.src = '/assets/imgs/bullet.png';
    bullet.classList.add('bullet');

    let rect = warShip.getBoundingClientRect();
    let frameRect = frame.getBoundingClientRect();

    let bulletX = rect.left - frameRect.left + warShip.offsetWidth / 2 - 5 - 28;
    let bulletY = rect.top - frameRect.top - 50;

    bullet.style.position = 'absolute';
    bullet.style.left = `${bulletX}px`;
    bullet.style.top = `${bulletY}px`;

    bullets.appendChild(bullet);
    activeBullets.push(bullet);

    function moveBullet() {
        if (bulletsPaused) return;

        bulletY -= 5;
        bullet.style.top = `${bulletY}px`;

        if (bulletY > 0) {
            requestAnimationFrame(moveBullet);
        } else {
            bullet.remove();
            activeBullets = activeBullets.filter(b => b !== bullet);
        }
    }

    requestAnimationFrame(moveBullet);
};

const resumeBullets = () => {
    activeBullets.forEach(bullet => {
        let bulletY = parseInt(bullet.style.top.replace('px', ''));

        function moveBullet() {
            if (bulletsPaused) return;

            bulletY -= 5;
            bullet.style.top = `${bulletY}px`;

            if (bulletY > 0) {
                requestAnimationFrame(moveBullet);
            } else {
                bullet.remove();
                activeBullets = activeBullets.filter(b => b !== bullet);
            }
        }

        requestAnimationFrame(moveBullet);
    });
};

const startGame = () => {
    menuStart.style.display = "none";
    gameHeader.style.display = "flex";
    gameBody.style.display = "flex";
    line.style.display = "flex";

    moveEnemines();
};

const pauseGame = (isPaused) => {
    if (isPaused) {
        menuStart.style.display = "flex";
        gameHeader.style.display = "none";
        gameBody.style.display = "none";
        line.style.display = "none";

        clearInterval(enemyMoveInterval);
        enemyMoveInterval = null;
        bulletsPaused = true;
    } else {
        menuStart.style.display = "none";
        gameHeader.style.display = "flex";
        gameBody.style.display = "flex";
        line.style.display = "flex";

        moveEnemines();
        bulletsPaused = false;
        resumeBullets();
    }
};

const restartGame = () => {
    menuStart.style.display = "none";
    gameHeader.style.display = "flex";
    gameBody.style.display = "flex";
    line.style.display = "flex";

    warShipX = frame.offsetWidth / 2 - 30;
    warShip.style.transform = `translateX(${warShipX}px)`;

    enemiesStepY = 0
    enemies.style.transform = `translateX(0px) translateY(0px)`;

    bullets.innerHTML = "";
    activeBullets = [];

    moveEnemines();
    bulletsPaused = false;
};
