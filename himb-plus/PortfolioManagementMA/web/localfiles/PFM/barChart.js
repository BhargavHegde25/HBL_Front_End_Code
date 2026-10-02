function createBarChart(data){
  var jsonData = {
  		"chart": {
            	
                "numberPrefix": "$",
                "showDivLineValues":"0",
                "divLineAlpha":"100", 
                "paletteColors": "#ffffff",
                "useRoundEdges":"1", 
               	"showBorder":"0",
               	"showYAxisValues":"0", 
                "bgAlpha":"0",
                "canvasBGAlpha":"0",
                "numDivLines":"0" ,
                "showValues":"0"
            },                                
            "data": data
  };
   if (FusionCharts("bar") === undefined){
           var chart = new FusionCharts({
                "type": "column2d",
              	"id":"bar",
                "renderAt": "barContainer",
                "width": "400",
                "height": "200",
                "dataFormat": "json",

            });
  			chart.setJSONData(jsonData);
            chart.render();
}
  else{
    FusionCharts("bar").setJSONData(jsonData);
  }
  return true;
}