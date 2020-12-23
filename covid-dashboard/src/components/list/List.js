import ListServices from '../../services/ListService';
import GlobalStatistics from './globalStatitic';

export default class List {
  constructor(onDateRangeClicked, onNumberFormatsClicked) {
    this.globalMethods = new GlobalStatistics();
    this.listServices = new ListServices();
    this.sortedCountry = [];
    this.flags = {
      listDataOrder: 0,
      isDayData: false,
      isPopulationData: false,
    };
    this.populationCoef = 100000;
    this.headerTitles = ['Total Cases', 'Total Deaths', 'Total Recovered'];
    this.onDateRangeClicked = onDateRangeClicked;
    this.onNumberFormatsClicked = onNumberFormatsClicked;
  }

  async createList(listItems) {
    const allCasesBlock = await new GlobalStatistics(this.listServices.allCases)
      .createGlobalStatisticBlock();
    const switchButton = allCasesBlock.childNodes[0].childNodes[0].childNodes[2];
    switchButton.addEventListener('click', () => {
      // this.flags.isPopulationData = !this.flags.isPopulationData;
      // this.setPopulCoefStatistics();
      this.onNumberFormatsClicked(!this.flags.isPopulationData);
    });
    const container = document.createElement('section');
    container.appendChild(allCasesBlock);
    container.classList.add('list-container');
    const listHeader = await this.createListHeader();

    container.appendChild(listHeader);

    const listWrapper = document.createElement('div');
    listWrapper.classList.add('list-wrapper');
    container.appendChild(listWrapper);

    const list = document.createElement('ul');

    list.classList.add('main-list');
    listWrapper.appendChild(list);
    listItems.forEach((item) => list.appendChild(item));
    listWrapper.appendChild(list);
    return container;
  }

  async createListHeader() {
    const listHeaderWrapper = document.createElement('div');
    const listHeader = document.createElement('div');
    const listHeaderText = document.createElement('span');
    const nextItem = document.createElement('img');
    const prevItem = document.createElement('img');
    nextItem.classList.add('next-arrow');
    nextItem.setAttribute('src', './assets/List/img/nextArr.svg');
    nextItem.setAttribute('width', '16');
    nextItem.setAttribute('height', '16');
    prevItem.classList.add('prev-arrow');
    prevItem.setAttribute('src', './assets/List/img/prevArr.svg');
    prevItem.setAttribute('width', '16');
    prevItem.setAttribute('height', '16');
    listHeaderText.classList.add('header-text');
    listHeaderText.addEventListener('click', async () => {
      //await this.setDayData();
      this.onDateRangeClicked(!this.flags.isDayData);
    });
    listHeaderText.textContent = 'Total Cases';
    if (this.flags.listDataOrder === 1) {
      listHeaderText.textContent = 'Total Deaths';
    } else if (this.flags.listDataOrder === 2) {
      listHeaderText.textContent = 'Total Recovered';
    }
    listHeaderWrapper.classList.add('list-header-wrapper');
    listHeader.classList.add('list-header');
    listHeaderWrapper.appendChild(prevItem);
    listHeaderWrapper.appendChild(listHeaderText);
    listHeaderWrapper.appendChild(nextItem);
    listHeader.appendChild(listHeaderWrapper);
    nextItem.addEventListener('click', () => {
      this.addNextListData();
    });
    prevItem.addEventListener('click', () => {
      this.prevListData();
    });

    return listHeader;
  }

  createListItems(array) {
    const order = this.flags.listDataOrder;
    const listItemArray = [];
    array.forEach((item) => {
      const li = document.createElement('li');
      const spanCases = document.createElement('span');
      const spanCountry = document.createElement('span');
      const caseCountryWrapper = document.createElement('p');
      caseCountryWrapper.classList.add('case-country-wrapper');
      spanCountry.classList.add('country');
      spanCases.classList.add('cases');
      spanCountry.textContent = item.country;
      spanCountry.classList.add(item.countryCode);
      if (item.country.length >= 24) {
        spanCountry.textContent = item.countryCode;
      }
      spanCases.textContent = item.confirmed;
      if (order === 1) {
        spanCases.textContent = item.deaths;
      }
      if (order === 2) {
        spanCases.textContent = item.recovered;
      }
      li.classList.add('list-item');
      caseCountryWrapper.appendChild(spanCases);
      caseCountryWrapper.appendChild(spanCountry);
      li.appendChild(caseCountryWrapper);
      li.appendChild(this.getCountryFlag(item));
      listItemArray.push(li);
    });
    this.sortedCountry = listItemArray;
    return listItemArray;
  }

