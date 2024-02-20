const input_bio = document.getElementById('bio-text'); 
const user_name = document.getElementById('user-name'); 
const form_input = document.querySelector('.form-input');
var token = localStorage.getItem("token");
const params = window.location.search
const id = new URLSearchParams(params).get('UserID');


// for determine the user
const button_edit_user = document.getElementById('button_edit_user'); 
const modal = document.getElementById('exampleModal')
button_edit_user.style.visibility = "hidden";

const show_message = async()=>{ 
  axios.get(`/api/v1/message/unique/${id}`,{
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(({data})=>{
    console.log(data);
  })
} 

show_message();

// this is for setting the placeholder
const get = async()=>{
  axios.get("/user", {
      headers: {
          'Authorization': 'Bearer ' + token
      }
  })  
  .then(({data})=>{
      if(data[0]._id == id){
        button_edit_user.style.visibility = "visible";
      }
      console.log(id);
      input_bio.placeholder = data[0].bio;
      user_name.placeholder = data[0].name;
  })
  .catch((e)=>{
      console.log(e)
  })
}
get();
// this is for submit the updated content
form_input.addEventListener('submit', async(e)=>{
  // this is for inputting the bio
  e.preventDefault();
  axios.patch("/user/setting",{
    // body content
    'new_name' : user_name.value,
    'new_bio' : input_bio.value
  },
  {
    // setting the headers
    headers : { 
      'Authorization': 'Bearer ' + token
  }
  })
  window.location.href = `/chat-page/user_profile.html?UserID=${id}`; 
  modal.visibility = "hidden";
})

// this is for displaying the user message that he or her ever made 

