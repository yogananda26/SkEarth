function dropFunction(dropdownlist){
    document.getElementById(dropdownlist).classList.toggle("show");
    if(dropdownlist == "dropdown-list1"){
        var remdropdown = document.getElementById("dropdown-list2");
        var closedropdown = remdropdown;
        if (closedropdown.classList.contains('show')) {
            closedropdown.classList.remove('show');
        }
    }
    else{
        var remdropdown = document.getElementById("dropdown-list1");
        var closedropdown = remdropdown;
        if (closedropdown.classList.contains('show')) {
            closedropdown.classList.remove('show');
        }
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdown = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdown.length; i++) {
            var openDropdown = dropdown[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

const user_document = document.getElementById('user-button')
const resolve = async(e)=>{
    var token = localStorage.getItem("token");
    axios.get("/user", {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })  
    .then((result)=>{
        user_document.innerHTML = result.data.name;
    })
    .catch((e)=>{
        user_document.innerHTML = 'User';
    })
}
resolve();