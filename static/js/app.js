// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

var inputs;

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {
  // console.log("update filter");
  // Save the element, value, and id of the filter that was changed
  let changedElement = d3.select(this);
  // console.log(changedElement);

  let date = d3.select("#datetime");
  let city = d3.select("#city");
  let state = d3.select("#state");
  let country = d3.select("#country");
  let shape = d3.select("#shape");
  
  let inputs = [date, city, state, country, shape];
  inputs.forEach(e => {
    console.log(e.property("value"));
  });


  inputs.forEach(e => {
    let value = e.property("value");
    let id = e.attr("id");
    if (value) {
      filters[id] = value;
    }
    else {
      delete filters[id];
    }
  });

  filterTable();
}


function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach((key, value) => {
    filteredData = filteredData.filter(row => row[key[0]] === key[1]);
   
    }
  );    

    //Rebuild the table using filtered data
    //@NOTE: If no data was entered, then filderedData will just be original data
    buildTable(filteredData);

  // Finally, rebuild the table using the filtered Data
  // buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
// d3.selectAll().on();
d3.select("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
