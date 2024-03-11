const level = document.getElementById("level");
const category = document.getElementById("category");
const input = document.getElementById("input_1");
const region = document.getElementById("region_input");
const levelcontainer = document.getElementById("uv_level_content");
const toggle = document.getElementById("uv_level_content");
const leftheader = document.getElementById("uv_level_content_left");
const forecast = document.getElementById("forecast-non-title");
const regionjumbotron = document.getElementById("region");


window.onload = async function () {
    getLocation();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
    
        }
    }
    async function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);

        const dataq = await axios.post("/api/v1/weather/city",
            {
                latitude: latitude,
                longitude: longitude
            })
        var cityCurrent = dataq.data[0].name;
        const data1 = await axios.post("/api/v1/uv-index",
            {
                city_name: cityCurrent
            })
        
        levelcontainer.classList.toggle("show");
        regionjumbotron.innerHTML = cityCurrent;
        displayCategory(data1.data);
        displayForecast(data1.data);
        }
}

input.addEventListener("submit", async (e) => {
    toggle.classList.toggle('show');
    e.preventDefault();

    try{
        const data1 = await axios.post("/api/v1/uv-index",
        {
            city_name: region.value
        });
    displayCategory(data1.data);
    displayForecast(data1.data);
    }catch(e) {
        console.log(e);
    }

})

function displayForecast(data){
    const forecast_container = document.getElementById("forecast");
    const uvforecast = data.uv_forecast_2_days;
    var forecast_category = "";
    var forecast_color = "";

    forecast_container.classList.toggle("show");

    temp2 = document.getElementById("forecast-non-title");
    for (let index = 0; index < 24; index++) {
        let unix_timestamp = uvforecast[index].dt;

        var date = new Date(unix_timestamp * 1000);
    
        var hours = date.getHours();
    
        var minutes = "0" + date.getMinutes();
    
        var seconds = "0" + date.getSeconds();
    
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        if(uvforecast[index].uvi < 3){
            forecast_category = "Low";
            forecast_color = "rgb(123, 183, 51)";
        }
        else if(uvforecast[index].uvi < 6){
            forecast_category = "Moderate";
            forecast_color = "rgb(246, 178, 10)";
        }
        else if(uvforecast[index].uvi < 8){
            forecast_category = "High";
            forecast_color = "rgb(239, 134, 21)";
        }
        else if(uvforecast[index].uvi < 11){
            forecast_category = "Very High";
            forecast_color = "rgb(224, 64, 41)";
        }
        else{
            forecast_category = "Extreme";
            forecast_color = "rgb(168, 95, 154)"
        }

        temp2.innerHTML += 
        `<div class="forecast-unit" id="forecast-unit${index}">
        <p class="time">${formattedTime}:00</p>
        <p class="category">${forecast_category}</p>
        <p class="uvi">${uvforecast[index].uvi}</p>
        </div>`

        let forecastcolor = document.getElementById(`forecast-unit${index}`);
        forecastcolor.style.backgroundColor = `${forecast_color}`;
    }
}

function displayCategory(data){
    currentuv = data.uv_current;
    level.innerText = currentuv;

    if(currentuv < 3){
        levelcontainer.style.backgroundColor = "rgb(123, 183, 51)";
        leftheader.style.backgroundColor = "rgb(80, 122, 29)";
        category.innerText = "Low";
    }
    else if(currentuv < 6){
        levelcontainer.style.backgroundColor = "rgb(246, 178, 10)";
        leftheader.style.backgroundColor = "rgb(212, 163, 42)";
        category.innerText = "Moderate";
    }
    else if(currentuv < 8){
        levelcontainer.style.backgroundColor = "rgb(239, 134, 21)";
        leftheader.style.backgroundColor = "rgb(207, 118, 21)";
        category.innerText = "High";
    }
    else if(currentuv < 11){
        levelcontainer.style.backgroundColor = "rgb(224, 64, 41)";
        leftheader.style.backgroundColor = "rgb(177, 42, 22)";
        category.innerText = "Very High";
    }
    else{
        levelcontainer.style.backgroundColor = "rgb(168, 95, 154)";
        leftheader.style.backgroundColor = "rgb(149, 42, 128)";
        category.innerText = "Extreme";
    }
}
