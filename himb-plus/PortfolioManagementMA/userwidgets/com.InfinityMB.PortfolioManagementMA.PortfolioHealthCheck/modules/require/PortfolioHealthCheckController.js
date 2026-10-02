/*eslint-disable*/

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
        this.context = context;
        this.businessController.fetchDetails(this._serviceCall.ServiceName,this._serviceCall.OperationName,this._serviceCall.ObjectName,this.context,this.onServiceSuccess,this.onError);
      } catch (err) {
        scope.setError(err, "setContext");
      }
    },
    onServiceSuccess: function(response) {
      try{
      var chartData = response.portfolioHealth;
      this.configurableData(chartData);
      //set the information, so that it can be used in healthcheck form
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo('frmHealthCheckChartData', chartData);
        }catch(err) {
        this.setError(err, "onServiceSuccess");
      } 
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
    configurableData: function(response) { 
      try{
      this.view.WealthHealthChart.drawDataChart(response);
      let finalVal = [];
      for(let i in response) {
        let image = (response[i].healthStatus === "0") ? "confirmation_tick.png" : "aa_password_error.png";
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
        }catch(err) {
        this.setError(err, "configurableData");
      } 
    },
    healthCheckClick: function() {
      try{
      this.btnClick();
        }catch(err) {
        this.setError(err, "healthCheckClick");
      } 
    },
    onInfoHealthClick: function() {
      try{
      let scope = this;
      this.view.imgInfo.src = "group_10_copy_4.png";
      var basicProperties =
          {
            "message": kony.i18n.getLocalizedString("i18n.wealth.strategy.infoHealthCheck"),
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": kony.i18n.getLocalizedString("i18n.wealth.portfolioHealth"),
            "noLabel": "",
            "yesLabel": kony.i18n.getLocalizedString("kony.mb.common.close"),
            "alertIcon": "",
            "alertHandler": function(response) {
              scope.view.imgInfo.src = "group_10_copy_4.png";
            }
          };
      var pspConfig = {
        "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
      };

      applicationManager.getPresentationUtility().showAlertMessage(basicProperties, pspConfig);
      //this.view.flxHealthInfo.setVisibility(true);
      //this.view.flxCross.onClick = this.closePopup;
        }catch(err) {
        this.setError(err, "onInfoHealthClick");
      } 
    },
//     closePopup: function(){
//       this.view.flxHealthInfo.setVisibility(false);
//       this.view.imgInfo.src = "infoappbar.png";
//     },
    postShow: function() {
      try{
      var width = this.view.flxButton.frame.width;
      if(width>0){
            this.view.btnHealthCheck.width = (width-80)+"dp";
      }else{
            this.view.btnHealthCheck.width = "261dp";
      }

      if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
        this.view.btnHealthCheck.right = "40dp";
      }else{
        this.view.btnHealthCheck.left = "40dp";
      }
      this.view.btnHealthCheck.onClick = this.healthCheckClick;
      this.view.flxInfo.onClick = this.onInfoHealthClick;
        }catch(err) {
        this.setError(err, "postShow");
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