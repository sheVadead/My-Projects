import Table from '../table/Table';
import List from '../list/List';
import CovidMap from '../covidMap/CovidMap';
import Chart from '../chart/Chart';

export default class Main {
  constructor() {
    this.table = new Table(this.onDateRangeClicked, this.onNumberFormatsClicked);
    this.covidMap = new CovidMap(this.onMapCountryClicked);
    this.list = new List(this.onDateRangeClicked, this.onNumberFormatsClicked);
    this.state = {
      isAbsoluteValues: true,
      isLatestDay: false,
      currentCountry: null,
      distributionParam: null,
    };
    this.chart = new Chart(this.list.flags.listDataOrder, this.list.clickedCountry);
  }

  async init() {
    this.initRender();
    await Promise.all([
      this.table.update(
        this.state.isAbsoluteValues,
        this.state.isLatestDay,
        this.state.currentCountry,
      ),
      this.list.initList(
        this.state.isAbsoluteValues,
        this.state.isLatestDay,
        this.state.currentCountry,
      ),
      this.covidMap.render(
        this.state.isAbsoluteValues,
        this.state.isLatestDay,
        this.state.currentCountry,
      ), await this.chart.initChart()]);
  }

  setState = (newState) => {
    this.state = { ...this.state, ...newState };
  }

  createGitLink = (url, name) => {
    const gitLink = document.createElement('a');
    gitLink.setAttribute('href', url);
    gitLink.setAttribute('target', '_blank');
    gitLink.textContent = name;
    return gitLink;
  }

  initRender = () => {
    const container = document.createElement('div');
    document.body.prepend(container);
    container.className = 'container';
    const title = document.createElement('div');
    const titleText = document.createElement('p');
    titleText.textContent = 'Covid-19 Dashboard for RSS-2020Q3';
    title.appendChild(this.createGitLink('https://github.com/helenakrasnova', '@helenakrasnova'));
    title.appendChild(titleText);
    title.appendChild(this.createGitLink('https://github.com/sheVadead', '@sheVadead'));
    document.body.prepend(title);
    title.className = 'title';
    const containerColumn = document.createElement('div');
    containerColumn.style.background = "url('./assets/List/img/loader.gif') no-repeat center";
    container.append(containerColumn);
    containerColumn.className = 'container-column';
    const mapContainer = document.createElement('div');
    mapContainer.addEventListener('click', (e)=>{
     const circle =  e.target.closest('.leaflet-interactive');
     if(circle) {
       const country = document.querySelector('.country').classList[1];
      this.chart.updateChart(country)
       const popupClose = document.querySelector('.leaflet-popup-close-button');
       popupClose.addEventListener('click', this.dischargeData);
     } else {
       return;
     }
    })
    container.append(mapContainer);
    mapContainer.className = 'map-container';
    const tableContainer = document.createElement('div');
    tableContainer.style.background = "url('./assets/List/img/loader.gif') no-repeat";
    containerColumn.append(tableContainer);
    tableContainer.className = 'table-container';
    const listContainer = document.createElement('div');
    listContainer.style.background = "url('./assets/List/img/loader.gif') no-repeat";
    container.append(listContainer);
    listContainer.className = 'list-main-container';
    const chartContainer = document.createElement('div');
    containerColumn.append(chartContainer);
    chartContainer.className = 'chart-main-container';
    const titleMain = document.querySelector('.title');
    titleMain.addEventListener('click', this.dischargeData);
  }

  render = async () => {
    await Promise.all([
      this.table.update(
        this.state.isAbsoluteValues,
        this.state.isLatestDay,
        this.state.currentCountry,
      ),
      this.list.initList(
        this.state.isAbsoluteValues,
        this.state.isLatestDay,
        this.state.currentCountry,
      ),
      this.covidMap.render(
        this.state.isAbsoluteValues,
        this.state.isLatestDay,
        this.state.currentCountry,
      )]);
  }

  dischargeData = async () => {
    const chartCont = document.querySelector('.chart-main-container');
    this.state.isAbsoluteValues = true;
    this.state.isLatestDay = false;
    this.state.currentCountry = null;
    chartCont.innerHTML = '';
    await this.chart.initChart();
    await this.render();

  }

  onMapCountryClicked = async (countryName) => {
    this.setState({
      currentCountry: countryName,
    });
    await this.render();
  }

  onDateRangeClicked = async (value) => {
    this.setState({
      isLatestDay: value,
    });
    await this.render();
  }

  onNumberFormatsClicked = async (value) => {
    this.setState({
      isAbsoluteValues: value,
    });
    await this.render();
  }
}
