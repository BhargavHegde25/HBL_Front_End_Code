define(['CommonUtilities'], function(CommonUtilities) {
  return {
    //segmentRowDataId : [],
    sortByCustomData: "",
    segResponse: {},
    totalValue: "",
    selectedRicCode: "",
    selectedISINCode: "",
    selectedWatchlistId: "",
    accountData: "",
    cashAcc: {},
    investmentAcc: "",
    
    onNavigate: function()
    {
      try{
      //this.view.preShow= this.preShow;
      this.view.postShow= this.postShow;
         }catch(err) {
        this.setError(err, "onNavigate");
      }
    },
    
    init: function() {
      try{
      this.view.preShow = this.preShow;
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
      this.initActions();
         }catch(err) {
        this.setError(err, "init");
      }
    },
    
    postShow: function(){
      try{
      this.view.flxScroll.setEnabled(true);
      this.view.flxScroll.enableScrolling = true;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
     		 this.view.flxHeader.setEnabled(true);
        }
         }catch(err) {
        this.setError(err, "postShow");
      }
    },
    
    preShow: function() {
      try{
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.setVisibility(false);
    } else {
      this.view.flxHeader.setVisibility(true);
    }
      scope_WealthPresentationController.depositoryId = "";
      scope_WealthPresentationController.searchInstrumentForm= "frmWatchlist";
      var wealthModule = applicationManager.getModulesPresentationController({
                            "moduleName": "WealthPortfolioUIModule",
                            "appName": "PortfolioManagementMA"
                        });
      if(!scope_WealthPresentationController.isWatchlistExecuted){
        wealthModule.getWatchlist();
        return;
      }
      
     var data1 = applicationManager.getNavigationManager().getCustomInfo('frmWatchlistsegParam');
      if(data1){
        this.onClickViewInstrument(data1);
      }
      
      scope_WealthPresentationController.isWatchlistExecuted = false;
      this.view.flxAdditionalOptions.setVisibility(false);
      this.view.customHeader.flxBack.setEnabled(true);  //Defect - 3774
      this.view.flxConfirmationPopUp.setVisibility(false);
      var navManager = applicationManager.getNavigationManager();
      this.sortByCustomData = navManager.getCustomInfo("frmSortBy");
      scope_WealthPresentationController.portfolioId=scope_WealthPresentationController.watchlistPortfolioId;
      scope_WealthPresentationController.portfolioIdUpdate = scope_WealthPresentationController.watchlistPortfolioId;
      var params = {
        "portfolioId": scope_WealthPresentationController.watchlistPortfolioId,
        "navPage": "Watchlist",
        "sortBy": (scope_WealthPresentationController.sortByValueWatchlist === "")?"instrumentName":scope_WealthPresentationController.sortByValueWatchlist,
        "searchByInstrumentName": " ",
		"type": "Watchlist",
        "downloadFormat":"pdf"
      };
      this.view.segmentDetailsWealth.setContext(params);
      this.view.segmentDetailsWealth.requestParam.portfolioId = scope_WealthPresentationController.watchlistPortfolioId;
      var data = {};
      navManager.setCustomInfo("frmInstrumentDetails", data); 
      
      //Defect - 3774 Vivek
    /*  if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.customHeader.lblLocateUs.left = "45%";
        this.view.flxScroll.top = "55dp";
      } else {
        this.view.customHeader.lblLocateUs.left = "15%";
      }*/
      //Defect - 3774
      this.view.flxAdditionalOptions.setVisibility(false);
      this.view.flxAdditionalOptions.isVisible = false;  
      this.view.customHeader.flxBack.setEnabled(true);   //Defect - 3774
      this.view.segmentDetailsWealth.onMoveToCashAccounts = this.cashAccounts; 
      
      this.accountData = wealthModule.getWatchlistAccountsList(); 
      var investmentAccList = this.accountData.response.PortfolioList.portfolioList;
        for(var i=0;i<investmentAccList.length;i++) {
          if(investmentAccList[i].investmentType !== "Advisory") {
            scope_WealthPresentationController.watchlistAccountName = CommonUtilities.truncateStringWithGivenLength(investmentAccList[i].accountName + "....", 26) + CommonUtilities.getLastFourDigit(investmentAccList[i].accountNumber);
            scope_WealthPresentationController.watchlistPortfolioId = investmentAccList[i].accountNumber;
            scope_WealthPresentationController.refCurrencyId = investmentAccList[i].referenceCurrency;
          }
        }
      this.getAssetsAllocation();
      this.checkPermission("Watchlist");
         }catch(err) {
        this.setError(err, "preShow");
      }
    },
    cashAccounts: function() {
      try{
      var navManager = applicationManager.getNavigationManager();
      var data = {};
      var investmentAccList = this.accountData.response.PortfolioList.portfolioList;
      scope_WealthPresentationController.watchlistCashAccountsList.response = investmentAccList;
      scope_WealthPresentationController.watchlistCashAccountsList.accountName = scope_WealthPresentationController.watchlistAccountName || CommonUtilities.truncateStringWithGivenLength(investmentAccList[0].accountName + "....", 26) + CommonUtilities.getLastFourDigit(investmentAccList[0].accountNumber);
      navManager.navigateTo("frmCashAccounts");
         }catch(err) {
        this.setError(err, "cashAccounts");
      }
    },
    getAssetsAllocation: function() {
      try{
      var inputParams = {
        "portfolioId": scope_WealthPresentationController.watchlistPortfolioId,
      };
      var wealthModule = applicationManager.getModulesPresentationController({
                            "moduleName": "WealthPortfolioUIModule",
                            "appName": "PortfolioManagementMA"
                        });
      wealthModule.getAssetsAllocation(inputParams);
         }catch(err) {
        this.setError(err, "getAssetsAllocation");
      }
    },
    dummyFunc: function(param, dets) {
      try{
      var navManager = applicationManager.getNavigationManager(); //ADP-6682
      
      var data = {};
      var watchlist = dets.rowdetails;
      
      // ADP-6682(MB) - Set Alert Price
      let selectedIndex=0;
      let instrmntList = scope_WealthPresentationController.instruList;
      
      
      if(instrmntList[dets.rowdetails.ISINCode]) {
        this.view.lblSetModifyAlert.text = kony.i18n.getLocalizedString("i18n.wealth.watchlist.editAlertPrice");
      } else {
         this.view.lblSetModifyAlert.text = kony.i18n.getLocalizedString("i18n.wealth.setAlertPrice");
      }
      
	  // ADP-6682(MB) - Set Alert Price
      watchlist.totalValue = dets.totalValue;
      data.response = watchlist;
      this.instruName=watchlist.instrumentName;
      this.selectedRicCode = watchlist.RIC;
      this.selectedISINCode = watchlist.ISINCode;
      this.selectedWatchlistId = watchlist.instrumentId;
      scope_WealthPresentationController.applicationId = watchlist.application;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmInstrumentDetails", data);
      this.setUpActionSheet("Watchlist");
      this.checkPermission("Watchlist");
      //if(watchlist.isSecurityAsset===false){
      if((data.response.hasOwnProperty("application")) && (data.response.application !=="") && (data.response.application === "SC") && scope_WealthPresentationController.isInvestmentAccount === true && this.view.flxAccounts.isVisible && this.view.flxReport.isVisible){
        this.view.flxAccounts.isVisible=true;
        this.view.flxReport.isVisible=true; 
      }else{
        this.view.flxAccounts.isVisible=false;
        this.view.flxReport.isVisible=false;   
      } 
         }catch(err) {
        this.setError(err, "dummyFunc");
      }
    },
    initActions: function() {
      try{
      var self = this;
      this.view.segmentDetailsWealth.onActionButtonClicked = this.dummyFunc;
      this.view.segmentDetailsWealth.onRequestStart = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
      };
      this.view.segmentDetailsWealth.onRequestEnd = function() {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      };
      this.view.flxMore.onTouchEnd = self.onClickMoreOptions;
      this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
	  this.view.segmentDetailsWealth.onRowClickEvent = this.onWatchListSelect;
      //this.view.flxMore.onTouchEnd = this.navigate;
      this.view.segmentDetailsWealth.hideHeaderWatch = this.hideHeadBox;
       }catch(err) {
        this.setError(err, "initActions");
      }
    },
    
    
     hideHeadBox: function(){
       try{
        //this.view.flxHeader.setVisibility(false); 
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmAddRemoveSearch");
          }catch(err) {
        this.setError(err, "hideHeadBox");
      }
     },
     
    navigate: function(){
      try{
      var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmAddRemoveSearch");
         }catch(err) {
        this.setError(err, "navigate");
      }
    },
    
	onWatchListSelect: function(){

    },
    onClickMoreOptions: function() {
      try{
      this.checkPermission("MoreOptions");
      this.setUpActionSheet("MoreOptions");
         }catch(err) {
        this.setError(err, "onClickMoreOptions");
      }
    },
    setUpActionSheet: function(triggerPoint) {   
      try{
      if (triggerPoint === "Watchlist") {
        this.view.flxAccounts.isVisible = true;
        this.view.flxDelete.isVisible = true;
        this.view.lblPerformance.text = kony.i18n.getLocalizedString("i18n.wealth.view");
        this.view.lblAccounts.text = kony.i18n.getLocalizedString("i18n.wealth.buy");
        this.view.lblReport.text = kony.i18n.getLocalizedString("i18n.wealth.sell");
        this.view.lblDelete.text = kony.i18n.getLocalizedString("kony.mb.common.Delete");
        var navManager = applicationManager.getNavigationManager();
        var testData = navManager.getCustomInfo("frmUnifiedDashboard");
        this.investmentAcc = testData.response.PortfolioList.portfolioList;
        if(testData.response.hasOwnProperty('isMockIntegration'))
        {
          this.view.flxSetModifyAlert.isVisible = true;
          this.view.flxSetModifyAlert.onTouchEnd = this.navToSetAlert;
        }
        else
        {
          this.view.flxSetModifyAlert.isVisible = false;
        }
        this.view.flxPerformance.onTouchEnd = this.onClickView;
        this.view.flxAccounts.onTouchEnd = this.onClickBuy;
        this.view.flxReport.onTouchEnd = this.onClickSell;
        this.view.flxDelete.onTouchEnd = this.onClickDelete;
        this.view.flxYes.onTouchEnd = this.onClickDeleteYes;
        this.view.flxNo.onTouchEnd = this.onClickDeleteNo;
        this.view.flxCancelOption.onTouchEnd = this.onClickWatchlistCancel;
      } else {
        this.view.flxSetModifyAlert.isVisible = false;
        this.view.flxAccounts.isVisible = false;
        this.view.flxDelete.isVisible = false;
        this.view.lblPerformance.text = kony.i18n.getLocalizedString("i18n.wealth.download");
        this.view.lblReport.text = kony.i18n.getLocalizedString("i18n.wealth.sortBy");
        this.view.flxPerformance.onTouchEnd = this.onClickDownloadTxns;
        this.view.flxReport.onTouchEnd = this.onClickSortBy;
        this.view.flxCancelOption.onTouchEnd = this.onClickCancel;
      }
      this.view.flxScroll.setEnabled(true);
      this.view.flxScroll.enableScrolling = false;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
     		 this.view.flxHeader.setEnabled(true);
        }
      this.view.flxAdditionalOptions.isVisible = true;
      this.view.customHeader.flxBack.setEnabled(false);  //Defect - 3774
       }catch(err) {
        this.setError(err, "setUpActionSheet");
      }
    },
    checkPermission: function(triggerPoint){
      try{
      var configManager = applicationManager.getConfigurationManager();
      if (triggerPoint === "Watchlist") {
        let watchListViewPermission = false;
        let watchListBuyPermission = false;
        let watchListSellPermission = false;
        let watchListDeletePermission = false;
        var checkUserPermission = function (permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }; 
        
        var getPermissionDetails = JSON.parse(this.view.segmentDetailsWealth.getFeaturesAndPermissions());
        for(var i=0; i<this.investmentAcc.length; i++) {
        if(this.investmentAcc[i].investmentType !== "Advisory") {
        scope_WealthPresentationController.isInvestmentAccount = true;
        scope_WealthPresentationController.isAdvisory = false;
        }
      }
        if (typeof getPermissionDetails !== "undefined") {
          if (getPermissionDetails.view.length > 0) {
            watchListViewPermission =  configManager.watchlistViewInstrumentPermissions().some(checkUserPermission);
            this.view.flxPerformance.isVisible = watchListViewPermission;
          }
          if (getPermissionDetails.buy.length > 0) {
            watchListBuyPermission = configManager.buyOrderPermissions().some(checkUserPermission);
            this.view.flxAccounts.isVisible = watchListBuyPermission;
          }
          if (getPermissionDetails.sell.length > 0) {
            watchListSellPermission = configManager.sellOrderPermissions().some(checkUserPermission);
            this.view.flxReport.isVisible = watchListSellPermission;
          }
          if (getPermissionDetails.delete.length > 0) {
            watchListDeletePermission = configManager.addToWatchlistPermissions().some(checkUserPermission);
            this.view.flxDelete.isVisible = watchListDeletePermission;
          }
        }
        if (watchListSellPermission!==true && watchListBuyPermission!==true && watchListViewPermission!==true && watchListDeletePermission!==true && scope_WealthPresentationController.isInvestmentAccount!== true) {
          this.view.segmentDetailsWealth.setVisibleActionImage(false);
        }
        else {
          this.view.segmentDetailsWealth.setVisibleActionImage(true);
        }
      } else {
            this.view.flxReport.isVisible = true;
            this.view.flxPerformance.isVisible = true;
        }
         }catch(err) {
        this.setError(err, "checkPermission");
      }
    },
    
    navToSetAlert: function(){
      try{
     	var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo('frmSetPriceAlert'); 
         }catch(err) {
        this.setError(err, "navToSetAlert");
      }
    },
    onClickView: function() {
      try{
      scope_WealthPresentationController.instrumentDetailsEntry = true;
      this.callOnNavigateForView('view');
         }catch(err) {
        this.setError(err, "onClickView");
      }
    },
    onClickBuy: function() {
      try{
      this.callOnNavigate('buy');
         }catch(err) {
        this.setError(err, "onClickBuy");
      }
    },
    onClickSell: function() {
      try{
      this.callOnNavigate('sell');
         }catch(err) {
        this.setError(err, "onClickSell");
      }
    },
    onClickDelete: function() {
      try{
      this.view.flxConfirmationPopUp.isVisible = true;  
      this.view.flxAdditionalOptions.isVisible = false;
      this.view.customHeader.flxBack.setEnabled(true);  //Defect - 3774
         }catch(err) {
        this.setError(err, "onClickDelete");
      }
    },
    onClickDeleteNo: function() {
      try{
      this.view.flxConfirmationPopUp.isVisible = false;
         }catch(err) {
        this.setError(err, "onClickDeleteNo");
      }
    },
    onClickDeleteYes: function() {
      try{
      this.onClickDeleteInstrument();
         }catch(err) {
        this.setError(err, "onClickDeleteYes");
      }
    },
    onClickDeleteInstrument: function() {
      try{
      var ricId = this.selectedRicCode;
      var watchlistId = this.selectedWatchlistId;
      var param = {
        "RICCode":ricId,
        "instrumentId": watchlistId,
        "operation": "Remove",
		"application":scope_WealthPresentationController.applicationId
      };
      var wealthModule = applicationManager.getModulesPresentationController({
                            "moduleName": "WealthOrderUIModule",
                            "appName": "WealthOrderMA"
                        });
      wealthModule.updateFavouriteInstruments(param);
      
       new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmWatchlist"}).navigate();


    }catch(err) {
        this.setError(err, "onClickDeleteInstrument");
      }
   },
   
    
    onClickViewInstrument: function(data) {
     try{
     
    
      var param = {
       
        "RICCode":data.RICCode,
        "instrumentId": data.instrumentId,
        "operation": data.operation,
		"application":data.application
        
      };
    
      var wealthModule = applicationManager.getModulesPresentationController({
                            "moduleName": "WealthOrderUIModule",
                            "appName": "WealthOrderMA"
                        });
      wealthModule.updateFavouriteInstruments(param);
        }catch(err) {
        this.setError(err, "onClickViewInstrument");
      }
    },
    callOnNavigate: function(selectedWatchlist) {
      try{
      scope_WealthPresentationController.searchEntryPoint = false;
      scope_WealthPresentationController.isFrmWatchlist = true;
      applicationManager.getModulesPresentationController("WealthOrderUIModule");
      scope_WealthOrderPresentationController.navForm = "frmWatchlist";
      var navManager = applicationManager.getNavigationManager();
      var ricId = this.selectedRicCode;
      var isin = this.selectedISINCode;
      var watchlistId = this.selectedWatchlistId;
      
       var instrument= this.instruName;
      var param = {
        "ISINCode": isin,
        "RICCode":ricId,
        "instrumentId" : watchlistId,
        "searchByInstrumentName":instrument,
        "portfolioId":scope_WealthPresentationController.watchlistPortfolioId,
        "sortBy":"",
        "navPage":"Holdings",
        "isIncludeOrders":"false"
      };
      if(scope_WealthPresentationController.applicationId){
        param.application=scope_WealthPresentationController.applicationId;
      }
      var selData = {
        'selWatchlist': selectedWatchlist,
        // 'response': this.segResponse.response
      };
      navManager.setCustomInfo("frmWatchlist", selData);
      var wealthModule = applicationManager.getModulesPresentationController({
                            "moduleName": "WealthPortfolioUIModule",
                            "appName": "PortfolioManagementMA"
                        });
      wealthModule.getHoldings(param);
       }catch(err) {
        this.setError(err, "callOnNavigate");
      }
    },
    
        callOnNavigateForView: function(selectedWatchlist) {
          try{
      scope_WealthPresentationController.searchEntryPoint = false;
       scope_WealthPresentationController.isFrmWatchlist = true;
      applicationManager.getModulesPresentationController("WealthOrderUIModule");
      scope_WealthOrderPresentationController.navForm = "frmWatchlist";
      scope_WealthPresentationController.watchlistFlow=true;
      var navManager = applicationManager.getNavigationManager();
      var ricId = this.selectedRicCode;
      var isin = this.selectedISINCode;
      var watchlistId = this.selectedWatchlistId;
      var instrument= this.instruName;
      var param = {
        "ISINCode": isin,
        "RICCode":ricId,
        "instrumentId" : watchlistId,
        "searchByInstrumentName":instrument,
        "portfolioId":scope_WealthPresentationController.watchlistPortfolioId,
        "sortBy":"",
        "navPage":"Holdings"
      };
      var selData = {
        'selWatchlist': selectedWatchlist,
        // 'response': this.segResponse.response
      };
          if(scope_WealthPresentationController.applicationId){
        param.application=scope_WealthPresentationController.applicationId;
      }
      navManager.setCustomInfo("frmWatchlist", selData);
      var wealthModule = applicationManager.getModulesPresentationController({
                            "moduleName": "WealthPortfolioUIModule",
                            "appName": "PortfolioManagementMA"
                        });
      wealthModule.getHoldings(param);
             }catch(err) {
        this.setError(err, "callOnNavigateForView");
      }
    },
    
    onClickWatchlistCancel: function() {
      try{
      this.view.flxScroll.setEnabled(true);
      this.view.flxScroll.enableScrolling = true;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
     		 this.view.flxHeader.setEnabled(true);
        }
      this.view.flxAdditionalOptions.isVisible = false;
      this.view.customHeader.flxBack.setEnabled(true);  // Defect - 3774
         }catch(err) {
        this.setError(err, "onClickWatchlistCancel");
      }
    },
    onClickDownloadTxns: function() {
      try{
      scope_WealthPresentationController.downloadParams = this.view.segmentDetailsWealth.getCriteriaObjValue();
      scope_WealthPresentationController.downloadParams.navPage = "Watchlist";
      scope_WealthPresentationController.downloadParams.downloadFormat="pdf";
      scope_WealthPresentationController.downloadParams.portfolioId=scope_WealthPresentationController.watchlistPortfolioId;
      var wealthModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
      wealthModule.getWatchDownloadList(scope_WealthPresentationController.downloadParams);
      kony.print("test"+scope_WealthPresentationController.downloadParams);
    }catch(err) {
        this.setError(err, "onClickDownloadTxns");
      }
      },
    onClickDownloadMessage:function(base64String,filename) {
      try {  
        this.view.flxPopup.setVisibility(false);
        this.view.flxAdditionalOptions.isVisible = false;
        this.view.customHeader.flxBack.setEnabled(true);  //Defect-3774
        this.view.socialshare.shareWithBase64(base64String,filename);         
      }catch(error){
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    onClickCancel: function() {
      try{
      this.view.flxScroll.setEnabled(true);
      this.view.flxScroll.enableScrolling = true;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
     		 this.view.flxHeader.setEnabled(true);
        }
      this.view.flxAdditionalOptions.isVisible = false;
      this.view.customHeader.flxBack.setEnabled(true);  //Defect - 3774
         }catch(err) {
        this.setError(err, "onClickCancel");
      }
    },
    navigateCustomBack: function() {
      try{
      /*var wealthModule = applicationManager.getModulesPresentationController("WealthModule");
      wealthModule.commonFunctionForgoBack();*/
          new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "frmUnifiedDashboard"}).navigate();
     }catch(err) {
        this.setError(err, "navigateCustomBack");
      }
    },
    onClickSortBy: function() {
      try{
      var data = {};
      // data.searchText = this.view.tbxSearch.text;
      var navManager = applicationManager.getNavigationManager();
      if (scope_WealthPresentationController.sortByValueWatchlist === "") {
        data.sortByValue = "instrumentName";
        navManager.setCustomInfo("frmWatchlist", data);
      } else {
        data.sortByValue = scope_WealthPresentationController.sortByValueWatchlist;
        navManager.setCustomInfo("frmWatchlist", data);
      }
      new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmSortBy"}).navigate();
     }catch(err) {
        this.setError(err, "onClickSortBy");
      }
      },
    populateCashBalance: function(responseObj){   
      try{
      let forUtility = applicationManager.getFormatUtilManager();
      let cashAccFromResponse = responseObj.cashAccounts;
      this.cashAcc = [];
      var trimmedAccName = "";
      this.cashAcc = this.checkCashBalance(cashAccFromResponse);
      scope_WealthPresentationController.portfolioCashAccounts = this.cashAcc;
      var cashList;
      var cashData = [];
      for (var i in this.cashAcc) {
        cashList = {
          accountName: CommonUtilities.truncateStringWithGivenLength(this.cashAcc[i].accountName + "....", 26) + CommonUtilities.getLastFourDigit(this.cashAcc[i].accountNumber),
          cashBalance: forUtility.formatAmountandAppendCurrencySymbol(this.cashAcc[i].balance, this.cashAcc[i].currency),
          refCashBalance: forUtility.formatAmountandAppendCurrencySymbol(this.cashAcc[i].referenceCurrencyValue, responseObj.totalCashBalanceCurrency),
          refCurrency: this.cashAcc[i].currency,
          accountNumber: this.cashAcc[i].accountNumber
        };
        cashData.push(cashList);
      }
      scope_WealthPresentationController.totalCashBalance = responseObj.totalCashBalance;
      scope_WealthPresentationController.totalCashBalanceCurrency = responseObj.totalCashBalanceCurrency;
      var cashBalTotal = forUtility.formatAmountandAppendCurrencySymbol(responseObj.totalCashBalance, responseObj.totalCashBalanceCurrency);
      scope_WealthPresentationController.accountNumber = cashData[0].accountNumber;
      var navMan = applicationManager.getNavigationManager();
      var dataSet = {};
      dataSet.cashData = cashData;
      dataSet.response = cashData[0].refCurrency + "-" + cashData[0].accountName.slice(-4);
      dataSet.accountName = cashData[0].refCurrency + " " + cashData[0].accountName;
      navMan.setCustomInfo('frmCashAccounts', dataSet);
         }catch(err) {
        this.setError(err, "populateCashBalance");
      }
    },
    checkCashBalance: function(cashArr) {
      try{
      if (scope_WealthPresentationController.newAccountsArr.length > 0) {
        cashArr.push(...scope_WealthPresentationController.newAccountsArr);
      }
      if(scope_WealthPresentationController.balanceArr.length > 0){
        for(i in scope_WealthPresentationController.balanceArr){
          cashArr.forEach(function(e) {
            if (e.currency === scope_WealthPresentationController.balanceArr[i].currency) {
              e.balance = scope_WealthPresentationController.balanceArr[i].amount;
            }
          });
        }
      }
      return cashArr;
         }catch(err) {
        this.setError(err, "checkCashBalance");
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