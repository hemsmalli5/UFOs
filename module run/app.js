// import the data from data.js
const tableData = data;

// Refernce the HTML table using D3
var tbody = d3.select("tbody");

// Create build table function and pass data
function buildTable(data) {
    
    // Clear the existing data in the table
    tbody.html("");

    //apply forEach function that loops through our data array, 
    // and then adds rows of data to the table
    
    // With this function, we have done the following:
        // Looped through each object in the array
        // Appended a row to the HTML table
        // Added each value from the object into a cell
    data.forEach((dataRow) => {

        //  Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );    
    });
};

//Create handleClick fucntion using D3 filters
function handleClick() {

// Look for date values and grab properties into new variable 'date'
let date = d3.select("#datetime").property("value");
let filteredData = tableData;

//data using filtered data strict match ===
if (date) {
    filteredData = filteredData.filter(row => row.datetime === date);  
    };
    //Rebuild the table using filtered data
    //@NOTE: If no data was entered, then filderedData will just be original data
    buildTable(filteredData);
};

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

//Build the table when the page loads
buildTable(tableData);
