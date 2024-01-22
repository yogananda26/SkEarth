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

//inactivate drop down ketika kita menekan diluar drop down button
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