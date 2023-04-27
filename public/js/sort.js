const sort = (event) => {
  //Create elelments and set variables
  let sortedRows = [];
  const table = document.getElementById("table");
  const tableBody = document.getElementById("tableBody");
  const tableHead = event.target;
  const index = tableHead.cellIndex;
  const ascend = tableHead.classList.contains("ascend");
  const descend = tableHead.classList.contains("descend");
  const rows = Array.from(tableBody.rows);
  toggleClass(tableHead, "ascend", "descend", !ascend);
  sortedRows = Array.from(tableBody.rows).sort((a, b) =>
    comparer(a, b, index, ascend)
  );

  for (const row of sortedRows) {
    tableBody.appendChild(row);
  }
};

const toggleClass = (element, className1, className2, condition) => {
  if (condition) {
    element.classList.remove(className2);
    element.classList.add(className1);
    element
      .querySelector(".arrowDown")
      .classList.toggle("hidden", className1 !== "ascend");
    element
      .querySelector(".arrowUp")
      .classList.toggle("hidden", className1 !== "descend");
  } else {
    element.classList.remove(className1);
    element.classList.add(className2);
    element
      .querySelector(".arrowDown")
      .classList.toggle("hidden", className2 !== "ascend");
    element
      .querySelector(".arrowUp")
      .classList.toggle("hidden", className2 !== "descend");
  }
};

const getCellValue = (row, columnIndex) => {
  return row.cells[columnIndex].innerText;
};
const comparer = (firstValue, secondValue, columnIndex, asc) => {
  const v1 = getCellValue(asc ? firstValue : secondValue, columnIndex);
  const v2 = getCellValue(asc ? secondValue : firstValue, columnIndex);

  if (v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)) {
    return v1 - v2;
  }

  return v1.toString().localeCompare(v2);
};

document.getElementById("th-title").addEventListener("click", sort);
document.getElementById("th-amount").addEventListener("click", sort);
document.getElementById("th-description").addEventListener("click", sort);
document.getElementById("th-category").addEventListener("click", sort);
document.getElementById("th-priority").addEventListener("click", sort);
