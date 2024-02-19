const formsdom = document.getElementById("form-input");
const citiesinput = document.getElementById("city-input");
const headerDays = document.getElementById("header-fores");

formsdom.addEventListener('submit', async (e) => {
	e.preventDefault();
	try {
		const data = await axios.post("/api/v1/weather/forecast",
			{
				city_name: citiesinput.value
			})
		console.log(Math.round(data.data.list[0].main.temp - 273, 15));
		// displayCurrentContent(data.data);
		createDatass(data.data);
		// images = [];
		addImagess(data.data);
		console.log(data.data.list[0].weather[0].main);
	} catch (e) {
		console.log(e);
	}
})

var chartDays = new CanvasJS.Chart("chartContainerDays", {
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
			{ label: "3:00 PM", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: "4:00 PM", y: 1, name: "clearskyday" },
			{ label: " ", y: 1, name: "clearskyday" },
			{ label: "5:00 PM", y: 1, name: "clearskyday" }

		]
	}],
	animationEnabled: true
});

chartDays.render();

function createDatass(data) {
	headerDays.innerHTML = '';
	var newDataPoints = [];

	headerDays.innerText = `5 Days Forecast in ${citiesinput.value[0].toUpperCase() + citiesinput.value.slice(1)}`;

	const timestamp1 = new Date(data.list[0].dt * 1000).toDateString();
	const timestamp2 = new Date(data.list[24].dt * 1000).toDateString();
	const timestamp3 = new Date(data.list[48].dt * 1000).toDateString();
	const timestamp4 = new Date(data.list[72].dt * 1000).toDateString();
	const timestamp5 = new Date(data.list[83].dt * 1000).toDateString();

	chartDays.options.data[0].dataPoints[0].y = Math.round(data.list[0].main.temp - 273, 15)
	chartDays.options.data[0].dataPoints[0].label = timestamp1;

	chartDays.options.data[0].dataPoints[1].y = Math.round(data.list[24].main.temp - 273, 15)
	chartDays.options.data[0].dataPoints[1].label = timestamp2;

	chartDays.options.data[0].dataPoints[2].y = Math.round(data.list[48].main.temp - 273, 15)
	chartDays.options.data[0].dataPoints[2].label = timestamp3;

	chartDays.options.data[0].dataPoints[3].y = Math.round(data.list[72].main.temp - 273, 15)
	chartDays.options.data[0].dataPoints[3].label = timestamp4;

	chartDays.options.data[0].dataPoints[4].y = Math.round(data.list[83].main.temp - 273, 15)
	chartDays.options.data[0].dataPoints[4].label = timestamp5;

	chartDays.render();
	console.log('Hey over here');
}

var imagess = [];

function addImagess(data) {
	$("#chartContainerDays>.canvasjs-chart-container img").remove();
	imagess = [];
	for (var i = 0; i < chartDays.data[0].dataPoints.length; i++) {
		var dpsName = data.list[i + 24].weather[0].main;
		var dpsDesc = data.list[i + 24].weather[0].description;
		var dpsVal = '';
		if (dpsDesc == "clear sky") {
			dpsVal = dpsDesc;
			imagess.push($("<img>").attr("src", "../property/weather-logo/clear-sky-day.png"));
		}
		else if (dpsDesc == "few clouds") {
			dpsVal = dpsDesc;
			imagess.push($("<img>").attr("src", "../property/weather-logo/few-clouds-day.png"));
		}
		else if (dpsDesc == "broken clouds") {
			dpsVal = dpsDesc;
			imagess.push($("<img>").attr("src", "../property/weather-logo/broken-clouds.png"));
		} else if (dpsDesc == "scattered clouds") {
			dpsVal = dpsDesc;
			imagess.push($("<img>").attr("src", "../property/weather-logo/scattered-clouds.png"));
		} else if (dpsDesc == "overcast clouds") {
			dpsVal = dpsDesc
			imagess.push($("<img>").attr("src", "../property/weather-logo/scattered-clouds.png"));
		} else if (dpsName == "Rain") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/rain.png"));
		} else if (dpsName == "Drizzle") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/drizzle.png"));
		} else if (dpsName == "Thunderstorm") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/thunderstorm.png"));
		} else if (dpsName == "Snow") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/13d@2x.png"));
		} else if (dpsName == "Mist") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Haze") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Smoke") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Fog") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Dust") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Sand") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Ash") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Squall") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		} else if (dpsName == "Tornado") {
			dpsVal = dpsName;
			imagess.push($("<img>").attr("src", "../property/weather-logo/50d@2x.png"));
		}

		imagess[i].attr("class", dpsVal).appendTo($("#chartContainerDays>.canvasjs-chart-container"));
		positionImages(imagess[i], i);
	}
	chartDays.render();
	console.log('Hey over here');
}

function positionImages(image, index) {
	var imageCenter = chartDays.axisX[0].convertValueToPixel(chartDays.data[0].dataPoints[index].x);
	var imageTop = chartDays.axisY[0].convertValueToPixel(chartDays.axisY[0].maximum + 8);

	image.width("40px")

		.css({
			"left": imageCenter - 20 + "px",
			"position": "absolute", "top": imageTop - 20 + "px",
			"position": "absolute"
		});
	console.log('Hey over here');
}

$(window).resize(function () {
	var clearskydayCounterr = 0, clearskynightCounterr = 0, fewcloudsdayCounterr = 0, fewcloudsnightCounterr = 0,
		scatteredcloudsCounterr = 0, rainCounterr = 0, showerrainCounterr = 0, thunderstormCounterr = 0;
	var imageCenter = 0;
	for (var i = 0; i < chartDays.data[0].dataPoints.length; i++) {
		imageCenter = chartDays.axisX[0].convertValueToPixel(chartDays.data[0].dataPoints[i].x) - 20;
		if (chartDays.data[0].dataPoints[i].name == "clearskyday") {
			$(".cloudy").eq(clearskydayCounterr++).css({ "left": imageCenter });
		} else if (chartDays.data[0].dataPoints[i].name == "clearskynight") {
			$(".rainy").eq(clearskynightCounterr++).css({ "left": imageCenter });
		} else if (chartDays.data[0].dataPoints[i].name == "fewcloudsday") {
			$(".sunny").eq(fewcloudsdayCounterr++).css({ "left": imageCenter });
		} else if (chartDays.data[0].dataPoints[i].name == "fewcloudsnight") {
			$(".stormy").eq(fewcloudsnightCounterr++).css({ "left": imageCenter });
		} else if (chartDays.data[0].dataPoints[i].name == "scatteredclouds") {
			$(".rainHeavily").eq(scatteredcloudsCounterr++).css({ "left": imageCenter });
		} else if (chartDays.data[0].dataPoints[i].name == "rain") {
			$(".sunny").eq(rainCounterr++).css({ "left": imageCenter });
		} else if (chartDays.data[0].dataPoints[i].name == "showerrain") {
			$(".stormy").eq(showerrainCounterr++).css({ "left": imageCenter });
		} else if (chartDays.data[0].dataPoints[i].name == "thunderstorm") {
			$(".rainHeavily").eq(thunderstormCounterr++).css({ "left": imageCenter });
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
