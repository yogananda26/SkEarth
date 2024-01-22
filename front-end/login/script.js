
const formDOM = document.querySelector('.container');
const email_inputDOM = document.getElementById('input-text-email');
const password_inputDOM = document.getElementById('input-text-password');
const testing = document.getElementById('testing');

console.log("im in")

formDOM.addEventListener('submit', async(e)=>{ 
    e.preventDefault();
    // this is accessin the value of inputted thing
    const email = email_inputDOM.value; 
    const password = password_inputDOM.value; 
    try{ 
        // trying to log in
       const {data} = await axios.post('/auth/Login',{
        email : email,
        password : password
       })
       email_inputDOM.value = ''
       password_inputDOM.value = ''
       localStorage.setItem('token', data.token);
       window.location.href = '/homepage/homepage.html'
    }catch(e){ 
        localStorage.removeItem('token');
        alert(e.response.data.msg); 
    }
})


