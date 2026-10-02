/*eslint-disable*/
var holdingsData = {};
var portfolioId = "";
var portdata = "";
var isJoint = scope_WealthPresentationController.isJointAccount;
var accountsListObj = {};
var chartDefaultValue = "";
var graphVisibility=false;
var assets={};
var cashCardServiceFlag=0;
var portfolioservicesdone=0;
var chartH = "";
var refCurrecny = "";
var user = "";
var flagAsset = 0;
var controlFlag = false;
var dropDownVisibility = false;
var paginationVisible = false;
define(['FormControllerUtility', 'ViewConstants', 'CommonUtilities', 'OLBConstants', 'CampaignUtility'], function (FormControllerUtility, ViewConstants, CommonUtilities, OLBConstants, CampaignUtility) {
    var responsiveUtils = new ResponsiveUtils();
    var orientationHandler = new OrientationHandler();
    var onTouchFlag;
    return {


        updateFormUI: function(uiData) {
            if (uiData) {
                /* if (uiData.InstrumentsList) {
                   this.updateInstrumentSeg(uiData.InstrumentsList);
                 }*/
                if (uiData.cashCurrencyList) {
                    this.updateCashCard(uiData.cashCurrencyList, true);
                  this.bindNewGraphData(uiData.cashCurrencyList);
                }
            }
        },
      
      onHide: function(){
        scope_WealthPresentationController.isOpenOrdersIncluded = false;
      },

        init: function() {
          //  chartDefaultValue = this.view.investmentLineChart.currentFilter;
			this.view.investmentLineChart.onFilterChanged = this.onFilterChanged.bind(this);
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onHide = this.onHide;
			this.chartH = this.view.flxPortofolioLineChart.height;
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnViewFavorite.onClick = this.onWatchListClick;
            this.view.btnTab1.onClick = this.portfolioSummaryAction;
            this.view.btnTab2.onClick = this.accountInfoAction;
            this.view.settings.offVisibility = this.closeSettingsPopUp;
            this.view.settings.onClickSave = this.setSelectedColumn;
            this.view.settings.onClickDefault = this.setSelectedColumn;
          this.view.portfolioDetails.onSettingsVisibility = this.openSettingsPopUp;
          this.view.portfolioDetails.onDownloadsVisibility = this.openDownloadsPopUp;
          this.view.portfolioDetails.setDateParam = this.openDownloadsPopUp;
          this.view.Downloads.downloadFormatParams= this.serviceMethod;
          this.view.GenericMessageNew.closepopup = this.closepopup;
        },
        setSelectedColumn: function(ColumnValue) {
            this.view.portfolioDetails.RealignSegment(ColumnValue);
        },

        closeSettingsPopUp: function() {
            this.view.settings.setVisibility(false);
        },
      
      executionAfterCancel: function(response) {
        this.view.flxCancelPopup.setVisibility(false);
        this.view.flxPopup.setVisibility(false);
        this.view.flxSuccessMessage.setVisibility(true);
       if (response.messageDetails) {
          response.i18n = kony.i18n.getLocalizedString("i18n.wealth.cancelOrderSucceeded") +" " + response.orderId;
       } else if (response.error) {
         response=response.error;
         response.i18n = kony.i18n.getLocalizedString("i18n.wealth.cancelOrderFailed");
       }
        else{
           response.i18n = kony.i18n.getLocalizedString("i18n.wealth.cancelOrderSucceeded") +" " + response.orderId;
        }
        this.view.GenericMessageNew.setContext(response);
        this.view.flxFormContent.setContentOffset({
          "y": "0dp"
        });

      },

      closepopup: function() {
        this.view.flxSuccessMessage.setVisibility(false);
      },
        onWatchListClick: function() {
            scope_WealthPresentationController.watchlistFromPortfolio="Yes";
            var navManager = applicationManager.getNavigationManager();
            new kony.mvc.Navigation({
                "appName": "WealthOrderMA",
                "friendlyName": "frmWatchlist"
            }).navigate();
        },

        openSettingsPopUp: function(data) {
            this.view.settings.setVisibility(true);
            this.view.settings.setColumnArray(data);
        },
       openDownloadsPopUp : function(e,selectedTab)
      {
        if(selectedTab ===1){
          flag = "holdings";
        }
        if(flag==="holdings"||flag===0|| flag===false)
          {
            let lbldata1=kony.i18n.getLocalizedString("i18n.wealth.downloadHoldings");
            let lbldata2=kony.i18n.getLocalizedString("i18n.wealth.youCanDownloadTheholdingsReports");
            this.view.Downloads.postshow(flag,lbldata1,lbldata2,newDate);
            this.view.Downloads.setVisibility(true);
          }
        else if(flag==="transactions"){
          let lbldata1=kony.i18n.getLocalizedString("i18n.wealth.downloadTransactions");
          let lbldata2=kony.i18n.getLocalizedString("i18n.wealth.youCanDownloadTheTransactionsReports");
          
          this.view.Downloads.postshow(flag,lbldata1,lbldata2,newDate);
          this.view.Downloads.setVisibility(true);
        }
        else if(flag==="orders"){
          this.view.Downloads.setVisibility(true);
          let lbldata2=kony.i18n.getLocalizedString("i18n.wealth.youCanDownloadTheOrdersReports");
          let lbldata1=kony.i18n.getLocalizedString("i18n.wealth.downloadOrders");
         
          this.view.Downloads.postshow(flag,lbldata1,lbldata2,newDate);
          this.view.Downloads.setVisibility(true);
        }
        else if(flag==="accounts_activity"){
          let lbldata1=kony.i18n.getLocalizedString("i18n.wealth.downloadAccountActivity");
          let lbldata2=kony.i18n.getLocalizedString("i18n.wealth.youCanDownloadTheAccountActivityReports");
         
          this.view.Downloads.postshow(flag,lbldata1,lbldata2,newDate);
          this.view.Downloads.setVisibility(true);
          
        }
        else{
          let lbldata1=kony.i18n.getLocalizedString("i18n.wealth.downloadPerformance");
          let lbldata2=kony.i18n.getLocalizedString("i18n.wealth.youCanDownloadThePerformanceReports");
          
          this.view.Downloads.postshow("performance",lbldata1,lbldata2,newDate);
          this.view.Downloads.setVisibility(true);
        }
        
        //this.view.Downloads.setVisibility(true);
      },
     
      serviceMethod: function(FormatVar)
      {
        this.view.portfolioDetails.serviceCallParams(FormatVar);
      },
      setLineChartVisible: function(){
            this.view.flxPortofolioLineChart.height = this.chartH;
           
        },
        setLineChartInvisible: function(){
            this.view.flxPortofolioLineChart.height = "0px";
        },
        portfolioSummaryAction: function() {
            this.view.flxAccountInfoValues.setVisibility(false);
            this.view.flxPortofolioValues.setVisibility(true);
          //  this.view.flxPortofolioLineChart.setVisibility(graphVisibility);
          if(graphVisibility){
            this.setLineChartVisible();}
          else{
             this.setLineChartInvisible();
          }
             this.view.btnTab1.skin = "sknBtnSSP42424217PxSelectedTab";
            this.view.btnTab2.skin = "sknBtnSSP72727217PxUnSelectedTab";
            this.view.flxSeparator2.setVisibility(graphVisibility);
            this.view.flxSeparatorInvestment.setVisibility(true);
        },

        accountInfoAction: function() {
            this.view.flxAccountInfoValues.setVisibility(true);
            this.view.flxPortofolioValues.setVisibility(false);
         //   this.view.flxPortofolioLineChart.setVisibility(false);
          this.setLineChartInvisible();
            this.view.btnTab1.skin = "sknBtnSSP72727217PxUnSelectedTab";
            this.view.btnTab2.skin = "sknBtnSSP42424217PxSelectedTab";
            this.view.flxSeparator2.setVisibility(false);
            this.view.flxSeparatorInvestment.setVisibility(false);
            var data = scope_WealthPresentationController.jointAccountDetails.portfolioList;
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            var portId = wealthModule.getPortfolioId();
            if (portfolioId === "") {
                portfolioId = portId;
            }
            for (list in data) {
                if (portfolioId === data[list].portfolioId) {
                    portdata = data[list];
                }
            }
            if (scope_WealthPresentationController.isTAPIntegration) {
              isJoint = scope_WealthPresentationController.jointHolderName !== '' ? true : false;
          }
          else {
              isJoint = portdata.jointHolders !== "" ? true : false;
          }
            this.setUi(portdata);
            this.view.imgAccountNumber.src = "eye_show.png";
            this.view.imgAccountNumber.onTouchEnd = this.OnClickUnMask;
        },
        setUi: function(portdata) {
            this.view.lblAccountNumberValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(portdata.accountNumber);
            this.view.lblPrimaryHolderValue.text = portdata.primaryHolder;
            if (isJoint === true) {
                this.view.flxJointAccount.setVisibility(true);
                this.setsegmentJointHolders(portdata);
            } else {
                this.view.flxJointAccount.setVisibility(false);
            }
        },
        setsegmentJointHolders: function(portdata) {
            var scope = this;
            var currForm = kony.application.getCurrentForm();
            var data =  scope_WealthPresentationController.isTAPIntegration ? scope_WealthPresentationController.jointHolderName.split(',') : portdata.jointHolders.split(',');
            var segData = [];
            var count = 1;
            for (var list in data) {
                var storeData;
                storeData = {
                    jointHolder: "Joint Holder " + count + ":",
                    jointHolderName: data[list],
                }
                count++;
                segData.push(storeData);
            }
            this.view.segmentJointHolders.widgetDataMap = {
                lblJointAccLabel: "jointHolder",
                lblJointAccName: "jointHolderName",
            }
            this.view.segmentJointHolders.setData(segData);
            currForm.forceLayout();
        },

        OnClickUnMask: function() {
            if (this.view.imgAccountNumber.src === "eye_hide.png") {
                this.view.lblAccountNumberValue.text = applicationManager.getDataProcessorUtility().maskAccountNumber(portdata.accountNumber);
                this.view.imgAccountNumber.src = "eye_show.png";
            } else {
                this.view.lblAccountNumberValue.text = portdata.accountNumber;
                this.view.imgAccountNumber.src = "eye_hide.png";
            }
        },
        bindNewGraphData: function(responseObj) {
          var val = responseObj.instrumentTotal[0];
          // WIW-1485
          responseObj.displayName = this.view.lblAccountTypes.text;
          var graphData;
          var forUtility = applicationManager.getFormatUtilManager();
		//	if(val.hasOwnProperty("OneM")) {
            var totalVal = forUtility.formatAmountandAppendCurrencySymbol(val.marketValue, val.referenceCurrency);
            var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
         //   var todaysPL = forUtility.formatAmountandAppendCurrencySymbol(val.todayPLAmount, val.referenceCurrency);
            this.view.lblValueMarketValue.text = totalVal;
            var flxUnrealisedPL = this.view.flxUnrealisedPL;
            var lbllUnrealisedPL = this.view.lbllUnrealisedPL;
            var lblUnrealisedPLValue = this.view.lblUnrealisedPLValue;
         			
			if (val.unRealizedPL =='P') {
              lblUnrealisedPLValue.skin = "IWLabelGreenText15Px";
               lblUnrealisedPLValue.text = (unrealizedPL != "" && val.unRealizedPLPercentage !== "") ? ("+" + unrealizedPL + " " +"(+" + val.unRealizedPLPercentage + "%)") : ((unrealizedPL != "") ? ("+" + unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? ("(+" + val.unRealizedPLPercentage + "%)") : ""));
            } else {
              lblUnrealisedPLValue.skin = "sknlblff000015px";
               lblUnrealisedPLValue.text =  (unrealizedPL != "" && val.unRealizedPLPercentage !== "") ? ((unrealizedPL[0]=="-"?unrealizedPL:"-" +unrealizedPL)+ " " +(val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") ): ((unrealizedPL != "") ? (unrealizedPL[0]=="-"?unrealizedPL:"-" +unrealizedPL) : ((val.unRealizedPLPercentage !== "") ? (val.unRealizedPLPercentage[0]=="-"?"("+val.unRealizedPLPercentage+"%)": "(-" + val.unRealizedPLPercentage + "%)") : ""));
            }
          if (this.isRTL) {
            this.view.lblUnrealisedPLValue.left = "91px";
            this.view.lblTodayPLValue.left = "92px";
          }else{        
            lblUnrealisedPLValue.left = "131px";
             this.view.lblTodayPLValue.left = "131px";
          }
			if(!this.isNullOrUndefined(val.performanceValue)){
				//this.view.flxTodayPL.isVisible=true;
              if (this.isRTL) {
                this.view.lblTodayPL.text = ":("+ val.performance +") " + kony.i18n.getLocalizedString("i18n.wealth.performance");
              }
              else {
              this.view.lblTodayPL.text = kony.i18n.getLocalizedString("i18n.wealth.performance") + " ("+ val.performance +"):";
              }
              this.onPerformanceFilterChange(val.performance);
              this.view.investmentLineChart.currentFilter = this.chartDefaultValue;
              if(this.chartDefaultValue == "1Y"){
                graphData = val["OneY"];
              }
              else {
                graphData = val[val.graphDuration];
              }

               if(Number(val.performanceValue.slice(1,)) == 0){
                this.view.lblTodayPLValue.skin = "IWLabelGreenText15Px";
                this.view.lblTodayPLValue.text = "+"+ val.performanceValue.slice(1,) +"%";
               }
				else if (val.performanceValue > 0) {
                this.view.lblTodayPLValue.skin = "IWLabelGreenText15Px";
                this.view.lblTodayPLValue.text = val.performanceValue +"%";
            } else {
                this.view.lblTodayPLValue.skin = "sknlblff000015px";
                this.view.lblTodayPLValue.text = val.performanceValue + "%";
            }
			}
          else{
			//	this.view.flxTodayPL.isVisible=false;
             graphData = val[val.graphDuration];
			}
              applicationManager.getNavigationManager().setCustomInfo("frmPortfolioOverviewHealth",responseObj);
		//	}
            
            //var graphData = val[val.graphDuration];
			if(graphData.length>0){
              graphVisibility=true;
               scope_WealthPresentationController.investmentChartCurrency = forUtility.getCurrencySymbol(val.referenceCurrency);
				this.view.investmentLineChart.setChartData(graphData, null, null, null, "PORTFOLIO");
               if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
              // this.view.flxPortofolioValues.width="30%";
               }
     //   this.view.flxPortofolioLineChart.isVisible=true;
      this.setLineChartVisible();
		this.view.flxSeparator2.isVisible=true;
			}else{
              this.view.flxPortofolioValues.width="100%";
              graphVisibility=false;
		//		this.view.flxPortofolioLineChart.isVisible=false;
     this.setLineChartInvisible();
		this.view.flxSeparator2.isVisible=false;
		
			}
             
        },
      isNullOrUndefined: function(val) {
            if (val === null || val === undefined || val === "") {
                return true;
            } else {
                return false;
            }
        },
        chartFilters: {
            ONE_MONTH: '1M',
            ONE_YEAR: '1Y',
            FIVE_YEARS: '5Y',
            YTD: 'YTD',
        },
      onPerformanceFilterChange: function(filter) {
            if (filter === this.chartFilters.ONE_MONTH) {
                this.chartDefaultValue = this.chartFilters.ONE_MONTH;
            } else if (filter === this.chartFilters.ONE_YEAR) {
                this.chartDefaultValue = this.chartFilters.ONE_YEAR;
            } else if (filter === "1 Year") {
                this.chartDefaultValue = "1Y";
            } else if (filter === this.chartFilters.FIVE_YEARS) {
                this.chartDefaultValue = this.chartFilters.FIVE_YEARS
            } else {
                this.chartDefaultValue = this.chartFilters.YTD;
            }
        },
        onFilterChanged: function(filter) {
            var filterMap = "";
            if (filter === this.chartFilters.ONE_MONTH) {
                filterMap = "OneM";
                this.chartService(filterMap);
            } else if (filter === this.chartFilters.ONE_YEAR) {
                filterMap = "OneY";
                this.chartService(filterMap);
            } else if (filter === this.chartFilters.FIVE_YEARS) {
                filterMap = "FiveY";
                this.chartService(filterMap);
            } else {
                filterMap = "YTD";
                this.chartService(filterMap);
            }

        },
        chartService: function(filter) {
            var params = {
                "portfolioId": portfolioId,
                "navPage": "Portfolio",
                "graphDuration": filter
            };
          applicationManager.getPresentationUtility().showLoadingScreen();
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            wealthModule.getCashBalanceDetails(params);
        },
        preShow: function() {
          var scope=this;
      scope_WealthPresentationController.depositoryId = "";
          scope_WealthPresentationController.isOpenOrdersIncluded = false;
          this.isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
         if(this.isRTL){
            this.view.lblUnrealisedPLValue.left = "95dp";
          this.view.lblTodayPLValue.left = "95dp";
         }
         
          this.view.flxAsset.setVisibility(false);
		  var configManager = applicationManager.getConfigurationManager();
          scope_WealthPresentationController.instrumentAction = "";
          scope_WealthPresentationController.reload = "";
           this.view.settings.setVisibility(true);         
            this.checkPermission();
			if(configManager.isMicroAppPresent("WealthOrderMA"))
			{
            this.view.flxInstrument.setVisibility(!scope_WealthPresentationController.isAdvisory);
			if(this.view.flxInstrument.isVisible === false){
				this.view.flxAssetAllocation.top = "40dp";
			}
			
            } 
			else{
                this.view.flxInstrument.setVisibility(false);
            }
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            this.view.instrumentSearch.viewInstrumentDetails = this.viewInstrumentDetails;

            var portoId = wealthModule.getPortfolioId();
            if (portfolioId === "") {
                portfolioId = portoId;
            }
			
			//WIW-1421 Starts - Bharath
			var portfolioList = wealthModule.getAccountsListObj();
      for(var i =0;i< portfolioList.length ;i++){
                if (portfolioList[i].portfolioId === portoId) {
          if(portfolioList[i].investmentType === "Advisory"){
            scope_WealthPresentationController.isAdvisory =true;
          }else{
            scope_WealthPresentationController.isAdvisory =false;
          }
        }
      }
	  //WIW-1421 Ends - Bharath
          refCurrecny=wealthModule.getPortfolioCurrency();
            accountsListObj = wealthModule.getAccountsListObj();
            if (scope_WealthPresentationController.isFirst === true) {
                this.getAccount(portoId);
            }
           
           
            var features = configManager.getUserFeatures();
            var permissions = configManager.getUserPermissions();
            var entitlement = {
                "features": features,
                "permissions": permissions
            };
            //var features=entitlement;

            this.view.portfolioDetails.setFeaturesAndPermissions(entitlement);

            this.view.instrumentSearch.setPortfolioId(portfolioId);
            this.view.flxAccountTypes.onClick = this.getAccountListDetails;
            var parm ={
                "objectServiceName": "PortfolioServicing",
                "operationName": "getAllocation",
                "objectName": "PortfolioDetails",
                "Criteria": {
                    "portfolioId": portfolioId
                }
            };
            this.view.assetAllocation.setAssetAllocationGraphVisibility = function(isVisible) {
                
	        scope.view.flxAssetAllocation.setVisibility(isVisible);
                scope.view.flxAsset.isVisible = !isVisible;
            }
			this.view.myStrategyDetails.newUser = function (userstrategy) {
				if (scope_WealthPresentationController.isAdvisory)
				{
                  scope.view.flxAssetAllocation.top = "40dp";
				user=userstrategy;
                if (user==="true") {
                    scope.view.flxAdvisoryMain.setVisibility(false);
                    scope.view.flxNewUser.setVisibility(true);
                } else if (user==="false") {
                    scope.view.flxAdvisoryMain.setVisibility(true);
                    scope.view.flxNewUser.setVisibility(false);
                }
                else
                {
                    scope.view.flxAdvisoryMain.setVisibility(false);
                    scope.view.flxNewUser.setVisibility(false);
                }
				}else{
                  scope.view.flxAssetAllocation.top = "20dp";
                }

            };
			      this.view.myStrategyDetails.setParam(portfolioId);
            this.view.assetAllocation.setServiceParm(parm, this.onApiFailureCallback.bind(this));
            this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.wealth.portfolioDetails")
            this.setCustomerData();
            this.initActions();
            
        },
        setCustomerData: function () {
          try {
            var navManager = applicationManager.getNavigationManager();
           var customerData = navManager.getCustomInfo("frmCustomerDashboard");

        //   const {coreCustomerName, coreCustomerID} = applicationManager.getUserPreferencesManager().getUserObj().CoreCustomers[0];
        //   const customerName = coreCustomerName.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
          if(customerData){
           this.view.lblBackToDashboard.text = `${kony.i18n.getLocalizedString("i18n.Wealth.backTo")} ${customerData.customerName} (${customerData.customerId})`;
          }else{
            this.view.lblBackToDashboard.text = kony.i18n.getLocalizedString("i18n.Wealth.backToOverview");
          }
          
          }
          catch(e) {
            console.log(e, 'setCustomerData')
          }
          this.view.lblPortfolio.isVisible = false;
          this.view.flxSecondaryDetailsRow.top = '20px';
          this.view.flxBackToDashboard.cursorType = 'pointer';
          this.view.flxAccountTypesAndInfo.cursorType = 'pointer';

        },
      	onApiFailureCallback: function() {
          this.view.flxAssetAllocation.setVisibility(false);
          this.view.flxAsset.setVisibility(true);
        },
        initActions: function() {
            this.view.portfolioDetails.sendDropDownFlag = this.closeDropDownReports;
            this.view.portfolioDetails.onCancelRequest = this.showCancelPopup;
            this.view.portfolioDetails.onCancelSuccess = this.executionAfterCancel;
            this.view.portfolioDetails.contextMenuNavigation = this.frmNavigation;
            this.view.CustomPopupCancel.flxCross.onClick = this.HidePopup;
            this.view.CustomPopupCancel.btnNo.onClick = this.HidePopup;
            this.view.CustomPopupCancel.btnYes.onClick = this.makeCancelServiceCall;
			      this.view.portfolioDetails.requestStart = this.startt;
            this.view.portfolioDetails.requestEnd = function() {
              portfolioservicesdone=0;
              if(cashCardServiceFlag===0){
                  FormControllerUtility.hideProgressBar(this.view);
              }
                
              };
            this.view.flxBackToDashboard.onClick = () => applicationManager.getNavigationManager().navigateTo({appName:'HomepageMA', friendlyName:'frmDashboard'})

        },
      
      startt:function() {
        portfolioservicesdone = 1;
        FormControllerUtility.showProgressBar(this.view);
        this.closepopup();
      },
      
        frmNavigation: function(rowData, action) {
            if (action !== "") {
        if(rowData.hasOwnProperty("depositoryId")){
          scope_WealthPresentationController.depositoryId = rowData.depositoryId;
        }else{
          scope_WealthPresentationController.depositoryId = "";
        }
        var navManager = applicationManager.getNavigationManager();

              if (action === "frmProductDetails") {
                let dataPortfolio = {};
                dataPortfolio.portfolioDetails = rowData;

                navManager.setCustomInfo(action, dataPortfolio); 
                let paramsProdDetails = {
                  "ISINCode": rowData.ISIN?rowData.ISIN:'',
                  "RICCode": rowData.RICCode?rowData.RICCode:'',
                  "instrumentId": rowData.holdingsId ,
                  "isAdvisory": scope_WealthPresentationController.isAdvisory,
                };
				if(rowData.application){
                 scope_WealthPresentationController.application = rowData.application;
                  paramsProdDetails.application = rowData.application;
                }
                applicationManager.getModulesPresentationController("WealthPortfolioUIModule").setProductDetails(paramsProdDetails);
                if(scope_WealthPresentationController.isOpenOrdersIncludedflag){
		//this is added if we click on the includeOrders no holdings instrument - it makes the flow as empty and follow instrsearch flow
                rowData.status !== ""?applicationManager.getModulesPresentationController("WealthPortfolioUIModule").flow="":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").flow="Holdings";
                }else{
                  applicationManager.getModulesPresentationController("WealthPortfolioUIModule").flow="Holdings";
                }
				//navManager.navigateTo(action);
                new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : action}).navigate();
              } else if (action === "frmPlaceOrder") {
                navManager.setCustomInfo(action, rowData); 
                var customData = {
                  "operation": rowData.operation,
                  "description": rowData.description,
                  "RICCode": rowData.RICCode,
                  "holdingsData": rowData
                };
                navManager.setCustomInfo("frmModifyButton", true);
				if (rowData.application) {
                        scope_WealthPresentationController.application = rowData.application;
                        customData.application = rowData.application;
                    }
                navManager.setCustomInfo(action, customData);
                // navManager.navigateTo(action);
                new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : action}).navigate();
              } else {
                //navManager.navigateTo(action);
                new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : action}).navigate();
              }
            }
        },
        HidePopup: function() {
            this.view.flxCancelPopup.setVisibility(false);
            this.view.flxPopup.setVisibility(false);
        },
        showCancelPopup: function() {
            this.view.flxCancelPopup.setVisibility(true);
            this.view.flxPopup.setVisibility(true);
        },
        makeCancelServiceCall: function() {
            this.view.portfolioDetails.makeDaoCallOnOrderCancelRequest();
        },

        postShow: function() {
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "HomepageMA",
                        "moduleName": "AccountsUIModule"
                    });
					 var isWealthUserMultiCustomer = accountsModule.presentationController.isWealthUserMultiCustomer;
			if (!isWealthUserMultiCustomer) {
                    this.view.flxBackToDashboard.isVisible = false;
                    this.view.imgLeftArrow.isVisible = false;
                    this.view.flxTopContainer.height = "48px";
					this.view.flxAccountTypesAndInfo.top = "64px";
					this.view.flxLeftContainer.top = "125px";
					this.view.flxRightContainer.top = "88px";
					
					
                }
          var configManager = applicationManager.getConfigurationManager();
            if(configManager.isMicroAppPresent("TransfersMA") && scope_WealthPresentationController.isJointAccount === false)
			{
                this.view.lblTransferCash.setVisibility(true);
                this.view.lblTransferCash.onTouchEnd = this.goToTransfer.bind(this);
            } 
			else 
			{
                this.view.lblTransferCash.setVisibility(false);
            }
	    if (configManager.isMicroAppPresent("WealthOrderMA") && scope_WealthPresentationController.isJointAccount === false) {
                    this.view.lblConvertCurrency.setVisibility(true);
                } else {
                  this.view.lblConvertCurrency.setVisibility(false);
                }
            var scope = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
           /* if (this.view.flxCashCard.isVisible === true || this.view.flxAsset.isVisible === true) {
              cashCardServiceFlag=1;
                this.getCashCardDetails();
            }         
          if (this.view.btnTab1.isVisible === true) {
                this.portfolioLevelChartService();
            }*/
            if (this.view.btnTab2.isVisible === true && this.view.btnTab1.isVisible === false) {
                this.accountInfoAction();
            }
                      if (this.view.flxCashCard.isVisible === true || this.view.flxAsset.isVisible === true || this.view.btnTab1.isVisible === true) {
              cashCardServiceFlag=1;
                this.getPortfolioDetails();
      }     
      if(scope_WealthPresentationController.isAdvisory) {
        let params = {
        "portfolioId":portfolioId,
        "portfolioServiceType":"Advisory",
        "navPage":"Portfolio"
      }
				this.view.flxInstrument.isVisible = false;
      this.view.PortfolioHealthCheck.setContext(params);
      this.view.PortfolioHealthCheck.btnClick = function() {
			var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmPortfolioHealthCheck");
        
      }
        
        
        
        //orderpropsal is called
        let orderpast = {
          "portfolioId": portfolioId,
          "portfolioServiceType": "Advisory",
          "type": "orderProposal",
          "sortBy": "currentWeight",
          "sortOrder": "desc",
          "searchByInstrumentName": "",
          "pageSize": "10",
          "pageOffset": "0",
          "pastProposalId": "",
          "funcResultCode": scope_WealthPresentationController.funcResultCode
        }
        var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.getOrderProposal(orderpast);
        
        //pastProposal is called to get isNewProp
	  let pastPropsalParams = {
        "portfolioId": portfolioId,
        "type": "pastProposal",
        "portfolioServiceType": "Advisory",
        "contextId":  scope_WealthPresentationController.contextId[portfolioId],
        "filter":"currentYear"

        }
       wealthModule.getPastProposal(pastPropsalParams);
        this.preShow();
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo('newUserData', user);
        if(user==="true")
        {
          this.view.flxAdvisoryMain.setVisibility(false);
          this.view.flxNewUser.setVisibility(true);
        }
        else if(user==="false")
        {
          this.view.flxAdvisoryMain.setVisibility(true);
          this.view.flxNewUser.setVisibility(false);
        }
      } else {
        this.view.flxAdvisoryMain.setVisibility(false);
        this.view.flxNewUser.setVisibility(false);
      }
      this.setActiveHeaderHamburger();
      this.view.flxAccountList.setVisibility(false);
      this.view.accountListMenu.setVisibility(false);
      this.closeSettingsPopUp();
      scope_WealthPresentationController.viewOrdersTab = false;
      this.checkPermission();
          
      //this.closeDropDownReports();  
          
      this.view.onTouchEnd = this.sendDropDownFlag;  
      
      this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
      this.view.imgAccountTypes.isVisible = true;
      this.view.imgAccountTypes.height = '16px';
      this.view.imgAccountTypes.width = '16px';
    },
      
      // IW-3759 --- Atharva Vadnere
      sendDropDownFlag:function(){
        var currFormObj = kony.application.getCurrentForm();
     if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
        setTimeout(function() {
              currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
              currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                currFormObj.customheadernew.imgLblTransfers.text = "O";
            }, "17ms")
          }
        if(onTouchFlag === 1)
        {
          onTouchFlag = 2;
          var updateUI = onTouchFlag;
          this.view.portfolioDetails.closeDownloadDropDown(updateUI);  
        }
        else if(onTouchFlag === 2)
        {
          
          onTouchFlag = 0;
          var updateUI = onTouchFlag;
          this.view.portfolioDetails.closeDownloadDropDown(updateUI);
        }
		
		// IW-3225 --start- Bharath
      if(this.view.accountListMenu.isVisible === true){
        this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
        this.view.flxAccountList.setVisibility(false);
        dropDownVisibility = true;
        this.view.accountListMenu.setVisibility(false);
      }
      else
      {
        dropDownVisibility = false;
      }// IW-3225 --end- Bharath 
        
        /*
         * controlFlag - This is to differentiate onClick/onTouchend of footer dropdown - its for onTouchend
         * scope_WealthPresentationController.isToggleSegmentVisible - This is to get whether the control has reached toggleSegmentVisibility of pagination footer comp method
         * paginationVisible -  This is whether user has clicked contents in pagination dropdown
        */
        
        if(controlFlag && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)){
          controlFlag =  false;
        }else{
          controlFlag = false;
          paginationVisible = false;
          scope_WealthPresentationController.isToggleSegmentVisible = false;
        }
        const buttons = document.getElementsByTagName("button");
        const buttonPressed = e => {
          console.log(e.target.id);  // Get ID of Clicked Element
          if(e.target.id &&  e['currentTarget'].textContent.includes("Page")){
            controlFlag = true; 
            paginationVisible = true;
            scope_WealthPresentationController.isToggleSegmentVisible = true;
          }
        }
        if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          for (let button of buttons) {
            button.addEventListener("touchend", buttonPressed);
          }
        } else{
          for (let button of buttons) {
            button.addEventListener("click", buttonPressed);
          }
        }

        var scope = this;
        setTimeout(function() {
          if (paginationVisible === false && scope_WealthPresentationController.isToggleSegmentVisible === false) {
            paginationVisible = false;
            scope.view.portfolioDetails.closePagination();
          }
        }, "17ms")
      },

      closeDropDownReports: function(drpDn){
        onTouchFlag = drpDn;
      },

	  // IW-3759 ---
      
      // Callback function
      PastProposal : function(response){
         var navManager = applicationManager.getNavigationManager();
        var rejectProposal =  navManager.getCustomInfo('isProposalRejected');
        this.view.investmentProposal.setData(response, rejectProposal);
      },
			
      InvestmentProposal:function(response){
        /*if(kony.application.getCurrentBreakpoint() === 1024){
        if(response.orderProposal !== undefined && response.orderProposal.length !== 0)
          this.view.flxReviewProposal.height = "320dp";
        else
          this.view.flxReviewProposal.height = "353dp";
          }*/
        var navManager = applicationManager.getNavigationManager();
        var rejectProposal =  navManager.getCustomInfo('isProposalRejected');
       // this.view.investmentProposal.setData(response, rejectProposal);
       // navManager.setCustomInfo("isProposalRejected", undefined);  
      },
      
        getAccount: function(portoId) {
            var acctLst = accountsListObj
            for (var l in acctLst) {
                if (portoId === acctLst[l].portfolioId) {
                    this.view.lblAccountTypes.text = CommonUtilities.truncateStringWithGivenLength(acctLst[l].accountName + "...", 26) + CommonUtilities.getLastFourDigit(acctLst[l].accountNumber)
                    portfolioId = portoId;
                }
            }
            scope_WealthPresentationController.isFirst = false;
            //wealthModule.setPortfolioId(this.view.lblAccountTypes.text);
        },

        /**
         *setActiveHeaderHamburger - Method to highlight active header and hamburger
         */
        setActiveHeaderHamburger: function() {
            this.view.customheadernew.activateMenu("Accounts", "My Accounts");
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        },
        /**
         * post show Method 
         */
        onBreakpointChange: function(form, width) {
           var isEuro = false;
            var configManager = applicationManager.getConfigurationManager();
            if (configManager.getBaseCurrency() === 'EUR') {
                isEuro = true;
            }
          else if(kony.i18n.getCurrentLocale() === 'es_ES'){
				isEuro = true;
			}
            var userId = applicationManager.getUserPreferencesManager().getUserId();
         //   this.view.portfolioDetails.setPortfolioId(portfolioId, userId, isEuro);
          
           responsiveUtils.onOrientationChange(this.onBreakpointChange, function() {
                 if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.flxPrimaryDetailsRow.layoutType = kony.flex.FLOW_VERTICAL;
				this.view.flxLeftContainer.width="100%";
				this.view.flxLeftContainer.left="0%";
				this.view.flxRightContainer.width="100%";
				this.view.flxRightContainer.left="0%";
				this.view.flxPrimaryDetailsRow.width="95%";
				this.view.flxPrimaryDetailsRow.left="2.5%";
				this.view.flxSecondaryDetailsRow.width="95%";
				this.view.flxSecondaryDetailsRow.left="2.5%";
				this.view.flxComponent.width="100%";
				this.view.flxComponent.left="0%";
            this.view.portfolioDetails.onBreakPointChangeComponent(kony.application.getCurrentForm(), kony.application.getCurrentBreakpoint(),portfolioId, userId, isEuro);
            }
      }.bind(this));
            this.view.customheadernew.onBreakpointChangeComponent(width);
            //this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.customfooter.onBreakpointChangeComponent(width);
            var flag = "";
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                flag = "horizontal";
            }
            this.view.totalAssets.onBreakpointChangeComponent(flag);
           
            this.view.portfolioDetails.onBreakPointChangeComponent(form, width,portfolioId, userId, isEuro,refCurrecny);
            this.changeUi();
             if ((this.view.flxCashCard.isVisible === true || this.view.flxAsset.isVisible === true)&&assets.assets!==undefined) {
                this.updateCashCard(assets, false);
            }
            this.setupFormOnTouchEnd(width);
           this.updateAccountList(accountsListObj);
           var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "appName": "HomepageMA",
                        "moduleName": "AccountsUIModule"
                    });
					 var isWealthUserMultiCustomer = accountsModule.presentationController.isWealthUserMultiCustomer;
			if (!isWealthUserMultiCustomer) {
                    this.view.flxBackToDashboard.isVisible = false;
                    this.view.imgLeftArrow.isVisible = false;
                    this.view.flxTopContainer.height = "48px";
					this.view.flxAccountTypesAndInfo.top = "64px";
					this.view.flxLeftContainer.top = "125px";
					this.view.flxRightContainer.top = "88px";
					
					
                }

        },
        setupFormOnTouchEnd: function(width) {
            var scope = this;
            if (width == 640) {
                this.view.onTouchEnd = function() {
                    scope.hideContextMenu();
                }
                this.nullifyPopupOnTouchStart();
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function() {
                        scope.hideContextMenu();
                    }
                    this.nullifyPopupOnTouchStart();
                } else {
                    this.view.onTouchEnd = function() {
                        scope.hidePopups();
                    }
                }
                var userAgent = kony.os.deviceInfo().userAgent;
                if (userAgent.indexOf("iPad") != -1) {
                    this.view.onTouchEnd = function() {
                        scope.hideContextMenu();
                      	scope.hidePopups();
                    }
                    this.nullifyPopupOnTouchStart();
                } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
                    this.view.onTouchEnd = function() {
                        scope.hideContextMenu();
                    }
                    this.nullifyPopupOnTouchStart();
                }
            }
        },
        hidePopups: function() {
            var currFormObj = kony.application.getCurrentForm();
            if (currFormObj.accountListMenu.isVisible === true) {
                if (currFormObj.accountListMenu.segAccountListActions.contentOffsetMeasured.y == 0) {
                    setTimeout(function() {
                      currFormObj.accountListMenu.isVisible = false;
                      currFormObj.flxAccountList.isVisible = false;
                        if (currFormObj.imgAccountTypes.src === "arrow_up.png" || currFormObj.imgAccountTypes.src === "chevron_up.png") {
                            currFormObj.imgAccountTypes.src = "arrow_down.png";
                        }
                    }, "17ms")
                }
            }
            this.hideContextMenu();
        },

        nullifyPopupOnTouchStart: function() {
            this.view.flxAccountTypes.onTouchStart = null;
        },

        changeUi: function(width) {
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.flxRightContainer.reverseLayoutDirection = true;
            //    this.view.accountListMenu.left = "30dp";
            //    this.view.accountListMenu.top = "50dp";
            } else {
                this.view.flxRightContainer.reverseLayoutDirection = false;
            }

        },

      viewInstrumentDetails: function(data) {
        scope_WealthPresentationController.instrumentAction = 'SearchInstrument';
        
        let paramsProdDetails = {
          "ISINCode": data.ISIN?data.ISIN:"",
          "RICCode": data.RICCode?data.RICCode:"",
          "instrumentId": data.instrumentId
        };
		if (data.application) {
           scope_WealthPresentationController.application = data.application;
           paramsProdDetails.application = data.application;
          }
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").setProductDetails(paramsProdDetails);
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").setDetailsOfInstrument(data);
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").flow="";
         new kony.mvc.Navigation({
                    "appName": "WealthOrderMA",
                    "friendlyName": "frmProductDetails"
                }).navigate();
      },

        getCashCardDetails: function() {
            var params = {
                "portfolioId": portfolioId
            };
            applicationManager.getPresentationUtility().showLoadingScreen();
            var wealthModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("WealthPortfolioUIModule");
            wealthModule.presentationController.getCashBalanceDetails(params);
        },
        getAccountListDetails: function() {
            if (this.view.accountListMenu.isVisible === false && dropDownVisibility === false) { // IW- 3225 bharath
                this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_UP;
                this.changeUi();
              this.view.flxAccountList.setVisibility(true);
                this.view.accountListMenu.setVisibility(true);
                this.updateAccountList(accountsListObj);


            } else {
                this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
                this.view.flxAccountList.setVisibility(false);
              this.view.accountListMenu.setVisibility(false);

            }
            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "appName": "HomepageMA",
                "moduleName": "AccountsUIModule"
            });
            var isWealthUserMultiCustomer = accountsModule.presentationController.isWealthUserMultiCustomer;
			 if (!isWealthUserMultiCustomer) {
				this.view.flxAccountList.top = "114px";
            }else{
				this.view.flxAccountList.top = "135px";
			}
        },


        updateCashCard: function(uidata, flag) {
            var data = uidata.cashAccounts;
            var asset = uidata.assets;
          var temp=Object.assign({}, uidata);
			assets=JSON.parse(JSON.stringify(temp));
            var currForm = kony.application.getCurrentForm();

            /*	this.view.flxInstrument.zIndex = 100;
                  this.view.flxInstrumentDetails.isVisible = true;*/
            var segdata = [];
            for (var list in data) {

                var storeData;
                storeData = {
                    balance: applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data[list].balance, data[list].currency),
                    referenceCurrVal: (data[list].referenceCurrencyValue!== "")?{"isVisible": true,"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data[list].referenceCurrencyValue, uidata.totalCashBalanceCurrency)}:{"isVisible": false,"text":""},
                    cashAccName: CommonUtilities.truncateStringWithGivenLength(data[list].accountName + "...", 26) + CommonUtilities.getLastFourDigit(data[list].accountNumber),
                  sep: {"height": "1Dp"}
                }
                if(list==data.length-1){
                                  storeData = {
                    balance: applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data[list].balance, data[list].currency),
                    referenceCurrVal: (data[list].referenceCurrencyValue!== "")?{"isVisible": true,"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data[list].referenceCurrencyValue, uidata.totalCashBalanceCurrency)}:{"isVisible": false,"text":""},
                    cashAccName: CommonUtilities.truncateStringWithGivenLength(data[list].accountName + "...", 26) + CommonUtilities.getLastFourDigit(data[list].accountNumber),
                  sep: { "height": "0Dp"}
                }
                }
                  if (storeData.referenceCurrVal.text == ""){
                    storeData.lblVer = "";
                }
                else{
                     storeData.lblVer = "|";
                }
                segdata.push(storeData);
            }
            this.view.segmentCashBal.widgetDataMap = {
                lblBalAmount: "balance",
                lblRerfCashAmount: "referenceCurrVal",
                lblCashAccountName: "cashAccName",
                lblVertical: "lblVer",
                lblSeparator1:"sep"
            }
            this.view.segmentCashBal.setData(segdata);
          if (uidata.totalCashBalance !== ""){
             this.view.lblAccountVal.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(uidata.totalCashBalance, uidata.totalCashBalanceCurrency);
          }
           else{
             if(data.length == 1 && data[0].referenceCurrencyValue==""){
               this.view.lblAccountVal.text =  applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data[0].balance, data[0].currency);
             }
             else{
             this.view.lblAccountVal.text = "";
             }
           }
          scope_WealthPresentationController.cashBalance = this.view.lblAccountVal.text;          
            currForm.forceLayout();
            if (data.length > 1 ) {
           
                this.view.segmentCashBal.setVisibility(true);
                this.view.lblSeparator1.isVisible = true;
                this.view.lblSep.isVisible = false;
            } else {
                this.view.segmentCashBal.setVisibility(false);
                this.view.lblSeparator1.isVisible = false;
                this.view.lblSep.isVisible = true;
            }
            if (asset.length > 0) {
                this.setGraphData(uidata);
            } else {
              uidata.error="No Data";
                this.setGraphData(uidata);
            }
            if (data.length === 0) {
                this.view.flxCashCard.setVisibility(false);
            }
			//if(flag && portfolioservicesdone===0){
          if(flag){
			cashCardServiceFlag=0;
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			}
        },


        navigateToConvertCurr: function() {
			var navManager = applicationManager.getNavigationManager();
			if(scope_WealthPresentationController.isJointAccount === false){
			navManager.setCustomInfo("frmCurrencyConverter", portfolioId);
			new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmCurrencyConverter"}).navigate();
			}
		},


        /**
         * Component setGraphData
         * Create Dounut chart and bind data
         */
        setGraphData: function(uidata) {
            this.view.totalAssets.createDonutChart(uidata);
        },

