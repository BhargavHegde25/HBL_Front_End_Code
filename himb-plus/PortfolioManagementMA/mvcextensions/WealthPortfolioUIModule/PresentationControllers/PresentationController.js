define(['CommonUtilities'], function(CommonUtilities) {
  /**
     * User defined presentation controller
     * @constructor 
     * @extends kony.mvc.Presentation.BasePresenter
     */
  function Wealth_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    scope_WealthPresentationController = this;
    scope_WealthPresentationController.isFirst = true;
    scope_WealthPresentationController.isQuestionnaireFlow = false;
    scope_WealthPresentationController.jointAccountDetails = {};
    scope_WealthPresentationController.isJointAccount = false;
    scope_WealthPresentationController.instrumentAction = '';
    scope_WealthPresentationController.portfolioTotalValue = '';
    scope_WealthPresentationController.portfolioTotalValueCurr = '';
    scope_WealthPresentationController.selectedInstrDetails = {};
    scope_WealthPresentationController.selectedCurrencies = [];
    scope_WealthPresentationController.viewOrdersTab = false;
    scope_WealthPresentationController.holdingsType = "";
    scope_WealthPresentationController.tradeCurrency = "";
    scope_WealthPresentationController.priceCurrency = "";
    scope_WealthPresentationController.instrumentId = "";
    scope_WealthPresentationController.quantity = "0";
    scope_WealthPresentationController.currentPosition = "0.00";
    scope_WealthPresentationController.cashBalance = "";
    scope_WealthPresentationController.reload = "";
    scope_WealthPresentationController.watchlistFromPortfolio = "";
    scope_WealthPresentationController.isTAPIntegration = false;
    scope_WealthPresentationController.isAdvisory = false;
    scope_WealthPresentationController.isInvestmentAccount = false;
    scope_WealthPresentationController.ishealthcheck = false;
    scope_WealthPresentationController.isStrategyAllocation = false;
    scope_WealthPresentationController.investmentChartCurrency = "$";
    scope_WealthPresentationController.priceChartCurrency = "";
    scope_WealthPresentationController.application = "";
    scope_WealthPresentationController.computedStrategy = {};
    scope_WealthPresentationController.score = "";
    scope_WealthPresentationController.contextId = "";
    scope_WealthPresentationController.strategyName = "";
    scope_WealthPresentationController.funcResultCode = "";
    scope_WealthPresentationController.questionnaireHistoCode = "";
    scope_WealthPresentationController.rtlLocale = ["ar_AE"];
    scope_WealthPresentationController.orginalAssetArray = "";
    scope_WealthPresentationController.isOpenOrdersIncluded = false;
    scope_WealthPresentationController.isOpenOrdersIncludedflag = false;
    scope_WealthPresentationController.isToggleSegmentVisible = false;
    scope_WealthPresentationController.displayNameLength = "";
    scope_WealthPresentationController.portfolioManagedSince = "";
    scope_WealthPresentationController.depositoryId = "";
    scope_WealthPresentationController.selectedCustomerID = "";
    scope_WealthPresentationController.jointHolderName = "";
    scope_WealthPresentationController.wealthBankDate = "";


    this.portofId = '';
    this.accObj = {};
    this.instrumentDetails={};
    this.instrumentPricingData={};
    this.instrumentCurrentPosition={};
    this.prodParamDetails={};
    this.instruDetails={};
    this.portfolioCurrency = "";
   
    //
  }

  inheritsFrom(Wealth_PresentationController, kony.mvc.Presentation.BasePresenter);

  this.ISIN = "";
  this.RICCode = "";
  this.navPage = "";
  this.instrumentId = "";
  Wealth_PresentationController.prototype.getPortfolioCurrency = function() {
    return this.portfolioCurrency;
  };

  Wealth_PresentationController.prototype.setPortfolioCurrency = function(params) {
    this.portfolioCurrency = params;
  };
  
  Wealth_PresentationController.prototype.getProductDetails = function() {
    return this.prodParamDetails;
  };
  
    Wealth_PresentationController.prototype.setProductDetails = function(params) {
    this.prodParamDetails = params;
  };
  
    Wealth_PresentationController.prototype.getDetailsOfInstrument = function() {
    return this.instruDetails;
  };
  
    Wealth_PresentationController.prototype.setDetailsOfInstrument = function(params) {
    this.instruDetails = params;
  };
  
  Wealth_PresentationController.prototype.getPortfolioId = function() {
    return this.portofId;
  };

  Wealth_PresentationController.prototype.setPortfolioId = function(params) {
    this.portofId = params;
  };
  Wealth_PresentationController.prototype.getPortfolioCurrency = function() {
    return this.portfolioCurrency;
  };

  Wealth_PresentationController.prototype.setPortfolioCurrency = function(params) {
    this.portfolioCurrency = params;
  };
  Wealth_PresentationController.prototype.getAccountsListObj = function() {
    return this.accObj;
  };

  Wealth_PresentationController.prototype.setAccountsListObj = function(params) {
    this.accObj = params;
  };
  
   Wealth_PresentationController.prototype.getInstrumentDetails = function() {
    return this.instrumentDetails;
  };

  Wealth_PresentationController.prototype.setInstrumentDetails = function(params) {
    this.instrumentDetails = params;
  };
  
   Wealth_PresentationController.prototype.getInstrumentPricingData = function() {
    return this.instrumentPricingData;
  };

  Wealth_PresentationController.prototype.setInstrumentPricingData = function(params) {
    this.instrumentPricingData = params;
  };
  
    Wealth_PresentationController.prototype.getInstrumentCurrentPosition = function() {
    return this.instrumentCurrentPosition;
  };

  Wealth_PresentationController.prototype.setInstrumentCurrentPosition = function(params) {
    this.instrumentCurrentPosition = params;
  };
  
  /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
  Wealth_PresentationController.prototype.initializePresentationController = function() {

  };

  //   Wealth_PresentationController.prototype.fetchStockDetails=function(){

  //     var navManager = applicationManager.getNavigationManager();
  //     if(kony.application.getCurrentForm().id ==="frmInstrumentDetails"){
  //       var data = navManager.getCustomInfo('frmTopNews');
  //       var stock = {};
  //       stock.flag = true;
  //       data.stock = stock;
  //       navManager.setCustomInfo('frmTopNews', data);
  //       navManager.navigateTo("frmTopNews");
  //     }
  //   };
  Wealth_PresentationController.prototype.getInstrumentsList=function(params){

    applicationManager.getWealthPortfolioManager().getSearchList(params,this.getInstrumentsListOnSuccess.bind(this), this.getInstrumentsListOnError.bind(this));


  };
  Wealth_PresentationController.prototype.getInstrumentsListOnSuccess=function(data){
    applicationManager.getNavigationManager().updateForm({
      InstrumentsList: data
    },"frmPortfolioOverview");
  };
  Wealth_PresentationController.prototype.getInstrumentsListOnError=function(){

  };

  


  Wealth_PresentationController.prototype.getCashBalanceDetails=function(params){
    //params = {"portfolioCode" : "T_AI_CMCPTF3"};
    applicationManager.getWealthPortfolioManager().getAssets(params, this.getCashBalanceDetailsOnSuccess.bind(this), this.getCashBalanceDetailsOnError.bind(this));
  };

  Wealth_PresentationController.prototype.getCashBalanceDetailsOnSuccess=function(data){
    let currentFormName = kony.application.getCurrentForm().id;
    let getNewCurrencies = scope_WealthPresentationController.selectedCurrencies;
    if(getNewCurrencies.length){
      data.cashAccounts = [
        ...data.cashAccounts,
        ...getNewCurrencies
      ];
    }
    scope_WealthPresentationController.portfolioTotalValue = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.instrumentTotal[0].marketValue, data.referenceCurrency);
    scope_WealthPresentationController.portfolioTotalValueCurr = data.referenceCurrency;
    if(applicationManager.getNavigationManager().getCurrentForm() != "frmPortfolioOverview")
      {
      applicationManager.getPresentationUtility().dismissLoadingScreen();   
      }
    if(currentFormName === "frmPlaceOrder"){
      let controller = applicationManager.getPresentationUtility().getController('frmPlaceOrder', true);
        scope_WealthPresentationController.cashBalance = data.totalCashBalance ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.totalCashBalance, data.totalCashBalanceCurrency) : "";
      controller.setCashBalance(data);    
    }
    else{
    applicationManager.getNavigationManager().updateForm({
      cashCurrencyList:data
    }, currentFormName);
      }
  };

 
  
  // Holdings List
  Wealth_PresentationController.prototype.getHoldings = function(params) {
    let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder"){
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getHoldingList(params, this.getHoldingsSuccess.bind(this), this.getHoldingsError.bind(this));
  };
  Wealth_PresentationController.prototype.getHoldingsSuccess = function(response) {
    //applicationManager.getPresentationUtility().dismissLoadingScreen();
     
    var navManager =  applicationManager.getNavigationManager();
    if (scope_WealthPresentationController.instrumentAction === 'Sell' || scope_WealthPresentationController.instrumentAction === 'Buy' || scope_WealthPresentationController.instrumentAction === 'Modify'){
    //  applicationManager.getPresentationUtility().dismissLoadingScreen();
      response.RICCode = this.RICCode;
     scope_WealthPresentationController.application = response.portfolioHoldings[0].application;
      navManager.updateForm({
        holdingsList: response
      }, 'frmPlaceOrder');
    } else {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (scope_WealthPresentationController.instrumentAction === 'SearchInstrument' || scope_WealthPresentationController.instrumentAction === 'Watchlist'){

        var dataCurrentPosition = navManager.getCustomInfo('frmProductDetails');
        if (dataCurrentPosition === undefined) {
          dataCurrentPosition = {};
        }
        if (response.portfolioHoldings.length>0){
          dataCurrentPosition.portfolioDetails = response.portfolioHoldings[0];
          scope_WealthPresentationController.application = response.portfolioHoldings[0].application;
        } else {
          dataCurrentPosition.portfolioDetails={};
        }
        navManager.setCustomInfo('frmProductDetails', dataCurrentPosition);

        applicationManager.getNavigationManager().updateForm({
          currentPosition:  dataCurrentPosition.portfolioDetails
        },"frmProductDetails");
      }else{

        applicationManager.getNavigationManager().updateForm({
          portfolioHoldingsList: response
        }, "frmPortfolioOverview");
      }
    }
  };
  
  Wealth_PresentationController.prototype.getHoldingsError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };


  //Transactions List
  Wealth_PresentationController.prototype.getTransactionDetails = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getTransactionList(params, this.getTransactionDetailsSuccess.bind(this), this.getTransactionDetailsError.bind(this));
  };
  Wealth_PresentationController.prototype.getTransactionDetailsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      portfolioTransactionList: response
    },"frmPortfolioOverview");

  };
  Wealth_PresentationController.prototype.getTransactionDetailsError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };

  
  Wealth_PresentationController.prototype.fetchInstrumentDetails=function(params){
    applicationManager.getWealthPortfolioManager().getIndexDetails(params,this.getIndexDetailsOnSuccess.bind(this), this.getIndexDetailsOnError.bind(this));
  };
  Wealth_PresentationController.prototype.getIndexDetailsOnSuccess=function(data){
    applicationManager.getNavigationManager().updateForm({
      InstrumentDetails: data
    },"frmProductDetails");
  };
  Wealth_PresentationController.prototype.getIndexDetailsOnError=function(){

  };
  Wealth_PresentationController.prototype.getCashCurrencyDetailsOnError=function(){

  };
  Wealth_PresentationController.prototype.fetchStockNews=function(params){
    applicationManager.getWealthPortfolioManager().getStockNewsDetails(params,this.getStocksOnSuccess.bind(this), this.getStocksOnError.bind(this));
  };
  Wealth_PresentationController.prototype.getStocksOnSuccess=function(data){
    applicationManager.getNavigationManager().updateForm({
      StockNews: data
    },"frmProductDetails");
  };
  Wealth_PresentationController.prototype.getStocksOnError=function(){

  };
  Wealth_PresentationController.prototype.fetchDocuments=function(params){
    applicationManager.getWealthPortfolioManager().getDocuments(params,this.getDocumentsOnSuccess.bind(this), this.getDocumentsOnError.bind(this));
  };
  Wealth_PresentationController.prototype.getDocumentsOnSuccess=function(data){
    applicationManager.getNavigationManager().updateForm({
      Documents: data
    },"frmProductDetails");
  };
  Wealth_PresentationController.prototype.getDocumentsOnError=function(){

  };
  //getPortfolioList
  Wealth_PresentationController.prototype.getPortfolioList = function(params) {
        this.setInstrumentCurrentPosition();
      this.setInstrumentPricingData(params);
      this.setInstrumentDetails();
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getPortfolioList(params, this.getPortfolioListSuccess.bind(this), this.getPortfolioListError.bind(this));
  };
  Wealth_PresentationController.prototype.getPortfolioListSuccess = function(obj) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_WealthPresentationController.jointAccountDetails = obj.PortfolioList;
    var data = {};
