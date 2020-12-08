import gameRules from './gameMode';
import dataHandler from './dataHandler';
import cards from './dataForCards';

const render = {
  classes: {
    header: document.createElement('header'),
    main: document.createElement('main'),
    wrapper: document.createElement('div'),
    footer: document.createElement('footer'),
    overlay: document.createElement('div'),
  },
  listenersHandler() {
    const menu = document.querySelector('.navigation');
    this.classes.wrapper.addEventListener('click', (e) => {
      gameRules.mainGame(e);
      if (!e.target.closest('[data-index]')) return;
      dataHandler.choosenCategoryIndex = e.target.closest('[data-index]').dataset.index;
      dataHandler.categoryCards(cards[dataHandler.choosenCategoryIndex]);
      dataHandler.addActiveToMenu(e);
    });
    this.classes.overlay.addEventListener('click', () => {
      const burger = document.querySelector('.burger-img');
      menu.classList.toggle('open-menu');
      burger.classList.toggle('rotate-burger');
      this.classes.overlay.classList.toggle('show-overlay');
    });
    this.classes.wrapper.addEventListener('click', dataHandler.rotateHandler);
    this.classes.wrapper.addEventListener('click', dataHandler.audioHandler);
    this.classes.header.addEventListener('click', dataHandler.toMainPage);
    this.classes.header.addEventListener('click', (e) => {
      const burger = e.target.closest('.burger-img');
      if (burger) {
        const overlay = document.querySelector('.overlay');
        overlay.classList.toggle('show-overlay');
        burger.classList.toggle('rotate-burger');
        document.querySelector('.navigation').classList.toggle('open-menu');
      }
    });
    menu.addEventListener('click', (e) => {
      const link = e.target.closest('li');
      if (!link) return;
      const overlay = document.querySelector('.overlay');
      const linkChild = document.querySelector('.navigation__inner__list').childNodes;
      if (link.dataset.index > 0 && link.dataset.index < 9) {
        dataHandler.choosenCategoryIndex = link.dataset.index;
        dataHandler.categoryCards(cards[dataHandler.choosenCategoryIndex]);
        dataHandler.menuClassHandler(menu, overlay, linkChild, link);
      }
      if (link.dataset.index == 10) {
        dataHandler.menuClassHandler(menu, overlay, linkChild, link);
      } else if (link.dataset.index == 9) {
        dataHandler.menuClassHandler(menu, overlay, linkChild, link);
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
    this.classes.overlay.classList.add('overlay');
    this.classes.wrapper.classList.add('wrapper');
    this.classes.header.classList.add('header');
    this.classes.main.classList.add('main');
    this.classes.footer.classList.add('footer');
    dataHandler.categoryBlocks.forEach((item) => {
      this.classes.wrapper.appendChild(item);
    });
    this.classes.main.appendChild(this.classes.overlay);
    this.classes.main.appendChild(this.classes.wrapper);
    this.classes.header.appendChild(dataHandler.setHeader());
    this.classes.footer.appendChild(dataHandler.setFooter());
    document.body.appendChild(this.classes.header);
    document.body.appendChild(this.classes.main);
    document.body.appendChild(this.classes.footer);
  },

  init() {
    dataHandler.setBlocksCategory();
    this.render();
    this.listenersHandler();
  },
};

export default render;
