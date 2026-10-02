define(['CommonUtilities'], function(CommonUtilities) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function WealthOrder_PresentationController() {
      scope_WealthOrderPresentationController = this;
       kony.mvc.Presentation.BasePresenter.call(this);
      // variabled moved from presentation controller present only in order module
     
      scope_WealthOrderPresentationController.overrideMessage= "";
      scope_WealthOrderPresentationController.fees= "";
      scope_WealthOrderPresentationController.instrumentOrder = false;
      scope_WealthOrderPresentationController.placeOrder = false;
      scope_WealthOrderPresentationController.orderDetails= "";
      scope_WealthOrderPresentationController.marketPrice = "";
      scope_WealthOrderPresentationController.marketOrder = {};
      scope_WealthOrderPresentationController.currentPos = "";
      scope_WealthOrderPresentationController.quantity = "";
      scope_WealthOrderPresentationController.isFrmWatchlist = false;
      scope_WealthOrderPresentationController.navForm = "";
      scope_WealthOrderPresentationController.instrumentChartFilter = "";
      scope_WealthOrderPresentationController.onSelectPortfolioId = "";
      scope_WealthOrderPresentationController.ordersPage = false;
      scope_WealthOrderPresentationController.newAccountsArr = [];
      scope_WealthOrderPresentationController.newAccount = {};
      scope_WealthPresentationController.portfolioIdUpdate = "";
	  
      this.instrumentTransactions = "";
      this.editFlow = false;
      this.AccountName = "";
      this.AccountId = "";
      this.downloadFormat="";
      
      kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(WealthOrder_PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    WealthOrder_PresentationController.prototype.initializePresentationController = function() {
        
    };
  WealthOrder_PresentationController.prototype.setAccountId = function(params) {
        this.AccountId = params;
    };
    WealthOrder_PresentationController.prototype.getAccountId = function() {
        return this.AccountId;
    };
WealthOrder_PresentationController.prototype.getUserFavoriteInstruments = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var wealthManager = applicationManager.getWealthOrderManager();
    wealthManager.getUserFavouriteInstruments(params, this.getUserFavoriteInstrumentsSuccess.bind(this), this.getUserFavoriteInstrumentsError.bind(this));
  };
  
   WealthOrder_PresentationController.prototype.getUserFavoriteInstrumentsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
    controller.setStarValue(response);

  };
  WealthOrder_PresentationController.prototype.getUserFavoriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };
  
   WealthOrder_PresentationController.prototype.updateFavouriteInstruments = function(params) {
    var wealthManager = applicationManager.getWealthOrderManager();
    wealthManager.updateUserFavouriteInstruments(params, this.updateFavouriteInstrumentsSuccess.bind(this), this.updateFavouriteInstrumentsError.bind(this));
  };

    WealthOrder_PresentationController.prototype.updateFavouriteInstrumentsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();    

  };
  WealthOrder_PresentationController.prototype.updateFavouriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };
   WealthOrder_PresentationController.prototype.setInstrumentTransactions = function(instrumentTransactions) {
        this.instrumentTransactions = instrumentTransactions;
    };
  
   WealthOrder_PresentationController.prototype.getInstrumentTransactions = function() {
        return this.instrumentTransactions;
    };
  
   WealthOrder_PresentationController.prototype.getHistoricalInstrumentData = function(RICCode, dateOrPeriod,ISINCode,instrumentId) {
        let param = {
            RICCode,
          ISINCode,
          instrumentId,
            dateOrPeriod
        };
        var wealthManager = applicationManager.getWealthOrderManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        wealthManager.getHistoricalCurrencyRate(param, this.getHistoricalInstrumentDataSuccess, this.getHistoricalInstrumentDataFailure);
    };

    WealthOrder_PresentationController.prototype.getHistoricalInstrumentDataSuccess = function(response) {
        var controller = applicationManager.getPresentationUtility().getController('frmInstrumentDetails', true);
        var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("frmInstrumentDetails");
        if (kony.sdk.isNullOrUndefined(data)) {
             data = {};
            data.chartData = response.historicalData?response.historicalData:{};
        } else {
            data.chartData = response.historicalData?response.historicalData:{};
        }
        navManager.setCustomInfo('frmInstrumentDetails', data);

        applicationManager.getPresentationUtility().dismissLoadingScreen();
      // need to check
        if (scope_WealthPresentationController.instrumentDetailsEntry === true) {
            scope_WealthPresentationController.commonFunctionForNavigation('frmInstrumentDetails');
        } else {
            controller.setChartData();
        }
    };
  
   WealthOrder_PresentationController.prototype.getHistoricalInstrumentDataFailure = function(err) {

        var controller = applicationManager.getPresentationUtility().getController('frmInstrumentDetails', true);
        var navManager = applicationManager.getNavigationManager();
        var data = navManager.getCustomInfo("frmInstrumentDetails");
        if (kony.sdk.isNullOrUndefined(data)) {
             data = {};
            data.chartData = {};
        } else {
            data.chartData = {};
        }
        navManager.setCustomInfo('frmInstrumentDetails', data);

        applicationManager.getPresentationUtility().dismissLoadingScreen();
        if (scope_WealthPresentationController.instrumentDetailsEntry === true) {
            scope_WealthPresentationController.commonFunctionForNavigation('frmInstrumentDetails');
        } else {
            controller.setChartData();

        }       
    };
			    WealthOrder_PresentationController.prototype.getHistoricalCurrencyData = function(currencyPairs, dateOrPeriod) {
        let param = {
            currencyPairs,
            dateOrPeriod
        };
        var wealthManager = applicationManager.getWealthOrderManager();
        applicationManager.getPresentationUtility().showLoadingScreen();
        wealthManager.getHistoricalCurrencyRate(param, this.getHistoricalDataSuccess, this.getHistoricalDataFailure);
    };
   WealthOrder_PresentationController.prototype.getHistoricalDataSuccess = function(response) {
        var controller = applicationManager.getPresentationUtility().getController('frmCurrencyChart', true);
        controller.setChartData(response.historicalData);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };

     WealthOrder_PresentationController.prototype.getHistoricalDataFailure = function(err) {
      var controller = applicationManager.getPresentationUtility().getController('frmCurrencyChart', true);
      controller.setChartData({});
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    WealthOrder_PresentationController.prototype.createOrder = function(param) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthmanager = applicationManager.getWealthOrderManager();
        wealthmanager.createOrder(param, this.createOrderSuccess, this.createOrderFailure);
    }
    WealthOrder_PresentationController.prototype.createOrderSuccess = function(response) {
        //scope_WealthPresentationController.currencyRate=response;
      if(kony.application.getCurrentForm().id === "frmConvertCurrencyVerify"){
        var controller = applicationManager.getPresentationUtility().getController('frmConvertCurrencyVerify', true);
      controller.setSuccess(response);
      }else{
        scope_WealthPresentationController.commonFunctionForNavigation('frmConvertCurrencyAck');
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
    WealthOrder_PresentationController.prototype.createOrderFailure = function(error) {
        if (err["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmSCTermsAndCondition', true);
            controller.bindGenericError(err.error);
        }
    };
   
  
   WealthOrder_PresentationController.prototype.getPlaceOrderDetails = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthManager = applicationManager.getWealthOrderManager();
        wealthManager.getPlaceOrderDetails(params, this.getPlaceOrderSuccess.bind(this), this.getPlaceOrderError.bind(this));
    };
    WealthOrder_PresentationController.prototype.getPlaceOrderSuccess = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller;
        if (kony.application.getCurrentForm().id === "frmPlaceOrder") {
            controller = applicationManager.getPresentationUtility().getController('frmPlaceOrder', true);
            controller.setDetails(response, true);

        }
        if (kony.application.getCurrentForm().id === "frmInstrumentOrder") {
            controller = applicationManager.getPresentationUtility().getController('frmInstrumentOrder', true);
            controller.setDetails(response);
        }

    };
    WealthOrder_PresentationController.prototype.getPlaceOrderError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
  
  WealthOrder_PresentationController.prototype.modifyMarketOrder = function(param) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthmanager = applicationManager.getWealthOrderManager();
        var customerId = "";
        var userMan = applicationManager.getUserPreferencesManager();
        if (userMan.backendIdentifier && userMan.backendIdentifier  !== "") {
            customerId = userMan.backendIdentifier;
        } else if(userMan.primaryCustomerId.id && userMan.primaryCustomerId.id !== "") {
            customerId = userMan.primaryCustomerId.id;
        } else {
            customerId = userMan.accessibleCustomerIds[0].id;
        }

        param.coreCustomerId = customerId?customerId :"";
        param.bankDate =  scope_WealthPresentationController.bankdate?scope_WealthPresentationController.bankdate:"";
        wealthmanager.modifyMarketOrder(param, this.modifyMarketOrderSuccess, this.modifyMarketOrderFailure);
    };
   
    WealthOrder_PresentationController.prototype.modifyMarketOrderSuccess = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_WealthOrderPresentationController.marketOrder = response;
        var controller = applicationManager.getPresentationUtility().getController('frmInstrumentOrder', true);
        controller.bindGenericError(response);
    };
  
   WealthOrder_PresentationController.prototype.modifyMarketOrderFailure = function(error) {
        if (error["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmInstrumentOrder', true);
            controller.bindGenericError(error);
        }
    };
  
  WealthOrder_PresentationController.prototype.getPortfolioAndGraphDetails = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthManager = applicationManager.getWealthOrderManager();
       var configManager= applicationManager.getConfigurationManager();
      //let portfolioDetailViewPermission =configManager.checkUserPermission("PORTFOLIO_DETAILS_VIEW");
      let portfolioDetailViewPermission = configManager.getPortfolioDetailViewPermissions().some(configManager.checkUserPermission.bind(configManager));
      if(portfolioDetailViewPermission)
        {
          wealthManager.getPortfolioDetails(params, this.getPortfolioDetailsSuccessCallback.bind(this), this.getPortfolioDetailsErrorCallback.bind(this));  
        }        
      else
        {
          let  data={};
          var navManager = applicationManager.getNavigationManager();
           applicationManager.getPresentationUtility().dismissLoadingScreen();
          navManager.setCustomInfo("frmPortfolioDetails", data);
            navManager.navigateTo("frmPortfolioDetails");
        }
    };
    /**
     *
     **/
    WealthOrder_PresentationController.prototype.getPortfolioDetailsSuccessCallback = function(obj) {
        var navManager = applicationManager.getNavigationManager();
        var data = {};
        data.response = obj.instrumentTotal[0];
        var accountName = obj.instrumentTotal[0].accountName;
        var accountID = obj.instrumentTotal[0].accountNumber;
        var maskAccountName = CommonUtilities.truncateStringWithGivenLength(accountName + "....", 26) + CommonUtilities.getLastFourDigit(accountID);
        this.setAccountId(accountID);
     //   this.setMaskedAccountName(maskAccountName);
     //IW-3874 starts Bharath 
      if(scope_WealthPresentationController.navPage === "frmWatchlist"){
        new kony.mvc.Navigation({"appName": "WealthOrderMA","friendlyName": "frmWatchlist"}).navigate();
      }else{
        if (kony.application.getCurrentForm() !== "frmPortfolioDetails") {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            navManager.setCustomInfo("frmPortfolioDetails", data);
           new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmPortfolioDetails"}).navigate();
        } else {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmPortfolioDetails', true);
            controller.bindNewGraphData(data);
        } // IW-3874 ends Bharath 
      }
    };
    /**
     *
     **/
    WealthOrder_PresentationController.prototype.getPortfolioDetailsErrorCallback = function() {

    };
  
   /**
     * This method is used to handle the backward navigation including state management
     */
    WealthOrder_PresentationController.prototype.commonFunctionForgoBack = function() {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm();
        // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
        if (scope_WealthPresentationController.stateNavigation && scope_WealthPresentationController.stateTriggeredForm !== currentForm.id) {
            navManager.navigateTo(scope_WealthPresentationController.stateTriggeredForm, true);
            scope_WealthPresentationController.stateNavigation = false;
            scope_WealthPresentationController.stateTriggeredForm = "";
        }
        // This is triggered when the forms entry into navigation manager's stack is equal to one .
        else {
            navManager.goBack();
        }
    };
  
  WealthOrder_PresentationController.prototype.getOrdersDetails = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthManager = applicationManager.getWealthOrderManager();
        wealthManager.getOrdersDetails(params, this.getOrdersDetailsSuccess.bind(this), this.getOrdersDetailsError.bind(this));
    };
   WealthOrder_PresentationController.prototype.getOrdersDetailsSuccess = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var data = {};
        data.response = response;
        navManager.setCustomInfo("frmOrder", data);
