define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility){ 
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  //Type your controller code here 
  return{
    isRTL:'',
    init: function(){
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.view.flxGoBack.onTouchEnd = this.goBackToportfolio;
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.heightStr = 490;
      this.initActions();
      this.view.onResize = this.onBreakpointChange;
      this.view.RecommendStrategy.onClickButton=this.navConfirmation;

    },
    initActions: function(){
      this.view.onTouchEnd = this.onFormTouchEnd;
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
    goBackToportfolio: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPortfolioOverview");
    },
        preShow: function() {
			this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
			this.view.imgBack.src = this.isRTL ? "right_arrow.png" : "back_icon_blue.png";
          this.view.RecommendStrategy.skin="slfbox";
            this.view.flxRecommended.left = "15dp";
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.onResize = this.onBreakpointChange;
            // if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
            //     this.view.flxRecommended.left = "2%";
            //     this.view.flxMyStrategy.width = "49%";
            //     this.view.flxRecommended.width = "49%";
            // }

      var recomparams = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
        "portfolioServiceType": "Advisory" 
      };
      this.view.RecommendStrategy.setData(recomparams);
      this.view.strategyAllocation.setContext(recomparams);
      this.view.SuitabilityProfile.setContext(recomparams);

    },
    navConfirmation:function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmRecommendStrategyConfirmation");
    },
    
    

    postShow: function() {
      var scope = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      var recomparams = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").getPortfolioId(),
        "portfolioServiceType": "Advisory"
      };
      scope.view.myStrategy.setContext(recomparams);
      scope.view.myStrategy.sendData = function(segLength) {
        //if(kony.application.getCurrentBreakpoint() === 1366 && kony.application.getCurrentBreakpoint()=== 1380 ){
        scope.heightStr = 490 + (segLength - 3) * 30;
        scope.view.flxMyStrategy.height = scope.heightStr + "px";
        scope.view.myStrategy.height = scope.heightStr + "px";
        scope.view.flxRecommended.height = scope.heightStr + "px";
        scope.view.RecommendStrategy.height = "100%";
        scope.view.RecommendStrategy.resizeComponent((scope.heightStr + "px"), segLength);
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        if (currentBreakpoint === 1024) {
          scope.view.SuitabilityProfile.resizeComponent("393px", 0);
          scope.view.flxSuitabilityProfile.height = "393px";
          //scope.view.flxStrategyContent.height = (scope.heightStr  + 413) + "px";
          scope.view.flxStrategyContent.height = kony.flex.USE_PREFERED_SIZE;
                  } else if (currentBreakpoint > 1024) {
          scope.view.SuitabilityProfile.resizeComponent((scope.heightStr + "px"), 0);
          scope.view.flxSuitabilityProfile.height = scope.heightStr + "px";
          //scope.view.flxStrategyContent.height = scope.heightStr + "px";
          scope.view.flxStrategyContent.height = kony.flex.USE_PREFERED_SIZE;
        }
        scope.view.flxStrategyAllocation.top = "20px"
        scope.view.forceLayout();
        scope.setActiveHeaderHamburger();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      };
      this.checkPermission();
    },
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    
    checkPermission: function() {
            var configManager = applicationManager.getConfigurationManager();
          var checkUserPermission = function (permission) {
            return configManager.checkUserPermission(permission);
          };
           var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           var isPortfolioMyStrategyView = applicationManager.getConfigurationManager().checkUserPermission("MY_STRATEGY_VIEW");
           var isPortfolioRecommendedStrategyView = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_VIEW");
	       var isPortfolioSuitabilityProfileView = applicationManager.getConfigurationManager().checkUserPermission("SUITABILITY_PROFILE_VIEW");
           var isPortfolioStrategyAllocationView = applicationManager.getConfigurationManager().checkUserPermission("STRATEGY_ALLOCATION_VIEW");
		   var isStrategyChangeStrategyView = applicationManager.getConfigurationManager().checkUserPermission("MY_STRATEGY_CHANGE_STRATEGY_VIEW");
		   var isRecommendedStrategyUseView = applicationManager.getConfigurationManager().checkUserPermission("RECOMMENDED_STRATEGY_USE_VIEW");
		   var isSuitabilityProfileReviewView = applicationManager.getConfigurationManager().checkUserPermission("SUITABILITY_PROFILE_REVIEW_VIEW");
           var isPersonalizeStrategy = applicationManager.getConfigurationManager().checkUserPermission("STRATEGY_ALLOCATION_PERSONALIZE");
          
            let self = this;
      self.view.strategyAllocation.setPersonalizeStrategyBtn(isPersonalizeStrategy);
      self.view.myStrategy.setBtn(isStrategyChangeStrategyView);
      self.view.RecommendStrategy.setDataOne(isRecommendedStrategyUseView);
      self.view.SuitabilityProfile.setBtnTwo(isSuitabilityProfileReviewView);
      self.view.flxMyStrategy.isVisible = isPortfolioMyStrategyView;
            if (!isPortfolioMyStrategyView && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)) {
                self.view.flxRecommended.width = "100%";
                self.view.flxRecommended.left = "0%";
            } else {
                if (!isPortfolioMyStrategyView) {
                    self.view.flxRecommended.width = "49%";
                    self.view.flxRecommended.left = "0%";
                    self.view.flxSuitabilityProfile.width = "49%";
                    self.view.flxSuitabilityProfile.left = "51%";
                }
            }
            self.view.flxRecommended.isVisible = isPortfolioRecommendedStrategyView;
            if (!isPortfolioRecommendedStrategyView && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)) {
                self.view.flxMyStrategy.width = "100%";
                self.view.flxMyStrategy.left = "0%";
            } else {
                if (!isPortfolioRecommendedStrategyView) {
                    self.view.flxMyStrategy.width = "49%";
                    self.view.flxSuitabilityProfile.width = "49%";
                    self.view.flxSuitabilityProfile.left = "51%";
                }
            }
            self.view.flxSuitabilityProfile.isVisible = isPortfolioSuitabilityProfileView;
            if (!isPortfolioSuitabilityProfileView && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)) {
                self.view.flxRecommended.left = "2%";
                //self.view.flxStrategyContent.height = "503px";
                //self.view.flxSuitabilityProfile.height = "0%";
                //self.view.flxStrategyAllocation.top = "-500px";
                //this.view.flxSuitabilityProfile.height=kony.flex.USE_PREFFERED_SIZE;
            } else {
                if (!isPortfolioSuitabilityProfileView) {
                    self.view.flxMyStrategy.width = "49%";
                    self.view.flxRecommended.width = "49%";
                    self.view.flxRecommended.left = "51%";
                }
            }
            self.view.flxStrategyAllocation.isVisible = isPortfolioStrategyAllocationView;
            if (!isPortfolioMyStrategyView && !isPortfolioSuitabilityProfileView) {
                self.view.flxRecommended.width = "100%";

                self.view.flxRecommended.left = "0%";

            }

            if (!isPortfolioMyStrategyView && !isPortfolioRecommendedStrategyView) {

                self.view.flxSuitabilityProfile.width = "100%";

                self.view.flxSuitabilityProfile.left = "0%";

            }

            if (!isPortfolioRecommendedStrategyView && !isPortfolioSuitabilityProfileView) {

                self.view.flxMyStrategy.width = "100%";

                self.view.flxMyStrategy.left = "0%";

            }
      

       self.view.flxStrategyAllocation.isVisible = isPortfolioStrategyAllocationView;

     },
    
    onBreakpointChange: function(form, width) {
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);

      var currentBreakpoint = kony.application.getCurrentBreakpoint();
      if (currentBreakpoint === 1024) {
        this.view.flxSuitabilityProfile.height = "393px";
        this.view.SuitabilityProfile.height = "393px";
        this.view.flxStrategyContent.height = (this.heightStr  + 413) + "px";
                this.view.flxRecommended.left = "2%";
                this.view.flxMyStrategy.width = "49%";
                this.view.flxRecommended.width = "49%";
      } else if (currentBreakpoint > 1024) {
        this.view.flxSuitabilityProfile.height = this.heightStr + "px";
        this.view.SuitabilityProfile.resizeComponent((this.heightStr + "px"), 0);
        this.view.flxStrategyContent.height = this.heightStr + "px";
      }
      this.view.flxStrategyAllocation.top = "20px"
      this.view.forceLayout();
    }
  };

});