const funct = async(req, res) =>{
    try{
        const data1 = await axios.get("/api/v1/news");
        const result = data1.data.data.articles;

        var temp2 = document.getElementById("grid-container"); 
        result.forEach(element => {
            const currenttime = String(element.publishedAt);
            console.log(currenttime);
            const currentttime = currenttime.substring(0,10);
            console.log(currentttime);
            temp2.innerHTML += 
            `<div class="grid-item">
                <a href="${element.url}" class="content-unit">
                    <div class="news-detail">
                        <p class="published-date">${currentttime}</p>
                    </div>
                    <p class="content-title">${element.title}</p>
                    <img src="${element.urlToImage}" alt="" class="content-image">
                    <p class="description">${element.description}</p>
                </a>
            </div>`
        });
            
    }catch(e) {
        console.log(e);
    }
}

funct();