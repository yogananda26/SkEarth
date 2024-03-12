// const { validate } = require("../model/User");
const validation = document.getElementById("user-button");
validation.href = `/login/login.html`
const user_profile = document.getElementById('user-profile');
const user_dropdown = document.querySelector('userprofile-dropdown');
const user_status = document.getElementById('user-button');
//drop down list dan inactivate drop down list ketika kita menekan drop down button yang lainnya 


function logout(){
    window.location.href = "../login/login.html"; 
}


function dropFunction(dropdownlist){
        document.getElementById(dropdownlist).classList.toggle("show");
        if(dropdownlist == "dropdown-list1"){
            var list2 = document.getElementById("dropdown-list2");
            var userdropdown = document.getElementById("dropdown-listuser");
            if (list2.classList.contains('show')) {
                list2.classList.remove('show');
            }
            if (userdropdown.classList.contains('show')) {
                userdropdown.classList.remove('show');
            }
        }
        else{
            var list1 = document.getElementById("dropdown-list1");
            var userdropdown = document.getElementById("dropdown-listuser");
            if (list1.classList.contains('show')) {
                list1.classList.remove('show');
            }
            if (userdropdown.classList.contains('show')) {
                userdropdown.classList.remove('show');
            }
        }
}

function dropFunctionUser(dropdownlist){
        if(!localStorage.getItem('token')){
            logout();
        }
        else{
            document.getElementById(dropdownlist).classList.toggle("show");
            var list1 = document.getElementById("dropdown-list1");
            var list2 = document.getElementById("dropdown-list2");
                if (list1.classList.contains('show')) {
                    list1.classList.remove('show');
                }
                if (list2.classList.contains('show')) {
                    list2.classList.remove('show');
                }
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
    axios.get("/user/registered", {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })  
    .then(({data})=>{
        user_document.innerHTML = data[0].name;
        user_profile.href = `/newuser-page/new_user.html?UserID=${data[0]._id}`; 
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