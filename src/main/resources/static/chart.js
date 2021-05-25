
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
            labels: tableData[2],
            datasets: [{
                data: tableData[0],
                label: "Temperature",
                borderColor: "#d79763",
                backgroundColor: "#e3944d",
                fill: false,
            }, {
                data: tableData[1],
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
    let temperature = [];
    let humidity = [];
    let dates = [];

    for(let row of data) {
        temperature.push(row.temperature);
        humidity.push(row.humidity);
        dates.push(convertTimeStampToString(row.timeStamp));
    }
    return [temperature,humidity,dates];
}