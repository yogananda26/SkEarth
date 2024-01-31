const formDom = document.getElementById('input_form');
const city_input = document.getElementById("search-input");
const co2_text = document.getElementById("co2-text");
const o3_text = document.getElementById("o3-text");
const no2_text = document.getElementById("no2-text");
const so2_text = document.getElementById("so2-text");
const showDataDOM = document.getElementById("levelData");
const headerAQI = document.getElementById("header-aqi");
const headerCity = document.getElementById("header-city");
const content_aqi = document.getElementById("content-aqi");
const aqi_category = document.getElementById("aqi-category");
const sub_content_aqi = document.getElementById("sub-content-aqi");
const header_forecast = document.getElementById("header-forecast");
const historic_aqi = document.getElementById("historical-aqi");
const image_aqi = document.getElementById("image-level-aqi");

const cityData = [
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Jakarta', lat: -6.200000, lon: 106.816666 },
    { name: 'Bogor', lat: -6.595038, lon: 106.816635 },
    { name: 'Surabaya', lat: -7.250445, lon: 112.768845 },
    { name: 'Makassar', lat: -6.271194, lon: 106.894547 },
    { name: 'Serang', lat: -6.120000, lon: 106.150276 },
    { name: 'Semarang', lat: -6.966667, lon: 110.416664 },
    { name: 'Pekanbaru', lat: 0.510440, lon: 101.438309 },
    { name: 'Manokwari', lat: -0.861453, lon: 134.062042 }
    // Add more cities as needed
];

const cityList = document.getElementById('city-list');

