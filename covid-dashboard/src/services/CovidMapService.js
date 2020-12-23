import TableService from './TableService';
import CovidMapModel from '../models/CovidMapModel';

export default class CovidMapService {
  constructor() {
    this.baseUrl = 'https://api.covid19api.com';
    this.tableService = new TableService();
    this.cachedMapData = null;
  }

  async getCovidMapData(tableData) {
    // eslint-disable-next-line no-await-in-loop
    const countryData = await this.getCountryData(tableData?.countrySlug);
    if (!countryData) {
      return null;
    }
    const covidMapModel = new CovidMapModel(
      tableData.country,
      tableData.confirmed,
      tableData.recovered,
      tableData.deaths,
      tableData.countrySlug,
      countryData?.Lat,
      countryData?.Lon,
    );
    return covidMapModel;
  }

  async getCountryData(countrySlug) {
    if (!countrySlug) {
      return null;
    }
    const url = `${this.baseUrl}/country/${countrySlug}?from=2020-12-01&to=2020-12-02`;
    const result = await fetch(url, {
      headers: {
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      },
    });
    if (result.ok) {
      const countriesArray = await result.json();
      return countriesArray[0];
    }
    return null;
  }
}
