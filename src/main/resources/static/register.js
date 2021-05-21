let con = document.getElementById('connection_s');
let generate = document.getElementById('generate');

function generateCon(){
    fetch("https://devicewebapi.herokuapp.com/")
        .then(res => res.json())
        .then(data => {

                //print on htmlpage
                con.innerHTML += "";
                con.innerHTML += {deviceId};
        })
}
