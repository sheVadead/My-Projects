import dataHandler from './dataHandler';
import cards from './dataForCards';
import statisticObject from './statistic';

const gameRules = {
  isGameBegin: false,
  mistakesCount: 0,
  answers: [],
  randomArrayAudio: new Set(),
  j: 0,
  gameInit() {
    if (document.querySelector('#checkbox').checked) {
      const startButton = document.querySelector('.start-button');
      if (!startButton) return;

      startButton.addEventListener('click', (e) => {
        if (e.target.closest('.start-button')) {
          this.playGameWords();
          this.changeGameButton();
        }
      });
    }
  },
  changeGameButton() {
    const startButton = document.querySelector('.start-button');
    const img = document.createElement('img');
    startButton.textContent = '';
    img.classList.add('reload-img');
    img.setAttribute('src', './img/repeat.svg');
    img.setAttribute('width', '60');
    img.setAttribute('height', '60');
    startButton.appendChild(img);
    startButton.classList.add('reload-audio');
    startButton.addEventListener('click', this.playGameWords);
  },
  playGameWords() {
    let arrayAudio = cards[dataHandler.choosenCategoryIndex];
    if (statisticObject.hardWordsArray.length !== 0) {
      arrayAudio = statisticObject.hardWordsArray;
    }
    while (gameRules.randomArrayAudio.size < arrayAudio.length) {
      gameRules.randomArrayAudio.add(Math.floor(Math.random() * arrayAudio.length));
    }
    const randomAudioArray = Array.from(gameRules.randomArrayAudio);

    const wordAudio = document.createElement('audio');
    if (!arrayAudio[gameRules.j]) {
      return;
    }
    wordAudio.setAttribute('src', `${arrayAudio[randomAudioArray[gameRules.j]].audioSrc}`);
    wordAudio.currentTime = 0;
    wordAudio.play();
    wordAudio.innerHTML = '';
  },
  mainGame(e) {
    let arrayAudio = cards[dataHandler.choosenCategoryIndex];
    if (statisticObject.hardWordsArray.length !== 0) {
      arrayAudio = statisticObject.hardWordsArray;
    }
    const randomAudioArray = Array.from(gameRules.randomArrayAudio);
    if (!e.target.closest('img') || e.target.closest('.reload-img') || randomAudioArray.length === 0) return;
    const currentAudio = arrayAudio[randomAudioArray[gameRules.j]].audioSrc;
    const wrapper = document.querySelector('.wrapper');
    if (wrapper.childNodes[0].classList.contains('game-mode') && !wrapper.childNodes[0].classList.contains('main-card') && this.isGameBegin) {
      const guess = e.target.closest('img');
      const guessItem = guess.getAttribute('alt');
      this.checkGuess(currentAudio, guess, guessItem, e);
    }
  },
  checkGuess(currentAudio, guess, guessItem) {
    const answers = document.querySelector('.answer');
    const answerWrapper = document.createElement('div');
    answerWrapper.classList.add('answer__wrapper');
    const localElem = currentAudio.split('/')[1].slice(0, -4);
    const localObject = JSON.parse(localStorage.getItem(`${localElem}`));
    if (guessItem == currentAudio.slice(6, -4)) {
      const correctAnswer = document.createElement('img');
      localObject.correct += 1;
      correctAnswer.classList.add('correct-img');
      correctAnswer.setAttribute('src', './img/star-win.png');
      correctAnswer.setAttribute('width', 55);
      correctAnswer.setAttribute('height', 48);
      gameRules.answers.push(correctAnswer);
      guess.parentNode.parentNode.classList.add('correct-answer');
      gameRules.j++;
      this.addCorrectAnswerAudio();
      setTimeout(this.playGameWords, 1000);
    } else {
      localObject.mistakes += 1;
      const wrongAnswer = document.createElement('img');
      wrongAnswer.classList.add('wrong-img');
      this.mistakesCount++;
      wrongAnswer.setAttribute('src', './img/star-wrong.svg');
      wrongAnswer.setAttribute('width', 55);
      wrongAnswer.setAttribute('height', 55);
      wrongAnswer.style.height = `${5}rem`;
      gameRules.answers.push(wrongAnswer);
      this.addWrongAnswerAudio();
    }
    localStorage.setItem(`${localElem}`, JSON.stringify(localObject));
    this.checkAnswerNumber();
    answers.innerHTML = '';
    gameRules.answers.forEach((item) => {
      answers.appendChild(item);
    });
    this.winGameHandler();
  },
  addCorrectAnswerAudio() {
    const correct = document.createElement('audio');
    correct.setAttribute('src', './audio/success.mp3');
    correct.currentTime = 0;
    correct.play();
  },
  addWrongAnswerAudio() {
    const wrong = document.createElement('audio');
    wrong.setAttribute('src', './audio/failure.mp3');
    wrong.currentTime = 0;
    wrong.play();
  },
  checkAnswerNumber() {
    const correctAnswerWidth = 55;
    const screenWidthMultiplayer = Math.floor(screen.width / correctAnswerWidth) - 1;
    if (this.answers.length > screenWidthMultiplayer) {
      this.answers.splice(0, 1);
    }
  },
  addLoseWindow() {
    const mainWrapper = document.querySelector('.wrapper');
    const loseWrapper = document.createElement('div');
    const loseGameAudio = document.createElement('audio');
    const loseImg = document.createElement('img');
    document.body.style.pointerEvents = 'none';
    loseImg.classList.add('lose-img');
    loseImg.setAttribute('src', './img/lose.png');
    const loseText = document.createElement('span');
    while (mainWrapper.firstChild) {
      mainWrapper.removeChild(mainWrapper.firstChild);
    }
    loseGameAudio.setAttribute('src', './audio/loseGame.mp3');
    loseWrapper.classList.add('lose-wrapper');
    loseText.classList.add('lose-text');
    loseText.textContent = ` You have ${gameRules.mistakesCount} mistakes.Keep trying. Next time will be better =)`;
    loseWrapper.appendChild(loseImg);
    loseWrapper.appendChild(loseText);
    mainWrapper.appendChild(loseWrapper);
    loseImg.onload = function () {
      setTimeout(dataHandler.mainPageHandler, 3000);
      setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 2500);
      loseGameAudio.currentTime = 0;
      loseGameAudio.play();
    };
  },
  addWinWindow() {
    const mainWrapper = document.querySelector('.wrapper');
    const winWrapper = document.createElement('div');
    const winGameAudio = document.createElement('audio');
    const winText = document.createElement('span');
    const winImg = document.createElement('img');
    document.body.style.pointerEvents = 'none';

    while (mainWrapper.firstChild) {
      mainWrapper.removeChild(mainWrapper.firstChild);
    }
    winImg.classList.add('win-img');
    winImg.setAttribute('src', './img/win.png');
    winGameAudio.setAttribute('src', './audio/winGame.mp3');
    winGameAudio.currentTime = 0;
    winGameAudio.play();
    winWrapper.classList.add('win-wrapper');
    winText.classList.add('win-text');
    winText.textContent = 'You win! \n Congratulations!!!';
    winWrapper.appendChild(winImg);
    winWrapper.appendChild(winText);
    mainWrapper.appendChild(winWrapper);
    winImg.onload = function () {
      winGameAudio.currentTime = 0;
      winGameAudio.play();
      setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 2500);
      setTimeout(dataHandler.mainPageHandler, 3000);
    };
  },
  winGameHandler() {
    let cardsArrayLength = cards[dataHandler.choosenCategoryIndex].length;
    if (statisticObject.hardWordsArray.length > 0) {
      cardsArrayLength = statisticObject.hardWordsArray.length;
    }
    if ((this.j === cardsArrayLength && this.mistakesCount === 0)) {
      setTimeout(gameRules.addWinWindow, 1000);
    } else if ((this.j === cardsArrayLength && this.mistakesCount !== 0)) {
      setTimeout(gameRules.addLoseWindow, 1000);
    }
  },
};

export default gameRules;
