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

window.onload = async function () {
    displayAirQualityRanking();
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
        const data1 = await axios.post("/api/v1/air-polution",
            {
                city_name: cityCurrent
            })
        const data2 = await axios.post("/api/v1/air-polution/current",
            {
                city_name: cityCurrent
            })
        const data3 = await axios.post("/api/v1/air-polution/forecast",
            {
                city_name: cityCurrent
            })
        content_aqi.style.display = "flex";
        displayContentHeader(data2.data);
        displayImageAQI(data2.data);
        displayCarbonData(data1.data);
        displayWeatherData(data1.data);
        createColorAqi(data2.data);
        displayForecastData(data1.data, data2.data, data3.data);
        forecastAQIData(data1.data, data2.data, data3.data);
        header_forecast.innerText = `${cityCurrent[0].toUpperCase() + cityCurrent.slice(1)} Air Quality Index (AQI) Forecast`;
        historic_aqi.innerText = `${cityCurrent[0].toUpperCase() + cityCurrent.slice(1)} Historical Air Quality Index (AQI)`;
        headerCity.innerText = cityCurrent.toUpperCase();

        }
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
        displayContentHeader(data2.data);
        displayImageAQI(data2.data);
        displayCarbonData(data1.data);
        displayWeatherData(data1.data);
        createColorAqi(data2.data);
        displayForecastData(data1.data, data2.data, data3.data);
        forecastAQIData(data1.data, data2.data, data3.data);
        header_forecast.innerText = `${city_input.value[0].toUpperCase() + city_input.value.slice(1)} Air Quality Index (AQI) Forecast`;
        historic_aqi.innerText = `${city_input.value[0].toUpperCase() + city_input.value.slice(1)} Historical Air Quality Index (AQI)`;
        headerCity.innerText = city_input.value.toUpperCase();
        // console.log(data.list);
        // console.log(data2.data.list[0].main.aqi);
    } catch (e) {
        console.log(e);
    }
    // console.log(city_input.value);
})

