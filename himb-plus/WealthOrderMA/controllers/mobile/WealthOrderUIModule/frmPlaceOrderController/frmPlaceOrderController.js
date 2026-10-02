define(["CommonUtilities"], function(CommonUtilities) {
  return {
	ricCode: "",
	isinCode: "",
	marketPrice: "",
	instrumentName: "",
	orderMode: "Buy",
	//watchlistFlow: null,
    instrumentId: "",
    instrumentMinimal:{},
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
		//this.watchlistFlow = this.watchlistFlow || kony.application.getPreviousForm().id === "frmWatchlist" ? true : null;
      scope_WealthPresentationController.watchlistFlow=scope_WealthPresentationController.watchlistFlow || kony.application.getPreviousForm().id === "frmWatchlist" ? true : null;
      scope_WealthOrderPresentationController.orderDetails = "";
      //scope_WealthPresentationController.isTapIntegration= false;
         }catch(err) {
        this.setError(err, "preShow");
      }
	},

	postShow: function () {
      try{
		this.initActions();
		this.setUIData();
		this.checkPermissions();
         }catch(err) {
        this.setError(err, "postShow");
      }
	},

	initActions: function () {
      try{
        var configManager = applicationManager.getConfigurationManager();
		this.view.customHeader.flxBack.onTouchEnd = this.onBack;
		this.view.customHeader.btnRight.onClick = this.cancelOnClick;
		this.view.btnContinue.onClick = this.confirmOnClick;
      
 var isAppPresent=configManager.isMicroAppPresent("TransfersMA");
      if(isAppPresent===true){
        if(configManager.getBaseCurrency() === 'EUR'){
          this.view.lblTransferCash.onTouchEnd = this.onTransferCashEuro;
        } else {
          this.view.lblTransferCash.onTouchEnd = this.onTransferCash;
        }
      }else{
          this.view.lblTransferCash.isVisible=false;
        }
        this.view.lblConvertCurrency.text = kony.i18n.getLocalizedString("i18n.wealth.exchangeCurrencyWithoutColon");
		this.view.lblConvertCurrency.onTouchEnd = this.onConvertCurrency;
		this.view.btnTglBuy.onClick = this.onToggleConversionPreference.bind(this, 0);
		this.view.btnTglSell.onClick = this.onToggleConversionPreference.bind(this, 1);
		this.view.imgArrow.onTouchEnd = this.selectAccount;
		this.view.imgRefresh.onTouchEnd = this.onRefresh;
      
      //favourite imgFavourite
      if(this.view.imgStar.isVisible){
        this.updateFavList('get');
        this.view.imgStar.onTouchEnd = this.updateFavList;
      }
         }catch(err) {
        this.setError(err, "initActions");
      }
    },
  
	setStarValue: function(serviceResponse) { 
      try{
	   var favorite = false;     
      if (serviceResponse.favInstrumentCodes){ 
        if(serviceResponse.favInstrumentCodes.split('@').find(element=>element===this.ricCode)){     
          favorite = true;
        }
      }

      if (serviceResponse.favInstrumentIds){ 
        if(serviceResponse.favInstrumentIds.split('@').find(element=>element===this.instrumentId)){     
          favorite = true;
        }
      }   

      if(favorite) { 
        this.view.imgStar.src = "activestar.png";  
      }  
          else{
        this.view.imgStar.src = "inactivestar.png";
      }
         }catch(err) {
        this.setError(err, "setStarValue");
      }
    },


    updateFavList: function(operation){   
      try{
      var params = {};
      var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
       

      if(operation === 'get'){
 
        wealthOrderModule.getUserFavoriteInstruments(params);

      }else{

        if(this.view.imgStar.src==="activestar.png"){
          this.view.imgStar.src = "inactivestar.png";
          operation = 'Remove';
        }else{
          this.view.imgStar.src="activestar.png";
          operation = 'Add';
        }

        params = {
          "RICCode": this.ricCode,
          "operation": operation,
          "instrumentId" : this.productDetails.instrumentId,
          "application" : this.productDetails.application
        };
        
        wealthOrderModule.updateFavouriteInstruments(params);
      }
      }catch(err) {
        this.setError(err, "updateFavList");
      }
    },
	onRefresh: function () {
      try{
		var wealthOrderMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
		var param = {
			"ISINCode": this.isinCode,
			"RICCode": this.ricCode,
            "instrumentId" : this.productDetails.instrumentId,
            "application" : this.productDetails.application
		}
		wealthOrderMod.getPlaceOrderDetails(param);
         }catch(err) {
        this.setError(err, "onRefresh");
      }
	},
	selectAccount: function () {
      try{
		var navMan = applicationManager.getNavigationManager();
		var placeorderdata = navMan.getCustomInfo('frmPlaceOrder');
		var ricCode = placeorderdata.ricCode;
		if (kony.sdk.isNullOrUndefined(ricCode)) {
			placeorderdata.RICCode = this.ricCode;
		}
        var customerId = applicationManager.getUserPreferencesManager().primaryCustomerId.id;
		var params = {
			"customerId": customerId
		};
		//  var wealthModule = applicationManager.getModulesPresentationController("WealthModule");
		//wealthModule.getPortfolioList(params);
		navMan.navigateTo('frmInvestmentAcc');
         }catch(err) {
        this.setError(err, "selectAccount");
      }
	},
	setCashBalance: function (data, currency) {
      try{
		//var finalAmount = data.totalCashBalance;
		//var finalCurrency = currency;
      if(kony.application.getPreviousForm().id === "frmWatchlist" || kony.application.getPreviousForm().id === 'frmInstrumentDetails')
      {
        var finalAmount = scope_WealthPresentationController.totalCashBalance;
        var finalCurrency = scope_WealthPresentationController.currency;
      }else{
        finalAmount = data.totalCashBalance;
        finalCurrency = currency;
      }


       if(scope_WealthPresentationController.isJointAccount){
         this.view.flxCashBalance.height="80dp";
        this.view.flxcash.setVisibility(false);
      }else{
         this.view.flxCashBalance.height="110dp";
        this.view.flxcash.setVisibility(true);
      }
// 		if (data.length === 1) {
// 			finalAmount = data[0].referenceCurrencyValue;
// 			finalCurrency = data[0].currency;
// 		} else {
// 			for (var num in data) {
// 				if (currency === data[num].currency) {
// 					finalAmount = data[num].referenceCurrencyValue;
// 					finalCurrency = data[num].currency;
// 					break;
// 				} else {
// 					finalAmount = data[0].referenceCurrencyValue;
// 					finalCurrency = data[0].currency;
// 				}
// 			}
// 		}
      if(finalAmount=="" || finalAmount== undefined){
        this.view.lblCash.isVisible=false;
      this.view.lblCashVal.isVisible=false;
        this.view.flxCashBalance.height="40dp";
      }
      else{ 
         this.view.lblCash.isVisible=true;
      this.view.lblCashVal.isVisible=true;
        this.view.flxCashBalance.height="110dp";
		var formatUtil = applicationManager.getFormatUtilManager();
		this.view.lblCashVal.text = formatUtil.formatAmountandAppendCurrencySymbol(finalAmount, finalCurrency);
      }
		var navManager = applicationManager.getNavigationManager();
		var amount = navManager.getCustomInfo("frmInvestmentAcc");
		if (kony.sdk.isNullOrUndefined(amount)) {
			var amount = {};
			amount.finalAmount = finalAmount;
		} else {
			amount.finalAmount = finalAmount;
		}
		navManager.setCustomInfo('frmInvestmentAcc', amount);

      }catch(err) {
        this.setError(err, "setCashBalance");
      }
	},
	setUIData: function () {
      try{
      var isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
		var navMan = applicationManager.getNavigationManager();
		var formatUtil = applicationManager.getFormatUtilManager();
		var Data = navMan.getCustomInfo("frmPlaceOrder");
		var data1 = navMan.getCustomInfo("frmInstrumentDetails");
		var instrumentdetails = data1.instrumentDetails;
      this.view.imgArrow.src = isRTL ? "chevron_reverse.png" : "chevron.png";
  //      var instrumentdetails1; 
      
      this.productDetails=instrumentdetails.productDetails;
      
//         if (instrumentdetails.instrumentMinimal[0]){
//         instrumentdetails1 = instrumentdetails.instrumentMinimal[0];
//           }
//       else{
//         instrumentdetails1 = instrumentdetails.instrumentMinimal;
//         }
      //var instrumentdetails1 = instrumentdetails.instrumentMinimal[0];
      
		var currentposition = data1.response;
		this.instrumentName = this.productDetails.instrumentName;
        this.closeRate = this.productDetails.marketPrice;
		this.ricCode = this.productDetails.RICCode;
		this.isinCode = this.productDetails.ISINCode;
        this.instrumentId=this.productDetails.instrumentId;
		this.setDetails(instrumentdetails, false);
		var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
		if (scope_WealthPresentationController.instrumentAcc == true) {
			var data = navMan.getCustomInfo("frmInvestmentAcc");
			var cashdata = data.cashData;
			if (kony.sdk.isNullOrUndefined(data.lblAccountName)) {
				this.view.lblAccount.text = scope_WealthPresentationController.investmentAccountName || scope_WealthPresentationController.watchlistAccountName;
			} else {
				this.view.lblAccount.text = data.lblAccountName;
                scope_WealthPresentationController.watchlistAccountName = data.lblAccountName;
				scope_WealthPresentationController.watchlistPortfolioId =  data.portfolioId;
			}
			// this.view.lblCashVal.text = formatUtil.formatAmountandAppendCurrencySymbol(data.lblAccountBalValue, instrumentdetails1.referenceCurrency);
			//   this.view.lblCashVal.text = formatUtil.formatAmountandAppendCurrencySymbol(cashdata.totalCashBalance,cashdata.totalCashBalanceCurrency);
			//scope_WealthPresentationController.totalCashBalance=cashdata.totalCashBalance;
			this.setCashBalance(cashdata, cashdata.totalCashBalanceCurrency);
		} else {
            //  var lblAccountText = kony.application.getPreviousForm().id === "frmWatchlist" || this.watchlistFlow ? scope_WealthPresentationController.watchlistAccountName : wealthMod.getMaskedAccountName();
         this.view.lblAccount.text = (scope_WealthPresentationController.investmentAccountName !== "") ? scope_WealthPresentationController.investmentAccountName : scope_WealthPresentationController.watchlistAccountName;
          if(scope_WealthPresentationController.portfolioIdUpdate === "")               
			// this.view.lblCashVal.text = formatUtil.formatAmountandAppendCurrencySymbol(scope_WealthPresentationController.totalCashBalance, scope_WealthPresentationController.totalCashBalanceCurrency);			
			this.setCashBalance(scope_WealthPresentationController.portfolioCashAccounts, scope_WealthPresentationController.portfolioCashAccounts.totalCashBalanceCurrency);
		}
		if (Data.buy === true) {
			this.onToggleConversionPreference(0);
		} else {
			this.onToggleConversionPreference(1);
		}
		if (scope_WealthPresentationController.instrumentAcc === true) {
			scope_WealthPresentationController.instrumentAcc = false;
			if ((scope_WealthOrderPresentationController.currentPos !== "") && (scope_WealthOrderPresentationController.quantity != "")) {
				this.view.blCurrentPosVal.text = formatUtil.formatAmountandAppendCurrencySymbol(scope_WealthOrderPresentationController.currentPos, this.productDetails.instrumentCurrencyId) + " (" + scope_WealthOrderPresentationController.quantity + ")";
				this.view.flxCurrentPosition.isVisible = true;
			} else {
				this.view.flxCurrentPosition.isVisible = false;
			}
		} else {
			 let q = formatUtil.deFormatAmount(currentposition.marketValPOS ? currentposition.marketValPOS:"0");
                let currency =  currentposition.secCCy ?  currentposition.secCCy : this.productDetails.instrumentCurrencyId;
                let temp = formatUtil.formatAmountandAppendCurrencySymbol(q, currency);
                let quantity= currentposition.quantity ? currentposition.quantity :"0";
                this.view.blCurrentPosVal.text = temp + " (" + quantity + ")";
                scope_WealthOrderPresentationController.currentPos = q;
                scope_WealthOrderPresentationController.quantity = quantity;
		}
    scope_WealthOrderPresentationController.orderDetails = {
       "instrumentName": this.view.lblInstrument.text,
        "amount": this.view.lblAmount.text,
    };
      if(this.view.lblPL.isVisible == true)
        scope_WealthOrderPresentationController.orderDetails.PL =this.view.lblPL.text;
	 }catch(err) {
        this.setError(err, "setUIData");
      }
      },
	
	
	setDetails: function(instrumentDetails, refresh) {
      try{
    let productDetails = "";
    let instrumentDetailsDate = {};
    productDetails = instrumentDetails.productDetails;

    var formatUtil = applicationManager.getFormatUtilManager();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.lblInstrument.text = CommonUtilities.truncateStringWithGivenLength(productDetails.instrumentName, 30);
    } else {
        this.view.lblInstrument.text = productDetails.instrumentName;
    }
    this.view.lblExchange.text = productDetails.isinExchange
    this.view.lblAmount.text="";
    if (productDetails.marketPrice !== ""){
      this.view.lblAmount.text = formatUtil.formatAmountandAppendCurrencySymbol(productDetails.marketPrice, productDetails.instrumentCurrencyId.toUpperCase());
    }

      this.view.lblPL.text = productDetails.formatted_netperChange;
      if (parseFloat(productDetails.percentageChange) > 0) {
        this.view.lblPL.skin = "sknIbl2f8523SSPsb45px";
      }else if (parseFloat(productDetails.percentageChange) < 0) {
        this.view.lblPL.skin = "sknIblEE0005SSPsb45px";
      } else {
        this.view.lblPL.skin = "sknIbl2f8523SSPsb45px";
      }
      
      
      

	
      if (productDetails){
        instrumentDetailsDate = {
            "timeReceived": ((productDetails.timeReceived) ? productDetails.timeReceived : "00:00:00"),
            "dateReceived": ((productDetails.dateReceived) ? productDetails.dateReceived : "")
        };
      }


    if (productDetails.dateReceived) {
        this.view.imgRefresh.left = "2dp";
        this.view.lblTime.text = "As on " + this.setDate(instrumentDetailsDate);
    } else {
        this.view.imgRefresh.left = "10dp";
        this.view.lblTime.text = "";
    }
         }catch(err) {
        this.setError(err, "setDetails");
      }
  },
    setDate:function(instrumentDate){
  try{
      let month = instrumentDate.dateReceived.substring(3,6);
      let day = instrumentDate.dateReceived.substring(0,2);
      let year = instrumentDate.dateReceived.substring(7,12);
      var dateFormat = "";
      let hour = instrumentDate.timeReceived.substring(0,2);
      let min = instrumentDate.timeReceived.substring(3,5);
      
      let firstPart = applicationManager.getFormatUtilManager().getTwelveHourTimeString(hour+': '+min);          
      let trdPart = month + ' ' + day;

      return firstPart + ' ' + "UTC" + ' ' + trdPart;
 }catch(err) {
        this.setError(err, "setDate");
      }
    },

    onTransferCash: function(){
      try{
//       var fastTransfer = applicationManager.getModulesPresentationController("TransferModule");
//       var navManager = applicationManager.getNavigationManager();
//       data = {};
//       navManager.setCustomInfo("frmTransfersFromAccount", data);
//       fastTransfer.commonFunctionForNavigation("frmTransfersFromAccount");
      
       if(this.isTransfersAndPayEnabled()){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("centralmoneymovement","frmDashboardAggregated");
      var moneyMovementModule = applicationManager.getModulesPresentationController({ "moduleName": "MoneyMovementUIModule", "appName": "TransfersMA" });
      moneyMovementModule.getFromAndToAccounts();
      moneyMovementModule.clearMMFlowAtributes();
       }
         }catch(err) {
        this.setError(err, "onTransferCash");
      }
    },
    onTransferCashEuro: function(){
      try{
//       var fastTransfer = applicationManager.getModulesPresentationController("TransferModuleEurope");
//       var navManager = applicationManager.getNavigationManager();
//       data = {};
//       navManager.setCustomInfo("frmEuropeTransferFromAccount", data);
//       fastTransfer.commonFunctionForNavigation("frmEuropeTransferFromAccount");
      
       if(this.isTransfersAndPayEnabledEur()){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      navMan.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
      var transferModPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "TransferEuropeUIModule", "appName": "TransfersMA" });
      transferModPresentationController.setEuropeFlowType("EXTERNAL");
      transferModPresentationController.getFromAndToAccounts();
      transferModPresentationController.clearEuropeFlowAtributes();
       }
         }catch(err) {
        this.setError(err, "preShow");
      }
    },
    isTransfersAndPayEnabled:function(){
      try{
          var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isMicroAppPresent("TransfersMA") === true
      || configurationManager.isMicroAppPresent("BillPayMA") === true || configurationManager.isMicroAppPresent("WireTransferMA") === true) {
      return [
        "INTERNATIONAL_ACCOUNT_FUND_TRANSFER",
        "INTER_BANK_ACCOUNT_FUND_TRANSFER",
        "INTRA_BANK_FUND_TRANSFER",
        "TRANSFER_BETWEEN_OWN_ACCOUNT",
        "P2P"
      ].some(function (permission) {
        return applicationManager.getConfigurationManager().checkUserFeature(permission);
      })
    } else
      return false;
         }catch(err) {
        this.setError(err, "onTransferCashEuro");
      }
        },
      
      isTransfersAndPayEnabledEur:function(){
        try{
          var configurationManager = applicationManager.getConfigurationManager();
    if (configurationManager.isMicroAppPresent("TransfersMA") === true
      || configurationManager.isMicroAppPresent("BillPayMA") === true || configurationManager.isMicroAppPresent("WireTransferMA") === true) {
      return [
        "INTERNATIONAL_ACCOUNT_FUND_TRANSFER",
        "INTER_BANK_ACCOUNT_FUND_TRANSFER",
        "INTRA_BANK_FUND_TRANSFER",
      ].some(function (permission) {
        return applicationManager.getConfigurationManager().checkUserFeature(permission);
      })
    } else
      return false;
           }catch(err) {
        this.setError(err, "preShow");
      }
        },
	onConvertCurrency: function () {
      try{
		var navigationMan = applicationManager.getNavigationManager();
		navigationMan.navigateTo('frmSelectCurrency');
         }catch(err) {
        this.setError(err, "onConvertCurrency");
      }
	},
	onToggleConversionPreference: function (option) {
      try{
		var navMan = applicationManager.getNavigationManager();

		var Data = navMan.getCustomInfo("frmPlaceOrder");
        Data['instrumentId'] = this.instrumentId;

		let activeSkin = 'sknBtnFFFFFFBdr10px';
		let inactiveSkin = 'sknbtn000000SSPSemiBold15px';
		if (!option) {
			this.orderMode = 'Buy';
			this.view.btnTglBuy.skin = activeSkin;
			this.view.btnTglSell.skin = inactiveSkin;
			this.view.btnTglBuy.focusSkin = activeSkin;
			Data.buy = true;
		} else {
			this.orderMode = 'Sell';
			this.view.btnTglBuy.skin = inactiveSkin;
			this.view.btnTglSell.skin = activeSkin;
			this.view.btnTglSell.skin = activeSkin;
			Data.buy = false;
		}
		navMan.setCustomInfo("frmPlaceOrder", Data);
     }catch(err) {
        this.setError(err, "onToggleConversionPreference");
      }
	},

	onBack: function () {
      try{
scope_WealthPresentationController.portfolioIdUpdate= "";
// 		var navigationMan = applicationManager.getNavigationManager();
// 		navigationMan.goBack();
      var navMan = applicationManager.getNavigationManager();
     // if(kony.application.getPreviousForm().id==="frmInstrumentDetails"){
      if(scope_WealthOrderPresentationController.navForm === "frmInstrumentDetails"){
        navMan.navigateTo("frmInstrumentDetails");
      }else if (scope_WealthPresentationController.isFrmWatchlist){
        navMan.navigateTo("frmWatchlist");
        //new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmOrders"}).navigate();
      }else{
        new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmHoldings"}).navigate();
      }
         }catch(err) {
        this.setError(err, "onBack");
      }
	},

	cancelOnClick: function () {
      try{
      scope_WealthPresentationController.portfolioIdUpdate= "";
      var navigationMan=applicationManager.getNavigationManager();
      if (scope_WealthPresentationController.isFrmWatchlist) {
        //         var ntf = new kony.mvc.Navigation("frmWatchlist");
        // 		ntf.navigate();

        navigationMan.navigateTo("frmWatchlist");
      }
      else if(scope_WealthOrderPresentationController.navForm === "frmInstrumentDetails"){
       // navigationMan.navigateTo("frmInstrumentDetails");
       //IW-3874 STARTS BHARATH
        if(scope_WealthPresentationController.isfrmInstrumentSearch){
          new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmPortfolioDetails"}).navigate();
        }else{
          new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmHoldings"}).navigate();
        }
      }
      else if(scope_WealthOrderPresentationController.navForm === "frmHoldings"){
         new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmHoldings"}).navigate();
      }//IW-3874 ENDS BHARATH
      else {
        var params = {
          "portfolioId": scope_WealthPresentationController.portfolioId,
          "navPage": "Portfolio",
          "graphDuration": "OneY"
        };

		var wealthorderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");

		wealthorderModule.getPortfolioAndGraphDetails(params);
      }
         }catch(err) {
        this.setError(err, "cancelOnClick");
      }
	},


	confirmOnClick: function () {
      try{
		scope_WealthPresentationController.portfolioIdUpdate=this.view.lblAccount.text;
		scope_WealthOrderPresentationController.placeOrder = true;
		scope_WealthOrderPresentationController.ordersPage = false;
		//var wealthMod = applicationManager.getModulesPresentationController("WealthModule");
		//var data = wealthMod.getWealthObject();
		var nav = applicationManager.getNavigationManager();
		applicationManager.getPresentationUtility().showLoadingScreen();

		nav.setCustomInfo("frmInstrumentOrder", {
			orderMode: this.orderMode
		});
		nav.navigateTo('frmInstrumentOrder');
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
  checkPermissions: function(){
    try{
      var configManager =  applicationManager.getConfigurationManager();
      var checkUserPermission = function (permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }
      this.view.imgStar.isVisible = configManager.addToWatchlistPermissions().some(checkUserPermission);
      this.view.btnContinue.isVisible = configManager.mgmtOrderVerifyPermissions().some(checkUserPermission);
       if(scope_WealthPresentationController.isJointAccount){
        this.view.btnContinue.setVisibility(false);
      }
      let watchListSellPermission = configManager.sellOrderPermissions().some(checkUserPermission);
      let watchListBuyPermission = configManager.buyOrderPermissions().some(checkUserPermission);
      this.view.flxTglSell.isVisible = watchListSellPermission;
      this.view.flxTglBuy.isVisible = watchListBuyPermission; 
      if (watchListSellPermission === true && watchListBuyPermission === false) {
          this.view.flxTglSell.right = "0dp";
          this.view.flxTglSell.width = "100%";
      } else if (watchListBuyPermission === true && watchListSellPermission === false) {
          this.view.flxTglBuy.left = "0dp";
          this.view.flxTglBuy.width = "100%";       
      }
       }catch(err) {
        this.setError(err, "checkPermissions");
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
  };
});
