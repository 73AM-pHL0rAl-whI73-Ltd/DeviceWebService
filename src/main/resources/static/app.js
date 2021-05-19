var ws;
ws = new WebSocket('ws://localhost:8080/test');

ws.onmessage = function (){

    let tabledata = document.getElementById('tabledata')

//Gets data from database from API to print values
    fetch("https://devicewebapi.herokuapp.com/measurements")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for(let row of data) {

                //Converts unixtimestamp to time
                var unixTimestamp = row.timeStamp;
                var date = new Date(unixTimestamp*1000);

                //Fills table on htmlpage
                tabledata.innerHTML += `<tr><td>${row.deviceId}</td><td>${date}</td><td>${row.temperature}</td><td>${row.humidity}</td>`    }
        })
}

ws.onopen = function (){
    let tabledata = document.getElementById('tabledata')

//Gets data from database from API to print values
    fetch("https://devicewebapi.herokuapp.com/measurements")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for(let row of data) {

                //Converts unixtimestamp to time
                var unixTimestamp = row.timeStamp;
                var date = new Date(unixTimestamp*1000);

                //Fills table on htmlpage
                tabledata.innerHTML += `<tr><td>${row.deviceId}</td><td>${date}</td><td>${row.temperature}</td><td>${row.humidity}</td>`    }
        })
}
