export { menu, frame, createlives }


// create frame
const frame = {
    width: 120,
    height: 80,
    htmlElem: (() => {
        const div = document.createElement('div');
        div.id = 'main-frame';
        return div;
    })(),
};

frame.htmlElem.style.width = `${frame.width}vmin`;
frame.htmlElem.style.height = `${frame.height}vmin`;
frame.htmlElem.style.border = "2px solid white";


// create header
const header = {
    htmlElem: (() => {
        const div = document.createElement('div');
        div.id = 'header';
        let headerContent = `
             <h1>SCORE: <span id="game-score">0</span></h1>
             <div id="remaining-time">
                 <h1 id="timer">00:00 <img src="/imgs/clock.png" alt="time-icon"></h1>
             </div>
             <div id="game-lives"></div>
         `;
        div.innerHTML = headerContent;
        return div;
    })(),
};


frame.htmlElem.appendChild(header.htmlElem);

const hr = document.createElement('hr');
frame.htmlElem.appendChild(hr);

document.body.appendChild(frame.htmlElem);

const createlives = () => {
    const livesContainer = document.getElementById('game-lives');
    livesContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('img');
        heart.src = '/imgs/heart.png';
        livesContainer.appendChild(heart);
    }
}

createlives()

// menu
const menu = {
    htmlElem: (() => {
        const div = document.createElement('div');
        div.id = 'menu';
        const StartMenu = `
          <h1>SPACE <br>INvADERS</span></h1>
         <div class="controls">
              <div><span class="square">P</span> Pause</div>
              <div>&nbsp;&nbsp;<span class="square">R</span>  Restart</div>
              <div>&nbsp;<span class="square">Esc</span> Resume</div>
              <br>
              <div><span class="square">←</span> <span class="square">→</span> to move,<span class="square">space</span> to shoot</div>
          </div>
          <div id="start-message">press enter key to begin</div>
          `
        div.innerHTML = StartMenu

        return div;
    })(),
};

frame.htmlElem.appendChild(menu.htmlElem)
