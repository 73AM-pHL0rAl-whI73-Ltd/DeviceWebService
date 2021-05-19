//creates websocket
var ws;
ws = new WebSocket('wss://devicewebservice.herokuapp.com/');

let tabledata = document.getElementById('tabledata');


//updates tables when new message is recieved.
ws.onmessage = function (){
    updateTable();
}
//updates table when connected.
ws.onopen = function (){
    updateTable();
}
//fetches data from API and puts in HTML table.
function updateTable() {
    //Gets data from database from API to print values
    fetch("https://devicewebapi.herokuapp.com/measurements")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // clear previous table data
            tabledata.innerHTML = "";

            for(let row of data) {
                //Converts unixtimestamp to time
                var unixTimestamp = row.timeStamp;
                var date = new Date(unixTimestamp*1000);

                //Fills table on htmlpage
                tabledata.innerHTML += `<tr><td>${row.deviceId}</td><td>${date}</td><td>${row.temperature}</td><td>${row.humidity}</td>`;
            }
        })
}
