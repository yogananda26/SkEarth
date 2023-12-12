const formDOM = document.getElementById('form1');
const fullnameDOM = document.getElementsByClassName('signUp-full-nametexbox'); 
const usernameDOM = document.getElementsByClassName('signUp-usernametextbox'); 
const emailDOM = document.getElementsByClassName('signUp-emailtextbox') ; 
const ageDOM = document.getElementsByClassName('signUp-agetextbox'); 
const passwordDOM = document.getElementsByClassName('signUp-passwordtextbox'); 
const confirm_passDOM = document.getElementsByClassName('signUp-confirm-passwordtextbox');

formDOM.addEventListener("submit", async(e)=>{
    e.preventDefault();
    if(passwordDOM[0].value != confirm_passDOM[0].value){
        passwordDOM[0].value = ''
        confirm_passDOM[0].value = ''
        alert("Please correct your password, Your password is not match"); 
        return; 
    }
    try{ 
        const {data} = await axios.post("/auth/SignUp",{ 
            name :  usernameDOM[0].value,
            email : emailDOM[0].value,
            password : passwordDOM[0].value
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


