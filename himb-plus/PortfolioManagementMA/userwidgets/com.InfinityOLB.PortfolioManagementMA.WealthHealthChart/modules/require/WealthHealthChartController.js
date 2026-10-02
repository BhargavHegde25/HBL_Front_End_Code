define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._data = {};
      var healthChart = new kony.ui.CustomWidget({
        "id": "portfolioHealthChart",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "WealthHealthChart",
        "chartData": this._data,
        "OnClickOfPie": function() {}
      });

      this.view.flxChart.add(healthChart);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    drawDataChart: function(response) {
      let finalVal = [];
      for(let i in response) {
        let value = (response[i].healthStatus === "0") ? 25 : 0;
          finalVal.push(value);
      }
      let total = finalVal[0] + finalVal[1] + finalVal[2] + finalVal[3];
      let labelVal = (total === 100) ? "Very Strong" : ((total === 75) ? "Strong" : (total === 50) ? "Moderate" : "Weak");
      let colorCode = (total === 100) ? "#04A615" : ((total === 75) ? "#54D75D" : (total === 50) ? "#FFA500" : "#E74174");
      let data = {
        label: labelVal,
        value: total,
        firstColor: "#E3E3E3",
        secondColor: colorCode
      };
      this.view.flxChart.portfolioHealthChart.chartData = data;
    }
  };
});