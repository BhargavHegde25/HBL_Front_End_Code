define({
  searchList: [],
  init : function(){
    try{
    this.view.preShow =  this.preShow;
    this.view.postShow = this.postShow;
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    }catch(err) {
        this.setError(err, "init");
      } 
    },
  onClickCancel:function(){
    //navigate back
    /*var wealthMod = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
    wealthMod.commonFunctionForgoBack();*/
    new kony.mvc.Navigation({"appName" : "PortfolioManagementMA", "friendlyName" : "frmPortfolioDetails"}).navigate();

  },
  postShow:function(){
    if (scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
       this.view.tbxSearch.padding=[35,3,35,3];   
      this.view.tbxSearch.left = "80dp";
    }
  },
  preShow:function(){
    try{
    var scope = this;
    scope_WealthPresentationController.searchInstrumentForm="frmPortfolioDetails";
    function timercallback(){
      scope.view.tbxSearch.setFocus(true);
    }
    this.view.tbxSearch.text = "";
    kony.timer.schedule("tbxfocustimer1", timercallback, 0.5, false);
    this.view.segInstrument.isVisible = false;
    this.view.flxError.isVisible = false;
    this.view.tbxSearch.text = "";
    this.view.imgClose.isVisible =  false;
    /*  var navigationMan=applicationManager.getNavigationManager();
    var temp = navigationMan.getCustomInfo("frmInstrumentSearch");
    var data = temp.response;
    this.searchList = data.instrumentList;*/
    this.initActions();
    }catch(err) {
        this.setError(err, "preShow");
      } 
  },
  initActions:function(){
    try{
    this.view.tbxSearch.onTextChange=this.onSearchInstrument;  
    this.view.btnCancel.onClick = this.onClickCancel;
    this.view.imgClose.onTouchEnd = this.clearText;
    this.view.segInstrument.onRowClick = this.onSelectInstrument;
    }catch(err) {
        this.setError(err, "initActions");
      } 
  },
  onSearchInstrument:function(){  
    try{
    this.view.imgClose.isVisible =  true;
    this.view.flxError.isVisible = false;
    this.view.segInstrument.removeAll();

    if(this.view.tbxSearch.text === "" || this.view.tbxSearch.text === null||this.view.tbxSearch.text.length<3){
      this.view.segInstrument.setVisibility(false);
      this.view.imgClose.isVisible =  false;
    }else{
      var searchTxt = this.view.tbxSearch.text;
      var params = {
        "sortBy": "",
        "searchByInstrumentName": searchTxt,
        "portfolioId": applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId
      };
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
      wealthModule.getInstrumentSearchList(params);
      //  this.setResultDataToSeg(searchTxt);
    }
    }catch(err) {
        this.setError(err, "onSearchInstrument");
      } 
  },
  onSelectInstrument: function(){
    try{
    var rowIndex = this.view.segInstrument.selectedRowIndex[1];
    var rowData = this.view.segInstrument.data[rowIndex];
    var wealthMod = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
    wealthMod.setInstrumentId(rowData.instrumentId);
    // var marketName = rowData.marketName;

    rowData.totalValue= applicationManager.getModulesPresentationController("WealthPortfolioUIModule").marketValue;
    var data = {};
    data.response = rowData;
    var navigationMan=applicationManager.getNavigationManager();
    navigationMan.setCustomInfo("frmInstrumentDetails",data);
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").instrumentDetailsEntry=true;
    applicationManager.getModulesPresentationController("WealthPortfolioUIModule").searchEntryPoint=true;
    wealthMod.setISINCode(rowData.ISIN);
    wealthMod.setRICCode(rowData.RICCode);
    wealthMod.setInstrumentId(rowData.instrumentId);
	scope_WealthPresentationController.applicationId=rowData.application;

    //     var param={
    //       "ISINCode": rowData.ISIN?rowData.ISIN:'',
    //       "RICCode": rowData.RICCode?rowData.RICCode:'',
    //       "instrumentId" : rowData.instrumentId?rowData.instrumentId:''
    //     };
    //     wealthMod.getInstrumentDetails(param);

    var paramHoldings = {
      "portfolioId":applicationManager.getModulesPresentationController("WealthPortfolioUIModule").portfolioId,
      "navPage":"Holdings",
      "sortBy":"description",
      "searchByInstrumentName": rowData.instrumentName,
      "RICCode":rowData.RICCode,
      "instrumentId":rowData.instrumentId,
      "isIncludeOrders":"false"
    };
    wealthMod.getHoldings(paramHoldings);
    }catch(err) {
        this.setError(err, "onSelectInstrument");
      } 
  },
  clearText: function(){
    try{
    this.view.tbxSearch.text = "";
    this.view.imgClose.isVisible =  false;
    this.view.flxError.isVisible=false;
    this.view.segInstrument.removeAll();
    }catch(err) {
        this.setError(err, "clearText");
      } 
  },
  setResultDataToSeg: function(){
    try{
    var currForm = kony.application.getCurrentForm();
    var navigationMan=applicationManager.getNavigationManager();
    var temp = navigationMan.getCustomInfo("frmInstrumentSearch");
    var data1 = temp.response;
    var data=data1.instrumentList;
    // this.searchList = data.instrumentList;

    //  var searchData = [];
    //   searchData = this.searchList;
    //  var data = searchData.filter(el => ((el.description).toLowerCase()).indexOf(searchText) !== -1);
    if(data.length === 0){
      this.view.flxError.isVisible = true;
    }
    else{
      var segData = [];
      for(var list in data){	

        var exchange;
        if(data[list].ISIN && data[list].holdingsType )
        {
          exchange = data[list].ISIN + ' | ' + data[list].holdingsType;
        }
        else if(data[list].ISIN)
        {
          exchange = data[list].ISIN;
        }
        else if(data[list].holdingsType )
        {
          exchange = data[list].holdingsType;
        }
        else
        {
          exchange={"isVisible": false};
          //exchange="";
        }
        var storeData = {
          instrumentName: data[list].description,
          marketName: exchange,
          instrumentId: data[list].instrumentId,
          description: data[list].description,
          ISIN: data[list].ISIN,
          holdingsType: data[list].holdingsType,
          RICCode: data[list].RICCode
        };
        if(data[list].application){
          storeData.application = data[list].application;
        //scope_WealthPresentationController.applicationId = data[list].application;
        }
        segData.push(storeData);
      }
      this.view.segInstrument.widgetDataMap = {
        lblInstrumentName: "instrumentName",
        lblInstrumentDet: "marketName"
      };		
      this.view.segInstrument.removeAll();
      this.view.segInstrument.setData(segData);
      this.view.segInstrument.setVisibility(true);
      currForm.forceLayout();
    }
    }catch(err) {
        this.setError(err, "setResultDataToSeg");
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
