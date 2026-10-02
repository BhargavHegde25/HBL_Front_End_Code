
function createPieChart(data){
  var jsonData = {
    "chart": {
                        "caption": "",
                        "subCaption": "",
                        "xAxisName": "Month",
                        "yAxisName": "Revenues (In USD)",
                        "theme": "rbblue",
                      "showBorder":"0",
                      "showShadow":"1",
                      "enableSlicing":"1",
                      "showPlotBorder":"1",
                      "plotBorderThickness":"2",
                      "plotBorderColor":"#0C60B3",
                      "plotBorderAlpha":"40",
                      "bgColor":"#1a98ff",
                      "bgAlpha":"0",
                      "canvasBGColor":"#1a98ff",
                      "canvasBGAlpha":"0",
                      "baseFontColor":"#ffffff",
                      "isSliced":"0",
                      "slicingDistance":"2",
                      "labelDistance":"20",
                      "smartLabelClearance":"1",
                      "labelFontColor":"#ffffff",
                      "labelFontAlpha":"80",
                      "labelFontSize":"12",
                      "smartLineColor":"#ffffff",
                      "pieRadius":"70",
                      "doughnutRadius":"55",
                      "animationDuration":".55",
					  "showPercentValues":"1"
                    },
                  "data":data
  };
   if (FusionCharts("pie") === undefined){
           var chart = new FusionCharts({
                "type": "doughnut2d",
              	"id":"pie",
                "renderAt": "chartContainer",
                "width": "500",
                "height": "220",
                "dataFormat": "json",

            });
  			chart.setJSONData(jsonData);
            chart.render();
}
  else{
    FusionCharts("pie").setJSONData(jsonData);
  }


  return true;
}