//    var marketData = {};
    data.response = obj;
//    marketData.response = obj.GetSimpleData_Response_2.SimpleDataResult ? obj.GetSimpleData_Response_2.SimpleDataResult.ItemResponse[0].Item : null;
    var controller = applicationManager.getPresentationUtility().getController('frmDashboard', true);
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmDashboard", data);
    if(data.response.isMockIntegration)
		scope_WealthPresentationController.isMockIntegration = true;
    else if(data.response.isTapIntegration)
      scope_WealthPresentationController.isTAPIntegration = true;
    //         var controller = applicationManager.getPresentationUtility().getController('CopyfrmAccountsLanding', true);
    //         controller.loadInvestmentAccounts(data);
    applicationManager.getNavigationManager().updateForm({
      InvestmentAccountsData: data
    },"frmDashboard");
    var currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName === "frmDashboard"){
       //controller.portfolioListLoaded();
    }
  };
  Wealth_PresentationController.prototype.getPortfolioListError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
     var currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName === "frmDashboard"){
       var controller = applicationManager.getPresentationUtility().getController('frmDashboard', true);
       //controller.portfolioListLoaded();
	   controller.disablePortfoliolist();
    }
    
  };
  //getAssetsList
  Wealth_PresentationController.prototype.getAssetsList = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getAssetsList(params, this.getAssetsListSuccess.bind(this), this.getAssetsListError.bind(this));
  };
  Wealth_PresentationController.prototype.getAssetsListSuccess = function(obj) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var data = {};
    data.response = obj;    
    var controller = applicationManager.getPresentationUtility().getController('frmDashboard', true);
    //frmDashboard
    controller.loadAssetsDetails(data);
  };
  Wealth_PresentationController.prototype.getAssetsListError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  }
  // get activity list
  Wealth_PresentationController.prototype.getRecentActivity = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getRecentActivity(params, this.getRecentActivitySuccess.bind(this), this.getRecentActivityError.bind(this));
  };
  Wealth_PresentationController.prototype.getRecentActivitySuccess = function(obj) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var data = {};
    data.response = obj;
    var controller = applicationManager.getPresentationUtility().getController('CopyfrmAccountsLanding', true);
    controller.loadActivityListData(data);
  };
  Wealth_PresentationController.prototype.getRecentActivityError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  /**
     * 
     **/
  Wealth_PresentationController.prototype.getDashboardGraphDetails = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getDashboardDetails(params, this.getDashboardDetailsSuccessCallback.bind(this), this.getDashboardDetailsErrorCallback.bind(this));
  };
  /**
     *
     **/
  Wealth_PresentationController.prototype.getDashboardDetailsSuccessCallback = function(obj) {
    var navManager = applicationManager.getNavigationManager();
    var data = {};
    data.response = obj;
    var controller = applicationManager.getPresentationUtility().getController('frmDashboard', true);
    controller.lineChartData(data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  /**
     *
     **/
  Wealth_PresentationController.prototype.getDashboardDetailsErrorCallback = function() {
    var data = {};
    data.response = {};
    var controller = applicationManager.getPresentationUtility().getController('frmDashboard', true);
    controller.lineChartData(data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Wealth_PresentationController.prototype.getPortfolioAndGraphDetails = function(params) {
     if(applicationManager.getNavigationManager().getCurrentForm() != "frmPortfolioOverview"){
    applicationManager.getPresentationUtility().showLoadingScreen();
    }
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getPortfolioDetails(params, this.getPortfolioDetailsSuccessCallback.bind(this), this.getPortfolioDetailsErrorCallback.bind(this));
  };
  /**
     *
     **/
  Wealth_PresentationController.prototype.getPortfolioDetailsSuccessCallback = function(obj) {
    var navManager = applicationManager.getNavigationManager();
    var data = {};
    data.response = obj;
    scope_WealthPresentationController.portfolioTotalValue = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(obj.marketValue, obj.referenceCurrency);
    scope_WealthPresentationController.portfolioTotalValueCurr = obj.referenceCurrency;
    var controller;
      controller = applicationManager.getPresentationUtility().getController('frmPortfolioOverview', true);
      controller.bindNewGraphData(data); 
  };
  /**
     *
     **/
  Wealth_PresentationController.prototype.getPortfolioDetailsErrorCallback = function() {

  };

  //getInstrumenttDetails
  Wealth_PresentationController.prototype.getProductDetailsById = function(params) {
     params.application = scope_WealthPresentationController.application;
     let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder"){
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    applicationManager.getWealthPortfolioManager().getInstrumentDetailsById(params, this.getProductDetailsSuccessById.bind(this), this.getProductDetailsErrorById.bind(this));
  };

  Wealth_PresentationController.prototype.getProductDetailsSuccessById = function(data) {
    let currentFormName = kony.application.getCurrentForm().id;
    if(data.error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getNavigationManager().updateForm({
        instrumentError: data.error
      }, currentFormName);
    } else {
       scope_WealthPresentationController.tradeCurrency = data.instrumentMinimal[0]? data.instrumentMinimal[0].priceCurrency:'';
      if (scope_WealthPresentationController.instrumentAction === 'Sell' || scope_WealthPresentationController.instrumentAction === 'Buy' || scope_WealthPresentationController.instrumentAction === 'Modify'){
       // applicationManager.getPresentationUtility().dismissLoadingScreen();
        
         
        var instDetData = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails');
          if(instDetData===undefined){
            instDetData={};
          }
          instDetData.productDetails=data;
        
         applicationManager.getNavigationManager().setCustomInfo('frmProductDetails', instDetData);
        
        
        var navManager =  applicationManager.getNavigationManager();
        navManager.updateForm({
          ProductDetails: data
        }, 'frmPlaceOrder');
      } else 
        if (scope_WealthPresentationController.instrumentAction === 'Reload'){
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          let controller = applicationManager.getPresentationUtility().getController('frmProductDetails', true);
          controller.refreshInstrumentDetails(data); 

        }else{
          var instrumentDetailsData = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails');
          if(instrumentDetailsData===undefined){
            instrumentDetailsData={};
          }
          instrumentDetailsData.productDetails=data;
          applicationManager.getNavigationManager().setCustomInfo('frmProductDetails', instrumentDetailsData);

          applicationManager.getPresentationUtility().dismissLoadingScreen();
           new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmProductDetails"}).navigate();
        }
    }
  };

  Wealth_PresentationController.prototype.getProductDetailsErrorById = function(data) {
    let currentFormName = kony.application.getCurrentForm().id;
    var instrumentDetailsData = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails');
    if(instrumentDetailsData===undefined){
      instrumentDetailsData={};
    }
    instrumentDetailsData.productDetails=data;
    applicationManager.getNavigationManager().setCustomInfo('frmProductDetails', instrumentDetailsData);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(currentFormName === "frmPlaceOrder"){
      return;
    }
    else
    new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmProductDetails"}).navigate();
  };
  
  
  Wealth_PresentationController.prototype.getHistoricalDataInstrument = function(params){
    applicationManager.getWealthPortfolioManager().getHistoricalCurrencyRate(params,this.getHistoricalDataInstrumentOnSuccess.bind(this), this.getHistoricalDataInstrumentOnError.bind(this));
  };
  Wealth_PresentationController.prototype.getHistoricalDataInstrumentOnSuccess = function(obj){
   
    var data = {};
    data.response = obj;
    var controller = applicationManager.getPresentationUtility().getController('frmProductDetails', true);
    controller.lineChartData(data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
   
  };
  Wealth_PresentationController.prototype.getHistoricalDataInstrumentOnError = function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };

  Wealth_PresentationController.prototype.getHistoricalCurrencyRate = function(params){
    applicationManager.getWealthPortfolioManager().getHistoricalCurrencyRate(params,this.getHistoricalCurrencyRateOnSuccess.bind(this), this.getHistoricalCurrencyRateOnError.bind(this));
  };
  Wealth_PresentationController.prototype.getHistoricalCurrencyRateOnSuccess = function(obj){
    var data = {};
    data.response = obj;
    var controller = applicationManager.getPresentationUtility().getController('frmCurrencyConverter', true);
    controller.lineChartData(data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Wealth_PresentationController.prototype.getHistoricalCurrencyRateOnError = function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };

  Wealth_PresentationController.prototype.getCurrencyRate = function(params){
    applicationManager.getWealthPortfolioManager().getCurrencyRate(params,this.getCurrencyRateOnSuccess.bind(this), this.getCurrencyRateOnError.bind(this));
  };
  Wealth_PresentationController.prototype.getCurrencyRateOnSuccess = function(obj){
    var controller = applicationManager.getPresentationUtility().getController('frmCurrencyConverter', true);
    controller.setRate(obj);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Wealth_PresentationController.prototype.getCurrencyRateOnError = function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };

  Wealth_PresentationController.prototype.createOrder = function(params){
    applicationManager.getWealthPortfolioManager().createOrder(params,this.createOrderOnSuccess.bind(this), this.createOrderOnError.bind(this));
  };
  Wealth_PresentationController.prototype.createOrderOnSuccess = function(obj){
    let currentFormName = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentFormName, true);
    controller.setSuccess(obj);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Wealth_PresentationController.prototype.createOrderOnError = function(){
    let currentFormName = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentFormName, true);
    controller.setError(obj);
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };

  Wealth_PresentationController.prototype.getCurrencyList = function(){
    applicationManager.getWealthPortfolioManager().getCurrencyList(this.getCurrencyListOnSuccess.bind(this), this.getCurrencyListOnError.bind(this));
  };
  Wealth_PresentationController.prototype.getCurrencyListOnSuccess = function(obj){
    var controller = applicationManager.getPresentationUtility().getController('frmCurrencyConverter', true);
    controller.setCurrencyList(obj.AddCurrency);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  Wealth_PresentationController.prototype.getCurrencyListOnError = function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };
  /**
     * navigate to frmWatchlist
     **/
  Wealth_PresentationController.prototype.getWatchList = function(params) {
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getWatchList(params, this.getWatchListSuccess.bind(this), this.getWatchListError.bind(this));
    var navMan = applicationManager.getNavigationManager();
    new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmWatchlist"}).navigate();
  
  };
  Wealth_PresentationController.prototype.getWatchListSuccess = function(response) {
    var navManager = applicationManager.getNavigationManager();
    data=[{ 
      "lblInstruName": "Amazon",
      "lblISIN": "1",
      "lblCurrency": "USD",
      "lblLatest": "2000",
      "lblChange": "",
      "lblDateTime": "2021020312000",
      "lblBid": "2300",
      "lblAsk": "25",
      "lblVolume": "2000"
    },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "-0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          },
          { 
            "lblInstruName": "Google",
            "lblISIN": "2",
            "lblCurrency": "USD",
            "lblLatest": "3000",
            "lblChange": "+0.65%",
            "lblDateTime": "2021020312000",
            "lblBid": "2600",
            "lblAsk": "45",
            "lblVolume": "2500"
          }
         ]; 
    navManager.updateForm({
      watchListDetails: data
    }, "frmWatchlist");     
  };
  Wealth_PresentationController.prototype.getWatchListError = function(err) {

  };


  Wealth_PresentationController.prototype.getTopNews = function(params) {

    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().getTopNews(params, this.getTopNewsSuccess.bind(this), this.getTopNewsError.bind(this));

  };

  Wealth_PresentationController.prototype.getTopNewsSuccess = function(response) {

    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo('frmTopNews');
    if(data===undefined){
      data={};
    }
    data.News=response;
    navMan.setCustomInfo('frmTopNews', data);

    navMan.updateForm({
      NewsList: response
    }, 'frmTopNews');



  };

  Wealth_PresentationController.prototype.getTopNewsError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;

    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };



  Wealth_PresentationController.prototype.getStockNewsDetails = function(params) {

    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().getStockNewsDetails(params, this.getStockNewsDetailsSuccess.bind(this), this.getStockNewsDetailsError.bind(this));

  };

  Wealth_PresentationController.prototype.getStockNewsDetailsSuccess = function(response) {

    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo('frmTopNews');
    if(data===undefined){
      data={};
    }
    data.News=response;
    navMan.setCustomInfo('frmTopNews', data);

    navMan.updateForm({
      NewsList: response
    }, 'frmTopNews');



  };

  Wealth_PresentationController.prototype.getStockNewsDetailsError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      NewsError: err
    }, 'frmTopNews');
  };

  Wealth_PresentationController.prototype.fetchNewsDetails=function(){

    let navManager = applicationManager.getNavigationManager();
    let data = navManager.getCustomInfo('frmTopNews');
     if(data===undefined){
      data={};
    }
    let stock = false;
    let params ;
    if(kony.application.getCurrentForm().id==="frmProductDetails"){
     
      let portRicCode = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails').portfolioDetails.RICCode;
      let prodDetails = applicationManager.getNavigationManager().getCustomInfo('frmProductDetails').productDetails;
      let instrumentRicCode = "";
      if (prodDetails.instrumentMinimal[0])
       instrumentRicCode = prodDetails.instrumentMinimal[0].RICCode;
      else
        instrumentRicCode = prodDetails.instrumentMinimal.RICCode;

      data.stock = true;

      params = {
        "RICCode": portRicCode?portRicCode: instrumentRicCode,
        "pageSize": 4,
        "pageOffset": 0

      };
      this.getStockNewsDetails(params);
    }else{
      data.stock = false;
      params = {
        "Topic": "OLUSBUS",
        "pageSize": 4,
        "pageOffset": 0
      };
      this.getTopNews(params);
    }
    navManager.setCustomInfo('frmTopNews', data);
    new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmTopNews"}).navigate();
  
  };

  Wealth_PresentationController.prototype.getHoldingsCurrentPosition = function(params) {
    this.ISIN = params.ISIN?params.ISIN:"";
    this.RICCode = params.RICCode?params.RICCode:"";
    this.navPage = params.navPage?params.navPage:"";
    this.instrumentId = params.instrumentId?params.instrumentId:"";
     let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder" || scope_WealthPresentationController.reload == "Reload"){
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getHoldingList(params, this.getHoldingsCurrentPositionSuccess.bind(this), this.getHoldingsCurrentPositionError.bind(this));
  };

  Wealth_PresentationController.prototype.getHoldingsCurrentPositionSuccess = function(response) {
    var navManager = applicationManager.getNavigationManager();
    var paramsProdDetails;
    var dataCustom = navManager.getCustomInfo('frmProductDetails');
    if (dataCustom === undefined) {
      dataCustom = {};
    }
    if (response.portfolioHoldings && (response.portfolioHoldings).length>0){
      dataCustom.portfolioDetails = response.portfolioHoldings[0];
      scope_WealthPresentationController.quantity = response.portfolioHoldings[0].quantity;
      scope_WealthPresentationController.tradeCurrency = response.portfolioHoldings[0].secCCy;
      scope_WealthPresentationController.currentPosition =  response.portfolioHoldings[0].marketValPOS;
      scope_WealthPresentationController.instrumentId = response.portfolioHoldings[0].holdingsId;
      scope_WealthPresentationController.holdingsType = response.portfolioHoldings[0].holdingsType;
      scope_WealthPresentationController.application = response.portfolioHoldings[0].application;
      paramsProdDetails = {
        "ISINCode": response.portfolioHoldings[0].ISIN?response.portfolioHoldings[0].ISIN:"",
        "RICCode": response.portfolioHoldings[0].RICCode?response.portfolioHoldings[0].RICCode:"",
        "instrumentId": response.portfolioHoldings[0].holdingsId?response.portfolioHoldings[0].holdingsId:"",
        "application":response.portfolioHoldings[0].application?response.portfolioHoldings[0].application:""
      };

    } else {
      scope_WealthPresentationController.currentPosition = "0.00";
      scope_WealthPresentationController.quantity = "0";
      dataCustom = {};
      dataCustom.portfolioDetails={};
      dataCustom.portfolioDetails.RICCode = this.RICCode;
      paramsProdDetails = {
        "ISINCode": this.ISIN,
        "RICCode": this.RICCode,
        "instrumentId": this.instrumentId,
        "application" : scope_WealthPresentationController.application 
      };
    }
    navManager.setCustomInfo('frmProductDetails', dataCustom);

    this.getProductDetailsById(paramsProdDetails);
  };

  Wealth_PresentationController.prototype.getHoldingsCurrentPositionError = function(response){
    let currentFormName = kony.application.getCurrentForm().id;

    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      instrumentError: response.errorMessage
    }, currentFormName);   
  };

  // Create Market order
  Wealth_PresentationController.prototype.createMarketOrder = function(param) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.createMarketOrder(param, this.createMarketOrderSuccess, this.createMarketOrderFailure);
  };
  Wealth_PresentationController.prototype.createMarketOrderSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      CreateOrderResponse: response
    }, currentFormName);

  };
  Wealth_PresentationController.prototype.createMarketOrderFailure = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      CreateOrderResponseError: error
    }, currentFormName);   
  };

  // Modify Market order
  Wealth_PresentationController.prototype.modifyMarketOrder = function(param) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.modifyMarketOrder(param, this.modifyMarketOrderSuccess, this.modifyMarketOrderFailure);
  };
  Wealth_PresentationController.prototype.modifyMarketOrderSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      ModifyOrderResponse: response
    }, currentFormName);

  };
  Wealth_PresentationController.prototype.modifyMarketOrderFailure = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
     // ModifyOrderResponseError: error
      CreateOrderResponseError: error
    }, currentFormName);   
  };

  // Get Order Details

  Wealth_PresentationController.prototype.getOrdersDetails = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getOrdersDetails(params, this.getOrdersDetailsSuccess.bind(this), this.getOrdersDetailsError.bind(this));
  };
  Wealth_PresentationController.prototype.getOrdersDetailsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      GetOrderDetailsResponse: response
    }, currentFormName);

  };
  Wealth_PresentationController.prototype.getOrdersDetailsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      GetOrderDetailsResponseError: error
    }, currentFormName);
  };

  // Cancel Order

  Wealth_PresentationController.prototype.cancelOrder = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.cancelOrder(params, this.cancelOrderSuccess.bind(this), this.cancelOrderError.bind(this));
  };
  Wealth_PresentationController.prototype.cancelOrderSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    // let currentFormName = kony.application.getCurrentForm().id;
    // applicationManager.getNavigationManager().updateForm({
    //   CancelOrderResponse: response
    // }, currentFormName);

  };
  Wealth_PresentationController.prototype.cancelOrderError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    // let currentFormName = kony.application.getCurrentForm().id;
    // applicationManager.getNavigationManager().updateForm({
    //   CancelOrderResponseError: error
    // }, currentFormName);
  };


  Wealth_PresentationController.prototype.getFavoriteInstruments = function(params) {
     let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder"){
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getFavoriteInstruments(params, this.getFavoriteInstrumentsSuccess.bind(this), this.getFavoriteInstrumentsError.bind(this));
  };

  Wealth_PresentationController.prototype.getFavoriteInstrumentsSuccess = function(response) {
    let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder"){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
    controller.setStarValue(response.favoriteInstruments);

  };
  Wealth_PresentationController.prototype.getFavoriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };


  

  Wealth_PresentationController.prototype.getUserFavouriteInstruments = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    WealthPortfolioManager.getUserFavouriteInstruments(params, this.getUserFavouriteInstrumentsSuccess.bind(this), this.getUserFavouriteInstrumentsError.bind(this));
  };

  Wealth_PresentationController.prototype.getUserFavouriteInstrumentsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
    controller.setFavourite(response);

  };
  Wealth_PresentationController.prototype.getUserFavouriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };
  
  Wealth_PresentationController.prototype.updateFavouriteInstruments = function(params) {
    var WealthOrderManager = applicationManager.getWealthPortfolioManager();
    WealthOrderManager.updateUserFavouriteInstruments(params, this.updateFavouriteInstrumentsSuccess.bind(this), this.updateFavouriteInstrumentsError.bind(this));
  };

  Wealth_PresentationController.prototype.updateFavouriteInstrumentsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
	var navManager = applicationManager.getNavigationManager();
	navManager.setCustomInfo('updateUserFavouriteInstruments', response);
  };
  Wealth_PresentationController.prototype.updateFavouriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };
  
  Wealth_PresentationController.prototype.getFavoriteInstruments = function(params) {
     let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder"){
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    var WealthOrderManager = applicationManager.getWealthPortfolioManager();
    WealthOrderManager.getFavoriteInstruments(params, this.getFavoriteInstrumentsSuccess.bind(this), this.getFavoriteInstrumentsError.bind(this));
  };

  Wealth_PresentationController.prototype.getFavoriteInstrumentsSuccess = function(response) {
    let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder"){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
    controller.setStarValue(response.favoriteInstruments);

  };
  Wealth_PresentationController.prototype.getFavoriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };
  
  Wealth_PresentationController.prototype.getCashBalanceDetails=function(params){
    //params = {"portfolioCode" : "T_AI_CMCPTF3"};
    applicationManager.getWealthPortfolioManager().getAssets(params, this.getCashBalanceDetailsOnSuccess.bind(this), this.getCashBalanceDetailsOnError.bind(this));
  };

  Wealth_PresentationController.prototype.getCashBalanceDetailsOnSuccess=function(data){
    if (scope_WealthPresentationController.isTAPIntegration) scope_WealthPresentationController.jointHolderName = data.jointHolders
    let currentFormName = kony.application.getCurrentForm().id;
    let getNewCurrencies = scope_WealthPresentationController.selectedCurrencies;
    if(getNewCurrencies.length){
      data.cashAccounts = [
        ...data.cashAccounts,
        ...getNewCurrencies
      ];
    }
    scope_WealthPresentationController.portfolioTotalValue = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.instrumentTotal[0].marketValue, data.referenceCurrency);
    scope_WealthPresentationController.portfolioTotalValueCurr = data.referenceCurrency;
    if(applicationManager.getNavigationManager().getCurrentForm() != "frmPortfolioOverview")
      {
      applicationManager.getPresentationUtility().dismissLoadingScreen();   
      }
    if(currentFormName === "frmPlaceOrder"){
      let controller = applicationManager.getPresentationUtility().getController('frmPlaceOrder', true);
        scope_WealthPresentationController.cashBalance = data.totalCashBalance ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.totalCashBalance, data.totalCashBalanceCurrency) : "";
      controller.setCashBalance(data);    
    }
    else{
    applicationManager.getNavigationManager().updateForm({
      cashCurrencyList:data
    }, currentFormName);
      }
  };

  Wealth_PresentationController.prototype.getCashBalanceDetailsOnError=function(){

  };
  
  
  Wealth_PresentationController.prototype.getHoldingsCurrentPosition = function(params) {
    this.ISIN = params.ISIN?params.ISIN:"";
    this.RICCode = params.RICCode?params.RICCode:"";
    this.navPage = params.navPage?params.navPage:"";
    this.instrumentId = params.instrumentId?params.instrumentId:"";
     let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder" || scope_WealthPresentationController.reload == "Reload"){
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    if(scope_WealthPresentationController.isOpenOrdersIncludedflag){
      params.isIncludeOrders = "true";
    }else{
      params.isIncludeOrders = "false";
    }
    var WealthOrderManager = applicationManager.getWealthPortfolioManager();
    WealthOrderManager.getHoldingList(params, this.getHoldingsCurrentPositionSuccess.bind(this), this.getHoldingsCurrentPositionError.bind(this));
  };

  Wealth_PresentationController.prototype.getHoldingsCurrentPositionSuccess = function(response) {
    var navManager = applicationManager.getNavigationManager();
    var paramsProdDetails;
    var resp = {};
    var dataCustom = navManager.getCustomInfo('frmProductDetails');
    if (dataCustom === undefined) {
      dataCustom = {};
    }
    if (response.portfolioHoldings && (response.portfolioHoldings).length>0){
      if(scope_WealthPresentationController.depositoryId !== ""){
        for(var i =0;i<(response.portfolioHoldings).length;i++){
          if( response.portfolioHoldings[i].hasOwnProperty("depositoryId") && (response.portfolioHoldings[i].depositoryId === scope_WealthPresentationController.depositoryId )){
             resp = response.portfolioHoldings[i];
          i = 10000;
        }
      }         
      response.portfolioHoldings = [];
      response.portfolioHoldings[0] = resp;

    }

    dataCustom.portfolioDetails = response.portfolioHoldings[0];
    scope_WealthPresentationController.quantity =  scope_WealthPresentationController.isOpenOrdersIncludedflag? (response.portfolioHoldings[0].status === "" ? response.portfolioHoldings[0].quantity : "0"):response.portfolioHoldings[0].quantity;
    scope_WealthPresentationController.tradeCurrency = response.portfolioHoldings[0].secCCy;
    scope_WealthPresentationController.currentPosition =  scope_WealthPresentationController.isOpenOrdersIncludedflag? (response.portfolioHoldings[0].status === "" ? response.portfolioHoldings[0].marketValPOS : "0.00"):response.portfolioHoldings[0].marketValPOS;
    scope_WealthPresentationController.instrumentId = response.portfolioHoldings[0].holdingsId;
    scope_WealthPresentationController.holdingsType = response.portfolioHoldings[0].holdingsType;
    paramsProdDetails = {
      "ISINCode": response.portfolioHoldings[0].ISIN?response.portfolioHoldings[0].ISIN:"",
      "RICCode": response.portfolioHoldings[0].RICCode?response.portfolioHoldings[0].RICCode:"",
      "instrumentId": response.portfolioHoldings[0].holdingsId?response.portfolioHoldings[0].holdingsId:""
    };

    } else {
      scope_WealthPresentationController.currentPosition = "0.00";
      scope_WealthPresentationController.quantity = "0";
      dataCustom = {};
      dataCustom.portfolioDetails={};
      dataCustom.portfolioDetails.RICCode = this.RICCode;
      paramsProdDetails = {
        "ISINCode": this.ISIN,
        "RICCode": this.RICCode,
        "instrumentId": this.instrumentId
      };
    }
    navManager.setCustomInfo('frmProductDetails', dataCustom);

    this.getProductDetailsById(paramsProdDetails);
  };
  
  Wealth_PresentationController.prototype.getHoldingsCurrentPositionError = function(response){
    let currentFormName = kony.application.getCurrentForm().id;

    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      instrumentError: response.errorMessage
    }, currentFormName);   
  };
  
  Wealth_PresentationController.prototype.getPastProposal = function(params) {

    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().getPastProposal(params, this.getPastProposalSuccess.bind(this), this.getPastProposalError.bind(this));

  };

  Wealth_PresentationController.prototype.getPastProposalSuccess = function(response) {

    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.resp = response;
    navMan.setCustomInfo('frmPastProposal', data.resp);
    scope_WealthPresentationController.funcResultCode = response.funcResultCode;
//    var controller = applicationManager.getPresentationUtility().getController('frmPastProposal', true);
    if(kony.application.getCurrentForm().id === "frmPortfolioOverview"){
      //frmPortfolioOverview
       var controller = applicationManager.getPresentationUtility().getController('frmPortfolioOverview', true);
      controller.PastProposal(data.resp)
    }
    else if(kony.application.getCurrentForm().id === "frmPastProposal"){
    //frmPastProposal
       var controller = applicationManager.getPresentationUtility().getController('frmPastProposal', true);
    controller.PopulateSegment(data.resp);
    }



  };

  Wealth_PresentationController.prototype.getPastProposalError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;

    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };
  
    Wealth_PresentationController.prototype.getOrderProposal = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().getOrderProposal(params, this.getOrderProposalSuccess.bind(this), this.getOrderProposalError.bind(this));
  };

  Wealth_PresentationController.prototype.getOrderProposalSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.resp = response;
    navMan.setCustomInfo('frmOrdersPastProposal', data.resp);
    var controller = applicationManager.getPresentationUtility().getController('frmPortfolioOverview', true);
    //frmPortfolioOverview
    controller.InvestmentProposal(data.resp);
  };

  Wealth_PresentationController.prototype.getOrderProposalError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.resp = err;
    navMan.setCustomInfo('frmOrdersPastProposal', data.resp);
    var controller = applicationManager.getPresentationUtility().getController('frmPortfolioOverview', true);
    //frmPortfolioOverview
    controller.InvestmentProposal(data.resp);    
    
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };
  
  Wealth_PresentationController.prototype.getAllStrategies = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().getAllStrategies(params, this.getAllStrategiesSuccess.bind(this), this.getAllStrategiesError.bind(this));
  };
  Wealth_PresentationController.prototype.getAllStrategiesSuccess = function(response) {
    var controller = applicationManager.getPresentationUtility().getController('frmChangeStrategy', true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    controller.setData(response);
  };
  Wealth_PresentationController.prototype.getAllStrategiesError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };
  Wealth_PresentationController.prototype.confirmChangeStrat = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().confirmChangeStrat(params, this.confirmChangeStratSuccess.bind(this), this.confirmChangeStratError.bind(this));
  };
  Wealth_PresentationController.prototype.confirmChangeStratSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmMyStrategyAck"}).navigate();
  };
  Wealth_PresentationController.prototype.confirmChangeStratError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };
   Wealth_PresentationController.prototype.confirmStrategyFromQuestion = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().confirmStrategyFromQuestion(params, this.confirmChangeStratSuccess.bind(this), this.confirmChangeStratError.bind(this));
  };
  Wealth_PresentationController.prototype.confirmStrategyFromQuestionSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(response.status === "success"){
      new kony.mvc.Navigation({"appName": "PortfolioManagementMA","friendlyName": "frmMyStrategyAck"}).navigate();
    }
    
  };
  Wealth_PresentationController.prototype.confirmStrategyFromQuestionError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };
  
  Wealth_PresentationController.prototype.confirmRecommendedStrategy = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().confirmRecomStrat(params, this.confirmRecommendedStrategySuccess.bind(this), this.confirmRecommendedStrategyError.bind(this));
  };
  
   Wealth_PresentationController.prototype.confirmRecommendedStrategySuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.resp = response;
     if(response.status === "success"){
        navMan.navigateTo("frmRecStrategyAck");
     }
     };

