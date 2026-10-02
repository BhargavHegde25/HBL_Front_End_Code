    define(['CommonUtilities','OLBConstants'],function(CommonUtilities,OLBConstants){  
    return{
    flag:"",
    scope_configManager : applicationManager.getConfigurationManager(),
    init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    // applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    this.view.preShow =this.preShow;
    this.view.postShow=this.postShow;
    },
    onNavigate: function(uidata){
    try{
    var navManager = applicationManager.getNavigationManager();
    if(uidata.billPayee){
    this.resetUI();
    this.flag="Manual";
    return;
    }
    if(uidata.WebView){
    this.resetUI();
    this.flag= "AutomaticFlow";
    this.setWebViewData(uidata.WebView);
    // this.confirmBillPayCall(uidata.WebView);
    }
    if(uidata.transfercall){
    this.transferSecondCall(uiData.transferCall)
    }
    if(uidata.transferSecondCall){
    this.confirmBillPayCall(uiData.transferSecondCall);
    }
    if(uidata.selectedAcc){
    //this.selectedAcc();
    this.fromDataNew();
    }
    if(uidata.errorObj){
    this.toastMsg(uidata);
    }
    if(uidata.paymentfailed){
    this.toastMsg(uidata.paymentfailed);
    }
    if(uidata.serverError){
    this.toastMsg(uidata.serverError);
    }
    if(uidata.maxTransactionLimitExceed){
    this.toastMsg(uidata);
    }
    if(uidata.InsufficientBalance){
    this.toastMsg(uidata);
    }
    if(uidata.ConvertedAmountData){
    if(this.flag == "ManualFlow"){
    this.mapDataWithConvertedAmountData(uidata.ConvertedAmountData);
    } else {
    this.mapDataNEAConvertedAmountData(uidata.ConvertedAmountData);
    }
    }
    }catch(err){
    kony.print("onNavigate"+ err);
    }

    },
    preShow: function(){
    try{
    var scope = this;
    var navManager = applicationManager.getNavigationManager();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
    this.view.flxHeader.isVisible = false;
    this.view.flxMain.top = "0dp";
    }
    else{
    this.view.flxHeader.isVisible = true;
    this.view.flxMain.top = "58dp";
    }
    applicationManager.getPresentationFormUtility().stayCurrentForm(scope);
    scope.lableText();
    scope.fromDataNew();
    this.view.btnDone.onClick = function(){
    scope.flag == "AutomaticFlow";
    scope.confirmBillPayCall();
    }.bind(this)
    this.view.flxFromAcc.onClick = function(){
    //this.flxSegclick();
    scope.fromAccSelect();
    }.bind(this);
    if(this.flag == "AutomaticFlow"){}else{
    scope.confirmPageData();
    }
    this.view.flxMain.enableScrolling = true;
    //this.view.flxMain.height = kony.flex.USE_PREFERED_SIZE;
    this.view.customHeader.btnRight.onClick = function(){
    scope.onCancelClick();
    }.bind(this);
    this.view.customHeader.flxBack.onClick = function(){
    scope.onBackClick();
    }.bind(this);
    var bPayModule = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    //kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    if(kony.sdk.isNullOrUndefined(bPayModule.selectedAccount)){
    this.view.lblSegAcc.text =kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.selectFromAccount");
    }else{
    this.view.lblSegAcc.text=bPayModule.selectedAccount;
    }
    scope.view.tbxNotes.onTextChange =this.txtbxChange.bind(this);
    scope.view.tbxNotes.text ="";
    if(scope.flag !== "AutomaticFlow"){
     scope.view.imgChoosefrm.setVisibility(false);
     scope.view.flxFrom.onClick =function(){};
      }else{ 
    scope.view.imgChoosefrm.setVisibility(true); 
    scope.view.flxFrom.onClick =scope.fromAccSelect;
      }
    scope.view.tbxRemarks.onTextChange = this.enableNewBtn;
    scope.view.btnEnable.onClick = this.checkConfirmAll;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){
    kony.print("preShow"+ err);
    }
    },
    fromDataNew: function(){
     var bPayModule = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    var fromData = bPayModule.selectedAccounted;
     this.view.lblFromAccountName.text =  fromData.AccountName;
    this.view.lblFromAccountNumber.text =fromData.accountID;
    this.view.lblFromBankName.text = fromData.productId;
    },
    lableText: function(){
    try{
    this.view.lblExchangeKey.text =kony.i18n.getLocalizedString("i18n.ForeignExchange.ExchangeRate")+":";
    this.view.lblFeesKey.text = kony.i18n.getLocalizedString("i18n.PayAPerson.Fees");
    this.view.lblTotalDAKey.text = kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt")+":";
    this.view.lblNotes.text =kony.i18n.getLocalizedString("kony.mb.transaction.notes:");
    }catch(err){
    kony.print("lableText"+ err);
    }
    },
    enableNewBtn: function(){
    if(this.view.tbxRemarks.text.length>0){
    this.view.btnEnable.setEnabled(true);
    this.view.btnEnable.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";   
    }
    else{
     this.view.btnEnable.setEnabled(false);
    this.view.btnEnable.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";    
    }
    },
    fromAccSelect: function(){
    try{
    var navManager = applicationManager.getNavigationManager();
    var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    presenter.navFromAccountsPage();
    applicationManager.getPresentationUtility().showLoadingScreen();
    }catch(err){
    kony.print("fromAccSelect"+ err);
    }
    },
    onBackClick: function(){},
    selectedAcc: function(){
    try{
    var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    if(presenter.selectedAccountBankDone == true){
    this.view.lblSegAcc.text= presenter.selectedAccount;
    }
    }catch(err){
    kony.print("selectedAcc"+ err);
    }
    },
    onCancelClick: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    applicationManager.setBillPayFlow ="onCancel";
    //var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
    //billPayMod.presentationController.onCancelClick();
    var presenter =applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    presenter.onCancelClick();
    },
    confirmPageData: function(){
    try{
    var navManager = applicationManager.getNavigationManager();
    this.view.flxDynamic.removeAll();
    this.view.flxStatic.isVisible=false;
    this.flag = "ManualFlow";
    var showData = navManager.getCustomInfo("merchantFieldResponse");
    var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
    this.dynamicParentFlx(this.view.flxDynamic);
    this.view.lblToVal.text =kony.sdk.isNullOrUndefined(merchantInfo.labelText)?"NA":merchantInfo.labelText;
    this.view.lblToMerchantName.text =kony.sdk.isNullOrUndefined(merchantInfo.labelText)?"NA":merchantInfo.labelText;
    var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    var MerchantFieldData =navManager.getCustomInfo("responseMapping");
    var nofRows = Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping)).length;
    var seg=[];
    for (var i = 0; i < nofRows; i++) {
    for (var j = 0; j < Object.keys(MerchantFieldData.billInfo[0].transactionDetails[0]).length; j++) {
    if (Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i] == Object.keys(MerchantFieldData.billInfo[0].transactionDetails[0])[j]){
    var flexContainersub = new kony.ui.FlexContainer({
    "id": "flxRow" + Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
    "top": "5dp",
    "left": "0dp",
    "width": "100%",
    // "height": kony.flex.USE_PREFERED_SIZE,
    "height":"55dp",
    "zIndex": 10,
    "isVisible": true,
    //"skin":"skntbxBGffffBrB67677",
    "skin":"slFbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,

    //"onClick":onClick
    });
    var labelkey = new kony.ui.Label({
    "id": "lblKey"+Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
    //"skin": "lblSkn",
    // "skin":"sknb8b8b8sspBold26px",
    "skin":"sknLbla0a0a0SSPReg22px",
    "text": Object.values(JSON.parse(MerchantFieldData.responseFieldMapping))[i] + " :",
    "isVisible": true,
    "width":"80%",
    "top":"10dp",
    "left":"15dp",
    "height": "20dp",
    "zIndex":10,
    //"centerY ":"50%",
    "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });
    var labelvalue = new kony.ui.Label({
    "id": "lblValue"+Object.keys(JSON.parse(MerchantFieldData.responseFieldMapping))[i],
    //"skin": "lblSkn",
    "skin":"sknLbl424242SSP26px",
    "text": Object.values(MerchantFieldData.billInfo[0].transactionDetails[0])[j] ? Object.values(MerchantFieldData.billInfo[0].transactionDetails[0])[j] : "NA",
    "isVisible": true,
    "width":"80%",
    "top":"5dp",
    "left":"15dp",
    "height": "20dp",
    "zIndex":10,
    //"centerY ":"50%",
    "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });

    flexContainersub.add(labelkey);
    flexContainersub.add(labelvalue);
    // parentFlx.height =kony.flex.USE_PREFERED_SIZE,
    if(labelkey.text.includes("Bill Amount")){
    labelvalue.text = MerchantFieldData.billInfo[0].totaldueamount?MerchantFieldData.billInfo[0].totaldueamount:""
    }if(labelkey.text.includes("Bill Date")){
        var iValue = (MerchantFieldData.billInfo[0].transactionDetails.length) -1;
        labelvalue.text = (MerchantFieldData.billInfo[0].transactionDetails[iValue]).billdate;
    }
    seg.push({
    key: labelkey.text.trim().replace(/:$/, ""),
    value: labelvalue.text.trim()
    });
    this.view.flxDynamic.widgets()[0].add(flexContainersub);
    }
    }
    }
    var feeArray = kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.paymentCharges;
	if(merchantInfo.paymentAggregator == "KUKL"){
		var acutualAmount = parseFloat(MerchantFieldData.billInfo[0].transactionDetails[0].netamount);
		acutualAmount = applicationManager.getFormatUtilManager().formatAmount(acutualAmount,"NPR");
		 var amountValue = this.getAmountValueforKUKL();
         if (amountValue.includes("NPR")){
            NumAmount = (amountValue).replace('NPR ','')
            NumAmount =Number(NumAmount)
        }else{
            var NumAmount = Number(amountValue);
        }
	}else if(merchantInfo.paymentAggregator == "NEA"){
		var acutualAmount = parseFloat(MerchantFieldData.billInfo[0].totaldueamount);
		acutualAmount = applicationManager.getFormatUtilManager().formatAmount(acutualAmount,"NPR");
		var amountValue = this.getAmountValueforNEA(MerchantFieldData);
        if (amountValue.includes("NPR")){
            NumAmount = (amountValue).replace('NPR ','')
            NumAmount =Number(NumAmount)
        }else{
            var NumAmount = Number(amountValue);
        }
	}
    //var avaBalance = applicationManager.getNavigationManager().getCustomInfo("avaBalance");
    //var NumAmount =Number(avaBalance) + parseFloat(MerchantFieldData.billInfo[0].servicecharge);
    //var amountValue = NumAmount.toFixed(2);
    if (feeArray.length > 0) {
		var count = 0;
    for (i = 0; i < feeArray.length; i++) {
    if (NumAmount >= parseFloat(feeArray[i].minAmount) && amountValue <= parseFloat(feeArray[i].maxAmount)) {
		 count = 1;
    var fees = feeArray[i].fee ? feeArray[i].fee : "NA";
    if (fees != "NA") {
        fees =this.convertAmountValue(fees);
            this.dynamicLabels(this.view.flxDynamic.widgets()[0],"fees","NPR "+fees);
        var fedes ="NPR "+ fees
        seg.push({
        key: kony.i18n.getLocalizedString("i18n.feecolon"),
        value: fedes
        });
    } else {
            this.dynamicLabels(this.view.flxDynamic.widgets()[0],"fees","NA");
            var fedes ="NPR "+ fees
        seg.push({
        key: kony.i18n.getLocalizedString("i18n.feecolon"),
        value: "NA"
        });
    }
	
    var totalDebitAmount = (parseFloat(feeArray[i].fee) + NumAmount);
    var totalFee = parseFloat(feeArray[i].fee);
    }
	if (count == 0) {
   this.view.lblFeesValue.text="NA";
    var totalDebitAmount=amountValue;
     var totalFee=0;
                }
	if (parseFloat(amountValue) <= 0) {
			this.view.lblFeesValue.text="NA";
    var totalDebitAmount=amountValue;
     var totalFee=0;
		}
    }
    var totalTransactionAmount = totalFee + NumAmount;
    }else {
    this.dynamicLabels(this.view.flxDynamic.widgets()[0],"fees","NA");
    var fedes ="NPR "+ fees
        seg.push({
        key: kony.i18n.getLocalizedString("i18n.feecolon"),//"Fees",
        value: "NA"
        });
    var totalDebitAmount = amountValue;
    var totalFee = 0;
    var totalTransactionAmount = amountValue;
    }
    var currencyCode =presenter.selectedAccountCurrencyCode;
    if (currencyCode == "NPR") {
    totalTransactionAmount = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(totalTransactionAmount,"NPR");
    this.dynamicLabels(this.view.flxDynamic.widgets()[0],"Total Debit Amount",totalTransactionAmount);
        seg.push({
        key: kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
        value: totalTransactionAmount
        });
		seg.push({
        key: kony.i18n.getLocalizedString("i18n.loan.dueAmount"),
        value: acutualAmount
        });
    }else{
    applicationManager.getPresentationUtility().showLoadingScreen();
    ExchangeRate = {
    "fromAccountCurrency": currencyCode,
    "transactionCurrency": "NPR",
    "transactionAmount": totalDebitAmount
    }
    presenter.fetchExchangeRateMB(ExchangeRate);
    }
    applicationManager.getNavigationManager().setCustomInfo("totalDebitAmount", totalDebitAmount);
    if(typeof totalDebitAmount == 'string'){}else{
        totalDebitAmount = totalDebitAmount.toString(); 
    }
    if(totalDebitAmount.includes('NPR')){
        amount = totalDebitAmount.replace('NPR ','')
    }
     var amount = Number(totalDebitAmount);
    var convertAmount = amount.toFixed(2);
    var wholeAmount =convertAmount.split(".")[0];
    var decimalAmount = convertAmount.split(".")[1]; 
    this.view.lblWholeNumber.text = wholeAmount;
    this.view.lblDecimal.text = "."+decimalAmount;
    applicationManager.getNavigationManager().setCustomInfo("totalFee", totalFee);       
    //new code
    // for(var i=0;i<Object.keys(showData).length;i++){
    //   this.dynamicLabels(this.view.flxDynamic.widgets()[0],Object.keys(showData)[i],Object.values(showData)[i]);
    //}
    //this.view.flxDynamic.height =kony.flex.USE_PREFERED_SIZE;
    this.flxDataSeg(seg);
    this.dynamicTextbx(this.view.flxDynamic.widgets()[0],"lblNotess","txtNotess");

    this.view.btnDone.isVisible =false;
    this.dynamicButton(this.view.flxDynamic.widgets()[0]);
    var flxLenght =this.view["flxLbl"].widgets().length;
    var flxHeight =flxLenght*45;
    var totalFlxHeight =flxHeight+170;
    this.view["flxLbl"].height =totalFlxHeight+"dp";
    this.view.flxDynamic.height =totalFlxHeight+"dp";
    }catch(err){
    kony.print("confirmPageData"+ err);
    }
    },
    flxDataSeg: function(data){
    try{
    var scope =this;
    scope.view.segTransaction.widgetDataMap={
    "lblKey":"lblKey",
    "lblValue":"lblValue",
    "flxSeperator":"flxSeperator",
    "flxBillNewHBL":"flxBillPayHBL"
    };
    var seg=[];
    for(var i=0;i<data.length;i++){
    seg.push({
    "lblKey":{"text":data[i].key},
    "lblValue":{"text":data[i].value},
    "flxSeperator":{"isVisible":true}
    })
    }
    this.view.segTransaction.setData(seg);
    }catch(err){
    kony.print("flxDataSeg"+err);
    }
    },
    dynamicParentFlx: function(parentFlx){
    try{
    var navManager = applicationManager.getNavigationManager();
    var flexContainer = new kony.ui.FlexContainer({
    "id": "flxLbl",
    "top": "10dp",
    "left": "0dp",
    "width": "100%",
    "height": kony.flex.USE_PREFERED_SIZE,
    //"height":"95%",
    // "bottom":"0dp",
    //"enableScrolling": true,
    "zIndex": 10,
    "isVisible": true,
    // "skin":"ICSknEE0005BG",
    "skin":"slFSbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,
    //"scrollDirection": kony.flex.SCROLL_VERTICAL 

    //"onClick":onClick
    });
    parentFlx.add(flexContainer);
    }catch(err){
    kony.print("dynamicParentFlx"+ err);
    }
    },
    mapDataNEAConvertedAmountData: function(response){
    this.dynamicLabels(this.view.flxDynamic.widgets()[0],"Total Debit Amount",response.currenceCode + " " + response.convertedAmount);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    mapDataWithConvertedAmountData: function(response){
    var valuee = CommonUtilities.formatCurrencyWithCommas(response.convertedAmount, false, response.currenceCode);
    this.dynamicLabels(this.view.flxDynamic.widgets()[0],"Total Debit Amount",valuee);
    applicationManager.getPresentationUtility().dismissLoadingScreen();  
    },
    dynamicLabels: function(parentFlx,key,value){
    try{
    var flexContainersub1 = new kony.ui.FlexContainer({
    "id": "flxLabel"+key,
    "top": "5dp",
    "left": "0dp",
    "width": "100%",
    // "height": kony.flex.USE_PREFERED_SIZE,
    "height":"55dp",
    "zIndex": 10,
    "isVisible": true,
    //"skin":"skntbxBGffffBrB67677",
    "skin":"slFbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,

    //"onClick":onClick
    });
    var labelkey1 = new kony.ui.Label({
    "id": "lblKey"+key,
    //"skin": "lblSkn",
    // "skin":"sknb8b8b8sspBold26px",
    "skin":"sknLbla0a0a0SSPReg22px",
    "text": key+":",
    "isVisible": true,
    "width":"80%",
    "top":"10dp",
    "left":"15dp",
    "height": "20dp",
    "zIndex":10,
    //"centerY ":"50%",
    "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });
    var labelvalue1 = new kony.ui.Label({
    "id": "lblValue"+key,
    //"skin": "lblSkn",
    "skin":"sknLbl424242SSP26px",
    "text": kony.sdk.util.isNullOrUndefinedOrEmptyObject(value)?"NA":value,
    "isVisible": true,
    "width":"80%",
    "top":"5dp",
    "left":"15dp",
    "height": "20dp",
    "zIndex":10,
    //"centerY ":"50%",
    "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });

    flexContainersub1.add(labelkey1);
    flexContainersub1.add(labelvalue1);
    // parentFlx.height =kony.flex.USE_PREFERED_SIZE,
    parentFlx.add(flexContainersub1);
    }catch(err){
    kony.print("dynamicLabels"+ err);
    }
    },

    dynamicTextbx: function(parentFlx,key,value){
    try{
    var flexContainernote = new kony.ui.FlexContainer({
    "id": "flxNotes",
    "top": "5dp",
    "left": "0dp",
    "width": "100%",
    // "height": kony.flex.USE_PREFERED_SIZE,
    "height":"70dp",
    "zIndex": 10,
    "isVisible": true,
    //"skin":"skntbxBGffffBrB67677",
    "skin":"slFbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,

    //"onClick":onClick
    });
    var labelnote = new kony.ui.Label({
    "id": key,
    //"skin": "lblSkn",
    // "skin":"sknb8b8b8sspBold26px",
    "skin":"sknLbla0a0a0SSPReg22px",
    "text": kony.i18n.getLocalizedString("i18n.ChequeBookReq.Notes"),
    "isVisible": true,
    "width":"80%",
    "top":"10dp",
    "left":"15dp",
    "height": "15dp",
    "zIndex":10,
    //"centerY ":"50%",
    "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });

    var textbox = new kony.ui.TextArea2({
    "id": value,
    "text":"",
    "maxTextLength":140,
    "isVisible": true,
    "onTextChange":this.txtbxClick.bind(this),
    "top":"10dp",
    "width":"95%",
    //"centreX":"50%",
    "left":"10dp",
    "height":"65dp",
    "focusSkin": "txtAreaBlueFocus100pr",
    //"placeholderSkin":"sknTbxcea3a4Br",
    "skin":"skntxtarea424242SSP100",
    "placeholderSkin":"sknTextArea727272sspReg26px", 
    "autoCapitalize": constants.TEXTAREA_AUTO_CAPITALIZE_SENTENCES,
    "widgetAlignment": constants.WIDGET_ALIGN_TOP_LEFT,
    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
    "padding": [1, 0, 0, 0],
    // "onTouchEnd": this.getFieldData.bind(this),
    });
    flexContainernote.add(labelnote);
    flexContainernote.add(textbox);
    // parentFlx.height =kony.flex.USE_PREFERED_SIZE,
    parentFlx.add(flexContainernote);
    }catch(err){
    kony.print("dynamicTxtbx"+ err);
    }
    },
    convertAmountValue: function(amount) {
    return applicationManager.getFormatUtilManager().formatAmount(parseFloat(amount),kony.i18n.getCurrentLocale());
    },
    dynamicButton: function(parentFlx){
    try{
    var navManager = applicationManager.getNavigationManager();
    var button = new kony.ui.Button({
    "id": "btnSummary",
    "top":"50dp",
    "height":"50dp",
    "width":"300dp",
    "isVisible": true,
    "skin":"sknBtnBgTransparentFtBr",
    "focusSkin":"sknBtnBgTransparentFtBr",
    "centerX":"50%",
    "bottom":"100dp",
    //"setEnabled": false,
    "text": kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue"),
    "onClick": this.confirmBillPayCall.bind(this)//this.confirmBillPay.bind(this),
    });
    parentFlx.add(button);
    }catch(err){
    kony.print("dynamicButton"+ err);
    }
    },
    txtbxClick: function(){
    if(this.view["txtNotess"].text.length>1){
    this.view["btnSummary"].setEnabled(true);
    this.view["btnSummary"].skin = "sknBtn004B9526pxFocus";
    }
    },
    txtbxChange: function(){
    if(this.view.tbxNotes.text.length>1){
    this.view.btnDone.setEnabled(true);
    this.view.btnDone.skin = "sknBtn004B9526pxFocus";
    }
    },
    btnValidation(){
    if(this.view.lblSegAcc.text != kony.i18n.getLocalizedString("i18n.kony.Bulkpayments.selectFromAccount")){
    this.confirmBillPay();
    }
    else{
    //alert("Please select the From Account");
	applicationManager.getPresentationUtility().Alert("Please select the From Account");
    }
    },
    resBillInquiry: function(response){
    try{
    var navManager = applicationManager.getNavigationManager();
    var scopeObj = this;
    var timerId = "timerPopupBillPay" + scopeObj.timerCounter;
    var errorMsg = '';
    if (!kony.sdk.isNullOrUndefined(scopeObj.timerCounter)) {
    scopeObj.timerCounter = parseInt(scopeObj.timerCounter) + 1;
    } else {
    scopeObj.timerCounter = 1;
    }
    if (response.errorObj) {
    for (i = 0; i < response.errorObj.length; i++) {
    errorMsg = errorMsg + response.errorObj[i].dbpErrMsg + "\n";
    }
    scopeObj.view.customPopup.imgPopup.src = "errormessage.png";
    scopeObj.view.customPopup.lblPopup.text = errorMsg;
    scopeObj.view.customPopup.flxPopupWrapper.skin = "sknflxff5d6e";
    scopeObj.view.flxPopup.setVisibility(true);
    }
    else if (response[0].dbpErrCode) {
    var errorMsg=response.billInfo[0].transactionDetails[0].message	;
    scopeObj.view.customPopup.imgPopup.src = "errormessage.png";
    scopeObj.view.customPopup.lblPopup.text = response[0].dbpErrCode;
    scopeObj.view.customPopup.flxPopupWrapper.skin = "sknflxff5d6e";
    scopeObj.view.flxPopup.setVisibility(true);
    } else if(response.errorMessage){
    var errorMsg=response.errorMessage;
    scopeObj.view.customPopup.imgPopup.src = "errormessage.png";
    scopeObj.view.customPopup.lblPopup.text =response.errorMessage;
    scopeObj.view.customPopup.flxPopupWrapper.skin = "sknflxff5d6e";
    scopeObj.view.flxPopup.setVisibility(true);
    }
    else{}
    kony.timer.schedule(timerId, function () {
    scopeObj.view.flxPopup.setVisibility(false);
    scopeObj.view.forceLayout();
    }, 1.5, false);
    this.view.forceLayout();
    }catch(err){
    kony.print("resBillInquiry"+ err);
    }
    },

    setWebViewData: function(res){
    try{
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("WebViewRes", res);
    var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
    this.view.lblToVal.text = kony.sdk.isNullOrUndefined(merchantInfo.labelText)?"NA":merchantInfo.labelText;
    this.view.lblToMerchantName.text =kony.sdk.isNullOrUndefined(merchantInfo.labelText)?"NA":merchantInfo.labelText;
    var amountValue=JSON.parse(res.npiObjectData).cipsTransactionDetail.amount;
    //  var feeArray=  applicationManager.getMerchantPaymentCharges().paymentCharges;
    var feeArray = kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.paymentCharges;   
    //this.view.flxDynamic.height = kony.flex.USE_PREFERED_SIZE;
    this.view.flxDynamic.removeAll();
    var seg =[];
    this.view.flxStatic.isVisible=false;
    if(!kony.sdk.isNullOrUndefined(res.npiObjectData)){
    var nofRows=JSON.parse(res.npiObjectData).fieldLabelMapping.length;
    for (var i = 0; i < nofRows; i++) {
    //var c=JSON.parse(res).fieldLabelMapping[i].mapField;
    for(var j=0;j<Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail).length;j++){
    if(JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField==Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]){
    var flexRow = new kony.ui.FlexContainer({
    "id": "flxRowWebView" + JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
    "top": "5dp",
    "left": "0dp",
    "width": "100%",
    //         "height": kony.flex.USE_PREFERRED_SIZE,
    //"height": (i==nofRows-1)?"60dp":"20dp",
    "height":"40dp",
    "zIndex": 10,
    "isVisible": true,
    //"skin":"skntbxBGffffBrB67677",
    "skin":"slFbox",
    "clipBounds": false,
    "layoutType": kony.flex.FLOW_VERTICAL,
    });
    var lblkey = new kony.ui.Label({
    "id": "lblCategoryKey"+JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
    "text":JSON.parse(res.npiObjectData).fieldLabelMapping[i].fieldLabel,
    "height": kony.flex.USE_PREFERED_SIZE,
    "isVisible": true,
    "width":"80%",
    "top":"10dp",
    "left":"15dp",
    "height": "20dp",
    "zIndex":10,
    "skin":"sknLbla0a0a0SSPReg22px",
    "wrapping":constants.WIDGET_TEXT_WORD_WRAP
    });
    if (JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField == "amount") {
        var value = "NPR " + this.convertAmountValue(Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]);
    } else {
        var value = Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j];
    }
    var lblValue = new kony.ui.Label({
    "id": "lblvalue"+JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField,
    "text":  value.toString(),
    "height": kony.flex.USE_PREFERED_SIZE,
    "isVisible": true,
    "width":"80%",
    "top":"5dp",
    "left":"15dp",
    "height": "20dp",
    "zIndex":10,
    "skin":"sknLbl424242SSP26px",

    });
    flexRow.add(lblkey);
    flexRow.add(lblValue);
     seg.push({
        key: lblkey.text,
        value: lblValue.text
        });
    this.view.flxDynamic.add(flexRow);  
    }
    }
    }
    var amountValue=JSON.parse(res.npiObjectData).cipsTransactionDetail.amount;
    if(JSON.parse(res.npiObjectData).cipsTransactionDetail.chargeLiability =="CG"){
        seg.push({
         key: kony.i18n.getLocalizedString("i18n.feecolon"),
         value: applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol((JSON.stringify(JSON.parse(res.npiObjectData).cipsTransactionDetail.chargeAmount)),"NPR")
        });
        var totalDebitAmount="NPR "+((JSON.parse(res.npiObjectData).cipsTransactionDetail.chargeAmount)+amountValue);
        var totalFee=JSON.stringify(JSON.parse(res.npiObjectData).cipsTransactionDetail.chargeAmount)
    }else{
        seg.push({
         key: kony.i18n.getLocalizedString("i18n.feecolon"),
         value: "NA"
        });
        var totalDebitAmount = amountValue;
        var totalFee = 0;
    }
    //this.view.lblTotalDAValue.text =totalDebitAmount.toFixed(2);
    if(typeof totalDebitAmount=="string"){
    this.view.lblTotalDAValue.text = totalDebitAmount;
    }else{
   this.view.lblTotalDAValue.text= totalDebitAmount.toFixed(2)
    }
    if(this.view.lblTotalDAValue.text.includes("NPR")){
    this.view.lblTotalDAValue.text =totalDebitAmount+".00"
    }else{
    this.view.lblTotalDAValue.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(this.view.lblTotalDAValue.text, "NPR")
    }
     seg.push({
        key:kony.i18n.getLocalizedString("i18n.pfm.totalDebitAmt"),
        value: this.view.lblTotalDAValue.text//applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(this.view.lblTotalDAValue.text, "NPR")
        });
        if(this.view.lblTotalDAValue.text.includes("NPR")){
            this.view.lblTotalDAValue.text =this.view.lblTotalDAValue.text.slice(4);
        }
    applicationManager.getNavigationManager().setCustomInfo("totalDebitAmount",this.view.lblTotalDAValue.text);
    var convertAmount = this.view.lblTotalDAValue.text;
    var wholeAmount =convertAmount.split(".")[0];
    var decimalAmount = convertAmount.split(".")[1]; 
    this.view.lblWholeNumber.text = wholeAmount;
    this.view.lblDecimal.text = "."+decimalAmount;
    applicationManager.getNavigationManager().setCustomInfo("totalFee",totalFee);
    }
    this.view.flxDynamic.layoutType =kony.flex.FLOW_VERTICAL;
    var height =this.view.flxDynamic.widgets().length * 55;
    this.view.flxDynamic.height =height+"dp";
    this.flxDataSeg(seg);
    //this.view.btnDone.isVisible =true;
    }catch(err){
    kony.print("setWebViewData"+ err);
    }
    },

    //Inprogress code*******************
    confirmBillPayCall:function(){
    try{
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var presenter = applicationManager.getModulesPresentationController({
        'appName': 'BillPayMA',
        'moduleName': 'BillPaymentUIModule'
    });
    var bankDate= applicationManager.getNavigationManager().getCustomInfo("bankDates");
    var newNotes = this.view.tbxRemarks.text;
    applicationManager.getNavigationManager().setCustomInfo("newNotes",newNotes);
    var currentBankDate="";
    if(bankDate){
    currentBankDate=bankDate.currentWorkingDate;
    if(currentBankDate)
    currentBankDate=currentBankDate+"T00:00:00.000Z";
    }
    var merchantInfo= applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
    if (this.flag == "AutomaticFlow") {
    var payload={};
    var res=navManager.getCustomInfo("WebViewRes");
    var fees = applicationManager.getNavigationManager().getCustomInfo("totalFee");
    var nofRows =  JSON.parse(res.npiObjectData).fieldLabelMapping.length;
    for (var i = 0; i < nofRows; i++) {
    for (var j = 0; j < Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail).length; j++) {
    if (JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField == Object.keys(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j]) {
        var x=JSON.parse(res.npiObjectData).fieldLabelMapping[i].mapField;
        var y=Object.values(JSON.parse(res.npiObjectData).cipsTransactionDetail)[j];
            payload[x]=y;
    }
    }
    }
    var amount= JSON.parse(res.npiObjectData).cipsTransactionDetail.amount;
    var serviceCharge = applicationManager.getNavigationManager().getCustomInfo("totalFee");
    var ServiceChargePayload=serviceCharge;
    if(serviceCharge=="NA"){
    var ServiceChargePayload=0;
    }
    var transactionAmount = parseFloat(serviceCharge) + parseInt(amount);
    // get data from the from the from acc selected

    // get data from the from the from acc selected
    var bPayModule = applicationManager.getModulesPresentationController({
                    'appName': 'BillPayMA',
                    'moduleName': 'BillPaymentUIModule'
                });
    var debitInformation = {};
    debitInformation.debtorName = bPayModule.selectedAccountName;
    debitInformation.debtorAccount = bPayModule.selectedAccountID;
    debitInformation.fromAccountCurrency = bPayModule.selectedAccountCurrencyCode;
    debitInformation.debtorAgent = scope_configManager.getDebtorAgentBankIdValue();
    debitInformation.debtorBranch = scope_configManager.getDebtorAgentBranchId();
    debitInformation.amount=JSON.parse(res.npiObjectData).cipsTransactionDetail.amount;
    debitInformation.fee=applicationManager.getNavigationManager().getCustomInfo("totalFee");
    debitInformation.totalDebitAmount=(applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount"));
    var transactionAmountwithFee=applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
    var availableBalance = bPayModule.selectedAccountAvailableBalance;
    //debitInformation.fee=applicationManager.getNavigationManager().getCustomInfo("totalFee");
    //debitInformation.fee =JSON.stringify(fees);
    var notes =this.view.tbxNotes.text;
    var transactionAmount = (fees) + parseInt(amount);
    debitInformation.totalDebitAmount =transactionAmount ;
    for (k = 0; k < scope_configManager.userAccounts.length; k++) {
    if (presenter.selectedAccountID == scope_configManager.userAccounts[k].account_id) {
    var AvailableBalance = scope_configManager.userAccounts[k].availableBalance;
    var AccDetails =scope_configManager.userAccounts[k];
    break;
    }
    }
    if(AvailableBalance>=transactionAmount){
    var maxTransactionlimit=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit;
    if(maxTransactionlimit!=null && maxTransactionlimit!=""&& maxTransactionlimit!=undefined){
    if(debitInformation.totalDebitAmount<=kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit){
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("debitInformation",debitInformation);
    var cipsTransactionDetail = JSON.parse(res.npiObjectData).cipsTransactionDetail;
    var cipsBatchDetail = JSON.parse(res.npiObjectData).cipsBatchDetail;
    var data = [{
    cipsBatchDetail,
    cipsTransactionDetail,
    debitInformation
    }];
    applicationManager.getPresentationUtility().showLoadingScreen(); 
    var paymentAggregator= applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");

    applicationManager.getNavigationManager().setCustomInfo("notesBill",notes);
    var Payload={
    // "amount":transactionAmountwithFee,
    "amount":transactionAmount,
    "fromAccountNumber":AccDetails.accountID,
    "transactionCurrency":AccDetails.currencyCode,
    "serviceCharge":ServiceChargePayload,
    "transactionAmount":amount,
    "transactionType":"BillPay","serviceName":"BILL_PAY_CREATE","frequencyType":"Once",
    "paymentAggregator":paymentAggregator,
    "transactionDetails":data,
    "notes": notes,
    "scheduledDate":"2024-12-12T00:00:00.000Z", 
    "merchantName":merchantInfo.labelText,
    "merchantCode":merchantInfo.code,
    "payeeNickName":merchantInfo.labelText,
    "payeeId":merchantInfo.code
    };
    var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    presenter.confirmBillPayCallMB(Payload);
    } else{
	applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.maxLimit"));
	applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    }
    else{
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo("debitInformation",debitInformation);
    var cipsTransactionDetail = JSON.parse(res.npiObjectData).cipsTransactionDetail;
    var cipsBatchDetail = JSON.parse(res.npiObjectData).cipsBatchDetail;
    var data = [{
    cipsBatchDetail,
    cipsTransactionDetail,
    debitInformation
    }];
    applicationManager.getPresentationUtility().showLoadingScreen();
    var paymentAggregator = applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType");
    var Payload = {"payeeNickName":merchantInfo.labelText,"payeeId":merchantInfo.code,"amount":transactionAmount,
    "fromAccountNumber":AccDetails.accountID,
    "transactionCurrency":AccDetails.currencyCode,
    "serviceCharge":ServiceChargePayload,
    "transactionAmount":amount,
    "transactionType":"BillPay",
    "serviceName":"BILL_PAY_CREATE",
    "frequencyType":"Once",
    "paymentAggregator":paymentAggregator,
    "transactionDetails":data, 
    "notes": notes,
    "scheduledDate":currentBankDate, // this hard code value need to be removed.
    "merchantName":merchantInfo.labelText,
    "merchantCode":merchantInfo.code
    };
    var presenter = applicationManager.getModulesPresentationController({
    'appName': 'BillPayMA',
    'moduleName': 'BillPaymentUIModule'
    });
    presenter.confirmBillPayCallMB(Payload);
    }
    }
    else{
	applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.InsufficientBalance"));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    }
    else{
    var navMan = applicationManager.getNavigationManager();
    var inquiryData = navMan.getCustomInfo("dataInquiry");
    var response =navMan.getCustomInfo("merchantFieldResponse");
    var couterValue = applicationManager.getNavigationManager().getCustomInfo("counterValue");
    var AccDetails =this.view.lblSegAcc.text; //add from acc data;
    var feeArray = kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.paymentCharges;
    var amountValue = parseInt(response.paybleamount);
    var serviceCharge = "NA";
    var notes =this.view.txtNotess.text;
    applicationManager.getNavigationManager().setCustomInfo("notesBill",notes);
    var serviceCharges = applicationManager.getNavigationManager().getCustomInfo("totalFee");
    for (i = 0; i < feeArray.length; i++) {
    if (amountValue >= Number(feeArray[i].minAmount) && amountValue <= Number(feeArray[i].maxAmount)) {
    var fees = feeArray[i].fee ? feeArray[i].fee : "NA";
    var serviceCharge = fees;
    }
    }
    var ServiceChargePayload = serviceCharge;
    if (serviceCharge != "NA") {
    var transactionAmount = parseFloat(serviceCharge) + parseFloat(response.paybleamount);
    }
    if (serviceCharge == "NA") {
    var transactionAmount = parseFloat(response.paybleamount);
    ServiceChargePayload = 0;
    }
    for (k = 0; k < scope_configManager.userAccounts.length; k++) {

    if (presenter.selectedAccountID == scope_configManager.userAccounts[k].account_id) {
    var AvailableBalance = scope_configManager.userAccounts[k].availableBalance;
    var AccDetails =scope_configManager.userAccounts[k];
    break;
    }
    }

    if (AvailableBalance >= transactionAmount) {
    var maxTransactionlimit = kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit;
    if (maxTransactionlimit != null && maxTransactionlimit != "" && maxTransactionlimit != undefined) {
    if (transactionAmount <= kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit) {
        Payload = {
                "payeeNickName":merchantInfo.labelText,
            "payeeId":merchantInfo.code,
            "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
            "scno": response.scno,
            "consumerId": response.consumerid,
            "counterCode": inquiryData.counterCode,
            "amount": transactionAmount,
            "fromAccountNumber": AccDetails.accountID,
            "transactionCurrency": AccDetails.currencyCode,
            "serviceCharge": applicationManager.getNavigationManager().getCustomInfo("totalFee"),
            "transactionAmount": response.paybleamount,
            "transactionType": "BillPay",
            "serviceName": "BILL_PAY_CREATE",
            "frequencyType": "Once",
            "scheduledDate": currentBankDate,
            "notes": notes,
            "merchantName": merchantInfo.labelText,
            "merchantCode": merchantInfo.code,
            "counterValue": couterValue
        };
        var presenter = applicationManager.getModulesPresentationController({
            'appName': 'BillPayMA',
            'moduleName': 'BillPaymentUIModule'
        });
        presenter.confirmBillPayCallNEAMB(Payload);
    } else {
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.maxLimit"));
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    } else {
    Payload = {
            "payeeNickName":merchantInfo.labelText,
            "payeeId":merchantInfo.code,
        "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
        "scno": response.scno,
        "consumerId": response.consumerid,
        "counterCode": inquiryData.counterCode,
        "amount": transactionAmount,
        "fromAccountNumber": AccDetails.accountID,
        "transactionCurrency": AccDetails.currencyCode,
        "serviceCharge": applicationManager.getNavigationManager().getCustomInfo("totalFee"),
        "transactionAmount": response.paybleamount,
        "transactionType": "BillPay",
        "serviceName": "BILL_PAY_CREATE",
        "frequencyType": "Once",
        "scheduledDate": "2024-12-12T00:00:00.000Z",
        "notes": notes,
        "merchantName": merchantInfo.labelText,
        "merchantCode": merchantInfo.code, 
            "counterValue": couterValue
    };
    var presenter = applicationManager.getModulesPresentationController({
        'appName': 'BillPayMA',
        'moduleName': 'BillPaymentUIModule'
    });
    presenter.confirmBillPayCallNEAMB(Payload);
    }
    } else {
    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.InsufficientBalance"));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    }
    }
    catch(err){
    kony.print("confirmBillPayCall"+ err);
	applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
	applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    toastMsg: function(res){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(res.InsufficientBalance){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.InsufficientBalance"));
    }
    if(res.maxTransactionLimitExceed){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.maxLimit"));
    }
    if(!kony.sdk.isNullOrUndefined(res)){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, res);
    }
    else{
    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.qrpayments.TransactionFailed"));
    }
    },
    resetUI: function(){
    this.view.tbxRemarks.text ="";
    this.view.btnEnable.setEnabled(false);
    this.view.btnEnable.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
    //this.view.tbxRemarks.setEnabled(false);
    this.view.tbxRemarks.skin ="sknTbxBordere3e3e3A0A0A0SSPRegular28px";
    },
	 getAmountValueforNEA: function(MerchantFieldData) {
            var amountValue = applicationManager.getNavigationManager().getCustomInfo("avaBalance");
            amountValue = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amountValue,"NPR");
            return amountValue;
        },
        getAmountValueforKUKL: function() {
            var transactionAmount = applicationManager.getNavigationManager().getCustomInfo("avaBalance");
            var amountValue = transactionAmount;
            return amountValue;
        },
dateFormat: function(input){
    var [year, month, day] = input.split('-').map(Number);
    var ac = new Date(Date.UTC(year, month - 1, day)).toISOString();
    return ac;
    },
	checkConfirmAll: function(){
		try{
		var paymentAggregatorType = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
		if(this.flag =="AutomaticFlow"){
			this.confirmBillPayCall();
		}else{
		if(paymentAggregatorType.paymentAggregator == "KUKL"){
			this.callKUKLConfirmBillPay();
		}else{
			this.confirmBillPayCall();
		}
		}
		}catch(err){
		kony.print("err:"+ err);
		}
	},
	 callKUKLConfirmBillPay: function() {
        applicationManager.getPresentationUtility().showLoadingScreen();
            var response = applicationManager.getNavigationManager().getCustomInfo("responseMapping").billInfo[0].transactionDetails[0];
            //var AccDetails = applicationManager.getNavigationManager().getCustomInfo("SelectedAccountInfo");
            var transactionAmount = applicationManager.getNavigationManager().getCustomInfo("totalDebitAmount");
            var ServiceChargePayload = applicationManager.getNavigationManager().getCustomInfo("totalFee");
            var merchantInfo = applicationManager.getNavigationManager().getCustomInfo("Biller_Code");
            var billerBranch = applicationManager.getNavigationManager().getCustomInfo("dataInquiry");
            var notes =this.view.tbxRemarks.text;
            applicationManager.getNavigationManager().setCustomInfo("newNotes", notes);
            var bankDate = applicationManager.getNavigationManager().getCustomInfo("bankDates");
			var presenter = applicationManager.getModulesPresentationController({
        'appName': 'BillPayMA',
        'moduleName': 'BillPaymentUIModule'
    });
            var currentBankDate = "";
            if (bankDate) {
                currentBankDate = this.dateFormat(bankDate.currentWorkingDate);
            }
			for (k = 0; k < scope_configManager.userAccounts.length; k++) {
    if (presenter.selectedAccountID == scope_configManager.userAccounts[k].account_id) {
    var AvailableBalance = scope_configManager.userAccounts[k].availableBalance;
    var AccDetails =scope_configManager.userAccounts[k];
    break;
    }
    }
            var customerBillInfores = applicationManager.getNavigationManager().getCustomInfo("responseMapping");
            var boardAmount = false;
            for (h = 0; h < Object.keys(customerBillInfores.billInfo[0].transactionDetails[0]).length; h++) {
                if ("board_amount" == Object.keys(customerBillInfores.billInfo[0].transactionDetails[0])[h]) {
                    var boardAmount = true;
                }
            }
            if (parseFloat(AvailableBalance) >= parseFloat(transactionAmount)) {
                var maxTransactionlimit = kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit;
                if (maxTransactionlimit != null && maxTransactionlimit != "" && maxTransactionlimit != undefined) {
                    if (parseFloat(transactionAmount) <= parseFloat(kony.mvc.MDAApplication.getSharedInstance().appContext.getMerchantPaymentCharges.maxTransactionLimit)) {
                        Payload = {
                            "payeeNickName": merchantInfo.labelText,
                            "payeeId": merchantInfo.code,
                            "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                            "connectionNo": response.connectionNo,
                            "customerNo": response.customerNo,
                            "module": boardAmount ? "Board Payment" : "KUKL Payment",
                            "amount": transactionAmount,
                            "fromAccountNumber": AccDetails.accountID,
                            "transactionCurrency": "NPR",
                            "serviceCharge": ServiceChargePayload,
                            "transactionAmount": applicationManager.getNavigationManager().getCustomInfo("avaBalance"),
                            "transactionType": "BillPay",
                            "serviceName": "BILL_PAY_CREATE",
                            "frequencyType": "Once",
                            "scheduledDate": currentBankDate,
                            "notes": notes,
                            "merchantName": merchantInfo.labelText,
                            "merchantCode": merchantInfo.code,
                            "branchcode":billerBranch.branchcode
                        };
                        var presenter = applicationManager.getModulesPresentationController({
                            'appName': 'BillPayMA',
                            'moduleName': 'BillPaymentUIModule'
                        });
                        presenter.confirmBillPayCallKUKL(Payload);
                    } else {
                        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.maxLimit"));
        applicationManager.getPresentationUtility().dismissLoadingScreen();
                    }
                } else {
                    Payload = {
                        "payeeNickName": merchantInfo.labelText,
                        "payeeId": merchantInfo.code,
                        "paymentAggregator": applicationManager.getNavigationManager().getCustomInfo("PaymentAggregatorType"),
                        "connectionNo": response.connectionNo,
                        "customerNo": response.customerNo,
                        "module": "",
                        "amount": transactionAmount,
                        "fromAccountNumber": AccDetails.accountID,
                        "transactionCurrency": "NPR",
                        "serviceCharge": ServiceChargePayload,
                        "transactionAmount": applicationManager.getNavigationManager().getCustomInfo("TextboxenteredValues"),
                        "transactionType": "BillPay",
                        "serviceName": "BILL_PAY_CREATE",
                        "frequencyType": "Once",
                        "scheduledDate": currentBankDate,
                        "notes": notes,
                        "merchantName": merchantInfo.labelText,
                        "merchantCode": merchantInfo.code,
                        "branchcode":billerBranch.branchcode
                    };
                    var presenter = applicationManager.getModulesPresentationController({
                        'appName': 'BillPayMA',
                        'moduleName': 'BillPaymentUIModule'
                    });
                    presenter.confirmBillPayCallKUKL(Payload);
                }
            } else {
               applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.BillPay.InsufficientBalance"));
			   applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
        },
    };
    });