let con = document.getElementById('connection_s');
let generate = document.getElementById('generate');
let alias = document.getElementById('deviceAlias');

function generateCon(){
    //ändra till rätt /
    fetch(`https://devicewebapi.herokuapp.com/devices/new/${alias.value}`, {method : 'post'})
        .then(res => res.json())
        .then(data => {
                console.log(data);
                var id = data.deviceId;
                console.log(id);

                //print on htmlpage
                con.innerHTML = id;
        })
}
