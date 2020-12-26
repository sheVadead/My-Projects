import * as L from 'leaflet';
import CovidMapService from '../../services/CovidMapService';
import TableService from '../../services/TableService';

export default class CovidMap {
  constructor(onMapCountryClicked) {
    this.onMapCountryClicked = onMapCountryClicked;
    this.covidMapService = new CovidMapService();
    this.tableService = new TableService();
    this.cachedMapData = null;
    this.legendValues = [0, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
    this.layer = null;
    this.covidMap = null;
  }

  createMap = () => {
    const mapContainer = document.querySelector('.map-container');
    mapContainer.appendChild(this.createFullScreenIcon(mapContainer));
    const mapDiv = document.createElement('div');
    mapDiv.id = 'covidMap';
    mapContainer.append(mapDiv);
    const southWest = L.latLng(-89.98155760646617, -180);
    const northEast = L.latLng(89.99346179538875, 180);
    const bounds = L.latLngBounds(southWest, northEast);
    const mapOptions = {
      center: [30, 10],
      zoom: 1.5,
      maxBoundsViscosity: 1.0,
      maxBounds: bounds,
    };
    const covidMap = new L.map('covidMap', mapOptions);
    const layer = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=064157cb-ed9d-4660-8144-1770979f20ef');
    covidMap.addLayer(layer);
    return covidMap;
  }

  createFullScreenIcon = (parent) => {
    const fullScreen = document.createElement('img');
    fullScreen.setAttribute('src', './assets/List/img/full-screen.svg');
    fullScreen.setAttribute('alt', 'fullscreen');
    fullScreen.setAttribute('width', '24');
    fullScreen.setAttribute('height', '24');
    fullScreen.classList.add('full-screen-map');
    fullScreen.addEventListener('click', () => {
      window.scroll(0, -100);
      document.body.classList.toggle('body-scroll');
      parent.classList.toggle('popup-map');
    });
    return fullScreen;
  }

  update = async (isAbsoluteValues, isLatestDay, currentCountry) => {
    if (this.covidMap.hasLayer(this.layer)) {
      this.covidMap.removeLayer(this.layer);
    }
    await this.render(isAbsoluteValues, isLatestDay, currentCountry);
  }

  async render(isAbsoluteValues, isLatestDay, currentCountry) {
    if (!this.covidMap) {
      this.covidMap = this.createMap();
      const legend = this.createLegend();
      legend.addTo(this.covidMap);
    }
    const tableData = await this.tableService.get(isAbsoluteValues, isLatestDay, currentCountry);
    const circleArray = [];
    this.layer = new L.layerGroup(circleArray);
    this.layer.addTo(this.covidMap);
    for (let i = 0; i < tableData.length; i += 1) {
      const covidMapData = await this.covidMapService.getCovidMapData(tableData[i]);
      if (covidMapData) {
        const circle = this.createCircle(covidMapData);
        if (circle) {
          circle.addTo(this.layer);
        }
      }
    }
  }

  createCircle = (covidMapData) => {
    if (covidMapData.lat && covidMapData.lon) {
      const circleCenter = [covidMapData.lat, covidMapData.lon];
      const circleColor = this.getCircleColor(covidMapData.confirmed);
      const circleOptions = {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 1.0,
      };
      const circle = L.circle(circleCenter, 50000, circleOptions)
        .bindPopup(`${covidMapData.country} confirmed - ${covidMapData.confirmed}`).openPopup();
      circle.country = covidMapData.country;
      circle.on('click', this.circleClicked);
      circle.on('mouseover', () => {
        circle.openPopup();
      });
      return circle;
    }
    return null;
  }

  circleClicked = (event) => {
    this.onMapCountryClicked(event.target.country);
  }

  getCircleColor = (value) => {
    let circleColor = '';
    if (value > this.legendValues[7]) {
      circleColor = '#800026';
    } else if (value > this.legendValues[6]) {
      circleColor = '#BD0026';
    } else if (value > this.legendValues[5]) {
      circleColor = '#E31A1C';
    } else if (value > this.legendValues[4]) {
      circleColor = '#FC4E2A';
    } else if (value > this.legendValues[3]) {
      circleColor = '#FD8D3C';
    } else if (value > this.legendValues[2]) {
      circleColor = '#FEB24C';
    } else if (value > this.legendValues[1]) {
      circleColor = '#FED976';
    } else {
      circleColor = '#FFEDA0';
    }
    return circleColor;
  }

  createLegend = () => {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const legendInfo = L.DomUtil.create('div', 'info legend');
      for (let i = 0; i < this.legendValues.length; i++) {
        legendInfo.innerHTML += `<i style="background:${this.getCircleColor(this.legendValues[i] + 1)}"></i> ${this.legendValues[i]}${this.legendValues[i + 1] ? ` - ${this.legendValues[i + 1]}<br>` : '+'}`;
      }
      return legendInfo;
    };
    return legend;
  }
}
