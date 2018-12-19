function createDataSet(label, axisID, colour) {
    return {
        label: label,
        data: [],
        yAxisID: axisID,
        backgroundColor: Chart.helpers.color(colour).alpha(0.5).rgbString(),
        borderColor: colour,
        fill: false,
        borderWidth: 1
    }
}

function createAxis(id, label, position) {
    return {
        id: id,
        type: 'linear',
        position: position,
        scaleLabel: {
            labelString: label,
            display: true,
        }
    }
}

// {
//     type: 'time',
//     time: {
//         format: timeFormat,
//         tooltipFormat: 'll HH:mm'
//     },
//     scaleLabel: {
//         display: true,
//         labelString: 'Date'
//     }

function createConfig(title){
    return {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            title: {
                text: title
            },
            scales: {
                xAxes: [],
                yAxes: []
            }
        }
    }
}

function createChart(id, config) {
    let ctx = document.getElementById(id).getContext('2d');
    let timeFormat = 'MM/DD/YYYY';
    this.chart = new Chart(context, config);
});
}