define([], function() {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function WealthOrder_PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
		scope_WealthOrderPresentationController = this;
		
		
		
  
 
	
	//scope_WealthOrderPresentationController.viewOrdersTab = false;
   // scope_WealthOrderPresentationController.isFirst = true;
	this.accObj = {};
    this.instrumentDetails={};
    this.instrumentPricingData={};
    this.instrumentCurrentPosition={};
    //this.prodParamDetails={};
    //this.instruDetails={};
    this.portfolioCurrency = "";
	
    }

    inheritsFrom(WealthOrder_PresentationController, kony.mvc.Presentation.BasePresenter);
    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
    WealthOrder_PresentationController.prototype.initializePresentationController = function() {
        
    };
	
	WealthOrder_PresentationController.prototype.getInstrumentDetails = function() {
    return this.instrumentDetails;
  };

  WealthOrder_PresentationController.prototype.setInstrumentDetails = function(params) {
    this.instrumentDetails = params;
  };
  
   WealthOrder_PresentationController.prototype.getInstrumentPricingData = function() {
    return this.instrumentPricingData;
  };

  WealthOrder_PresentationController.prototype.setInstrumentPricingData = function(params) {
    this.instrumentPricingData = params;
  };
  
    WealthOrder_PresentationController.prototype.getInstrumentCurrentPosition = function() {
    return this.instrumentCurrentPosition;
  };

  WealthOrder_PresentationController.prototype.setInstrumentCurrentPosition = function(params) {
    this.instrumentCurrentPosition = params;
  };
  
  WealthOrder_PresentationController.prototype.getAccountsListObj = function() {
    return this.accObj;
  };

  WealthOrder_PresentationController.prototype.setAccountsListObj = function(params) {
    this.accObj = params;
  };
  
  
  
  /*WealthOrder_PresentationController.prototype.getProductDetails = function() {
    return this.prodParamDetails;
  };
  
    WealthOrder_PresentationController.prototype.setProductDetails = function(params) {
    this.prodParamDetails = params;
  };
  
  WealthOrder_PresentationController.prototype.getDetailsOfInstrument = function() {
    return this.instruDetails;
  };
  
    WealthOrder_PresentationController.prototype.setDetailsOfInstrument = function(params) {
    this.instruDetails = params;
  };*/
  
  
    
  
  WealthOrder_PresentationController.prototype.getCurrencyList = function(){
    applicationManager.getWealthOrderManager().getCurrencyList(this.getCurrencyListOnSuccess.bind(this), this.getCurrencyListOnError.bind(this));
  };
  WealthOrder_PresentationController.prototype.getCurrencyListOnSuccess = function(obj){
    var controller = applicationManager.getPresentationUtility().getController('frmCurrencyConverter', true);
    controller.setCurrencyList(obj.AddCurrency);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  WealthOrder_PresentationController.prototype.getCurrencyListOnError = function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };
  
  WealthOrder_PresentationController.prototype.getCurrencyRate = function(params){
    applicationManager.getWealthOrderManager().getCurrencyRate(params,this.getCurrencyRateOnSuccess.bind(this), this.getCurrencyRateOnError.bind(this));
  };
  WealthOrder_PresentationController.prototype.getCurrencyRateOnSuccess = function(obj){
    var controller = applicationManager.getPresentationUtility().getController('frmCurrencyConverter', true);
    controller.setRate(obj);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  WealthOrder_PresentationController.prototype.getCurrencyRateOnError = function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };
  
  WealthOrder_PresentationController.prototype.getHistoricalCurrencyRate = function(params){
    applicationManager.getWealthOrderManager().getHistoricalCurrencyRate(params,this.getHistoricalCurrencyRateOnSuccess.bind(this), this.getHistoricalCurrencyRateOnError.bind(this));
  };
  WealthOrder_PresentationController.prototype.getHistoricalCurrencyRateOnSuccess = function(obj){
    var data = {};
    data.response = obj;
    var controller = applicationManager.getPresentationUtility().getController('frmCurrencyConverter', true);
    controller.lineChartData(data);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  WealthOrder_PresentationController.prototype.getHistoricalCurrencyRateOnError = function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };
  
  WealthOrder_PresentationController.prototype.createOrder = function(params){
    applicationManager.getWealthOrderManager().createOrder(params,this.createOrderOnSuccess.bind(this), this.createOrderOnError.bind(this));
  };
  WealthOrder_PresentationController.prototype.createOrderOnSuccess = function(obj){
    let currentFormName = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentFormName, true);
    controller.setSuccess(obj);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  };
  WealthOrder_PresentationController.prototype.createOrderOnError = function(){
    let currentFormName = kony.application.getCurrentForm().id;
    var controller = applicationManager.getPresentationUtility().getController(currentFormName, true);
    controller.setError(obj);
    applicationManager.getPresentationUtility().dismissLoadingScreen();    
  };
  
  

