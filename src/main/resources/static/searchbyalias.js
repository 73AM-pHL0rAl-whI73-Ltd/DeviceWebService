

function searchByAlias(){
    let inSearch = document.getElementById('inputSearch').value;
    path = `https://devicewebapi.herokuapp.com/measurements/latest/alias/${inSearch}/100`;

    sendToWebsocket(inSearch);
    inputAlias = inSearch;

    fetch(path)
        .then(res => res.json())
        .then(data => {
            createChart(data);
            displayTableWithDeviceAlias(data);
        })
}