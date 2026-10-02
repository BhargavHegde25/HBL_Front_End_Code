define({

	ORDER_MODE: {
		BUY: 'Buy',
		SELL: 'Sell'
	},

	ORDER_TYPE: {
		MARKET: 'Market',
		LIMIT: 'Limit',
		STOPLOSS: 'Stop Loss',
		STOPLIMIT: 'Stop Limit'
	},
  	fitCharacters: function(str) {
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
        this.setError(err, "fitCharacters");
      }
    },
	init: function () {
      try{
		var navManager = applicationManager.getNavigationManager();
		var currentForm = navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
		this.view.preShow = this.preShow;
		this.view.postShow = this.postShow;
         }catch(err) {
        this.setError(err, "init");
      }
	},

	preShow: function () {
      try{
		if (kony.os.deviceInfo().name === "iPhone") {
			this.view.flxHeader.isVisible = false;
		}
		this.initActions();
//       if(kony.application.getPreviousForm().id== "frmInstrumentOrder"){
//         var scope = this;
//       if(scope_WealthPresentationController.overrideMessage!=""){
//       this.view.CancelTransactionPopup.setContext(scope_WealthPresentationController.overrideMessage);
//       this.view.flxCancelPopup.setVisibility(true);
//       this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
//       if(btnAction)
//         scope.view.flxCancelPopup.setVisibility(false);
//     };
//       }
//       }
         }catch(err) {
        this.setError(err, "preShow");
      }
	},

	initActions: function () {
      try{
		this.view.btnView.onClick = this.onViewOrder;
		this.view.btnClose.onClick = this.onClose;
         }catch(err) {
        this.setError(err, "initActions");
      }
	},

	postShow: function () {
      try{
		this.initActions();
		var navManager = applicationManager.getNavigationManager();
		const orderData = navManager.getCustomInfo('frmInstrumentOrder');
      if(orderData.orderReference){
        this.view.lblDescription.text="Your order was modified successfully";
      }else{
        this.view.lblDescription.text=kony.i18n.getLocalizedString("i18n.wealth.orderSuccessMsg");
      }
		if (orderData.orderType === this.ORDER_TYPE.LIMIT) {
			this.view.flxLimitPrice.setVisibility(true);
			this.view.flxStopPrice.setVisibility(false);
		} else if (orderData.orderType === this.ORDER_TYPE.STOPLOSS) {
			this.view.flxLimitPrice.setVisibility(false);
			this.view.flxStopPrice.setVisibility(true);
		} else if (orderData.orderType === this.ORDER_TYPE.STOPLIMIT) {
			this.view.flxLimitPrice.setVisibility(true);
			this.view.flxStopPrice.setVisibility(true);
		} else if (orderData.orderType === this.ORDER_TYPE.MARKET){
			this.view.flxLimitPrice.setVisibility(true);
			this.view.flxStopPrice.setVisibility(false);
		}
      	else if (orderData.orderModeType === this.ORDER_TYPE.LIMIT){
            this.view.flxLimitPrice.setVisibility(true);
			this.view.flxStopPrice.setVisibility(false);
        }
        else{
            this.view.flxLimitPrice.setVisibility(false);
			this.view.flxStopPrice.setVisibility(false);
		}
    this.view.imgOnDone.src = (kony.theme.getCurrentTheme() === "darkTheme") ? 'success_ack_dark.png' : 'greentickack.png';
		this.setUIData();
         }catch(err) {
        this.setError(err, "postShow");
      }
	},

	setUIData: function () {
       try{
		//var wealthMod = applicationManager.getModulesPresentationController("WealthModule");
		var formatUtil = applicationManager.getFormatUtilManager();
		// var data = wealthMod.getWealthObject();
		var navManager = applicationManager.getNavigationManager();
		const data1 = navManager.getCustomInfo('frmInstrumentDetails');
		//const data = data1.instrumentDetails.instrumentDetails;
      const data = data1.instrumentDetails.productDetails;
		const orderData = navManager.getCustomInfo('frmInstrumentOrder');
      
      //let instrumentData="";
      
      var instrumentName = "";
      if(data1.instrumentDetails && data1.instrumentDetails.productDetails && data1.instrumentDetails.productDetails.instrumentName)
      {
        instrumentName = data1.instrumentDetails.productDetails.instrumentName;
      } 
      else if (data1.instrumentDetails && data1.instrumentDetails.instrumentMinimal && data1.instrumentDetails.instrumentMinimal[0] && data1.instrumentDetails.instrumentMinimal[0].instrumentName)
      {
        instrumentName = data1.instrumentDetails.instrumentMinimal[0].instrumentName;
      }        


      this.view.lblInstrumentName.text = instrumentName;
  /*if(data1.instrumentDetails.instrumentMinimal[0]){
        instrumentData=data1.instrumentDetails.instrumentMinimal[0];
          this.view.lblInstrumentName.text = this.fitCharacters(instrumentData.instrumentName);
      }else if(data1.instrumentDetails.instrumentMinimal) {
        instrumentData= data1.instrumentDetails.instrumentMinimal;
         this.view.lblInstrumentName.text = this.fitCharacters(instrumentData.instrumentName);
      } 
      else if(orderData !== undefined){
        this.view.lblInstrumentName.text = this.fitCharacters(orderData.description);
      }
        else{
        instrumentData= data1.response;
        this.view.lblInstrumentName.text = this.fitCharacters(instrumentData.description);
      }*/
//       if(data){
//         instrumentData=data;
//           this.view.lblInstrumentName.text = this.fitCharacters(instrumentData.instrumentName);
//       }
//         if(data1.response !== undefined){
//         var currentPosition=data1.response;
//         this.view.lblInstrumentName.text = currentPosition.description;
//         }
//         else{
// 		this.view.lblInstrumentName.text = orderData.description;
//         }
		var quantity = orderData.quantity;
		var marketData = scope_WealthOrderPresentationController.marketOrder;
		//this.view.lblInstrumentName.text = data.instrumentName;
        		
		this.view.lblOrderModeVal.text = orderData.orderMode;
		this.view.lblQuantityValue.text = quantity.toString();
		this.view.lblOrderTypeVal.text = orderData.orderTypeLabel;
		// this.view.lblCurrentPriceVal.text = orderData.marketPrice;
		//this.view.lblValidityVal.text = (orderData.validity === "GTD" || orderData.validity == "Day Order") ? kony.i18n.getLocalizedString("i18n.wealth.dayOrder"): kony.i18n.getLocalizedString("i18n.wealth.goodTillCanceled");
		this.view.lblValidityVal.text = orderData.validityLabel;
		this.view.lblEstimatedVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.netAmount, orderData.tradeCurrency);

		// Fees to be taken from Service response
      if(scope_WealthOrderPresentationController.fees != "")
        this.view.lblTaxFeesVal.text = scope_WealthOrderPresentationController.fees;
        else
		this.view.lblTaxFeesVal.text = formatUtil.formatAmountandAppendCurrencySymbol(marketData.fees, orderData.tradeCurrency);
		if (orderData.orderType === this.ORDER_TYPE.LIMIT || orderData.orderType === this.ORDER_TYPE.STOPLIMIT) {
            this.view.lblLimitPrice.text = kony.i18n.getLocalizedString("i18n.wealth.limitPrice");
			this.view.lblLimitPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.limitPrice, orderData.tradeCurrency);

		}
		if (orderData.orderType === this.ORDER_TYPE.STOPLOSS || orderData.orderType === this.ORDER_TYPE.STOPLIMIT) {
			this.view.lblStopPrice.text = orderData.orderType === this.ORDER_TYPE.STOPLOSS ? 'Stop Price:' : 'Stop Price:'

			//const stopText = orderData.orderType === this.ORDER_TYPE.STOPLIMIT ? orderData.stopPrice : orderData.stopLoss;
			this.view.lblStopPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.price, orderData.tradeCurrency);

		}
      if(orderData.orderType === this.ORDER_TYPE.MARKET)
        {
          this.view.lblLimitPrice.text = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement.marketPrice");
          this.view.lblLimitPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.marketPrice, orderData.tradeCurrency);
        }
      if (orderData.orderModeType === this.ORDER_TYPE.LIMIT) {
            this.view.lblLimitPrice.text = kony.i18n.getLocalizedString("i18n.wealth.limitPrice");
            this.view.lblLimitPriceVal.text = formatUtil.formatAmountandAppendCurrencySymbol(orderData.limitPrice, orderData.tradeCurrency);
        }
      }catch(err) {
        this.setError(err, "setUIData");
      }
	},

	onViewOrder: function () {
      try{
         var type = "open";
          var today = new Date();
        var orderId;
        if(scope_WealthPresentationController.orderList.length === 0){
          orderId = null;
        }
        else{
          orderId = scope_WealthPresentationController.orderList.toString();
        }
      var nav = applicationManager.getNavigationManager();
      var portId = nav.getCustomInfo('frmInvestmentAccPortfolio');
         var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
        var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
        var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            var params = {
                "portfolioId": portId ? portId:scope_WealthPresentationController.portfolioId,
                "orderId": orderId,
                "sortBy": "description",
                "type": type,
				"sortOrder": "DESC",
                //"startDate": "2018-12-06",
				//"endDate": endDate,
                "searchByInstrumentName": ""
          }
         if(scope_WealthPresentationController.portfolioId === "")
          params.portfolioId = scope_WealthPresentationController.watchlistPortfolioId;
        var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
        var orderList = wealthOrderModule.getOrdersDetails(params);
        scope_WealthPresentationController.isPortfolio = true;
        scope_WealthPresentationController.isDateRange = false;
       new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmOrders"}).navigate();
	 }catch(err) {
        this.setError(err, "onViewOrder");
      }
      },

	onClose: function () {
      try{
      var navManager = applicationManager.getNavigationManager();
      holdingsData = navManager.getCustomInfo("holdingsPage");
      instrumentDetailsData = navManager.getCustomInfo("instrumentDetailsPage");
      var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      wealthMod.setVerifyFlow(false);
      wealthMod.clearWealthData();
      //var controller = applicationManager.getPresentationUtility().getController('frmPlaceOrder', true);
      if (scope_WealthPresentationController.watchlistFlow=== true) {
        var ntf = new kony.mvc.Navigation("frmWatchlist");
		ntf.navigate();
      }
      
      else if(holdingsData === true){
//         navManager.navigateTo("frmHoldings");
        new kony.mvc.Navigation({
		"appName": "PortfolioManagementMA",
		"friendlyName": "frmHoldings"
		}).navigate();
      }
      
      else if(instrumentDetailsData === true){
        //navManager.navigateTo("frmPortfolioDetails");
        new kony.mvc.Navigation({
		"appName": "PortfolioManagementMA",
		"friendlyName": "frmPortfolioDetails"
		}).navigate();
      }
  
      else {
		var params = {
			"portfolioId": scope_WealthPresentationController.portfolioId,
			"navPage": "Portfolio",
			"graphDuration": "OneY"
		};
          var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
        wealthModule.getPortfolioAndGraphDetails(params);
      } }catch(err) {
        this.setError(err, "onClose");
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
