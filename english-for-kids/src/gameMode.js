import dataHandler from './dataHandler';
import cards from './dataForCards';

const gameRules = {
  isGameBegin: false,
  mistakesCount: 0,
  answers: [],
  j: 0,
  gameInit() {
    if (document.querySelector('#checkbox').checked) {
      const startButton = document.querySelector('.start-button');
      startButton.addEventListener('click', () => {
        this.playGameWords();
        this.changeGameButton();
      });
    }
  },
  changeGameButton() {
    const startButton = document.querySelector('.start-button');
    const img = document.createElement('img');
    startButton.textContent = '';
    img.classList.add('reload-img');
    img.setAttribute('src', './img/repeat.svg');
    startButton.appendChild(img);
    startButton.classList.add('reload-audio');
    startButton.addEventListener('click', this.playGameWords);
  },
  playGameWords() {
    const arrayAudio = cards[dataHandler.choosenCategoryIndex];
    const wordAudio = document.createElement('audio');
    if (!arrayAudio[gameRules.j]) {
      return;
    }
    wordAudio.setAttribute('src', `${arrayAudio[gameRules.j].audioSrc}`);
    wordAudio.currentTime = 0;
    wordAudio.play();
    wordAudio.innerHTML = '';
  },
  mainGame(e) {
    const arrayAudio = cards[dataHandler.choosenCategoryIndex];
    if (!e.target.closest('img') || e.target.closest('.reload-img')) return;
    const currentAudio = arrayAudio[gameRules.j].audioSrc;
    const wrapper = document.querySelector('.wrapper');
    if (wrapper.childNodes[0].classList.contains('game-mode') && !wrapper.childNodes[0].classList.contains('main-card') && this.isGameBegin) {
      const guess = e.target.closest('img');
      const guessItem = guess.getAttribute('alt');
      this.checkGuess(currentAudio, guess, guessItem, e);
    }
  },
  checkGuess(currentAudio, guess, guessItem) {
    const answers = document.querySelector('.answer');
    const localElem = currentAudio.split('/')[1].slice(0, -4);
    const localObject = JSON.parse(localStorage.getItem(`${localElem}`));
    if (currentAudio.includes(guessItem)) {
      const correctAnswer = document.createElement('img');
      localObject.correct += 1;
      correctAnswer.classList.add('correct-img');
      correctAnswer.setAttribute('src', './img/success.jpg');
      correctAnswer.setAttribute('width', 50);
      correctAnswer.setAttribute('height', 50);
      correctAnswer.style.height = `${5}rem`;
      gameRules.answers.push(correctAnswer);
      guess.classList.add('correct-answer');
      gameRules.j++;
      this.addCorrectAnswerAudio();
      setTimeout(this.playGameWords, 1000);
    } else {
      localObject.mistakes += 1;
      const wrongAnswer = document.createElement('img');
      wrongAnswer.classList.add('wrong-img');
      this.mistakesCount++;
      wrongAnswer.setAttribute('src', './img/failure.jpg');
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
    if (this.answers.length > 24) {
      this.answers.splice(0, 1);
    }
  },
  addLoseWindow() {
    const mainWrapper = document.querySelector('.wrapper');
    const loseWrapper = document.createElement('div');
    const loseGameAudio = document.createElement('audio');
    const loseImg = document.createElement('img');
    loseImg.classList.add('lose-img');
    loseImg.setAttribute('src', './img/lose.jpg');
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
      setTimeout(window.location.reload.bind(window.location), 4500);
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
      setTimeout(window.location.reload.bind(window.location), 4500);
    };
  },
  winGameHandler() {
    if (this.j === cards[dataHandler.choosenCategoryIndex].length && this.mistakesCount === 0) {
      setTimeout(gameRules.addWinWindow, 1000);
    } else if (this.j === cards[dataHandler.choosenCategoryIndex].length && this.mistakesCount !== 0) {
      setTimeout(gameRules.addLoseWindow, 1000);
    }
  },
};

export default gameRules;
