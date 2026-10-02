define({ 
	index:"",
    selecdata:{},
  initialData:[],
  //Type your controller code here
  init: function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
	    var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    wealthMod.instantiateWealthObject();
       }catch(err) {
        this.setError(err, "init");
      }
  },


  preShow: function () {
    try{
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.setVisibility(false);
      this.view.flxMainContainer.top = "0dp";
        this.view.tbxSearch.setFocus(false);
   
    } else {
      this.view.flxHeader.setVisibility(true);
    }
    this.view.tbxSearch.text="";
    
    if(scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale())){
    this.view.tbxSearch.padding = [30,3,35,3];
    }
       }catch(err) {
        this.setError(err, "preShow");
      }
  },

  postShow: function () {
    try{
    this.initActions(); 
    if(scope_WealthPresentationController.currencyConv === true){
       this.index="";
      scope_WealthPresentationController.currencyConv = false;
       this.view.btnDone.setEnabled(false);
      this.view.btnDone.skin="sknBtnE2E9F0Rounded";
      this.view.tbxSearch.text="";
    //  this.view.tbxSearch.setFocus(false);
    
     }
    this.setSegmentData();
    if(scope_WealthPresentationController.currencyConvData === true){
       this.initialData = this.view.segCurrency.data;
  scope_WealthPresentationController.currencyConvData=false;
    }
       }catch(err) {
        this.setError(err, "postShow");
      }
   },
  
  flagPaths : {
    "GBP":"britishpound.png",
    "CHF":"swissfranc.png",
    "USD":"usdollar.png",
    "CAD":"canadiandollar.png",
    "EUR":"euro.png"
  },
  
