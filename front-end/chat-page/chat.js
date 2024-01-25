const tweet_container = document.getElementById('conten'); 
const top_5_user = document.querySelector(".top-5-user")


// this is for extracting thing from database
const value = async() => {
    try {
        axios.get('/api/v1/message', {
            headers : { 
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        }).then(({data})=>{
            // this is for assign the text

            tweet_container.innerHTML = data.map(({content, createdBy})=>{ 
                // this is for content thing
                return ` <div id="chat-content-container" style="margin: 37px;">
                <div id="header-content" style="display: flex; flex-direction: row;">
                    <div id="icon-user" style="height:46px;width: 46px; background-color: black; border-radius: 100px;
                    margin-right: 7px;"></div>
                    <div id="user-name" style="height: 46px; width: auto; display: flex;flex-direction:column;">
                        <h4>This is would be your name baby</h4>
                        <span>#${createdBy}</span>
                    </div>
                </div>
                <div id="user-tweet" style="height: auto; width: auto; margin: 10px 0px 0px 53px">
                    <p>${content}</p>
                    <h5 style="margin-top: 5px;">6h ago</h5>
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

                        <button style="border:none; background: none;"> 
                            <div id="other-comment" style="display: flex; flex-direction: row;  width: 80px;">
                                <div>
                                    <img src="./comment-icon-1024x964-julk98bl.png" alt="" style="height: 20px; width: 20px;">
                                </div>
                                <span style="margin: 2px 0px 0px 3px;">Comment</span>
                            </div>
                        </button>

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
            }).join(' ');
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
                                    <a href="./user_profile.html?UserID=${_id}">
                                        <h4>${name}</h4>
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

