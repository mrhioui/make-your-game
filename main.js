export { gameLoop, keys, bullets,scoreNbr,livesNbr
  
 }
import { controlsSetup } from "./controls.js"
import { moveWarship,warShip } from "./warshap.js"
import { moveInvaders,invaders,invaders_bullets } from "./invaders.js"
import { frame } from "./frame.js"

let livesNbr = 3
let scoreNbr = 0;
const bullets = []
const keys = { left: false, right: false, start: false, pause: false }


// bullets
const moveBullet = (bullet) => {
  bullet.position.y += bullet.speedY
  bullet.htmlElem.style.transform = `translate(${bullet.position.x}px, ${bullet.position.y}px)`
}

// collision
function checkCollision(obj1, obj2) {
  return (
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.x + obj1.width > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.height &&
    obj1.position.y + obj1.height > obj2.position.y
  );
}

// init
const init = () => {
  controlsSetup(keys)
}


// gameLoop
const gameLoop = () => {
  requestAnimationFrame(gameLoop)
  if (!keys.pause) {
    moveWarship()
    moveInvaders()
  }

  invaders_bullets.forEach((bullet, bltIndex) => {
    if (bullet.position.y >= frame.htmlElem.getBoundingClientRect().height - 140) {
      bullet.htmlElem.remove();
      invaders_bullets.splice(bltIndex, 1);
    } else {
      moveBullet(bullet);
    }
  });

  bullets.forEach((bullet, bltIndex) => {
    if (bullet.htmlElem.getBoundingClientRect().y <= frame.htmlElem.getBoundingClientRect().top + 90) {
      bullet.htmlElem.remove()
      bullets.splice(bltIndex, 1)
    } else {
      moveBullet(bullet)
    }
  })


  // collition
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = invaders.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[i], invaders[j])) {
        scoreNbr += 10;
  
        let score = document.getElementById('game-score');
        score.innerText = scoreNbr;
  
        bullets[i].htmlElem.remove();
        bullets.splice(i, 1);
  
        invaders[j].htmlElem.remove();
        invaders.splice(j, 1);
  
        if (invaders.length === 0) {
          alert('win');
        }
  
        break;
      }
    }
  }
  

  for (let i = 0; i < invaders_bullets.length; i++) {
    if (checkCollision(warShip, invaders_bullets[i])) {
      invaders_bullets[i].htmlElem.remove()
      invaders_bullets.splice(i, 1)

      livesNbr -= 1;
      const livesContainer = document.getElementById('game-lives');
      livesContainer.removeChild(livesContainer.lastChild);

      if (livesNbr === 0) {
        alert('Game Over!');
        return;
      }
    }
  }

  // movement warship
  if (keys.left && warShip.position.x >= 15) {
    warShip.speedX = -5
  } else if (keys.right && warShip.position.x + 48 <= frame.width - 15) {
    warShip.speedX = 5
  } else {
    warShip.speedX = 0
  }
}

init()