setSegmentData:function(){
  try{
  var navManager = applicationManager.getNavigationManager();
 var accounts= navManager.getCustomInfo('frmSelectCurrency');
if(accounts === undefined || accounts.cashAcc === undefined){
  accounts = {};
  accounts.cashAcc = navManager.getCustomInfo("frmCashBalance");
}
  var currencydetails=accounts && accounts.cashAcc?accounts.cashAcc:[];
  if(accounts.index) {
    this.index = accounts.index;
  }
   var results=[];
    for(var num in currencydetails){
      var data=currencydetails[num];
      var fullcurrency=data.currency+' - '+data.currencyName;
      var storeData={
       lblCurrencyType :fullcurrency,
       imgRadio:accounts.index && num===accounts.index?"radiobtn_big.png":"radiobuttoninactive.png",
       lblseparator:"",
       imgFlag:{"src":this.flagPaths[data.currency] || "defaultflag.png",
               "isVisible":true},
       balance: data.balance   
      };
      results.push(storeData);
    }
 
   this.view.segCurrency.widgetDataMap = {
      "imgFlag":"imgFlag",
      "lblCurrencyType":"lblCurrencyType",
      "lblSeparator":"",
      "imgRadio":"imgRadio",
     "dummylbl":"balance"
    }
   this.view.segCurrency.setData(results);
   if(this.index !== ""){
   this.setSelection();
  }
     }catch(err) {
        this.setError(err, "setSegmentData");
      }
},
  initActions: function () {
    try{
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
    this.view.btnDone.onClick = this.confirmOnClick;
    this.view.segCurrency.onRowClick = this.toggleSelection;
    this.view.tbxSearch.onDone=this.onSearchCurrency;
       }catch(err) {
        this.setError(err, "initActions");
      }
  }, 

  onBack: function () {
    try{
     var navMan=applicationManager.getNavigationManager();
   
    if(scope_WealthPresentationController.verify===true){
      scope_WealthPresentationController.verify=false;
      navMan.navigateTo('frmConvertCurrencyVerify');
    }else{
     //  navMan.goBack();
      var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
		var params = {
			"portfolioId": scope_WealthPresentationController.portfolioId,
			"navPage": "Portfolio",
			"graphDuration": ""
		};
		wealthMod.getPortfolioAndGraphDetails(params);
	
    }
       }catch(err) {
        this.setError(err, "onBack");
      }
  },

  confirmOnClick: function () {
    try{
    var navMan=applicationManager.getNavigationManager();
    scope_WealthPresentationController.toConv = true;
    scope_WealthPresentationController.verify=false;
    var nonSelectedRow=[];
    var selectedRow = this.view.segCurrency.data[this.index];
    if(selectedRow===undefined){
      this.view.btnDone.setEnabled(false);
      this.view.btnDone.skin="sknBtnE2E9F0Rounded";
    }else{
      this.view.btnDone.setEnabled(true);
      this.view.btnDone.skin="sknBtn0095e4RoundedffffffSSP26px";
   
    for(var i=0;i<this.initialData.length;i++){
      if(selectedRow.lblCurrencyType!==this.initialData[i].lblCurrencyType){
        nonSelectedRow.push(this.initialData[i]);
      }
    }
    var currencyData = navMan.getCustomInfo("frmSelectCurrency");
    if(kony.sdk.isNullOrUndefined(currencyData)){
      var currencyData={};
      currencyData.fromCurrencyDetails=selectedRow;
    }else{
      currencyData.fromCurrencyDetails=selectedRow;
    }
    //currencyData.formName="frmSelectCurrency";
    currencyData.existingCurrency=nonSelectedRow;
    currencyData.index = this.index;
    navMan.setCustomInfo("frmSelectCurrency", currencyData);
    var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
    wealthMod.setSellCurrency(selectedRow.lblCurrencyType.split('-')[0].trim().toUpperCase());
    scope_WealthPresentationController.fromCurrencyFlag=selectedRow.imgFlag.src;
     var formatUtil=applicationManager.getFormatUtilManager();
        scope_WealthPresentationController.fromAccountBalance=formatUtil.formatAmountandAppendCurrencySymbol(selectedRow.balance,selectedRow.lblCurrencyType.split('-')[0].trim());
        
    
     if(wealthMod.getVerifyFlow()){
            //navMan.navigateTo("frmConvertCurrencyVerify");
       var data= wealthMod.getWealthObject();
       var param={
          "currencyPairs":data.sellCurrency+data.buyCurrency
       }
       wealthMod.getCurrencyRate(param);
      }else{
         wealthMod.getCurrencyList();
      }
  }
       }catch(err) {
        this.setError(err, "confirmOnClick");
      }
  },

  toggleSelection: function() {
    try{
     var selectedRowIndex = this.view.segCurrency.selectedRowIndex[1];
     var selectedRow = this.view.segCurrency.data[selectedRowIndex];
     this.index=selectedRowIndex;
    var segData = this.view.segCurrency.data;
    segData.forEach(el => el.imgRadio = "radiobuttoninactive.png");
    this.view.segCurrency.setData(segData);
    this.selecdata = selectedRow;
    selectedRow.imgRadio = "radiobtn_big.png";
    this.view.segCurrency.setDataAt(selectedRow, selectedRowIndex);
      this.view.btnDone.setEnabled(true);
      this.view.btnDone.skin="sknBtn0095e4RoundedffffffSSP26px";
  }catch(err) {
        this.setError(err, "toggleSelection");
      }
  },
  
  setSelection: function() {
    try{
    var selectedRow;
    var dataFromResponse = this.view.segCurrency.data;
      for (var list in dataFromResponse){
        if (dataFromResponse[list].lblCurrencyType === this.selecdata.lblCurrencyType) {
          this.index = parseInt(list);
          selectedRow = this.view.segCurrency.data[this.index];
        }
      }
    var segData = this.view.segCurrency.data;
    segData.forEach(el => el.imgRadio = "radiobuttoninactive.png");
    this.view.segCurrency.setData(segData);
    selectedRow.imgRadio = "radiobtn_big.png";
    this.view.segCurrency.setDataAt(selectedRow, this.index);
       }catch(err) {
        this.setError(err, "setSelection");
      }
  },
  onSearchCurrency:function(){
    try{
    var results=[];
    var tbxText=this.view.tbxSearch.text;
    var searchKey=tbxText.toUpperCase();
    var searchColumn="lblCurrencyType";
    var segmentData=this.view.segCurrency.data;
    if(tbxText!==""){
      for(i=0;i<segmentData.length;i++){
        var currencyData=segmentData[i][searchColumn].toUpperCase();
        if (currencyData.includes(searchKey)) {
          results.push(segmentData[i]);

        }
      }
    }
    this.view.segCurrency.widgetDataMap = {
      "imgFlag":"imgFlag",
      "lblCurrencyType":"lblCurrencyType",
      "lblSeparator":"",
      "imgRadio":"imgRadio"
    }
    if(tbxText!==""){
      this.view.segCurrency.setData(results);
    }else{
      this.view.segCurrency.setData( this.initialData);
    }
 }catch(err) {
        this.setError(err, "onSearchCurrency");
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