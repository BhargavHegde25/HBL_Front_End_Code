define(['CommonUtilities'],function(CommonUtilities) {

  return {
    /**
    * @api: setData
    * Gets trigerred when it's invoked in frmHealthCheckController
    * @arg1: respObj {jsonobject} - respObject from portfolioOverview screen
    * @arg2: graphResponse {jsonobject} - it's a portfolio health response from portfolioOverview screen
    * @return: NA
    **/
    setData: function(respObj,graphResponse,healthStatus){
      try{
        var val = respObj.instrumentTotal[0];
        let portfolioHealth = graphResponse;
        this.view.WealthHealthChart.drawDataChart(graphResponse);
        let finalVal = [];
        for (let i in portfolioHealth) {
          let value = (portfolioHealth[i].healthStatus === "0") ? 25 : 0;
          finalVal.push(value);
        }
        let total = finalVal[0] + finalVal[1] + finalVal[2] + finalVal[3];
        if(healthStatus === "1"){
          this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.wealth.healthInfoStrong");
        }
        else{
          this.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.wealth.healthInfoWeak");
        }
        // WIW-1485
        this.view.lblPortfolioName.text = respObj.displayName;
        var forUtility = applicationManager.getFormatUtilManager();
        // WIW-1420
      //  if(val.hasOwnProperty("OneM")) {
          var totalVal = forUtility.formatAmountandAppendCurrencySymbol(val.marketValue, val.referenceCurrency);
          var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
          var todaysPL = forUtility.formatAmountandAppendCurrencySymbol(val.todayPLAmount, val.referenceCurrency);
          this.view.lblValueMarketValue.text = totalVal;
  
          if (val.unRealizedPL =='P') {
            this.view.lblUnrealisedPLValue.skin = "IWLabelGreenText15Px";
            this.view.lblUnrealisedPLValue.text = (unrealizedPL !== "" && val.unRealizedPLPercentage !== "") ? ("+" + unrealizedPL + "(+" + val.unRealizedPLPercentage + "%)") : ((unrealizedPL != "") ? ("+" + unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? ("(+" + val.unRealizedPLPercentage + "%)") : ""));
          } else {
            this.view.lblUnrealisedPLValue.skin = "sknlblff000015px";
            this.view.lblUnrealisedPLValue.text =  (unrealizedPL !== "" && val.unRealizedPLPercentage !== "") ? ((unrealizedPL[0]=="-"?unrealizedPL:"-" +unrealizedPL) +(val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") ): ((unrealizedPL != "") ? (unrealizedPL[0]=="-"?unrealizedPL:"-" +unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? (val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") : ""));
          }
          if(val.todayPLAmount!==""){
            this.view.flxTodayPL.isVisible=true;
            if (val.todayPLAmount >= 0) {
              this.view.lblTodayPLValue.skin = "IWLabelGreenText15Px";
              this.view.lblTodayPLValue.text = "+" + todaysPL.replace('+','') + "(+" + val.todayPLPercentage.replace('+','') + "%)";
            } else {
              this.view.lblTodayPLValue.skin = "sknlblff000015px";
              this.view.lblTodayPLValue.text = "-" + todaysPL.replace('-','') + "(-" + val.todayPLPercentage.replace('-','') + "%)";
            }
          }else{
            this.view.flxTodayPL.isVisible=false;
          }

      //  }

      }
      catch (err) {
        scope.setError(err, "setData");
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
    }
  };
});