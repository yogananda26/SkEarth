const formsdoms = document.getElementById("form-input");
const citysinput = document.getElementById("city-input");
const humiddesc = document.getElementById("humid-desc");
const humidtitle = document.getElementById("humid-title");

formsdoms.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const data = await axios.post("/api/v1/weather/forecast",
      {
        city_name: citysinput.value
      })
    console.log(data.data.list[0].main.humidity);
    insertNewData(data.data);
    humidtitle.innerText = `Humidity Concentrate in ${citysinput.value[0].toUpperCase() + citysinput.value.slice(1)}`
    console.log(data.data.list[0].weather[0].main);
  } catch (e) {
    console.log(e);
  }
})

var chartRelative = new CanvasJS.Chart("chartContainerRelative", {
  backgroundColor: "rgba(255,255,255,0.1)",
  axisX: {
    title: "Time per hour (h)",
    interval: 10,
    minimum: 0,
    maximum: 95
  },
  axisY: {
    title: "Relative Humidity (%)"
  },
  data: [
    {
      type: "line",
      dataPoints: [
        { label: 0, y: 71 },
        { label: 1, y: 67 },
        { label: 2, y: 70 },
        { label: 3, y: 67 },
        { label: 4, y: 69 },
        { label: 5, y: 68 },
        { label: 6, y: 70 },
        { label: 7, y: 74 },
        { label: 8, y: 70 },
        { label: 9, y: 73 },
        { label: 10, y: 72 },
        { label: 11, y: 73 },
        { label: 12, y: 74 },
        { label: 13, y: 70 },
        { label: 14, y: 70 },
        { label: 15, y: 73 },
        { label: 16, y: 69 },
        { label: 17, y: 73 },
        { label: 18, y: 78 },
        { label: 19, y: 80 },
        { label: 20, y: 79 },
        { label: 21, y: 75 },
        { label: 22, y: 75 },
        { label: 23, y: 71 },
        { label: 24, y: 74 },
        { label: 25, y: 72 },
        { label: 26, y: 73 },
        { label: 27, y: 78 },
        { label: 28, y: 80 },
        { label: 29, y: 77 },
        { label: 30, y: 78 },
        { label: 31, y: 73 },
        { label: 32, y: 71 },
        { label: 33, y: 71 },
        { label: 34, y: 70 },
        { label: 35, y: 67 },
        { label: 36, y: 66 },
        { label: 37, y: 64 },
        { label: 38, y: 65 },
        { label: 39, y: 66 },
        { label: 40, y: 66 },
        { label: 41, y: 67 },
        { label: 42, y: 66 },
        { label: 43, y: 70 },
        { label: 44, y: 70 },
        { label: 45, y: 65 },
        { label: 46, y: 61 },
        { label: 47, y: 61 },
        { label: 48, y: 59 },
        { label: 49, y: 60 },
        { label: 50, y: 56 },
        { label: 51, y: 55 },
        { label: 52, y: 50 },
        { label: 53, y: 53 },
        { label: 54, y: 49 },
        { label: 55, y: 48 },
        { label: 56, y: 45 },
        { label: 57, y: 48 },
        { label: 58, y: 43 },
        { label: 59, y: 40 },
        { label: 60, y: 41 },
        { label: 61, y: 40 },
        { label: 62, y: 35 },
        { label: 63, y: 35 },
        { label: 64, y: 38 },
        { label: 65, y: 34 },
        { label: 66, y: 36 },
        { label: 67, y: 38 },
        { label: 68, y: 42 },
        { label: 69, y: 46 },
        { label: 70, y: 43 },
        { label: 71, y: 47 },
        { label: 72, y: 46 },
        { label: 73, y: 44 },
        { label: 74, y: 46 },
        { label: 75, y: 45 },
        { label: 76, y: 42 },
        { label: 77, y: 45 },
        { label: 78, y: 44 },
        { label: 79, y: 48 },
        { label: 80, y: 46 },
        { label: 81, y: 45 },
        { label: 82, y: 44 },
        { label: 83, y: 47 },
        { label: 84, y: 49 },
        { label: 85, y: 48 },
        { label: 86, y: 47 },
        { label: 87, y: 51 },
        { label: 88, y: 49 },
        { label: 89, y: 52 },
        { label: 90, y: 54 },
        { label: 91, y: 50 },
        { label: 92, y: 51 },
        { label: 93, y: 54 },
        { label: 94, y: 53 }
      ]
    }
  ]
});

chartRelative.render();

function insertNewData(data) {
  var newDataPoints = [];
  var humidsum = 0;
  humidtitle.innerHTML = '';  

  for (i = 0; i < chartRelative.options.data[0].dataPoints.length; i++) {
    humidsum += data.list[i].main.humidity;
    newDataPoints.push({ label: i, y: data.list[i].main.humidity });
  }

  chartRelative.options.data[0].dataPoints = newDataPoints;

  humidsum = (humidsum / 95) * (1 / 100) * 100;

  console.log(humidsum);

  if (humidsum < 20 && humidsum > 0) {
    humiddesc.innerHTML = `<strong>Extremely Dry</strong>, Air is extremely dry, leading to potential discomfort,<br>
    dry skin, and an increased risk of static electricity.<br>
    Tips:<br>
    - Use a humidifier.<br>
    - Apply moisturizers.<br>
    - Stay hydrated.`;
  } else if (humidsum < 40 && humidsum > 20) {
    humiddesc.innerHTML = `<strong>Dry</strong>, Low humidity levels, which may cause some dryness and discomfort.<br>
    Adequate hydration and moisturizing may be needed.<br>
    Tips:<br>
  - Use a humidifier.<br>
  - Moisturize skin.<br>
  - Limit heating system use.`;
  } else if (humidsum < 60 && humidsum > 40) {
    humiddesc.innerHTML = `<strong>Comfortable</strong>, Optimal humidity range for human comfort.<br> 
    This range is associated with pleasant conditions and minimal discomfort.<br>
    Tips:<br>
  - Regular cleaning.<br>
  - Use exhaust fans.<br>
  - Enjoy outdoor activities.`;
  } else if (humidsum < 80 && humidsum > 60) {
    humiddesc.innerHTML = `<strong>Humid</strong>, Increasing humidity levels can be felt, and the air<br>
    may start to feel sticky. Some individuals may find it less comfortable.<br>
    Tips:<br>
  - Use air conditioning.<br>
  - Ensure good ventilation.<br>
  - Dry clothes outside.`;
  } else if (humidsum < 100 && humidsum > 80) {
    humiddesc.innerHTML = `<strong>Very Humid</strong>, High humidity levels leading to a muggy and uncomfortable environment. There may be a perception of heaviness in the air,<br> 
    and conditions could be conducive to mold growth.<br>
    Tips:<br>
  - Use dehumidifiers.<br>
  - Limit heat-generating activities.<br>
  - Address leaks promptly.`;
  }

  chartRelative.render();
}