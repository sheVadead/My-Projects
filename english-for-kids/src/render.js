import gameRules from './gameMode';
import dataHandler from './dataHandler';

const render = {
  classes: {
    header: document.createElement('header'),
    main: document.createElement('main'),
    wrapper: document.createElement('div'),
  },
  listenersHandler() {
    const menu = document.querySelector('.navigation');
    this.classes.wrapper.addEventListener('click', (e) => {
      gameRules.mainGame(e);

      if (!e.target.closest('[data-index]')) return;
      dataHandler.choosenCategoryIndex = e.target.closest('[data-index]').dataset.index;

      dataHandler.categoryCards(e);
      dataHandler.addActiveToMenu(e);
    });
    this.classes.wrapper.addEventListener('click', dataHandler.rotateHandler);
    this.classes.wrapper.addEventListener('click', dataHandler.audioHandler);
    this.classes.header.addEventListener('click', dataHandler.toMainPage);
    this.classes.header.addEventListener('click', (e) => {
      const burger = e.target.closest('.burger-img');
      if (burger) {
        burger.classList.toggle('rotate-burger');
        document.querySelector('.navigation').classList.toggle('open-menu');
      }
    });
    menu.addEventListener('click', (e) => {
      const link = e.target.closest('li');
      if(!link) return;
      const linkChild = document.querySelector('.navigation__inner__list').childNodes;
      if (0<link.dataset.index && link.dataset.index < 9) {
        dataHandler.choosenCategoryIndex = link.dataset.index;
        dataHandler.categoryCards(e);
        menu.classList.toggle('open-menu');
        linkChild.forEach((item) => {
          if (item.classList.contains('link-active')) {
            item.classList.remove('link-active');
          }
        });
        link.classList.add('link-active');
        const burger = document.querySelector('.burger-img');
        burger.classList.toggle('rotate-burger');
      } else {
        menu.classList.toggle('open-menu');
        console.log(linkChild)
        linkChild.forEach((item) => {
          if (item.classList.contains('link-active')) {
            item.classList.remove('link-active');
          }
          link.classList.add('link-active');
          const burger = document.querySelector('.burger-img');
        burger.classList.toggle('rotate-burger');
        });
      }
    });
    this.classes.header.addEventListener('click', dataHandler.categoryBlocksGameMode);
    this.classes.header.addEventListener('click', (e) => {
      const target = e.target.closest('#checkbox');
      if (target) {
        dataHandler.trainBlocksGameMode();
        gameRules.gameInit();
      }
    });
  },
  render() {
    this.classes.wrapper.classList.add('wrapper');
    this.classes.header.classList.add('header');
    this.classes.main.classList.add('main');

    dataHandler.categoryBlocks.forEach((item) => {
      this.classes.wrapper.appendChild(item);
    });
    this.classes.main.appendChild(this.classes.wrapper);
    this.classes.header.appendChild(dataHandler.setHeader());
    document.body.appendChild(this.classes.header);
    document.body.appendChild(this.classes.main);
  },

  init() {
    dataHandler.setBlocksCategory();
    this.render();
    this.listenersHandler();
  },
};

export default render;
