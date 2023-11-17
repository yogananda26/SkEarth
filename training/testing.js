
// this is for adding the event into button
document.getElementById('btnInput').addEventListener('click', ()=>{
    const valueUser = document.getElementById('inputUser').value;
    const valueNum = document.getElementById('inputNum').value;
    const list = document.getElementById('unlist');
    // this is for connecting into API
    const API_KEY = 'e46690909f598a98eae95c84a266ab48'
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${valueUser}&limit=${1}&appid=${API_KEY}`;


    // this is for fetching the thing
    let link = new URL(url);
    fetch(link)
        .then(resp =>{ 
            if(!resp.ok)throw new Error("this error thing");
            return resp.json();
        })
        .then((obj)=>{ 
            // this is for putting the object into HTML 
            obj.map(({lat, lon}) =>{ 
                const history_country = `https://history.openweathermap.org/data/2.5/aggregated/month?month=${valueNum}&lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
                const data_ = new URL(history_country);
                // this is for reading the obj of country
                fetch(data_)
                    .then(resp =>{ 
                        if(!resp.ok)throw new Error("error in reading in history country");
                        return resp.json();
                    })
                    .then(obj_sec =>{ 
                        console.log(obj_sec);
                    })
                    .catch(console.warn); 
            })
            obj.map(({lat, lon})=>{ 
                const current_country = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`; 
                const data1_ = new URL(current_country);

                fetch(data1_)
                    .then((resp)=>{ 
                        if(!resp.ok)throw new Error('error in current_side');
                        return resp.json();
                    })
                    .then(obj_curr=>{ 
                        console.log('this is current side', obj_curr);
                    })
                    .catch(console.warn);
            })
            obj.map(({lat, lon})=>{ 
                const current_country = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${API_KEY}`; 
                const data2_ = new URL(current_country);

                fetch(data2_)
                    .then((resp)=>{ 
                        if(!resp.ok)throw new Error('error in current_side');
                        return resp.json();
                    })
                    .then(obj_curr=>{ 
                        console.log('this is climate side', obj_curr);
                    })
                    .catch(console.warn);
            })
            
            console.log('this is the goe', obj);
            list.innerHTML = obj.map(({name, lat, lon, country}) =>{
                            return `<div class="col" data-id="${country}">
                                    <p>this is your name location : ${name}</p>
                                    <p>this is your latitude : ${lat}</p>
                                    <p>this is your longitude : ${lon}</p>
                                </div>
                            `
                            }).join('');
                        
        })
        .catch(console.warn);
});



