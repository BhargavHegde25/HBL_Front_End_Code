define(['CommonUtilities', 'ViewConstants'], function(CommonUtilities, ViewConstants) {
  var responsiveUtils = new ResponsiveUtils();
  let gsellData;
  let gbuyData;
  var orientationHandler = new OrientationHandler();
  this.feesDetails;
  //Type your controller code here 
  return {
    updateFormUI: function(uiData) {
      if (uiData) {
        if (uiData.currencyConfirmData) {
          this.setData(uiData.currencyConfirmData);
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
      this.view.btnConvert.onClick = this.convertNow;
      this.view.btnModify.onClick = this.modifyAction;
      this.view.btnCancel.onClick = this.cancelAction;
    },
    postShow: function() {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.setActiveHeaderHamburger();
    },
    setSuccess: function(response) {
      let formatValue = applicationManager.getFormatUtilManager();
      this.feesDetails = response.feeDetails;
      //IW-3824 - Ayush Raj - fix start
      this.view.lblCCEstimatesFTValue.text = formatValue.formatAmountandAppendCurrencySymbol(response.fees.replace(/\,/g,''),this.feesDetails.chargeCurrency);
      this.view.lblAdvTradeValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.feesDetails.advisoryFeesInTradeCurrency.replace(/\,/g,''), this.feesDetails.tradeCurrency);
      this.view.lblAdvChargeValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.feesDetails.advisoryFeesInChargeCurrency.replace(/\,/g,''), this.feesDetails.chargeCurrency);
      this.view.lblSafeTradeValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.feesDetails.safekeepChargeInTradeCurrency.replace(/\,/g,''), this.feesDetails.tradeCurrency);
      this.view.lblSafeChargeValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.feesDetails.safekeepChargeInChargeCurrency.replace(/\,/g,''), this.feesDetails.chargeCurrency);
      this.view.lblIndTradeValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.feesDetails.InducementFeesInTradeCurrency.replace(/\,/g,''), this.feesDetails.tradeCurrency);
      this.view.lblIndChargeValue.text = formatValue.formatAmountandAppendCurrencySymbol(this.feesDetails.InducementFeesInChargeCurrency.replace(/\,/g,''), this.feesDetails.chargeCurrency);
      //fix end
      this.view.forceLayout();
    },
    setData: function(data) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      let formatValue = applicationManager.getFormatUtilManager();
      gbuyData = data.buyAmount;
      this.view.lblCCFromValue.text = data.buyCurrency;
      this.view.lblCCFromAmountValue.text = formatValue.formatAmountandAppendCurrencySymbol(data.buyAmount.replace(/\,/g,''), data.buyCurrency); //IW-3824 - Ayush Raj
      gsellData = data.sellAmount;
      this.view.lblCCToValue.text = data.sellCurrency;
      this.view.lblCCToAmountValue.text = formatValue.formatAmountandAppendCurrencySymbol(data.sellAmount.replace(/\,/g,''), data.sellCurrency); //IW-3824 - Ayush Raj

      if (data.convertTime) {
        this.view.lblCCConvertLaterValue.text = data.convertTime;
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
      let params = {
        validate_only: true,
        amount: "0",
        buyCurrency: this.view.lblCCFromValue.text,
        sellCurrency: this.view.lblCCToValue.text,
        buyAmount: gbuyData.replace(/\,/g,''), //IW-3824 - Ayush Raj
        sellAmount: gsellData.replace(/\,/g,''), //IW-3824 - Ayush Raj
        buyAccount: "buyAccount",
        sellAccount: "sellAccount",
        portfolioId: applicationManager.getModulesPresentationController({
          "moduleName": "WealthPortfolioUIModule",
          "appName": "PortfolioManagementMA"
        }).getPortfolioId()
      };
      if (this.view.lblCCConvertLaterValue.text) {
        params.convertTime = this.view.lblCCConvertLaterValue.text;
      }
      if (params.sellAmount) {
        var wealthModule = applicationManager.getModulesPresentationController({
          "moduleName": "WealthOrderUIModule",
          "appName": "WealthOrderMA"
        });
        wealthModule.createOrder(params);
        applicationManager.getPresentationUtility().showLoadingScreen();
      }
    },
    convertNow: function() {
      let formatValue = applicationManager.getFormatUtilManager();
      let params = {
        validate_only: true,
        amount: "0",
        buyCurrency: this.view.lblCCFromValue.text,
        sellCurrency: this.view.lblCCToValue.text,
        buyAmount: gbuyData.replace(/\,/g,''), //IW-3824 - Ayush Raj
        sellAmount: gsellData.replace(/\,/g,''), //IW-3824 - Ayush Raj
        buyAccount: "buyAccount",
        sellAccount: "sellAccount",
        portfolioId: applicationManager.getModulesPresentationController({
          "moduleName": "WealthPortfolioUIModule",
          "appName": "PortfolioManagementMA"
        }).getPortfolioId()
      };
      if (this.view.lblCCConvertLaterValue.text) {
        params.convertTime = this.view.lblCCConvertLaterValue.text;
      }
      if (params.sellAmount) {
        var wealthModule = applicationManager.getModulesPresentationController({
          "moduleName": "WealthOrderUIModule",
          "appName": "WealthOrderMA"
        });
        wealthModule.createOrder(params);
        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        navManager.navigateTo("frmCurrencyConverterAcknowledge");
        navManager.updateForm({
          currencyConfirmData: params
        }, 'frmCurrencyConverterAcknowledge');
      }
    },
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
      if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
        this.view.lblCCNotes.isVisible = false;
        this.view.lblCCNotesValue.isVisible = false;
        this.view.flxDisclaimerDown.isVisible = true;
      }
      else{
        this.view.lblCCNotes.isVisible = true;
        this.view.lblCCNotesValue.isVisible = true;
        this.view.flxDisclaimerDown.isVisible = false;
      }
    },
    setError: function(obj) {
      var test = obj;
    },
    modifyAction: function() {
      new kony.mvc.Navigation({
        "appName": "WealthOrderMA",
        "friendlyName": "frmCurrencyConverter"
      }).navigate();
    },
    cancelAction: function() {
      new kony.mvc.Navigation({
        "appName": "PortfolioManagementMA",
        "friendlyName": "frmPortfolioOverview"
      }).navigate();
    }
  };
});

// [IW-3338] fixed by Ayush Raj