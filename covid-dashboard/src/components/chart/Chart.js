import ChartService from '../../services/ChartServices';
import ChartModel from '../../models/chartModel';

export default class Chart {
  constructor(listType, clickedCountry) {
    this.chartService = new ChartService();
    this.chartTypes = ['cases', 'deaths', 'recovered'];
    this.type = listType;
    this.chart = undefined;
    this.data = undefined;
    this.listClickedCountry = clickedCountry;
    this.chosenCountry = undefined;
    this.isCountryChosen = false;
    this.diseaseAPI = 'https://disease.sh/v3/covid-19/historical/';
    this.covid19API = 'https://api.covid19api.com/country/';
  }

  async updateChart() {
    if (!this.chosenCountry) {
      return;
    }
    this.data = await this.chartService.getSingleCountryData(`${this.covid19API}${this.chosenCountry}?from=2020-01-01T00:00:00Z&to=${this.getToday()}`);
    await this.switchHandler();
  }

  async switchHandler() {
    const button = document.querySelector('#chart-selectBy');
    const listHeaderText = document.querySelector('.chart-header-text');
    if (button.checked && !this.isCountryChosen) {
      this.chartTypes = ['New cases', 'New deaths', 'New recovered'];
      listHeaderText.textContent = this.chartTypes[this.type];
      this.data = this.chartService.newCases;
      this.addCanvas();
      this.chart = new ChartModel(this.data[this.type]);
      this.chart.createChart();
    } else if (button.checked && this.isCountryChosen) {
      await this.singleDayData();
      this.data = this.chartService.singleCountryDayData;
      this.addCanvas();
      this.chart = new ChartModel(this.data[this.type]);
      this.chart.createChart();
    } else if (!button.checked && this.isCountryChosen) {
      this.chartTypes = ['cases', 'deaths', 'recovered'];
      await this.singleDayData();
      this.data = await this.chartService.getSingleCountryData(`${this.covid19API}${this.chosenCountry}?from=2020-01-01T00:00:00Z&to=${this.getToday()}`);
      listHeaderText.textContent = this.chartTypes[this.type];
      this.addCanvas();
      this.chart = new ChartModel(this.data[this.type]);
      this.chart.createChart();
    } else if (!button.checked && !this.isCountryChosen) {
      this.chartTypes = ['cases', 'deaths', 'recovered'];
      this.data = this.chartService.globalData;
      listHeaderText.textContent = this.chartTypes[this.type];
      this.addCanvas();
      this.chart = new ChartModel(this.data[`${this.chartTypes[this.type]}`]);
      this.chart.createChart();
    }
  }

  getToday = () => {
    const today = new Date();
    return today.toISOString();
  }

  createChartHeader() {
    const chartHeader = document.createElement('div');
    const headerWrapper = document.createElement('div');
    const controlWrapper = document.createElement('div');
    const listHeaderText = document.createElement('span');
    const nextItem = document.createElement('img');
    const prevItem = document.createElement('img');
    const switchWrapper = document.createElement('div');
    const button = document.createElement('input');
    const labelforButton = document.createElement('label');
    button.setAttribute('type', 'checkbox');
    button.setAttribute('id', 'chart-selectBy');
    labelforButton.setAttribute('for', 'chart-selectBy');
    button.addEventListener('click', () => {
      this.switchHandler();
    });
    switchWrapper.classList.add('switch-wrapper');
    switchWrapper.appendChild(button);
    switchWrapper.appendChild(labelforButton);
    nextItem.classList.add('next-arrow-chart');
    nextItem.setAttribute('src', './assets/List/img/nextArr.svg');
    nextItem.setAttribute('width', '16');
    nextItem.setAttribute('height', '16');
    prevItem.classList.add('prev-arrow-chart');
    prevItem.setAttribute('src', './assets/List/img/prevArr.svg');
    prevItem.setAttribute('width', '16');
    prevItem.setAttribute('height', '16');
    prevItem.addEventListener('click', () => {
      this.prevChart();
      listHeaderText.textContent = this.chartTypes[this.type];
    });
    listHeaderText.classList.add('chart-header-text');
    listHeaderText.textContent = this.chartTypes[this.type];
    controlWrapper.classList.add('chart-header-controls');
    nextItem.addEventListener('click', () => {
      this.nextChart();
      listHeaderText.textContent = this.chartTypes[this.type];
    });
    controlWrapper.appendChild(prevItem);
    controlWrapper.appendChild(listHeaderText);
    controlWrapper.appendChild(nextItem);
    chartHeader.appendChild(controlWrapper);
    chartHeader.appendChild(switchWrapper);
    headerWrapper.classList.add('chart-header-wrapper');
    chartHeader.classList.add('chart-header');
    headerWrapper.appendChild(chartHeader);
    return headerWrapper;
  }

