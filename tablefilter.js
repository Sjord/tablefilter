"use strict";

(function () {

    // do the cells in `row` contain the strings in `filterValues`?
    function isMatchingRow(row, filterValues) {
        let cells = row.children;
        let rowMatches = true;
        for (let c = 0; c < Math.min(filterValues.length, cells.length); c++) {
            let cell = cells[c];
            let filterValue = filterValues[c];
            let cellContent = cell.innerText;
            rowMatches &= cellContent.includes(filterValue);
        }
        return rowMatches;
    }

    // only show rows that match the input boxes
    function filterTable(table) {
        let rows = table.getElementsByTagName('tr');
        let firstRow = rows[0];
        let filterInputs = firstRow.getElementsByTagName('input');

        let filterValues = [];
        for (let input of filterInputs) {
            filterValues.push(input.value);
        }

        for (let i = 1; i < rows.length; i++) {
            let row = rows[i];
            if (isMatchingRow(row, filterValues)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    // add a row with an input box for each column
    function decorateTable(table) {
        let rows = table.getElementsByTagName('tr');
        let firstRow = rows[0];
        let firstCells = firstRow.children;

        let filterRow = document.createElement('tr');
        for (let i = 0; i < firstCells.length; i++) {
            let filterCell = document.createElement('td');
            let filterInput = document.createElement('input');
            filterInput.addEventListener("keyup", function () {
                filterTable(table);
            });
            filterCell.appendChild(filterInput);
            filterRow.appendChild(filterCell);
        }
        table.insertBefore(filterRow, table.firstChild);
    }

    let tables = document.getElementsByTagName("table");
    for (var table of tables) {
        decorateTable(table);
    }
})();