  sortListArray = (array, state = true) => {
    let sortedArray = array.sort((a, b) => {
      const firstItem = a.childNodes[0].childNodes[0].textContent;
      const secondItem = b.childNodes[0].childNodes[0].textContent;
      return +firstItem < +secondItem ? 1 : -1;
    });
    if (state) {
      return sortedArray;
    }
    sortedArray = array.reverse();
    return sortedArray;
  }

  getCountryFlag = (country) => {
    const flag = document.createElement('img');
    flag.classList.add(`${country.countryCode}-flag`);
    flag.setAttribute('alt', `${country.country} flag`);
    flag.setAttribute('src', `https://www.countryflags.io/${country.countryCode}/flat/32.png`);
    return flag;
  }

  async addNextListData() {
    this.flags.listDataOrder += 1;
    if (this.flags.listDataOrder > 2 || this.flags.listDataOrder < 0) {
      this.flags.listDataOrder = 0;
    }
    const header = document.querySelector('.list-header').childNodes[0].childNodes[1];
    const listWrapper = document.querySelector('.main-list');
    const { globalData } = this.listServices;
    listWrapper.innerHTML = '';
    if (this.flags.listDataOrder === 0) {
      header.textContent = this.headerTitles[0];
      this.removeChildren(listWrapper);
      let currentArray = await this.sortListArray(this.createListItems(globalData));
      if (this.flags.isDayData) {
        currentArray = await this.sortListArray(this.createListItems(this.listServices.dayData));
      }
      currentArray.forEach((item) => {
        listWrapper.appendChild(item);
      });
      this.setPopulCoefStatistics();
    }
    if (this.flags.listDataOrder === 1) {
      header.textContent = this.headerTitles[1];
      this.removeChildren(listWrapper);
      let currentArray = await this.sortListArray(this.createListItems(globalData));
      if (this.flags.isDayData) {
        currentArray = await this.sortListArray(this.createListItems(this.listServices.dayData));
      }
      currentArray.forEach((item) => {
        listWrapper.appendChild(item);
      });
      this.setPopulCoefStatistics();
    } else if (this.flags.listDataOrder === 2) {
      header.textContent = this.headerTitles[2];
      this.removeChildren(listWrapper);
      let currentArray = await this.sortListArray(this.createListItems(globalData));
      if (this.flags.isDayData) {
        currentArray = await this.sortListArray(this.createListItems(this.listServices.dayData));
      }
      currentArray.forEach((item) => {
        listWrapper.appendChild(item);
      });
      this.setPopulCoefStatistics();
    }
  }

  async prevListData() {
    this.flags.listDataOrder -= 1;
    if (this.flags.listDataOrder < 0) {
      this.flags.listDataOrder = 2;
    }
    const { globalData } = this.listServices;
    const header = document.querySelector('.list-header').childNodes[0].childNodes[1];
    const listWrapper = document.querySelector('.main-list');
    if (this.flags.listDataOrder === 0) {
      header.textContent = this.headerTitles[0];
      let currentArray = await this.sortListArray(this.createListItems(globalData));
      if (this.flags.isDayData) {
        currentArray = await this.sortListArray(this.createListItems(this.listServices.dayData));
      }
      listWrapper.innerHTML = '';
      currentArray.forEach((item) => {
        listWrapper.appendChild(item);
      });
      this.setPopulCoefStatistics();
    } else if (this.flags.listDataOrder === 1) {
      header.textContent = this.headerTitles[1];
      let currentArray = await this.sortListArray(this.createListItems(globalData));
      if (this.flags.isDayData) {
        currentArray = await this.sortListArray(this.createListItems(this.listServices.dayData));
      }
      listWrapper.innerHTML = '';
      currentArray.forEach((item) => {
        listWrapper.appendChild(item);
      });
      this.setPopulCoefStatistics();
    } else if (this.flags.listDataOrder === 2) {
      header.textContent = this.headerTitles[2];
      let currentArray = await this.sortListArray(this.createListItems(globalData));
      listWrapper.innerHTML = '';
      if (this.flags.isDayData) {
        currentArray = await this.sortListArray(this.createListItems(this.listServices.dayData));
      }
      currentArray.forEach((item) => {
        listWrapper.appendChild(item);
      });
      this.setPopulCoefStatistics();
    }
  }

