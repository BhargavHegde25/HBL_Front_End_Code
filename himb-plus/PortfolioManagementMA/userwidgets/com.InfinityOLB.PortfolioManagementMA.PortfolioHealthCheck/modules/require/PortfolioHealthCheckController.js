define(['./PortfolioHealthCheckBusinessController'],function(PortfolioHealthCheckBusinessController) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.businessController = new PortfolioHealthCheckBusinessController();
      this.context = {};
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceCall', () => {
        return this._serviceCall;
      });
      defineSetter(this, 'serviceCall', value => {
        this._serviceCall = value;
      });
    },
    /**
    * @api: setContext
    * Method to set the context value from component consumer
    * @arg: context {Object} - data sent from consumer of this component
    * @return: NA
    **/
    setContext: function (context) {
      var scope = this;
      try {
        this.closeHealthPopup();
        scope.view.imgInfo.cursorType = "pointer";
        this.context = context;
        this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onError);
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    onServiceSuccess: function(response) {
      applicationManager.getPresentationUtility().showLoadingScreen();
             this.configurableData(response.portfolioHealth);
           },
    /**
    * @api: setError
    * Gets trigerred when any exception occurs in any method in view controller
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
    * @return: NA
    **/
    setError: function (errorMsg, method) {
      let errorObj = {
        "level": "ComponentViewController",
        "method": method,
        "error": errorMsg
      };
      this.onError(errorObj);
    },
    onError: function(err) {
      kony.print(JSON.stringify(err));
    },

    setDataPointsWidth: function(left) {
      this.view.flxDataPoints.centerX = "";
      this.view.flxDataPoints.left = left;
      this.view.flxDataPoints.forceLayout();
    },


    configurableData: function(response) { 
	  applicationManager.getNavigationManager().setCustomInfo("frmPortfolioOverviewGraph",response);
      let finalVal = [];
      for(let i in response) {
        let image = (response[i].healthStatus === "0") ? "confirmation_tick.png" : "info.png";
        finalVal.push(image);
      }
      this.view.imgOne.src = finalVal[0];
      this.view.lblAsset.text = response[0].healthParameter;
      this.view.imgTwo.src = finalVal[1];
      this.view.lblRiskAnalysis.text = response[1].healthParameter;
      this.view.imgThree.src = finalVal[2];
      this.view.lblInvestment.text = response[2].healthParameter;
      this.view.imgFour.src = finalVal[3];
      this.view.lblRecommended.text = response[3].healthParameter;     
      setTimeout(() => {
        this.view.WealthHealthChart.drawDataChart(response);
      }, 1000);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.forceLayout();
    },
    healthCheckClick: function() {
      this.btnClick();
    },
    onInfoHealthClick: function(){
      this.view.imgInfo.src = "bluealert_2.png";
      this.view.flxHealthInfo.setVisibility(true);
      this.view.InfoIconPortfolioHealth.flxCross.onClick = this.closeHealthPopup;
    },
    closeHealthPopup: function(){
      this.view.flxHealthInfo.setVisibility(false);
      this.view.imgInfo.src = "group_10_copy_4.png";
    },
    postShow: function() {
      this.view.btnHealthCheck.onClick = this.healthCheckClick;
      this.view.flxInfo.onClick = this.onInfoHealthClick;
    }
  };
});