
var chartWind = new CanvasJS.Chart("chartContainerWind", {
    backgroundColor: "rgba(255,255,255,0.1)",
    axisY: {
        interval: 0.5,
        maximum: 3.5,
        minimum: 0,
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
            { label: "10.30 AM", y: 2.5},
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
            { label: "16.30 PM", y: 1.9 }
        ]
    }]
});
chartWind.render()