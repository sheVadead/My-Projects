import cards from './dataForCards';

const statisticObject = {
  localStorageArray: [],
  filterVariable: 'category',
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
          percentOfMistakes = Math.floor((JSON.parse(localStorage.getItem(`${item1.word}`)).correct/(JSON.parse(localStorage.getItem(`${item1.word}`)).correct + JSON.parse(localStorage.getItem(`${item1.word}`)).mistakes)) * 100)
        }
        if(!!!percentOfMistakes) {
          percentOfMistakes = 0;
        }

        const { word } = item1;
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
    arrayFromLocal.forEach((item) => this.localStorageArray.push(item));
  },
removeChilds() {
  const mainWrapper = document.querySelector('.wrapper');
  while (mainWrapper.firstChild) {
    mainWrapper.removeChild(mainWrapper.firstChild);
  }
},
  addStatisticTable() {
    statisticObject.removeChilds()
    const wrapper = document.querySelector('.wrapper');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    const tBody = document.createElement('tbody');
    statisticObject.setLocalStorageItems();
    statisticObject.setLocalArray(statisticObject.filterVariable);
    let categoryForStatistic = Object.keys(JSON.parse(statisticObject.localStorageArray[1][1]));
    for(let i = 0; i < 7; i++) {
      const th = document.createElement('th');
      th.textContent = categoryForStatistic[i].toUpperCase()
      trHead.appendChild(th);
    }
    statisticObject.localStorageArray.forEach(item => {
      const wordRow = document.createElement('tr');
      let valuesArray = Object.values(JSON.parse(item[1]));
      valuesArray.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        wordRow.appendChild(td)
      })
      tBody.appendChild(wordRow)
    })
    table.classList.add('table');
    trHead.addEventListener('click', (e)=>{
      statisticObject.filterVariable = e.target.closest('th').textContent.toLowerCase();
      console.log(statisticObject.filterVariable)
      statisticObject.setLocalArray(statisticObject.filterVariable);
      statisticObject.addStatisticTable()
    })
    thead.appendChild(trHead)
    table.appendChild(thead);
    table.appendChild(tBody)
    wrapper.appendChild(table)
    statisticObject.localStorageArray = [];
  },
  init() {
    this.setLocalStorageItems();
  },

};
statisticObject.init()

export default statisticObject;