//         var controller = applicationManager.getPresentationUtility().getController('frmOrders', true);
//         if (scope_WealthPresentationController.isDateRange === true){
//              scope_WealthPresentationController.commonFunctionForNavigation("frmOrders");
//              controller.setHistorySeg(data);
//          }
//          else{
//           if (scope_WealthPresentationController.isHistory === true) {
//             controller.setHistorySeg(data);
//         } else {
//             controller.formSegmentData(data);
//         }
//          }
    };
    WealthOrder_PresentationController.prototype.getOrdersDetailsError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
  
   WealthOrder_PresentationController.prototype.commonFunctionForNavigation = function(formName) {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = kony.application.getCurrentForm();
        // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
        if (scope_WealthPresentationController.stateNavigation && scope_WealthPresentationController.stateTriggeredForm !== currentForm.id) {
            navManager.navigateTo(scope_WealthPresentationController.stateTriggeredForm, true);
            scope_WealthPresentationController.stateNavigation = false;
            scope_WealthPresentationController.stateTriggeredForm = "";
        }
        // If state management is triggered and if it is on the state triggered form then we will navigate to specified form and ignoring it's entry into the navigation stack as the form is being re-visited
        else if (scope_WealthPresentationController.stateNavigation) {
            navManager.navigateTo(formName, true);
        }
        // This is triggered when the forms are being visited for the first time.
        else {
            navManager.navigateTo(formName);
        }
    };

   WealthOrder_PresentationController.prototype.setVerifyFlow = function(params) {
        this.editFlow = params;
    };
