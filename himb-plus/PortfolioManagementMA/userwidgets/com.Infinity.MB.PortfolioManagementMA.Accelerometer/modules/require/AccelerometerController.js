define(function() {

	return {
          preShow: function(){
        this.view.brwAMChart.onPageFinished=this.setChartData;  
      },
      setChartData: function(chartData){
          this.view.brwAMChart.evaluateJavaScript("setArc( " + JSON.stringify(chartData)+" );");
      },

	};
});