
// gets canvas element
let ctx = document.getElementById('line-chart').getContext('2d');

// creates and updates canvas chart
function createChart(data) {

    // gets data ranges from json array
    let tableData = mapData(data);

    // creates chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: tableData.dates,
            datasets: [{
                data: tableData.temperature,
                label: "Temperature",
                borderColor: "#d79763",
                backgroundColor: "#e3944d",
                fill: false,
            }, {
                data: tableData.humidity,
                label: "Humidity",
                borderColor: "#5cb2e7",
                backgroundColor: "#228ae3",
                fill: false,
            }
            ]
        },
    });
}

function mapData(data) {
    let tableData = {temperature:[],humidity:[],dates:[]};
    const reversedData = data.slice().reverse();
    for(let row of reversedData) {
        tableData.temperature.push(row.temperature);
        tableData.humidity.push(row.humidity);
        tableData.dates.push(convertTimeStampToString(row.timeStamp));
    }
    return tableData;
}