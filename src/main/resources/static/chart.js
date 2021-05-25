
// gets canvas element
var ctx = document.getElementById('line-chart').getContext('2d');

// creates and updates canvas chart
function createChart(data) {

    // gets data ranges from json array
    datatemperatures = getTemperature(data);
    datahumidities = getHumidities(data);
    datadates = getDates(data);

    // creates chart
    var myChart = new Chart(ctx, {
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

    temperatures = [];

    for(row of data) {
        temperatures.push(row.temperature);
    }

    return temperatures;
}
function getHumidities(data) {

    humidities = [];

    for(row of data) {
        humidities.push(row.humidity);
    }

    return humidities;
}
function getDates(data) {
    dates = [];

    for(row of data) {
        dates.push(convertTimeStampToString(row.timeStamp));
        //dates.push(toUtc(row.timeStamp));
    }

    return dates;
}
// converts unix timestamp to utc
function toUtc(timestamp)
{
    var datetime = new Date(timestamp * 1000);
    return datetime.toUTCString();
}
