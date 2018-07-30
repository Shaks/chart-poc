import React, { Component } from 'react';
import Chart from 'chart.js';
//import axios from 'axios';

class ChartComponent extends Component {
    
    totalizer = {
      id: 'totalizer',
    
      beforeUpdate: chart => {
        let totals = {}
        let utmost = 0
    
        chart.data.datasets.forEach((dataset, datasetIndex) => {
          if (chart.isDatasetVisible(datasetIndex)) {
            utmost = datasetIndex
            dataset.data.forEach((value, index) => {
              console.log(value);
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
      responsive: false,
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
            console.log(value);
            return ctx.chart.$totalizer.totals[ctx.dataIndex]
          },
          align: 'top',
          anchor: 'top',
          display: function(ctx) {
            return ctx.datasetIndex === ctx.chart.$totalizer.utmost
          }
        }
      }
    }

    componentDidMount = () => {
      // Load this data via AJAX
      let data = {
        labels: ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        datasets: [{
            label: 'User Activity',
            data: [2, 19, 3, 17, 6, 13, 7],
            backgroundColor: "red"
        }, {
            label: 'System Activity',
            data: [2, 29, 5, 5, 2, 3, 10],
            backgroundColor: "green"
        }, {
            label: 'External Interface',
            data: [4, 20, 15, 8, 12, 3, 1],
            backgroundColor: "blue"
        }]
      };
      this.initializeChart(data);
    }

    resetChart = () => {
      console.log('reset');
    }

    initializeChart = (data) => {
        let ctx = document.getElementById("chart").getContext("2d");
        let chart = new Chart(ctx, {
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