const displayAirQualityRanking = async () => {
    const rankingBody = document.getElementById('ranking-body');
    const rankingCity = document.getElementById('ranking-city');

    rankingCity.innerHTML = '';
    rankingBody.innerHTML = '';
    const rowt = rankingCity.insertRow();
    rowt.insertCell(0).textContent = 'LOADING BABY';
    rankingCity.innerHTML = 'LOADING BABY';

    const cities = [
        { name: 'Tokyo', country: 'Japan' }, { name: 'Delhi', country: 'India' }, { name: 'Beijing', country: 'China' }, { name: 'Moscow', country: 'Russia' },
        { name: 'Cairo', country: 'Egypt' }, { name: 'Paris', country: 'France' }, { name: 'Berlin', country: 'Germany' }, { name: 'London', country: 'United Kingdom' },
        { name: 'Rome', country: 'Italy' }, { name: 'Madrid', country: 'Spain' }, { name: 'Lisbon', country: 'Portugal' }, { name: 'Amsterdam', country: 'Netherlands' },
        { name: 'Brussels', country: 'Belgium' }, { name: 'Vienna', country: 'Austria' }, { name: 'Dublin', country: 'Ireland' }, { name: 'Athens', country: 'Greece' },
        { name: 'Stockholm', country: 'Sweden' }, { name: 'Oslo', country: 'Norway' }, { name: 'Copenhagen', country: 'Denmark' }, { name: 'Helsinki', country: 'Finland' },
        { name: 'Warsaw', country: 'Poland' }, { name: 'Prague', country: 'Czech Republic' }, { name: 'Budapest', country: 'Hungary' }, { name: 'Bratislava', country: 'Slovakia' },
        { name: 'Ljubljana', country: 'Slovenia' }, { name: 'Zagreb', country: 'Croatia' }, { name: 'Belgrade', country: 'Serbia' }, { name: 'Sofia', country: 'Bulgaria' },
        { name: 'Bucharest', country: 'Romania' }, { name: 'Warsaw', country: 'Poland' }, { name: 'Kiev', country: 'Ukraine' }, { name: 'Ankara', country: 'Turkey' },
        { name: 'Istanbul', country: 'Turkey' }, { name: 'Athens', country: 'Greece' }, { name: 'Tbilisi', country: 'Georgia' }, { name: 'Yerevan', country: 'Armenia' },
        { name: 'Baku', country: 'Azerbaijan' }, { name: 'Tehran', country: 'Iran' }, { name: 'Baghdad', country: 'Iraq' }, { name: 'Riyadh', country: 'Saudi Arabia' },
        { name: 'Kuwait City', country: 'Kuwait' }, { name: 'Doha', country: 'Qatar' }, { name: 'Abu Dhabi', country: 'United Arab Emirates' },
        { name: 'Muscat', country: 'Oman' }, { name: 'Manama', country: 'Bahrain' }, { name: 'Jerusalem', country: 'Israel' }, { name: 'Amman', country: 'Jordan' },
        { name: 'Manila', country: 'Philippines' }, { name: 'Seoul', country: 'South Korea' }, { name: 'Hanoi', country: 'Vietnam' }, { name: 'Bangkok', country: 'Thailand' },
        { name: 'Jakarta', country: 'Indonesia' }, { name: 'Canberra', country: 'Australia' }, { name: 'Wellington', country: 'New Zealand' }, { name: 'Ottawa', country: 'Canada' },
        { name: 'Washington, D.C.', country: 'United States' }, { name: 'Mexico City', country: 'Mexico' }
    ];

    const indonesiaCities = [
        { name: 'Jakarta' }, { name: 'Surabaya' }, { name: 'Bandung' }, { name: 'Medan' }, { name: 'Semarang' }, { name: 'Makassar' }, { name: 'Palembang' },
        { name: 'Depok' }, { name: 'Tangerang' }, { name: 'South Tangerang' }, { name: 'Bekasi' }, { name: 'Bogor' }, { name: 'Padang' }, { name: 'Bandar Lampung' },
        { name: 'Malang' }, { name: 'Pekanbaru' }, { name: 'Denpasar' }, { name: 'Banjarmasin' }, { name: 'Yogyakarta' }, { name: 'Batam' },
        { name: 'Samarinda' }, { name: 'Cilegon' }, { name: 'Pontianak' }, { name: 'Manado' }, { name: 'Balikpapan' }, { name: 'Jambi' }, { name: 'Serang' },
        { name: 'Banda Aceh' }, { name: 'Ambon' }, { name: 'Palu' }, { name: 'Kupang' }, { name: 'Mataram' }, { name: 'Ternate' }, { name: 'Manokwari' },
        { name: 'Jayapura' }, { name: 'Kendari' }, { name: 'Gorontalo' }, { name: 'Samarinda' }, { name: 'Tanjungpinang' }, { name: 'Tanjung Balai' },
        { name: 'Pematangsiantar' }, { name: 'Binjai' }, { name: 'Tanjung Morawa' }, { name: 'Deli Serdang' }, { name: 'Lubuk Pakam' }, { name: 'Tebing Tinggi' },
        { name: 'Pekanbaru' }, { name: 'Padang' }, { name: 'Solok' }, { name: 'Sawahlunto' }, { name: 'Payakumbuh' }, { name: 'Pariaman' }, { name: 'Bukittinggi' },
        { name: 'Lubuk Basung' }, { name: 'Amlapura' }, { name: 'Karangasem' }, { name: 'Bangli' }, { name: 'Negara' }, { name: 'SINGARAJA' }, { name: 'Tabanan' },
        { name: 'Klungkung' }, { name: 'Gianyar' }, { name: 'Denpasar' }, { name: 'Kupang' }, { name: 'Atambua' }, { name: 'Larantuka' }, { name: 'Lewoleba' },
        { name: 'Maumere' }, { name: 'Ende' }, { name: 'Ruteng' }, { name: 'Bajawa' }, { name: 'Borong' }, { name: 'Sikka' }, { name: 'Flores Timur' },
        { name: 'Manggarai' }, { name: 'Rote' }, { name: 'Ndao' }, { name: 'Manggarai Barat' }, { name: 'Manggarai Timur' }, { name: 'Manggarai Tengah' },
        { name: 'Sumba Barat' }, { name: 'Sumba Barat Daya' }, { name: 'Sumba Tengah' }, { name: 'Sumba Timur' }, { name: 'Timor Tengah Selatan' },
        { name: 'Timor Tengah Utara' }, { name: 'Sabu Raijua' }, { name: 'Rote Ndao' }, { name: 'Gresik' }, { name: 'Banyuwangi' }, { name: 'Tuban' }
    ];

    rankingCity.innerHTML = '';
    rankingBody.innerHTML = '';

    const sortedCountries = [];
    const sortedCities = [];

    for (const city of cities) {
        try {
            const datas = await axios.post("/api/v1/air-polution/current",
                {
                    city_name: city.name
                })
            const airQualityIndex = datas.data.list[0].main.aqi;

            sortedCountries.push({ name: city.name, index: airQualityIndex, country: city.country });
        } catch (error) {
            console.error(`Error fetching air quality data for ${city.name}: ${error.message}`);
        }
    }

    for (const citys of indonesiaCities) {
        try {
            const datas = await axios.post("/api/v1/air-polution/current",
                {
                    city_name: citys.name
                })
            const airQualityIndex = datas.data.list[0].main.aqi;

            sortedCities.push({ name: citys.name, index: airQualityIndex });
        } catch (error) {
            console.error(`Error fetching air quality data for ${citys.name}: ${error.message}`);
        }
    }

    sortedCountries.sort((a, b) => b.index - a.index);
    sortedCities.sort((a, b) => b.index - a.index);

    for (let i = 0; i < 10; i++) {
        const city = sortedCountries[i];
        const row = rankingBody.insertRow();
        row.insertCell(0).textContent = i + 1;
        row.insertCell(1).textContent = city.country;
        row.insertCell(2).textContent = city.index;
    }

    for (let i = 0; i < 10; i++) {
        const citys = sortedCities[i];
        const rows = rankingCity.insertRow();
        rows.insertCell(0).textContent = i + 1;
        rows.insertCell(1).textContent = citys.name;
        rows.insertCell(2).textContent = citys.index;
    }
};

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
        sub_content_aqi.style.backgroundColor = "rgb(215, 80, 152)";
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
                borderWidth: 2
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
        },
        animationEnabled: true
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

    const pollutionData = data.list[8].components;
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

    headerAQI.innerText = data.list[0].main.aqi;

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

    if (data3.list[83].main.aqi == 1) {
        forecast7.style.backgroundColor = "rgb(110, 226, 154)";
        forecast7.innerText = `Good`;
    } else if (data3.list[83].main.aqi == 2) {
        forecast7.style.backgroundColor = "rgb(255, 255, 153)";
        forecast7.innerText = `Fair`;
    } else if (data3.list[83].main.aqi == 3) {
        forecast7.style.backgroundColor = "rgb(255, 153, 0)";
        forecast7.innerText = `Moderate`;
    } else if (data3.list[83].main.aqi == 4) {
        forecast7.style.backgroundColor = "rgb(255, 102, 0)";
        forecast7.innerText = `Poor`;
    } else if (data3.list[83].main.aqi == 5) {
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
    const date7 = new Date((data3.list[83].dt + 50000) * 1000);

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
    forecast7.innerText = `Level ${data3.list[83].main.aqi}`;
}