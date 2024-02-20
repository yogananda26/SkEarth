
const params = window.location.search; 
const container_chat = document.querySelector(".comment-replys-details");
const commentID = new URLSearchParams(params).get('commentID'); 
var token = localStorage.getItem('token');
const temp_div = document.createElement("div");

const result = async() => {
    try{ 
        axios.get(`/api/v1/message/comment/${commentID}`,{
            headers : { 
                'Authorization' : 'Bearer ' + token ,
            }
        })
        .then(({data})=>{ 
            const array = data.reply; 
            console.log(array);
            container_chat.innerHTML = array.map(({comment, replyBy, createdAt})=>{
                return ` <div class="comment-replys-unit">
                            <div class="comment-replys-unit-left">
                                <p class="username-reply"> ${replyBy}</p>
                                <p class="user-reply-content">
                                    ${comment}
                                </p>
                                 <p class="hastag">#youdeservethis</p>
                                 <h6 style="margin-top: 5px;">${timeDiff(new Date(createdAt).getTime(), new Date().getTime())} ago</h6>
                            </div>
                            <div class="comment-replys-unit-right">
                            <button><img src="like.png" alt="" /></button>
                            </div>
                        </div>`
            }).reverse().join('')
        })

    }catch(error){
        console.log("please input login first");
    }

}

result();

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


