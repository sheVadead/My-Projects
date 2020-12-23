export default class ChartModel {
  constructor(chartData) {
    this.chartData = chartData;
  }

  createChart() {
    const ctx = document.querySelector('#chart');
    const color = ['rgb(255, 218, 0)', 'rgb(21, 156, 21)', 'rgb(255, 0, 0)'];
    const dataSets = [
      {
        label: 'Total',
        data: Object.values(this.chartData),
        backgroundColor: color[0],
        borderColor: color[0],
        borderWidth: 1,
      },
    ];
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.chartData),
        datasets: dataSets,
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'x',
          intersect: false,
          displayColors: false,
          callbacks: {
          },
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  min: 0,
                },
              },
            ],
          },
        },
      },
    });
    return chart;
  }
}
