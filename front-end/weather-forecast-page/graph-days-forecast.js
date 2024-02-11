var chartDays = new CanvasJS.Chart("chartContainerDays", {            
    backgroundColor: "rgba(255,255,255,0.1)",
    axisY: {
        maximum: 50,
        minimum: 0,
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
        labelFormatter: function(){
        return " ";
        }
    },
    axisX: {
        gridThickness: 0,
        tickLength: 0,
        lineThickness: 0,
        labelFontSize: 15
    },
	toolTip:{
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
			{ label: "3:00 PM", y: 32, name: "cloudy" },
			{ label: " ", y: 10, name: "rainy" },
			{ label: "4:00 PM", y: 10, name: "stormy" },
			{ label: " ", y: 26, name: "stormy" },
			{ label: "5:00 PM", y: 32, name: "cloudy" },
			{ label: " ", y: 34, name: "sunny" },
			{ label: "6:00 PM", y: 29, name: "rainy" }
			
		]
	}]
});

chartDays.render();

var images = [];
            
addImages(chartDays, "chartContainerDays");

function addImages(chartDays) {
	for(var i = 0; i < chartDays.data[0].dataPoints.length; i++){
		var dpsName = chartDays.data[0].dataPoints[i].name;
		if(dpsName == "clearskyday"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/cleaar-sky-day.png"));
		} else if(dpsName == "clearskynight"){
		images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/clear-sky-night.png"));
		} else if(dpsName == "fewcloudsday"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/fewcloudsday.png"));
		} else if(dpsName == "fewcloudsnight"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/fewcloudsnight.png"));
		} else if(dpsName == "scatteredclouds"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/scattered-clouds.png"));
		} else if(dpsName == "rain"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/rain.png"));
		} else if(dpsName == "showerrain"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/shower-rain.png"));
		} else if(dpsName == "thunderstorm"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/thunderstorm.png"));
		}
    

	images[i].attr("class", dpsName).appendTo($("#chartContainer>.canvasjs-chart-container"));
	positionImage(images[i], i);
	}
}

function positionImage(image, index) {
	var imageCenter = chartDays.axisX[0].convertValueToPixel(chartDays.data[0].dataPoints[index].x);
	var imageTop =  chartDays.axisY[0].convertValueToPixel(chartDays.axisY[0].maximum + 8);

	image.width("40px")
    
	.css({ "left": imageCenter - 20 + "px",
	"position": "absolute","top":imageTop + "px",
	"position": "absolute"});
}

$( window ).resize(function() {
	var clearskydayCounter = 0, clearskynightCounter = 0, fewcloudsdayCounter = 0, fewcloudsnightCounter = 0, 
    scatteredcloudsCounter = 0, rainCounter = 0, showerrainCounter = 0, thunderstorm = 0;    
	var imageCenter = 0;
	for(var i=0;i<chartDays.data[0].dataPoints.length;i++) {
		imageCenter = chartDays.axisX[0].convertValueToPixel(chartDays.data[0].dataPoints[i].x) - 20;
		if(chartDays.data[0].dataPoints[i].name == "clearskyday") {					
			$(".cloudy").eq(clearskydayCounter++).css({ "left": imageCenter});
		} else if(chartDays.data[0].dataPoints[i].name == "clearskynight") {
			$(".rainy").eq(clearskynightCounter++).css({ "left": imageCenter});  
		} else if(chartDays.data[0].dataPoints[i].name == "fewcloudsday") {
			$(".sunny").eq(fewcloudsdayCounter++).css({ "left": imageCenter});  
		} else if(chartDays.data[0].dataPoints[i].name == "fewcloudsnight") {
			$(".stormy").eq(fewcloudsnightCounter++).css({ "left": imageCenter});  
		} else if(chartDays.data[0].dataPoints[i].name == "scatteredclouds") {
			$(".rainHeavily").eq(scatteredcloudsCounter++).css({ "left": imageCenter});  
		} else if(chartDays.data[0].dataPoints[i].name == "rain") {
			$(".sunny").eq(rainCounter++).css({ "left": imageCenter});  
		} else if(chartDays.data[0].dataPoints[i].name == "showerrain") {
			$(".stormy").eq(showerrainCounter++).css({ "left": imageCenter});  
		} else if(chartDays.data[0].dataPoints[i].name == "thunderstorm") {
			$(".rainHeavily").eq(thunderstormCounter++).css({ "left": imageCenter});  
		}                 
	}
});

function formatter(e) { 
	if(e.index === 0 && e.dataPoint.x === 0) {
		 return " Min " + e.dataPoint.y[e.index] + "°";
	} else if(e.index == 1 && e.dataPoint.x === 0) {
		return " Max " + e.dataPoint.y[e.index] + "°";
	} else{
		return e.dataPoint.y[e.index] + "°";
	}
} 
