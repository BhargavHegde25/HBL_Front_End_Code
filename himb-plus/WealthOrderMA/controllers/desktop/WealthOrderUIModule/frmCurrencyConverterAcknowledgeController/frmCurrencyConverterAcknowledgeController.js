define(['CommonUtilities', 'ViewConstants'], function(CommonUtilities, ViewConstants) {
  var responsiveUtils = new ResponsiveUtils();
  //Type your controller code here 
  return {
    params: [],
    updateFormUI: function(uiData) {
      if (uiData) {
        if (uiData.currencyConfirmData) {
          this.params = uiData.currencyConfirmData;
        }
      }
    },
    init: function() {
      this.view.onBreakpointChange = this.onBreakpointChange;
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

    preShow: function() {
      this.view.btnCancel.onClick = this.cancelAction;
      this.view.btnViewOrder.onClick = this.viewOrderAction;
    },
    postShow: function() {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.setActiveHeaderHamburger();
    },
    setSuccess: function(response) {
      let formatValue = applicationManager.getFormatUtilManager();
      this.view.lblCCFromValue.text = this.params.buyCurrency;
      this.view.lblCCFromAmountValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.params.buyAmount, this.params.buyCurrency);
      this.view.lblCCToValue.text = this.params.sellCurrency;
      this.view.lblCCEstimatesFTValue.text = formatValue.formatAmountandAppendCurrencySymbol(response.fees, this.params.sellCurrency);
      this.view.lblCCToAmountValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.params.sellAmount, this.params.sellCurrency);
      if (this.params.convertTime) {
        this.view.lblCCConvertLaterValue.text = this.params.convertTime;
        this.view.lblCCConvertLater.setVisibility(true);
        this.view.lblCCConvertLaterValue.setVisibility(true);
        this.view.lblCCConvertNow.setVisibility(false);
        this.view.lblCCConvertNowValue.setVisibility(false);
      } else {
        this.view.lblCCConvertLaterValue.text = "";
        this.view.lblCCConvertLater.setVisibility(false);
        this.view.lblCCConvertLaterValue.setVisibility(false);
        this.view.lblCCConvertNow.setVisibility(true);
        this.view.lblCCConvertNowValue.setVisibility(true);
        var today = new Date();
        this.view.lblCCConvertNowValue.text = String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0') + '/' + today.getFullYear();
      }
      this.view.forceLayout();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    setError: function(response) {},
    setActiveHeaderHamburger: function() {
      this.view.customheadernew.activateMenu("Accounts", "My Accounts");
      this.view.customheadernew.flxContextualMenu.setVisibility(false);
      this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
    },
    onBreakpointChange: function(form, width) {
      //       responsiveUtils.onOrientationChange(this.onBreakpointChange, function() {
      //       }.bind(this));
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      //       this.view.customfooter.onBreakpointChangeComponent(width);
    },
    cancelAction: function() {
      new kony.mvc.Navigation({
        "appName": "PortfolioManagementMA",
        "friendlyName": "frmPortfolioOverview"
      }).navigate();
    },
    viewOrderAction: function() {
      // IW-3824 - Ayush Raj - fix Start
      let formatValue = applicationManager.getFormatUtilManager();
      this.portfolioId = applicationManager.getModulesPresentationController({
        "moduleName": "WealthPortfolioUIModule",
        "appName": "PortfolioManagementMA"
      }).getPortfolioId();
      //fix End
      
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentCurrentPosition({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentPricingData({});
      applicationManager.getModulesPresentationController("WealthOrderUIModule").setInstrumentDetails({});
      scope_WealthPresentationController.viewOrdersTab = true;
      this.goToPortfolioDetails(this.portfolioId);
    },
    goToPortfolioDetails: function(portfolioId) {
      var wealthModule = applicationManager.getModulesPresentationController({
        "moduleName": "WealthPortfolioUIModule",
        "appName": "PortfolioManagementMA"
      });
      wealthModule.setPortfolioId(portfolioId);
      scope_WealthPresentationController.isFirst = true;
      if (applicationManager.getConfigurationManager().checkUserFeature("WEALTH_PORTFOLIO_DETAILS")) {
        new kony.mvc.Navigation({
          "appName": "PortfolioManagementMA",
          "friendlyName": "frmPortfolioOverview"
        }).navigate();
      }
    }
  };
});

// [IW-3338] fixed by Ayush Raj