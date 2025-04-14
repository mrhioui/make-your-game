////////////////////////////////////////////////////////////
// create frame
const frame = {
  htmlElem: (() => {
    const div = document.createElement('div');
    div.id = 'main-frame';
    return div;
  })(),
  width: window.innerWidth / 2,
  height: window.innerHeight - (window.innerHeight / 4)
};

frame.htmlElem.style.width = `${frame.width}px`;
frame.htmlElem.style.height = `${frame.height}px`;
frame.htmlElem.style.border = "2px solid white";




///////////////////////////////////////////////////////////
// create header
const header = {
  htmlElem: (() => {
    const div = document.createElement('div');
    div.id = 'header';
    return div;
  })(),
};

let headerContent = `
    <h1>SCORE: <span id="game-score">0</span></h1>
    <div id="remaining-time">
        <h1 id="timer">00:00 <img src="/imgs/clock.png" alt="time-icon"></h1>
    </div>
    <div id="game-lives"></div>
`;

let scoreNbr = 0

let livesNbr = 3

header.htmlElem.innerHTML = headerContent;
frame.htmlElem.appendChild(header.htmlElem);

const hr = document.createElement('hr');
frame.htmlElem.appendChild(hr);

document.body.appendChild(frame.htmlElem);

const livesContainer = document.getElementById('game-lives');
livesContainer.innerHTML = '';
for (let live = 0; live < livesNbr; live++) {
  let htmlLive = document.createElement('img');
  htmlLive.src = '/imgs/heart.png';
  livesContainer.appendChild(htmlLive);
}

//////////////////////////////////////////////////////////// 
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


////////////////////////////////////////////////////////////
// create invaders 
const invaders = []
const invaderRows = 3
const invaderCols = 8
const invaderSpeedX = 3
const invaderSpeedY = 2
let invaderDirection = 1

function createInvaders() {
  const grid = document.createElement('div')
  grid.id = 'invaders-grid'
  grid.style.width = '100%';
  grid.style.height = 'auto';
  const gap = 15
  for (let row = 0; row < invaderRows; row++) {
    for (let col = 0; col < invaderCols; col++) {
      const invader = {
        htmlElem: document.createElement('img'),
        width: 48,
        height: 48,
        position: {
          x: col * (48 + gap),
          y: row * (48 + gap)
        }
      }
      invader.htmlElem.src = '/imgs/invader.png'
      invader.htmlElem.style.width = '48px'
      invader.htmlElem.style.height = '48px'
      invader.htmlElem.classList.add("invader")
      invader.htmlElem.style.position = 'absolute'
      grid.appendChild(invader.htmlElem)
      invaders.push(invader)
    }
  }
  frame.htmlElem.appendChild(grid);
}

// movement
function moveInvaders() {
  let edgeReached = false

  invaders.forEach(invader => {
    const nextX = invader.position.x + invaderSpeedX * invaderDirection
    if (nextX < 0 || nextX + invader.htmlElem.getBoundingClientRect().width > frame.htmlElem.getBoundingClientRect().width) {
      edgeReached = true
    }
  })

  if (edgeReached) {
    invaderDirection *= -1
    invaders.forEach(invader => {
      invader.position.y += invaderSpeedY
    })
  } else {
    invaders.forEach(invader => {
      invader.position.x += invaderSpeedX * invaderDirection
    })
  }

  invaders.forEach(invader => {
    invader.htmlElem.style.transform = `translate(${invader.position.x}px, ${invader.position.y}px)`
  })
}

// shoot
const invadersShoot = () => {
  setInterval(() => {
    if (!keys.pause) {

      let nbr = Math.floor(Math.random() * invaders.length)

      const invader_bullet = {
        htmlElem: document.createElement('img'),
        width: 22,
        height: 22,
        position: {
          x: invaders[nbr].position.x + 10,
          y: invaders[nbr].position.y + 40
        },
        speedY: 5
      }

      invader_bullet.htmlElem.src = 'imgs/invader-bullet.png'
      invader_bullet.htmlElem.classList.add("bullet")
      frame.htmlElem.appendChild(invader_bullet.htmlElem)
      invader_bullet.htmlElem.style.transform = `translate(${invader_bullet.position.x}px, ${invader_bullet.position.y}px)`
      invaders_bullets.push(invader_bullet)
    }
  }, invaders.length * 100)
}

