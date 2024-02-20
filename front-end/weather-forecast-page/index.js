const formDom = document.getElementById("form-input");
const city_input = document.getElementById("city-input");
const header_city = document.getElementById("header-city");
const desc_city = document.getElementById("desc-city");
const image_city = document.getElementById("image-city");
const desc_temp = document.getElementById("desc-temp");

var latitude, longitude;

getLocation();
console.log(latitude);
console.log(longitude);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
}

// window.onload = function () {
//     const data = await axios.post("/api/v1/weather/city",
//             {
//                 city_name: city_input.value
//             })
// }


formDom.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {

        const data = await axios.post("/api/v1/weather/current",
            {
                city_name: city_input.value
            })
        // getLocation();
        console.log(data.data.weather[0].description);
        displayCurrentContent(data.data);
    } catch (e) {
        console.log(e);
    }
})


function displayCurrentContent(data) {
    header_city.innerHTML = '';
    desc_city.innerHTML = '';
    image_city.innerHTML = '';
    desc_temp.innerHTML = '';
    header_city.innerText = city_input.value.toUpperCase();

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
        desc_city.innerText = data.weather[0].description;
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/shower-rain.png";
    } else if (data.weather[0].main === 'Rain') {
        desc_city.innerText = data.weather[0].description;
        desc_temp.innerText = `${Math.round(data.main.temp - 273, 15)}°C`;
        image_city.src = "../property/weather-logo/rain.png";
    } else if (data.weather[0].main === 'Thunderstorm') {
        desc_city.innerText = data.weather[0].description;
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

