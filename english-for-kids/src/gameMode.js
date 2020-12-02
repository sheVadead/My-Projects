import dataHandler from './dataHandler';
import cards from './dataForCards';

const gameRules = {
  isGameBegin: false,
  mistakesCount: 0,
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
    img.setAttribute('src', '../dist/img/repeat.svg');
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

    if (wrapper.childNodes[0].classList.contains('game-mode') && this.isGameBegin) {
      const guess = e.target.closest('img');
      const guessItem = guess.getAttribute('alt');
      this.checkGuess(currentAudio, guess, guessItem);
    }
  },
  checkGuess(currentAudio, guess, guessItem) {
    const answers = document.querySelector('.answer');
    if (currentAudio.includes(guessItem)) {
      const correctAnswer = document.createElement('img');
      correctAnswer.classList.add('correct-img');
      correctAnswer.setAttribute('src', '../dist/img/success.jpg');
      correctAnswer.style.height = `${5}rem`;
      answers.appendChild(correctAnswer);
      guess.classList.add('correct-answer');
      gameRules.j++;
      this.addCorrectAnswerAudio();
      setTimeout(this.playGameWords, 1000);
    } else {
      const wrongAnswer = document.createElement('img');
      wrongAnswer.classList.add('wrong-img');
      this.mistakesCount++;
      wrongAnswer.setAttribute('src', '../dist/img/failure.jpg');
      wrongAnswer.style.height = `${5}rem`;
      this.addWrongAnswerAudio();
      answers.appendChild(wrongAnswer);
    }
    this.winGameHandler();
  },
  addCorrectAnswerAudio() {
    const correct = document.createElement('audio');
    correct.setAttribute('src', '../dist/audio/success.mp3');
    correct.currentTime = 0;
    correct.play();
  },
  addWrongAnswerAudio() {
    const wrong = document.createElement('audio');
    wrong.setAttribute('src', '../dist/audio/failure.mp3');
    wrong.currentTime = 0;
    wrong.play();
  },
  addLoseWindow() {
    const mainWrapper = document.querySelector('.wrapper');
    const loseWrapper = document.createElement('div');
    const loseGameAudio = document.createElement('audio');
    const loseImg = document.createElement('img');
    loseImg.classList.add('lose-img');
    loseImg.setAttribute('src', '../dist/img/lose.jpg');
    const loseText = document.createElement('span');
    while (mainWrapper.firstChild) {
      mainWrapper.removeChild(mainWrapper.firstChild);
    }
    loseGameAudio.setAttribute('src', '../dist/audio/loseGame.mp3');
    loseGameAudio.currentTime = 0;
    loseGameAudio.play();
    loseWrapper.classList.add('lose-wrapper');
    loseText.classList.add('lose-text');
    loseText.textContent = ` You have ${gameRules.mistakesCount} mistakes.Keep trying. Next time will be better =)`;
    loseWrapper.appendChild(loseImg);
    loseWrapper.appendChild(loseText);

    mainWrapper.appendChild(loseWrapper);
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
    winImg.setAttribute('src', '../dist/img/win.png');
    winGameAudio.setAttribute('src', '../dist/audio/winGame.mp3');
    winGameAudio.currentTime = 0;
    winGameAudio.play();
    winWrapper.classList.add('win-wrapper');
    winText.classList.add('win-text');
    winText.textContent = 'You win! \n Congratulations!!!';
    winWrapper.appendChild(winImg);
    winWrapper.appendChild(winText);
    mainWrapper.appendChild(winWrapper);
    winGameAudio.currentTime = 0;
    winGameAudio.play();
  },
  winGameHandler() {
    if (this.j === cards[dataHandler.choosenCategoryIndex].length && this.mistakesCount === 0) {
      setTimeout(gameRules.addWinWindow, 1000);
      setTimeout(window.location.reload.bind(window.location), 4500);
    } else if (this.j === cards[dataHandler.choosenCategoryIndex].length && this.mistakesCount !== 0) {
      setTimeout(gameRules.addLoseWindow, 1000);
      setTimeout(window.location.reload.bind(window.location), 4500);
    }
  },
};

export default gameRules;
