const formDom = document.getElementById("form-input");
const city_input = document.getElementById("city-input");
const header_city = document.getElementById("header-city");
const desc_city = document.getElementById("desc-city");
const image_city = document.getElementById("image-city");
const desc_temp = document.getElementById("desc-temp");
const headerDays2 = document.getElementById("header-fores");
const headerFore2 = document.getElementById("header-fore");
const humidtitle2 = document.getElementById("humid-title");
const headWind2 = document.getElementById("head-wind");

var latitude, longitude;


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
        const dataz1 = await axios.post("/api/v1/weather/current",
            {
                city_name: cityCurrent
            })
        const dataz2 = await axios.post("/api/v1/weather/forecast",
            {
                city_name: cityCurrent
            })
        console.log(dataq.data[0].name);
        
        displayCurrentContent(dataz1.data);
        createDatass(dataz2.data);
		addImagess(dataz2.data);
        createDatas(dataz2.data);
		addImages(dataz2.data);
        insertNewData(dataz2.data);
        insertData(dataz2.data);
        header_city.innerText = cityCurrent[0].toUpperCase() + cityCurrent.slice(1);
        headerDays2.innerText = `5 Days Forecast in ${cityCurrent[0].toUpperCase() + cityCurrent.slice(1)}`;
        headerFore2.innerText = `12 Hours Forecast Onwards in ${cityCurrent[0].toUpperCase() + cityCurrent.slice(1)}`;
        humidtitle2.innerText = `Humidity Concentrate in ${cityCurrent[0].toUpperCase() + cityCurrent.slice(1)}`;
        headWind2.innerText = `Wind Velocity Onwards in ${cityCurrent[0].toUpperCase() + cityCurrent.slice(1)}`;
    }

}


formDom.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {

        const data = await axios.post("/api/v1/weather/current",
            {
                city_name: city_input.value
            })
        // getLocation();
        header_city.innerHTML = '';
        header_city.innerText = city_input.value[0].toUpperCase() + city_input.value.slice(1);
        console.log(data.data.weather[0].description);
        displayCurrentContent(data.data);
    } catch (e) {
        console.log(e);
    }
})

function capitalizeFirstLetter(string) {
    const words = string.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

function displayCurrentContent(data) {
    desc_city.innerHTML = '';
    image_city.innerHTML = '';
    desc_temp.innerHTML = '';

    if (data.weather[0].description === 'clear sky') {
        desc_city.innerText = 'Clear Sky';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/clear-sky-day.png";
    } else if (data.weather[0].description === 'few clouds') {
        desc_city.innerText = 'Few Clouds';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/few-clouds-day.png";
    } else if (data.weather[0].description === 'scattered clouds') {
        desc_city.innerText = 'Scattered Clouds';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/scattered-clouds.png";
    } else if (data.weather[0].description === 'broken clouds') {
        desc_city.innerText = 'Broken Clouds';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/broken-clouds.png";
    } else if (data.weather[0].description === 'overcast clouds') {
        desc_city.innerText = 'Overcast Clouds';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/scattered-clouds.png";
    } else if (data.weather[0].main === 'Drizzle') {
        desc_city.innerText = capitalizeFirstLetter(data.weather[0].description);
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/shower-rain.png";
    } else if (data.weather[0].main === 'Rain') {
        desc_city.innerText = capitalizeFirstLetter(data.weather[0].description);
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/rain.png";
    } else if (data.weather[0].main === 'Thunderstorm') {
        desc_city.innerText = capitalizeFirstLetter(data.weather[0].description);
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/thunderstorm.png";
    } else if (data.weather[0].main === 'Snow') {
        desc_city.innerText = 'Snow';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/snow.png";
    } else if (data.weather[0].main === 'Mist') {
        desc_city.innerText = 'Mist';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Haze') {
        desc_city.innerText = 'Haze';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Smoke') {
        desc_city.innerText = 'Smoke';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Fog') {
        desc_city.innerText = 'Fog';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Dust') {
        desc_city.innerText = 'Dust';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Sand') {
        desc_city.innerText = 'Sand';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Ash') {
        desc_city.innerText = 'Ash';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Squall') {
        desc_city.innerText = 'Squall';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else if (data.weather[0].main === 'Tornado') {
        desc_city.innerText = 'Tornado';
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/mist.png";
    } else {
        console.log("Wrong API");
    }
}

