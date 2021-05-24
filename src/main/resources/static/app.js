//creates websocket
var ws;
ws = new WebSocket('wss://devicewebservice.herokuapp.com/');

let tabledata = document.getElementById('tabledata');
let search = document.getElementById('search');

var alias = "";
var path = ``;

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

    console.log(alias);

    if(alias === "") {
        //Gets data from database from API to print values
        fetch("https://devicewebapi.herokuapp.com/measurements")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                createChart(data);
                // clear previous table data
                fetchDeviceAlias(data);


            })
    } else {
        fetch(path)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                createChart(data);
                // clear previous table data
                fetchDeviceAlias(data);
            })
    }
}

function fetchDeviceAlias(data) {
    tabledata.innerHTML = "";
    for (let row of data) {
        fetch(`https://devicewebapi.herokuapp.com/devices/id/${row.deviceId}`)
            .then(res => res.json())
            .then(data => {
                row['deviceAlias'] = data.deviceAlias;
                fillTable(row);
            })
    }
}

function fillTable(data) {

        //Converts unixtimestamp to time
        var unixTimestamp = data.timeStamp;
        var options = { year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric'};
        var date = new Date(unixTimestamp * 1000).toLocaleDateString("en-US", options);

        //Fills table on htmlpage
        tabledata.innerHTML += `</tr><tr><td>${data.deviceAlias}</td><td>${data.deviceId}</td><td>${date}</td><td>${data.temperature}</td><td>${data.humidity}</td>`;
}

    function searchByAlias(){
        var inSearch = document.getElementById('inputSearch').value;
        path = `https://devicewebapi.herokuapp.com/measurements/latest/alias/${inSearch}/100`;

        // send alias to webservice
        ws.send(inSearch);
        alias = inSearch;
        console.log(alias);

        //post(path);

        fetch(path)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                createChart(data);
                fillTable(data);
                // clear previous table data
                //tabledata.innerHTML = "";

                //tabledata.innerHTML += `<tr><td>${row.deviceId}</td><td>${date}</td><td>${row.temperature}</td><td>${row.humidity}</td>`;
            })
        return false;
    }

    function post(path, method='post'){
        search.method = method;
        search.action = path;
        search.submit();
    }

