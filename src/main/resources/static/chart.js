
// gets canvas element
let ctx = document.getElementById('line-chart').getContext('2d');

// creates and updates canvas chart
function createChart(data) {

    // gets data ranges from json array
    let datatemperatures = getTemperature(data);
    let datahumidities = getHumidities(data);
    let datadates = getDates(data);

    // creates chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: datadates,
            datasets: [{
                data: datatemperatures,
                label: "Temperature",
                borderColor: "#d79763",
                backgroundColor: "#e3944d",
                fill: false,
            }, {
                data: datahumidities,
                label: "Humidity",
                borderColor: "#5cb2e7",
                backgroundColor: "#228ae3",
                fill: false,
            }
            ]
        },
    });
}

function getTemperature(data) {

    let temperatures = [];

    for(let row of data) {
        temperatures.push(row.temperature);
    }

    return temperatures;
}
function getHumidities(data) {

    let humidities = [];

    for(row of data) {
        humidities.push(row.humidity);
    }
    return humidities;
}
function getDates(data) {
    let dates = [];

    for(let row of data) {
        dates.push(convertTimeStampToString(row.timeStamp));
        //dates.push(toUtc(row.timeStamp));
    }
    return dates;
}