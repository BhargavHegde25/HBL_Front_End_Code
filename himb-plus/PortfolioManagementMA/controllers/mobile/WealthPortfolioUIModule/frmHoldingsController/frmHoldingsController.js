define({
  //Global Variables
  sortByCustomData: "",
  totalValue: "",
  navigationFlag: "",
  selectedRicCode: "",
  ISINCode: "",
  holdingsId: "",
  permission: {},
  /**
     form init function
  **/
  init: function() {
    try {
      this.view.preShow = this.preShow;
      this.view.onHide = this.onHide;
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
      this.initActions();
    } catch (err) {
      this.setError(err, "init");
    }
  },
  /**
     form preShow
   */
  preShow: function() {
    try {
      this.flag = true;
      scope_WealthPresentationController.depositoryId = "";
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("holdingsPage", this.flag);
      scope_WealthPresentationController.searchInstrumentForm = "frmHoldings";
      this.flag = false;
      this.view.flxAdditionalOptions.setVisibility(false);
      this.sortByCustomData = navManager.getCustomInfo("frmSortBy");
      var configManager = applicationManager.getConfigurationManager();
      if (configManager.getBaseCurrency() === 'EUR') {
        this.view.holdings.setEuroFlow(true);
      } else {
        this.view.holdings.setEuroFlow(false);
      }
      this.view.holdings.getHoldingsTopDetails(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioDetails);
      var params = {
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
        "navPage": "Holdings",
        "searchByInstrumentName": " ",
      };
      if (scope_WealthPresentationController.isOpenOrdersIncluded) {
        if (scope_WealthPresentationController.sortByValueHoldingsIncludeOrders === "") {
          params.sortBy = "description";
        } else {
          params.sortBy = scope_WealthPresentationController.sortByValueHoldingsIncludeOrders;
        }
      } else {
        if (scope_WealthPresentationController.sortByValueHoldingsExcludeOrders === "") {
          params.sortBy = "description";
        } else {
          params.sortBy = scope_WealthPresentationController.sortByValueHoldingsExcludeOrders;
        }
      }
      this.view.holdings.setContext(params);
      var data = {};
      navManager.setCustomInfo("frmInstrumentDetails", data);
      navManager.setCustomInfo("frmPortfolioDetails", false);
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
      this.view.flxAdditionalOptions.isVisible = false;
      this.checkPermission("Holdings");
      if (configManager.isMicroAppPresent("WealthOrderMA")) {
        this.view.holdings.setVisibleActionImage(true);
      } else {
        this.view.holdings.setVisibleActionImage(false);
      }
    } catch (err) {
      this.setError(err, "preShow");
    }
  },
  /**
   This method is triggered in the end when the form naviagtes
  **/
  onHide: function() {
    try {
      if (this.navigationFlag) {
        scope_WealthPresentationController.isOpenOrdersIncluded = false;
        scope_WealthPresentationController.sortByValueHoldingsIncludeOrders = "";
        scope_WealthPresentationController.sortByValueHoldingsExcludeOrders = "";
      }
    } catch (err) {
      this.setError(err, "onHide");
    }
  },
  /**
   * form initAction
   **/
  initActions: function() {
    try {
      this.view.holdings.onActionButtonClicked = this.contextualMenu;
      this.view.holdings.onRequestStart = function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
      };
      this.view.holdings.onRequestEnd = function() {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      };
      this.view.flxMore.onTouchEnd = this.onClickMoreOptions;
      this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    } catch (err) {
      this.setError(err, "initActions");
    }
  },
  /**
   * Method used to setup the visibility of buy,sell,view on actionSheet
   */
  contextualMenu: function(param, rowInfo) {
    try {
      this.navigationFlag = true;
      var data = {};
      var holdings = rowInfo.rowdetails;
      holdings.totalValue = rowInfo.totalValue;
      data.response = holdings;
      if(holdings.hasOwnProperty("depositoryId")){
        scope_WealthPresentationController.depositoryId = holdings.depositoryId;
      }else{
		scope_WealthPresentationController.depositoryId = "";
      }
      this.selectedRicCode = holdings.RICCode;
      this.ISINCode = holdings.ISIN;
      this.holdingsId = holdings.holdingsId;
      scope_WealthPresentationController.applicationId = holdings.application;
      var navManager = applicationManager.getNavigationManager();
      if (scope_WealthPresentationController.isOpenOrdersIncluded) {
        data.response = holdings.status === "" ? holdings : {};
      }
      navManager.setCustomInfo("frmInstrumentDetails", data);
      this.checkPermission("Holdings");
      if ((!this.permission["buy"] && !this.permission["sell"]) || (holdings.isAdvisory && holdings.isSecurityAsset === false) || holdings.application === "DX" || scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount) {
        this.permission["buy"] = false;
        this.permission["sell"] = false;
      } else {
        this.permission["buy"] = true;
        this.permission["sell"] = true;
      }
      this.setUpActionSheet("Holdings");
    } catch (err) {
      this.setError(err, "contextualMenu");
    }
  },
  /**
   * Method called upon on click of more option
   */
  onClickMoreOptions: function() {
    try {
      this.navigationFlag = false;
      this.setScrollability(false);
      this.checkPermission("MoreOptions");
      this.setUpActionSheet("MoreOptions");
    } catch (err) {
      this.setError(err, "onClickMoreOptions");
    }
  },
  /**
   * Method used to setup buy,sell,view on actionSheet
   */
  setUpActionSheet: function(triggerPoint) {
    try {
      if (triggerPoint === "Holdings") {
        this.view.flxAccounts.isVisible = this.permission["buy"];
        this.view.flxReport.isVisible = this.permission["sell"];
        this.view.lblPerformance.text = kony.i18n.getLocalizedString("i18n.wealth.view");
        this.view.lblAccounts.text = kony.i18n.getLocalizedString("i18n.wealth.buy");
        this.view.lblReport.text = kony.i18n.getLocalizedString("i18n.wealth.sell");
        this.view.flxPerformance.onTouchEnd = this.onClickView;
        this.view.flxAccounts.onTouchEnd = this.onClickBuy;
        this.view.flxReport.onTouchEnd = this.onClickSell;
        this.view.flxCancelOption.onTouchEnd = this.onClickHoldingsCancel;
      } else {
        this.view.flxReport.isVisible = true;
        this.view.flxAccounts.isVisible = false;
        this.view.lblPerformance.text = kony.i18n.getLocalizedString("i18n.wealth.downloadHoldings");
        this.view.lblReport.text = kony.i18n.getLocalizedString("i18n.wealth.sortBy");
        this.view.flxPerformance.onTouchEnd = this.navTodownloadForm;
        this.view.flxReport.onTouchEnd = this.onClickSortBy;
        this.view.flxCancelOption.onTouchEnd = this.onClickHoldingsCancel;
      }
      this.view.flxAdditionalOptions.isVisible = true;
    } catch (err) {
      this.setError(err, "setUpActionSheet");
    }
  },
  /**
   * Method used to navigate to Download form
   */
  navTodownloadForm: function() {
    try {
      this.setScrollability(true);
      var navMan = applicationManager.getNavigationManager();
      scope_WealthPresentationController.searchInst = this.view.holdings.getCriteriaObjValue().searchByInstrumentName;
      navMan.navigateTo("frmDownload");
    } catch (err) {
      this.setError(err, "nav");
    }
  },
  /**
   * Method is called on click of view button
   */
  onClickView: function() {
    try {
      this.setScrollability(true);
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").instrumentDetailsEntry = true;
      this.callOnNavigate('view');
      this.flag = false;
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("holdingsPage", this.flag);
    } catch (err) {
      this.setError(err, "onClickView");
    }
  },
  /**
   * Method is called on click of buy button
   */
  onClickBuy: function() {
    try {
      this.setScrollability(true);
      this.callOnNavigate('buy');
    } catch (err) {
      this.setError(err, "onClickBuy");
    }
  },
  /**
   * Method is called on click of sell button
   */
  onClickSell: function() {
    try {
      this.setScrollability(true);
      this.callOnNavigate('sell');
    } catch (err) {
      this.setError(err, "onClickSell");
    }
  },
  /**
   * Method used to navigate based on view,buy,sell
   */
  callOnNavigate: function(selectedHoldings) {
    try {
      var navManager = applicationManager.getNavigationManager();
      this.navigationFlag = true;
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").searchEntryPoint = false;
      scope_WealthPresentationController.isFrmWatchlist = false;
      scope_WealthOrderPresentationController.navForm = "frmHoldings";
      var param = {
        "ISINCode": this.ISINCode ? this.ISINCode : '',
        "RICCode": this.selectedRicCode ? this.selectedRicCode : '',
        "instrumentId": this.holdingsId
      };
      if (scope_WealthPresentationController.applicationId) {
        param.application = scope_WealthPresentationController.applicationId;
      }
      var selData = {
        'selHoldings': selectedHoldings,
      };
      navManager.setCustomInfo("frmHoldings", selData);
      scope_WealthOrderPresentationController.isFrmWatchlist = false;
      scope_WealthPresentationController.watchlistFlow = null;
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getInstrumentDetails(param);
    } catch (err) {
      this.setError(err, "callOnNavigate");
    }
  },
  /**
   * Method used to close the ActionSheet
   */
  onClickHoldingsCancel: function() {
    try {
      this.setScrollability(true);
      this.view.flxAdditionalOptions.isVisible = false;
    } catch (err) {
      this.setError(err, "onClickHoldingsCancel");
    }
  },
  /**
   * Method used to call downloadService
   */
  onClickDownloadTxns: function() {
    try {
      this.setScrollability(true);
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams = this.view.holdings.getCriteriaObjValue();
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.navPage = "Holdings";
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getDownloadList(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
    } catch (err) {
      this.setError(err, "onClickDownloadTxns");
    }
  },
  /**
   * Method used by the SocialShare comp for converting base64string into pdf
   */
  onClickDownloadMessage: function(base64String, filename) {
    try {
      this.view.flxPopup.setVisibility(false);
      this.view.flxAdditionalOptions.isVisible = false;
      this.view.socialshare.shareWithBase64(base64String, filename);
    } catch (error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  /**
   * Method used to navigate back to frmPortfolioDetails form
   */
  navigateCustomBack: function() {
    this.navigationFlag = true;
    var navMan = applicationManager.getNavigationManager();
    //WIW-1836 defect fix
    var lastForm = navMan.stack[navMan.stack.length - 1];
	if(lastForm === "frmHoldings"){
		 navMan.stack.pop();
	 }
    navMan.navigateTo("frmPortfolioDetails");
  },
  /**
   * Method used to set the scrollability of the flxscroll
   */
  setScrollability: function(isSet) {
    this.view.flxHeader.setEnabled(isSet);
    this.view.flxScroll.setEnabled(isSet);
    this.view.flxScroll.enableScrolling = isSet;
  },
  /**
   * Method used to navigate to Sortby form 
   */
  onClickSortBy: function() {
    try {
      this.setScrollability(true);
      var data = {};
      var navManager = applicationManager.getNavigationManager();
      if (scope_WealthPresentationController.isOpenOrdersIncluded) {
        if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsIncludeOrders === "") {
          data.sortByValue = "description";
        } else {
          data.sortByValue = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsIncludeOrders;
        }
      } else {
        if (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsExcludeOrders === "") {
          data.sortByValue = "description";
        } else {
          data.sortByValue = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueHoldingsExcludeOrders;
        }
      }
      navManager.setCustomInfo("frmHoldings", data);
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.commonFunctionForNavigation("frmSortBy");
    } catch (err) {
      this.setError(err, "onClickSortBy");
    }
  },
  /**
   * Method used to check view,buy,sell permissions
   */
  checkPermission: function(triggerPoint) {
    try {
      var configManager = applicationManager.getConfigurationManager();
      if (triggerPoint === "Holdings") {
        this.permission = [];
        this.permission["view"]= false;
        this.permission["buy"] = false;
        this.permission["sell"] = false;

        var checkUserPermission = function(permission) {
                        return applicationManager.getConfigurationManager().checkUserPermission(permission);
                    };
        var getPermissionDetails = JSON.parse(this.view.holdings.getFeaturesAndPermissions());
         if (typeof getPermissionDetails !== "undefined") {
                        if (getPermissionDetails.view.length > 0) {
                           var watchListViewPermission = configManager.watchlistViewInstrumentPermissions().some(checkUserPermission);
                            this.permission["view"] = watchListViewPermission;
                        }
                        if (getPermissionDetails.buy.length > 0) {
                           var watchListBuyPermission = configManager.buyOrderPermissions().some(checkUserPermission);
                            this.permission["buy"] = watchListBuyPermission;
                        }
                        if (getPermissionDetails.sell.length > 0) {
                           var watchListSellPermission = configManager.sellOrderPermissions().some(checkUserPermission);
                            this.permission["sell"] = watchListSellPermission;
                        }
         }
         if (this.permission["sell"] !== true && this.permission["buy"] !== true && this.permission["sell"] !== true ) {
                        this.view.holdings.setVisibleActionImage(false);
                    } else {
                        this.view.holdings.setVisibleActionImage(true);
                    }
       /* this.permission = [];
        var permList = ["view", "buy", "sell"];
        var hasMinOnePermission = false;
        var getPermissionDetails = JSON.parse(this.view.holdings.getFeaturesAndPermissions());
        /*if (typeof getPermissionDetails !== "undefined") {
          for (var permission in permList) {
            if (getPermissionDetails[permList[permission]].length) {
              var isPermitted = configManager.checkAtLeastOnePermission(getPermissionDetails[permList[permission]]);
              this.permission[permList[permission]] = isPermitted;
              if (isPermitted) {
                hasMinOnePermission = true;
              }
            }
          }
        }*/

       // this.view.holdings.setVisibleActionImage(hasMinOnePermission);
      }
    } catch (err) {
      this.setError(err, "checkPermission");
    }
  },
  /**
   * Method used to print error
   */
  setError: function(errorMsg, method) {
    var scope = this;
    var errorObj = {
      "method": method,
      "error": errorMsg
    };
    var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
    wealthModule.onError(errorObj);
  }
});
