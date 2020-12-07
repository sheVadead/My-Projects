import cards from './dataForCards';
import gameRules from './gameMode';
import statisticObject from './statistic';

const dataHandler = {
  choosenCategoryIndex: 0,
  categoryBlocks: [],
  trainCards: [],
  setBlocksCategory() {
    cards[0].forEach((item, index) => {
      const div = document.createElement('div');
      const divContainer = document.createElement('div');
      const divFooter = document.createElement('div');
      const imgWrap = document.createElement('div');
      const img = document.createElement('img');
      const span = document.createElement('span');
      imgWrap.classList.add('img-wrap');

      span.classList.add('category-name');
      span.textContent = item;
      img.setAttribute('src', `${cards[index + 1][2].image}`);
      img.setAttribute('alt', `${cards[index + 1][2].word}`);
      img.classList.add('category-img');
      divFooter.classList.add('main-card__inner__footer');
      divContainer.classList.add('main-card__inner');
      divFooter.appendChild(span);
      div.classList.add('main-card');
      imgWrap.appendChild(img);
      divContainer.appendChild(imgWrap);
      divContainer.appendChild(divFooter);
      div.setAttribute('data-index', `${index + 1}`);
      div.appendChild(divContainer);
      this.categoryBlocks.push(div);
    });
  },
  setNavMenu() {
    const navigation = document.createElement('nav');
    const navigationInner = document.createElement('div');
    const menuList = document.createElement('ul');
    const mainPage = document.createElement('li');
    const spanLogo = document.createElement('span');
    spanLogo.classList.add('logo-text__navigation');
    spanLogo.textContent = 'English for Kids';
    navigation.classList.add('navigation');
    menuList.classList.add('navigation__inner__list');
    navigationInner.classList.add('navigation__inner');
    mainPage.classList.add('navigation__inner__list-item');
    mainPage.appendChild(spanLogo);
    mainPage.setAttribute('data-index', `${10}`);
    menuList.appendChild(mainPage);
    cards[0].forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('navigation__inner__list-item');
      li.setAttribute('data-index', `${index + 1}`);
      li.textContent = item;
      menuList.appendChild(li);
    });
    const statistic = document.createElement('li');
    statistic.classList.add('navigation__inner__list-item');
    statistic.textContent = 'Statistic';
    statistic.setAttribute('data-index', '9');
    statistic.addEventListener('click', statisticObject.addStatisticTable);
    menuList.appendChild(statistic);
    navigationInner.appendChild(menuList);
    navigation.appendChild(navigationInner);
    return navigation;
  },
  setHeader() {
    const headerWrapp = document.createElement('div');
    const burgerWrap = document.createElement('div');
    const siteLogoWrap = document.createElement('div');
    const buttonSliderWrap = document.createElement('div');
    const spanLogo = document.createElement('span');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const burger = document.createElement('img');
    const logoBurgerWrapper = document.createElement('div');
    logoBurgerWrapper.classList.add('menu-wrapper');
    input.setAttribute('id', 'checkbox');
    input.setAttribute('type', 'checkbox');
    label.setAttribute('for', 'checkbox');
    spanLogo.classList.add('logo-text');

    spanLogo.textContent = 'English for Kids';
    siteLogoWrap.classList.add('site-logo');

    siteLogoWrap.appendChild(spanLogo);
    buttonSliderWrap.classList.add('slider-button');
    buttonSliderWrap.appendChild(input);
    buttonSliderWrap.appendChild(label);
    burgerWrap.classList.add('burger-menu');
    burger.classList.add('burger-img');
    burger.setAttribute('src', './img/burger.png');
    burgerWrap.appendChild(burger);
    headerWrapp.classList.add('header__inner');
    headerWrapp.appendChild(burgerWrap);
    headerWrapp.appendChild(siteLogoWrap);
    headerWrapp.appendChild(buttonSliderWrap);
    headerWrapp.appendChild(this.setNavMenu());
    return headerWrapp;
  },
  categoryCards(blocks) {
    const mainWrapper = document.querySelector('.wrapper');
    while (mainWrapper.firstChild) {
      mainWrapper.removeChild(mainWrapper.firstChild);
    }
    blocks.forEach((item) => {
      const div = document.createElement('div');
      const divContainer = document.createElement('div');
      const divFooter = document.createElement('div');
      const imgWrap = document.createElement('div');
      const img = document.createElement('img');
      const span = document.createElement('span');
      const rotateImg = document.createElement('img');
      const additionalblock = document.createElement('div');
      const divContainerBack = document.createElement('div');
      const divFooterBack = document.createElement('div');
      const imgBack = document.createElement('img');
      const spanBack = document.createElement('span');
      const imgWrapBack = document.createElement('div');
      if (document.querySelector('#checkbox').checked) {
        imgWrap.classList.add('img-wrap');
        img.setAttribute('src', `${item.image}`);
        img.setAttribute('alt', `${item.word}`);
        img.classList.add('word-img__train');
        imgWrap.appendChild(img);
        div.classList.add('train-card');
        div.classList.add('game-mode');
        div.appendChild(imgWrap);
        this.trainCards.push(div);
      } else {
        additionalblock.style.width = `${4}rem`;
        imgWrap.classList.add('img-wrap');
        rotateImg.setAttribute('src', './img/rotate.svg');
        rotateImg.classList.add('rotate-img');
        span.classList.add('word-name');
        span.textContent = item.word;
        img.setAttribute('src', `./${item.image}`);
        img.setAttribute('alt', `${item.word}`);
        img.classList.add('word-img');
        divFooter.classList.add('train-card__front__footer');
        divContainer.classList.add('train-card__front');
        divFooter.appendChild(additionalblock);
        divFooter.appendChild(span);
        divFooter.appendChild(rotateImg);
        div.classList.add('train-card');
        imgWrap.appendChild(img);
        divContainer.appendChild(imgWrap);
        divContainer.appendChild(divFooter);
        divContainerBack.classList.add('train-card__back');
        divFooterBack.classList.add('train-card__back__footer');
        spanBack.classList.add('word-name');
        spanBack.textContent = item.translation;
        imgWrapBack.classList.add('img-wrap');
        imgBack.setAttribute('src', `${item.image}`);
        imgBack.setAttribute('alt', `${item.word}`);
        imgBack.classList.add('word-img');
        imgWrapBack.appendChild(imgBack);
        divFooterBack.appendChild(spanBack);
        divContainerBack.appendChild(imgWrapBack);
        divContainerBack.appendChild(divFooterBack);
        div.appendChild(divContainer);
        div.appendChild(divContainerBack);
        div.setAttribute('data-word', `${item.word}`);
        div.addEventListener('mouseleave', dataHandler.backRotate);
        this.trainCards.push(div);
      }
    });
    this.shuffle(this.trainCards).forEach((item) => {
      mainWrapper.appendChild(item);
    });

    if (document.querySelector('#checkbox').checked) {
      const startButtonWrapper = document.createElement('div');
      startButtonWrapper.classList.add('start-button-wrapper');
      const startGame = document.createElement('button');
      const answer = document.createElement('div');
      answer.classList.add('answer');
      startGame.classList.add('start-button');
      startGame.textContent = 'Start Game';
      if (!startGame.classList.contains('reload-audio')) {
        gameRules.answers = [];
        gameRules.mistakesCount = 0;
        gameRules.j = 0;

        startGame.addEventListener('click', () => {
          gameRules.isGameBegin = true;
        });
      } else {
        gameRules.isGameBegin = false;
      }
      startButtonWrapper.appendChild(startGame);
      mainWrapper.appendChild(startButtonWrapper);
      mainWrapper.appendChild(answer);
    }
    mainWrapper.childNodes.forEach((item) => {
      if (item.classList.contains('start-button-wrapper')) {
        gameRules.gameInit();
      }
    });
    this.trainCards = [];
  },
  menuClassHandler(menu, overlay, linkChild, link) {
    menu.classList.toggle('open-menu');
    overlay.classList.toggle('show-overlay');
    linkChild.forEach((item) => {
      if (item.classList.contains('link-active')) {
        item.classList.remove('link-active');
      }
    });
    link.classList.add('link-active');
    const burger = document.querySelector('.burger-img');
    burger.classList.toggle('rotate-burger');
  },
  backRotate(e) {
    const backTarget = e.target.closest('.train-card');
    if (!e.relatedTarget) return;
    if (e.target.classList.contains('train-card') && backTarget.classList.contains('flipped')) {
      backTarget.childNodes[1].style.visibility = 'hidden';
      backTarget.style.transform = 'rotateY(0deg)';
      backTarget.childNodes[0].classList.remove('rotate-front');
      backTarget.childNodes[1].style.transform = 'rotateY(180deg)';
      backTarget.classList.remove('flipped');
    }
  },
  rotateHandler(e) {
    const target = e.target.closest('.rotate-img');
    if (!target) return;
    const trainCard = e.target.closest('.train-card');
    const clickedBlock = e.target.parentNode.parentNode.parentNode.childNodes;
    if (target) {
      trainCard.classList.add('flipped');
      clickedBlock[0].classList.toggle('rotate-front');
      trainCard.style.transform = 'rotateY(180deg)';
      clickedBlock[1].style.transform = 'rotateY(0deg)';
      clickedBlock[1].style.visibility = '';
      clickedBlock[1].childNodes[0].children[0].classList.add('rotate-front');
      clickedBlock[1].childNodes[1].children[0].classList.add('rotate-front');
    }
  },
  audioHandler(e) {
    const audio = document.createElement('audio');
    const card = e.target.closest('.train-card');
    if (!card) return;
    if (!card.classList.contains('flipped') && !card.classList.contains('game-mode')) {
      const localObject = JSON.parse(localStorage.getItem(`${card.dataset.word}`));
      localObject.trained++;
      audio.setAttribute('src', `./audio/${card.dataset.word}.mp3`);
      audio.currentTime = 0;
      audio.play();
      localStorage.setItem(`${card.dataset.word}`, JSON.stringify(localObject));
    }
  },
  addActiveToMenu(e) {
    const linkChild = document.querySelector('.navigation__inner__list').childNodes;
    const targ = e.target.closest('.main-card');
    if (targ) {
      linkChild.forEach((item) => {
        if (item.classList.contains('link-active')) {
          item.classList.remove('link-active');
        }
        if (item.dataset.index === targ.dataset.index) {
          item.classList.add('link-active');
        }
      });
    }
  },
  toMainPage(e) {
    gameRules.answers = [];
    gameRules.j = 0;
    gameRules.mistakesCount = 0;
    gameRules.randomArrayAudio = new Set();
    const target = e.target.closest('.logo-text');
    const mainPage = e.target.closest("[data-index='10']");
    if (target || mainPage) {
      const mainWrapper = document.querySelector('.wrapper');
      while (mainWrapper.firstChild) {
        mainWrapper.removeChild(mainWrapper.firstChild);
      }
      dataHandler.categoryBlocks.forEach((item) => {
        mainWrapper.appendChild(item);
      });
      const linkChild = document.querySelector('.navigation__inner__list').childNodes;
      linkChild.forEach((item) => {
        if (item.classList.contains('link-active')) {
          item.classList.remove('link-active');
        }
      });
    }
  },
  categoryBlocksGameMode() {
    const wrapper = document.querySelector('.wrapper');
    const target = document.querySelector('#checkbox');
    const elem = wrapper.childNodes[0];
    if (!elem) return;
    if (target.checked && elem.classList.contains('main-card')) {
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
      dataHandler.categoryBlocks.forEach((item) => {
        item.classList.add('game-mode');
        wrapper.appendChild(item);
      });
      document.querySelector('.navigation').classList.add('game-mode');
    } else if (!target.checked && elem.classList.contains('main-card')) {
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
      dataHandler.categoryBlocks.forEach((item) => {
        item.classList.remove('game-mode');
        wrapper.appendChild(item);
      });
      document.querySelector('.navigation').classList.remove('game-mode');
    }
  },
  mainPageHandler() {
    gameRules.isGameBegin = false;
    gameRules.randomArrayAudio = new Set();
    gameRules.answers = [];
    gameRules.j = 0;
    gameRules.mistakesCount = 0;
    statisticObject.hardWordsArray = [];
    const mainWrapper = document.querySelector('.wrapper');
    while (mainWrapper.firstChild) {
      mainWrapper.removeChild(mainWrapper.firstChild);
    }
    if (document.querySelector('#checkbox').checked) {
      dataHandler.categoryBlocks.forEach((item) => {
        item.classList.add('game-mode');
        mainWrapper.appendChild(item);
      });
    } else {
      dataHandler.categoryBlocks.forEach((item) => {
        mainWrapper.appendChild(item);
      });
    }

    const linkChild = document.querySelector('.navigation__inner__list').childNodes;
    linkChild.forEach((item) => {
      if (item.classList.contains('link-active')) {
        item.classList.remove('link-active');
      }
    });
  },
  trainBlocksGameMode() {
    const wrapper = document.querySelector('.wrapper');
    const target = document.querySelector('#checkbox');
    if (target.checked && wrapper.childNodes[0].classList.contains('train-card') && statisticObject.hardWordsArray.length === 0) {
      dataHandler.categoryCards(cards[this.choosenCategoryIndex]);
    } else if (!target.checked && wrapper.childNodes[0].classList.contains('train-card') && statisticObject.hardWordsArray.length === 0) {
      dataHandler.categoryCards(cards[this.choosenCategoryIndex]);
    } else if (target.checked && wrapper.childNodes[0].classList.contains('train-card') && statisticObject.hardWordsArray.length !== 0) {
      dataHandler.categoryCards(statisticObject.hardWordsArray);
    } else if (!target.checked && wrapper.childNodes[0].classList.contains('train-card') && statisticObject.hardWordsArray.length !== 0) {
      dataHandler.categoryCards(statisticObject.hardWordsArray);
    }
  },
  shuffle(a) {
    let j;
    let x;
    let
      i;
    for (i = a.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  },
};

export default dataHandler;
