define({ 
 index:"",
 existing:"",
 todata:{},
  //Type your controller code here
  init: function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
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
    
     this.view.flxExstAcc.isVisible=true;
       this.view.flxAddCurrency.isVisible=true;
       }catch(err) {
        this.setError(err, "preShow");
      }
  },

  postShow: function () {
    try{
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    this.currencyData = navManager.getCustomInfo("frmSelectCurrency");
    if(scope_WealthPresentationController.toConv === true&&scope_WealthPresentationController.verify===false){
      this.index = "";
      scope_WealthPresentationController.toConv = false;
       this.view.btnDone.setEnabled(false);
      this.view.btnDone.skin="sknBtnE2E9F0Rounded";
     this.view.tbxSearch.text="";
   //    this.view.tbxSearch.setFocus(false);
    
   
    }
    this.setExistingCurrency(this.currencyData);
	this.setAddCurrency(this.currencyData);
    this.initialData=this.view.segExistingCurrency.data;
    this.initialData1=this.view.segAddCurrency.data;
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
  
setExistingCurrency:function(currencyData){
  try{
  if(currencyData.existingCurrency.length>0){
    this.view.flxExstAcc.isVisible=true;
    this.view.segExistingCurrency.widgetDataMap = {
      "imgFlag":"imgFlag",
      "lblCurrencyType":"lblCurrencyType",
      "lblSeparator":"",
      "imgRadio":"imgRadio"
    }
   this.view.segExistingCurrency.setData(currencyData.existingCurrency);
   
   if(this.index !== "" && this.existing == true){
   this.setSelection();
  }
  }else{
    this.view.flxExstAcc.isVisible=false;
    
  }
     }catch(err) {
        this.setError(err, "setExistingCurrency");
      }
 },
  setAddCurrency:function(currencyData){
   try{
   var currencydetails=currencyData && currencyData.additionalCurrency ?currencyData.additionalCurrency:[];
    if(currencydetails.length>0){
      this.view.flxAddCurrency.isVisible=true;
      var results=[];
    for(var num in currencydetails){
      var data=currencydetails[num];
      var fullcurrency=data.CurrencyCode+' - '+data.CurrencyValue;
      var storeData={
       lblCurrencyType :fullcurrency,
       imgRadio:"radiobuttoninactive.png",
       lblseparator:"",
       imgFlag:{"src":this.flagPaths[data.CurrencyCode] || "defaultflag.png",
               "isVisible":true}
       
      };
      results.push(storeData);
    }
    this.view.segAddCurrency.widgetDataMap={
      lblCurrencyType:"lblCurrencyType",
      imgRadio:"imgRadio",
      lblSeparator:"lblseparator",
      imgFlag:"imgFlag"
   
    };
    this.view.segAddCurrency.setData(results);
    if(this.index !== "" && this.existing !== true){
       this.setSelection();
      }
    }else{
       this.view.flxAddCurrency.isVisible=false;
     
    }
     }catch(err) {
        this.setError(err, "setAddCurrency");
      }
  },
 initActions: function () {
   try{
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
    this.view.btnDone.onClick = this.confirmOnClick;
    this.view.segExistingCurrency.onRowClick = this.onExitingCurrencyClick;
   this.view.segAddCurrency.onRowClick=this.onAddCurrencyClick;
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
       //navMan.goBack();
	navMan.navigateTo('frmSelectCurrency');
    
    }
   }catch(err) {
        this.setError(err, "onBack");
      }
  },

  confirmOnClick: function () {
    try{
    scope_WealthPresentationController.convertCurrency =true;
    scope_WealthPresentationController.verify=false;
    var navMan=applicationManager.getNavigationManager();
    var selectedRow;
    if(this.existing===true){
       selectedRow = this.view.segExistingCurrency.data[this.index];
      scope_WealthPresentationController.addCurrency=false;
    
    }else{
      selectedRow = this.view.segAddCurrency.data[this.index];
      scope_WealthPresentationController.addCurrency=true;
      
    }
   if(selectedRow===undefined){
      this.view.btnDone.setEnabled(false);
  this.view.btnDone.skin="sknBtnE2E9F0Rounded";

   }else{
      this.view.btnDone.setEnabled(true);
  this.view.btnDone.skin="sknBtn0095e4RoundedffffffSSP26px";

    var currencyData = navMan.getCustomInfo("frmSelectCurrency");
    if(kony.sdk.isNullOrUndefined(currencyData)){
      var currencyData={};
      currencyData.toCurrencyDetails=selectedRow;
    }else{
      currencyData.toCurrencyDetails=selectedRow;
    }
    currencyData.existing=this.existing;
    navMan.setCustomInfo("frmSelectCurrency", currencyData);
    //navMan.navigateTo("frmConvertCurrency");
     var fromCurrency=currencyData.fromCurrencyDetails;
    
    var currencypair=fromCurrency.lblCurrencyType.split('-')[0].trim()+selectedRow.lblCurrencyType.split('-')[0].trim();
     var wealthMod = applicationManager.getModulesPresentationController("WealthOrderUIModule");
       wealthMod.setBuyCurrency(selectedRow.lblCurrencyType.split('-')[0].trim().toUpperCase());
    scope_WealthPresentationController.toCurrencyFlag=selectedRow.imgFlag.src;
    var formatUtil=applicationManager.getFormatUtilManager();
     
    scope_WealthPresentationController.toAccountBalance=formatUtil.formatAmountandAppendCurrencySymbol(selectedRow.balance,selectedRow.lblCurrencyType.split('-')[0].trim());
        
    if(wealthMod.getVerifyFlow()){
           // navMan.navigateTo("frmConvertCurrencyVerify");
      var data= wealthMod.getWealthObject();
       var param={
          "currencyPairs":data.sellCurrency+data.buyCurrency,
         "portfolioId": scope_WealthPresentationController.portfolioId
       }
       wealthMod.getCurrencyRate(param);
      }else{
         var param={
          "currencyPairs":currencypair,
          "portfolioId": scope_WealthPresentationController.portfolioId
        };
        wealthMod.getCurrencyRate(param);
      }
  }
       }catch(err) {
        this.setError(err, "confirmOnClick");
      }
  },

  onExitingCurrencyClick: function() {
    try{
    this.existing=true;
    this.setAddCurrency(this.currencyData);
    var selectedRowIndex = this.view.segExistingCurrency.selectedRowIndex[1];
    var selectedRow = this.view.segExistingCurrency.data[selectedRowIndex];
    this.index=selectedRowIndex;
    var segData = this.view.segExistingCurrency.data;
    segData.forEach(el => el.imgRadio = "radiobuttoninactive.png");
    this.view.segExistingCurrency.setData(segData);
	this.todata = selectedRow;
    selectedRow.imgRadio = "radiobtn_big.png";
    this.view.segExistingCurrency.setDataAt(selectedRow, selectedRowIndex);
     this.view.btnDone.setEnabled(true);
  this.view.btnDone.skin="sknBtn0095e4RoundedffffffSSP26px";
 }catch(err) {
        this.setError(err, "onExitingCurrencyClick");
      }
  },
  onAddCurrencyClick:function(){
    try{
    this.existing=false;
    this.setExistingCurrency(this.currencyData);
     var selectedRowIndex = this.view.segAddCurrency.selectedRowIndex[1];
    var selectedRow = this.view.segAddCurrency.data[selectedRowIndex];
    this.index=selectedRowIndex;
    var segData = this.view.segAddCurrency.data;
    segData.forEach(el => el.imgRadio = "radiobuttoninactive.png");
    this.view.segAddCurrency.setData(segData);
	this.todata = selectedRow;
    selectedRow.imgRadio = "radiobtn_big.png";
    this.view.segAddCurrency.setDataAt(selectedRow, selectedRowIndex);
     this.view.btnDone.setEnabled(true);
  this.view.btnDone.skin="sknBtn0095e4RoundedffffffSSP26px";
   }catch(err) {
        this.setError(err, "onAddCurrencyClick");
      }
  },
  setSelection: function() {
    try{
    var selectedRow;
    var dataFromResponse
    if(this.existing == true){
      dataFromResponse = this.view.segExistingCurrency.data;
    }
    else{
        dataFromResponse = this.view.segAddCurrency.data;
    }
      for (var list in dataFromResponse){
        if (dataFromResponse[list].lblCurrencyType === this.todata.lblCurrencyType) {
          this.index = parseInt(list);
          selectedRow = dataFromResponse[this.index];
        }
      }
    
    var segData = dataFromResponse;
    segData.forEach(el => el.imgRadio = "radiobuttoninactive.png");
    if(this.existing == true){
    this.view.segExistingCurrency.setData(segData);
    }
    else{
       this.view.segAddCurrency.setData(segData);
    }
    selectedRow.imgRadio = "radiobtn_big.png";
    if(this.existing == true){
    this.view.segExistingCurrency.setDataAt(selectedRow, this.index);
    }
    else{
      this.view.segAddCurrency.setDataAt(selectedRow, this.index);
    }
       }catch(err) {
        this.setError(err, "setSelection");
      }
  },
  onSearchCurrency:function(){
    try{
    var results=[];
    var results1=[];
    var tbxText=this.view.tbxSearch.text;
    var searchKey=tbxText.toUpperCase();
    var searchColumn="lblCurrencyType";
    var segmentData=this.view.segExistingCurrency.data;
     var segmentData1=this.view.segAddCurrency.data;
    if(tbxText!==""){
      for(i=0;i<segmentData.length;i++){
        var currencyData=segmentData[i][searchColumn].toUpperCase();
        if (currencyData.includes(searchKey)) {
          results.push(segmentData[i]);

        }
      }
       for(j=0;j<segmentData1.length;j++){
        var currencyData=segmentData1[j][searchColumn].toUpperCase();
        if (currencyData.includes(searchKey)) {
          results1.push(segmentData1[j]);

        }
      }
    }
    this.view.segExistingCurrency.widgetDataMap = {
      "imgFlag":"imgFlag",
      "lblCurrencyType":"lblCurrencyType",
      "lblSeparator":"",
      "imgRadio":"imgRadio"
    }
    this.view.segAddCurrency.widgetDataMap = {
      "imgFlag":"imgFlag",
      "lblCurrencyType":"lblCurrencyType",
      "lblSeparator":"",
      "imgRadio":"imgRadio"
    }
    if(tbxText!==""){
      if(results.length>0){
        this.view.flxExstAcc.isVisible=true;
        this.view.segExistingCurrency.setData(results);
      }else{
        this.view.flxExstAcc.isVisible=false;
      }
       if(results1.length>0){
        this.view.flxAddCurrency.isVisible=true;
        this.view.segAddCurrency.setData(results1);
      }else{
        this.view.flxAddCurrency.isVisible=false;
      }
      
    }else{
      this.view.flxExstAcc.isVisible=true;
       this.view.flxAddCurrency.isVisible=true;
      this.view.segExistingCurrency.setData( this.initialData);
      this.view.segAddCurrency.setData( this.initialData1);
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