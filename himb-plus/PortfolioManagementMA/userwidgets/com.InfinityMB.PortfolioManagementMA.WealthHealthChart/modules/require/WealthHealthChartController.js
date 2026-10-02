
define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      try{
      this.view.brwHealthChart.onPageFinished = this.resetData;
	}catch(err) {
        this.setError(err, "initGettersSetters");
      } 
    },
    drawDataChart: function(response) {
      try{
      this.chartData = response;
      let finalVal = [];
      for(let i in response) {
        let value = (response[i].healthStatus === "0") ? 25 : 0;
        finalVal.push(value);
      }
      let total = finalVal[0] + finalVal[1] + finalVal[2] + finalVal[3];
      let labelVal = (total === 100) ? "Very Strong" : ((total === 75) ? "Strong" : (total === 50) ? "Moderate" : "Weak");
      let colorCode = (total === 100) ? "#04A615" : ((total === 75) ? "#54D75D" : (total === 50) ? "#FFA500" : "#E74174");
      this.view.brwHealthChart.evaluateJavaScript("AddWealthChart( " + JSON.stringify(labelVal)+" ," + JSON.stringify(total) +"," +JSON.stringify("#E3E3E3")+"," +JSON.stringify(colorCode)+" );");
       }catch(err) {
        this.setError(err, "drawDataChart");
      } 
    },
    resetData: function(){
      try{
      this.drawDataChart(this.chartData);
        }catch(err) {
        this.setError(err, "resetData");
      } 
    },
    /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "level" : "ComponentController",
        "method" : method,
        "error": errorMsg
      };
      scope.onErrorMain(errorObj);
    },
    onErrorMain:function(err){
      kony.print(JSON.stringify(err));
    }
  };
});