define(function() {



 return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._data = {};
      var AccelerometerChart = new kony.ui.CustomWidget({
        "id": "AccelerometerChartWealth",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "WealthAccelerometerChart",
        "chartData": this._data,
        "OnClickOfPie": function() {}
      });



    this.view.flxAccelerometerChart.add(AccelerometerChart);



   },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {



   },
    setData: function(response){
      
      this.view.flxAccelerometerChart.AccelerometerChartWealth.chartData = response;
    }
  };
});