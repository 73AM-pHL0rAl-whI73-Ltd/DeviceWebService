//creates websocket
let ws = new WebSocket('wss://devicewebservice.herokuapp.com/');
let inputAlias = "";
let path = ``;
let searchinputfield = document.getElementById('inputSearch');
let measurements_table = document.getElementById('measurements_table');
let searchbutton = document.getElementById("searchbutton");

searchinputfield.addEventListener('keyup', function(event) {
    if (event.code == 'Enter') {
        searchByAlias();
    }
});

searchbutton.addEventListener('click',searchByAlias);

// updates table and charts when loading page
updateTable();

// send deviceAlias to webservice
function sendToWebsocket(deviceAlias) {
    let json = JSON.stringify({
        "deviceAlias":deviceAlias
    });

    if(ws.readyState !== ws.OPEN)
        ws.OPEN;
    ws.send(json)
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
        fetchMeasurementsAndUpdateTable("https://devicewebapi.herokuapp.com/measurements/latest/50");
    else // use path to get messages from subscribed device
        fetchMeasurementsAndUpdateTable(path);
}

function fetchMeasurementsAndUpdateTable(path){
    fetch(path)
        .then(res => res.json())
        .then(async data => {
            createChart(data);
            measurements_table.innerHTML = "";
            for (let row of data) {
                let response = await fetch(`https://devicewebapi.herokuapp.com/devices/id/${row.deviceId}`);
                let jsonresponse = await response.json();
                row['deviceAlias'] = jsonresponse.deviceAlias;
                fillTableRow(row);
            }
        })
        }
//Fills row on htmlpage table
function fillTableRow(row) {
    measurements_table.innerHTML += `</tr><tr>
                    <td>${row.deviceAlias}</td>
                    <td>${row.deviceId}</td>
                    <td>${convertTimeStampToString(row.timeStamp)}</td>
                    <td>${row.temperature}</td>
                    <td>${row.humidity}</td>`;
}

//Converts unixtimestamp to time
function convertTimeStampToString(timeStamp) {
    let unixTimestamp = timeStamp;
    let options = { year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(unixTimestamp * 1000).toLocaleDateString("sv-SE", options);
}
