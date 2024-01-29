const container = document.querySelector(".container"); 
const params = window.location.search; 
const commentID = new URLSearchParams(params).get('commentID')


const result = async() => {
    try{ 
        await axios.get(`/api/v1/message/comment/${commentID}`)
        .then(({data})=>{ 
            console.log(data);
        })
    }catch(error){
        console.log("please input login first")
    }
}

result();
