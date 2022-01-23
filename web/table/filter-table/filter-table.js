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
  this.sortOrder = "ASC";

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
 * Sort by the selected column.
 * @param {string} col The column to order the rows by.
 */
FilterTable.prototype.sortByColumn = function (col) {
  const colIndex = this.headers.indexOf(col);
  if (colIndex === -1) {
    throw new Error("Invalid column selected for sorting");
  }

  // Toggle sort order.
  this.sortOrder = this.sortOrder === "ASC" ? "DSC" : "ASC";

  this.sort((a, b) => {
    const comparator =
      this.sortOrder === "ASC"
        ? a[colIndex] < b[colIndex]
        : a[colIndex] > b[colIndex];

    return comparator ? -1 : 1;
  });
};

/**
 * Enable to sort by column.
 */
FilterTable.prototype.enableSortByColumn = function () {
  const colHeaders = this.tableHeader.querySelectorAll("th");

  for (const colHeader of colHeaders) {
    colHeader.style.setProperty("cursor", "pointer");
    colHeader.addEventListener("click", () =>
      this.sortByColumn.bind(this)(colHeader.textContent)
    );
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
