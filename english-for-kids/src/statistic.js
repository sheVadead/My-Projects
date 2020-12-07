import cards from './dataForCards';
import dataHandler from './dataHandler';

const statisticObject = {
  localStorageArray: [],
  filterVariable: 'category',
  filterCount: 1,
  hardWordsArray: [],
  setLocalStorageItems() {
    cards[0].forEach((item, index) => {
      const category = item;
      cards[index + 1].forEach((item1) => {
        let correct;
        let mistakes;
        let trained;
        let percentOfMistakes;
        if (!JSON.parse(localStorage.getItem(`${item1.word}`))) {
          correct = 0;
          mistakes = 0;
          trained = 0;
          percentOfMistakes = 0;
        } else {
          correct = JSON.parse(localStorage.getItem(`${item1.word}`)).correct;
          mistakes = JSON.parse(localStorage.getItem(`${item1.word}`)).mistakes;
          trained = JSON.parse(localStorage.getItem(`${item1.word}`)).trained;
          percentOfMistakes = Math.floor((JSON.parse(localStorage.getItem(`${item1.word}`)).correct / (JSON.parse(localStorage.getItem(`${item1.word}`)).correct + JSON.parse(localStorage.getItem(`${item1.word}`)).mistakes)) * 100);
        }
        if (!percentOfMistakes) {
          percentOfMistakes = 0;
        }

        const {
          word,
        } = item1;
        const translate = item1.translation;
        const localWord = {
          category,
          word,
          translate,
          trained,
          correct,
          mistakes,
          '%': percentOfMistakes,
        };

        localStorage.setItem(`${item1.word}`, JSON.stringify(localWord));
      });
    });
  },

  setLocalArray(filterVariable) {
    const arrayFromLocal = Object.entries(localStorage).sort((a, b) => {
      const firstItem = JSON.parse(a[1])[`${filterVariable}`];
      const second = JSON.parse(b[1])[`${filterVariable}`];
      if (firstItem < second) {
        return -1;
      }
    });
    this.localStorageArray = [];
    if (statisticObject.filterCount % 2 !== 0) {
      arrayFromLocal.reverse();
    }
    arrayFromLocal.forEach((item) => this.localStorageArray.push(item));
  },
  removeChilds() {
    const mainWrapper = document.querySelector('.wrapper');
    while (mainWrapper.firstChild) {
      mainWrapper.removeChild(mainWrapper.firstChild);
    }
  },
  addStatisticTable() {
    statisticObject.removeChilds();
    const wrapper = document.querySelector('.wrapper');
    const wrapperInner = document.createElement('div');
    const buttonWrapper = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    const tBody = document.createElement('tbody');
    const emptyTrainWords = document.createElement('span');
    emptyTrainWords.classList.add('empty-hard-words');
    emptyTrainWords.classList.add('hide');
    emptyTrainWords.textContent = "You didn't make a single mistake. Good job!.";
    const trainHardWords = document.createElement('button');
    const resetStatistic = document.createElement('button');
    resetStatistic.classList.add('reset-statistic-button');
    wrapperInner.classList.add('wrapper__inner');
    buttonWrapper.classList.add('wrapper__inner__buttons');
    trainHardWords.classList.add('hard-words-button');
    trainHardWords.textContent = 'Repeat difficult words';
    resetStatistic.textContent = 'Reset';
    trainHardWords.addEventListener('click', statisticObject.setHardWords);
    resetStatistic.addEventListener('click', statisticObject.resetStatisticHandler);
    buttonWrapper.appendChild(trainHardWords);
    buttonWrapper.appendChild(resetStatistic);
    buttonWrapper.appendChild(emptyTrainWords);
    statisticObject.setLocalStorageItems();
    if (statisticObject.localStorageArray.length === 0) {
      statisticObject.setLocalArray(statisticObject.filterVariable);
    }
    const categoryForStatistic = Object.keys(JSON.parse(statisticObject.localStorageArray[1][1]));
    for (let i = 0; i < 7; i++) {
      const th = document.createElement('th');
      th.textContent = categoryForStatistic[i].toUpperCase();
      trHead.appendChild(th);
    }
    statisticObject.localStorageArray.forEach((item) => {
      const wordRow = document.createElement('tr');
      const valuesArray = Object.values(JSON.parse(item[1]));
      valuesArray.forEach((value) => {
        const td = document.createElement('td');
        td.textContent = value;
        wordRow.appendChild(td);
      });
      tBody.appendChild(wordRow);
    });
    table.classList.add('table');
    thead.appendChild(trHead);
    table.appendChild(thead);
    table.appendChild(tBody);
    wrapperInner.appendChild(buttonWrapper);
    wrapperInner.appendChild(table);
    wrapper.appendChild(wrapperInner);
    statisticObject.localStorageArray = [];
    statisticObject.sortStatisticTable();
  },
  sortStatisticTable() {
    const tHead = document.querySelector('thead');
    tHead.addEventListener('click', (e) => {
      const target = e.target.closest('th');
      if (target) {
        statisticObject.setLocalArray(target.textContent.toLowerCase());
        statisticObject.addStatisticTable();
        statisticObject.filterCount++;
      }
      const sortCategory = e.target.closest('th');
      sortCategory.classList.add('qqqq');
    });
  },
  setHardWords() {
    statisticObject.hardWordsArray = [];
    const arrayFromLocal = [];
    const hardWordsFromLocal = [];
    Object.entries(localStorage).forEach((item) => {
      arrayFromLocal.push(JSON.parse(item[1]));
    });
    arrayFromLocal.filter((item) => item.mistakes > 0).sort((a, b) => {
      const firstItem = a.mistakes;
      const second = b.mistakes;
      if (second < firstItem) {
        return -1;
      }
    }).forEach((item) => hardWordsFromLocal.push(item.word));
    const cardsFlat = cards.flat().filter((item) => typeof item === 'object');
    hardWordsFromLocal.forEach((item) => {
      const word = cardsFlat.find((item1) => item1.word === item);
      if (statisticObject.hardWordsArray.length < 8) {
        statisticObject.hardWordsArray.push(word);
      } else {

      }
    });
    if (statisticObject.hardWordsArray.length === 0) {
      const emptyHardWords = document.querySelector('.empty-hard-words');
      emptyHardWords.classList.toggle('hide');
      setTimeout(() => {
        emptyHardWords.classList.toggle('hide');
      }, 2000);
    } else {
      dataHandler.categoryCards(statisticObject.hardWordsArray);
    }
  },
  resetStatisticHandler() {
    localStorage.clear();
    statisticObject.setLocalStorageItems();
    statisticObject.addStatisticTable();
  },
  init() {
    this.setLocalStorageItems();
  },

};
statisticObject.init();

export default statisticObject;
