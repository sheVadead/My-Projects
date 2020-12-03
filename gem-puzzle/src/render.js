class Render {
  constructor() {
    this.fieldSizeOptions = [3, 4, 5, 6, 7, 8];
    this.rows = localStorage.getItem('fieldSize') || 4;
    this.columns = localStorage.getItem('fieldSize') || 4;
    this.blockSize = Math.floor(450 / (this.rows));
    this.empty = {
      value: 16,
      left: 0,
      top: 0,
    };
    this.blocksCoord = [];
    this.numbers = [...Array(this.rows * this.columns).keys()].map((item) => item + 1)
      .sort(() => Math.random() - 0.5);
    this.counter = 0;
    this.emptyBlock = 0;
    this.isPaused = false;
    this.sortedArray = [];
    this.isVolumeOn = false;
    this.suffleIndex = [];
    this.MULTIPLIERS_FOR_BACKGROUND = {
      top: 143,
      left: 454,
    };
  }

  createIconHTML(iconName) {
    return `<i class="material-icons">${iconName}</i>`;
  }

  getField() {
    const field = document.createElement('div');
    const header = document.createElement('header');
    const time = document.createElement('div');
    const moves = document.createElement('div');
    const moveCount = document.createElement('span');
    const overlay = document.createElement('div');
    const newGame = document.createElement('button');
    const chooseFieldSize = document.createElement('select');
    const pauseGame = document.createElement('button');
    const stopWatch = document.createElement('span');
    const volumeUp = document.createElement('div');
    const audioClick = document.createElement('audio');
    const reload = document.createElement('div');
    const saveGame = document.createElement('button');
    const loadGame = document.createElement('button');
    const saveChange = document.createElement('span');
    const leaderBoardWrap = document.createElement('div');
    const leaderBoardList = document.createElement('div');
    const leaderButton = document.createElement('button');
    const localStorageItem = localStorage.getItem('results');
    leaderButton.classList.add('leader-button');
    leaderButton.textContent = 'Score';
    leaderButton.addEventListener('click', () => {
      leaderBoardWrap.classList.toggle('hidden');
    });
    leaderBoardWrap.classList.add('leader-wrap');
    leaderBoardWrap.classList.add('hidden');
    leaderBoardList.classList.add('leader-list');
    if (JSON.parse(localStorageItem)) {
      for (let i = 0; i < JSON.parse(localStorageItem).length; i++) {
        const li = document.createElement('div');
        li.textContent = `Moves: ${JSON.parse(localStorageItem)[i][0]}. Time: ${JSON.parse(localStorageItem)[i][1]}`;
        leaderBoardList.appendChild(li);
      }
    }

    leaderBoardWrap.appendChild(leaderBoardList);
    saveChange.classList.add('save-change');
    saveChange.textContent = 'Field size saved. Press "NEW GAME" button.';
    reload.classList.add('reload');
    reload.innerHTML = this.createIconHTML('autorenew');
    saveGame.classList.add('save-game');
    saveGame.textContent = 'Save game';
    loadGame.classList.add('load-game');
    loadGame.textContent = 'Load Game';
    loadGame.addEventListener('click', () => {
      this.loadGame();
    });
    saveGame.addEventListener('click', () => {
      saveGame.textContent = 'Game saved';
      setTimeout(() => {
        saveGame.textContent = 'Save Game';
      }, 1000);
      this.saveGameHandler();
    });
    audioClick.setAttribute('id', 'click-sound');
    audioClick.setAttribute('src', './audio/space.mp3');
    volumeUp.classList.add('volume-up');
    volumeUp.innerHTML = this.createIconHTML('volume_off');
    volumeUp.addEventListener('click', () => {
      this.isVolumeOn = !this.isVolumeOn;
      if (this.isVolumeOn) {
        volumeUp.innerHTML = '';
        volumeUp.innerHTML = this.createIconHTML('volume_up');
      } else {
        volumeUp.innerHTML = this.createIconHTML('volume_off');
      }
    });
    stopWatch.classList.add('stop-watch');
    stopWatch.textContent = '0: 00';
    chooseFieldSize.classList.add('choose-size');
    chooseFieldSize.addEventListener('change', () => {
      chooseFieldSize.childNodes.forEach((item) => {
        if (item.selected === true) {
          localStorage.setItem('fieldSize', item.value);
        }
      });
      overlay.appendChild(saveChange);
      setTimeout(() => {
        overlay.querySelector('.save-change').remove();
      }, 1000);
    });

    this.fieldSizeOptions.forEach((item) => {
      const selectItem = document.createElement('option');
      selectItem.textContent = `${item}x${item}`;
      selectItem.value = item;
      if (item == localStorage.getItem('fieldSize') || item.value == 4) {
        selectItem.setAttribute('selected', true);
      }
      chooseFieldSize.appendChild(selectItem);
    });
    newGame.classList.add('new-game');
    newGame.textContent = 'New Game';
    time.classList.add('time');
    time.appendChild(stopWatch);
    moveCount.textContent = 0;
    moveCount.classList.add('move-count');
    moves.classList.add('moves');
    moves.textContent = 'Moves: ';
    moves.appendChild(moveCount);
    header.appendChild(moves);
    header.appendChild(time);
    header.appendChild(pauseGame);
    header.appendChild(volumeUp);
    header.appendChild(reload);
    header.classList.add('header');
    field.classList.add('field');
    overlay.classList.add('overlay');
    overlay.appendChild(newGame);
    overlay.appendChild(saveGame);
    overlay.appendChild(loadGame);
    overlay.appendChild(leaderButton);
    overlay.appendChild(chooseFieldSize);
    field.appendChild(overlay);
    pauseGame.textContent = 'PAUSE';
    pauseGame.classList.add('pause-button');
    pauseGame.setAttribute('disabled', 'true');
    pauseGame.addEventListener('click', () => {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        pauseGame.textContent = 'RESUME';
        field.appendChild(overlay);
        this.pauseHandler();
      } else {
        this.resumeTimer();
        pauseGame.textContent = 'PAUSE';
        overlay.remove();
      }
    });
    document.body.appendChild(audioClick);
    document.body.appendChild(header);
    document.body.appendChild(field);
    document.body.appendChild(leaderBoardWrap);
    return field;
  }

  getBlocks() {
    const newField = this.getField();
    this.checkSolvability(this.numbers);
    this.numbers.forEach((item) => {
      const block = document.createElement('div');
      block.classList.add('field__item');
      block.setAttribute('data-num', item);
      block.setAttribute('draggable', true);
      block.textContent = item + 1 - 1;
      block.style.width = `${this.blockSize}px`;
      block.style.height = `${this.blockSize}px`;
      block.style.backgroundImage = 'url("./img/112.jpg")';
      this.sortedArray.push(block);
    });
    this.sortedArray.forEach((item, index) => {
      this.suffleIndex.push(item.textContent);
      this.blocksPosition(item, index);
      newField.appendChild(item);
    });
    this.blocksListenerHandler();
  }

  shuffle(a) {
    let j; let x;
    for (let i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  blocksPosition(block, index) {
    const left = index % this.rows;
    const top = (index - left) / this.rows;
    const backLeft = block.innerHTML % this.rows;
    const backgroundLeft = `-${backLeft * this.blockSize}px`;
    const backTop = (block.innerHTML - backLeft) / this.rows;
    const backgrounTop = `-${backTop * this.blockSize}px`;
    block.style.backgroundRepeat = 'no-repeat';
    block.style.backgroundPosition = ` ${backgroundLeft}  ${backgrounTop} `;
    if (block.innerHTML % this.rows === 0 && block.innerHTML !== 0) {
      const backgrounTop = `-${backTop * this.blockSize - this.MULTIPLIERS_FOR_BACKGROUND.top}px`;
      const backgroundLeft = `-${backLeft * this.blockSize + this.MULTIPLIERS_FOR_BACKGROUND.left}px`;
      block.style.backgroundPosition = ` ${backgroundLeft}  ${backgrounTop} `;
    }
    this.blocksCoord.push({
      value: block.innerHTML - 1,
      left,
      top,
      elem: block,
    });
    const blockAmount = this.rows * this.columns;
    if ((parseInt(block.innerHTML)) === blockAmount) {
      block.ondragstart = function () {
        return false;
      };
      block.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      this.emptyBlock = index;
      block.textContent = '';
      block.style.background = 'none';
      this.empty.left = `${left * this.blockSize}px`;
      this.empty.top = `${top * this.blockSize}px`;
    }
    block.style.left = `${left * this.blockSize}px`;
    block.style.top = `${top * this.blockSize}px`;
  }
}

export default Render;
