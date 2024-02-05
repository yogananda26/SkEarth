var chart = new CanvasJS.Chart("chartContainer", {            
    backgroundColor: "rgba(255,255,255,0.1)",
    axisY: {
        maximum: 45,
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
			{ label: "4:00 PM", y: 1, name: "stormy" },
			{ label: " ", y: 26, name: "cloudy" },
			{ label: "5:00 PM", y: 32, name: "sunny" },
			{ label: " ", y: 34, name: "sunny" },
			{ label: "6:00 PM", y: 29, name: "rainy" }
			
		]
	}]
});

chart.render();

var images = [];    

addImages(chart);

function addImages(chart) {
	for(var i = 0; i < chart.data[0].dataPoints.length; i++){
		var dpsName = chart.data[0].dataPoints[i].name;
		if(dpsName == "cloudy"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/cloudy.png"));
		} else if(dpsName == "rainy"){
		images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/rainy.png"));
		} else if(dpsName == "sunny"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/sunny.png"));
		} else if(dpsName == "stormy"){
			images.push($("<img>").attr("src", "http://localhost:2000/weather-forecast-page/stormy.png"));
		}
    

	images[i].attr("class", dpsName).appendTo($("#chartContainer>.canvasjs-chart-container"));
	positionImage(images[i], i);
	}
}

function positionImage(image, index) {
	var imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[index].x);
	var imageTop =  chart.axisY[0].convertValueToPixel(chart.axisY[0].maximum + 8);

	image.width("40px")
    
	.css({ "left": imageCenter - 20 + "px",
	"position": "absolute","top":imageTop + "px",
	"position": "absolute"});
}

$( window ).resize(function() {
	var cloudyCounter = 0, rainyCounter = 0, sunnyCounter = 0, stormyCounter = 0;    
	var imageCenter = 0;
	for(var i=0;i<chart.data[0].dataPoints.length;i++) {
		imageCenter = chart.axisX[0].convertValueToPixel(chart.data[0].dataPoints[i].x) - 20;
		if(chart.data[0].dataPoints[i].name == "cloudy") {					
			$(".cloudy").eq(cloudyCounter++).css({ "left": imageCenter});
		} else if(chart.data[0].dataPoints[i].name == "rainy") {
			$(".rainy").eq(rainyCounter++).css({ "left": imageCenter});  
		} else if(chart.data[0].dataPoints[i].name == "sunny") {
			$(".sunny").eq(sunnyCounter++).css({ "left": imageCenter});  
		} else if(chart.data[0].dataPoints[i].name == "stormy") {
			$(".stormy").eq(stormyCounter++).css({ "left": imageCenter});  
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