WealthOrder_PresentationController.prototype.getVerifyFlow = function(params) {
        return false;
    };
  
    WealthOrder_PresentationController.prototype.clearWealthData = function() {
        var wealth = applicationManager.getWealthOrderManager();
        var obj = wealth.clearWealthObject();
        return obj;
    };
  
  WealthOrder_PresentationController.prototype.getFavoriteInstruments = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var wealthManager = applicationManager.getWealthOrderManager();
    wealthManager.getFavoriteInstruments(params, this.getFavoriteInstrumentsSuccess.bind(this), this.getFavoriteInstrumentsError.bind(this));
  };

  WealthOrder_PresentationController.prototype.getFavoriteInstrumentsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
    controller.setStarValue(response.favoriteInstruments);

  };
  WealthOrder_PresentationController.prototype.getFavoriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };
//   WealthOrder_PresentationController.prototype.setMaskedAccountName = function(params) {
//         this.AccountName = params;
//     };
//    WealthOrder_PresentationController.prototype.getMaskedAccountName = function() {
//         return this.AccountName;
//     };
  WealthOrder_PresentationController.prototype.createMarketOrder = function(param) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthmanager = applicationManager.getWealthOrderManager();
        var customerId = "";
        var userMan = applicationManager.getUserPreferencesManager();
        if (userMan.backendIdentifier && userMan.backendIdentifier  !== "") {
            customerId = userMan.backendIdentifier;
        } else if(userMan.primaryCustomerId.id && userMan.primaryCustomerId.id !== "") {
            customerId = userMan.primaryCustomerId.id;
        } else {
            customerId = userMan.accessibleCustomerIds[0].id;
        }

        param.coreCustomerId = customerId?customerId :"";
        param.bankDate =  scope_WealthPresentationController.bankdate?scope_WealthPresentationController.bankdate:"";
        wealthmanager.createMarketOrder(param, this.createMarketOrderSuccess, this.createMarketOrderFailure);
    }
    WealthOrder_PresentationController.prototype.createMarketOrderSuccess = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        scope_WealthOrderPresentationController.marketOrder = response;
        var controller = applicationManager.getPresentationUtility().getController('frmInstrumentOrder', true);
      response.currentForm= kony.application.getCurrentForm().id;
      var navManager = applicationManager.getNavigationManager();
          if (kony.application.getCurrentForm().id !== "frmInstrumentOrder") {
           navManager.navigateTo("frmInstrumentOrderAck"); 
         }
        controller.bindGenericError(response);
    };
    WealthOrder_PresentationController.prototype.createMarketOrderFailure = function(error) {
         if (error["isServerUnreachable"]) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err);
        } else {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            var controller = applicationManager.getPresentationUtility().getController('frmInstrumentOrder', true);
            controller.bindGenericError(error);
        }
    };
  
  //view transactions
   WealthOrder_PresentationController.prototype.getViewTransactions = function(param) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthmanager = applicationManager.getWealthOrderManager();
        wealthmanager.getInstrumentTransactions(param, this.getViewTransactionsSuccess, this.getViewTransactionsFailure);
    }
    WealthOrder_PresentationController.prototype.getViewTransactionsSuccess = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmInstrumentTransactions', true);
        controller.onInstrumentTransactionSuccess(response);
    };
  WealthOrder_PresentationController.prototype.getViewTransactionsFailure = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var controller = applicationManager.getPresentationUtility().getController('frmInstrumentTransactions', true);
    controller.onInstrumentTransactionFailure(error);
  };
  
    WealthOrder_PresentationController.prototype.getWealthObject = function() {
        var wealth = applicationManager.getWealthOrderManager();
        var obj = wealth.getWealthObject();
        return obj;
    };
  
   WealthOrder_PresentationController.prototype.getInstrumentDetails = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthManager = applicationManager.getWealthOrderManager();
        wealthManager.getInstrumentDetailsById(params, this.getInstrumentDetailsSuccess.bind(this), this.getInstrumentDetailsError.bind(this));
    };

  WealthOrder_PresentationController.prototype.getInstrumentDetailsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmInstrumentDetails");
    if (kony.sdk.isNullOrUndefined(data)) {
      data = {};
      data.instrumentDetails = response;
    } else {
      data.instrumentDetails = response;
    }
    navManager.setCustomInfo('frmInstrumentDetails', data);
    var frmHoldings = navManager.getCustomInfo("frmHoldings");
    var frmWatchlist = navManager.getCustomInfo("frmWatchlist");
    if ((kony.application.getCurrentForm().id === "frmHoldings" && frmHoldings.selHoldings !== 'view') || (kony.application.getCurrentForm().id === "frmWatchlist" && frmWatchlist.selWatchlist !== 'view')) {
      var Data = {};
      if (frmHoldings && frmHoldings.selHoldings === 'buy' || frmWatchlist && frmWatchlist.selWatchlist === 'buy')
        Data.buy = true;
      else
        Data.buy = false;


      navManager.setCustomInfo("frmPlaceOrder", Data);
      navManager.navigateTo('frmPlaceOrder');


    } 
    else if (kony.application.getCurrentForm().id === "frmOrders"){
     // navManager.navigateTo('frmInstrumentOrder');
      
       new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmInstrumentOrder"}).navigate();
    }
    else {
      if (kony.application.getCurrentForm().id !== "frmInstrumentDetails") {
        // scope_WealthPresentationController.commonFunctionForNavigation('frmInstrumentDetails');
        var filter = '1D';
        /*   if(scope_WealthPresentationController.instrumentChartFilter===""){
                     filter='1D';

                   }else{
                     filter=scope_WealthPresentationController.instrumentChartFilter;
                   }*/
        var ricCode,ISINCode,instrumentId = "";
        if(response.instrumentMinimal[0])
          {
            ricCode = response.instrumentMinimal[0].RICCode;
            ISINCode= response.instrumentMinimal[0].ISINCode;
            instrumentId= response.instrumentMinimal[0].instrumentId;
          }
         else
           {
             ricCode = response.instrumentMinimal.RICCode;
             ISINCode= response.instrumentMinimal.ISINCode;
            instrumentId= response.instrumentMinimal.instrumentId;
           }
          
        
         
        
        scope_WealthPresentationController.getHistoricalInstrumentData(ricCode, filter,ISINCode,instrumentId);
      }

      if (kony.application.getCurrentForm().id === "frmInstrumentDetails") {
        var controller = applicationManager.getPresentationUtility().getController('frmInstrumentDetails', true);
        controller.setDataOnRefresh();
      }
    }


  };
  WealthOrder_PresentationController.prototype.getInstrumentDetailsError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
   };
  
   WealthOrder_PresentationController.prototype.getHoldings = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthManager = applicationManager.getWealthOrderManager();
        wealthManager.getHoldingList(params, this.getHoldingsSuccess.bind(this), this.getHoldingsError.bind(this));
    };
  WealthOrder_PresentationController.prototype.getHoldingsSuccess = function(response) {
   
    var navManager = applicationManager.getNavigationManager();
    var data = {};
    var param = {};
    data.response = response;
    navManager.setCustomInfo("frmHoldings", data);
    if (kony.application.getCurrentForm().id === "frmInvestmentAcc") {
       applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_WealthPresentationController.getInvestmentData(data);
      param = {
        "portfolioId": scope_WealthOrderPresentationController.onSelectPortfolioId
      };
      scope_WealthPresentationController.getAssetsAllocation(param);
      
    }  
    else if ((kony.application.getCurrentForm().id === "frmInstrumentSearch") || (kony.application.getCurrentForm().id === "frmWatchlist")) {

      let dataTemp = navManager.getCustomInfo("frmInstrumentDetails");
      if (!dataTemp)
        dataTemp = {};
      if ((response.portfolioHoldings).length>0){

        dataTemp.response = response.portfolioHoldings[0];
        param = {
          "ISINCode": response.portfolioHoldings[0].ISIN?response.portfolioHoldings[0].ISIN:"",
          "RICCode": response.portfolioHoldings[0].RICCode?response.portfolioHoldings[0].RICCode:"",
          "instrumentId": response.portfolioHoldings[0].holdingsId?response.portfolioHoldings[0].holdingsId:""
        };
      } else {
        dataTemp = {};
        dataTemp.response={};
        param = {};
        if( (kony.application.getCurrentForm().id === "frmWatchlist")){
          var data1= applicationManager.getNavigationManager().getCustomInfo("frmInstrumentDetails");
          dataTemp.response.RICCode = data1.response.RIC;
          param = {
            "ISINCode": data1.response.ISINCode,
            "RICCode": data1.response.RIC,
            "instrumentId": data1.response.instrumentId
          };
        }
        else{
        dataTemp.response.RICCode = scope_WealthPresentationController.getRICCode();
        param = {
          "ISINCode": scope_WealthPresentationController.getISINCode(),
          "RICCode": scope_WealthPresentationController.getRICCode(),
          "instrumentId": scope_WealthPresentationController.getInstrumentId()
        };
      }
      }
      navManager.setCustomInfo('frmInstrumentDetails', dataTemp);
      
    //   var controller = applicationManager.getPresentationUtility().getController('frmInstrumentDetails', true);
    //    controller.setCurrentPosition(dataTemp);
      
      scope_WealthPresentationController.getInstrumentDetails(param);
    }else if (kony.application.getCurrentForm().id === "frmInstrumentOrder") {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      data.response = response;
       if ((response.portfolioHoldings).length > 0) { // WIW-1773 fix
        scope_WealthPresentationController.depositoryId = response.portfolioHoldings[0].depositoryId ? response.portfolioHoldings[0].depositoryId : "";
       }
      var controller = applicationManager.getPresentationUtility().getController('frmInstrumentOrder', true);
      controller.setSellQuantity(data);
    }else if(kony.application.getPreviousForm().id === "frmInvestmentAcc"){ //IW-3229 -- START---BHARATH
      new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmPlaceOrder"}).navigate();
    }//IW-3229 -- END --BHARATH
	else {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      
      new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmHoldings"}).navigate();
    }
  };
    WealthOrder_PresentationController.prototype.getHoldingsError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
  
  WealthOrder_PresentationController.prototype.getDownloadList = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthManager = applicationManager.getWealthOrderManager();
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.getBaseCurrency() === 'EUR'){
      params.isEuro= true;
    }
        wealthManager.downloadList(params, this.getDownloadListSuccess.bind(this), this.getDownloadListError.bind(this));
    };
    WealthOrder_PresentationController.prototype.getDownloadListSuccess = function(obj) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var data = {};
        var marketData = {};
        data = obj;
      var d = new Date();
      let Timestanp= d.getTime();
      var base64Val=data.base64;
    
      var filename=(scope_WealthPresentationController.downloadParams.navPage).replace(' ', '-');
     
       var controller='';
      if(scope_WealthPresentationController.downloadParams.navPage==='Holdings')
        {
            controller= applicationManager.getPresentationUtility().getController('frmHoldings', true);
            controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
        }
      else if(scope_WealthPresentationController.downloadParams.navPage==='Transactions')
        {
           controller = applicationManager.getPresentationUtility().getController('frmTransactions', true);
            controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
        }
      else if(scope_WealthPresentationController.downloadParams.navPage==='InstrumentTransactions')
        {
           controller = applicationManager.getPresentationUtility().getController('frmInstrumentTransactions', true);
            controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
        }
		else if(scope_WealthPresentationController.downloadParams.navPage==='Open Order' || scope_WealthPresentationController.downloadParams.navPage==='History Order')
        {
           controller = applicationManager.getPresentationUtility().getController('frmOrders', true);
            controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
        }
        else if(scope_WealthPresentationController.downloadParams.navPage==='Watchlist' )
        {
           controller = applicationManager.getPresentationUtility().getController('frmWatchlist', true);
            controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
        }
		else if(scope_WealthPresentationController.downloadParams.navPage==='Accounts Activity' )
        {
           controller = applicationManager.getPresentationUtility().getController('frmAccounts', true);
            controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
        }
      else
        {
           controller = applicationManager.getPresentationUtility().getController('frmReport', true);
            controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
        }
       

    };
    WealthOrder_PresentationController.prototype.getDownloadListError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
  
  WealthOrder_PresentationController.prototype.getWatchDownloadList = function(params) {
applicationManager.getPresentationUtility().showLoadingScreen();
var wealthManager = applicationManager.getWealthOrderManager();
var configManager = applicationManager.getConfigurationManager();
if(configManager.getBaseCurrency() === 'EUR'){
params.isEuro= true;
}
wealthManager.watchdownloadList(params, this.getWatchDownloadListSuccess.bind(this), this.getWatchDownloadListError.bind(this));
};
WealthOrder_PresentationController.prototype.getWatchDownloadListSuccess = function(obj) {
applicationManager.getPresentationUtility().dismissLoadingScreen();
var data = {};
var marketData = {};
data = obj;
var d = new Date();
let Timestanp= d.getTime();
var base64Val=data.base64;

var filename=(scope_WealthPresentationController.downloadParams.navPage).replace(' ', '-');

var controller='';
if(scope_WealthPresentationController.downloadParams.navPage==='Holdings')
{
controller= applicationManager.getPresentationUtility().getController('frmHoldings', true);
controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
}
else if(scope_WealthPresentationController.downloadParams.navPage==='Transactions')
{
controller = applicationManager.getPresentationUtility().getController('frmTransactions', true);
controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
}
else if(scope_WealthPresentationController.downloadParams.navPage==='InstrumentTransactions')
{
controller = applicationManager.getPresentationUtility().getController('frmInstrumentTransactions', true);
controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
}
else if(scope_WealthPresentationController.downloadParams.navPage==='Open Order' || scope_WealthPresentationController.downloadParams.navPage==='History Order')
{
controller = applicationManager.getPresentationUtility().getController('frmOrders', true);
controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
}
else if(scope_WealthPresentationController.downloadParams.navPage==='Watchlist' )
{
controller = applicationManager.getPresentationUtility().getController('frmWatchlist', true);
controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
}
else if(scope_WealthPresentationController.downloadParams.navPage==='Accounts Activity' )
{
controller = applicationManager.getPresentationUtility().getController('frmAccounts', true);
controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
}
else
{
controller = applicationManager.getPresentationUtility().getController('frmReport', true);
controller.onClickDownloadMessage(base64Val,filename+Timestanp+".pdf");
}



};
WealthOrder_PresentationController.prototype.getWatchDownloadListError = function(err) {
applicationManager.getPresentationUtility().dismissLoadingScreen();
};

 WealthOrder_PresentationController.prototype.instantiateWealthObject = function() {
        var wealthManager = applicationManager.getWealthOrderManager();
wealthManager.clearWealthObject();
 };

   WealthOrder_PresentationController.prototype.setSellCurrency = function(data) {
        var wealth = applicationManager.getWealthOrderManager();

        wealth.setWealthAttribute("sellCurrency", data);

    };
  
    WealthOrder_PresentationController.prototype.setBuyCurrency = function(data) {
        var wealth = applicationManager.getWealthOrderManager();

        wealth.setWealthAttribute("buyCurrency", data);

    };
  
  /**
     * This method is used to get market Rates
     */
    WealthOrder_PresentationController.prototype.getCurrencyRate = function(param) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthmanager = applicationManager.getWealthOrderManager();
        wealthmanager.getCurrencyRate(param, this.getCurrencyRateSuccess, this.getCurrencyRateFailure);
    };
    WealthOrder_PresentationController.prototype.getCurrencyRateSuccess = function(response) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
       var navManager = applicationManager.getNavigationManager();
       
        scope_WealthPresentationController.currencyRate = response;
        var editFlow = scope_WealthOrderPresentationController.getVerifyFlow();
        if (kony.application.getCurrentForm().id !== "frmConvertCurrency" && editFlow === false) {
           // scope_WealthPresentationController.commonFunctionForNavigation('frmConvertCurrency');
          navManager.navigateTo('frmConvertCurrency');
        }
        if (kony.application.getCurrentForm().id === "frmConvertCurrency") {
            var controller = applicationManager.getPresentationUtility().getController('frmConvertCurrency', true);
            controller.setCurrencyData(scope_WealthPresentationController.currencyRate);
        }
        if ((kony.application.getCurrentForm().id === "frmSelectCurrency" || kony.application.getCurrentForm().id === "frmToCurrency") && editFlow === true) {
          //  scope_WealthPresentationController.commonFunctionForNavigation('frmConvertCurrencyVerify');
          navManager.navigateTo('frmConvertCurrencyVerify');
        }
    };
    WealthOrder_PresentationController.prototype.getCurrencyRateFailure = function(error) {};
  
    WealthOrder_PresentationController.prototype.setCurrencyData = function(data) {
        var wealth = applicationManager.getWealthOrderManager();
        // wealth.setWealthAttribute("buyCurrency", data.buyCurrency);
        //  wealth.setWealthAttribute("sellCurrency", data.sellCurrency);
        wealth.setWealthAttribute("buyAmount", data.buyAmount);
        wealth.setWealthAttribute("sellAmount", data.sellAmount);
    };
  
  WealthOrder_PresentationController.prototype.getCurrencyList = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var wealthManager = applicationManager.getWealthOrderManager();
        wealthManager.getCurrencyList(this.getCurrencyListSuccess.bind(this), this.getCurrencyListError.bind(this));
    };
    WealthOrder_PresentationController.prototype.getCurrencyListSuccess = function(response) {
        var navMan = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().dismissLoadingScreen();

        var currencyData = navMan.getCustomInfo("frmSelectCurrency");
        if (kony.sdk.isNullOrUndefined(currencyData)) {
            var currencyData = {};
            currencyData.additionalCurrency = response.AddCurrency;
        } else {
            currencyData.additionalCurrency = response.AddCurrency;
        }

        navMan.setCustomInfo("frmSelectCurrency", currencyData);
      navMan.navigateTo('frmToCurrency');
     //   scope_WealthPresentationController.commonFunctionForNavigation('frmToCurrency');

    };
    WealthOrder_PresentationController.prototype.getCurrencyListError = function(err) {

      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo('frmToCurrency');     
       navMan.navigateTo('frmToCurrency');
    };
  
    return WealthOrder_PresentationController;
});