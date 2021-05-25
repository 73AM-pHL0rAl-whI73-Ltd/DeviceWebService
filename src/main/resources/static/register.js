let con = document.getElementById('connection_s');
let inputAlias = document.getElementById('deviceAlias');

// generates a new device from entered device alias and prints device UUID to screen
function generateCon(){

    fetch(`https://devicewebapi.herokuapp.com/devices/new/${inputAlias.value}`, {method : 'post'})
        .then(res => res.json())
        .then(data => {
                // get device UUID
                var id = data.deviceId;

                //print on htmlpage
                con.innerHTML = id;
        })
}
