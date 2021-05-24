

function searchByAlias(){
    var inSearch = document.getElementById('inputSearch').value;
    var path = `https://devicewebapi.herokuapp.com/measurements/latest/alias/${inSearch}/100`;

    ws.send(inSearch);
    alias = inSearch;

    //post(path);

    fetch(path)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            createChart(data);
            var unixTimestamp = row.timeStamp;
            var date = new Date(unixTimestamp*1000);
            // clear previous table data
            tabledata.innerHTML = "";

            tabledata.innerHTML += `<tr><td>${row.deviceId}</td><td>${date}</td><td>${row.temperature}</td><td>${row.humidity}</td>`;
        })
    return false;
}