const formDom = document.getElementById('input_form'); 
const city_input = document.getElementById("city_input");

formDom.addEventListener('submit', async(e)=>{
    e.preventDefault();
    try{
        const {data} = await axios.post("/api/v1/air-polution",
        {
            city_name : city_input.value
        })
        displayWeatherData(data);
        console.log(data.list);
    }catch(e){ 
        console.log(e);
    }
    // console.log(city_input.value);
})

function createLineGraph(labels, pollutionData) {
    const ctx = document.getElementById('lineGraph').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
            datasets: [{
                label: 'AQI (Air Quality Index)',
                data: pollutionData,
                borderColor: 'rgba(100, 200, 192, 1)',
                borderWidth: 2,
                fill: true 
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
                y: {
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
