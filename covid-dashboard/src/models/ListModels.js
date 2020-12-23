export default class ListItemModelAllTime {
  constructor(country, confirmed, recovered, deaths, code) {
    this.country = country;
    this.confirmed = confirmed;
    this.recovered = recovered;
    this.deaths = deaths;
    this.countryCode = code;
  }
}
