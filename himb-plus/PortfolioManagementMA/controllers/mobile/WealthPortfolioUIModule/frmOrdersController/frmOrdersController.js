define({
  segResponse:{},
  dateRange : [],
  startDate: "",
  totalValue:"",
  selectedRicCode: "",
  description:"",
  orderType: "",
  selectedIndex: 0,
  cancelOrderIds:"",
  tempData:{},
  orderStatus: "",
  type: "",
  orderReference: "",
  assetType: "",
  openOrderPermission:"",
  historyOrderPermission:"",
  requestParams: {},
      
 init : function(){
   this.view.preShow =  this.preShow;
    var navManager = applicationManager.getNavigationManager();
   var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    
  },
  preShow : function(){
	var temp="";
    this.view.flxAdditionalOptions.setVisibility(false);
	this.dateRange = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
	   var navMan = applicationManager.getNavigationManager();
     var configManager = applicationManager.getConfigurationManager();
      if(configManager.getBaseCurrency() === 'EUR'){
      this.view.segmentDetailsWealth.setEuroFlow(true);
    }
      else{
         this.view.segmentDetailsWealth.setEuroFlow(false);
      }
    this.initActions();
	let openOrderPermission=false;
	let historyOrderPermission=false;
	var getPermissionDetails = JSON.parse(this.view.segmentDetailsWealth.getFeaturesAndPermissions());
	   if (typeof getPermissionDetails !== "undefined") {
	    if (getPermissionDetails.openOrderPermission.length > 0 || getPermissionDetails.historyOrderPermission.length > 0) {
			  openOrderPermission = configManager.checkAtLeastOnePermission(getPermissionDetails.openOrderPermission);
			  historyOrderPermission = configManager.checkAtLeastOnePermission(getPermissionDetails.historyOrderPermission);
		 }	
	   }
  this.openOrderPermission=openOrderPermission;
	this.historyOrderPermission=historyOrderPermission;
	var existingParam=this.view.segmentDetailsWealth.getCriteriaObjValue();
	if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isFrmWatchlist){
      temp=applicationManager.getModulesPresentationController("WealthPortfolioUIModule").watchlistPortfolioId
      }
    else{
      temp=applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;
    }
    if (openOrderPermission && ((existingParam === "{}" || Object.keys(existingParam).length === 0) || (existingParam !== 'undefined' && existingParam.type == "open")))
    {
      var nav = applicationManager.getNavigationManager();
      var portId = nav.getCustomInfo('frmInvestmentAccPortfolio');
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType="open";
      this.requestParams = {  
				"portfolioId": portId?portId:temp,
                "type": "open",
                "startDate":"",
                "endDate": "",
                "searchByInstrumentName": "",
				"sortOrder": "DESC",
                "sortBy": (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders === "")?"tradeDate":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders,
                "orderId":this.cancelOrderIds
               };
     nav.setCustomInfo("frmOrderType","open");
     }
     else if(existingParam !== "" && existingParam !=='undefined' && existingParam.type=="history" && historyOrderPermission)
      { 
        applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType="history";
        this.view.segmentDetailsWealth.setLblPreviousDays(this.dateRange);
        this.requestParams = {
          "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
          "type": "history",
          "startDate": this.dateRange.startDate,
          "endDate": this.dateRange.endDate,
          "searchByInstrumentName": "",
          "sortBy": (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders === "") ? "tradeDate" : applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders,
          "orderId": this.cancelOrderIds
        };
		navMan.setCustomInfo("isFirstTime", false);
        
      }else if(!openOrderPermission && historyOrderPermission){
        navMan.setCustomInfo("isFirstTime", true);
        this.onClickOrderHistory();
      }
    navMan.setCustomInfo("frmOrders", this.requestParams.portfolioId);
	this.view.segmentDetailsWealth.setContext(this.requestParams);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    this.view.flxAdditionalOptions.setVisibility(false);
	
    navMan.setCustomInfo("frmPortfolioDetails", false);
	  this.checkPermission("formUI");
			if(configManager.isMicroAppPresent("WealthOrderMA"))
			{
            this.view.segmentDetailsWealth.setVisibleActionImage(true);
            }
			else{
                this.view.segmentDetailsWealth.setVisibleActionImage(false);
            }
    },
  postShow : function(){
   // To be added
  },
   initActions: function(){
    //this.view.segmentDetailsWealth.onRowClickEvent = this.onOrderHistorySelect; 
	this.view.segmentDetailsWealth.onClickOrderHistory   = this.onClickOrderHistory;
	this.view.segmentDetailsWealth.onClickOpenOrders=this.onClickOpenOrders;
    this.view.segmentDetailsWealth.onMoveToDateRange   = this.timePeriod;
	this.view.customHeader.flxBack.onClick =this.onBack;
	this.view.segmentDetailsWealth.onActionButtonClicked = this.onContextMenuClick;
    this.view.customHeader.flxSearch.onTouchEnd = this.moreOptions;
	this.view.flxCancelOption.onTouchEnd = this.onClickCancel;
    this.view.flxSortBy.onTouchEnd = this.onClickSortBy;
    //this.view.flxDownloadOrders.onTouchEnd = this.onClickDownloadOrders;
    this.view.flxDownloadOrders.onTouchEnd =this.nav;
    this.view.flxModify.onTouchEnd = this.onClickModify;
    this.view.flxViewOrder.onTouchEnd = this.onClickViewOrder;
	this.view.flxCancelOrder.onTouchEnd = this.onClickOrderCancel;
	this.view.flxYes.onTouchEnd = this.yesClick;
    this.view.flxNo.onTouchEnd = this.noClick;
	this.view.segmentDetailsWealth.onOrdersComponentLoad=this.checkPermission;
     this.view.segmentDetailsWealth.onCancelPopup = this.onCancelClick;
	this.view.segmentDetailsWealth.onRequestEnd = function() {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
	this.view.segmentDetailsWealth.onRequestStart = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
	},
    nav: function()
  {
    this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.setEnabled(true);
    this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo('frmOrders',this.requestParams.portfolioId);
    // IW-3693 - Bhuvaneshwaran - Starts
    scope_WealthPresentationController.searchInst=this.view.segmentDetailsWealth.getCriteriaObjValue().searchByInstrumentName;
    //IW-3693 - ends
    navMan.navigateTo("frmDownload");
  },
   onCancelClick:function(response){
     if(response.id !== "btnTglOpen"){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scope = this;
    var errorObject = {};
    if (response.messageDetails) {
     var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
     errorObject.formattedSuccessText = formattedText;
     errorObject.referenceId=response.orderId;
     errorObject.messageDetails = response.messageDetails;
     errorObject.isSuccess = true;
    }else if(response.error){
      if(response.error.errorDetails){
      var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
      errorObject.formattedFailedText=formattedText;
      errorObject.messageDetails = response.error.errorDetails;
      errorObject.isSuccess = false;
      }
    }
       else if(response.errorDetails){
      var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
      errorObject.formattedFailedText=formattedText;
      errorObject.messageDetails = response.errorDetails;
      errorObject.isSuccess = false;
    }
       else {
     errorObject.formattedSuccessText =kony.i18n.getLocalizedString("i18n.wealth.orderCancelSuccessMsg");
      var referenceId = response.orderId;
      errorObject.referenceId = referenceId; 
      errorObject.isSuccess = true;
    }  
    this.view.CancelTransactionPopup.setContext(errorObject);
        this.view.flxErrorPopup.setVisibility(true);
    this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
      if(btnAction)
        scope.view.flxErrorPopup.setVisibility(false);
    };
     }
      },
  onClickOpenOrders: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmOrderType","open");
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders = "";
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType ="open";
	  this.checkPermission("formUI");
  },
  onClickOrderHistory: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmOrderType","history");
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders = "";
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType="history";
    var data = {};
	var temp="";
    if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isFrmWatchlist){
      temp=applicationManager.getModulesPresentationController("WealthPortfolioUIModule").watchlistPortfolioId
      }
    else{
      temp=applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId;
    }
    data.selectedPeriod = "previous30DaysSelected";
    var today = new Date();
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

    this.dateRange = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
    this.view.segmentDetailsWealth.setLblPreviousDays(this.dateRange);
    this.requestParams= {  "portfolioId": temp,
                  "type": "history",
                  "startDate":this.dateRange.startDate,
                  "endDate": this.dateRange.endDate,
                  "searchByInstrumentName": "",
                  "sortBy": (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders === "")?"tradeDate":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders,
                  "orderId":this.cancelOrderIds
                 };
    var navManager=applicationManager.getNavigationManager();
    if(!navManager.getCustomInfo("isFirstTime"))
    {
      this.view.segmentDetailsWealth.callOrderHistory(this.requestParams,this.cancelOrderIds);			
    }   
  },
   onContextMenuClick: function(param, dets){
    var navManager=applicationManager.getNavigationManager();
			var data = {};
            var orders = {};
		    orders=dets.rowdetails;
            orders.totalValue = dets.totalValue;
            data.response = orders;
			this.tempData=data;
            this.selectedRicCode = orders.RICCode;
			this.orderType = orders.orderType;
            this.ISINCode = orders.ISIN;
			this.description=orders.description;
			//this.transactionId=orders.transactionId;
			this.orderReference=orders.orderReference;
            this.assetType=orders.assetType;
			this.orderStatus=orders.status;
			 this.view.flxDownloadOrders.isVisible = false;
			this.view.flxSortBy.isVisible = false;
			this.view.flxScroll.setEnabled(false);
			this.view.flxHeader.setEnabled(false);
			this.view.lblView.text=kony.i18n.getLocalizedString("i18n.wealth.viewOrder");
			this.view.flxViewOrder.isVisible = true;
			this.checkPermission("formUI");
			this.view.flxAdditionalOptions.isVisible = true;
      if(orders.swipeActionEnable!== undefined && orders.swipeActionEnable === "false")
       {
          this.view.flxModify.isVisible = false;
		  this.view.flxCancelOrder.isVisible = false;
        }
     
     
        },
  onOrderHistorySelect:function(rowData){
        var navManager=applicationManager.getNavigationManager();
        var data={};
        var orderDetails = rowData.row;
        data.response=orderDetails;
        if (orderDetails.status !== "Open"){
          navManager.setCustomInfo("frmViewOrderHistoryDetails", data);
          navManager.navigateTo("frmViewOrderHistoryDetails");
        }
  },
  onClickViewOrder:function(){
	 this.view.flxScroll.setEnabled(true);
	 this.view.flxHeader.setEnabled(true);
	  if (this.orderStatus === "Open") {
		  var navManager=applicationManager.getNavigationManager();
	 navManager.setCustomInfo("frmViewOpenOrderDetails", this.tempData);
     navManager.navigateTo("frmViewOpenOrderDetails");
	  }
  },
		moreOptions:function(){
        this.view.flxScroll.enableScrolling = false;
		this.view.flxViewOrder.isVisible = false;
		this.view.flxModify.isVisible = false;
		this.view.flxCancelOrder.isVisible = false;
		this.view.flxDownloadOrders.isVisible = true;
		this.view.flxSortBy.isVisible = true;
		this.view.flxScroll.setEnabled(false);
		this.view.flxHeader.setEnabled(false);
		this.view.lblDownloadOrders.text =kony.i18n.getLocalizedString("i18n.wealth.downloadOrders");
		this.view.lblSortyBy.text = kony.i18n.getLocalizedString("i18n.wealth.sortBy");
		this.view.flxAdditionalOptions.isVisible = true;
		},
		
