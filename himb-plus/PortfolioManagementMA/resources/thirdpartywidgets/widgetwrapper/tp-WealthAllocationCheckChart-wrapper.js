WealthAllocationCheckChart = {

   initializeWidget: function (parentNode, widgetModel) {
        var ele = document.createElement("div");
        var area = '<div id="WealthAllocationCheckChart" style = "height:100%;  width:100%;"></div>';
        parentNode.innerHTML = area;
        var data = widgetModel.chartData;
        WealthAllocationCheckChart.modelChange(widgetModel, "Refresh", data);
        WealthAllocationCheckChart.setDataForWealthAllocationCheckChart(widgetModel);
    },

     /**
    * modelChange : Method for used to update the chart widget.
    *  Event faired widgetModel propertyChanged
    * @member of {BarChart}
    * @param {widgetModel, propertyChanged, propertyValue} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    */

    modelChange: function (widgetModel, propertyChanged, propertyValue) {
        WealthAllocationCheckChart.setDataForWealthAllocationCheckChart(widgetModel);
    },

   /**
    * setDataForWealthAllocationCheckChart : used to create a chart widget.
    * @member of {DonutChart}
    * @param {widgetModel} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    * value -- Used to display the bar width.
    * label --  Used to display the label.
    */

    setDataForWealthAllocationCheckChart: function (widgetModel) {
      var data = widgetModel.chartData;var data = widgetModel.chartData;
	  if(data.offSetVal === false){
      if(data.hasOwnProperty("seriesArray")){
      if(data.seriesArray.length === 1){
          if(data.seriesArray[0].length >=7){
              widgetModel.height = ((data.seriesArray[0].length * 25) + 75)+"%";
          }else{
              widgetModel.height = "100%";
          }
      }else if(data.seriesArray.length === 2){
          if(data.seriesArray[0].length + data.seriesArray[1].length >=6){
              widgetModel.height = ((data.seriesArray[0].length * 25) + 75)+"%";
          }else{
              widgetModel.height = "100%";
          }
      }
      }
	  }
	   //Bharath IW-3748 start
	  if(data.offSetVal === true){
		 if(data.hasOwnProperty("seriesArray")){
            if(data.seriesArray.length === 2){
               if(data.seriesArray[0].length >=6){
                   widgetModel.height = ((data.seriesArray[0].length * 20) + 20)+"%";
               }else{
                   widgetModel.height = "100%";
               }
            }
          }
	  }//Bharath IW-3748 ends
      if(Object.keys(data).length !== 0){
		
		$(document).ready(
			document.getElementById('WealthAllocationCheckChart') ?
				drawWealthAllocationChart.bind(null, data.labelArray, data.seriesArray,data.colArray,data.offSetVal) : null
        );
      }
    }
};