const left_container = document.querySelector(".bottom-left");
const right_container = document.querySelector(".bottom-right");
var token = localStorage.getItem('token');
const form_input = document.querySelector(".form_input");


const fetch_control = new AbortController();

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

const value = async() => {
    const {signal} = fetch_control;
    let timer = setTimeout(() => {
        fetch_control.abort();
        console.log("Abort");
    }, 1000);  

    try {
        axios.get('/api/v1/message', {
            signal : signal, 
            headers : { 
                'Authorization' : 'Bearer ' + token ,
            }
        }).then(({data})=>{
            clearTimeout(timer);
            // this is for assign the text
            right_container.innerHTML = data.map(({content, createdBy, _id, updatedAt})=>{ 
                // this is for content thing
                return `<div class="comment-unit">
                            <div class="user-comment-identity">
                                <span class="user-comment-profile"> </span>
                                <a style="text-decoration: none; color:inherit;" href="/newuser-page/new_user.html?UserID=${createdBy}">
                                    <p class="user-comment-name">${createdBy}</p>
                                </a>
                            </div>
                            <div class="user-comment-content">
                                <div class="user-comment-content-left">
                                    <p class="user-comment-regular">
                                    ${content}
                                    </p>
                                    <!-- this is for image user -->
                                    <div class="img-container" id=${_id}>
                    
                                    </div>
                                <p class="user-comment-hastag">#youdeservethis</p>
                                <h6 style="margin-top: 5px;">${timeDiff(new Date(updatedAt).getTime(), new Date().getTime())} ago</h6>
                                </div>
    
                                <div class="user-comment-content-right">
                        
                                <!-- this is for like -->

                                <button class="like">
                                <img src="../property/comment-asset/like.png" alt="" />
                                </button>
    
                                <!-- this is for comment -->

                                <button class="comment">
                                    <a style="text-decoration: none; color:inherit;" href="/comment-page/more_comment.html?commentID=${_id}">
                                        <img src="../property/comment-asset/comment-icon-1024x964-julk98bl.png" alt="" />
                                    </a>
                                </button>
    
                                <!-- this is for share -->

                                <button class="share">
                                <img
                                    src="../property/comment-asset/kisspng-computer-icons-share-icon-sharing-symbol-share-5ac0b95e8abc13.8486960415225798065683.jpg"
                                    alt=""
                                />
                                </button>
                                </div>
                            </div>
                        </div>`
            }).reverse().join(' ');

            const container = document.querySelectorAll('.img-container'); 
            container.forEach((item)=>{
                let comment_id = item.getAttribute('id'); 
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
                                elem.setAttribute("height", "490");
                                elem.setAttribute("width", "650");
                                elem.setAttribute('style',"object-fit: cover")
                                elem.setAttribute('style',"object-position: center")
                                item.appendChild(elem);
                            };
                            if(types === 'video'){
                                var elem = document.createElement("video");
                                elem.setAttribute("src", `http://localhost:2000/api/v1/message/img/render/${name}`);
                                elem.setAttribute("height", "490");
                                elem.setAttribute("width", "650");
                                elem.setAttribute("controls", true);
                                item.appendChild(elem);
                            };
                        });
                    }); 
                }catch(e){
                    console.log(e)
                };
            });
        });
    } catch (error) {
        alert(error.response.data.msg);
    };
};

value();


const container_temp = document.createElement('div');
const fetch_5_user = async() =>{ 
    try{ 
        axios.get('/user/all-user', {
        headers : { 
            'Authorization' : 'Bearer ' + token         
        }})
        .then(({data})=>{
            container_temp.innerHTML = data.slice(0, 9).map(({name, _id})=>{ 
               return `<div class="friends-unit">
                            <span class="round-dot-friend"> </span>
                            <a style="text-decoration: none; color:inherit;" href="../newuser-page/new_user.html?UserID=${_id}">
                                <p style="color : white; "><strong>${name}</strong></p>
                            </a>
                        </div>`
            }).join(' ');
        })
    }catch(e){
        console.log(e);
    }
    left_container.appendChild(container_temp);
}
fetch_5_user();


// this is for user input
form_input.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const fd = new FormData(form_input);
    try{ 
        axios.post('/api/v1/message', fd ,{
        headers : { 
                'Authorization': 'Bearer ' + token , 
                'Content-type' : "multipart/form-data" ,
            }
        })  
        .then(()=>{
            setTimeout(() => {
                value();
            }, 2000);
        })
    }catch(e){  
        console.log(e)
    }
})


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

