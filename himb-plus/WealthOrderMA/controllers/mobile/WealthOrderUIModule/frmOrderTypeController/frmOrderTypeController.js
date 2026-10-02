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
		}
		this.initActions();
		this.view.btnSave.onClick = this.continueOnClick;
		this.view.customHeader.flxBack.onTouchEnd = this.onBack;
		this.view.flxMarket.onClick = this.onClickMarket;
		this.view.flxLimit.onClick = this.onClickLimit;
		this.view.flxStopLoss.onClick = this.onClickStopLoss;
		this.view.flxStopLimit.onClick = this.onClickStopLimit;
         }catch(err) {
        this.setError(err, "preShow");
      }
	},
	
	postShow: function () {
        try{
		var navMan = applicationManager.getNavigationManager();
        navMan.setCustomInfo("frmOrdersModifyButton", true);
		var previousForm = navMan.getCustomInfo("frmInstrumentOrder");
        let currentTheme = kony.theme.getCurrentTheme();
        if(currentTheme === "default"){
        this.view.imgSelectMarket.src = "selectgoal.png";
        this.view.imgSelectStopLoss.src = "selectgoal.png";
        this.view.imgSelectStopLimit.src = "selectgoal.png";
        this.view.flxTypeOneShadow.height = "7dp";
        this.view.flxTypeOneShadow.skin = "sknflxshadowbordera6a6a6";
        }else{
        this.view.imgSelectMarket.src = "selectgoalwealth.png";
        this.view.imgSelectStopLoss.src = "selectgoalwealth.png";
        this.view.imgSelectStopLimit.src = "selectgoalwealth.png";
        this.view.flxTypeOneShadow.height = "1dp";
        this.view.flxTypeOneShadow.skin = "sknFlxe3e3e3Shadow";
        }

		if (previousForm.orderType === kony.i18n.getLocalizedString("i18n.wealth.market")) {
			this.onClickMarket();
		} else if (previousForm.orderType === kony.i18n.getLocalizedString("i18n.wealth.stopLoss")) {
			this.onClickStopLoss();
		} else if (previousForm.orderType === kony.i18n.getLocalizedString("i18n.wealth.stopLimit")) {
			this.onClickStopLimit();
		} else {
			this.onClickLimit();
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

	onClickMarket: function () {
      try{
		this.view.flxMarket.skin = "sknflxGreen0ba407a4468e045";
		this.view.imgSelectMarket.setVisibility(true);
		this.view.flxLimit.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectLimit.setVisibility(false);
		this.view.flxStopLoss.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectStopLoss.setVisibility(false);
		this.view.flxStopLimit.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectStopLimit.setVisibility(false);
         }catch(err) {
        this.setError(err, "onClickMarket");
      }
	},
	onClickLimit: function () {
      try{
		this.view.flxMarket.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectMarket.setVisibility(false);
		this.view.flxLimit.skin = "sknflxGreen0ba407a4468e045";
		this.view.imgSelectLimit.setVisibility(true);
		this.view.flxStopLoss.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectStopLoss.setVisibility(false);
		this.view.flxStopLimit.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectStopLimit.setVisibility(false);
         }catch(err) {
        this.setError(err, "onClickLimit");
      }
	},
	onClickStopLoss: function () {
      try{
		this.view.flxMarket.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectMarket.setVisibility(false);
		this.view.flxLimit.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectLimit.setVisibility(false);
		this.view.flxStopLoss.skin = "sknflxGreen0ba407a4468e045";
		this.view.imgSelectStopLoss.setVisibility(true);
		this.view.flxStopLimit.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectStopLimit.setVisibility(false);
         }catch(err) {
        this.setError(err, "onClickStopLoss");
      }
	},
	onClickStopLimit: function () {
      try{
		this.view.flxMarket.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectMarket.setVisibility(false);
		this.view.flxLimit.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectLimit.setVisibility(false);
		this.view.flxStopLoss.skin = "sknflxBlueE0de121f9cae5843";
		this.view.imgSelectStopLoss.setVisibility(false);
		this.view.flxStopLimit.skin = "sknflxGreen0ba407a4468e045";
		this.view.imgSelectStopLimit.setVisibility(true);
         }catch(err) {
        this.setError(err, "onClickStopLimit");
      }
	},
	continueOnClick: function () {
      try{
       scope_WealthOrderPresentationController.instrumentOrder=true;
		var orderType;
		var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmOrdersModifyButton", false);
		if (this.view.imgSelectMarket.isVisible == true) {
			orderType = this.view.lblMarket.text;
		} else if (this.view.imgSelectLimit.isVisible == true) {
			orderType = this.view.lblLimit.text;
		} else if (this.view.imgSelectStopLoss.isVisible == true) {
			orderType = this.view.lblStopLoss.text;
		} else {
			orderType = this.view.lblStopLimit.text;
		}
		var orderTypeDetails = navManager.getCustomInfo("frmInstrumentOrder");
		orderTypeDetails.orderType = orderType;
        if(orderTypeDetails.orderModeType !== undefined || orderTypeDetails.orderModeType !== null){
            orderTypeDetails.orderModeType = orderType;
        }
		navManager.setCustomInfo("frmInstrumentOrder", orderTypeDetails);
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
