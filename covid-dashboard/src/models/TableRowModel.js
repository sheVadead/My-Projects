export default class TableRowModel {
  constructor(country, confirmed, recovered, deaths, countrySlug) {
    this.country = country;
    this.confirmed = confirmed;
    this.recovered = recovered;
    this.deaths = deaths;
    this.countrySlug = countrySlug;
  }
}
