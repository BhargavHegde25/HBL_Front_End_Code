/*eslint-disable*/
define(['CommonUtilities'], function(CommonUtilities) {
    return {
      portfolioData: '',
      xaxisArr: [],
      plotDataArr: [],
      chartConfig: '',
      cashAcc: [],
      marketValue: '',
      holdingsPermission: false,
      ordersPermission: false,
      txnPermission: false,
      barChartFailure:false,
        init: function() {
          try{
            var navManager = applicationManager.getNavigationManager();
            var currentForm = navManager.getCurrentForm();
            applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
          }catch(err) {
        this.setError(err, "init");
      }
          },
        preShow: function() {
          try{
           var configManager= applicationManager.getConfigurationManager();
          applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans = "";
          applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders = "";
          applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueAccounts = "";
          scope_WealthPresentationController.watchlistFlow = false; //IW-3874 BHARATH
          scope_WealthPresentationController.isFrmWatchlist = false;//IW-3874 BHARATH
          scope_WealthPresentationController.depositoryId = "";
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
            } else {
               this.view.flxHeader.isVisible = false;
              this.view.flxMainContainer.scrollToWidget(this.view.flxContainer);
             let portfolioDetailAccountViewPermission = configManager.getPortfolioAccountInfoViewPermissions().some(configManager.checkUserPermission.bind(configManager));
             
              var rightBarButtonItem = new kony.ui.BarButtonItem({
                                                 type: constants.BAR_BUTTON_IMAGE,
                                                 style: constants.BAR_ITEM_STYLE_PLAIN,
                                                 enabled: true,
                                                 action: portfolioDetailAccountViewPermission ? this.jointAcc :"",
                                                 tintColor: "ffffff",
                                                 metaData: {
                                                 image: portfolioDetailAccountViewPermission ? "info.png":""
                                                 }
                                                 });
             this.view.setRightBarButtonItems({items:[rightBarButtonItem],animated:true});
            }
			this.view.flxPortfolioLineChart.isVisible = false;
            this.checkPermissions();
            if(configManager.isMicroAppPresent("WealthOrderMA"))
			{
            this.view.flxSearch.setVisibility(true);
            this.view.btnConvertCurrency.setEnabled(true);
            }
			else{
                this.view.flxSearch.setVisibility(false);
              this.view.btnConvertCurrency.setEnabled(false);
            }
            this.initActions();
         let portfolioAssertPermission = configManager.getPortfolioAssetAllocationViewPermissions().some(configManager.checkUserPermission.bind(configManager));
          //let portfolioAssertPermission =configManager.checkUserPermission("PORTFOLIO_ASSET_ALLOCATION_VIEW");
          let portfoliocashPermission = configManager.getPortfolioCashBalanceViewPermissions().some(configManager.checkUserPermission.bind(configManager));
         // let portfoliocashPermission =configManager.checkUserPermission("PORTFOLIO_CASH_BALANCE_VIEW");
          
           // this.fetchAssetsAndCashData();
            var navManager = applicationManager.getNavigationManager();
          let portfolioDetailViewPermission = configManager.getPortfolioDetailViewPermissions().some(configManager.checkUserPermission.bind(configManager));
           //let portfolioDetailViewPermission =configManager.checkUserPermission("PORTFOLIO_DETAILS_VIEW");
          if(portfolioDetailViewPermission || portfolioAssertPermission || portfoliocashPermission)
            {
              var objArr = navManager.getCustomInfo("frmPortfolioDetails");
              var refcurrholdings = navManager.setCustomInfo("frmHoldingsRef",objArr);
              if(!objArr)
                {
					objArr=applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portdet;
                }
              this.portfolioData = objArr.response;
             // this.chartConfig = "1M";
              var graphDuration = this.portfolioData.graphDuration;
              this.chartConfig = graphDuration === "OneY"?"1Y":"YTD";
              navManager.setCustomInfo("frmChartConfig", this.chartConfig);
              this.changeGraphData(graphDuration, true);
              this.setDataToForm();
              this.view.investmentLineChart.currentFilter = this.chartConfig;
            }
            
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").navPage = "";
          // to be uncomented when propper users are in place
   	    this.view.flxPortfolioLineChart.isVisible=false;
		this.view.flxCashBtns.isVisible=true;
            this.view.btnTransferCash.setEnabled(true);
            this.view.btnConvertCurrency.setEnabled(true);
			
          if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isJointAccount == true){
            this.view.flxCashBtns.isVisible=false;
          }
          }catch(err) {
        this.setError(err, "preShow");
      }
        },
        setDataToForm: function() {
          try{
           applicationManager.getPresentationUtility().showLoadingScreen();
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
           if(custominfoCD.isMultiCustomer === "true"){
            this.view.customHeader.lblLocateUs.text = custominfoCD.selectedRow.customerName.text+" ("+ custominfoCD.selectedRow.customerId.text +")";
            this.view.title = custominfoCD.selectedRow.customerName.text+" ("+ custominfoCD.selectedRow.customerId.text +")";
           }else{
            //this.view.customHeader.lblLocateUs.text = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName+" ("+applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerID+")";
            //this.view.title = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerName+" ("+applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0].coreCustomerID+")";
            this.view.customHeader.lblLocateUs.text = "";
            this.view.title = "";
           }
            this.view.lblInvestmentAccount.text = wealthModule.getMaskedAccountName();
         // WIW-1485
            var val = this.portfolioData;
            val.displayName = this.view.lblInvestmentAccount.text;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmHealthCheckSummaryCard", val);
            var forUtility = applicationManager.getFormatUtilManager();
            this.view.investmentLineChart.currencySymbol = forUtility.getCurrencySymbol(val.referenceCurrency);
      var totalVal = forUtility.formatAmountandAppendCurrencySymbol(val.marketValue, val.referenceCurrency);
      this.view.lblTotalVal.text = totalVal;
      navManager.setCustomInfo("AllocationTotalValue", totalVal);
      this.marketValue = val.marketValue;
      var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
	  var isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
   //   var todaysPL = forUtility.formatAmountandAppendCurrencySymbol(val.todayPLAmount, val.referenceCurrency);
      if(val.unRealizedPLAmount !==undefined && val.unRealizedPLAmount!=='')
      {
        if (val.unRealizedPL == "P") {
            this.view.lblUnrealizedPLValue.skin = "sknIbl2f8523SSPsb45px";
            this.view.lblUnrealizedPLValue.text = (unrealizedPL != "" && val.unRealizedPLPercentage !== "") ? ("+" + unrealizedPL + "(+" + val.unRealizedPLPercentage + "%)") : ((unrealizedPL != "") ? ("+" + unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? ("(+" + val.unRealizedPLPercentage + "%)") : ""));
        } else {
            this.view.lblUnrealizedPLValue.skin = "sknIblEE0005SSPsb45px";
            if (val.unRealizedPLAmount.substr(0, 1) === '-') {
                this.view.lblUnrealizedPLValue.text = (unrealizedPL != "" && val.unRealizedPLPercentage !== "") ? ( unrealizedPL + "(" + val.unRealizedPLPercentage + "%)") : ((unrealizedPL != "") ? ( unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? ("(" + val.unRealizedPLPercentage + "%)") : ""));
            } else {
                this.view.lblUnrealizedPLValue.text = (unrealizedPL != "" && val.unRealizedPLPercentage !== "") ? ("-" + unrealizedPL + (val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") ) : ((unrealizedPL != "") ? ("-" + unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? (val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") : "")); //IW-4002
            }
        }
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails.unRealizedPLAmount = (val.unRealizedPLAmount).replace(/[+-]/g, '');
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails.unRealizedPL = val.unRealizedPL;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails.unRealizedPLPercentage = (val.unRealizedPLPercentage).replace(/[+-]/g, '');
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails.marketValue = val.marketValue;
    }
    if (val.todayPLAmount !== undefined && val.todayPLAmount !== '') {
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails.todayPLAmount=val.todayPLAmount;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails.todayPL=val.todayPL;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails.todayPLPercentage=val.todayPLPercentage;
      }
     
      if (val.performanceValue !== undefined && val.performanceValue !== '') {
          this.view.flxTodayPL.setVisibility(true);           
       this.view.lblTodayPL.text = isRTL?":("+val.performance+") "+kony.i18n.getLocalizedString("i18n.wealth.performance"): kony.i18n.getLocalizedString("i18n.wealth.performance")+" ("+val.performance+"):";     
          if(Number(val.performanceValue.slice(1,)) == 0){
            this.view.lblTodayPLValue.skin = "sknIbl2f8523SSPsb45px";
            this.view.lblTodayPLValue.text = "+"+val.performanceValue.slice(1,) + "%";
          }
          else if (val.performanceValue > 0) {
            this.view.lblTodayPLValue.skin = "sknIbl2f8523SSPsb45px";
            this.view.lblTodayPLValue.text = val.performanceValue + "%";
          } else {
            this.view.lblTodayPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblTodayPLValue.text = val.performanceValue + "%";
          }
        } else {
          this.view.flxTodayPL.setVisibility(false);
        }
          }catch(err) {
        this.setError(err, "setDataToForm");
      }
    },
    fetchAssetsAndCashData: function() {
      try{
      var inputParamsForAssetsAndCash = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getAssetsAllocation(inputParamsForAssetsAndCash);
      }catch(err) {
        this.setError(err, "fetchAssetsAndCashData");
      }
      },
    navigateToSearch: function() {
      try{
      /* var params = {
                "sortBy": "",
                "searchByInstrumentName": "",
                "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId
            }
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            wealthModule.getInstrumentSearchList(params, this.marketValue);*/
           applicationManager.getModulesPresentationController("WealthPortfolioUIModule").marketValue = this.marketValue;
           scope_WealthPresentationController.isfrmInstrumentSearch = true;//IW-3874 BHARATH
           var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmInstrumentSearch");
      }catch(err) {
        this.setError(err, "navigateToSearch");
      }

        },
        postShow: function() {
          try{
            //this.fetchAssetsAndCashData();
      if(scope_WealthPresentationController.isAdvisory) {
		this.view.flxSearch.setVisibility(false);
        this.view.flxContainer.height = "130Dp";
        let params = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
        "portfolioServiceType":"Advisory",
        "navPage":"Portfolio"
      }
        let orderpast = {
          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
          "sortBy": "instrumentName",
          "sortOrder": "desc",
          "searchByInstrumentName": "a",
          "pageSize": "10",
          "pageOffset": "0",
          "type": "",
          "pastProposalId": "",
          "portfolioServiceType": "Advisory",
          "funcResultCode": scope_WealthPresentationController.funcResultCode
        }
         let strategyParams = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
        "portfolioServiceType":"Advisory"
      }
        this.view.PortfolioHealthCheck.setContext(params);
        this.view.PortfolioStrategy.setStrategyParm(strategyParams, this.setAdvisoryCards, this.showHealthAndProposal);
        var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.getOrderProposal(orderpast);
        
      var portfolioId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;
       //pastProposal is called to get isNewProp
	  let pastPropsalParams = {
        "portfolioId": portfolioId,
        "type": "pastProposal",
        "portfolioServiceType": "Advisory",
        "contextId": scope_WealthPresentationController.contextId[portfolioId],
        "filter":"currentYear"
        }
       wealthModule.getPastProposal(pastPropsalParams);
      this.view.PortfolioHealthCheck.btnClick = function() {
         var navManager = applicationManager.getNavigationManager();
         navManager.navigateTo("frmHealthCheck"); 
      };
        this.view.PortfolioStrategy.firstUserClick = function() {
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("frmFirstUserBoolean", true);
          navManager.navigateTo("frmReviewSuitability");  
        };
         this.view.PortfolioStrategy.nonFirstUserClick = function() {
         var navManager = applicationManager.getNavigationManager();
         navManager.navigateTo("frmStrategyAllocation"); 
      };
        this.view.flxAdvisory.setVisibility(true);
        this.view.flxPortfolioHealth.setVisibility(true);
      }
      else {
		this.view.flxSearch.setVisibility(true);
        this.view.flxContainer.height = "180Dp";
        this.view.flxAdvisory.setVisibility(false);
        this.view.flxPortfolioHealth.setVisibility(false);
      }
        var scope = this;
        this.view.Asset.setAssetAllocationGraphVisibility = function(isVisible) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            scope.view.flxAssetBarChart.isVisible= isVisible; 
          //  scope.view.flxAssetsSummary.isVisible= !isVisible;
            scope.view.flxViewAll.isVisible = isVisible;
	    applicationManager.getPresentationUtility().dismissLoadingScreen();
          };
        this.view.flxMainContainer.enableScrolling = true;
        this.view.flxMainContainer.setEnabled(true);
        this.view.flxHeader.setEnabled(true);
      }catch(err) {
        this.setError(err, "postShow");
      }
        },

      // Callback function
      PastProposal : function(response){
        try{
         var navManager = applicationManager.getNavigationManager();
        var rejectProposal =  navManager.getCustomInfo('isProposalRejected');
        this.view.InvestmentProposal.setComponentUI(response, rejectProposal);
        } catch(err) {
        this.setError(err, "PastProposal");
      }
        },
      
      InvestmentProposal:function(response){
        try{
       // this.view.InvestmentProposal.setComponentUI(response);
        var navManager = applicationManager.getNavigationManager();
        var rejectProposal =  navManager.getCustomInfo('isProposalRejected');
       // this.view.investmentProposal.setData(response, rejectProposal);
       // navManager.setCustomInfo("isProposalRejected", undefined); 
        }catch(err) {
        this.setError(err, "InvestmentProposal");
      }
        },
      initActions: function() {
        try{
          this.view.flxAdditionalOptions.setVisibility(false);
           this.view.flxSearchDummy.onTouchEnd = this.navigateToSearch;
            this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
            this.view.flxHoldings.onTouchEnd = this.holdings;
            this.view.flxTransactions.onTouchEnd = this.transactions;
            this.view.flxOrders.onTouchEnd = this.openOrders;
            this.view.flxMore.onTouchEnd = this.moreOptions;
            this.view.flxCancelOption.onTouchEnd = this.onCancel;
            this.view.lblAccounts.onTouchEnd = this.accounts;
            this.view.flxPerformance.onTouchEnd = this.performance;
            this.view.flxReport.onTouchEnd = this.reports;
            this.view.flxInfo.onTouchEnd = this.jointAcc;       
            this.view.btnConvertCurrency.onClick = this.clickConvertCurrency;
        	this.view.flxViewAll.onClick = this.navigateToAsset;
            let filterValues = Object.keys(this.chartFilters).map(key => this.chartFilters[key]);
            this.view.investmentLineChart.setChartFilters(filterValues);
            this.view.flxCashSeparator.setVisibility(false);          
        }catch(err) {
        this.setError(err, "initActions");
      }
        },
        navigateToAsset: function(){
          try{
           var navManager = applicationManager.getNavigationManager();	
       navManager.navigateTo("frmAllocationCarousal");
          }catch(err) {
        this.setError(err, "navigateToAsset");
      }
        },
      
        calculatePercent: function(part, total) {
          try{
            var partAmount = Math.abs(Number(part));
            //var totalAmount = Number(total);
            //var percent = ((partAmount *100) / totalAmount);
            var percent = ((partAmount *100) / total);
            return percent.toFixed(2);
          }catch(err) {
        this.setError(err, "calculatePercent");
      }
        },
        setSkinBasedOnPercent: function(dataArr) {
          try{
            var skinVal = ["sknFlexslider2C82BE", "sknFlxslider53A8E2", "sknFlxslider24BFEC", "sknFlxslider76DDFB", "sknFlxsliderC7E0F1"];
            dataArr[0].flxSpent = {
                "skin": skinVal[0],
                "width": dataArr[0].assetPer.toString() + "%"
            };
            for (var i = 1; i <= dataArr.length - 1; i++) {
                if (dataArr[i].assetPer === dataArr[i - 1].assetPer) {
                    dataArr[i].flxSpent = {
                        "skin": skinVal[i - 1],
                        "width": dataArr[i].assetPer.toString() + "%"
                    };
                } else {
                    dataArr[i].flxSpent = {
                        "skin": skinVal[i],
                        "width": dataArr[i].assetPer.toString() + "%"
                    };
                }
            }
           applicationManager.getPresentationUtility().dismissLoadingScreen();
            return dataArr;
          }catch(err) {
        this.setError(err, "setSkinBasedOnPercent");
      }
        },
      openOrder: function() {
        try{
          var sortByValue = undefined; 
          var type = "open";
          var today = scope_WealthPresentationController.bankdate?new Date(scope_WealthPresentationController.bankdate):new Date();
          var data = {};
          data.response = sortByValue;
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("frmSortBy", data);
        navManager.setCustomInfo("frmPortfolioDetails", true);
          var orderId;
        if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").orderList.length === 0){
          orderId = null;
        }
        else{
          orderId = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").orderList.toString();
        }
        var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
        var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
        var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            var params = {
                "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                "orderId": orderId,
                "sortBy": "description",
                "type": type, 
                "startDate": "2018-12-06",
				"endDate": endDate,
                "searchByInstrumentName": ""
          }
        var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        var orderList = wealthModule.getOrdersDetails(params);
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isPortfolio = true;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isDateRange = false;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isFirst = true;
        wealthModule.commonFunctionForNavigation("frmOrder");
        }catch(err) {
        this.setError(err, "openOrder");
      }
        },
      openOrders: function() {
        try{
        var sortByValue = undefined; 
        var data = {};
		scope_WealthPresentationController.searchInstrumentForm="frmPortfolioDetails";
        data.response = sortByValue;
        var navManager = applicationManager.getNavigationManager();	
        navManager.setCustomInfo("frmPortfolioDetails", true);
        navManager.setCustomInfo("frmSortBy", data);
		applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isFrmWatchlist=false;
		applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders = "";
        navManager.navigateTo("frmOrders");
        }catch(err) {
        this.setError(err, "openOrders");
      }
      },
      populateAssets: function(assetObj) {
       try{
          var currForm = kony.application.getCurrentForm();
          var responseObj = assetObj.response;
          var configManager= applicationManager.getConfigurationManager();
          let portfolioDetailAssetAllocationPermission = configManager.getPortfolioAssetAllocationViewPermissions().some(configManager.checkUserPermission.bind(configManager));
          this.view.flxAssetsTab.isVisible=true;
        if(scope_WealthPresentationController.isTapIntegration  || scope_WealthPresentationController.isMockIntegration ){
          this.view.flxAssetBarChart.isVisible=true; 
          this.view.flxAssetsSummary.isVisible=false;
          this.view.flxViewAll.isVisible = true;
        }else{
          this.view.flxAssetBarChart.isVisible=false; 
          this.view.flxAssetsSummary.isVisible=true;
          this.view.segAssetSummary.isVisible=true;
          this.view.flxError.isVisible=false;
        this.view.flxViewAll.isVisible = false;
        }
        var navManager = applicationManager.getNavigationManager();
        for(let i in responseObj.assets)
        {
          if(responseObj.assets[i].assetGroup.toLowerCase() === "cash"){
            navManager.setCustomInfo("AllocationData",responseObj.assets[i] );
            break;
          }
        }
        //let portfolioDetailAssetAllocationPermission = configManager.checkUserPermission("PORTFOLIO_ASSET_ALLOCATION_VIEW");
        if(portfolioDetailAssetAllocationPermission)
        {
          var assets = responseObj.assets;
          //var assets=dataSet.assets;
          var assignedSkinsArr = [];
          var segData = [];
          var forUtility = applicationManager.getFormatUtilManager();
          //if(assets.length>0){
          //this.view.flxAssetsTab.isVisible=true;
          //this.view.flxAssetsSummary.isVisible=true;
          var total=0;
          for(var j = 0; j < assets.length; j++) {
            total+=  Math.abs(Number(assets[j].marketValue));
          }  
          for (var list in assets) {
            //var assetPercent = this.calculatePercent(assets[list].marketValue, responseObj.totalMarketValue);
            var assetPercent=this.calculatePercent(assets[list].marketValue, total);
            var marketValue = forUtility.formatAmountandAppendCurrencySymbol(assets[list].marketValue, responseObj.referenceCurrency);
            var storeData;
            if (assetPercent !== "0") {
              storeData = {
                assetClass: assets[list].assetGroup,
                assetPer: assetPercent,
                assetVal: assets[list].assetGroup + " (" + assetPercent.toString() + "%)",
                assetCost: marketValue,
                flxSpent: {
                  "skin": "",
                  "width": assetPercent.toString() + "%"
                }
              };
              segData.push(storeData);
            } else {
              continue;
            }
          }
          segData.sort(function(a, b) {
            return parseFloat(b.assetPer) - parseFloat(a.assetPer);
          });
          if(segData.length!==0){
            this.barChartFailure = false;
            assignedSkinsArr = this.setSkinBasedOnPercent(segData);
            this.view.segAssetSummary.widgetDataMap = {
              lblAssetDet: "assetVal",
              lblAssetCost: "assetCost",
              flxSpent: "flxSpent"
            };
            this.view.segAssetSummary.setData(assignedSkinsArr);
            }else{
            //  this.view.flxAssetsSummary.setVisibility(false);
              this.view.segAssetSummary.isVisible=false;
            this.view.flxError.isVisible=true;
			  this.barChartFailure = true;
              if(!(scope_WealthPresentationController.isTapIntegration  || scope_WealthPresentationController.isMockIntegration)){
             this.view.segAssetSummary.isVisible=false;
            this.view.flxError.isVisible=true;
              }
            }
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            let assetRequestParams = { "portfolioId": wealthModule.portfolioId};
            this.view.Asset.setData(assetRequestParams, this.onApiFailureCallback);
          }
        let portfolioDetailCashbalancePermission = configManager.getPortfolioCashBalanceViewPermissions().some(configManager.checkUserPermission.bind(configManager));
	    let portfolioDetailViewPermission = configManager.getPortfolioDetailViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        if(portfolioDetailCashbalancePermission)
          this.populateCashBalance(responseObj);
        if(portfolioDetailViewPermission)   
          this.bindNewGraphData(responseObj);
          
        /*else
          {
            this.view.Asset.noAssetsToDisplay();
          }*/
        currForm.forceLayout();
       }catch(err) {
        this.setError(err, "populateAssets");
      }
      },
      onApiFailureCallback: function() {
        try{
		if(this.barChartFailure){
          this.barChartFailure = false;
			this.view.flxAssetsSummary.isVisible=false;
			this.view.Asset.noAssetsToDisplay();
		}else{
            this.view.flxAssetsSummary.isVisible=true;
            this.view.segAssetSummary.isVisible=true;
            this.view.flxError.isVisible=false;
        this.view.flxAssetBarChart.isVisible=false;
		}
        this.view.flxViewAll.isVisible = false;
        }catch(err) {
        this.setError(err, "onApiFailureCallback");
      }
      },
        checkCashBalance: function(cashArr) {
          try{
            if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").newAccountsArr.length > 0) {
                cashArr.push(...applicationManager.getModulesPresentationController("WealthPortfolioUIModule").newAccountsArr);
            }
          if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").balanceArr.length > 0){
          for(i in applicationManager.getModulesPresentationController("WealthPortfolioUIModule").balanceArr){
            cashArr.forEach(function(e) {
                if (e.currency === applicationManager.getModulesPresentationController("WealthPortfolioUIModule").balanceArr[i].currency) {
                    e.balance = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").balanceArr[i].amount;
                }
            });
            }
            }
            return cashArr;
          }catch(err) {
        this.setError(err, "checkCashBalance");
      }
        },
        navigateCustomBack: function() {
            //WIW-1836 defect fix
          var navMan = applicationManager.getNavigationManager();
          var lastForm = navMan.stack[navMan.stack.length - 1];
	      if(lastForm === "frmPortfolioDetails"){
		   navMan.stack.pop();
	      }         
          new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "frmUnifiedDashboard"}).navigate();
        },
        holdings: function() {
          try{
            scope_WealthPresentationController.isOpenOrdersIncluded = false; //setting this to false to disable includeorders when navigating from holdings downloads - WIW-1445 fix
            var sortByValue = undefined;
            var data = {};
            data.response = sortByValue;
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmSortBy", data);
            navManager.setCustomInfo("frmPortfolioDetails", true);
            navManager.navigateTo("frmHoldings");
//             var params = {
//                 "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
//                 "navPage": "Holdings",
//                 "sortBy": "description",
//                 "searchByInstrumentName": ""
//             }
//             var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
//             wealthModule.getHoldings(params);
          }catch(err) {
        this.setError(err, "holdings");
      }
          },
        jointAcc: function(){
          try{
		    var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmJointAccount");
          }catch(err) {
        this.setError(err, "jointAcc");
      }
        },
        transactions: function() {
          try{
            var navManager = applicationManager.getNavigationManager();
            var sortByValue = undefined;
            var data = {};
            data.response = sortByValue;
            navManager.setCustomInfo("frmPortfolioDetails", true);
            navManager.setCustomInfo("frmSortBy", data);
            data.selectedPeriod = "previous30DaysSelected";           
            var today = scope_WealthPresentationController.bankdate?new Date(scope_WealthPresentationController.bankdate):new Date();
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
            var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
		    data.startDate = startDate;
            data.endDate = endDate;
           applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails = {
            startDate: startDate,
            endDate: endDate,
            selectedPeriod: "previous30DaysSelected",
            flag: false
          };
            //navManager.setCustomInfo("frmDateRange", data);
           /* var params = {
                "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                "startDate": startDate,
                "endDate": endDate,
                "searchByInstrumentName": "",
                "sortBy": "tradeDate"
            }*/
           //             var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
//             wealthModule.getTransactions(params);
			navManager.navigateTo("frmTransactions");
          }catch(err) {
        this.setError(err, "transactions");
      }
        },
        performance: function(){
          try{
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("frmPortfolioDetails", true);
          var data = {};
          data.selectedPeriod = "1Year";
          data.duration = "OneY";
          applicationManager.getModulesPresentationController("WealthPortfolioUIModule").benchmark = "";
          //navManager.setCustomInfo("frmDateRange", data);
          var today = scope_WealthPresentationController.bankdate?new Date(scope_WealthPresentationController.bankdate):new Date();
          var startDate = (today.getFullYear() -1) + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
          var endDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);
          var params ={
  				"portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
  				"dateFrom":startDate,
  				"dateTo":endDate,
  				"benchMarkIndex":"",
  				"duration":"OneY",
                "currencyId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").refCurrencyId
 }
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails = {
            startDate: startDate,
            endDate: endDate,
            selectedPeriod: "1Year",
            flag: false,
           duration: "OneY"
          };
          var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
          wealthModule.getPerformance(params);
          }catch(err) {
        this.setError(err, "performance");
      }
        },
        accounts: function() {
          try{
            var navManager = applicationManager.getNavigationManager();
            var sortByValue = undefined;
            var data = {};
            data.response = sortByValue;
            navManager.setCustomInfo("frmPortfolioDetails", true);
            navManager.setCustomInfo("frmSortBy", data);
            data.selectedPeriod = "previous30DaysSelected";
            var today = scope_WealthPresentationController.bankdate?new Date(scope_WealthPresentationController.bankdate):new Date();
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
            var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
          data.startDate = startDate;
            data.endDate = endDate;
          applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails = {
            startDate: startDate,
            endDate: endDate,
            selectedPeriod: "previous30DaysSelected",
            flag: false
          };
          //navManager.setCustomInfo("frmDateRange", data);
    /*      var params ={
"portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
"accountId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber,
"dateFrom":dateFrom,
"dateTo":dateTo,
"listType":"SEARCH",
"sortBy":"bookingDate",
"searchByInstrumentName":""
}
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getAccountActivity(params); */
          navManager.navigateTo("frmAccounts");
          }catch(err) {
        this.setError(err, "accounts");
      }
        },
        moreOptions: function() {
          try{
          this.view.flxMainContainer.enableScrolling = false;
          this.view.flxMainContainer.setEnabled(false);
          this.view.flxHeader.setEnabled(false);
            this.view.flxAdditionalOptions.setVisibility(true);
          }catch(err) {
        this.setError(err, "moreOptions");
      }
        },
        onCancel: function() {
          try{
          this.view.flxMainContainer.enableScrolling = true;
          this.view.flxMainContainer.setEnabled(true);
          this.view.flxHeader.setEnabled(true);
            this.view.flxAdditionalOptions.setVisibility(false);
          }catch(err) {
        this.setError(err, "onCancel");
      }
        },
        getNewGraphData: function(filterParam) {
          try{
            var inputParams = {
                "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                "navPage": "Portfolio",
                "graphDuration": filterParam
            };
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            wealthModule.getAssetsAllocation(inputParams);
          }catch(err) {
        this.setError(err, "getNewGraphData");
      }
        },
        bindNewGraphData: function(responseObj) {
          try{
            //var responseObj = obj.response;
            var graphDet =  responseObj.instrumentTotal[0];
            var graphData = [];
            var temp = [];
            var temp = graphDet[graphDet.graphDuration];
            graphData = temp;
          if(graphData.length>0){
			  // IW-3327-Ayush Raj - fix start
            for(let i=0; i<graphData.length; i++){
				graphData[i].AMOUNT = Number(graphData[i].AMOUNT).toFixed(2);
		 	}
            this.view.flxPortfolioLineChart.isVisible=true;
               this.view.investmentLineChart.setChartData(graphData, null, null, null, "PORTFOLIO");
        
          }else{
            this.view.flxPortfolioLineChart.isVisible=false;
          
          }
            //     for(var item in graphData){
            //       this.xaxisArr.push(item);
            //       this.plotDataArr.push(graphData[item]); 
            //     }
            // this.view.investmentLineChart.setChartData(this.plotDataArr,this.xaxisArr,null,this.chartConfig);
          }catch(err) {
        this.setError(err, "bindNewGraphData");
      }
          },
        changeGraphData: function(filterParam, isCallRequired) {
          try{
            this.xaxisArr = [];
            this.plotDataArr = [];
            var responseObj;
            if (isCallRequired) {
                this.getNewGraphData(filterParam);
            } else {
                responseObj = this.portfolioData;
                var graphData = [];
                var temp = [];
                var temp = responseObj[responseObj.graphDuration];
                graphData = temp;
                //     for(var item in graphData){
                //       this.xaxisArr.push(item);
                //       this.plotDataArr.push(graphData[item]); 
                //     }
                // this.view.investmentLineChart.setChartData(this.plotDataArr,this.xaxisArr,null,this.chartConfig);
              if(graphData.length>0){
				  // IW-3327-Ayush Raj - fix start
                for(let i=0; i<graphData.length; i++){
		 			graphData[i].AMOUNT = Number(graphData[i].AMOUNT).toFixed(2);
		 		}
            this.view.flxPortfolioLineChart.isVisible=true;
                this.view.investmentLineChart.setChartData(graphData, null, null, null, "PORTFOLIO");
            
              }else{
                 this.view.flxPortfolioLineChart.isVisible=false;
           
              }
                }
          }catch(err) {
        this.setError(err, "changeGraphData");
      }
        },
        // Called when chart filter changed - Mapped in onFilterChange event on CHart Component
        chartFilters: {
            ONE_MONTH: '1M',
            ONE_YEAR: '1Y',
            FIVE_YEARS: '5Y',
            YTD: 'YTD',
        },
        clickTransferCash: function(){
          try{
//           var fastTransfer = applicationManager.getModulesPresentationController("TransferModule");
//           var navManager = applicationManager.getNavigationManager();
//           data = {};
//           navManager.setCustomInfo("frmTransfersFromAccount", data);
//           fastTransfer.commonFunctionForNavigation("frmTransfersFromAccount");
          
           if(this.isTransfersAndPayEnabled()){
          applicationManager.getPresentationUtility().showLoadingScreen();
          var navMan = applicationManager.getNavigationManager();
          navMan.setEntryPoint("centralmoneymovement","frmDashboardAggregated");
          var moneyMovementModule = applicationManager.getModulesPresentationController({ "moduleName": "MoneyMovementUIModule", "appName": "TransfersMA" });
          moneyMovementModule.getFromAndToAccounts();
          moneyMovementModule.clearMMFlowAtributes();
           }
          }catch(err) {
        this.setError(err, "clickTransferCash");
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
        this.setError(err, "isTransfersAndPayEnabled");
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
        this.setError(err, "isTransfersAndPayEnabledEur");
      }
        },
        clickTransferCashEuro: function(){
          try{
//           var fastTransfer = applicationManager.getModulesPresentationController("TransferModuleEurope");
//           var navManager = applicationManager.getNavigationManager();
//           data = {};
//           navManager.setCustomInfo("frmEuropeTransferFromAccount", data);
//           fastTransfer.commonFunctionForNavigation("frmEuropeTransferFromAccount");
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
        this.setError(err, "clickTransferCashEuro");
      }
        },
        clickConvertCurrency: function() {
          try{
            var wealthMod = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            var navManager = applicationManager.getNavigationManager();
            wealthMod.clearWealthData();
            data = {};
            data.cashAcc = this.cashAcc;
            navManager.setCustomInfo("frmSelectCurrency", data);
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").currencyConv = true;
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").toConv = true;
            applicationManager.getModulesPresentationController("WealthPortfolioUIModule").currencyConvData = true;

           // wealthMod.commonFunctionForNavigation("frmSelectCurrency");
           new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmSelectCurrency"}).navigate();
          }catch(err) {
        this.setError(err, "clickConvertCurrency");
      }
          },
        onFilterChanged: function(filter) {
          try{
            var maxVal = 0;
            var filterMap = "";
            this.chartConfig = filter;
            if (filter === this.chartFilters.ONE_MONTH) {
                filterMap = "OneM";
                this.changeGraphData(filterMap, true);
            } else if (filter === this.chartFilters.ONE_YEAR) {
                filterMap = "OneY";
                this.changeGraphData(filterMap, true);
            } else if (filter === this.chartFilters.FIVE_YEARS) {
                filterMap = "FiveY";
                this.changeGraphData(filterMap, true);
            } else {
                filterMap = "YTD";
                this.changeGraphData(filterMap, true);
            }
          }catch(err) {
        this.setError(err, "onFilterChanged");
      }
        },
      reports: function(){
        try{
             var today = scope_WealthPresentationController.bankdate?new Date(scope_WealthPresentationController.bankdate):new Date();
            var previousDate = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
            var startDate = previousDate.getFullYear() + '-' + ('0' + (previousDate.getMonth() + 1)).slice(-2) + '-' + ('0' + previousDate.getDate()).slice(-2);
            var endDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").reportType = "";    
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails = {
            startDate: startDate,
            endDate: endDate,
            selectedPeriod: "previous30DaysSelected",
            flag: false
          };
        var params = {
          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
          "navPage":"Reports"
        };
        var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.getReports(params);
        }catch(err) {
        this.setError(err, "reports");
      }
      },
      realignIconsBasedOnPermission: function(){
        try{
       this.view.flxHoldings.setVisibility(this.holdingsPermission);
       this.view.flxOrders.setVisibility(this.ordersPermission);
       this.view.flxTransactions.setVisibility(this.txnPermission);
       if(this.holdingsPermission && this.ordersPermission && this.txnPermission){
         this.view.flxHoldings.left = "0dp";
         this.view.flxOrders.left = "0dp";
         this.view.flxTransactions.left = "0dp";
         this.view.flxMore.centerX = "default";
       }
        else if(!this.holdingsPermission && !this.ordersPermission && !this.txnPermission){
           this.view.flxMore.centerX = "50%";
        }
        else if((!this.holdingsPermission && !this.ordersPermission && this.txnPermission) || (!this.holdingsPermission && this.ordersPermission && this.txnPermission)){
          this.view.flxTransactions.left = "50dp";
          this.view.flxHoldings.left = "0dp";
          this.view.flxOrders.left = "0dp";
          this.view.flxMore.centerX = "default";
        }
        else if((!this.holdingsPermission && this.ordersPermission && !this.txnPermission) || (!this.holdingsPermission && this.ordersPermission && this.txnPermission)){
          this.view.flxOrders.left = "50dp";
          this.view.flxHoldings.left = "0dp";
          this.view.flxTransactions.left = "0dp";
          this.view.flxMore.centerX = "default";
          
        }
        else if((this.holdingsPermission && !this.ordersPermission && !this.txnPermission) || (this.holdingsPermission && this.ordersPermission && !this.txnPermission) || (this.holdingsPermission && !this.ordersPermission && this.txnPermission)){
          this.view.flxHoldings.left = "50dp";
          this.view.flxTransactions.left = "0dp";
          this.view.flxOrders.left = "0dp";
          this.view.flxMore.centerX = "default";
        }
        }catch(err) {
        this.setError(err, "realignIconsBasedOnPermission");
      }
      },
      checkPermissions: function(){		
        try{
        var configManager =  applicationManager.getConfigurationManager();
           var checkUserPermission = function (permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
          }
        
             var checkFeature = function (feature) {
            return applicationManager.getConfigurationManager().checkUserFeature(feature);
          }
        
        	var isPortfolioHealthView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_VIEW");
        	var isPortfolioReviewStrategyView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_REVIEW_STRATEGY_VIEW");
        	var isInvestmentProposalView = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_VIEW");
        	var isInvestmentProposalPastProposalView = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_PAST_PROPOSAL_VIEW");
        	var isInvestmentProposalNewProposalView = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_NEW_PROPOSAL_VIEW");
        	         
        let self = this;
        
        var isCashTransfer =  configManager.getTransferCashPermission().some(configManager.checkUserPermission.bind(configManager));
        var isConvertCurrency = configManager.getConvertCurrencyPermission().some(configManager.checkUserPermission.bind(configManager));
        var isCashBalanceView = configManager.getCashBalanceViewPermission().some(configManager.checkUserPermission.bind(configManager));
        
		self.view.flxWealthHealth.isVisible = isPortfolioHealthView;
        self.view.flxPortfolioStrategy.isVisible = isPortfolioReviewStrategyView;  
        self.view.flxInvestmentProposal.isVisible = isInvestmentProposalView;
        
        if(isInvestmentProposalPastProposalView){
          self.view.InvestmentProposal.btnPast.isVisible = isInvestmentProposalPastProposalView;
          self.view.InvestmentProposal.btnPastProposal.isVisible = isInvestmentProposalPastProposalView;
          
          self.view.InvestmentProposal.btnPast.onClick = this.navigatetoPastProposal;
          self.view.InvestmentProposal.btnPastProposal.onClick = this.navigatetoPastProposal;
			
          self.view.InvestmentProposal.btnPast.skin = "sknIWBtnBgFFFFFFBorder1px003E7540px";
		  self.view.InvestmentProposal.btnPastProposal.skin = "sknIWBtnBgFFFFFFBorder1px003E7540px";
        }
        else{
          
          self.view.InvestmentProposal.btnPast.isVisible = false;
          self.view.InvestmentProposal.btnPastProposal.isVisible = false;
//           self.view.InvestmentProposal.btnPast.skin = "sknBtnE2E9F0Rounded";
// 		  self.view.InvestmentProposal.btnPastProposal.skin = "sknBtnE2E9F0Rounded";
        }
          
          //WIW-466 - If no view access, then no need of message and Green new Advice label at top.
          this.view.InvestmentProposal.lblAdvice.setVisibility(isInvestmentProposalNewProposalView);
          this.view.InvestmentProposal.flxNewAdvise.setVisibility(isInvestmentProposalNewProposalView);

          if(isInvestmentProposalNewProposalView) {
            self.view.InvestmentProposal.btnNew.isVisible = isInvestmentProposalNewProposalView;
            self.view.InvestmentProposal.btnNew.skin = "ICSknBtnF6F6F615px";
            self.view.InvestmentProposal.btnNew.onClick = this.navigateToNewProposal;
          }
          else {
            self.view.InvestmentProposal.btnNew.isVisible = false;
//             self.view.InvestmentProposal.btnNew.skin = "sknBtnE2E9F0Rounded";
          }
        
        
        self.view.btnTransferCash.setVisibility(isCashTransfer);
        self.view.btnConvertCurrency.setVisibility(isConvertCurrency);
        self.view.flxCashAccountsTab.setVisibility(isCashBalanceView);
        self.view.flxCashAccountsDet.setVisibility(isCashBalanceView);
        
        let holdingsFeature = configManager.getWealthPortfolioFeature().some(configManager.checkUserFeature.bind(configManager));
        
        let isHoldingsView = configManager.getHoldingsdetailsPermissions().some(configManager.checkUserPermission.bind(configManager));
        this.holdingsPermission = (holdingsFeature && isHoldingsView)? true: false;
        
        let ordersFeature = configManager.getOrderBlotterFeature().some(configManager.checkUserFeature.bind(configManager));
        let isOpenOrderView = configManager.getOpenOrderViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        let isHistoryOrderView = configManager.getHistoryOrderViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        this.ordersPermission = (ordersFeature && (isOpenOrderView || isHistoryOrderView))? true: false;
        
        let txnFeature = configManager.getWealthPortfolioFeature().some(configManager.checkUserFeature.bind(configManager));
        let transactViewPermission = configManager.getTransactionDetailViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        this.txnPermission = (txnFeature && transactViewPermission)? true: false;
        this.realignIconsBasedOnPermission();  
        
        let reportFeature = configManager.getWealthReportFeature().some(configManager.checkUserFeature.bind(configManager));
        
        var allReportPermissionAccessible = configManager.getWealthReportPermissions();
        var reportPermission = allReportPermissionAccessible.some(checkUserPermission);
        let allowReports = (reportFeature && reportPermission)? true: false;
        self.view.flxReport.setVisibility(allowReports);
        
        let performanceFeature = configManager.getWealthPortfolioFeature().some(configManager.checkUserFeature.bind(configManager));
        
        var allPerformancePermissionAccessible = configManager.getPortfolioPerformancePermissions();
        var performancePermission = allPerformancePermissionAccessible.some(checkUserPermission);
        let allowPerformance = (performanceFeature && performancePermission)? true: false;
        self.view.flxPerformance.setVisibility(allowPerformance);
        
        //Portfolio Detail page Permission
        let portfolioDetailViewPermission = configManager.getPortfolioDetailViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        self.view.flxPortfolioDetails.isVisible =portfolioDetailViewPermission;
        self.view.flxPortfolioValues.isVisible =portfolioDetailViewPermission;
        self.view.flxPortfolioLineChart.isVisible =portfolioDetailViewPermission;
        
        let portfolioDetailAssetAllocationPermission = configManager.getPortfolioAssetAllocationViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        self.view.flxAssetsTab.isVisible =portfolioDetailAssetAllocationPermission;
        self.view.flxAssetsSummary.isVisible=portfolioDetailAssetAllocationPermission;
       
        let portfolioDetailCashbalancePermission = configManager.getPortfolioCashBalanceViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        self.view.flxCashAccountsTab.isVisible =portfolioDetailCashbalancePermission;
         self.view.flxCashAccountsDet.isVisible =portfolioDetailCashbalancePermission;
       
        let portfolioDetailProductSearchPermission = configManager.getPortfolioProductSearchViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        self.view.flxSearchDummy.onTouchEnd = portfolioDetailProductSearchPermission ? this.navigateToSearch : '';
       
        let portfolioDetailAccountViewPermission = configManager.getPortfolioAccountInfoViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        this.view.flxInfo.isVisible = portfolioDetailAccountViewPermission;
        self.view.flxInfo.onTouchEnd = portfolioDetailAccountViewPermission ? this.jointAcc : '';
        
        let AccountActivityPermission = configManager.getAccountSummaryViewPermissions().some(configManager.checkUserPermission.bind(configManager));
        self.view.flxAccounts.isVisible = AccountActivityPermission;
       if(portfolioDetailAccountViewPermission)
        {
          var isAppPresent=configManager.isMicroAppPresent("TransfersMA");
               if(isAppPresent){
           if(configManager.getBaseCurrency() === 'EUR'){
           self.view.btnTransferCash.onClick = isCashTransfer ? self.clickTransferCashEuro :"";
          } else {
          self.view.btnTransferCash.onClick = isCashTransfer ? self.clickTransferCash : "";
          }
           }else{
                this.view.btnTransferCash.setVisibility(isAppPresent);
               }
         
          self.view.btnConvertCurrency.onClick = isConvertCurrency ? self.clickConvertCurrency : "";

        }
       else{
       self.view.btnTransferCash.onClick="";
       self.view.btnConvertCurrency.onClick = "";
          self.view.flxBtns.isVisible =portfolioDetailAccountViewPermission;
		}
        }catch(err) {
        this.setError(err, "checkPermissions");
      }
     },
      
      navigatetoPastProposal:function(){
        try{
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmPastProposal");
        }catch(err) {
        this.setError(err, "navigatetoPastProposal");
      }
    },

    navigateToNewProposal : function(){
      try{
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmReviewNewProposal");
      }catch(err) {
        this.setError(err, "navigateToNewProposal");
      }
    },
      
      populateCashBalance: function(responseObj){   
        try{
        var forUtility = applicationManager.getFormatUtilManager();
        let cashAccFromResponse = responseObj.cashAccounts
        this.cashAcc = [];
        var trimmedAccName = "";

        this.cashAcc = this.checkCashBalance(cashAccFromResponse);
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioCashAccounts = responseObj;
        var cashList;
        var cashData = [];
        for (var i in this.cashAcc) {
			var tempRefCashBalance,flx1,flx2,sep;
          tempRefCashBalance=(this.cashAcc[i].referenceCurrencyValue!== "")?forUtility.formatAmountandAppendCurrencySymbol(this.cashAcc[i].referenceCurrencyValue, responseObj.totalCashBalanceCurrency):"";
          
          if (tempRefCashBalance && tempRefCashBalance!=="")  
          {
            let balanceCurr=forUtility.formatAmountandAppendCurrencySymbol(this.cashAcc[i].balance, this.cashAcc[i].currency);
            let CashBaclnce=(this.cashAcc[i].referenceCurrencyValue!== "")?forUtility.formatAmountandAppendCurrencySymbol(this.cashAcc[i].referenceCurrencyValue, responseObj.totalCashBalanceCurrency):"";
            
          cashList = {
            accountName: CommonUtilities.truncateStringWithGivenLength(this.cashAcc[i].accountName + "....", 26) + CommonUtilities.getLastFourDigit(this.cashAcc[i].accountNumber),
            cashBalance: balanceCurr,
            refCashBalance:CashBaclnce,
            refCurrency: this.cashAcc[i].currency,
            accountNumber: this.cashAcc[i].accountNumber,
			flx1 : {"isVisible": true},
            sep: {"isVisible": false}
          };
          }
          else
            {
              let balanceCurr=forUtility.formatAmountandAppendCurrencySymbol(this.cashAcc[i].balance, this.cashAcc[i].currency);
              let CashBaclnce=(this.cashAcc[i].referenceCurrencyValue!== "")?forUtility.formatAmountandAppendCurrencySymbol(this.cashAcc[i].referenceCurrencyValue, responseObj.totalCashBalanceCurrency):"";
			 
              cashList = {
            accountName: CommonUtilities.truncateStringWithGivenLength(this.cashAcc[i].accountName + "....", 26) + CommonUtilities.getLastFourDigit(this.cashAcc[i].accountNumber),
            cashBalance:{
            "top": "20dp",
            "text": balanceCurr
            },
            refCashBalance: {
            "isVisible": false,
            "text": CashBaclnce
            },
            refCurrency:this.cashAcc[i].currency,
            accountNumber: this.cashAcc[i].accountNumber,
			flx1 : {"isVisible": true},
            
            sep: {"isVisible": true}
            };
          
        }
          cashData.push(cashList);
        }
        
        if (this.view.flxCashAccountsDet.isVisible){
          if (cashData.length === 1) {
            if (this.cashAcc[0].currency === responseObj.totalCashBalanceCurrency) {
              this.view.segCashSummary.setVisibility(false);
              this.view.flxCashSeparator.setVisibility(true);
            } else {
              this.view.segCashSummary.setVisibility(true);
              this.view.flxCashSeparator.setVisibility(false);
            }
          } else {
            this.view.segCashSummary.setVisibility(true);
            this.view.flxCashSeparator.setVisibility(false);
          }
          this.view.segCashSummary.widgetDataMap = {
            lblCashAcc: "accountName",
            lblCashAccBal: "cashBalance",
            lblRefCashBal: "refCashBalance",
            flxCash: "flx1",
            flxDummy :"sep"
          };
			if(responseObj.totalCashBalance !== "")
              {
                var cashBalTotal = forUtility.formatAmountandAppendCurrencySymbol(responseObj.totalCashBalance, responseObj.totalCashBalanceCurrency);
				this.view.flxCashBal.setVisibility(true);
              this.view.flxCashBalanceVal.setVisibility(true);
              this.view.flxCashSeparator.setVisibility(true);
                this.view.lblCashBalanceVal.text = cashBalTotal;
                
              }
          else 
            {
              this.view.flxCashBal.setVisibility(false);
              this.view.flxCashBalanceVal.setVisibility(false);
              this.view.flxCashSeparator.setVisibility(false);
            }
          this.view.segCashSummary.setData(cashData);
        }
        
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").totalCashBalance = responseObj.totalCashBalance;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").totalCashBalanceCurrency = responseObj.totalCashBalanceCurrency;
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").accountNumber = cashData[0].accountNumber;
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
      
      setAdvisoryCards: function(isVisible) {
        this.view.flxPortfolioHealth.setVisibility(isVisible);
        this.view.flxAdvisory.setVisibility(isVisible);
      },
      
      showHealthAndProposal: function(isVisible){
        this.view.flxWealthHealth.setVisibility(isVisible);
        this.view.flxInvestmentProposal.setVisibility(isVisible);
      },
     /**
	* @api : setError
	* triggered as a error call back for any service
    * @arg1: errorMsg {String} - error message
    * @arg2: method {String} - method from which error message is received
	* @return : NA
	*/
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
    },
    };
});
