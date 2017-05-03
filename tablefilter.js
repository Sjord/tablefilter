"use strict";

function decorateTable(table) {
  let rows = table.getElementByTagName('tr');
  let firstRow = rows[0];
  let firstCells = firstRow.getElementsByTagName('td');
}

let tables = document.getElementsByTagName("table");
for (var table of tables) {
  decorateTable(table);
}
