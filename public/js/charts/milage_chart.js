function MilageChart(id) {
    let ctx = document.getElementById(id).getContext('2d');
    let timeFormat = 'MM/DD/YYYY';
    this.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Milage',
                data: [],
                yAxisID: 'milage',
                backgroundColor: Chart.helpers.color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                fill: false,
                borderWidth: 1
            },{
                label: 'Miles',
                data: [],
                yAxisID: 'miles',
                backgroundColor: Chart.helpers.color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                fill: false,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                text: 'Milage'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        format: timeFormat,
                        tooltipFormat: 'll HH:mm'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    id: "milage",
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        labelString: 'Milage',
                        display: true,
                    }
                }, {
                    id: "miles",
                    type: 'linear',
                    position: 'right',
                    scaleLabel: {
                        labelString: 'Miles since last re-fuel',
                        display: true,
                    }
                }
                ]
            },
        }
    });

    this.loadData = function(data) {
        let labels = data.map(r => Date.parse(r.date));
        this.chart.data.labels.length = 0;
        labels.forEach(label => this.chart.data.labels.push(label));
        this.chart.data.datasets[0].data = data.map(r => parseInt(r.milage));
        this.chart.data.datasets[1].data = data.map(r => parseInt(r.pricePerLitre));
        this.chart.update();
    }
}
