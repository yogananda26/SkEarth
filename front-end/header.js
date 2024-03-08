// const { validate } = require("../model/User");
const validation = document.getElementById("user-button");

//drop down list dan inactivate drop down list ketika kita menekan drop down button yang lainnya 
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

function login(){
    if(!(localStorage.getItem('token'))){
        window.location.href = "../login/login.html"; 
    }
}

//inactivate drop down ketika kita menekan diluar drop down button
window.onclick = function(event) {
    if (!event.target.matches('dropbtn')) {
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
    .then(({data})=>{
        user_document.innerHTML = data[0].name;
    })
    .catch((e)=>{
        alert(error.response.data.msg);
        user_document.innerHTML = 'User';
    })
}
resolve();

function menuFunction(bigcenter){
    if (document.getElementById(bigcenter).classList.contains('show')) {
        document.getElementById(bigcenter).classList.remove('show');
        var dropdown = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdown.length; i++) {
            var openDropdown = dropdown[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        document.getElementById(bigcenter).onfocus = false
        // document.getElementById('burger').style.background = "url('../../front-end/property/header-asset/menu-icon.png')";
    }
    else{
        document.getElementById(bigcenter).classList.toggle("show");
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.big-center') && !event.target.matches('.dropbtn')) {
        var dropdown = document.getElementsByClassName("center-header");
        var i;
        for (i = 0; i < dropdown.length; i++) {
            var openDropdown = dropdown[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}