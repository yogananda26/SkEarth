// this is for main site 
const container = document.getElementById('main-row');
var token = localStorage.getItem("token");
const params = window.location.search
const id = new URLSearchParams(params).get('UserID');

// this for settting the user profile
const button_user_profile = document.getElementById("user-button-setting");

// this for placeholder in user setting profile
const placeholder_name = document.getElementById('recipient-name');
const placeholder_bio = document.getElementById('message-text');

// 
const user_current_name = document.getElementById('current-user-profile'); 
const user_current_bio = document.getElementById('current-user-bio') 



// this is for take the user form 
const form_input = document.querySelector('.user-update-profile');
const modal = document.getElementById('exModal');

const input_user_follower = async()=>{ 
    // this is for inputing the user follower
    console.log("this is for following");
};

const fetch_all_comment = ()=>{ 
    // fetching all user comment that ever made before
    axios.get(`/api/v1/message/unique/${id}`,{
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(({data})=>{ 
        container.innerHTML = data.map(({_id, content, updatedAt, createdBy})=>{ 
            return  `<div class="col-2 d-flex justify-content-center" style="height: 10vh; width: 6vw;">
            <div class="circle">
            </div>
            </div>
            <div class="col-10 mb-5">
                <div class="profil-name">
                    <h5 class="text-light d-block">${createdBy}</h3>
                </div>
                <div class="card rounded-4 " style="position: relative; flex-direction: row; padding-right: none;">
                    <div class="rounded-4 d-flex justify-content-between px-xxl-3 px-xl-3 px-lg-3 px-md-3 px-sm-2 " style="padding-right: none;">
                        <div class="px-xxl-3 px-xl-3 px-lg-3 px-md-3 px-sm-2 px-3 py-3">
                            <p class="card-title">${content}</p>
                            <div class="img-container" id=${_id}>
                            </div>
                            <p class="text-secondary mb-0">#youdeservethis</p>
                            <h6 style="margin-top: 5px;">${timeDiff(new Date(updatedAt).getTime(), new Date().getTime())} ago</h6>
                        </div>
                    </div>
                    <div class="d-flex gap-3 mt-4 px-xxl-3 px-xl-3 px-lg-3 px-md-3 px-sm-2 px-3 py-3 align-items-center" style="flex-direction: row;">
                        <a href="#"><img src="../property/comment-asset/like.png" alt="" style="height:30px;" class="img-icon "></a>
                        <a href="../comment-page/more_comment.html?commentID=${_id}"><img src="../property/comment-asset/comment-icon-1024x964-julk98bl.png" alt="" style="height: 28px;" class="img-icon"></a>
                        <a href="#"> <img style="height: 30px;" src="../property/comment-asset/kisspng-computer-icons-share-icon-sharing-symbol-share-5ac0b95e8abc13.8486960415225798065683.jpg" alt="" class="img-icon"></a>
                    </div>
                </div>
            </div>
        `
        }).reverse().join(' ');

        const container_img = document.querySelectorAll('.img-container'); 
        container_img.forEach((item)=>{
            var comment_id = item.getAttribute('id'); 
            try{
                axios.get(`/api/v1/message/img/${comment_id}`,{
                    headers : { 
                        'Authorization' : 'Bearer ' + token ,
                    }
                }).then((result)=>{
                    
                    const array = result.data.map(({filename, metadata})=>{
                        return filename, metadata;
                    })
                    array.forEach(({name, type}) => {
                        const types = type.split('/')[0];
                        if(types === 'image'){
                            var elem = document.createElement("img");
                            elem.setAttribute("src", `http://localhost:2000/api/v1/message/img/render/${name}`);
                            elem.setAttribute("height", "auto");
                            elem.setAttribute("width", "60%");
                            elem.setAttribute('style',"object-fit: cover")
                            elem.setAttribute('style',"object-position: center")
                            item.appendChild(elem);
                        };
                        if(types === 'video'){
                            var elem = document.createElement("video");
                            elem.setAttribute("src", `http://localhost:2000/api/v1/message/img/render/${name}`);
                            elem.setAttribute("height", "auto");
                            elem.setAttribute("width", "60%");
                            elem.setAttribute("controls", true);
                            item.appendChild(elem);
                        };
                    });
                }); 
            }catch(e){
                console.log(e)
            };
        });

        console.log(data);
    })
};
fetch_all_comment();

// this is for setting the current user profile
const get = async()=>{
    axios.get(`/user?UserID=${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })  
    .then(({data})=>{
        if(data.user_registered.UserID == id){
          button_user_profile.innerHTML = "Setting Profile"; 
          placeholder_name.placeholder = data.result[0].name;
          placeholder_bio.placeholder = data.result[0].bio;
        }
        else{
            button_user_profile.setAttribute('onclick', "input_user_follower()")
            button_user_profile.removeAttribute('data-bs-toggle'); 
            button_user_profile.removeAttribute('data-bs-target');
        }
        user_current_name.innerHTML =  data.result[0].name; 
        user_current_bio.innerHTML = data.result[0].bio; 
    })
    .catch((e)=>{
        console.log(e)
    })
}
get();

// this is for updating the username and bio
form_input.addEventListener('submit', async(e)=>{
    // this is for inputting the bio
    const form = new FormData(form_input);
    e.preventDefault();
    axios.patch("/user/setting",form,
    {
      // setting the headers
      headers : { 
        'Authorization': 'Bearer ' + token, 
        'Content-type' : "multipart/form-data", 
    }
    })
    window.location.href = `/newuser-page/new_user.html?UserID=${id}`; 
    modal.visibility = "hidden";
})



// this is for calculating the time of that massage 
const timeDiff = ( tstart, tend ) => {
    var diff = Math.floor((tend - tstart) / 1000), units = [
      { d: 60, l: "seconds" },
      { d: 60, l: "minutes" },
      { d: 24, l: "hours" },
      { d: 7, l: "days" }, 
      { d: 4, l: "months"}
    ];
  
    var s = '';
    for (var i = 0; i < units.length; ++i) {
        if((diff%units[i].d)==0)return s; 
        s = (diff % units[i].d) + " " + units[i].l + " " + s;
        diff = Math.floor(diff / units[i].d);
        
    };
    return s;
}
