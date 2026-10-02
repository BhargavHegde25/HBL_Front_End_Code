define([],function(){
  //Type your controller code here
  return{
    onNavigate: function()
    {
      this.view.preShow= this.preShow;
      this.view.postShow= this.postShow;
      this.calculatePortfolioHealth();
      this.initActions();
    },
    initActions: function(){
      this.view.customHeader.flxBack.onClick =this.navBackToPortfoliodetails;
      this.view.btnContactAdvisor.onClick = this.navTocontactAdvisor;
      // removing this button as part of IW-3189
      //this.view.btnImprovePortfolio.onClick = this.navToReviewNewProposal;     
    },
    preShow: function(){
      try{
      if(applicationManager.getPresentationFormUtility().getDeviceName()!=="iPhone"){
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
        // this.view.customHeader.flxBack
        //this.view.customHeader.flxBack.onTouchEnd =this.navBack;
        //this.view.btnContactAdvisor.onClick = this.navbackcontact;
      }

      var portfolioId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;

      var ConstParm ={
        "objectServiceName": "PortfolioServicing",
        "operationName": "getInvestmentConstraintsHC",
        "objectName": "PortfolioHealth",
        "Criteria": {"portfolioId": portfolioId,
                    "portfolioServiceType": "Advisory"}
      };
      var RecomParm = {
        "objectServiceName": "PortfolioServicing",
        "operationName": "getRcmdInstrumentHC",
        "objectName": "PortfolioHealth",
        "Criteria": { "portfolioId": portfolioId,
                    "portfolioServiceType": "Advisory"}
      };
      this.view.Constraints.setConstSerParm(ConstParm);
      this.view.Recommendation.setRecomSerParm(RecomParm);


      let params = 
          {
            "portfolioId": portfolioId,
            "portfolioServiceType": "Advisory",
            "navPage": "Portfolio"
          };
      this.view.AllocationCheck.setContext(params,true);
      var scope = this;
      this.view.AllocationCheck.setHealthStatus = function(status){
       scope.view.HealthCheckSummarycard.getHealthStatus(status);
      }
      this.checkPermissions();
      } catch(err) {
        this.setError(err, "preShow");
      } 
    },
    
    checkPermissions: function(){		
      try{
        var configManager =  applicationManager.getConfigurationManager();
           var checkUserPermission = function (permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
          }
        
             var checkFeature = function (feature) {
            return applicationManager.getConfigurationManager().checkUserFeature(feature);
          }
  
  			var isPortfolioHealthSummaryView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_SUMMARY_VIEW");
  			var isPortfolioHealthAssetAllocationView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_ASSET_ALLOCATION_VIEW");
  			var isPortfolioHealthRiskAnalysisView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_RISK_ANALYSIS_VIEW");
  			var isPortfolioHealthInvestmentConstraintsView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_INVESTMENT_CONSTRAINTS_VIEW");
  			var isPortfolioHealthRecommendedInstrumentsView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_RECOMMENDED_INSTRUMENTS_VIEW");
  			var isPortfolioHealthContactAdvisorView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_CONTACT_ADVISOR_VIEW");
  
  		let self = this;
  			
  			self.view.flxHealth.isVisible = isPortfolioHealthSummaryView;
  			self.view.flxAsset.isVisible = isPortfolioHealthAssetAllocationView;
  			self.view.flxRisk.isVisible = isPortfolioHealthRiskAnalysisView;
  			self.view.flxInvestment.isVisible = isPortfolioHealthInvestmentConstraintsView;
  			self.view.flxRecommanded.isVisible = isPortfolioHealthRecommendedInstrumentsView;
  			self.view.btnContactAdvisor.isVisible = isPortfolioHealthContactAdvisorView;
      } catch(err) {
        this.setError(err, "checkPermissions");
      } 
    },    
    calculatePortfolioHealth: function(){
      try{
      var navManager = applicationManager.getNavigationManager();
      this.chartResponse = navManager.getCustomInfo('frmHealthCheckChartData');
       var portfolioHealth = this.chartResponse;
      let finalVal = [];
      for (let i in portfolioHealth) {
        let value = (portfolioHealth[i].healthStatus === "1") ? 0 : 25;
        finalVal.push(value);
      }
      let total = finalVal[0] + finalVal[1] + finalVal[2] + finalVal[3];
//       if(total >= 75){
//         this.view.btnImprovePortfolio.isVisible = false;
//       }
//       else{
//        this.view.btnImprovePortfolio.isVisible = true;
        
//       }
      } catch(err) {
        this.setError(err, "calculatePortfolioHealth");
      } 
    },
    postShow: function(){
      try{
      this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.healthCheck");
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.healthCheck");
      if(scope_WealthPresentationController.isAdvisory) {
        let params = {
          "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
          "portfolioServiceType":"Advisory",
          "navPage":"Portfolio"
        };
        this.view.riskAnalysis.setContext(params);
        }
      } catch(err) {
        this.setError(err, "postShow");
      } 
    },
    navTocontactAdvisor: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmContactAdvisor"); 
    },
    navToReviewNewProposal: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmReviewNewProposal"); 
    },

    navBackToPortfoliodetails: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPortfolioDetails"); 
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
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }
  };

});