  removeChildren = (myNode) => {
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  async setDayData() {
    const { dayData } = this.listServices;
    const { globalData } = this.listServices;
    const wrapper = document.querySelector('.main-list');
    const headerText = document.querySelector('.list-header').childNodes[0].childNodes[1];
    if (this.flags.isDayData) {
      this.headerTitles = ['Day Cases', 'Day Deaths', 'Day Recovered'];
      headerText.textContent = this.headerTitles[this.flags.listDataOrder];
      // const currentArray = await this.sortListArray(this.createListItems(dayData));
      // wrapper.innerHTML = '';
      // currentArray.forEach((item) => {
      //   wrapper.appendChild(item);
      // });
    } else {
      this.headerTitles = ['Total Cases', 'Total Deaths', 'Total Recovered'];
      headerText.textContent = this.headerTitles[this.flags.listDataOrder];
      // const currentArray = await this.sortListArray(this.createListItems(globalData));
      // wrapper.innerHTML = '';
      // currentArray.forEach((item) => {
      //   wrapper.appendChild(item);
      // });
    }
  }

  async setPopulCoefStatistics() {
    const populationData = this.listServices.populationCoefData;
    const headerText = document.querySelector('.list-header').childNodes[0].childNodes[1];
    if (this.flags.listDataOrder === 0 && this.flags.isPopulationData) {
      headerText.textContent = 'Cases on 100000';
      const wrapper = document.querySelector('.main-list');
      // const populationArray = await this.sortListArray(this.createListItems(populationData));
      // wrapper.innerHTML = '';
      // populationArray.forEach((item) => {
      //   wrapper.appendChild(item);
      // });
    } else if (this.flags.listDataOrder === 1 && this.flags.isPopulationData) {
      headerText.textContent = 'Deaths on 100000';
      // const wrapper = document.querySelector('.main-list');
      // const populationArray = await this.sortListArray(this.createListItems(populationData));
      // wrapper.innerHTML = '';
      // populationArray.forEach((item) => {
      //   wrapper.appendChild(item);
      // });
    } else if (this.flags.listDataOrder === 2 && this.flags.isPopulationData) {
      headerText.textContent = 'Recover on 100000';
      // const wrapper = document.querySelector('.main-list');
      // const populationArray = await this.sortListArray(this.createListItems(populationData));
      // wrapper.innerHTML = '';
      // populationArray.forEach((item) => {
      //   wrapper.appendChild(item);
      // });
    }
    if (!this.flags.isPopulationData && !this.flags.isDayData) {
      const { globalData } = this.listServices;
      headerText.textContent = this.headerTitles[this.flags.listDataOrder];
      // const wrapper = document.querySelector('.main-list');
      // const populationArray = await this.sortListArray(this.createListItems(globalData));
      // wrapper.innerHTML = '';
      // populationArray.forEach((item) => {
      //   wrapper.appendChild(item);
      // });
    }
  }

  clickedCountry = async (event) => {
    const a = event.target.closest('.country');
    if (!a) {
      return;
    }
    const b = await a;
    return b.classList[1];
  }

  async initList(isAbsoluteValues, isLatestDay, country = null) {
    const container = document.querySelector('.list-main-container');
    container.innerHTML = '';
    // await this.listServices.getTotalCases();
    // await this.listServices.getOneDayCases();
    // await this.listServices.getPopulationData();
    this.flags.isDayData = isLatestDay;
    this.flags.isPopulationData = !isAbsoluteValues;
    const data = await this.get(isAbsoluteValues, isLatestDay, country);
    // const globalCountry = this.listServices.globalData;
    const listItems = this.sortListArray(this.createListItems(data));
    const list = await this.createList(listItems);
    this.sortedCountry = listItems;
    container.appendChild(list);
    await this.setDayData();
    await this.setPopulCoefStatistics();

    return list;
  }

  async get(isAbsoluteValues, isLatestDay, country = null) {
    let data;

    const oneDayCases = await this.listServices.getOneDayCases();
    const totalCases = await this.listServices.getTotalCases();
    const populationData = await this.listServices.getPopulationData();

    if (isAbsoluteValues) {
      if (isLatestDay) {
        data = oneDayCases;
      } else {
        data = totalCases;
      }
    } else if (isLatestDay) {
      data = populationData;
    } else {
      data = populationData;
    }
    if (country) {
      data = data.filter((item) => item.country === country);
    }
    return data;
  }
}
