/*
    HTML ELEMENTS ---
        header script - included chart.js(library) script
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>

        bottom script - includes chart.js script(local file file)
            <script src="./chart.js"></script>

 */



// gets canvas element
var ctx = document.getElementById('line-chart').getContext('2d');
/*
     needs to be inserted into index.html

    <div class="container mt-5">
        <canvas id="line-chart" width="800" height="450"></canvas>
    </div>
 */

// needs to be called when fetching new messages, updates chart
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
    console.log(temperatures);
    return temperatures;
}
function getHumidities(data) {

    humidities = [];

    for(row of data) {
        humidities.push(row.humidity);
    }
    console.log(humidities);
    return humidities;
}
function getDates(data) {
    dates = [];

    for(row of data) {
        dates.push(toIso(row.timeStamp));
    }
    console.log(dates);
    return dates;
}
// converts unix timestamp to utc
function toIso(timestamp)
{
    var datetime = new Date(timestamp * 1000);
    return datetime.toUTCString();
}
