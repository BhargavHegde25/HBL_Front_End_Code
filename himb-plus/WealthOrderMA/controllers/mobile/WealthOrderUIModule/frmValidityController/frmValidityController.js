define({
  
  init: function () {
    try{
        var scopeObj=this;
		var navManager = applicationManager.getNavigationManager();
		var currentForm = navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(scopeObj, "YES", currentForm, scopeObj.navigateCustomBack);
	 }catch(err) {
        this.setError(err, "init");
      }
    },
	preShow: function () {
      try{
		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
			this.view.flxHeader.setVisibility(false);
          this.view.title = kony.i18n.getLocalizedString("i18n.wealth.infoIcon.validity");
		}
		this.initActions();
		this.view.btnSave.onClick = this.continueOnClick;
		this.view.customHeader.flxBack.onTouchEnd = this.onBack;
		this.view.flxDayOrder.onClick = this.onClickDayOrder;
		this.view.flxGoodTill.onClick = this.onClickGoodTill;
         }catch(err) {
        this.setError(err, "preShow");
      }
	},
	
	postShow: function () {
      try{
		var navMan = applicationManager.getNavigationManager();
		var previousForm = navMan.getCustomInfo("frmInstrumentOrder");
    navMan.setCustomInfo("frmOrdersModifyButton", true);
		if (previousForm.validity === "GTC" || previousForm.validity === kony.i18n.getLocalizedString("i18n.wealth.goodTillCanceled") ) {
			this.onClickGoodTill();
		} else {
			this.onClickDayOrder();
		}
         }catch(err) {
        this.setError(err, "postShow");
      }
	},
	onBack: function () {
      try{
// 		var navigationMan = applicationManager.getNavigationManager();
// 		navigationMan.goBack();
        var navMan = applicationManager.getNavigationManager();
navMan.navigateTo("frmInstrumentOrder");
         }catch(err) {
        this.setError(err, "onBack");
      }
	},
	initActions: function () {
		//To be added
	},
	onClickDayOrder: function () {
      try{
		this.view.flxDayOrder.skin = "sknflxGreen0ba407a4468e045";
		this.view.imgSelectDayOrder.setVisibility(true);
		this.view.flxGoodTill.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectGoodTill.setVisibility(false);
         }catch(err) {
        this.setError(err, "onClickDayOrder");
      }
	},
	onClickGoodTill: function () {
      try{
		this.view.flxDayOrder.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectDayOrder.setVisibility(false);
		this.view.flxGoodTill.skin = "sknflxGreen0ba407a4468e045";
		this.view.imgSelectGoodTill.setVisibility(true);
         }catch(err) {
        this.setError(err, "onClickGoodTill");
      }
	},
	continueOnClick: function () {
      try{
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmOrdersModifyButton", false);
		var validity;

		if (this.view.imgSelectDayOrder.isVisible == true) {
			validity = this.view.lblDayOrder.text;
		} else {
			validity = this.view.lblGoodTill.text;
		}
		var validityDetails = navManager.getCustomInfo("frmInstrumentOrder");
		validityDetails.validity = validity;
		navManager.setCustomInfo("frmInstrumentOrder", validityDetails);
		navManager.navigateTo('frmInstrumentOrder');
         }catch(err) {
        this.setError(err, "continueOnClick");
      }
	},
setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    }
});
