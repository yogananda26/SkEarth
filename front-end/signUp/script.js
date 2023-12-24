const formDOM = document.getElementById('form1');
const fullnameDOM = document.getElementById('signUp-full-nametexbox'); 
const usernameDOM = document.getElementById('signUp-usernametextbox'); 
const emailDOM = document.getElementById('signUp-emailtextbox') ; 
const ageDOM = document.getElementById('signUp-agetextbox'); 
const passwordDOM = document.getElementById('signUp-passwordtextbox'); 
const confirm_passDOM = document.getElementById('signUp-confirm-passwordtextbox');

formDOM.addEventListener("submit", async(e)=>{
    e.preventDefault();
    if(passwordDOM.value != confirm_passDOM.value){
        passwordDOM.value = ''
        confirm_passDOM.value = ''
        alert("Please correct your password, Your password is not match"); 
        return; 
    }
    try{ 
        const {data} = await axios.post("/auth/SignUp",{ 
            name :  usernameDOM.value,
            email : emailDOM.value,
            password : passwordDOM.value
        })
        localStorage.setItem('token', data.token); 
        alert('successfully register your id');
        window.location.href = '/homepage/homepage.html'; 
    }catch(e){ 
        localStorage.removeItem('token');
        alert(e.response.data.msg);
        window.location.href = '/page/testing.html';
    }
})


