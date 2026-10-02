define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
        this._data = {};
           var StrategyDonutChart = new kony.ui.CustomWidget({
        "id": "StrategyDonutChart",
        "isVisible": true,        
        "width": "100%",
        "height": "100%", 
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "StrategyDonutChart",
        "chartData": this._data,
        "OnClickOfPie": function() {}
      });

      this.view.flxDonut.add(StrategyDonutChart);
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      
      drawDataChart:function(response){
//         var graphData = {             
//     response: response,
//     colors: colors
// };
        var graphData=response;
        this.view.flxDonut.StrategyDonutChart.chartDonutWidth = 35;
        this.view.flxDonut.StrategyDonutChart.chartData = graphData;
      }
	};
});