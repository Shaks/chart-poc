import React, { Component } from 'react';
import Chart from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels';

class ChartComponent extends Component {
    
    chart = null;

    data = null;

    totalizer = {
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

    options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          barPercentage: 1.0,
          categoryPercentage: 0.4,
          gridLines: {
              offsetGridLines: true
          },
          ticks: {
            paddingTop: 300
          },
          stacked: true,
        }],
        yAxes: [{
            display: false,     //This will remove the lines
            ticks: {
                beginAtZero: true,
                display: false  //To hide vertical labels
            },
            stacked: true
        }]
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            return ctx.chart.$totalizer.totals[ctx.dataIndex]
          },
          align: 'top',
          anchor: 'top',
          display: function(ctx) {
            return ctx.chart.$totalizer.utmost !== 0 && (ctx.datasetIndex === ctx.chart.$totalizer.utmost);
          }
        }
      }
    }

    // plugins: [{
    //   beforeInit: function(chart, options) {
    //     console.log('yolo');
    //   }
    // }]

    componentDidMount = () => {
      // Load this data via AJAX
        this.data = {
        labels: ['05', '06', '07', '08', '09', '10', '11'],
        datasets: [{
            label: 'User Activity',
            data: [2, 19, 3, 17, 6, 13],
            backgroundColor: "red"
        }, {
            label: 'System Activity',
            data: [2, 29, 5, 5, 2, 3],
            backgroundColor: "green"
        }, {
            label: 'External Interface',
            data: [4, 20, 15, 8, 12, 3, 20],
            backgroundColor: "blue"
        }]
      };
      this.initializeChart(this.data);
    }

    resetChart = () => {
      this.chart.destroy();
      this.initializeChart(this.data);
    }

    initializeChart = (data) => {
        this.chart = new Chart(document.getElementById("chart"), {
            type: 'bar',
            data: data,
            options: this.options,
            plugins: [this.totalizer]
        });
    }

    render() {
        return (
            <div>
                <canvas id="chart" width="1400" height="300"></canvas>
                <button type="button" onClick={ this.resetChart }>Reset</button>
            </div>
        );
    }

}

export default ChartComponent;
