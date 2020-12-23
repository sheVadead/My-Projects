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
    await this.render();
    await this.chart.initChart();
  }

  setState = (newState) => {
    this.state = { ...this.state, ...newState };
  }

  initRender = () => {
    const container = document.createElement('div');
    document.body.prepend(container);
    container.className = 'container';
    const title = document.createElement('div');
    document.body.prepend(title);
    title.className = 'title';
    title.textContent = 'Covid-19 Dashboard for RSS-2020Q3';
    const containerColumn = document.createElement('div');
    container.append(containerColumn);
    containerColumn.className = 'container-column';
    const mapContainer = document.createElement('div');
    container.append(mapContainer);
    mapContainer.className = 'map-container';
    const tableContainer = document.createElement('div');
    containerColumn.append(tableContainer);
    tableContainer.className = 'table-container';
    const listContainer = document.createElement('div');
    container.append(listContainer);
    listContainer.className = 'list-main-container';
    const chartContainer = document.createElement('div');
    containerColumn.append(chartContainer);
    chartContainer.className = 'chart-main-container';
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
