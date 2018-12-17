let milage_chart = new MilageChart("milage_chart");
let milage_table = new MilageTable("milage_table");

$(document).ready(function () {
    var jsonData = $.get({
        url: '/api/refuels',
        headers: {"Authorization": localStorage.getItem('token')},
        dataType: 'json',
    }).done(function (data) {
        milage_chart.loadData(data);
        milage_table.loadData(data);
    });
});