/*eslint-disable*/
define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility){ 
    var responsiveUtils = new ResponsiveUtils();
    var orientationHandler = new OrientationHandler();
  //Type your controller code here 
  return{
    healthStatus:"",
	isRTL:'',
    init: function(){
      this.view.flxgoback.onTouchEnd = this.goBackToportfolio;
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.initActions();
    },
    initActions: function(){
      this.view.btnContactAdvisor.onClick = this.navigateToContactAdvisor;
      this.view.onTouchEnd = this.onFormTouchEnd;
      // Removing this button as part of IW-3189
      //this.view.btnImprovePortfolio.onClick = this.navigateToInvestmentproposal;
    },
    
    onFormTouchEnd:function(){
      var currFormObj = kony.application.getCurrentForm();
if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
 setTimeout(function() {
 currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
 currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
 currFormObj.customheadernew.imgLblTransfers.text = "O";
 }, "17ms")
 }
    },
    
    preShow: function ()
    {
	  this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
	  this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
      var navManager = applicationManager.getNavigationManager();
      var portfolioResponse =  navManager.getCustomInfo('frmPortfolioOverviewHealth');
      var graphResponse =  navManager.getCustomInfo('frmPortfolioOverviewGraph');
      let portfolioHealth = graphResponse;

      let finalVal = [];
      for (let i in portfolioHealth) {
        let value = (portfolioHealth[i].healthStatus === "1") ? 0 : 25;
        finalVal.push(value);
      }
      this.total = finalVal[0] + finalVal[1] + finalVal[2] + finalVal[3];

      var parmInvestmentConstraints ={
		"objectServiceName": "PortfolioServicing",
		"operationName": "getInvestmentConstraintsHC",
		"objectName": "PortfolioHealth",
		"Criteria": {"portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
                    "portfolioServiceType": "Advisory"}
		};
    
    var parmRecommendedInstrument = {
		"objectServiceName": "PortfolioServicing",
		"operationName": "getRcmdInstrumentHC",
		"objectName": "PortfolioHealth",
		"Criteria": { "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
                      "portfolioServiceType": "Advisory"}
		};
    this.view.investmentConstraints.setServiceParm(parmInvestmentConstraints);
	this.view.recommendedInstruments.setServiceParm(parmRecommendedInstrument);

    },
    postShow: function (){
      var navManager = applicationManager.getNavigationManager();
      var portfolioResponse =  navManager.getCustomInfo('frmPortfolioOverviewHealth');
      var graphResponse =  navManager.getCustomInfo('frmPortfolioOverviewGraph');
      
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      var portfolioId = wealthModule.getPortfolioId();
            
      let params = 
          {
            "portfolioId" :portfolioId,
            "portfolioServiceType": "Advisory",
            "navPage": "Portfolio"
          };
      var scope = this;
      this.view.AllocationCheck.setContext(params,true);
      this.view.AllocationCheck.setHealthStatus = function(status){
        scope.healthStatus=status;
         scope.view.healthCheckHealthSummaryCard.setData(portfolioResponse,graphResponse,scope.healthStatus);
      }
     
      this.view.RiskAnalysisGraph.setContext(params);
      this.setActiveHeaderHamburger();
//       if(this.total >= 75){
//         this.view.btnImprovePortfolio.isVisible = false;
//       }
//       else{
//         this.view.btnImprovePortfolio.isVisible = true;
//       }
      scope.view.flxHealthCheckRiskAnalysisCheck.isVisible = true;
      this.view.RiskAnalysisGraph.disableRiskanalysisGraphVisibility = function(){
      scope.view.flxHealthCheckRiskAnalysisCheck.isVisible = false;
      }
      this.checkPermission();

    },
    
     checkPermission: function() {
            var configManager = applicationManager.getConfigurationManager();
          var checkUserPermission = function (permission) {
            return configManager.checkUserPermission(permission);
          }; 
           var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           var isPortfolioHealthSummaryView =applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_SUMMARY_VIEW");
           var isPortfolioHealthAssetAllocationView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_ASSET_ALLOCATION_VIEW");
		   var isPortfolioHealthRiskAnalysisView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_RISK_ANALYSIS_VIEW");
           var isPortfolioHealthInvestmentConstraintView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_INVESTMENT_CONSTRAINTS_VIEW");
      	   var isPortfolioHealthRecommendedInstrumentsView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_RECOMMENDED_INSTRUMENTS_VIEW");
       	   var isPortfolioHealthContactAdvisorView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_CONTACT_ADVISOR_VIEW");
       




          
            let self = this;
       
       	self.view.flxHealthCheckHealthSummaryCard.isVisible = isPortfolioHealthSummaryView;
      	self.view.flxHealthCheckAllocationcheck.top = isPortfolioHealthSummaryView? "0dp": "15dp";
		self.view.flxHealthCheckAllocationcheck.isVisible = isPortfolioHealthAssetAllocationView;
        self.view.flxHealthCheckRiskAnalysisCheck.isVisible = isPortfolioHealthRiskAnalysisView;
         self.view.flxLeft.setVisibility(isPortfolioHealthInvestmentConstraintView);
         self.view.flxRight.setVisibility(isPortfolioHealthRecommendedInstrumentsView);

        if(!isPortfolioHealthSummaryView && !isPortfolioHealthAssetAllocationView){
           self.view.flxHealthCheckRiskAnalysisCheck.top = "15dp";
        }
       
       if(!isPortfolioHealthSummaryView && !isPortfolioHealthAssetAllocationView && !isPortfolioHealthRiskAnalysisView){
         self.view.flxHealthCheckInvestmentConstraintCheck.top = "15dp";
       }
       
       /*if(!isPortfolioHealthInvestmentConstraintView){
         self.view.flxRight.width="100%";
         self.view.flxLeft.width="0%";
       }
       if(!isPortfolioHealthRecommendedInstrumentsView){
         self.view.flxLeft.width="100%";
         self.view.flxRight.width="0%";
       }*/
        if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
           self.view.flxRight.width = "100%";
          }
          else{
          if(!isPortfolioHealthInvestmentConstraintView){
            self.view.flxRight.width = "100%";
          }
          }
       
         if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
           self.view.flxLeft.width = "100%";
          }
          else{
          if(!isPortfolioHealthRecommendedInstrumentsView){
            self.view.flxLeft.width = "100%";
          }
          }
       
       
       
       
       //self.view.flxRight.width = isPortfolioHealthInvestmentConstraintView? "49%": "100%";
	   
       //self.view.flxLeft.width = isPortfolioHealthRecommendedInstrumentsView? "49%": "100%";
        self.view.btnContactAdvisor.isVisible = isPortfolioHealthContactAdvisorView;
        self.view.btnImprovePortfolio.right = isPortfolioHealthContactAdvisorView?"20dp":"0dp";


     },
    
    
    /**
         *setActiveHeaderHamburger - Method to highlight active header and hamburger
    **/
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    /**
         *goBackToportfolio - Method to go back to frmPortfolioOverview screen
    **/
    goBackToportfolio: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPortfolioOverview");

    },
    /**
         *onBreakpointChange - Method to handle the breakpoint
    **/
    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
    },
    navigateToContactAdvisor: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmContactAdvisor");
    },
    navigateToInvestmentproposal: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmInvestmentProposal");
    }
  };


});