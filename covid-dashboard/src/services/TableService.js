import TableRowModel from '../models/TableRowModel';

export default class TableService {
  constructor() {
    this.baseUrl = 'https://api.covid19api.com';
    this.populationCoefficient = 100000;
    this.cachedSummaryData = null;
  }

  async getTotalAbsolute() {
    const results = await this.getSummary();
    const total = results.Countries.map((item) => {
      const tableRow = new TableRowModel(
        item.Country,
        item.TotalConfirmed,
        item.TotalRecovered,
        item.TotalDeaths,
        item.Slug,
      );
      return tableRow;
    });
    return total;
  }

  async getLastDayAbsolute() {
    const results = await this.getSummary();
    const lastDay = results.Countries.map((item) => {
      const tableRow = new TableRowModel(
        item.Country,
        item.NewConfirmed,
        item.NewRecovered,
        item.NewDeaths,
        item.Slug,
      );
      return tableRow;
    });
    return lastDay;
  }

  async getTotalRelative() {
    const results = await this.getSummary();
    const totalDays = results.Countries.map((item) => {
      const row = this.calculateRelativeTableRow(
        item.Country,
        item.TotalConfirmed,
        item.TotalRecovered,
        item.TotalDeaths,
        item?.Premium?.CountryStats?.Population ?? 1,
        item.Slug,
      );
      return row;
    });
    return totalDays;
  }

  async getLastDayRelative() {
    const results = await this.getSummary();
    const lastDay = results.Countries.map((item) => {
      const row = this.calculateRelativeTableRow(
        item.Country,
        item.NewConfirmed,
        item.NewRecovered,
        item.NewDeaths,
        item?.Premium?.CountryStats?.Population ?? 1,
        item.Slug,
      );
      return row;
    });
    return lastDay;
  }

  calculateRelativeTableRow(
    country,
    itemConfirmed,
    itemRecovered,
    itemDeaths,
    itemPopulation,
    countrySlug,
  ) {
    const confirmed = Math.trunc((itemConfirmed * this.populationCoefficient) / itemPopulation);
    const recovered = Math.trunc((itemRecovered * this.populationCoefficient) / itemPopulation);
    const deaths = Math.trunc((itemDeaths * this.populationCoefficient) / itemPopulation);
    const tableRow = new TableRowModel(
      country, confirmed, recovered, deaths, countrySlug,
    );
    return tableRow;
  }

  async getSummary() {
    if (this.cachedSummaryData) {
      return this.cachedSummaryData;
    }
    const res = await fetch(`${this.baseUrl}/summary`, {
      headers: {
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      },
    });
    if (res.ok) {
      this.cachedSummaryData = await res.json();
      return this.cachedSummaryData;
    }
    return null;
  }

  async get(isAbsoluteValues, isLatestDay, country = null) {
    let data;
    if (isAbsoluteValues) {
      if (isLatestDay) {
        data = await this.getLastDayAbsolute();
      } else {
        data = await this.getTotalAbsolute();
      }
    } else if (isLatestDay) {
      data = await this.getLastDayRelative();
    } else {
      data = await this.getTotalRelative();
    }
    if (country) {
      data = data.filter((item) => item.country === country);
    }
    return data;
  }
}