  async singleDayData() {
    const data = await this.chartService.getSingleCountryDayData(`${this.diseaseAPI}${this.chosenCountry}?lastdays=all`);
    return data;
  }

  async prevChart() {
    const switchButton = document.querySelector('#chart-selectBy');
    const listHeaderText = document.querySelector('.chart-header-text');
    this.type -= 1;
    if (this.type < 0) {
      this.type = 2;
    }
    listHeaderText.textContent = this.chartTypes[this.type];
    this.addCanvas();
    if (switchButton.checked || this.chosenCountry !== undefined) {
      this.chart = new ChartModel(this.data[this.type]);
    } else {
      this.chart = new ChartModel(this.data[`${this.chartTypes[this.type]}`]);
    }
    this.chart.createChart();
  }

  async nextChart() {
    const listHeaderText = document.querySelector('.chart-header-text');
    const switchButton = document.querySelector('#chart-selectBy');
    this.type += 1;
    if (this.type > 2) {
      this.type = 0;
    }
    listHeaderText.textContent = this.chartTypes[this.type];
    this.addCanvas();
    if (switchButton.checked || this.chosenCountry !== undefined) {
      this.chart = new ChartModel(this.data[this.type]);
    } else {
      this.chart = new ChartModel(this.data[`${this.chartTypes[this.type]}`]);
    }
    this.chart.createChart();
  }

  addCanvas = () => {
    document.querySelector('.chart-container-wrapper').innerHTML = '';
    document.querySelector('.chart-container-wrapper').appendChild(this.createCanvas());
  }

  createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'chart');
    return canvas;
  }

  createChart() {
    const chartContainer = document.createElement('section');
    const chartWrapper = document.createElement('div');
    chartWrapper.classList.add('chart-container-wrapper');
    chartContainer.classList.add('chart-container');
    chartWrapper.appendChild(this.createCanvas());
    chartContainer.appendChild(this.createChartHeader());
    chartContainer.appendChild(chartWrapper);
    return chartContainer;
  }

  createFullScreenIcon = (parent) => {
    const fullScreen = document.createElement('img');
    fullScreen.setAttribute('src', './assets/List/img/full-screen.svg');
    fullScreen.setAttribute('alt', 'fullscreen');
    fullScreen.setAttribute('width', '24');
    fullScreen.setAttribute('height', '24');
    fullScreen.classList.add('full-screen-chart');
    fullScreen.addEventListener('click', () => {
      document.body.classList.toggle('body-scroll');
      parent.classList.toggle('popup-chart');
    });
    return fullScreen;
  }

  async initChart() {
    this.chartService.getNewCases();
    await this.chartService.getGlobalCases();
    const container = document.querySelector('.container');
    const chartContainer = document.querySelector('.chart-main-container');
    chartContainer.appendChild(this.createFullScreenIcon(chartContainer));
    chartContainer.appendChild(this.createChart());
    this.data = this.chartService.globalData;
    this.chart = new ChartModel(this.data.cases);
    this.chart.createChart();
    container.addEventListener('click', (e) => {
      const targetLi = e.target.closest('.country');
      const targetArrow = e.target.closest('.next-arrow');
      const targetprevArrow = e.target.closest('.prev-arrow');
      const daySwitch = e.target.closest('#table-select');
      const dayList = e.target.closest('.header-text');
      const button = document.querySelector('#chart-selectBy');
      if (targetLi) {
        this.isCountryChosen = true;
        this.chosenCountry = targetLi.classList[1];
        this.updateChart();
      }
      if (targetArrow) {
        this.nextChart();
      } else if (targetprevArrow) {
        this.prevChart();
      } else if (daySwitch) {
        button.checked = daySwitch.checked;
        this.switchHandler();
      } else if (dayList) {
        button.click();
      }
    });
  }
}
