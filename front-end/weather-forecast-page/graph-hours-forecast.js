const formdom = document.getElementById("form-input");
const cityinput = document.getElementById("city-input");
const headerFore = document.getElementById("header-fore");

formdom.addEventListener('submit', async (e) => {
	e.preventDefault();
	try {
		const data = await axios.post("/api/v1/weather/forecast",
			{
				city_name: cityinput.value
			})
		console.log(Math.round(data.data.list[0].main.temp - 273, 15));
		createDatas(data.data);
		addImages(data.data);
		console.log(data.data.list[0].weather[0].main);
	} catch (e) {
		console.log(e);
	}
})

var chart = new CanvasJS.Chart("chartContainer", {
	backgroundColor: "rgba(255,255,255,0.1)",
	axisY: {
		maximum: 50,
		minimum: -20,
		gridThickness: 0,
		tickLength: 0,
		lineThickness: 0,
		labelFormatter: function () {
			return " ";
		}
	},
	axisX: {
		gridThickness: 0,
		tickLength: 0,
		lineThickness: 0,
		labelFontSize: 15,
		// labelAngle: 45
	},
	toolTip: {
		// shared: true,
		content: "{name} </br> <strong>Temperature: {y} °C"
	},
	data: [{
		type: "line",
		fillOpacity: 0.1,
		color: "#91AAB1",
		indexLabel: "{y}°C",
		axisXType: "primary",
		dataPoints: [
			{ label: "00:00 AM", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: "05:00 AM", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: "12:00 PM ", y: 1, name: "clearskyday" }

		]
	}],
	animationEnabled: true
});

chart.render();

function createDatas(data) {
	headerFore.innerHTML = '';
	var newDataPoints = [];

	headerFore.innerText = `12 Hours Forecast Onwards in ${cityinput.value[0].toUpperCase() + cityinput.value.slice(1)}`

	for (i = 0; i < chart.options.data[0].dataPoints.length; i++) {
		var timestamp = data.list[i].dt;
		var date = new Date(timestamp * 1000);
		var hours = date.getHours();
		var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		var label = hours + ':' + minutes;

		newDataPoints.push({ label: label, y: Math.round(data.list[i].main.temp - 273, 15) });
	}

	for (i = 1; i < newDataPoints.length; i++) {
		if (newDataPoints[i].label === newDataPoints[i - 1].label) {
			newDataPoints[i - 1].label = null;
		}
	}
	chart.options.data[0].dataPoints = newDataPoints;
	chart.render();
}

var images = [];

function addImages(data) {
	$("#chartContainer>.canvasjs-chart-container img").remove();
	images = [];

	for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
		var dpsName = data.list[i].weather[0].main;
		var dpsDesc = data.list[i].weather[0].description;
		var dpsVal = '';
		if (dpsDesc == "clear sky") {
			dpsVal = dpsDesc;
			images.push($("<img>").attr("src", "../property/weather-logo/clear-sky-day.png"));
		}
		else if (dpsDesc == "few clouds") {
			dpsVal = dpsDesc;
			images.push($("<img>").attr("src", "../property/weather-logo/few-clouds-day.png"));
		}
		else if (dpsDesc == "broken clouds") {
			dpsVal = dpsDesc;
			images.push($("<img>").attr("src", "../property/weather-logo/broken-clouds.png"));
		} else if (dpsDesc == "scattered clouds") {
			dpsVal = dpsDesc;
			images.push($("<img>").attr("src", "../property/weather-logo/scattered-clouds.png"));
		} else if (dpsDesc == "overcast clouds") {
			dpsVal = dpsDesc
			images.push($("<img>").attr("src", "../property/weather-logo/scattered-clouds.png"));
		} else if (dpsName == "Rain") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/rain.png"));
		} else if (dpsName == "Drizzle") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/drizzle.png"));
		} else if (dpsName == "Thunderstorm") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/thunderstorm.png"));
		} else if (dpsName == "Snow") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/13d@2x.png"));
		} else if (dpsName == "Mist") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Haze") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Smoke") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Fog") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Dust") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Sand") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Ash") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Squall") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Tornado") {
			dpsVal = dpsName;
			images.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		}

		images[i].attr("class", dpsVal).appendTo($("#chartContainer>.canvasjs-chart-container"));
		positionImage(images[i], i);
	}
	chart.render();
}
 
function positionImage(image, index) {
	var imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[index].x);
	var imageTop = chart.axisY[0].convertValueToPixel(chart.axisY[0].maximum + 8);

	image.width("40px")

		.css({
			"left": imageCenter - 20 + "px",
			"position": "absolute", "top": imageTop - 20 + "px",
			"position": "absolute"
		});
}

$(window).resize(function () {
	var clearskydayCounter = 0, clearskynightCounter = 0, fewcloudsdayCounter = 0, fewcloudsnightCounter = 0,
		scatteredcloudsCounter = 0, rainCounter = 0, showerrainCounter = 0, thunderstormCounter = 0;
	var imageCenter = 0;
	for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
		imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[i].x) - 20;
		if (chart.data[0].dataPoints[i].name == "clearskyday") {
			$(".cloudy").eq(clearskydayCounter++).css({ "left": imageCenter });
		} else if (chart.data[0].dataPoints[i].name == "clearskynight") {
			$(".rainy").eq(clearskynightCounter++).css({ "left": imageCenter });
		} else if (chart.data[0].dataPoints[i].name == "fewcloudsday") {
			$(".sunny").eq(fewcloudsdayCounter++).css({ "left": imageCenter });
		} else if (chart.data[0].dataPoints[i].name == "fewcloudsnight") {
			$(".stormy").eq(fewcloudsnightCounter++).css({ "left": imageCenter });
		} else if (chart.data[0].dataPoints[i].name == "scatteredclouds") {
			$(".rainHeavily").eq(scatteredcloudsCounter++).css({ "left": imageCenter });
		} else if (chart.data[0].dataPoints[i].name == "rain") {
			$(".sunny").eq(rainCounter++).css({ "left": imageCenter });
		} else if (chart.data[0].dataPoints[i].name == "showerrain") {
			$(".stormy").eq(showerrainCounter++).css({ "left": imageCenter });
		} else if (chart.data[0].dataPoints[i].name == "thunderstorm") {
			$(".rainHeavily").eq(thunderstormCounter++).css({ "left": imageCenter });
		}
	}
});

function formatter(e) {
	if (e.index === 0 && e.dataPoint.x === 0) {
		return " Min " + e.dataPoint.y[e.index] + "°";
	} else if (e.index == 1 && e.dataPoint.x === 0) {
		return " Max " + e.dataPoint.y[e.index] + "°";
	} else {
		return e.dataPoint.y[e.index] + "°";
	}
} 
