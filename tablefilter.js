"use strict";

(function () {

    function parseFilterExpression(expr) {
        let negate = false;
        let term = expr;

        if (term.charAt(0) === "-") {
            // Allow negating filters with -Query
            negate = true;
            term = term.substr(1);
        } else if (term.charAt(0) === "\\") {
            // Allow the escaping of negated filters with \-Query
            term = term.substr(1);
        }
        return {
            term: term,
            negate: negate
        };
    }

    // do the cells in `row` match against the given `filters`?
    function isMatchingRow(row, filters) {
        let cells = row.children;
        let rowMatches = true;
        for (let c = 0; c < Math.min(filters.length, cells.length); c++) {
            let cell = cells[c];
            let filter = filters[c];
            let cellContent = cell.innerText;
            let cellMatches = cellContent.includes(filter.term) || cellContent.toUpperCase().includes(filter.term.toUpperCase());
            if (filter.negate) {
                cellMatches = !cellMatches;
            }
            rowMatches &= cellMatches;
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
        let filters = filterValues.map(parseFilterExpression);

        let tbody = table.getElementsByTagName('tbody')[0];
        let rows = tbody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (isMatchingRow(row, filters)) {
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
            filterInput.type = "search";
            filterInput.style.width = (firstCells[i].getBoundingClientRect()['width'] - 10) + 'px';
            filterInput.addEventListener("input", function () {
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
