//creates websocket
let ws = new WebSocket('wss://devicewebservice.herokuapp.com/');
let inputAlias = "";
let path = ``;
let measurements_table = document.getElementById('measurements_table');
let searchbutton = document.getElementById("searchbutton");
searchbutton.addEventListener('click',searchByAlias);

// updates table and charts when loading page
updateTable();

// send deviceAlias to webservice
function sendToWebsocket(deviceAlias) {
    let json = JSON.stringify({
        "deviceAlias":deviceAlias
    });
    ws.send(json);
}

//updates tables when new message is recieved.
ws.onmessage = function (event){
    inputAlias = event.data;
    updateTable();
}

//fetches message data from api and triggers sequence for displaying data
function updateTable() {
    // if not subscribed to a device
    if(inputAlias === "")
        fetchMeasurements("https://devicewebapi.herokuapp.com/measurements/latest/50");
    else // use path to get messages from subscribed device
        fetchMeasurements(path);
}

function fetchMeasurements(path){
    fetch(path)
        .then(res => res.json())
        .then(data => {
            createChart(data);
            displayTableWithDeviceAlias(data);
        })
}

async function displayTableWithDeviceAlias(data) {
    measurements_table.innerHTML = "";
    for (let row of data) {
        let response = await fetch(`https://devicewebapi.herokuapp.com/devices/id/${row.deviceId}`);
        let jsonresponse = await response.json();
        row['deviceAlias'] = jsonresponse.deviceAlias;
        fillTableRow(row);
    }
}
//Fills row on htmlpage table
function fillTableRow(data) {
    measurements_table.innerHTML += `</tr><tr>
                    <td>${data.deviceAlias}</td>
                    <td>${data.deviceId}</td>
                    <td>${convertTimeStampToString(data.timeStamp)}</td>
                    <td>${data.temperature}</td>
                    <td>${data.humidity}</td>`;
}
//Converts unixtimestamp to time
function convertTimeStampToString(timeStamp) {
    let unixTimestamp = timeStamp;
    let options = { year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(unixTimestamp * 1000).toLocaleDateString("sv-SE", options);
}
