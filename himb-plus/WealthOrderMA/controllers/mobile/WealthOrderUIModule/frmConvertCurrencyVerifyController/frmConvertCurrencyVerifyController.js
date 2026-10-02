define({
	init: function () {
      try{
		var navManager = applicationManager.getNavigationManager();
		var currentForm = navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
	 }catch(err) {
        this.setError(err, "init");
      }
      },


	preShow: function () {
      try{
		if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
			this.view.flxHeader.setVisibility(false);
// 			this.view.flxMainContainer.top = "0dp";
		} else {
			this.view.flxHeader.setVisibility(true);
		}
      }catch(err) {
        this.setError(err, "preShow");
      }
		
      },

	postShow: function () {
      try{
		this.initActions();
		this.setUIData();
       var WealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      WealthMod.setVerifyFlow(false);
         }catch(err) {
        this.setError(err, "postShow");
      }
	},

	initActions: function () {
      try{
		this.view.customHeader.flxBack.onTouchEnd = this.onBack;
		this.view.customHeader.btnRight.onClick = this.cancelOnClick;
		this.view.flxFromImage.onTouchEnd = this.fromCurrencyType;
		this.view.flxFromAmountImage.onTouchEnd = this.fromCurrencyAmount;
		this.view.flxToImg.onTouchEnd = this.toCurrencyType;
		this.view.flxScheduleOnImg.onTouchEnd = this.scheduleOn;
		this.view.btnContinue.onClick = this.confirmOnClick;
         }catch(err) {
        this.setError(err, "initActions");
      }
	},

	setUIData: function () {
      try{
        var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      var formatUtil=applicationManager.getFormatUtilManager();
     var data= wealthMod.getWealthObject();
      if(data.sellCurrency===data.buyCurrency){
        this.view.btnContinue.setEnabled(false);
      }else{
         this.view.btnContinue.setEnabled(true);
      }
      var currency1=data.sellCurrency.substr(0,3);
      var currency2=data.buyCurrency.substr(0,3);
      this.view.lblFromValue.text=data.sellCurrency;
      this.view.lblFromAmountValue.text=formatUtil.formatAmountandAppendCurrencySymbol(data.sellAmount,currency1);
      this.view.lblToValue.text=data.buyCurrency;
      //this.view.lblToAmountValue.text=formatUtil.formatAmountandAppendCurrencySymbol(data.buyAmount,currency2);
		if (scope_WealthPresentationController.convertNowFlow === true) {

			this.view.lblConvertNow.text = kony.i18n.getLocalizedString("i18n.wealth.convertNow");
			this.view.flxScheduleOnImg.setVisibility(false);
			this.view.lblConvertNowValue.skin = "sknlbl424242ssp40px";
          this.view.lblConvertNowValue.right="7dp";
          var today = new Date();
          this.view.lblConvertNowValue.text = String(today.getMonth() + 1).padStart(2, '0') + '/' +String(today.getDate()).padStart(2, '0') + '/'+ today.getFullYear();
      

		} else {
			this.view.lblConvertNow.text = kony.i18n.getLocalizedString("i18n.wealth.scheduledon");
			this.view.flxScheduleOnImg.setVisibility(true);
			this.view.lblConvertNowValue.skin = "sknLbl4176A4SSPReg26px";
		}
       // if(wealthMod.getVerifyFlow()){
          var amount=parseFloat(data.sellAmount);
      var amount1=parseFloat(scope_WealthPresentationController.currencyRate.marketRate);
      var result=amount*amount1;
          this.view.lblToAmountValue.text=formatUtil.formatAmountandAppendCurrencySymbol(result,currency2);
      //  }
      let params = {
        validate_only: true,
        amount: "0",
        buyCurrency: this.view.lblToValue.text,
        sellCurrency: this.view.lblFromValue.text,
        buyAmount: data.buyAmount, //IW-3824 - Ayush Raj
        sellAmount: data.sellAmount, //IW-3824 - Ayush Raj
        buyAccount: "buyAccount",
        sellAccount: "sellAccount",
        portfolioId: scope_WealthPresentationController.portfolioId
      };
      params.convertTime = data.convertTime;
      if (params.sellAmount) {
        var wealthModule = applicationManager.getModulesPresentationController({
          "moduleName": "WealthOrderUIModule",
          "appName": "WealthOrderMA"
        });
        wealthModule.createOrder(params);
        applicationManager.getPresentationUtility().showLoadingScreen();
      }
       }catch(err) {
        this.setError(err, "setUIData");
      }
	},
  setSuccess: function(response) {
    try{
    var formatUtil = applicationManager.getFormatUtilManager();
      //this.feesDetails = response.feeDetails;
      if(response.hasOwnProperty("feeDetails")){
	  if (response.feeDetails.length !== 0) {
        this.view.flxFeesDetails.isVisible = true;
        this.view.flxFeesHeader.isVisible = true;
		  if (response.feeDetails.advisoryFeesInTradeCurrency !== undefined){
			  this.view.lblAdvTrade.isVisible = true;
			  this.view.lblAdvTradeValue.isVisible = true;
			  this.view.lblAdvTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(response.feeDetails.advisoryFeesInTradeCurrency, response.feeDetails.tradeCurrency);
          }
		  else{
		      this.view.lblAdvTrade.isVisible = false;
			  this.view.lblAdvTradeValue.isVisible = false;
		  }
		  if (response.feeDetails.advisoryFeesInChargeCurrency !== undefined){
			  this.view.lblAdvCharge.isVisible = true;
			  this.view.lblAdvChargeValue.isVisible = true;
			  this.view.lblAdvChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(response.feeDetails.advisoryFeesInChargeCurrency, response.feeDetails.chargeCurrency);
          }
		   else{
		      this.view.lblAdvCharge.isVisible = false;
			  this.view.lblAdvChargeValue.isVisible = false;
		  }
		  if (response.feeDetails.safekeepChargeInTradeCurrency !== undefined){
			  this.view.lblSafeTrade.isVisible = true;
			  this.view.lblSafeTradeValue.isVisible = true;
			  this.view.lblSafeTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(response.feeDetails.safekeepChargeInTradeCurrency, response.feeDetails.tradeCurrency);
          }
		   else{
		      this.view.lblSafeTrade.isVisible = false;
			  this.view.lblSafeTradeValue.isVisible = false;
		  }
		  if (response.feeDetails.safekeepChargeInChargeCurrency !== undefined){
			  this.view.lblSafeCharge.isVisible = true;
			  this.view.lblSafeChargeValue.isVisible = true;
			  this.view.lblSafeChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(response.feeDetails.safekeepChargeInChargeCurrency, response.feeDetails.chargeCurrency);
          }
		   else{
		      this.view.lblSafeCharge.isVisible = false;
			  this.view.lblSafeChargeValue.isVisible = false;
		  }
		  if (response.feeDetails.InducementFeesInTradeCurrency !== undefined){
			  this.view.lblIndTrade.isVisible = true;
			  this.view.lblIndTradeValue.isVisible = true;
			  this.view.lblIndTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(response.feeDetails.InducementFeesInTradeCurrency, response.feeDetails.tradeCurrency);
          }
		   else{
		      this.view.lblIndTrade.isVisible = false;
			  this.view.lblIndTradeValue.isVisible = false;
		  }
		  if (response.feeDetails.InducementFeesInChargeCurrency !== undefined){
			  this.view.lblIndCharge.isVisible = true;
			  this.view.lblIndChargeValue.isVisible = true;
			  this.view.lblIndChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(response.feeDetails.InducementFeesInChargeCurrency, response.feeDetails.chargeCurrency);
          }
		   else{
		      this.view.lblIndCharge.isVisible = false;
			  this.view.lblIndChargeValue.isVisible = false;
		  }
	  }}
      else{
        this.view.flxFeesHeader.isVisible = false;
        this.view.flxFeesDetails.isVisible = false;
      }
       }catch(err) {
        this.setError(err, "setSuccess");
      }
    },


	onBack: function () {
        try{
		var navigationMan = applicationManager.getNavigationManager();
		navigationMan.navigateTo('frmConvertCurrency');
           }catch(err) {
        this.setError(err, "onBack");
      }
	},

	cancelOnClick: function () {
      try{
 var params = {"portfolioId":scope_WealthPresentationController.portfolioId,"navPage":"Portfolio","graphDuration":"OneY"};
  var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
  wealthModule.getPortfolioAndGraphDetails(params);
         }catch(err) {
        this.setError(err, "cancelOnClick");
      }
	},

	fromCurrencyType: function () {
      try{
      var navigationMan = applicationManager.getNavigationManager();
		
		var WealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
       WealthMod.setVerifyFlow(true);
      scope_WealthPresentationController.verify=true;
	
	//	WealthMod.initializeStateData(true, "frmConvertCurrencyVerify");
		navigationMan.navigateTo("frmSelectCurrency");
    }catch(err) {
        this.setError(err, "fromCurrencyType");
      }
	},
  
	fromCurrencyAmount: function () {
      try{
        var navigationMan = applicationManager.getNavigationManager();
	
		var WealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      WealthMod.setVerifyFlow(true);
      scope_WealthPresentationController.verify=true;
		//WealthMod.initializeStateData(true, "frmConvertCurrencyVerify");
		navigationMan.navigateTo("frmConvertCurrency");
      }catch(err) {
        this.setError(err, "fromCurrencyAmount");
      }
	},
  
	toCurrencyType: function () {
      try{
         var navigationMan = applicationManager.getNavigationManager();
	
		var WealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
        WealthMod.setVerifyFlow(true);
      scope_WealthPresentationController.verify=true;
	//	WealthMod.initializeStateData(true, "frmConvertCurrencyVerify");
		navigationMan.navigateTo("frmToCurrency");
       }catch(err) {
        this.setError(err, "toCurrencyType");
      }

	},

	scheduleOn: function () {
      try{
		var WealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      WealthMod.setVerifyFlow(true);
		WealthMod.initializeStateData(true, "frmConvertCurrencyVerify");
		WealthMod.commonFunctionForNavigation("frmScheduleDate");
       }catch(err) {
        this.setError(err, "scheduleOn");
      }

	},

	confirmOnClick: function () {
      try{
      var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
        var balData = {"currency":wealthMod.currency,"amount":wealthMod.amount};
        scope_WealthPresentationController.balanceArr.push(balData);
       if(scope_WealthPresentationController.addCurrency===true){
          wealthMod.newAccountsArr.push(wealthMod.newAccount);
       }
      else{
         wealthMod.newAccount={};
      }
      /* var data= wealthMod.getWealthObject();
      var param={
        "buyCurrency":data.buyCurrency,
        "sellCurrency":data.sellCurrency,
        "buyAmount":data.buyAmount,
        "sellAmount":data.sellAmount
      }
      
      wealthMod.createOrder(param);*/
      var navigationMan = applicationManager.getNavigationManager();
      navigationMan.navigateTo("frmConvertCurrencyAck");
      }catch(err) {
        this.setError(err, "confirmOnClick");
      }
    },
   bindGenericError: function (errorMsg){
     try{
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
     applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
      }catch(err) {
        this.setError(err, "bindGenericError");
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