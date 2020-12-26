export default class ChartService {
  constructor() {
    this.dayData = [];
    this.globalData = [];
    this.allData = [];
    this.newCases = [];
    this.singleCounty = [];
    this.singleCountryDayData = [];
    this.baseUrl = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';
    this.populationCoefficient = 100000;
  }

  async getGlobalCases() {
    const result = await this.sendRequest();
    this.globalData = result;
    return result;
  }

  async getNewCases() {
    const result = await this.sendRequest('https://corona-api.com/timeline');
    this.newCases.push(Object.fromEntries(result.data.filter((filterItem) => filterItem.date !== '2020-12-11').map((item) => {
      const arr = [item.date, item.new_confirmed];
      return arr;
    }).reverse().slice(0, -1)));
    this.newCases.push(Object.fromEntries(result.data.map((item) => {
      const arr = [item.date, item.new_deaths];
      return arr;
    }).reverse().slice(0, -1)));
    const newRec = result.data.filter((filterItem) => filterItem.date !== '2020-12-12' && filterItem.date !== '2020-10-31').map((item) => {
      const arr = [item.date, item.new_recovered];
      return arr;
    }).reverse().slice(0, -1);
    this.newCases.push(Object.fromEntries(newRec));
  }

  async getSingleCountryData(req, country) {
    const result = await this.sendRequest(req);
    const request = await fetch('https://restcountries.eu/rest/v2/all');
    const total = await request.json();
    const populationAll = total.map((item) => {
      const arr = [item.alpha2Code, item.population];
      return arr;
    });
    const chosenCountryPopulation = populationAll.find((item) => item.alpha2Code === country)[1];
    const countryArr = [];
    countryArr.push(Object.fromEntries(result.filter((item) => item.Province === '').map((item) => {
      const dayArr = [item.Date.slice(0, -10), item.Confirmed];
      return dayArr;
    })));
    countryArr.push(Object.fromEntries(result.filter((item) => item.Province === '').map((item) => {
      const dayArr = [item.Date.slice(0, -10), item.Deaths];
      return dayArr;
    })));
    countryArr.push(Object.fromEntries(result.filter((item) => item.Province === '').map((item) => {
      const dayArr = [item.Date.slice(0, -10), item.Recovered];
      return dayArr;
    })));

    countryArr.push(Object.fromEntries(result.filter((item) => item.Province === '').map((item) => {
      const dayArr = [item.Date.slice(0, -10), (item.Confirmed * this.populationCoefficient) / chosenCountryPopulation];
      return dayArr;
    })));
    countryArr.push(Object.fromEntries(result.filter((item) => item.Province === '').map((item) => {
      const dayArr = [item.Date.slice(0, -10), (item.Deaths * this.populationCoefficient) / chosenCountryPopulation];
      return dayArr;
    })));
    countryArr.push(Object.fromEntries(result.filter((item) => item.Province === '').map((item) => {
      const dayArr = [item.Date.slice(0, -10), (item.Recovered * this.populationCoefficient) / chosenCountryPopulation];
      return dayArr;
    })));
    return countryArr;
  }

  async getSingleCountryDayData(req) {
    const result = await fetch(req);
    const total = await result.json();
    const countryArr = [];
    countryArr.push(await this.calculateDayData(total.timeline.cases));
    countryArr.push(await this.calculateDayData(total.timeline.deaths));
    countryArr.push(await this.calculateDayData(total.timeline.recovered));
    this.singleCountryDayData = await countryArr;
    return countryArr;
  }

  calculateDayData = async (obj) => {
    const arr = await Object.entries(obj);
    const resArr = [];
    for (let i = 0; i < arr.length; i++) {
      const newArr = [];
      if (i + 1 !== arr.length) {
        newArr.push(arr[i + 1][0]);
        newArr.push(arr[i + 1][1] - arr[i][1]);
        resArr.push(newArr);
      }
    }

    return Object.fromEntries(resArr.filter((item) => item[1] > 0));
  }

  async sendRequest(url = this.baseUrl) {
    const result = await fetch(url);
    const covidInfo = await result.json();
    this.allData = covidInfo;
    return covidInfo;
  }
}