//This has been added for defect IW-3253
        goToTransfer: function() {
            var scope = this;
            var configurationManager = applicationManager.getConfigurationManager();
          if(scope_WealthPresentationController.isJointAccount === false){
            if (configurationManager.getDeploymentGeography() === "EUROPE" && this.isTransfersAndPayEnabledEur()) {
               kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "TransferEurUIModule", "appName" : "TransfersMA"}).presentationController.showTransferScreen({
                    context: "MakePaymentOwnAccounts",
                    isTransferCashWealth: true
                });
            } else if(configurationManager.getDeploymentGeography() !== "EUROPE" && this.isTransfersAndPayEnabled()){
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "TransferFastUIModule", "appName" : "TransfersMA"}).presentationController.showTransferScreen({
                    isTransferCashWealth: true
                });
            }
          }
        },


      isTransfersAndPayEnabled:function(){
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
        },
      
      isTransfersAndPayEnabledEur:function(){
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
        },
        updateAccountList: function(accountList) {

            var data = accountList;
            var currForm = kony.application.getCurrentForm();
            /*	this.view.flxInstrument.zIndex = 100;
            this.view.flxInstrumentDetails.isVisible = true;*/
          var portfolioCodeArray = {};
            var segdata = [];
            for (var list in data) {

                var storeData;
                storeData = {
                    acctName:{ "text":CommonUtilities.truncateStringWithGivenLength(data[list].accountName + "...", 26) + CommonUtilities.getLastFourDigit(data[list].accountNumber),
                    "onTouchEnd": function(event, context) {
                        this.onInvestmentAccountSelect(event, context);
                    }.bind(this)
                },

                    flx: {
                        "onClick": function(event, context) {
                            this.onInvestmentAccountSelect(event, context);
                        }.bind(this)
                    },
					  flxUser: {
                        "onTouchEnd": function(event, context) {
                        this.onInvestmentAccountSelect(event, context);
                    }.bind(this)
                    },
                    
                    portfolioId: data[list].portfolioId,
                   referenceCurrency: data[list].referenceCurrency,
                  investmentType:data[list].investmentType,
                  isJointAccount:data[list].isJointAccount
                }
                segdata.push(storeData);
              portfolioCodeArray[data[list].portfolioId] = data[list].portfolioCode;
              
            }
          scope_WealthPresentationController.contextId =  portfolioCodeArray;
            this.view.accountListMenu.segAccountListActions.widgetDataMap = {
                lblUsers: "acctName",
                flxPortfolioList: "flx",
                flxUser:"flxUser",
                dummyId: "portfolioId"
            }
            this.view.accountListMenu.segAccountListActions.setData(segdata);
            currForm.forceLayout();
        },

        onInvestmentAccountSelect: function(event, context) {
            this.view.imgAccountTypes.src = ViewConstants.IMAGES.ARRAOW_DOWN;
            var rowIndex = this.view.accountListMenu.segAccountListActions.selectedRowIndex[1];
            var rowData = this.view.accountListMenu.segAccountListActions.data[rowIndex];
           scope_WealthPresentationController.portfolioManagedSince = rowData.portfolioManagedSince;
	    var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
	    wealthModule.setPortfolioId(rowData.portfolioId);
            if (portfolioId === rowData.portfolioId) {
              this.view.flxAccountList.setVisibility(false);
                this.view.accountListMenu.setVisibility(false);
            } else {
                portfolioId = rowData.portfolioId;
              this.view.flxAccountList.setVisibility(false);
                this.view.accountListMenu.setVisibility(false);
	                this.checkPermission();
                if(rowData.investmentType === "Advisory"){
                  scope_WealthPresentationController.isAdvisory = true;
                  scope_WealthPresentationController.isInvestmentAccount = false;
                  this.view.flxInstrument.setVisibility(false);
                  this.view.flxAsset.top = "40dp";
                  this.view.flxAssetAllocation.top = "40dp";
                }
                else
                {
                  scope_WealthPresentationController.isAdvisory = false;
                  scope_WealthPresentationController.isInvestmentAccount = true;
                  this.view.flxInstrument.setVisibility(true);
                  this.view.flxAsset.top = "15dp";
                  this.view.flxAssetAllocation.top = "20dp";
                }
              	if (rowData.isJointAccount === "true") {
					scope_WealthPresentationController.isJointAccount = true;
					
				}else{
					scope_WealthPresentationController.isJointAccount = false;
				}
                var parm ={
                    "objectServiceName": "PortfolioServicing",
                    "operationName": "getAllocation",
                    "objectName": "PortfolioDetails",
                    "Criteria": { "portfolioId": portfolioId }                    
                };
                this.view.assetAllocation.setServiceParm(parm, this.onApiFailureCallback.bind(this));
              this.postShow();
                if(this.view.btnTab1.isVisible === true){
                 this.portfolioSummaryAction();
                }
                var isEuro = false;
                var configManager = applicationManager.getConfigurationManager();
                if (configManager.getBaseCurrency() === 'EUR') {
                    isEuro = true;
                }
              else if(kony.i18n.getCurrentLocale() === 'es_ES'){
				isEuro = true;
			}
                var userId = applicationManager.getUserPreferencesManager().getUserId();
               var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
               wealthModule.setPortfolioId(portfolioId);
              refCurrecny=rowData.referenceCurrency;
               wealthModule.setPortfolioCurrency(rowData.referenceCurrency);
                this.view.instrumentSearch.setPortfolioId(portfolioId);
                this.view.portfolioDetails.setPortfolioId(portfolioId, userId, isEuro, refCurrecny);
                this.view.lblAccountTypes.text = rowData.acctName.text;
            }
        },

        portfolioLevelChartService: function() {
            let filterValues = Object.keys(this.chartFilters).map(key => this.chartFilters[key]);
            this.view.investmentLineChart.setChartFilters(filterValues);
            //this.view.investmentLineChart.currentFilter = "1M";
            var params = {
                "portfolioId": portfolioId,
                "navPage": "Portfolio",
                "graphDuration": "OneM"
            };
            applicationManager.getPresentationUtility().showLoadingScreen();
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            wealthModule.getCashBalanceDetails(params);
        },
      
      getPortfolioDetails: function(){
            let filterValues = Object.keys(this.chartFilters).map(key => this.chartFilters[key]);
            this.view.investmentLineChart.setChartFilters(filterValues);
         //   this.view.investmentLineChart.currentFilter = "1M";
            var params = {
                "portfolioId": portfolioId,
                "navPage": "Portfolio",
                "graphDuration": ""
            };
        applicationManager.getPresentationUtility().showLoadingScreen();
            var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
            wealthModule.getCashBalanceDetails(params);
      },
      
        hideContextMenu: function() {
            var currFormObj = kony.application.getCurrentForm();
            if (currFormObj.portfolioDetails.contextualMenuVisibility()) {
                setTimeout(function() {
                    currFormObj.portfolioDetails.hideContextualMenu();
                }, "17ms")
            }
        },
        checkPermission: function() {
            var configManager = applicationManager.getConfigurationManager();
          var checkUserPermission = function (permission) {
            return configManager.checkUserPermission(permission);
          }; 
           var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
           var isPortfolioHealthView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_HEALTH_VIEW");
           var isPortfolioInvestmentProposalView = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_VIEW");
		   var isPortfolioReviewStrategyView = applicationManager.getConfigurationManager().checkUserPermission("PORTFOLIO_REVIEW_STRATEGY_VIEW");
	       var isPortfolioInvestmentProposalPastProposalView = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_PAST_PROPOSAL_VIEW");
		   var isPortfolioInvestmentProposalNewProposalView = applicationManager.getConfigurationManager().checkUserPermission("INVESTMENT_PROPOSAL_NEW_PROPOSAL_VIEW");

          
            let self = this;
            //Portfolio Details page Permission
 			
            self.view.flxHealthCheck.isVisible = isPortfolioHealthView;
          
          if(!isPortfolioHealthView && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)){
            self.view.flxAdvisoryDetails.width ="95%";
            self.view.flxStrategy.width = "100%";
            self.view.flxReviewProposal.width = "95%";
             self.view.flxStrategy.left = "0%";
          }
     else{
	if(!isPortfolioHealthView){
      
            self.view.flxAdvisoryDetails.width = "48%";
                    self.view.flxAdvisoryDetails.left = "4px";
                    self.view.flxStrategy.width = "100%";
                    self.view.flxReviewProposal.width = "48%";
                    self.view.flxReviewProposal.left = "2%";
      
        }
     }

          self.view.flxReviewProposal.isVisible = isPortfolioInvestmentProposalView;
	if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
      if(!isPortfolioInvestmentProposalView){
         self.view.flxHealthCheck.width = "48%";
         self.view.flxHealthCheck.left = "0%";
      }
      if(!isPortfolioInvestmentProposalView && !isPortfolioReviewStrategyView){
        self.view.flxAdvisoryDetails.width = "95%";
        self.view.flxHealthCheck.width = "100%";
        self.view.PortfolioHealthCheck.setDataPointsWidth("150px");
      }
    }
     
     else{
          if(!isPortfolioInvestmentProposalView){
            self.view.flxHealthCheck.width = "48%";
            self.view.flxAdvisoryDetails.width ="100%";
            self.view.flxStrategy.width = "48%";  
             self.view.flxStrategy.left = "1%";  
            self.view.flxAdvisoryDetails.left = "1%";
            self.view.PortfolioHealthCheck.setDataPointsWidth("82px");
            		}
          }
