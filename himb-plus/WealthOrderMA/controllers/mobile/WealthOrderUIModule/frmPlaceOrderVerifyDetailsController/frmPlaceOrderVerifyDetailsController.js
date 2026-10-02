define({

	ORDER_TYPE: {
		MARKET: 'Market',
		LIMIT: 'Limit',
		STOPLOSS: 'Stop Loss',
		STOPLIMIT: 'Stop Limit'
	},

	VALIDITY: {
		DAYORDER: 'Day Order',
		GOODTILL: 'Good Till Cancelled'
	},
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
		var navManager = applicationManager.getNavigationManager();
		const orderData = navManager.getCustomInfo('frmInstrumentOrder');
		if (orderData.orderType === this.ORDER_TYPE.LIMIT) {
			this.view.flxSeparator5.setVisibility(true);
			this.view.flxSeparator6.setVisibility(false);

			this.view.flxLimitPrice.setVisibility(true);
			this.view.flxStopPrice.setVisibility(false);

		} else if (orderData.orderType === this.ORDER_TYPE.STOPLOSS) {
			this.view.flxSeparator5.setVisibility(false);
			this.view.flxSeparator6.setVisibility(true);
			this.view.flxLimitPrice.setVisibility(false);
			this.view.flxStopPrice.setVisibility(true);
		} else if (orderData.orderType === this.ORDER_TYPE.STOPLIMIT) {
			this.view.flxSeparator5.setVisibility(true);
			this.view.flxSeparator6.setVisibility(true);
			this.view.flxLimitPrice.setVisibility(true);
			this.view.flxStopPrice.setVisibility(true);
		} else { //For ordertype MARKET:
			this.view.flxSeparator5.setVisibility(false);
			this.view.flxSeparator6.setVisibility(false);
			this.view.flxLimitPrice.setVisibility(false);
			this.view.flxStopPrice.setVisibility(false);
		}
		this.checkPermissions();
		this.setUIData();
         }catch(err) {
        this.setError(err, "postShow");
      }
	},
	checkPermissions: function(){  
      try{
      this.view.btnContinue.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("WEALTH_ORDER_MGMT_ORDER_ACKNOWLEDGEMENT_VIEW")); 
    }catch(err) {
        this.setError(err, "checkPermissions");
      }
      },
	initActions: function () {
      try{
		this.view.customHeader.flxBack.onTouchEnd = this.onBack;
		this.view.customHeader.btnRight.onClick = this.cancelOnClick;
		this.view.btnContinue.onClick = this.confirmOnClick;
		this.view.imgInfo.onTouchEnd = this.onClickInfo;
		this.view.flxNo.onTouchEnd = this.onClose;
         }catch(err) {
        this.setError(err, "initActions");
      }
	},
	onClickInfo: function () {
      try{
		this.view.flxInfo.isVisible = true;
      this.view.flxHeader.setEnabled(false);
      this.view.flxbtnTransfer.setEnabled(false);
         }catch(err) {
        this.setError(err, "onClickInfo");
      }
	},
	onClose: function () {
      try{
		this.view.flxInfo.isVisible = false;
       this.view.flxHeader.setEnabled(true);
      this.view.flxbtnTransfer.setEnabled(true);
	  }catch(err) {
        this.setError(err, "onClose");
      }
	},
  
    fitCharacterss: function(str) {
      try{
      if(str === undefined || str === null) return "";
      else if(str.length <= 22) {
        return str;
      }
      else {
        let new_string = str.slice(0, 23) + "...";
        return new_string;
      }
         }catch(err) {
        this.setError(err, "fitCharacterss");
      }
    },
  
	setUIData: function () {
        try{
		//var wealthMod = applicationManager.getModulesPresentationController("WealthModule");
		var formatUtil = applicationManager.getFormatUtilManager();
		// var data = wealthMod.getWealthObject();
		var navManager = applicationManager.getNavigationManager();
		const data1 = navManager.getCustomInfo('frmInstrumentDetails');
		const orderData = navManager.getCustomInfo('frmInstrumentOrder');
		var quantity = orderData.quantity;
		var marketData = applicationManager.getModulesPresentationController({ "moduleName": "WealthOrderUIModule", "appName": "WealthOrderMA" }).marketOrder;
	//	this.view.lblInstrumentVal.text = data.instrumentName;
      if(data1.response !== undefined){
        var currentPosition=data1.response;
        this.view.lblInstrumentVal.text = currentPosition.description;
        }
        else{
		this.view.lblInstrumentVal.text = orderData.description;
        }
		
		this.view.lblOrderVal.text = orderData.order;
		this.view.lblQuantityVal.text = quantity.toString();
		this.view.lblOrderTypeVal.text = orderData.orderType;
      //this.view.lblCurrentPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(scope_WealthOrderPresentationController.marketPrice !== "0.0"?
                                                                                        // scope_WealthOrderPresentationController.marketPrice:data1.instrumentDetails.instrumentDetails.closeRate,
                                                                                        // orderData.tradeCurrency);
      this.view.lblCurrentPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(data1.instrumentDetails.productDetails.marketPrice, orderData.tradeCurrency);
		this.view.lblValidityVal.text = (orderData.validity === "GTD" || orderData.validity === "Day Order") ? "Day Order": "Good Till Canceled";
		this.view.lblAmountVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.netAmount, orderData.tradeCurrency);
		// Fees to be taken from Service response
		this.view.lblFeesVal.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.fees, orderData.tradeCurrency);
      applicationManager.getModulesPresentationController({ "moduleName": "WealthOrderUIModule", "appName": "WealthOrderMA" }).fees= this.view.lblFeesVal.text;
	  if(marketData.hasOwnProperty("feeDetails")){
	  if (marketData.feeDetails.length !== 0) {
        this.view.flxFeesDetails.isVisible = true;
        this.view.flxFeesHeader.isVisible = true;
		  if (marketData.feeDetails.advisoryFeesInTradeCurrency !== undefined){
			  this.view.lblAdvTrade.isVisible = true;
			  this.view.lblAdvTradeValue.isVisible = true;
			  this.view.lblAdvTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.feeDetails.advisoryFeesInTradeCurrency, marketData.feeDetails.tradeCurrency);
          }
		  else{
		      this.view.lblAdvTrade.isVisible = false;
			  this.view.lblAdvTradeValue.isVisible = false;
		  }
		  if (marketData.feeDetails.advisoryFeesInChargeCurrency !== undefined){
			  this.view.lblAdvCharge.isVisible = true;
			  this.view.lblAdvChargeValue.isVisible = true;
			  this.view.lblAdvChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.feeDetails.advisoryFeesInChargeCurrency, marketData.feeDetails.chargeCurrency);
          }
		   else{
		      this.view.lblAdvCharge.isVisible = false;
			  this.view.lblAdvChargeValue.isVisible = false;
		  }
		  if (marketData.feeDetails.safekeepChargeInTradeCurrency !== undefined){
			  this.view.lblSafeTrade.isVisible = true;
			  this.view.lblSafeTradeValue.isVisible = true;
			  this.view.lblSafeTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.feeDetails.safekeepChargeInTradeCurrency, marketData.feeDetails.tradeCurrency);
          }
		   else{
		      this.view.lblSafeTrade.isVisible = false;
			  this.view.lblSafeTradeValue.isVisible = false;
		  }
		  if (marketData.feeDetails.safekeepChargeInChargeCurrency !== undefined){
			  this.view.lblSafeCharge.isVisible = true;
			  this.view.lblSafeChargeValue.isVisible = true;
			  this.view.lblSafeChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.feeDetails.safekeepChargeInChargeCurrency, marketData.feeDetails.chargeCurrency);
          }
		   else{
		      this.view.lblSafeCharge.isVisible = false;
			  this.view.lblSafeChargeValue.isVisible = false;
		  }
		  if (marketData.feeDetails.InducementFeesInTradeCurrency !== undefined){
			  this.view.lblIndTrade.isVisible = true;
			  this.view.lblIndTradeValue.isVisible = true;
			  this.view.lblIndTradeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.feeDetails.InducementFeesInTradeCurrency, marketData.feeDetails.tradeCurrency);
          }
		   else{
		      this.view.lblIndTrade.isVisible = false;
			  this.view.lblIndTradeValue.isVisible = false;
			  this.view.flxSeparator15.isVisible = false
		  }
		  if (marketData.feeDetails.InducementFeesInChargeCurrency !== undefined){
			  this.view.lblIndCharge.isVisible = true;
			  this.view.lblIndChargeValue.isVisible = true;
			  this.view.lblIndChargeValue.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.feeDetails.InducementFeesInChargeCurrency, marketData.feeDetails.chargeCurrency);
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
		if (orderData.orderType === this.ORDER_TYPE.LIMIT || orderData.orderType === this.ORDER_TYPE.STOPLIMIT) {

			this.view.lblLimitPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.limitPrice, orderData.tradeCurrency);
		}
		if (orderData.orderType === this.ORDER_TYPE.STOPLOSS || orderData.orderType === this.ORDER_TYPE.STOPLIMIT) {
			this.view.lblStopPrice.text = orderData.orderType === this.ORDER_TYPE.STOPLOSS ? 'Stop Price:' : 'Stop Price:'

			//const stopText = orderData.orderType === this.ORDER_TYPE.STOPLIMIT ? orderData.stopPrice : orderData.stopLoss;
			this.view.lblStopPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.price, orderData.tradeCurrency);
		}
      if(applicationManager.getModulesPresentationController({ "moduleName": "WealthOrderUIModule", "appName": "WealthOrderMA" }).orderDetails !=""){
        this.view.lblInstrumentVal.text = this.fitCharacterss(applicationManager.getModulesPresentationController({ "moduleName": "WealthOrderUIModule", "appName": "WealthOrderMA" }).orderDetails.instrumentName);
        this.view.lblCurrentPriceVal = applicationManager.getModulesPresentationController({ "moduleName": "WealthOrderUIModule", "appName": "WealthOrderMA" }).orderDetails.amount;
      }
           }catch(err) {
        this.setError(err, "setUIData");
      }
	},


	onBack: function () {
       try{
		var navigationMan = applicationManager.getNavigationManager();
		navigationMan.goBack();
          }catch(err) {
        this.setError(err, "onBack");
      }
	},

	cancelOnClick: function () {
      try{
      //var controller = applicationManager.getPresentationUtility().getController('frmPlaceOrder', true);
      var navigationMan = applicationManager.getNavigationManager();
      var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      if(scope_WealthOrderPresentationController.navForm === "frmInstrumentDetails"){
        navigationMan.navigateTo("frmInstrumentDetails");
      }else if(scope_WealthOrderPresentationController.navForm === "frmWatchlist"){
        var ntf = new kony.mvc.Navigation("frmWatchlist");
        ntf.navigate();
      }
      else {
        var params = {
          "portfolioId": scope_WealthPresentationController.portfolioId,
          "navPage": "Portfolio",
          "graphDuration": "OneY"
        };

        //var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");

        wealthOrderModule.getPortfolioAndGraphDetails(params);
      }
         }catch(err) {
        this.setError(err, "cancelOnClick");
      }
	},


	confirmOnClick: function () {
      try{
		var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
		var data = wealthMod.getWealthObject();
		var nav = applicationManager.getNavigationManager();
		let orderData = nav.getCustomInfo('frmInstrumentOrder');
        orderData.validate_only = "";
        let tempMode = orderData.order;
        let tempType = orderData.orderType;
        orderData.order = (tempMode.length === 4)? tempMode.toUpperCase().slice(0, -1): tempMode.toUpperCase();
        orderData.orderType=  tempType.toUpperCase();
      //  orderData.order = tempMode;
        orderData.orderType = tempType;
        orderData.funcResultCode = scope_WealthOrderPresentationController.marketOrder.funcResultCode?scope_WealthOrderPresentationController.marketOrder.funcResultCode:"";
        nav.setCustomInfo('frmInstrumentOrder', orderData);
      
      wealthMod.createMarketOrder(orderData);
		/*var param={
		  "buyCurrency":data.buyCurrency,
		  "sellCurrency":data.sellCurrency,
		  "buyAmount":data.buyAmount,
		  "sellAmount":data.sellAmount
		}
      
		wealthMod.createOrder(param);*/
      }catch(err) {
        this.setError(err, "confirmOnClick");
      }
	},
	bindGenericError: function (errorMsg) {
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