WealthOrder_PresentationController.prototype.getProductDetailsById = function(params) {
    params.application = params.application!=null && params.application.length>0 ? params.application : scope_WealthPresentationController.application; 	
    let currentFormName = kony.application.getCurrentForm().id;
    if(currentFormName !== "frmPlaceOrder"){
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    applicationManager.getWealthOrderManager().getInstrumentDetailsById(params, this.getProductDetailsSuccessById.bind(this), this.getProductDetailsErrorById.bind(this));
  };

  WealthOrder_PresentationController.prototype.getProductDetailsSuccessById = function(data) {
    let currentFormName = kony.application.getCurrentForm().id;
    if(data.error) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      applicationManager.getNavigationManager().updateForm({
        instrumentError: data.error
      }, currentFormName);
    } else {
       scope_WealthPresentationController.tradeCurrency = data.productDetails.instrumentCurrencyId;
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
          applicationManager.getNavigationManager().navigateTo("frmProductDetails");
        }
    }
  };

  WealthOrder_PresentationController.prototype.getProductDetailsErrorById = function(data) {
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
    applicationManager.getNavigationManager().navigateTo("frmProductDetails");
  };


WealthOrder_PresentationController.prototype.createMarketOrder = function(param) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthOrderManager = applicationManager.getWealthOrderManager();
    WealthOrderManager.createMarketOrder(param, this.createMarketOrderSuccess, this.createMarketOrderFailure);
  };
  WealthOrder_PresentationController.prototype.createMarketOrderSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      CreateOrderResponse: response
    }, currentFormName);

  };
  WealthOrder_PresentationController.prototype.createMarketOrderFailure = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      CreateOrderResponseError: error
    }, currentFormName);   
  };

  // Modify Market order
  WealthOrder_PresentationController.prototype.modifyMarketOrder = function(param) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthOrderManager = applicationManager.getWealthOrderManager();
    WealthOrderManager.modifyMarketOrder(param, this.modifyMarketOrderSuccess, this.modifyMarketOrderFailure);
  };
  WealthOrder_PresentationController.prototype.modifyMarketOrderSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
      ModifyOrderResponse: response
    }, currentFormName);

  };
  WealthOrder_PresentationController.prototype.modifyMarketOrderFailure = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    let currentFormName = kony.application.getCurrentForm().id;
    applicationManager.getNavigationManager().updateForm({
     // ModifyOrderResponseError: error
      CreateOrderResponseError: error
    }, currentFormName);   
  };
   
   WealthOrder_PresentationController.prototype.cancelOrder = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthOrderManager = applicationManager.getWealthOrderManager();
    WealthOrderManager.cancelOrder(params, this.cancelOrderSuccess.bind(this), this.cancelOrderError.bind(this));
  };
  WealthOrder_PresentationController.prototype.cancelOrderSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    // let currentFormName = kony.application.getCurrentForm().id;
    // applicationManager.getNavigationManager().updateForm({
    //   CancelOrderResponse: response
    // }, currentFormName);

  };
  WealthOrder_PresentationController.prototype.cancelOrderError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    // let currentFormName = kony.application.getCurrentForm().id;
    // applicationManager.getNavigationManager().updateForm({
    //   CancelOrderResponseError: error
    // }, currentFormName);
  };


  
  
    WealthOrder_PresentationController.prototype.getUserFavouriteInstruments = function(params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var WealthOrderManager = applicationManager.getWealthOrderManager();
    WealthOrderManager.getUserFavouriteInstruments(params, this.getUserFavouriteInstrumentsSuccess.bind(this), this.getUserFavouriteInstrumentsError.bind(this));
  };

  WealthOrder_PresentationController.prototype.getUserFavouriteInstrumentsSuccess = function(response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

    var controller = applicationManager.getPresentationUtility().getController(kony.application.getCurrentForm().id, true);
    controller.setFavourite(response);

  };
  WealthOrder_PresentationController.prototype.getUserFavouriteInstrumentsError = function(error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();

  };
  
  

    return WealthOrder_PresentationController;
});