//           if(!isPortfolioInvestmentProposalView && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)){
//             self.view.flxHealthCheck.width = "48%";
//              self.view.flxHealthCheck.left = "0%";
//           }
//           else{
//           if(!isPortfolioInvestmentProposalView){
//             self.view.flxHealthCheck.width = "48%";
//             self.view.flxAdvisoryDetails.width ="100%";
//             self.view.flxStrategy.width = "48%";  
//              self.view.flxStrategy.left = "1%";  
//             self.view.flxAdvisoryDetails.left = "1%";
// 		}
//           }

          self.view.flxStrategy.isVisible = isPortfolioReviewStrategyView;
          
          if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
      if(!isPortfolioReviewStrategyView){
        self.view.flxAdvisoryDetails.width ="95%";
        self.view.flxHealthCheck.width = "100%";
        self.view.flxReviewProposal.width = "95%";
        self.view.PortfolioHealthCheck.setDataPointsWidth("150px");
      }
      if(!isPortfolioHealthView && !isPortfolioReviewStrategyView){
        self.view.flxAdvisoryDetails.width = "95%";
        self.view.flxStrategy.width = "100%";
        self.view.flxStrategy.left ="0%";
        self.view.flxReviewProposal.width = "95%";
      }
    }
     
     else{
          if(!isPortfolioReviewStrategyView){
            self.view.flxHealthCheck.width = "100%";
            self.view.flxAdvisoryDetails.width ="48%";
            self.view.flxReviewProposal.width = "48%";  
            self.view.flxReviewProposal.left = "1%";  
            self.view.flxAdvisoryDetails.left = "1%";
            self.view.PortfolioHealthCheck.setDataPointsWidth("82px");
            }
          
  	
//            if(!isPortfolioReviewStrategyView && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)){
//             self.view.flxAdvisoryDetails.width ="95%";
//             self.view.flxHealthCheck.width = "100%";
//             self.view.flxReviewProposal.width = "95%";
//           }
//           else{
//           if(!isPortfolioReviewStrategyView){
//             self.view.flxHealthCheck.width = "100%";
//             self.view.flxAdvisoryDetails.width ="48%";
//             self.view.flxReviewProposal.width = "48%";  
//              self.view.flxReviewProposal.left = "1%";  
//             self.view.flxAdvisoryDetails.left = "1%";
//           }
//           }
     if(!isPortfolioHealthView && !isPortfolioReviewStrategyView){
       self.view.flxReviewProposal.width = "98%";
       self.view.flxReviewProposal.left = "0%";
       self.view.flxAdvisoryDetails.width = "0%";
     }
          
     if(!isPortfolioHealthView && !isPortfolioInvestmentProposalView){
       self.view.flxStrategy.width = "98%";
       self.view.flxStrategy.left = "0%";
      
     }
          
      if(!isPortfolioInvestmentProposalView && !isPortfolioReviewStrategyView){
       self.view.flxHealthCheck.width = "98%";
       self.view.flxHealthCheck.left = "0%";
       self.view.flxAdvisoryDetails.width = "100%";
       self.view.PortfolioHealthCheck.setDataPointsWidth("250px");

     }}

            self.view.investmentProposal.btnPastProposal.isVisible = isPortfolioInvestmentProposalPastProposalView;
	if (!isPortfolioInvestmentProposalPastProposalView) {
          self.view.investmentProposal.btnReviewNew.centerY = "50%";
      		self.view.investmentProposal.btnReviewNew.centerX = "50%";
        }
    		self.view.investmentProposal.btnNoAdvPastProposal.isVisible = isPortfolioInvestmentProposalPastProposalView;


        self.view.investmentProposal.btnReviewNew.isVisible = isPortfolioInvestmentProposalNewProposalView;
          
          //WIW-466 - If no view access, then no need of message and Green new Advice label at top.
          self.view.investmentProposal.flxNewAdvice.setVisibility(isPortfolioInvestmentProposalNewProposalView);
          self.view.investmentProposal.lblAdvice.setVisibility(isPortfolioInvestmentProposalNewProposalView);
          

        if (!isPortfolioInvestmentProposalNewProposalView) {
          if(kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
            self.view.investmentProposal.btnPastProposal.centerX = "50%";
          } else {
            self.view.investmentProposal.btnPastProposal.top = "55px";
          	self.view.investmentProposal.btnPastProposal.centerX = "50%";
          }
          
        }

          
            let portfolioDetailViewPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_PORTFOLIO_DETAILS_SUMMARY_VIEW");

            self.view.btnTab1.isVisible = portfolioDetailViewPermission;
            self.view.flxPortofolioValues.isVisible = portfolioDetailViewPermission;
            self.view.flxPortofolioLineChart.isVisible = portfolioDetailViewPermission;
            self.view.flxSeparator2.isVisible = portfolioDetailViewPermission;
            self.view.flxSeparatorInvestment.isVisible = portfolioDetailViewPermission;

            let portfolioDetailAccountViewPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_PORTFOLIO_DETAILS_ACCOUNT_INFO_VIEW");
            self.view.btnTab2.isVisible = portfolioDetailAccountViewPermission;
            if (!self.view.btnTab1.isVisible) {
                self.view.flxAccountInfoValues.isVisible = portfolioDetailAccountViewPermission;
                self.accountInfoAction();
            } else {
                self.portfolioSummaryAction();
            }
            if (!self.view.btnTab1.isVisible && !self.view.btnTab2.isVisible) {
                self.view.flxPortfolio.isVisible = false;
            }

            let portfolioDetailCashbalancePermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_PORTFOLIO_DETAILS_CASH_BALANCE_VIEW");
            let btnTransferCashPermission = applicationManager.getConfigurationManager().checkUserFeature("WEALTH_CASH_MANAGEMENT") && configManager.getTransferCashPermission().some(checkUserPermission);
            let btnConvertCurrencyPermission = applicationManager.getConfigurationManager().checkUserFeature("WEALTH_CASH_MANAGEMENT") && configManager.getConvertCurrencyPermission().some(checkUserPermission);
            let cashBalanceDetailsPermission = applicationManager.getConfigurationManager().checkUserFeature("WEALTH_CASH_MANAGEMENT") && configManager.getCashBalanceViewPermission().some(checkUserPermission);
                    
            self.view.segmentCashBal.isVisible = cashBalanceDetailsPermission;

            self.view.flxCashCard.isVisible = portfolioDetailCashbalancePermission;
            self.view.lblConvertCurrency.isVisible = (btnConvertCurrencyPermission && !scope_WealthPresentationController.isJointAccount) ;
            
            self.view.lblTransferCash.isVisible = (btnTransferCashPermission && !scope_WealthPresentationController.isJointAccount);

      let portfolioDetailAssetAllocationPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_PORTFOLIO_DETAILS_ASSET_ALLOCATION_VIEW");
      //IW-3843- Parthiban
      if(flagAsset === 0){
        self.view.flxAsset.isVisible = (scope_WealthPresentationController.isMockIntegration||scope_WealthPresentationController.isTAPIntegration)?false:portfolioDetailAssetAllocationPermission;
        flagAsset = 1;
      }
      //IW-3843- Parthiban
      let portfolioDetailProductDetailsPermission = applicationManager.getConfigurationManager().checkUserFeature("WEALTH_PRODUCT_DETAILS") && configManager.getPortfolioProductSearchViewPermissions().some(checkUserPermission);
      let portfolioDetailWatchListPermission = applicationManager.getConfigurationManager().checkUserFeature("WEALTH_WATCHLIST") && configManager.watchlistViewInstrumentPermissions().some(checkUserPermission);

            self.view.flxInstrument.isVisible = (portfolioDetailProductDetailsPermission && !scope_WealthPresentationController.isAdvisory);
            self.view.btnViewFavorite.isVisible = portfolioDetailWatchListPermission;
        }      
     
    };
});