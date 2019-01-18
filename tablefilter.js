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
            rowMatches &= cellContent.includes(filterValue) || cellContent.toUpperCase().includes(filterValue.toUpperCase());
        }
        return rowMatches;
    }

    // get the string contents of the filter input fields
    function getFilterValues(filterRow) {
        let filterInputs = filterRow.getElementsByTagName('input');

        let filterValues = [];
        for (let input of filterInputs) {
            filterValues.push(input.value);
        }
        return filterValues;
    }

    // only show rows that match the input boxes
    function filterTable(table, filterRow) {
        let filterValues = getFilterValues(filterRow);

        let tbody = table.getElementsByTagName('tbody')[0];
        let rows = tbody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (isMatchingRow(row, filterValues)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    // get first child element by tag name, or create it if it doesn't exist
    function getOrCreate(parentElement, tagName) {
        let childElement = parentElement.getElementsByTagName(tagName)[0];
        if (childElement === undefined) {
            childElement = document.createElement(tagName);
            parentElement.insertBefore(childElement, parentElement.firstChild);
        }
        return childElement;
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
            filterInput.style.width = (firstCells[i].getBoundingClientRect()['width'] - 10) + 'px';
            filterInput.addEventListener("keyup", function () {
                filterTable(table, filterRow);
            });
            filterCell.appendChild(filterInput);
            filterRow.appendChild(filterCell);
        }

        let thead = getOrCreate(table, 'thead');
        thead.appendChild(filterRow);
    }

    let tables = document.getElementsByTagName("table");
    for (var table of tables) {
        decorateTable(table);
    }
})();