async function fetchAirQualityData(city) {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${`e46690909f598a98eae95c84a266ab48`}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.list[0].main.aqi; // Assuming you want the current AQI
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function displayRanking() {
    cityList.innerHTML = '';
    const rankedCities = await Promise.all(cityData.map(async (city) => {
        const aqi = await fetchAirQualityData(city);
        return { city, aqi }; // Store city and AQI in an object
    }));

    rankedCities.sort((a, b) => b.aqi - a.aqi); // Sort based on AQI (lower = better)

    rankedCities.forEach((city, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <span class="rank">${index + 1}.</span>
        ${city.city.name} - AQI: <span class="aqi">${city.aqi}</span>
      `;
        cityList.appendChild(li);
    });
}

formDom.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const data1 = await axios.post("/api/v1/air-polution",
            {
                city_name: city_input.value
            })
        const data2 = await axios.post("/api/v1/air-polution/current",
            {
                city_name: city_input.value
            })
        const data3 = await axios.post("/api/v1/air-polution/forecast",
            {
                city_name: city_input.value
            })
        content_aqi.style.display = "flex";
        displayRanking();
        displayContentHeader(data2.data);
        displayImageAQI(data2.data);
        displayCarbonData(data1.data);
        displayWeatherData(data1.data);
        createColorAqi(data2.data);
        displayForecastData(data1.data, data2.data, data3.data);
        forecastAQIData(data1.data, data2.data, data3.data);
        // console.log(data.list);
        // console.log(data2.data.list[0].main.aqi);
    } catch (e) {
        console.log(e);
    }
    // console.log(city_input.value);
})

function createColorAqi(datas) {
    aqi_category.innerHTML = '';
    if (datas.list[0].main.aqi == 1) {
        content_aqi.style.backgroundColor = "rgb(110, 226, 154)";
        sub_content_aqi.style.backgroundColor = "rgb(78, 190, 106)";
        aqi_category.innerText = "Good";
    } else if (datas.list[0].main.aqi == 2) {
        content_aqi.style.backgroundColor = "rgb(255, 255, 153)";
        sub_content_aqi.style.backgroundColor = "rgb(220, 220, 167)";
        aqi_category.innerText = "Fair";
    } else if (datas.list[0].main.aqi == 3) {
        content_aqi.style.backgroundColor = "rgb(255, 153, 0)";
        sub_content_aqi.style.backgroundColor = "rgb(254, 184, 79)";
        aqi_category.innerText = "Moderate";
    } else if (datas.list[0].main.aqi == 4) {
        content_aqi.style.backgroundColor = "rgb(255, 102, 0)";
        sub_content_aqi.style.backgroundColor = "rgb(255, 102, 0)";
        aqi_category.innerText = "Poor";
    } else {
        content_aqi.style.backgroundColor = "rgb(153, 51, 102)";
        sub_content_aqi.style.backgroundColor = "rgb(215, 89, 152)";
        aqi_category.innerText = "Very Poor";
    }
}

function createLineGraph(labels, pollutionData) {
    const ctx = document.getElementById('lineGraph').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
            datasets: [{
                label: 'AQI (Air Quality Index)',
                data: pollutionData,
                borderColor: 'rgb(17, 0, 158)',
                borderWidth: 1,
                fill: false,
                pointRadius: 0,
                borderWidth: 5
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y: {
                    grid: {
                        drawOnChartArea: false
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

function displayWeatherData(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = '';

    const airQualityIndex = data.list[0].main.aqi;
    const hourlyData = data.list;

    if (!hourlyData || hourlyData.length === 0) {
        weatherDataDiv.innerHTML = '<p>No hourly data available for the specified city.</p>';
        return;
    }

    const timestamps = hourlyData.map(entry => entry.dt);
    const aqiValues = hourlyData.map(entry => entry.main.aqi);
    console.log(aqiValues);
    weatherDataDiv.innerHTML = `
        <p>Air Quality Index (AQI): ${airQualityIndex}</p>
        <canvas id="lineGraph" width="auto" height="auto"></canvas>
    `;

    createLineGraph(timestamps, aqiValues);
}

function displayCarbonData(data) {
    co2_text.innerText = '';
    no2_text.innerText = '';
    o3_text.innerText = '';
    so2_text.innerText = '';

    const pollutionData = data.list[1].components;
    co2_text.innerText = pollutionData.co;
    o3_text.innerText = pollutionData.o3;
    no2_text.innerText = pollutionData.no2;
    so2_text.innerText = pollutionData.so2;
}

function displayContentHeader(data) {
    headerCity.innerText = '';
    headerAQI.innerText = '';
    header_forecast.innerText = '';
    historic_aqi.innerText = '';


    header_forecast.innerText = `${city_input.value[0].toUpperCase() + city_input.value.slice(1)} Air Quality Index (AQI) Forecast`;
    historic_aqi.innerText = `${city_input.value[0].toUpperCase() + city_input.value.slice(1)} Historical Air Quality Index (AQI)`;
    headerAQI.innerText = data.list[0].main.aqi;
    headerCity.innerText = city_input.value.toUpperCase();

}

function displayImageAQI(data) {
    image_aqi.innerHTML = '';

    if (data.list[0].main.aqi == 1) {
        image_aqi.src = "../property/airPolution-asset/emoji-good.png";
    }
    else if (data.list[0].main.aqi == 2) {
        image_aqi.src = "../property/airPolution-asset/emoji-fair.png";
    }
    else if (data.list[0].main.aqi == 3) {
        image_aqi.src = "../property/airPolution-asset/emoji-moderate.png";
    }
    else if (data.list[0].main.aqi == 4) {
        image_aqi.src = "../property/airPolution-asset/emoji-poor.png";
    } else {
        image_aqi.src = "../property/airPolution-asset/emoji-very-poor.png";
    }
}

function displayForecastData(data1, data2, data3) {
    const forecast1 = document.getElementById("bg-color-forecast1");
    const forecast2 = document.getElementById("bg-color-forecast2");
    const forecast3 = document.getElementById("bg-color-forecast3");
    const forecast4 = document.getElementById("bg-color-forecast4");
    const forecast5 = document.getElementById("bg-color-forecast5");
    const forecast6 = document.getElementById("bg-color-forecast6");
    const forecast7 = document.getElementById("bg-color-forecast7");

    forecast1.innerHTML = '';
    forecast2.innerHTML = '';
    forecast3.innerHTML = '';
    forecast4.innerHTML = '';
    forecast5.innerHTML = '';
    forecast6.innerHTML = '';
    forecast7.innerHTML = '';

    if (data1.list[6].main.aqi == 1) {
        forecast1.style.backgroundColor = "rgb(110, 226, 154)";
        forecast1.innerText = `Good`;
    } else if (data1.list[6].main.aqi == 2) {
        forecast1.style.backgroundColor = "rgb(255, 255, 153)";
        forecast1.innerText = `Fair`;
    } else if (data1.list[6].main.aqi == 3) {
        forecast1.style.backgroundColor = "rgb(255, 153, 0)";
        forecast1.innerText = `Moderate`;
    } else if (data1.list[6].main.aqi == 4) {
        forecast1.style.backgroundColor = "rgb(255, 102, 0)";
        forecast1.innerText = `Poor`;
    } else if (data1.list[6].main.aqi == 5) {
        forecast1.style.backgroundColor = "rgb(153, 51, 102)";
        forecast1.innerText = `Very Poor`;
    }

    if (data1.list[7].main.aqi == 1) {
        forecast2.style.backgroundColor = "rgb(110, 226, 154)";
        forecast2.innerText = `Good`;
    } else if (data1.list[7].main.aqi == 2) {
        forecast2.style.backgroundColor = "rgb(255, 255, 153)";
        forecast2.innerText = `Fair`;
    } else if (data1.list[7].main.aqi == 3) {
        forecast2.style.backgroundColor = "rgb(255, 153, 0)";
        forecast2.innerText = `Moderate`;
    } else if (data1.list[7].main.aqi == 4) {
        forecast2.style.backgroundColor = "rgb(255, 102, 0)";
        forecast2.innerText = `Poor`;
    } else if (data1.list[7].main.aqi == 5) {
        forecast2.style.backgroundColor = "rgb(153, 51, 102)";
        forecast2.innerText = `Very Poor`;
    }

    if (data2.list[0].main.aqi == 1) {
        forecast3.style.backgroundColor = "rgb(110, 226, 154)";
        forecast3.innerText = `Good`;
    } else if (data2.list[0].main.aqi == 2) {
        forecast3.style.backgroundColor = "rgb(255, 255, 153)";
        forecast3.innerText = `Fair`;
    } else if (data2.list[0].main.aqi == 3) {
        forecast3.style.backgroundColor = "rgb(255, 153, 0)";
        forecast3.innerText = `Moderate`;
    } else if (data2.list[0].main.aqi == 4) {
        forecast3.style.backgroundColor = "rgb(255, 102, 0)";
        forecast3.innerText = `Poor`;
    } else if (data2.list[0].main.aqi == 5) {
        forecast3.style.backgroundColor = "rgb(153, 51, 102)";
        forecast3.innerText = `Very Poor`;
    }

    if (data3.list[24].main.aqi == 1) {
        forecast4.style.backgroundColor = "rgb(110, 226, 154)";
        forecast4.innerText = `Good`;
    } else if (data3.list[24].main.aqi == 2) {
        forecast4.style.backgroundColor = "rgb(255, 255, 153)";
        forecast4.innerText = `Fair`;
    } else if (data3.list[24].main.aqi == 3) {
        forecast4.style.backgroundColor = "rgb(255, 153, 0)";
        forecast4.innerText = `Moderate`;
    } else if (data3.list[24].main.aqi == 4) {
        forecast4.style.backgroundColor = "rgb(255, 102, 0)";
        forecast4.innerText = `Poor`;
    } else if (data3.list[24].main.aqi == 5) {
        forecast4.style.backgroundColor = "rgb(153, 51, 102)";
        forecast4.innerText = `Very Poor`;
    }

    if (data3.list[48].main.aqi == 1) {
        forecast5.style.backgroundColor = "rgb(110, 226, 154)";
        forecast5.innerText = `Good`;
    } else if (data3.list[48].main.aqi == 2) {
        forecast5.style.backgroundColor = "rgb(255, 255, 153)";
        forecast5.innerText = `Fair`;
    } else if (data3.list[48].main.aqi == 3) {
        forecast5.style.backgroundColor = "rgb(255, 153, 0)";
        forecast5.innerText = `Moderate`;
    } else if (data3.list[48].main.aqi == 4) {
        forecast5.style.backgroundColor = "rgb(255, 102, 0)";
        forecast5.innerText = `Poor`;
    } else if (data3.list[48].main.aqi == 5) {
        forecast5.style.backgroundColor = "rgb(153, 51, 102)";
        forecast5.innerText = `Very Poor`;
    }

    if (data3.list[72].main.aqi == 1) {
        forecast6.style.backgroundColor = "rgb(110, 226, 154)";
        forecast6.innerText = `Good`;
    } else if (data3.list[72].main.aqi == 2) {
        forecast6.style.backgroundColor = "rgb(255, 255, 153)";
        forecast6.innerText = `Fair`;
    } else if (data3.list[72].main.aqi == 3) {
        forecast6.style.backgroundColor = "rgb(255, 153, 0)";
        forecast6.innerText = `Moderate`;
    } else if (data3.list[72].main.aqi == 4) {
        forecast6.style.backgroundColor = "rgb(255, 102, 0)";
        forecast6.innerText = `Poor`;
    } else if (data3.list[72].main.aqi == 5) {
        forecast6.style.backgroundColor = "rgb(153, 51, 102)";
        forecast6.innerText = `Very Poor`;
    }

    if (data3.list[91].main.aqi == 1) {
        forecast7.style.backgroundColor = "rgb(110, 226, 154)";
        forecast7.innerText = `Good`;
    } else if (data3.list[91].main.aqi == 2) {
        forecast7.style.backgroundColor = "rgb(255, 255, 153)";
        forecast7.innerText = `Fair`;
    } else if (data3.list[91].main.aqi == 3) {
        forecast7.style.backgroundColor = "rgb(255, 153, 0)";
        forecast7.innerText = `Moderate`;
    } else if (data3.list[91].main.aqi == 4) {
        forecast7.style.backgroundColor = "rgb(255, 102, 0)";
        forecast7.innerText = `Poor`;
    } else if (data3.list[91].main.aqi == 5) {
        forecast7.style.backgroundColor = "rgb(153, 51, 102)";
        forecast7.innerText = `Very Poor`;
    }
}

function forecastAQIData(data1, data2, data3) {
    const dateForecast1 = document.getElementById("forecast1-date");
    const dateForecast2 = document.getElementById("forecast2-date");
    const dateForecast3 = document.getElementById("forecast3-date");
    const dateForecast4 = document.getElementById("forecast4-date");
    const dateForecast5 = document.getElementById("forecast5-date");
    const dateForecast6 = document.getElementById("forecast6-date");
    const dateForecast7 = document.getElementById("forecast7-date");
    const forecast1 = document.getElementById("forecast1-aqi");
    const forecast2 = document.getElementById("forecast2-aqi");
    const forecast3 = document.getElementById("forecast3-aqi");
    const forecast4 = document.getElementById("forecast4-aqi");
    const forecast5 = document.getElementById("forecast5-aqi");
    const forecast6 = document.getElementById("forecast6-aqi");
    const forecast7 = document.getElementById("forecast7-aqi");

    dateForecast1.innerText = '';
    dateForecast2.innerText = '';
    dateForecast3.innerText = '';
    dateForecast4.innerText = '';
    dateForecast5.innerText = '';
    dateForecast6.innerText = '';
    dateForecast7.innerText = '';
    forecast1.innerText = '';
    forecast2.innerText = '';
    forecast3.innerText = '';
    forecast4.innerText = '';
    forecast5.innerText = '';
    forecast6.innerText = '';
    forecast7.innerText = '';

    const date1 = new Date((data1.list[6].dt - 150000) * 1000);
    const date2 = new Date((data1.list[7].dt - 100000) * 1000);
    const date4 = new Date(data3.list[24].dt * 1000);
    const date5 = new Date(data3.list[48].dt * 1000);
    const date6 = new Date(data3.list[72].dt * 1000);
    const date7 = new Date((data3.list[91].dt + 50000) * 1000);

    dateForecast1.innerText = date1.toDateString();
    dateForecast2.innerText = date2.toDateString();
    dateForecast3.innerText = `Today`;
    dateForecast4.innerText = date4.toDateString();
    dateForecast5.innerText = date5.toDateString();
    dateForecast6.innerText = date6.toDateString();
    dateForecast7.innerText = date7.toDateString();

    forecast1.innerText = `Level ${data1.list[6].main.aqi}`;
    forecast2.innerText = `Level ${data1.list[7].main.aqi}`;
    forecast3.innerText = `Level ${data2.list[0].main.aqi}`;
    forecast4.innerText = `Level ${data3.list[24].main.aqi}`;
    forecast5.innerText = `Level ${data3.list[48].main.aqi}`;
    forecast6.innerText = `Level ${data3.list[72].main.aqi}`;
    forecast7.innerText = `Level ${data3.list[91].main.aqi}`;
}