function dropFunction(dropdownlist){
    document.getElementById(dropdownlist).classList.toggle("show");
    document.getElementById("content-dropbtn").style.backgroundColor = "white";
    document.getElementById("content-dropbtn").style.color = "rgb(32, 50, 67)";

    if (dropdownlist.classList.contains('show')) {
        document.getElementById("content-dropbtn").style.backgroundColor = "transparent";
        document.getElementById("content-dropbtn").style.color = "white";
        dropdownlist.classList.remove('show');
    }
}

window.onclick = function(event) {
    if (!event.target.matches('content-dropbtn')) {
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