export { gameLoop, keys, setScore, animationId, vmin }
import { controlsSetup } from "./controls.js"
import { moveWarship, warShip, warshipBullets } from "./warshap.js"
import { moveInvaders, invaders, invaders_bullets, createInvaders } from "./invaders.js"
import { frame, createlives } from "./frame.js"

let livesNbr = 3
let scoreNbr = 0
let animationId = null;
const keys = { left: false, right: false, start: false, pause: false, win: false }

// bullets
const moveBullet = (bullet) => {
  bullet.position.y += bullet.speedY
  bullet.htmlElem.style.transform = `translate(${bullet.position.x}vmin, ${bullet.position.y}vmin)`
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

const setScore = (value) => {
  scoreNbr = value;
  document.getElementById('game-score').innerText = scoreNbr;
}

const messageElem = document.createElement('div');
messageElem.id = 'end-message';
// winer/loser
const checkWin = (win) => {
  messageElem.style.position = 'absolute';
  messageElem.style.top = '50%';
  messageElem.style.left = '50%';
  messageElem.style.transform = 'translate(-50%, -50%)';
  messageElem.style.padding = '2vmin 4vmin';
  messageElem.style.background = 'rgba(0, 0, 0, 0.8)';
  messageElem.style.color = 'white';
  messageElem.style.fontSize = '4vmin';
  messageElem.style.border = '0.5vmin solid white';
  messageElem.style.borderRadius = '2vmin';
  messageElem.style.zIndex = '1000';
  messageElem.style.textAlign = 'center';

  invaders.forEach(inv => inv.htmlElem.remove());
  invaders.length = 0;
  warshipBullets.forEach(b => b.htmlElem.remove());
  warshipBullets.length = 0;
  invaders_bullets.forEach(b => b.htmlElem.remove());
  invaders_bullets.length = 0;
  warShip.htmlElem.remove()


  if (win) {
    messageElem.innerText = 'YOU WIN!';
  } else {
    setScore(0)
    createlives()
    messageElem.innerText = 'GAME OVER!';
  }

  frame.htmlElem.appendChild(messageElem);
};


const vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
// gameLoop
const gameLoop = () => {
  animationId = requestAnimationFrame(gameLoop);
  if (!keys.pause) {
    moveWarship()
    moveInvaders()
  }

  const frameHeightVmin = frame.htmlElem.getBoundingClientRect().height / vmin;
  const frameTopPx = frame.htmlElem.getBoundingClientRect().top;

  for (let i = invaders_bullets.length - 1; i >= 0; i--) {
    const bullet = invaders_bullets[i];
    if (bullet.position.y >= frameHeightVmin - 12) {
      bullet.htmlElem.remove();
      invaders_bullets.splice(i, 1);
    } else {
      moveBullet(bullet);
    }
  }

  for (let i = warshipBullets.length - 1; i >= 0; i--) {
    const bullet = warshipBullets[i];
    if (bullet.htmlElem.getBoundingClientRect().y <= frameTopPx + 10) {
      bullet.htmlElem.remove();
      warshipBullets.splice(i, 1);
    } else {
      moveBullet(bullet);
    }
  }



  // collition
  for (let i = warshipBullets.length - 1; i >= 0; i--) {
    for (let j = invaders.length - 1; j >= 0; j--) {
      if (checkCollision(warshipBullets[i], invaders[j])) {
        scoreNbr += invaders[j].score;
        setScore(scoreNbr)

        warshipBullets[i].htmlElem.remove();
        warshipBullets.splice(i, 1);

        invaders[j].htmlElem.remove();
        invaders.splice(j, 1);

        if (invaders.length === 0) {
          checkWin(true)
          keys.win = true
          keys.start = false
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
        checkWin(false)
        livesNbr = 3
        keys.win = false
        keys.start = false
      }
    }
  }

  for (let i = 0; i < invaders.length; i++) {
    if (checkCollision(invaders[i], warShip)) {
      invaders.forEach(inv => inv.htmlElem.remove());
      invaders.length = 0;

      livesNbr -= 1;
      const livesContainer = document.getElementById('game-lives');
      livesContainer.removeChild(livesContainer.lastChild);

      if (livesNbr === 0) {
        checkWin(false)
        livesNbr = 3
        keys.win = false
        keys.start = false
      } else {
        createInvaders()
      }
    }
  }
}

// init
const init = () => {
  controlsSetup(keys)
}

init()