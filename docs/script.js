d3.csv("DAM_S25_Assignment-2_Track_calls-dataset - Sheet1.csv").then(function(data) {
    console.log(data); // View the loaded data in the browser console

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = screen.width - margin.left - margin.right;
    const height = screen.height - margin.top - margin.bottom;
    const imageWidth = 33; // Width for all images
    const spacing = 0; // Reduced spacing between images
    const maxHeight = height - margin.bottom; // Max height before wrapping
    const categoryCircleSize = 5; // Radius of category ellipses (smaller size)

    // Define specific colors for each category
    const categoryColors = {
        "Family": "olive",
        "Friend": "yellowgreen",
        "Bestie": "mediumvioletred",
        "Business": "orange",
        "Other": "black"
    };

    // Define SVG mapping based on time unit, direction, and time category
    const svgMappings = {
        "early-sec-incoming": "svg/early-incoming-seconds.svg",
        "early-sec-outgoing": "svg/early-outgoing-seconds.svg",
        "early-min-incoming": "svg/early-incoming-minutes.svg",
        "early-min-outgoing": "svg/early-outgoing-minutes.svg",
        "early-NA-Missed": "svg/early-NA-Missed.svg",
        "early-NA-Canceled": "svg/early-NA-Canceled.svg",
        "morning-sec-incoming": "svg/morning-incoming-seconds.svg",
        "morning-sec-outgoing": "svg/morning-outgoing-seconds.svg",
        "morning-min-incoming": "svg/morning-incoming-minutes.svg",
        "morning-min-outgoing": "svg/morning-outgoing-minutes.svg",
        "morning-NA-Missed": "svg/morning-NA-Missed.svg",
        "morning-NA-Canceled": "svg/morning-NA-Canceled.svg",
        "afternoon-sec-incoming": "svg/afternoon-incoming-seconds.svg",
        "afternoon-sec-outgoing": "svg/afternoon-outgoing-seconds.svg",
        "afternoon-min-incoming": "svg/afternoon-incoming-minutes.svg",
        "afternoon-min-outgoing": "svg/afternoon-outgoing-minutes.svg",
        "afternoon-NA-Missed": "svg/afternoon-NA-Missed.svg",
        "afternoon-NA-Canceled": "svg/afternoon-NA-Canceled.svg",
        "evening-sec-incoming": "svg/evening-incoming-seconds.svg",
        "evening-sec-outgoing": "svg/evening-outgoing-seconds.svg",
        "evening-min-incoming": "svg/evening-incoming-minutes.svg",
        "evening-min-outgoing": "svg/evening-outgoing-minutes.svg",
        "evening-NA-Missed": "svg/evening-NA-Missed.svg",
        "evening-NA-Canceled": "svg/evening-NA-Canceled.svg"
    };

    // Append an SVG container
    const svgContainer = d3.select("#theViz")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Append the <defs> section for patterns
    const defs = svgContainer.append("defs");


    // Define image references for each day
const imageRefs = {
    "Monday": "svg/monday.svg",
    "Tuesday": "svg/tuesday.svg",
    "Wednesday": "svg/wednesday.svg",
    "Thursday": "svg/thursday.svg",
    "Friday": "svg/friday.svg",
    "Saturday": "svg/saturday.svg",
    "Sunday": "svg/sunday.svg"
};

const imageSize = 60; // Size of the image element (adjust as needed)

// Define images in the "defs" section
Object.keys(imageRefs).forEach((day) => {
    defs.append("image")
        .attr("id", `image-${day.toLowerCase()}`)
        .attr("x", 0) // Start position for image
        .attr("y", 0) // Start position for image
        .attr("width", imageSize)
        .attr("height", imageSize)
        .attr("xlink:href", imageRefs[day]); // Set the path to the SVG file
});

// The pattern logic can now be replaced with this mapping
const images = {
    "Monday": "url(#image-monday)",
    "Tuesday": "url(#image-tuesday)",
    "Wednesday": "url(#image-wednesday)",
    "Thursday": "url(#image-thursday)",
    "Friday": "url(#image-friday)",
    "Saturday": "url(#image-saturday)",
    "Sunday": "url(#image-sunday)"
};


    /* 
    // Define a pattern for each day
    const patterns = {
        "Monday": "url(#pattern-monday)",
        "Tuesday": "url(#pattern-tuesday)",
        "Wednesday": "url(#pattern-wednesday)",
        "Thursday": "url(#pattern-thursday)",
        "Friday": "url(#pattern-friday)",
        "Saturday": "url(#pattern-saturday)",
        "Sunday": "url(#pattern-sunday)"
    };

    const rectSize = 6; // Size of the pattern rectangle

    // Define patterns
    defs.append("pattern")
        .attr("id", "pattern-monday")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("patternUnits", "userSpaceOnUse")
        .append("g") // Group elements to manage them together
        .append("rect") // Add a background rectangle
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "black"); // Set the background color

    defs.append("pattern")
        .attr("id", "pattern-tuesday")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("patternUnits", "userSpaceOnUse")
        .append("g") // Group elements to manage them together
        .append("rect") // Add a background rectangle
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "black"); // Set the background color    

    defs.append("pattern")
        .attr("id", "pattern-wednesday")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("patternUnits", "userSpaceOnUse")
        .append("g") // Group elements to manage them together
        .append("rect") // Add a background rectangle
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "black"); // Set the background color

    defs.append("pattern")
        .attr("id", "pattern-thursday")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("patternUnits", "userSpaceOnUse")
        .append("g") // Group elements to manage them together
        .append("rect") // Add a background rectangle
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "black"); // Set the background color  

    defs.append("pattern")
        .attr("id", "pattern-friday")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("patternUnits", "userSpaceOnUse")
        .append("g") // Group elements to manage them together
        .append("rect") // Add a background rectangle
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "black"); // Set the background color    

    defs.append("pattern")
        .attr("id", "pattern-saturday")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("patternUnits", "userSpaceOnUse")
        .append("g") // Group elements to manage them together
        .append("rect") // Add a background rectangle
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "black"); // Set the background color

    defs.append("pattern")
        .attr("id", "pattern-sunday")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("patternUnits", "userSpaceOnUse")
        .append("g") // Group elements to manage them together
        .append("rect") // Add a background rectangle
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("fill", "black"); // Set the background color  
 */

// Initialize variables for tracking columns and images
let totalImages = 0;  // Counter for the total number of images
let columns = 1;      // Track the number of columns required based on the height

// Track current drawing position
let currentX = margin.left;
let currentY = margin.top;
let previousDay = ""; // Track the previous day

// Process each row in the dataset
data.forEach((d, index) => {
    let durationText = d["Duration"];
    let durationNum = parseInt(durationText); // Extract number
    let isMinutes = durationText.includes("min");

    // Get the current day from the "Day" column
    let currentDay = d["Day"];

    // Check if the day has changed (to insert the pattern separator)
    if (previousDay && previousDay !== currentDay) {
        // Define margin for the separator
        const margin = 5;

        // Move to the next row after "Missed" or "Canceled" image set
        currentY += margin;

        svgContainer.append("image")
            .attr("x", currentX + (imageWidth - imageSize) / 2) // Adjust x to center with margin
            .attr("y", currentY) // Adjust y for the margin before the image
            .attr("width", imageSize) // Set image width
            .attr("height", imageSize) // Set image height
            .attr("xlink:href", imageRefs[currentDay]); // Use the image file based on the day

        // Move down for the next data point after the image and margin
        currentY += imageSize + margin;
    }

/*         
        // Insert a black rectangle to separate the days with a pattern inside
        svgContainer.append("rect")
            .attr("x", currentX + (imageWidth - 18) / 2) // Adjust x to center with margin
            .attr("y", currentY) // Adjust y for the margin before the rectangle
            .attr("width", 20) // Set rectangle width
            .attr("height", 20) // Set rectangle height
            .attr("fill", patterns[currentDay] || "none") // Apply pattern based on day
            .attr("stroke", "lightgray") // Apply border color
            .attr("stroke-width", 1); // Apply border stroke width
        
        // Move down for the next data point after the rectangle and margin
        currentY += 25; // Additional space for the next item
    }
 */

    // Update the previousDay to the current day
    previousDay = currentDay;

    let timeCategory = getTimeCategory(d["Time"]);
    let directionType = d["Direction"];
    let timeUnit = "NA";  // Default to "NA" in case the Direction is Missed or Canceled

    // Check if Direction is "Incoming", "Outgoing", "Missed", or "Canceled"
    if (directionType !== "Missed" && directionType !== "Canceled") {
        directionType = directionType === "Incoming" ? "incoming" : "outgoing";
        timeUnit = isMinutes ? "min" : "sec";
    }

    let svgPath = svgMappings[`${getTimeCategory(d["Time"])}-${timeUnit}-${directionType}`];

    // If direction is "Missed" or "Canceled", force a path lookup for NA
    if (directionType === "Missed" || directionType === "Canceled") {
        svgPath = svgMappings[`${getTimeCategory(d["Time"])}-NA-${directionType}`];
    }

    // Set different heights for seconds and minutes
    let imageHeight = (timeUnit === "NA") ? 10 : (isMinutes ? 180 : 3);

    // Increment the total image count
    totalImages += durationNum;

    let startY = currentY;
    let lastY = startY;

    for (let i = 0; i < durationNum; i++) {
        // Check if the next image exceeds max height, move to the next column
        if (lastY + imageHeight > maxHeight) {
            lastY = margin.top; // Reset to top margin
            currentX += imageWidth + spacing; // Move to next column
            columns++;  // Increase column count as a new column is required
        }

        svgContainer.append("image")
            .attr("href", svgPath)
            .attr("x", currentX)
            .attr("y", lastY)
            .attr("width", imageWidth)
            .attr("height", imageHeight);

        lastY += imageHeight + spacing; // Move down for next image
    }

    // Append the final category-based ellipse **below** the last SVG with reduced spacing
    svgContainer.append("circle")
        .attr("cx", currentX + imageWidth / 2) // Align with SVGs
        .attr("cy", lastY + categoryCircleSize + spacing) // Reduce space between SVGs and ellipse
        .attr("r", categoryCircleSize) // Circle radius
        .attr("fill", categoryColors[d["Category"]] || "black");

    // Update `currentY` for the next dataset row
    currentY = lastY + categoryCircleSize * 2 + spacing; // Move slightly further for spacing
    if (currentY + imageHeight > maxHeight) {
        currentY = margin.top; // Reset to top
        currentX += imageWidth + spacing; // Move to next column
    }
});

// Dynamically calculate the SVG width based on total images and columns
const svgWidth = columns * (imageWidth + spacing);

// Update the SVG container's width based on the number of columns required
svgContainer.attr("width", svgWidth);


    
});

