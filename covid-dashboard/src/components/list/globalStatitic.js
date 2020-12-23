export default class GlobalStatistics {
  constructor(cases) {
    this.cases = cases;
    this.isPopulationData = false;
  }

  async createGlobalStatisticBlock() {
    const allCases = document.createElement('div');
    const allCasesWrapper = document.createElement('div');
    const allCasesText = document.createElement('p');
    const allCasesNumber = document.createElement('span');
    const searchWrapper = document.createElement('div');
    const searchBox = document.createElement('input');
    const searchImg = document.createElement('img');
    const caseSearchWrap = document.createElement('div');
    const populButton = document.createElement('button');
    const allCasesInner = document.createElement('div');
    const emptyDiv = document.createElement('div');
    emptyDiv.style.width = `${1}rem`;
    allCasesInner.classList.add('all-cases-wrapper-inner');
    populButton.classList.add('population-switch');
    caseSearchWrap.classList.add('case-search-wrapper');
    searchImg.classList.add('search-img');
    searchImg.setAttribute('src', './assets/List/img/search.svg');
    searchImg.setAttribute('alt', 'search box img');
    searchImg.setAttribute('width', '15');
    searchImg.setAttribute('height', '15');
    searchBox.classList.add('search-input');
    searchBox.classList.add('hide');
    searchBox.addEventListener('input', () => {
      this.searchHandler();
    });
    searchWrapper.classList.add('search-wrapper');
    searchWrapper.appendChild(searchBox);
    searchWrapper.appendChild(searchImg);
    allCasesNumber.classList.add('all-cases-number');
    allCasesNumber.textContent = await this.cases.TotalConfirmed;
    allCasesText.classList.add('all-cases-text');
    allCasesText.textContent = 'Global Сases';
    allCases.classList.add('all-cases');
    allCasesWrapper.classList.add('all-cases-wrapper');
    allCasesInner.appendChild(emptyDiv);
    allCasesInner.appendChild(allCasesText);
    allCasesInner.appendChild(populButton);
    allCasesWrapper.appendChild(allCasesInner);
    caseSearchWrap.appendChild(allCasesNumber);
    caseSearchWrap.appendChild(searchWrapper);
    allCasesWrapper.appendChild(caseSearchWrap);
    allCases.appendChild(allCasesWrapper);
    allCases.addEventListener('click', (e) => {
      if (e.target.closest('.search-img')) {
        this.openSearchBox();
      } else if (e.target.closest('.search-img') === null && e.target.closest('.search-input') === null) {
        this.closeSearchBox();
      }
    });
    return allCases;
  }

  searchHandler = () => {
    const searchInput = document.querySelector('.search-input');
    const val = searchInput.value;
    const items = document.querySelectorAll('.list-item');
    if (val !== '') {
      items.forEach((elem) => {
        const elemChild = elem.childNodes[0].childNodes[1];
        if (elemChild.textContent.search(val) === -1) {
          elem.classList.add('hide');
        } else {
          elem.classList.remove('hide');
        }
      });
    } else {
      items.forEach((elem) => {
        elem.classList.remove('hide');
      });
    }
  }

  closeSearchBox = () => {
    const searchInput = document.querySelector('.search-input');
    const globalCase = document.querySelector('.all-cases-number');
    searchInput.classList.add('hide');
    globalCase.classList.remove('hide');
  }

  openSearchBox = () => {
    const searchInput = document.querySelector('.search-input');
    const globalCase = document.querySelector('.all-cases-number');
    searchInput.classList.toggle('hide');
    globalCase.classList.toggle('hide');
  }
}
