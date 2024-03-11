const weather_vid = document.getElementById("myVideo");

function updateDateTime() {
    // create a new `Date` object
    const now = new Date();

    // get the current date and time as a string
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[now.getDay()];
    const currentDate = now.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = months[now.getMonth()];
    const currentYear = now.getFullYear();
    const currentMin = now.getMinutes();
    const currentHour = now.getHours();

    document.querySelector('#curTime').textContent = addZero(currentHour) + ":" + addZero(currentMin);
    document.querySelector('#curDate').textContent = currentDay + ", " + addZero(currentDate) + " " + currentMonth + " " + currentYear;
}

function addZero(i) {
    return i < 10 ? "0" + i : i;
}

// call the `updateDateTime` function every second
setInterval(updateDateTime, 1000);

// function to convert capital letter for every first letter of each word
function capitalizeFirstLetter(string) {
    const words = string.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

const image_city = document.getElementById("weather-logo");// ini untuk logo
const desc_city = document.getElementById("weather-status");// ini untuk thunderstorm dll
const header_city = document.getElementById("loc-tag");// ini untuk kota
var latitude, longitude;

window.onload = async function () {
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            header_city.innerText = "not found";
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
        console.log(dataq.data[0].name);
        displayCurrentContent(dataz1.data);
        header_city.innerText = cityCurrent.toUpperCase();
    }
}

function displayCurrentContent(data) {
    header_city.innerHTML = '';
    desc_city.innerHTML = '';
    image_city.innerHTML = '';

    if(data.weather[0].description === 'clear sky') {//DONE
        desc_city.innerText = 'Clear Sky';
        image_city.src = "../property/weather-logo/clear-sky-day.png";
        weather_vid.src = "../property/Video/ClearSkyVid.mp4";
        weather_vid.playbackRate = 0.3;
    } else if(data.weather[0].description === 'few clouds') {//DONE
        desc_city.innerText = 'Few Clouds';
        image_city.src = "../property/weather-logo/few-clouds-day.png";
        weather_vid.src = "../property/Video//FewCloudsVid.mp4";
        weather_vid.playbackRate = 1;
    } else if(data.weather[0].description === 'scattered clouds') {//DONE
        desc_city.innerText = 'Scattered Clouds';
        image_city.src = "../property/weather-logo/scattered-clouds.png";
        weather_vid.src = "../property/Video/ScatteredCloudsVid.mp4";
        weather_vid.playbackRate = 1;
    } else if(data.weather[0].description === 'broken clouds') {//DONE
        desc_city.innerText = 'Broken Clouds';
        image_city.src = "../property/weather-logo/broken-clouds.png";
        weather_vid.src = "../property/Video/BrokenCloudsVid.mp4";
        weather_vid.playbackRate = 1;
    } else if(data.weather[0].description === 'overcast clouds') {//DONE
        desc_city.innerText = 'Overcast Clouds';
        image_city.src = "../property/weather-logo/scattered-clouds.png";
        weather_vid.src = "../property/Video/OvercastCloudsVid.mp4";
        weather_vid.playbackRate = 1;
    } else if(data.weather[0].main === 'Drizzle') {//DONE
        desc_city.innerText = capitalizeFirstLetter(data.weather[0].description);
        image_city.src = "../property/weather-logo/shower-rain.png";
        weather_vid.src = "../property/Video/DrizzleVid.mp4";
        weather_vid.playbackRate = 1;
    } else if(data.weather[0].main === 'Rain') {//DONE
        desc_city.innerText = capitalizeFirstLetter(data.weather[0].description) ;
        image_city.src = "../property/weather-logo/rain.png";
        weather_vid.src = "../property/Video/RainVid.mp4";
        weather_vid.playbackRate = 1;
    } else if(data.weather[0].main === 'Thunderstorm') { //DONE
        desc_city.innerText = capitalizeFirstLetter(data.weather[0].description);
        image_city.src = "../property/weather-logo/thunderstorm.png";
        weather_vid.src = "../property/Video/NightThunderstromVid.mp4";
        weather_vid.playbackRate = 0.7;
    } else if (data.weather[0].main === 'Snow') { //DONE
        desc_city.innerText = 'Snow';
        image_city.src = "../property/weather-logo/snow.png";
        weather_vid.src = "../property/Video/SnowVid.mp4";
        weather_vid.playbackRate = 1;
    } else if (data.weather[0].main === 'Mist') { //DONE
        desc_city.innerText = 'Mist';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/MistVid.mp4";
        weather_vid.playbackRate = 1;
    } else if (data.weather[0].main === 'Haze') { //DONE
        desc_city.innerText = 'Haze';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/HazeVid.mp4";
        weather_vid.playbackRate = 1;
    } else if (data.weather[0].main === 'Smoke') { //DONE
        desc_city.innerText = 'Smoke';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/SmokeVid.mp4";
        weather_vid.playbackRate = 1;
    } else if (data.weather[0].main === 'Fog') { //DONE
        desc_city.innerText = 'Fog';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/FogVid.mp4";
        weather_vid.playbackRate = 1;
    } else if (data.weather[0].main === 'Dust') { //DONE
        desc_city.innerText = 'Dust';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/DustVid.mp4";
        weather_vid.playbackRate = 0.4;
    } else if (data.weather[0].main === 'Sand') { //DONE
        desc_city.innerText = 'Sand';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/SandVid.mp4";
        weather_vid.playbackRate = 1;
    } else if (data.weather[0].main === 'Ash') { //DONE
        desc_city.innerText = 'Ash';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/AshVid.mp4";
        weather_vid.playbackRate = 1;
    } else if (data.weather[0].main === 'Squall') { //DONE
        desc_city.innerText = 'Squall';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/SquallVid.mp4";
        weather_vid.playbackRate = 0.5;
    } else if (data.weather[0].main === 'Tornado') { //DONE
        desc_city.innerText = 'Tornado';
        image_city.src = "../property/weather-logo/mist.png";
        weather_vid.src = "../property/Video/TornadoVid.mp4";
        weather_vid.playbackRate = 1;
    } else {
        console.log("Wrong API");
    }
}