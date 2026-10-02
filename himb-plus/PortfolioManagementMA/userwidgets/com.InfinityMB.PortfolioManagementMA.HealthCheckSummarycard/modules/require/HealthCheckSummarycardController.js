define(['CommonUtilities'],function(CommonUtilities) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.healthStatus = 1;
    },

    initGettersSetters: function() {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
    },

    preShow: function() {
      try{
        // information retrieved from healthcheck card component
        var navManager = applicationManager.getNavigationManager();
        this.summaryData = navManager.getCustomInfo('frmHealthCheckSummaryCard');
        this.chartResponse = navManager.getCustomInfo('frmHealthCheckChartData');

        this.view.WealthHealthChart.drawDataChart(this.chartResponse);
      } catch(err) {
        this.setError(err, "preShow");
      }
    },

    getHealthStatus: function(healthStatus){
      this.healthStatus = healthStatus;
      if (this.healthStatus === 1) {
        this.view.lblHealth.text = kony.i18n.getLocalizedString("i18n.wealth.healthInfoStrong");
      } else {
        this.view.lblHealth.text = kony.i18n.getLocalizedString("i18n.wealth.healthInfoWeak");
      }
    },

    postShow: function(){
      try{
        var val = this.summaryData;
        // WIW-1485
        this.view.lblInvestmentAccount.text = val.displayName;
        var forUtility = applicationManager.getFormatUtilManager();
        // WIW-1420
        //   if(val.hasOwnProperty("OneM")) {
        var totalVal = forUtility.formatAmountandAppendCurrencySymbol(val.marketValue, val.referenceCurrency);
        var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
        var todaysPL = forUtility.formatAmountandAppendCurrencySymbol(val.todayPLAmount, val.referenceCurrency);
        this.view.lblTotalVal.text = totalVal;
        //var flxUnrealisedPL = this.view.flxUnrealisedPL;
        var lbllUnrealisedPL = this.view.lblUnrealisedPL;
        var lblUnrealisedPLValue = this.view.lblUnrealisedPLValue;

        if (val.unRealizedPL =='P') {
          lblUnrealisedPLValue.skin = "sknIbl2f8523SSPsb45px";
          lblUnrealisedPLValue.text = (unrealizedPL !== "" && val.unRealizedPLPercentage !== "") ? ("+" + unrealizedPL + "(+" + val.unRealizedPLPercentage + "%)") : ((unrealizedPL != "") ? ("+" + unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? ("(+" + val.unRealizedPLPercentage + "%)") : ""));
        } else {
          lblUnrealisedPLValue.skin = "sknIblEE0005SSPsb45px";
          lblUnrealisedPLValue.text = (unrealizedPL !== "" && val.unRealizedPLPercentage !== "") ? ((unrealizedPL[0]=="-"?unrealizedPL:"-" +unrealizedPL) +(val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") ): ((unrealizedPL != "") ? (unrealizedPL[0]=="-"?unrealizedPL:"-" +unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? (val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") : ""));
        }
        if(val.todayPLAmount!==""){
          this.view.flxTodayPL.isVisible=true;
          this.view.flxTodayPLValue.isVisible=true;
          if (val.todayPLAmount >= 0) {
            this.view.lblTodayPLValue.skin = "sknIbl2f8523SSPsb45px";
            this.view.lblTodayPLValue.text = "+" + todaysPL.replace('+','') + "(+" + val.todayPLPercentage.replace('+','') + "%)";
          } else {
            this.view.lblTodayPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblTodayPLValue.text = "-" + todaysPL.replace('-','') + "(-" + val.todayPLPercentage.replace('-','') + "%)";
          }
        }else{
          this.view.flxTodayPL.isVisible=false;
          this.view.flxTodayPLValue.isVisible=false;
        }

        //   }


        var portfolioHealth = this.chartResponse;
        let finalVal = [];
        for (let i in portfolioHealth) {
          let value = (portfolioHealth[i].healthStatus === "0") ? 25 : 0;
          finalVal.push(value);
        }
        let total = finalVal[0] + finalVal[1] + finalVal[2] + finalVal[3];
        if(this.healthStatus === 1){
          this.view.lblHealth.text = kony.i18n.getLocalizedString("i18n.wealth.healthInfoStrong");
        }
        else{
          this.view.lblHealth.text = kony.i18n.getLocalizedString("i18n.wealth.healthInfoWeak");
        }
      } catch(err) {
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
    onErrorMain :function(err){
      kony.print(JSON.stringify(err));
    }


  };
});