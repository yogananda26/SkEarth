
const formDOM = document.querySelector('.form');
const email_inputDOM = document.querySelector('.email-input');
const password_inputDOM = document.querySelector('.password-input');
const testing = document.getElementById('testing');


formDOM.addEventListener('submit', async(e)=>{ 
    e.preventDefault();
    // this is accessin the value of inputted thing
    const email = email_inputDOM.value; 
    const password = password_inputDOM.value; 
    try{ 
        // trying to log in
       const {data} = await axios.post('/auth/login',{
        email : email,
        password : password
       })
       email_inputDOM.value = ''
       password_inputDOM.value = ''
       localStorage.setItem('token', data.token);
       window.location.href = '/homepage/homepage.html'
    }catch(e){ 
        localStorage.removeItem('token');
        testing.textContent = e.response.data.msg
    }
})


