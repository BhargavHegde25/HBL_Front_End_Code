define({ 
  sortByCustomData : "",
  segValue : {},
  param : "",
  dateRange : [],
  init : function(){
    try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    //this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.previous30Days");
  }catch(err) {
        this.setError(err, "init");
      }
    },
  preShow: function(){
    try{
    this.view.flxAdditionalOptions.setVisibility(false);
    var navManager=applicationManager.getNavigationManager();
    this.sortByCustomData = navManager.getCustomInfo("frmSortBy");
    this.dateRange = scope_WealthPresentationController.selectedDateRangeDetails;
    this.setLblPreviousDays(this.dateRange);
    var instrTransactions = applicationManager.getModulesPresentationController("WealthOrderUIModule").getInstrumentTransactions();
    this.view.lblInstrumentName.text = instrTransactions.instrumentName;
    var arr=this.view.lblInstrumentName.text.split('');
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") { 
      if(arr.length>27){
        this.view.flxInstrumentInfo.height = "100dp";
      }
      else{
        this.view.flxInstrumentInfo.height = "80dp";
        this.view.lblInstrumentName.top = "10dp";
      }
    } else {
      if(arr.length>22){
        this.view.flxInstrumentInfo.height = "100dp";
      }
      else{
        this.view.flxInstrumentInfo.height = "80dp";
        this.view.lblInstrumentName.top = "10dp";
      }
    }
    this.view.lblInstrumentSymbol.text = instrTransactions.ISINcode;
    // var configManager = applicationManager.getConfigurationManager();
    //       if(configManager.getBaseCurrency() === 'EUR'){
    //         this.formatUtils.setEuropeFlow(true);
    //     }
    //       else{
    //         this.formatUtils.setEuropeFlow(false);
    //       }
    if(scope_WealthPresentationController.portfolioId === "")
    {
      scope_WealthPresentationController.portfolioId = scope_WealthPresentationController.watchlistPortfolioId;
    }
    var params = {
      "portfolioId": scope_WealthPresentationController.portfolioId,
      "startDate": this.dateRange.startDate,
      "endDate": this.dateRange.endDate,
      "instrumentId":instrTransactions.instrumentId,
      "sortBy": (scope_WealthPresentationController.sortByValueInstrumentTrans === "")?"tradeDate":scope_WealthPresentationController.sortByValueInstrumentTrans,
      "sortOrder":"asc",
      "downloadFormat": "pdf"
    };  
    if(params.sortBy == "tradeDate" || params.sortBy == "valueDate")
      params.sortOrder = "desc";
    this.param = params;
    var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    wealthOrderModule.getViewTransactions(params);
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
  initActions: function(){
    try{
    this.view.segList.onRowClick = this.onTransactionSelect;
    this.view.flxPreviousDays.onTouchEnd = this.timePeriod;
    // this.view.segmentDetailsWealth.onRowClickEvent = this.onTransactionSelect;
    //  this.view.segmentDetailsWealth.onMoveToDateRange   = this.timePeriod;
    this.view.customHeader.flxSearch.onTouchEnd = this.moreOptions;
    this.view.flxCancelOption.onTouchEnd = this.onCancel;
    this.view.flxSortBy.onTouchEnd = this.onClickSortBy;
    this.view.flxDownloadTransactions.onTouchEnd = this.onClickDownloadTxns;
    this.view.customHeader.flxBack.onClick =this.onBack;
    //     this.view.segmentDetailsWealth.onRequestEnd = function() {
    //       applicationManager.getPresentationUtility().dismissLoadingScreen();
    //     };
    // 	this.view.segmentDetailsWealth.onRequestStart = function() {
    //       applicationManager.getPresentationUtility().showLoadingScreen();
    //     };
    this.checkPermission();
       }catch(err) {
        this.setError(err, "initActions");
      }
  },

  onInstrumentTransactionSuccess: function(response) {
    try{
    var segData = [];
    var storeData;
    var value = response.portfolioTransactions;
    if(value === undefined || value.length === 0) {
      this.view.lblError.setVisibility(true);
      this.view.segList.setVisibility(false);
    }
    else {
      this.view.lblError.setVisibility(false);
      this.view.segList.setVisibility(true);
      var forUtility = applicationManager.getFormatUtilManager();
      for(var i in value){
        let price = forUtility.formatAmountandAppendCurrencySymbol(value[i].limitPrice, value[i].referenceCurrency);
        let totalVal = forUtility.formatAmountandAppendCurrencySymbol(value[i].total, value[i].referenceCurrency);
        let tradeDate = value[i].tradeDate.split("-")[1] + "/" + value[i].tradeDate.split("-")[2] + "/" + value[i].tradeDate.split("-")[0];
        let valueDate = value[i].valueDate.split("-")[1] + "/" + value[i].valueDate.split("-")[2] + "/" + value[i].valueDate.split("-")[0];
        storeData = {
          zeroKey: kony.i18n.getLocalizedString("i18n.wealth.tradeDatemb"),
          oneKey: kony.i18n.getLocalizedString("i18n.wealth.type"),
          twoKey: kony.i18n.getLocalizedString("i18n.wealth.qtymb"),
          threeKey: kony.i18n.getLocalizedString("i18n.wealth.pricemb"),
          fourKey: kony.i18n.getLocalizedString("i18n.wealth.valueDatemb"),
          fiveKey: kony.i18n.getLocalizedString("i18n.wealth.totalWithColon"),
          tradeDate: tradeDate,
          orderType: value[i].orderType,
          quantity: value[i].quantity,
          limitPrice: price,
          valueDate: valueDate,
          total: totalVal,
          referenceCurrency: value[i].referenceCurrency,
          netAmount: value[i].netAmount,
          instrumentId: value[i].instrumentId,
          description: value[i].description,
          instrumentAmount: value[i].instrumentAmount,
          ISIN: value[i].ISIN,
          transactionId: value[i].transactionId,
          exchangeRate: value[i].exchangeRate,
          instrumentCurrency: value[i].instrumentCurrency,
          holdingsType: value[i].holdingsType,
		  fees:value[i].fees,
          feesCurrency: value[i].feesCurrency,
          RICCode: value[i].RICCode
        };
        segData.push(storeData);
      }
      this.view.segList.widgetDataMap = {
        lblZeroKey: "zeroKey",
        lblZeroVal: "tradeDate",
        lblOneKey: "oneKey",
        lblOneVal: "orderType",
        lblTwoKey: "twoKey",
        lblTwoVal: "quantity",
        lblThreeKey: "threeKey",
        lblThreeVal: "limitPrice",
        lblFourKey: "fourKey",
        lblFourVal: "valueDate",
        lblFiveKey: "fiveKey",
        lblFiveVal: "total"
      };
      this.view.segList.setData(segData);
    }
       }catch(err) {
        this.setError(err, "onInstrumentTransactionSuccess");
      }
  },
  onInstrumentTransactionFailure:function(error){
    try{
      this.view.lblError.setVisibility(true);
      this.view.segList.setVisibility(false);
    }catch(err) {
        this.setError(err, "onInstrumentTransactionFailure");
      }
  },

  setLblPreviousDays: function(dateRange){
    try{
    if(dateRange.selectedPeriod){
      if(dateRange.selectedPeriod=="previous30DaysSelected"){
        this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.previous30Days");
      }else if(dateRange.selectedPeriod=="3MonthsSelected"){
        this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.threeMonths");
      }else if(dateRange.selectedPeriod=="6MonthsSelected"){
        this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.sixMonths");
      }else if(dateRange.selectedPeriod=="lastYearSelected"){
        this.view.lblPreviousDays.text=kony.i18n.getLocalizedString("i18n.wealth.lastYear");
      }else{
        var startDateObj=dateRange.startDate.split("-");
        var formattedstartDate=startDateObj[1] +"/"+ startDateObj[2] +"/"+ startDateObj[0];
        var endDateObj=dateRange.endDate.split("-");
        var formattedendDate=endDateObj[1] +"/"+ endDateObj[2] +"/"+ endDateObj[0];
        this.view.lblPreviousDays.text=formattedstartDate + " - " + formattedendDate;
      }
    }else{

      this.view.lblPreviousDays.text = kony.i18n.getLocalizedString("i18n.wealth.previous30Days"); 
    }
       }catch(err) {
        this.setError(err, "setLblPreviousDays");
      }
  },

  moreOptions:function(){
    try{
    this.view.flxScroll.enableScrolling = false;
    this.view.flxScroll.setEnabled(false);
    this.view.flxHeader.setEnabled(false);
    this.view.flxAdditionalOptions.setVisibility(true);
    this.view.lblDownloadTransactions.text = kony.i18n.getLocalizedString("i18n.wealth.downloadTransactions");
    this.view.lblSortyBy.text = kony.i18n.getLocalizedString("i18n.wealth.sortBy");
     }catch(err) {
        this.setError(err, "moreOptions");
      }
    },
  onCancel:function(){
    try{
    this.view.flxScroll.enableScrolling = true;
    this.view.flxScroll.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
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
    var navManager = applicationManager.getNavigationManager();
    if(scope_WealthPresentationController.sortByValueInstrumentTrans == ""){
      data.sortByValue="tradeDate";
      navManager.setCustomInfo("frmInstrumentTransactions", data);
    }
    else{
      data.sortByValue = scope_WealthPresentationController.sortByValueInstrumentTrans;
      navManager.setCustomInfo("frmInstrumentTransactions", data);
    }
    navManager.navigateTo("frmOrderSortBy");
       }catch(err) {
        this.setError(err, "onClickSortBy");
      }
  },
  onBack: function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo("frmInstrumentDetails");
       }catch(err) {
        this.setError(err, "onBack");
      }
  },
  timePeriod: function(){
    try{
    var navManager = applicationManager.getNavigationManager();
    var dateFlag = scope_WealthPresentationController.selectedDateRangeDetails;
    var selectedValue = this.view.lblPreviousDays.text;
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
    navManager.setCustomInfo('frmInstrumentTransactions', dataSet);
    navManager.navigateTo("frmOrderDateRange");
       }catch(err) {
        this.setError(err, "timePeriod");
      }
  },


  onTransactionSelect:function(){
    try{
    var navManager=applicationManager.getNavigationManager();
    var data={};
    //     var rowIndexValue=context.rowIndex;
    data.response=this.view.segList.selectedRowItems[0];
   // data.response.referenceCurrency =  rowData.row.referenceCurrency;
    navManager.setCustomInfo("frmViewTransactionDetails", data);
    navManager.navigateTo("frmOrderViewTransactionDetails");
       }catch(err) {
        this.setError(err, "onTransactionSelect");
      }
  },
  onClickDownloadTxns: function() {
    try{
    this.view.flxScroll.setEnabled(true);
    this.view.flxHeader.setEnabled(true);
    this.view.flxScroll.enableScrolling = true; //[IW-3773] - Ayush Raj
    scope_WealthPresentationController.downloadParams = this.param;
    scope_WealthPresentationController.downloadParams.navPage = "InstrumentTransactions";
    scope_WealthPresentationController.downloadParams.downloadFormat="pdf";
    var wealthOrderModule = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    wealthOrderModule.getWatchDownloadList(scope_WealthPresentationController.downloadParams);
    kony.print("test"+scope_WealthPresentationController.downloadParams);
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
    // var getPermissionDetails = JSON.parse(this.view.segmentDetailsWealth.getFeaturesAndPermissions());
    var getPermissionDetails = JSON.parse('{"viewDetails":["WEALTH_PORTFOLIO_DETAILS_TRANSACTIONS_VIEW"]}');
    var transDetailViewPermission=false;
    if(typeof getPermissionDetails !=="undefined")
    {
      if (getPermissionDetails.viewDetails.length > 0) {
        transDetailViewPermission = configManager.checkAtLeastOnePermission(getPermissionDetails.viewDetails);
        this.view.segList.onRowClick = transDetailViewPermission ? this.onTransactionSelect : "";
        //this.view.segmentDetailsWealth.onRowClickEvent = transDetailViewPermission ? this.onTransactionSelect : "";
      }

    }
    }catch(err) {
        this.setError(err, "checkPermission");
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

});
