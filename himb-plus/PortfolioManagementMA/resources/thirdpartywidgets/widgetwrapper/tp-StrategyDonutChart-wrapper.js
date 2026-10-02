StrategyDonutChart = {

   initializeWidget: function (parentNode, widgetModel) {
        var ele = document.createElement("div");
        var area = '<div id="StrategyDonutChart" style = "height:100%;  width:100%;"></div>';
        parentNode.innerHTML = area;
        var data = widgetModel.chartData;
        StrategyDonutChart.modelChange(widgetModel, "Refresh", data);
        StrategyDonutChart.setDataForStrategyDonutChart(widgetModel);
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
        StrategyDonutChart.setDataForStrategyDonutChart(widgetModel);
    },

   /**
    * setDataForStrategyDonutChart : used to create a chart widget.
    * @member of {DonutChart}
    * @param {widgetModel} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    * value -- Used to display the bar width.
    * label --  Used to display the label.
    */

    setDataForStrategyDonutChart: function (widgetModel) {
      var data = widgetModel.chartData;
      if(Object.keys(data).length !== 0){
		
		$(document).ready(
			document.getElementById('StrategyDonutChart') ?
				drawStrategyDonutChart.bind(null, data,undefined,undefined) : null
        );
      }
    }
};