////////////////////////////////////////////////////////////
// menu

const menu = {
  htmlElem: (() => {
    const div = document.createElement('div');
    div.id = 'menu';
    return div;
  })(),
};
const StartMenu = `
        <h1>SPACE <br>INvADERS</span></h1>
       <div class="controls">
            <div><span class="square">P</span> Pause</div>
            <div>&nbsp;&nbsp;<span class="square">R</span>  Restart</div>
            <div>&nbsp;<span class="square">Esc</span> Resume</div>
            <br>
            <div><span class="square">←</span> <span class="square">→</span> to move,<span class="square">space</span> to shoot</div>
        </div>
        <div id="start-message">press any key to begin</div>
        `

menu.htmlElem.innerHTML = StartMenu
frame.htmlElem.appendChild(menu.htmlElem)

////////////////////////////////////////////////////////////
// controls
const bullets = []
const invaders_bullets = []
const keys = { left: false, right: false, start: false, pause: false }



const controlsSetup = (keys) => {
  document.addEventListener('keydown', ({ code }) => {
    if (!keys.start) {
      start()
      timer()
      keys.start = true
      return
    }
    switch (code) {
      case 'KeyP':
        pause()
        keys.pause = true
        break

      case 'KeyR':
        break

      case 'Escape':
        resume()
        keys.pause = false
        break

      case 'KeyA':
      case 'ArrowLeft':
        keys.left = true
        break

      case 'KeyS':
      case 'ArrowRight':
        keys.right = true
        break

      default:
        break

    }
  })
  document.addEventListener('keyup', ({ code }) => {
    switch (code) {
      case 'KeyA':
      case 'ArrowLeft':
        keys.left = false
        break

      case 'KeyS':
      case 'ArrowRight':
        keys.right = false
        break

      case 'Space':
        if (!keys.pause) {
          warshipShoot()
        }
        break

      default:
        break
    }
  })
}

const start = () => {
  let message = document.getElementById('start-message')
  message.style.display = 'none'
  menu.htmlElem.style.display = "none"
  createInvaders()
  invadersShoot()
  frame.htmlElem.appendChild(warShip.htmlElem);
  gameLoop()
}

const pause = () => {
  menu.htmlElem.style.display = "block"
  invaders.forEach((invader) => {
    invader.htmlElem.style.display = 'none'
  })
  bullets.forEach((bullet) => {
    bullet.htmlElem.style.display = 'none'
  })
  warShip.htmlElem.style.display = 'none'
}

const resume = () => {
  menu.htmlElem.style.display = "none"
  invaders.forEach((invader) => {
    invader.htmlElem.style.display = 'block'
  })
  warShip.htmlElem.style.display = 'block'
}


////////////////////////////////////////////////////////////
// bullets
const moveBullet = (bullet) => {
  bullet.position.y += bullet.speedY
  bullet.htmlElem.style.transform = `translate(${bullet.position.x}px, ${bullet.position.y}px)`
}

////////////////////////////////////////////////////////////
// collision
function checkCollision(obj1, obj2) {
  return (
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.x + obj1.width > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.height &&
    obj1.position.y + obj1.height > obj2.position.y
  );
}

////////////////////////////////////////////////////////////
// timer
const timer = () => {
  const timerDisplay = document.getElementById('timer');
  let timePast = 0

  const updateTimer = () => {
    const minutes = String(Math.floor(timePast / 60)).padStart(2, '0');
    const seconds = String(timePast % 60).padStart(2, '0');
    timerDisplay.innerHTML = `${minutes}:${seconds} <img src="/imgs/clock.png" alt="time-icon">`;

    if (keys.pause == false) {
      timePast++;
    }
  };
  setInterval(updateTimer, 1000);
};

////////////////////////////////////////////////////////////
// init
const init = () => {
  controlsSetup(keys)
}


////////////////////////////////////////////////////////////
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
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < invaders.length; j++) {
      if (checkCollision(bullets[i], invaders[j])) {
        scoreNbr += 10

        let score = document.getElementById('game-score')
        score.innerText = scoreNbr

        bullets[i].htmlElem.remove()
        bullets.splice(i, 1)

        invaders[j].htmlElem.remove()
        invaders.splice(j, 1)
        if (invaders.length == 0) {
          alert('win')
        }
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
        console.log("Game Over!");

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