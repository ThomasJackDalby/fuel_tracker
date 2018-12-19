function MilageTable(id) {
    this.table = document.getElementById(id);
    let header = document.createElement("thead");
    this.tableBody = document.createElement("thead");
    this.table.appendChild(header);
    this.table.appendChild(this.tableBody);

    let headerRow = document.createElement("tr");
    header.appendChild(headerRow);
    let columns = ["Date", "Milage", "Amount (L)", "Cost/Litre (£/L)", "Total Cost (£)"]
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i];
        let headerCell = document.createElement("th");
        headerCell.setAttribute("scope", "col");
        headerCell.innerHTML = column;
        headerRow.appendChild(headerCell);
    }

    this.loadData = function (data) {
        console.log(data);
        this.table.rows.length = 0;
        for (let i = 0; i < data.length; i++) {
            let d = data[data.length - i - 1];
            let row = this.tableBody.insertRow(i);
            appendCell(row, formatDate(new Date(d.date)));
            appendCell(row, d.milage);
            appendCell(row, d.amount);
            appendCell(row, d.pricePerLitre);
            appendCell(row, d.totalCost);
        }
    }

    function appendCell(row, value) {
        let cell = row.insertCell(row.cells.length);
        cell.innerHTML = value;
    }
    function formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
}