//creates websocket
var ws;
ws = new WebSocket('wss://devicewebservice.herokuapp.com/');

var alias = "";
var path = ``;

let tabledata = document.getElementById('tabledata');
let search = document.getElementById('search');
let searchbutton = document.getElementById("searchbutton");
searchbutton.addEventListener('click',searchByAlias);

// updates table and charts when loading page
updateTable();

// send deviceAlias to webservice
function sendToWebsocket(deviceAlias) {
    var json = JSON.stringify({
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
    if(inputAlias === "") {
        //Gets data from database from API to print values
        fetch("https://devicewebapi.herokuapp.com/measurements")
            .then(res => res.json())
            .then(data => {
                createChart(data);
                displayTableWithDeviceAlias(data);


            })
    } else { // use path to get messages from subscribed device
        fetch(path)
            .then(res => res.json())
            .then(data => {
                createChart(data);
                displayTableWithDeviceAlias(data);
            })
    }
}

async function displayTableWithDeviceAlias(data) {
    tabledata.innerHTML = "";
    for (let row of data) {
        response = await fetch(`https://devicewebapi.herokuapp.com/devices/id/${row.deviceId}`);
        jsonresponse = await response.json();
        row['deviceAlias'] = jsonresponse.deviceAlias;
        fillTableRow(row);
    }
}
//Fills row on htmlpage table
function fillTableRow(data) {
        tabledata.innerHTML += `</tr><tr>
                    <td>${data.deviceAlias}</td>
                    <td>${data.deviceId}</td>
                    <td>${convertTimeStampToString(data.timeStamp)}</td>
                    <td>${data.temperature}</td>
                    <td>${data.humidity}</td>`;
}
//Converts unixtimestamp to time
function convertTimeStampToString(timeStamp) {
    var unixTimestamp = timeStamp;
    var options = { year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", options);
}
