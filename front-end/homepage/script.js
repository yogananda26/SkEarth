const { default: axios } = require("axios");

const username = document.getElementById("user-button");


if(localStorage.getItem('token')){
    username.innerHTML = await axios.get()
}