onClickOrderCancel: function(){
	this.view.flxScroll.setEnabled(false);
	this.view.flxHeader.setEnabled(false);
    this.view.flxConfirmationPopUp.isVisible = true;
    this.view.flxAdditionalOptions.isVisible = false;
	var i18Text=kony.i18n.getLocalizedString("i18n.wealth.cancelOrderConfirmation");
    this.view.lblMsg.text =i18Text+ '"' + this.description + '"?';
  },
  yesClick: function(){
    var params ={};
    if(this.assetType !== undefined && this.assetType !== null){
      params = {
      "orderId": this.orderReference,
      "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
      "assetType": this.assetType
      };
    }
    else{
      params = {
      "orderId": this.orderReference,
      "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
      };
    }
    if(this.cancelOrderIds===""){
      this.cancelOrderIds=this.orderReference;
    }else{
      this.cancelOrderIds=this.cancelOrderIds+","+this.orderReference;
    }
    this.view.segmentDetailsWealth.cancelOrder(params,this.cancelOrderIds);
	this.view.flxScroll.setEnabled(true);
	this.view.flxHeader.setEnabled(true);
    this.view.flxConfirmationPopUp.setVisibility(false);
  },  
  noClick: function(){
	this.view.flxScroll.setEnabled(true);
	this.view.flxHeader.setEnabled(true);
    this.view.flxConfirmationPopUp.setVisibility(false);
  },
  onClickModify: function(){
	applicationManager.getModulesPresentationController({"moduleName" : "WealthOrderUIModule", "appName" : "WealthOrderMA"}).ordersPage = true;
	this.view.flxScroll.setEnabled(true);
	this.view.flxHeader.setEnabled(true);
    var referenceCurrency=this.view.segmentDetailsWealth.getRefCurrency();
     var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("frmOrdersModifyButton", true);
    this.setCashBalance(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioCashAccounts, referenceCurrency);
    if(this.orderType === "Buy Limit" || this.orderType ==="Buy Stop Loss" || this.orderType ==="Buy Market" || this.orderType ==="Buy Stop Limit"){
    this.callOnNavigate('Buy');
    }
    else{
       this.callOnNavigate('Sell');
    }
   },
   timePeriod: function(){
      var navManager = applicationManager.getNavigationManager();
      var dateFlag = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
      var selectedValue = this.view.segmentDetailsWealth.getPreviousDaysText();
      var dataSet = {};
      var period;
      if(selectedValue == "Previous 30 days"){
        period ="previous30DaysSelected";
      }
      else if(selectedValue == "3 Months"){
        period ="3MonthsSelected";
      }
      else if(selectedValue == "6 Months"){
        period ="6MonthsSelected";
      }
      else if(selectedValue == "Last year"){
        period ="lastYearSelected";
      }
      else{
        period ="freeDateSelected";
      }
	 
      dataSet.flag = dateFlag.flag;
      dataSet.selectedDays = period ;
      navManager.setCustomInfo('frmOrders', dataSet);
      navManager.navigateTo("frmDateRange");
	  
  },
  setCashBalance:function(data,currency){
    var finalAmount;
    var finalCurrency;
    if(data.length===1){
      finalAmount=data[0].balance;
      finalCurrency=data[0].currency;
    }else{
      for(var num in data){
        if(currency===data[num].currency){
          finalAmount=data[num].balance;
          finalCurrency=data[num].currency;
          break;
        }else{
          finalAmount=data[0].balance;
          finalCurrency=data[0].currency;
        }
      }
    }
    var formatUtil=applicationManager.getFormatUtilManager();       
    //this.view.lblCashVal.text = formatUtil.formatAmountandAppendCurrencySymbol(finalAmount,finalCurrency);
    var navManager=applicationManager.getNavigationManager();
     var amount = navManager.getCustomInfo("frmInvestmentAcc");
    if(kony.sdk.isNullOrUndefined(amount)){
      var amount={};
      amount.finalAmount=finalAmount;
    }else{
      amount.finalAmount=finalAmount;
    }
      navManager.setCustomInfo('frmInvestmentAcc',amount);
  },
    callOnNavigate:function(selectedOrder){
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").searchEntryPoint = false;
	 var navManager = applicationManager.getNavigationManager(); 
   // var value = navManager.getCustomInfo('frmOrders');
	 var data ={};
	 data=this.tempData;
      var ricId = this.selectedRicCode;
      var isin=this.ISINCode;
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isTapIntegration = data.response.isTapIntegration;

      var param = {
        "ISINCode": isin,
        "RICCode": ricId,
        "instrumentId" : data.response.instrumentId,
        "application" : scope_WealthPresentationController.applicationId?scope_WealthPresentationController.applicationId :""
		
      };
    var selData={'selOrder':selectedOrder, 'response':data.response};
    
    data.response.mode = selData.selOrder;
    navManager.setCustomInfo("frmOrders", selData);
    navManager.setCustomInfo("frmInstrumentOrder",data.response);
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").isFrmOrder = true;
    var wealthModule = applicationManager.getModulesPresentationController({"moduleName" : "WealthOrderUIModule", "appName" : "WealthOrderMA"});
	wealthModule.getInstrumentDetails(param);
    this.view.flxAdditionalOptions.isVisible = false;
    },  
  onClickCancel: function(){
	this.view.flxScroll.setEnabled(true);
	this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
    this.view.flxAdditionalOptions.isVisible = false;
  },
  onClickSortBy: function(){
	this.view.flxScroll.setEnabled(true);
	this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
    var data={};
    
    var navManager = applicationManager.getNavigationManager();
	if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders == ""){
      data.sortByValue="tradeDate";
      navManager.setCustomInfo("frmOrders", data);
    }
    else{
      data.sortByValue = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueOrders;
      navManager.setCustomInfo("frmOrders", data);
    }
    navManager.navigateTo("frmSortBy");
  },
  onClickDownloadOrders: function() {
	    this.view.flxScroll.setEnabled(true);
		this.view.flxHeader.setEnabled(true);
    	this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
 	    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams = this.view.segmentDetailsWealth.getCriteriaObjValue(); 
		if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams !== "" && applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams !=='undefined' && applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.type=="open")
         {
			  applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.navPage = "Open Order";
		 }else{
			  applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.navPage = "History Order";
		 }
      
     
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.getDownloadList(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
        kony.print("test"+applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
    },
   onClickDownloadMessage:function(base64String,filename)
  {
    try 
    {  
       this.view.flxPopup.setVisibility(false);
       this.view.flxAdditionalOptions.isVisible = false;
       this.view.socialshare.shareWithBase64(base64String,filename);
    }catch(error){   
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
 
  onBack : function () {
	 var existingParam = {};
     this.view.segmentDetailsWealth.setCriteriaObjectValue(JSON.stringify(existingParam));
     var navMan=applicationManager.getNavigationManager();
     //WIW-1836 fix
	 var lastForm = navMan.stack[navMan.stack.length - 1];
	 if(lastForm === "frmOrders"){
		 navMan.stack.pop();
	 }
     

     if(scope_WealthPresentationController.searchInstrumentForm === "frmWatchlist"){
        new kony.mvc.Navigation({"appName" : "WealthOrderMA", "friendlyName" : "frmWatchlist"}).navigate();

     }
    else{
       new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : scope_WealthPresentationController.searchInstrumentForm }).navigate();

    }
  },
  checkPermission: function(uiPermissions){
    if(uiPermissions==="formUI" && applicationManager.getModulesPresentationController("WealthPortfolioUIModule").ordType === "open"){
       var getPermissionDetails = JSON.parse(this.view.segmentDetailsWealth.getFeaturesAndPermissions());
	   if (typeof getPermissionDetails !== "undefined") {
	    var configManager = applicationManager.getConfigurationManager();
		 let contextualMenuFeature=false;
		 if (getPermissionDetails.contextualMenuFeature.length > 0) {
			 contextualMenuFeature = configManager.checkUserFeature(getPermissionDetails.contextualMenuFeature);
		 }
        if (contextualMenuFeature) {
	    this.view.segmentDetailsWealth.setVisibleActionImage(true);
		let modifyPermission = false;
        let viewPermission = false;
		let cancelPermission = false;
		if (getPermissionDetails.modify.length > 0) {
          modifyPermission = (scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount)?'false' :configManager.checkAtLeastOnePermission(getPermissionDetails.modify);
		  this.view.lblModify.text = kony.i18n.getLocalizedString("i18n.wealth.modifyOrder");//kony.i18n.getLocalizedString("i18n.wealth.modifyOrder");
		  this.view.flxModify.isVisible = modifyPermission;
		 }
        if (getPermissionDetails.view.length > 0) {
          viewPermission = configManager.checkAtLeastOnePermission(getPermissionDetails.view);
          this.view.lblView.text = kony.i18n.getLocalizedString("i18n.wealth.viewOrder");
		  this.view.flxViewOrder.isVisible = viewPermission;
          this.view.segmentDetailsWealth.onRowClickEvent = viewPermission ? this.onOrderHistorySelect : null;
		 }
        if (getPermissionDetails.cancel.length > 0) {
          cancelPermission =(scope_WealthPresentationController.isAdvisory || scope_WealthPresentationController.isJointAccount)?'false' : configManager.checkAtLeastOnePermission(getPermissionDetails.cancel);
		  this.view.lblCancelOrder.text = kony.i18n.getLocalizedString("i18n.wealth.cancelOrder");//kony.i18n.getLocalizedString("i18n.wealth.cancelOrder");
		  this.view.lblCancelOrder.skin = "sknLblRed0ea08208b3c9142";
          this.view.flxCancelOrder.isVisible = cancelPermission;
        }
      }      
      else {
		  this.view.segmentDetailsWealth.setVisibleActionImage(false);
      }
	  }
    } else if(uiPermissions==="componentUI"){
      var ordersPermissionsString=this.openOrderPermission+"|"+this.historyOrderPermission;
      return ordersPermissionsString;
    }
  }
});