Wealth_PresentationController.prototype.confirmRecommendedStrategyError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };
  
Wealth_PresentationController.prototype.rejectProposals = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().rejectProposals(params, this.rejectProposalsSuccess.bind(this), this.rejectProposalsError.bind(this));
  };
  Wealth_PresentationController.prototype.rejectProposalsSuccess = function(response) {
        var navManager = applicationManager.getNavigationManager();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        navManager.setCustomInfo('isProposalRejected', true);
		navManager.navigateTo("frmPortfolioOverview");
  };
  Wealth_PresentationController.prototype.rejectProposalsError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };  
  
  
  Wealth_PresentationController.prototype.getDownloadProposalList = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.getBaseCurrency() === 'EUR')
    {
      params.isEuro= true;
    }
    WealthPortfolioManager.downloadProposalList(params, this.getDownloadProposalListSuccess.bind(this), this.getDownloadProposalListError.bind(this));
  };

  Wealth_PresentationController.prototype.getDownloadProposalListSuccess = function(obj) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();     
    var controller='';    
    controller = applicationManager.getPresentationUtility().getController('frmPastProposal', true);
    controller.onSuccessDownloadPastProposals(obj);     
  };    

  Wealth_PresentationController.prototype.getDownloadProposalListError = function(err) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  
  
  //getPersonalized startegy ADP-6525 service
  Wealth_PresentationController.prototype.getPersonalizedStrategy = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().getPersonalizedStrategy(params, this.getPersonalizedStrategySuccess.bind(this), this.getPersonalizedStrategyError.bind(this));
  };

  Wealth_PresentationController.prototype.getPersonalizedStrategySuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.resp = response;
    scope_WealthPresentationController.orginalAssetArray= JSON.parse(JSON.stringify(data.resp));
    var controller = applicationManager.getPresentationUtility().getController('frmPersonalizeStrategy', true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    controller.setResponse(response);
//     if(response.status === "success"){
//       navMan.navigateTo("frmPersonalizeStraegyAck");
//     }
  };
  Wealth_PresentationController.prototype.getPersonalizedStrategyError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);   
  };
  
  
   //compute Personalized startegy ADP-6525 service
  Wealth_PresentationController.prototype.computePersonalizedStrategy = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().computePersonalizedStrategy(params, this.computePersonalizedStrategySuccess.bind(this), this.computePersonalizedStrategyError.bind(this));
  };

  Wealth_PresentationController.prototype.computePersonalizedStrategySuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
    var data = {};
    data.resp = response;
    const obj = JSON.parse(JSON.stringify(response));
    const copy = Object.assign({}, obj);
    scope_WealthPresentationController.computedStrategy = copy;
    scope_WealthPresentationController.orginalAssetArray = copy;
    var controller = applicationManager.getPresentationUtility().getController('frmPersonalizeStrategy', true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    controller.setResponse(response);
//     if(response.status === "success"){
//       navMan.navigateTo("frmPersonalizeStraegyAck");
//     }
  };
  Wealth_PresentationController.prototype.computePersonalizedStrategyError = function(err) {
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    /*applicationManager.getNavigationManager().updateForm({
      errorResponse: err.errorMessage
    }, currentFormName);*/
    
    var controller = applicationManager.getPresentationUtility().getController('frmPersonalizeStrategy', true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    controller.onComputeError(err);
  };
  
   //revertStrategy ADP-6525 service
   Wealth_PresentationController.prototype.revertStrategy = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().revertStrategy(params, this.revertStrategySuccess.bind(this), this.revertStrategyError.bind(this));
  };

  Wealth_PresentationController.prototype.revertStrategySuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(response.status === "success"){
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmStrategyAllocation");
    }
  };

  Wealth_PresentationController.prototype.revertStrategyError = function(err) {
   applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  
    //confirmOrdersIP
   Wealth_PresentationController.prototype.confirmOrdersIP = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().confirmOrdersIP(params, this.confirmOrdersIPSuccess.bind(this), this.confirmOrdersIPError.bind(this));
  };

  Wealth_PresentationController.prototype.confirmOrdersIPSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
   if(response.message === "Orders placed successfully."){
  var controller = applicationManager.getPresentationUtility().getController('frmInvestmentProposal', true);
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     controller.confirmIP();
   }
    
  };

  Wealth_PresentationController.prototype.confirmOrdersIPError = function(err) {
   applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  
   Wealth_PresentationController.prototype.getCustomers = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.getWealthPortfolioManager().getCustomers(params, this.getCustomersSuccess.bind(this), this.getCustomersError.bind(this));
  };
  
   Wealth_PresentationController.prototype.getCustomersSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  var controller = applicationManager.getPresentationUtility().getController('frmCustomerDashboard', true);
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     controller.setWealthCustomerOverview(response);    
  };

    Wealth_PresentationController.prototype.getCustomersError = function(err) {
        let currentFormName = kony.application.getCurrentForm().id;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		var controller = applicationManager.getPresentationUtility().getController('frmCustomerDashboard', true);
        controller.setErrorMessage(err);
        applicationManager.getNavigationManager().updateForm({
            errorResponse: err.errorMessage
        }, currentFormName); 
  };

  Wealth_PresentationController.prototype.updateFavoriteCustomer = function(params) {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
        WealthPortfolioManager.updateFavoriteCustomer(params, this.updateFavoriteCustomerSuccess.bind(this), this.updateFavoriteCustomerError.bind(this));
    };
    Wealth_PresentationController.prototype.updateFavoriteCustomerSuccess = function(obj) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCustomerDashboard', true);
        controller.setWealthFavoriteCustomer(obj);
        
    };
    Wealth_PresentationController.prototype.updateFavoriteCustomerError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var controller = applicationManager.getPresentationUtility().getController('frmCustomerDashboard', true);
        controller.setWealthFavoriteCustomer(err);
    };

    Wealth_PresentationController.prototype.getBankDate = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var WealthPortfolioManager = applicationManager.getWealthPortfolioManager();
      WealthPortfolioManager.getBankDate(this.getBankDateSuccess.bind(this), this.getBankDateError.bind(this));
  };
    Wealth_PresentationController.prototype.getBankDateSuccess = function(obj) {
      const controller = applicationManager.getPresentationUtility().getController('frmDashboard', true);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      scope_WealthPresentationController.wealthBankDate = obj.bankDate || '';
      controller.getRecentActivities();
    };
    Wealth_PresentationController.prototype.getBankDateError = function(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    };

  
  return Wealth_PresentationController;
});