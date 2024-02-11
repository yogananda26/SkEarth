const tweet_container = document.getElementById('conten'); 
const top_5_user = document.querySelector(".top-5-user")
const form_action = document.querySelector('.form_input')
var token = localStorage.getItem('token');
const input_user = document.getElementById('input-user')


// this is for extracting thing from database
const value = async() => {
    try {
        axios.get('/api/v1/message', {
            headers : { 
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        }).then(({data})=>{
            // this is for assign the text

            tweet_container.innerHTML = data.map(({content, createdBy, _id, updatedAt})=>{ 
                // this is for content thing
                return ` <div id="chat-content-container" style="margin: 37px;">
                <div id="header-content" style="display: flex; flex-direction: row;">
                    <div id="icon-user" style="height:46px;width: 46px; background-color: black; border-radius: 100px;
                    margin-right: 7px;"></div>
                    <div id="user-name" style="height: 46px; width: auto; display: flex;flex-direction:column;">
                        <h5>This is would be your name baby</h5>
                        <p>#${createdBy}<p>
                    </div>
                </div>
                <div id="user-tweet" style="height: auto; width: auto; margin: 10px 0px 0px 53px">
                    <p  style="white-space: pre-wrap;">${content}</p>
                    <h6 style="margin-top: 5px;">${timeDiff(new Date(updatedAt).getTime(), new Date().getTime())} ago</h6>
                </div>
                <div id="other-reaction" style="height: auto; width: auto; display: flex; justify-content: center; margin-top:20px">
                    <div id="content-reaction" style="height: auto; width: 300px; display: flex; justify-content: space-around;">

                    <!-- this is for like button -->

                        <button style="border:none; background: none;">
                            <div id="other-like" style="display: flex; flex-direction: row;  width: 60px;">
                                <div>
                                    <img src="./like.png" alt="" style="height: 20px; width: 20px;">
                                </div>
                                <span style="margin: 2px 0px 0px 3px;">Like</span>
                            </div>
                        </button>

                    <!-- this is for comment button -->
                        <a style="text-decoration: none; color:inherit;" href="./more_comment.html?commentID=${_id}">
                            <div id="other-comment" style="display: flex; flex-direction: row;  width: 90px;">
                                <div>
                                    <img src="./comment-icon-1024x964-julk98bl.png" alt="" style="height: 20px; width: 20px;">
                                </div>
                                <span style="margin: 2px 0px 0px 3px;">Comment</span>
                            </div>
                        </a>
                    <!-- this is for share button -->

                        <button style="border:none; background: none;">
                            <div id="other-share" style="display: flex; flex-direction: row;  width: 60px;">
                                <div>
                                    <img src="./share.png" alt="" style="height: 22px; width: 20px;">
                                </div>
                                <span style="margin: 2px 0px 0px 3px;">Share</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>` 
            }).reverse().join(' ');
        })
    } catch (error) {
        console.log(error);
    }
}
value();

const fetch_5_user = async() =>{ 
    try{ 
        axios.get('/user/all-user', {
        headers : { 
            'Authorization' : 'Bearer ' + localStorage.getItem('token')            
        }})
        .then(({data})=>{
            top_5_user.innerHTML = data.map(({name, _id})=>{ 
               return `<div id="user" style="height:auto; width:auto; display: flex; flex-direction:row; margin: 10px">
                            <div id="icon-user" style="height:46px;width: 46px; background-color: black; border-radius: 100px;
                            margin-right: 7px;"></div>
                
                                <div style="height: auto; width: auto;display: flex; justify-content: center; align-items: center;">
                                    <a style="text-decoration: none; color:inherit;" href="./user_profile.html?UserID=${_id}">
                                        <h6><strong>${name}</strong></h6>
                                    </a>
                                </div>
                        </div>` 
            }).join(' ');
        })
    }catch(e){
        console.log(e);
    }
}
fetch_5_user();

// this is for add the message

form_action.addEventListener("submit", async(e)=>{ 
    console.log("this is for testing")
    e.preventDefault();
    try{ 
        axios.post('/api/v1/message',{ 
            'content' : input_user.value
        }, 
        {
        headers : { 
                'Authorization': 'Bearer ' + token
            }
        })
        .then(()=>{
            value();
        })
    }catch(e){
        console.log(e)
    }
})
const get_user_name = async() =>{
    const {name} = axios.get('/user');
    return name
}


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
        
    }
    return s;
  }

