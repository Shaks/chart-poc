const totalizer = {
  id: 'totalizer',

  beforeUpdate: chart => {
    let totals = {}
    let utmost = 0

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      if (chart.isDatasetVisible(datasetIndex)) {
        utmost = datasetIndex
        dataset.data.forEach((value, index) => {
          totals[index] = (totals[index] || 0) + value
        })
      }
    })

    chart.$totalizer = {
      totals: totals,
      utmost: utmost
    }
  }
}

new Chart('chart', {
  type: 'bar',
  data: {
    labels: ['Brut', 'Net imposable', 'Net'],
    datasets: [{
      label: 'Foo',
      data: [8, 4, 2],
      backgroundColor: 'purple'
    }, {
      label: 'Bar',
      data: [10, 20, 30],
      backgroundColor: 'cyan'
    }, {
      label: 'Blah',
      data: [4, 2, 5],
      backgroundColor: '#5080ff'
    }]
  },
  options: {
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
          suggestedMax: 50
        }
      }],
      yAxes: [{
        stacked: true
      }]
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return ctx.chart.$totalizer.totals[ctx.dataIndex]
        },
        align: 'end',
        anchor: 'end',
        display: function(ctx) {
          return ctx.datasetIndex === ctx.chart.$totalizer.utmost
        }
      }
    }
  },
  plugins: [totalizer]
});