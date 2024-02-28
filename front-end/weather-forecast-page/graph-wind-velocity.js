const formdoms = document.getElementById("form-input");
const cityinputs = document.getElementById("city-input");
const descWind = document.getElementById("desc-wind");
const headWind = document.getElementById("head-wind");

formdoms.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const data = await axios.post("/api/v1/weather/forecast",
            {
                city_name: cityinputs.value
            })
        insertData(data.data);
        headWind.innerText = `Wind Velocity Onwards in ${cityinputs.value[0].toUpperCase() + cityinputs.value.slice(1)}`;
    } catch (e) {
        console.log(e);
    }
})

var chartWind = new CanvasJS.Chart("chartContainerWind", {
    backgroundColor: "rgba(255,255,255,0.1)",
    axisY: {
        title: "Wind speed in meter/sec",
        interval: 1,
        maximum: 10,
        minimum: -0.5,
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 2,
    },
    axisX: {
        interval: 0.5,
        labelAngle: -45
    },
    data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: [
            { label: "10.00 AM", y: 1.5 },
            { label: "10.30 AM", y: 2.5 },
            { label: "11.00 AM", y: 3 },
            { label: "11.30 AM", y: 2.6 },
            { label: "12.00 PM", y: 2.4 },
            { label: "12.30 PM", y: 2.8 },
            { label: "13.00 PM", y: 1.8 },
            { label: "13.30 PM", y: 2.5 },
            { label: "14.00 PM", y: 2.7 },
            { label: "14.30 PM", y: 2 },
            { label: "15.00 PM", y: 1.8 },
            { label: "15.30 PM", y: 2 },
            { label: "16.00 PM", y: 1.8 },
            { label: "16.30 PM", y: 1.9 },

        ]
    }]
});

chartWind.render();

function insertData(data) {
    headWind.innerHTML = '';
    descWind.innerHTML = '';
    var newDataPoints = [];
    var sumWind = 0;    

    for (i = 0; i < chartWind.options.data[0].dataPoints.length; i++) {
        var timestamp = data.list[i].dt;
        var date = new Date(timestamp * 1000);
        var hours = date.getHours();
        var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        var label = hours + ':' + minutes;
        sumWind += data.list[i].wind.speed;
        newDataPoints.push({ label: label, y: data.list[i].wind.speed });
    }

    sumWind = (sumWind / 5);

    if (sumWind < 0.5) {
        descWind.innerText = `The average wind speed is less than 1 mph (0 m/s). During calm conditions, the air remains nearly still, and smoke rises vertically. There is a profound stillness in the atmosphere with minimal air movement.`;
    } else if (sumWind < 2 && sumWind > 0.5) {
        descWind.innerText = `The average wind speed is between 1 - 3 mph (0.5-1.5 m/s). In light air, the movement of smoke is subtle, drifting gently with the air. Weather vanes remain inactive, indicating the mild and gentle nature of the breeze.`;
    } else if (sumWind < 3 && sumWind > 2) {
        descWind.innerText = `The average wind speed ranges from 4 - 7 mph (2-3 m/s). A light breeze becomes perceptible as weather vanes start to show activity. The wind is felt on the face, and leaves rustle in response to this mild and pleasant breeze.`;
    } else if (sumWind < 5 && sumWind > 3) {
        descWind.innerText = `The average wind speed varies between 8 - 12 mph (3.5-5 m/s). During a gentle breeze, leaves and small twigs are set in motion, and light flags extend in the direction of the wind. It is a pleasant and moderate level of airflow.`;
    } else if (sumWind < 8 && sumWind > 5) {
        descWind.innerText = `The average wind speed falls between 13 - 18 mph (5.5-8 m/s). Small branches begin to sway, and dust and loose paper are lifted from the ground. This level of breeze signifies a more noticeable presence of wind.`;
    } else if (sumWind < 10.5 && sumWind > 8) {
        descWind.innerText = `The average wind speed ranges from 19 - 24 mph (8.5-10.5 m/s). Small trees start to sway, and waves break on inland waters. The environment becomes more dynamic, with a fresh and invigorating breeze.`;
    } else if (sumWind < 13.5 && sumWind > 10.5) {
        descWind.innerText = `The average wind speed is between 25 - 31 mph (11-13.5 m/s). Large branches sway noticeably, and using umbrellas becomes challenging. It is a strong and robust breeze that demands attention.`;
    } else if (sumWind < 16.5 && sumWind > 13.5) {
        descWind.innerText = `The average wind speed varies from 32 - 38 mph (14-16.5 m/s). Whole trees sway conspicuously, making it difficult to walk against the wind. This level indicates a significant increase in wind strength.`;
    } else if (sumWind < 20 && sumWind > 16.5) {
        descWind.innerText = `The average wind speed falls between 39 - 46 mph (17-20 m/s). Twigs may break off trees, and walking against the wind becomes very difficult. The power of the wind intensifies, causing noticeable effects.`;
    } else if (sumWind < 32 && sumWind > 20) {
        descWind.innerText = `The average wind speed ranges from 50 - 73 mph (28-31.5 m/s). Widespread damage is likely during a storm, making it a very rare and severe occurrence. Precautions and preparedness are crucial in the face of such intense weather conditions.`;
    } else if (sumWind > 32) {
        descWind.innerText = `The average wind speed exceeds 73 mph (over 32 m/s). Hurricanes bring about violent destruction, causing widespread devastation to landscapes and infrastructure. These extreme weather events demand the highest level of caution and emergency preparedness.`;
    }

    // for (i = 1; i < newDataPoints.length; i++) {
    // 	if (newDataPoints[i].label === newDataPoints[i - 1].label) {
    // 		newDataPoints[i - 1].label = null;
    // 	}
    // }
    chartWind.options.data[0].dataPoints = newDataPoints;
    chartWind.render();
}
