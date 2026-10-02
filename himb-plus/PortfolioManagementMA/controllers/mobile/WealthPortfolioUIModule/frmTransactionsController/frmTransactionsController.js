
define({ 
sortByCustomData : "",
segValue:{},
dateRange : [],
init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 //this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.previous30Days");
  },
  preShow:function(){
    try{
     this.view.flxAdditionalOptions.setVisibility(false);
    var navManager=applicationManager.getNavigationManager();
     this.sortByCustomData = navManager.getCustomInfo("frmSortBy");
     this.dateRange = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").selectedDateRangeDetails;
     this.view.segmentDetailsWealth.setLblPreviousDays(this.dateRange);
      var configManager = applicationManager.getConfigurationManager();
      if(configManager.getBaseCurrency() === 'EUR'){
      this.view.segmentDetailsWealth.setEuroFlow(true);
    }
      else{
         this.view.segmentDetailsWealth.setEuroFlow(false);
      }
       var params = {
                "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
                "startDate": this.dateRange.startDate,
                "endDate": this.dateRange.endDate,
                "type": "Transactions",
                "instrumentName": " ",
                "sortBy": (applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans === "")?"tradeDate":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans,
            };       
    this.view.segmentDetailsWealth.setContext(params);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
   this.view.flxAdditionalOptions.setVisibility(false);
    navManager.setCustomInfo("frmPortfolioDetails", false);
    this.initActions();
    }catch(err) {
        this.setError(err, "preShow");
      } 
  },
  initActions:function(){
    try{
    this.view.segmentDetailsWealth.onRowClickEvent = this.onTransactionSelect;
    this.view.segmentDetailsWealth.onMoveToDateRange   = this.timePeriod;
    this.view.customHeader.flxSearch.onTouchEnd = this.moreOptions;
    this.view.flxCancelOption.onTouchEnd = this.onCancel;
    this.view.flxSortBy.onTouchEnd = this.onClickSortBy;
    //this.view.flxDownloadTransactions.onTouchEnd = this.onClickDownloadTxns;
    this.view.flxDownloadTransactions.onTouchEnd =this.nav;
    this.view.customHeader.flxBack.onClick =this.onBack;
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.wealth.transactions");
    this.view.title = kony.i18n.getLocalizedString("i18n.wealth.transactions");
    this.view.segmentDetailsWealth.onRequestEnd = function() {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    };
	this.view.segmentDetailsWealth.onRequestStart = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
    };
	this.checkPermission();
      }catch(err) {
        this.setError(err, "initActions");
      } 
  },
  postShow:function(){

  },
  nav: function()
  {
    try{
    this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.setEnabled(true);
    this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
    var navMan = applicationManager.getNavigationManager();
    // IW-3693 - Bhuvaneshwaran - Starts
    scope_WealthPresentationController.searchInst=this.view.segmentDetailsWealth.getCriteriaObjValue().searchByInstrumentName;
    //IW-3693 - ends
    navMan.navigateTo("frmDownload");
      }catch(err) {
        this.setError(err, "nav");
      } 
  },
  moreOptions:function(){
    try{
    this.view.flxScroll.setEnabled(false);
    this.view.flxHeader.setEnabled(false);
    this.view.flxScroll.enableScrolling = false;
    this.view.flxAdditionalOptions.setVisibility(true);
	this.view.lblDownloadTransactions.text = kony.i18n.getLocalizedString("i18n.wealth.downloadTransactions");
	this.view.lblSortyBy.text = kony.i18n.getLocalizedString("i18n.wealth.sortBy");
      }catch(err) {
        this.setError(err, "moreOptions");
      } 
  },
  onCancel:function(){
    try{
    this.view.flxScroll.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.enableScrolling = true;
    this.view.flxAdditionalOptions.setVisibility(false);
     }catch(err) {
        this.setError(err, "onCancel");
      } 
  },
 
  onClickSortBy: function(){
    try{
     this.view.flxScroll.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
	   var data={};
   // data.searchText= this.view.tbxSearch.text;
    var navManager = applicationManager.getNavigationManager();
    if(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans == ""){
      data.sortByValue="tradeDate";
      navManager.setCustomInfo("frmTransactions", data);
    }
    else{
      data.sortByValue = applicationManager.getModulesPresentationController("WealthPortfolioUIModule").sortByValueTrans;
      navManager.setCustomInfo("frmTransactions", data);
    }
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmSortBy");
      }catch(err) {
        this.setError(err, "onClickSortBy");
      } 
	},
    onBack : function () {
      try{
    var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmPortfolioDetails");
      }catch(err) {
        this.setError(err, "onBack");
      } 
  },
    timePeriod: function(){
      try{
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
      //dataSet.searchValue = this.view.tbxSearch.text;
      dataSet.flag = dateFlag.flag;
      dataSet.selectedDays = period ;
      navManager.setCustomInfo('frmTransactions', dataSet);
      navManager.navigateTo("frmDateRange");
        }catch(err) {
        this.setError(err, "timePeriod");
      } 
  },

 
  onTransactionSelect:function(rowData){
    try{
     var navManager=applicationManager.getNavigationManager();
      var data={};
//      var rowIndexValue=context.rowIndex;
    var transaction = rowData.row;
     data.response=transaction;
     data.response.referenceCurrency =  rowData.row.referenceCurrency;
     navManager.setCustomInfo("frmViewTransactionDetails", data);
     navManager.navigateTo("frmViewTransactionDetails");
      }catch(err) {
        this.setError(err, "onTransactionSelect");
      } 
  },
	onClickDownloadTxns: function() {
      try{
       this.view.flxScroll.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
      this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams = this.view.segmentDetailsWealth.getCriteriaObjValue(); 
      applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams.navPage = "Transactions";
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.getDownloadList(applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
        kony.print("test"+applicationManager.getModulesPresentationController("WealthPortfolioUIModule").downloadParams);
        }catch(err) {
        this.setError(err, "onClickDownloadTxns");
      } 
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
   checkPermission: function(){
     try{
    var configManager = applicationManager.getConfigurationManager();
    var getPermissionDetails = JSON.parse(this.view.segmentDetailsWealth.getFeaturesAndPermissions());
    var transDetailViewPermission=false;
    if(typeof getPermissionDetails !=="undefined")
      {
        if (getPermissionDetails.viewDetails.length > 0) {
        transDetailViewPermission = configManager.checkAtLeastOnePermission(getPermissionDetails.viewDetails);
        this.view.segmentDetailsWealth.onRowClickEvent = transDetailViewPermission ? this.onTransactionSelect : "";
     }
        
      }
       }catch(err) {
        this.setError(err, "checkPermission");
      } 
    
    
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
    }

});
