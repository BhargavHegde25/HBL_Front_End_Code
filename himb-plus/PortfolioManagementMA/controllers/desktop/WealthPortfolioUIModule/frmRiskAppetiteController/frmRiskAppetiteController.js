define({ 

  frmPreShow : function()
  {

    this.view.formTemplate12.flxContentTCCenter.skin="sknFlxffffffShadowdddcdc";
    this.view.formTemplate12.pageTitlei18n="i18n.wealth.suitabilityProfile";
    this.view.formTemplate12.onError = function(errorObject) {};

    let reqParam={ 

      "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(), 
      "portfolioServiceType": "Advisory" 

    } ;
    let serviceParams = {
      "ObjectName": "Strategies",
      "ServiceName": "PortfolioServicing",
      "OperationName1": "getStrategyQuestions",
      "OperationName2": "submitStrategyQuestionnaire", 
      "OperationName3": "getMyStrategy"
    }
    this.view.formTemplate12.flxContentTCCenter.suitabilityRiskAppetite.setContext(reqParam, serviceParams);
  }
});