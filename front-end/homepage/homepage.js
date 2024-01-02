const user_document = document.getElementById("user-button");

const resolve = async(e)=>{
    var token = localStorage.getItem("token");
    axios.get("/user", {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })  
    .then((result)=>{
        user_document.innerText = result.data.name;
    })
    .catch((e)=>{
        user_document.innerText = 'User';
    })
}
resolve();

// console.log(localStorage.getItem('token'))
