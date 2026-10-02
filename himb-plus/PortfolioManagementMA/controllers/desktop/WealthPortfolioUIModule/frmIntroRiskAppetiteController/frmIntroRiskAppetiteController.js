define({ 


  frmPreShow : function()
  {
    this.view.formTemplate12.flxContentTCCenter.skin="sknFlxffffffShadowdddcdc";
    this.view.formTemplate12.pageTitlei18n="i18n.wealth.suitabilityProfile";
    this.view.formTemplate12.flxContentTCCenter.flxProceed.btnProceed.onClick = this.navSuitabilityProfile;
    this.view.formTemplate12.flxContentTCCenter.flxProceed.btnCancel.onClick = this.navPortOverview;
    this.view.formTemplate12.onError = function(errorObject) {};
    this.view.onTouchEnd = this.onFormTouchEnd;
  },

  navSuitabilityProfile: function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmRiskAppetite"); 
  },
  onFormTouchEnd :function(){
    var currFormObj = kony.application.getCurrentForm();
    if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
      setTimeout(function() {
        currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
        currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        currFormObj.customheadernew.imgLblTransfers.text = "O";
      }, "17ms")
    }
  },
  navPortOverview: function(){
    var navManager = applicationManager.getNavigationManager();
            var data = navManager.getCustomInfo("frmFirstUserVal");
            if (data !== undefined) {
                data = undefined;
                navManager.setCustomInfo("frmFirstUserVal", data);
                //var navManager = applicationManager.getNavigationManager();
                new kony.mvc.Navigation({
                    "appName": "PortfolioManagementMA",
                    "friendlyName": "frmPortfolioOverview"
                }).navigate();
            } else {
                //var navManager = applicationManager.getNavigationManager();
                new kony.mvc.Navigation({
                    "appName": "PortfolioManagementMA",
                    "friendlyName": "frmStrategyAllocation"
                }).navigate();
            }
  }
});