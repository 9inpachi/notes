const filterTable = new FilterTable(
  "#filter-table",
  ["ID", "Name", "Age"],
  [["01", "Ali", "23"]]
);

filterTable.addRow(["00", "Fatima", "28"]);

filterTable.sort();

filterTable.enableSortByColumn();

setTimeout(() => {
  filterTable.sort((a, b) => {
    if (a[0] > b[0]) {
      return -1;
    } else {
      return 1;
    }
  });
}, 3000);