// Function to determine time category based on the "Time" column
function getTimeCategory(timeString) {
    let hour = parseInt(timeString.split(":")[0]); // Extract hour from "HH:MM"

    if (hour >= 0 && hour < 6) return "early";  
    if (hour >= 6 && hour < 12) return "morning";  
    if (hour >= 12 && hour < 18) return "afternoon";  
    return "evening"; // Covers 18:00 - 23:59
}


d3.csv("DAM_S25_Assignment-2_Track_calls-dataset - Sheet1.csv").then(function(data) {
    // Exclude multiple columns (e.g., "Name" and "App")
    var filteredColumns = data.columns.filter(column => !["Name", "App"].includes(column));

    // Create a table
    var table = d3.select("#table").append("table");

    // Create a header row
    var header = table.append("thead").append("tr");

    // Create the table header cells
    header.selectAll("th")
        .data(filteredColumns)
        .enter()
        .append("th")
        .text(d => d);

    // Create the table rows
    var rows = table.append("tbody").selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // Create the table cells
    rows.selectAll("td")
        .data(row => filteredColumns.map(column => ({ column: column, value: row[column] })))
        .enter()
        .append("td")
        .text(d => d.value);
}
);



// this creates the circles and table

/* 
d3.csv("DAM_S25_Assignment-2_Track_calls-dataset - Sheet1.csv").then(function(data) {
    console.log(data); // View the loaded data in the browser console

    const width = 1920;
    const height = 1080;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Define specific colors for each category
    const categoryColors = {
        "Family": "olive",
        "Friend": "yellowgreen",
        "Bestie": "mediumvioletred",
        "Business": "orange",
        "Other": "black"
    };

    // Append an SVG element to #theViz
    const categoryType = d3.select("#theViz")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Bind data and create circles
    categoryType.selectAll("circle")
        .data(data) // Bind data
        .enter()
        .append("circle")
        .attr("cx", (d, i) => i * 15) // X position based on index
        .attr("cy", height / 2) // Y position in middle of SVG
        .attr("r", 5) // Radius
        .attr("fill", d => categoryColors[d["Category"]] || "black") // Default to black if category is not found
        .attr("transform", `translate(${margin.left}, ${margin.top})`); // Adjust position


    // Exclude multiple columns (e.g., "Name" and "App")
    var filteredColumns = data.columns.filter(function(column) {
        return !["Name", "App"].includes(column); // Replace with column names to exclude
    });

    // Create a table
    var table = d3.select("#table").append("table");

    // Create a header row
    var header = table.append("thead").append("tr");

    // Create the table header cells
    header.selectAll("th")
        .data(filteredColumns)
        .enter()
        .append("th")
        .text(function(d) {
            return d;
        });

    // Create the table rows
    var rows = table.append("tbody").selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // Create the table cells
    rows.selectAll("td")
        .data(function(row) {
            return filteredColumns.map(function(column) { // Use filteredColumns here
                return {
                    column: column,
                    value: row[column]
                };
            });
        })
        .enter()
        .append("td")
        .text(function(d) {
            return d.value;
        });
});
 */



// this shows unique types of calls and differentiates the time of day

/* 
d3.csv("DAM_S25_Assignment-2_Track_calls-dataset - Sheet1.csv").then(data => {
    // Each data point will correspond to a .png file eventually?
    // scratch that, there are currently 57 unique combinations of the most important columns

    let uniqueCombinations = new Set();

    // Function to categorize time into a range
    function getTimeRange(time) {
        let [hour, minute] = time.split(":").map(Number);

        if (hour >= 0 && hour < 6) return "Late Night";
        if (hour >= 6 && hour < 12) return "Morning";
        if (hour >= 12 && hour < 18) return "Afternoon";
        return "Evening"; // 18:00 - 23:59
    }

    // Process data
    data.forEach(d => {
        let timeRange = getTimeRange(d["Time"]);
        let key = `${d["Call Type"]},${d["Category"]},${d["Direction"]},${timeRange},${d["Day"]}`;
        uniqueCombinations.add(key);
    });

    console.log("Number of unique combinations:", uniqueCombinations.size);
    console.log("Unique combinations:", [...uniqueCombinations]);
});
 */