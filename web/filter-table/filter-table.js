"use strict";

function FilterTable(selector, headers, rows) {
  /**
   * Properties
   */
  this.element = document.querySelector(selector);
  this.headers = headers;
  this.rows = rows;
  this.tableHeader = this.element.appendChild(document.createElement("thead"));
  this.tableBody = this.element.appendChild(document.createElement("tbody"));

  /**
   * Sanity Checks
   */
  if (rows[0] && headers.length !== rows[0].length) {
    throw new Error("Header and values mismatched");
  }

  /**
   * Initializers
   */
  this.initializeTableHeader();
  this.render();
}

/**
 * Initialize the table header.
 */
FilterTable.prototype.initializeTableHeader = function () {
  this.tableHeader.innerHTML = "";

  for (const header of this.headers) {
    const headerColumn = document.createElement("th");
    headerColumn.innerHTML = header;

    this.tableHeader.appendChild(headerColumn);
  }
};

/**
 * Add a row to the table body.
 * @param {string[]} row The row to add.
 */
FilterTable.prototype.addRow = function (row) {
  this.rows.push(row);
  this.render();
};

/**
 * Render the table by setting the rows in the table body.
 */
FilterTable.prototype.render = function () {
  this.tableBody.innerHTML = "";

  for (const row of this.rows) {
    const tableRow = document.createElement("tr");

    for (const col of row) {
      const tableCol = document.createElement("td");
      tableCol.innerHTML = col;

      tableRow.appendChild(tableCol);
    }

    this.tableBody.appendChild(tableRow);
  }
};

/**
 * Sort the table rows.
 * @param {(a: string, b: string) => void} comparator Comparator callback to sort the table rows.
 */
FilterTable.prototype.sort = function (comparator) {
  this.rows.sort(comparator);
  this.render();
};
