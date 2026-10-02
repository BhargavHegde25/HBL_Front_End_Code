    define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    dataforFrom:"",
    dataforTo:"",
    transfersFlow:"",
    currencyCodeList:[],
    currentBalance:"",
    segFlag:"",
    fromListData:"",
    transferPayee:"",
    dataExisiting :"",
    frequencyTypes : {
    ONCE: kony.i18n.getLocalizedString("i18n.transfers.frequency.once"),
    WEEKLY: kony.i18n.getLocalizedString("i18n.Transfers.Weekly"),
    DAILY: kony.i18n.getLocalizedString("i18n.Transfers.Daily"),
    MONTHLY: kony.i18n.getLocalizedString("i18n.Transfers.Monthly"),
    BIWEEKLY: kony.i18n.getLocalizedString("i18n.payments.biWeekly"),
    YEARLY: kony.i18n.getLocalizedString("i18n.Transfers.Yearly"),
    HALFYEARLY: kony.i18n.getLocalizedString("kony.mb.MM.HalfYearly"),
    QUARTERLY: kony.i18n.getLocalizedString("i18n.Transfers.Quaterly"),
    EVERYTWOWEEKS: kony.i18n.getLocalizedString("i18n.Transfers.EveryTwoWeeks")
    },	
    periods :{
    SPECFICDATE:kony.i18n.getLocalizedString("i18n.transfers.lbxOnSpecificDate"),
    NOOFRECURRENCY:kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences"),
    UNTILICANCEL: kony.i18n.getLocalizedString("i18n.transfers.lblUntilICancel")
    },
    responseKeys:{
    "numberOfRecurrences":"",
    "frequencyEndDate":"",
    "frequencyStartDate":"",
    "frequencyType":""
    },
    init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(scope, "CALLBACK", currentForm, scope.flxBackOnClick);
    this.view.preShow =this.preShow;
    },
    onNavigate: function(uidata){
    try{
    if(kony.sdk.isNullOrUndefined(uidata)){}else{
    if(uidata.sameBank){
    this.resetUI();
    }if(uidata.validateAccnumber){
    this.validAccount(uidata.validateAccnumber);
    }if(uidata.payee){
    this.payeeConfirm(uidata.payee);
    }if(uidata.TransferError){
    this.errorResponse(uidata.TransferError);
    }if(uidata.notpayee){
    this.toastnotPayee(uidata.notpayee);
    }
    }
    }catch(err){
    kony.print("onNavigate:"+err);
    }
    }, 
    preShow: function () {
    try{
    var scope =this;
    this.view.postShow = this.postShow;
    this.setUI();
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
    this.view.flxHeader.isVisible = true;
    this.view.flxMainScroll.top = "56dp";
    }
    else {
    this.view.flxHeader.isVisible = false;
    this.view.flxMainScroll.top = "5dp";
    }
    this.setTodayDate();
    // this.view.customCalendar.preShow();
    this.view.calStartDate.onSelection = function() {
    //scope.customDateCount++;
    //scope.view.calStartDate.validStartDate = [scope.view.calStartDate.dateComponents[0], scope.view.calStartDate.dateComponents[1], scope.view.calStartDate.dateComponents[2]];
    //scope.view.calEndDate.validStartDate = [scope.view.calStartDate.dateComponents[0], scope.view.calStartDate.dateComponents[1], scope.view.calStartDate.dateComponents[2]];
    scope.onCustomDateChange();
    };
    this.view.calEndDate.onSelection = function() {
    // scope.customDateCount++;
    scope.view.calStartDate.validEndDate = [scope.view.calEndDate.dateComponents[0], scope.view.calEndDate.dateComponents[1], scope.view.calEndDate.dateComponents[2]];
    scope.onCustomDateChangeEnd();
    };

    }catch(err)
    {
    kony.print("preShow:"+err);
    }
    },

    postShow: function () {
    try{
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
    this.view.customHeader.btnRight.onClick = this.oncancelClick;
    this.view.btnContinue.onClick = this.constructPayload;//this.btnContinueOnClick;
    // this.view.lblTxtAccNo.onTextChange = this.validateAmountRange;
    this.view.flxChooseAccount.onClick =this.flxFromClick;
    this.view.transferToExistingPayee.onClick= this.flxToClick;
    //this.view.lblTxtAccNo.onTouchEnd = this.accountNumValidate;
    this.view.btnContinue.skin="sknBtnE2E9F0Rounded";
    this.view.txtAmount.onTextChange = this.regexNumeric;//this.validateContinueButton;
    //this.view.txtAmount.onDone = this.roundAmountField;
    this.view.txtAmount.onEndEditing = this.roundAmountField;
    //this.view.flxSendOnValue.onClick = 
    this.flxStartDate();
    //this.view.flxSendEndValue.onClick = 
    this.flxEndDate();
     this.view.txtRemarks.onTextChange = this.restrictRegex; //this.roundAmountField;
    this.view.flxFrequency.onClick = this.popupFrequency;
    this.view.flxSpecficDate.onClick =this.popupSpecficDate;

    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();;
    }
    },
    flxFromClick: function(){
    try{
    var scope= this;
    this.segFlag ="fromToAcc";
    this.dataforFrom = true;
    this.dataforTo = false;
    var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });  
    var fromListData = transfMod.getListPayee;
    var defaultFrom =this.view.lblAccountNumber.text;
    fromListData = fromListData[0].filter(item => item.accountID !== defaultFrom);
    if(!kony.sdk.isNullOrUndefined(fromListData)){
    //this.setSegmentData(fromListData);
    }else{}
    if(fromListData.length>0){
    var PopupObj={
    "accounts":fromListData,//should br Array of object[{},{},{}...]
    "flowType":"FT_From",
    "rowClickCallback":scope.dataFromSeg.bind(this)
    };
    applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
    /*if(fromListData.length>0){
    this.view.flxPopupfrombottom.setVisibility(true);
    this.view.tbxSearch.text ="";
    this.view.tbxSearch.onTextChange = this.fromAccountSearch;
    this.view.lblselectaccount.text =kony.i18n.getLocalizedString("kony.mb.cardLess.FromAccount");
    this.view.flxPopupcontainer.animate(kony.ui.createAnimation({
    "100": {
    "bottom": "-5%",
    "stepConfig": {
    "timingFunction": kony.anim.EASE
    }
    }
    }), {
    "delay": 0,
    "iterationCount": 1,
    "fillMode": kony.anim.FILL_MODE_FORWARDS,
    "duration": 1.0
    }, /*{
    "animationEnd": function() {
    this.view.flxPopupfrombottom.isVisible=false;
    }
    });*/
    }else{
    var msg =kony.i18n.getLocalizedString("kony.mb.Transfers.NoTransaction");
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);  
    }
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();;
    }
    },
    flxToClick: function(){
    try{
    var scope= this;
    this.segFlag ="fromToAcc";
    this.dataforFrom = false;
    this.dataforTo = true;
    var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var toList =transfMod.getBankDetailsResponse;
    var lblFromData = (this.view.lblBalance.text).slice(0,3);
    if(lblFromData =="NPR"){
    toList = toList.filter(item => item.currencyCode === "NPR" && item.accountID != this.view.lblAccountNumber.text);
    this.view.flxCurrency.skin ="sknHBLFlxffffffBr1Pxf3e9e9Radius8Px";
    this.view.flxCurrency.onClick =function(){};
    this.view.flxcurrencyrightarrow.setVisibility(false);
    this.view.lblCurrencyValue.centerX ="50%";
    }else{
    toList =toList.filter(item => item.transferFlow === "ownAccount" && item.accountID != this.view.lblAccountNumber.text);
    this.view.flxCurrency.onClick =this.currencyClick;
    this.view.flxcurrencyrightarrow.setVisibility(true);
    this.view.lblCurrencyValue.centerX ="35%";
    }
    if(!kony.sdk.isNullOrUndefined(toList)){
    // this.setSegmentData(toList);
    }else{}
    if(toList.length>0){
    var PopupObj={
    "accounts":toList,//should br Array of object[{},{},{}...]
    "flowType":"FT_From",
    "rowClickCallback":scope.dataFromSeg.bind(this)
    };
    applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
    /* this.view.flxPopupfrombottom.setVisibility(true);
    this.view.tbxSearch.text ="";
    this.view.tbxSearch.onTextChange = this.toAccountSearch;
    this.view.lblselectaccount.text =kony.i18n.getLocalizedString("kony.mb.checkDeposit.toAccount");
    this.view.flxPopupcontainer.animate(kony.ui.createAnimation({
    "100": {
    "bottom": "-5%",
    "stepConfig": {
    "timingFunction": kony.anim.EASE
    }
    }
    }), {
    "delay": 0,
    "iterationCount": 1,
    "fillMode": kony.anim.FILL_MODE_FORWARDS,
    "duration": 1.0
    }, /*{
    "animationEnd": function() {
    this.view.flxPopupfrombottom.isVisible=false;
    }
    });*/
    }else{
    var msg =kony.i18n.getLocalizedString("kony.mb.P2P.NoPayeesAvailable");
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    }   
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    payeeConfirm: function(payee){
    try{
    var scope= this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var toList = transfMod.getBankDetailsResponse;
    let matchedAccount = toList.find(account => account.accountID === this.view.lblTxtAccNo.text);
    this.dataExisiting = !!matchedAccount;
    if(this.dataExisiting){
    var payees =true;
    }else{
    var payees = this.validAccount(payee);
    }
    if(payees){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    // var dates = transferMod.presentationController.getBankDatees[0].currentWorkingDate;
    //var currentDate = new Date(dates).toISOString();
    this.dataExisiting=false;
    //scope.view.txtAccountholder.text = payee.beneficiaryName;
    var ccyCode =(scope.view.lblBalance.text).slice(0,3);
    var transferType =transfMod.transferFlow;
    var amount =Number(this.view.txtAmount.text);
    var convertAmount = amount.toFixed(2);
    var wholeAmount =convertAmount.split(".")[0];
    var decimalAmount = convertAmount.split(".")[1];
    var ttAmount = amount.toFixed(2)
    applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmFundscheduleTransfer");
    if(transferType == "sameBank"){
    var payloadData2 ={
    "toAccCurrency":kony.sdk.isNullOrUndefined(payee.currency)?this.view.lblCurrencyValue.text:payee.currency,
    "fromAccCurrency":(scope.view.lblBalance.text).slice("",3),
    "fromAccName": scope.view.lblAccountName.text,
    "fromAccNumber":scope.view.lblAccountNumber.text,
    "bankName": kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue"),
    "toAccNumber": scope.view.lblTxtAccNo.text,
    "toAccName": kony.sdk.isNullOrUndefined(payee.beneficiaryName)?this.view.txtAccountholder.text:payee.beneficiaryName,//scope.view.txtAccountholder.text,
    "totalamount":convertAmount,
    "amount":wholeAmount,
    "decimal":decimalAmount,
    "currencyCode": scope.view.lblCurrencyValue.text,
    "remark":this.view.txtRemarks.text,
    "toBankName":kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue"),
    "responseKey":this.responseKeys
    };
    applicationManager.getNavigationManager().setCustomInfo("payloadData2",payloadData2);
    }
    var payloadData={
    "Transfer Amount":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(this.view.txtAmount.text,this.view.lblCurrencyValue.text),
    "Remarks":this.view.txtRemarks.text,
    "currencyCode":scope.view.lblCurrencyValue.text
    };
    applicationManager.getNavigationManager().setCustomInfo("payloadData",payloadData);
    if(transfMod.transfersFlow !="intra"){
    var payload= {
    "amount": ttAmount,
    "beneficiaryName": scope.view.lblAccountName.text,
    "createWithPaymentId": "true",
    "frequencyEndDate": scope.responseKeys.frequencyEndDate,
    "frequencyStartDate": scope.responseKeys.frequencyStartDate,
    "frequencyType": scope.responseKeys.frequencyType,
    "fromAccountCurrency": (scope.view.lblBalance.text).slice("",3),
    "fromAccountNumber": scope.view.lblAccountNumber.text,
    "isScheduled": "1",
    "scheduledDate": scope.responseKeys.frequencyStartDate,
    "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
    "toAccountCurrency": kony.sdk.isNullOrUndefined(payee.currency)?this.view.lblCurrencyValue.text:payee.currency,
    "toAccountNumber":  scope.view.lblTxtAccNo.text,
    "transactionCurrency": scope.view.lblCurrencyValue.text,
    "transactionType": "InternalTransfer",
    "transactionsNotes": this.view.txtRemarks.text,
    "beneficiaryNickname":"",
    "deletedDocuments":"",
    "iban":"",
    "numberOfRecurrences":scope.responseKeys.numberOfRecurrences,
    "paidBy":"",
    "paymentType":"",
    "swiftCode":"",
    "transactionId":"",
    "uploadedattachments":"",
    "userId":"",
    "validate": "true"
    };
    transferMod.presentationController.ownAccountTransfer(payload);
    //navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmConfirmTransfer" },false,{"payload":payloadData});
    }else{
    var payloads ={
    "ExternalAccountNumber": scope.view.lblTxtAccNo.text,
    "amount": ttAmount,
    "beneficiaryAddressLine1": "",
    "beneficiaryAddressLine2": "",
    "beneficiaryCity": "",
    "beneficiarycountry": "",
    "beneficiaryEmail": "",
    "beneficiaryName": kony.sdk.isNullOrUndefined(payee.beneficiaryName)?this.view.txtAccountholder.text:payee.beneficiaryName,//scope.view.txtAccountholder.text
    "beneficiaryNickname": "",
    "beneficiaryPhone": "",
    "beneficiaryState": "",
    "beneficiaryZipcode": "",
    "createWithPaymentId": "true",
    "deletedDocuments": "",
    "frequencyEndDate": scope.responseKeys.frequencyEndDate,
    "frequencyStartDate": scope.responseKeys.frequencyStartDate,
    "frequencyType": scope.responseKeys.frequencyType,
    "fromAccountCurrency": (scope.view.lblBalance.text).slice("",3),
    "fromAccountNumber": scope.view.lblAccountNumber.text,
    "iban": "",
    "isScheduled": "1",
    "numberOfRecurrences": scope.responseKeys.numberOfRecurrences,
    "paidBy": "",
    "paymentType": "",
    "scheduledDate": scope.responseKeys.frequencyStartDate,
    "serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
    "swiftCode": "",
    "toAccountCurrency": kony.sdk.isNullOrUndefined(payee.currency)?this.view.lblCurrencyValue.text:payee.currency,
    "toAccountNumber": scope.view.lblTxtAccNo.text,
    "transactionCurrency":scope.view.lblCurrencyValue.text,
    "transactionId": "",
    "transactionType": "ExternalTransfer",
    "transactionsNotes": this.view.txtRemarks.text,
    "uploadedattachments": "",
    "userId": "",
    "validate": "true"
    };
    if( transfMod.transferPayee!="New payee"){
    transferMod.presentationController.intraBankTransfer(payloads);
    }else{
    payloads.clearingCode="";
    payloads.e2eReference="";
    payloads.intermediaryBicCode="";
    transferMod.presentationController.OneTimeTransfer(payloads);
    }
    }
    }else{
    var msg =kony.i18n.getLocalizedString("i18n.common.InvalidRecipientName");
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);  
    applicationManager.getPresentationUtility().dismissLoadingScreen(); 
    }
    }catch(err){
    kony.print("payeeConfirm:"+ err);
    }
    },
    accountNumValidate: function(){
    try{
    var scope =this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var transferType =transfMod.transferFlow;
    var accNumber = scope.view.lblTxtAccNo.text;
    if(transferType == "sameBank"){
    applicationManager.getPresentationUtility().showLoadingScreen();
    transferMod.presentationController.getPayeeName();
    }
    }catch(err){
    kony.print("accountNumValidate:"+err);
    }
    },
    regexNumeric: function(){
    try{
    var regex = /^\d+(\.\d*)?$/;
    if (!regex.test(this.view.txtAmount.text )) {
    this.view.txtAmount.text  = ""; // or show an error
    }
    this.validateContinueButton();
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    dataFromSeg: function(seg){
    try{
    var scope =this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var res=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
    var segData = seg[0];
    if(this.segFlag =="fromToAcc"){
    transfMod.transfersFlow = segData.lblAccname.info;
    if(this.dataforFrom){
    scope.view.lblAccountName.text=segData.lblAccname.text;
    scope.view.lblAccountNumber.text=segData.lblAccNumber;
    scope.view.lblAccountType.text=segData.lblAccType.text;
    scope.view.lblBalance.text=segData.lblBalance.text;
    scope.view.lblCurrencyValue.text=segData.lblBalance.text.slice("",3);
    for(var i=0;i<res.length;i++){
    if(res[i].accountID == segData.lblAccNumber){
    this.currentBalance = res[i].currentBalance;
    }
    }
    this.dataforFrom= false;
    }else{
    scope.view.txtAccountholder.text = segData.lblAccname.text;
    scope.view.lblTxtAccNo.text = segData.lblAccNumber;
    this.dataforTo = false;
    this.dataExisiting = true;
    }
    }else if(this.segFlag =="currencyCode"){
    this.view.lblCurrencyValue.text =  segData.lblValue;  
    }else if(this.segFlag =="Frequency"){
    this.view.lblFrequencySelect.text =segData.lblValue;
    this.validateScheduleFlx(segData.lblValue);
    }else if(this.segFlag =="Period"){
    //this.view.lblSpecficLong.text =segData.lblValue; 
    this.validatePeriodFlx(segData.lblValue);
    }
    scope.view.flxPopupfrombottom.setVisibility(false);
    this.validateContinueButton();
    }
    catch(err){
    kony.print("dataFromSeg:"+ err)
    }
    },
    flxBackOnClick : function () {
    try{
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transerfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'MoneyMovementUIModule'
    });
    if(transerfMod.externalPayee){
    if(transerfMod.externalPayee.length>0){
        applicationManager.getNavigationManager().goBack();
    }else{
    transerfMod.externalPayee =[];
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",null);
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    transferMod.presentationController.backToVerifyScreen();
    }
    }else{
    transerfMod.externalPayee =[];
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",null);
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    transferMod.presentationController.backToVerifyScreen();
    }   
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    oncancelClick: function(){
    try{
    var transerfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'MoneyMovementUIModule'
    });
    transerfMod.externalPayee =[];
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    transferMod.presentationController.onCancelClick();   
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },

    btnContinueOnClick : function () {
    try{
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });
        var availableBalance = Number(this.currentBalance);
        var amount = Number(this.view.txtAmount.text);
        if(amount<availableBalance){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transferType =transfMod.transferFlow; 
        var toList =transfMod.getBankDetailsResponse;
        for(var i=0;i<toList.length;i++){
        if(toList[i].accountID ==this.view.lblTxtAccNo.text){
        transfMod.transferPayee= "exisiting payee";
        }
        }
    
        if(transfMod.transferPayee !== "exisiting payee"){
        applicationManager.getNavigationManager().setCustomInfo("accNumber",this.view.lblTxtAccNo.text);
        transferMod.presentationController.getPayeeName(this.view.lblTxtAccNo.text);
        }else{
        this.payeeConfirm("");
        }
        }else{
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.mb.FD.lessAvlBalErrMsg"));     
        }
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    validateAmountRange : function () {
    var pan = this.view.lblTxtAccNo.text;
    if (!kony.sdk.isNullOrUndefined(pan)) {
    if (pan.length === 14) {
    //this.enableOrDisableBtnContinue();
    } else {
    this.checkForToastMessageError();
    //this.disableContinueButton();
    }   
    }
    },

    checkForToastMessageError: function () {
    var msg = "Account number must be exactly 14 digits";
    //applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.HBL.Cards.PanError"));
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    //applicationManager.getDataProcessorUtility().showToastMessageError(this, "Please enter a valid 9-digit PAN Number.");
    },

    validateAmountRange1 : function () {
    try{
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("defaultAccIdVirtualCard");
    var accId = data.accId;
    var availableBalanceText = this.getAvailableBalanceByAccountId(accId);

    var amountText = this.view.txtBoxAmountValue.text;
    var amount = parseFloat(amountText);
    var availableBalance = parseFloat(availableBalanceText);

    if (amount < 50.00 || amount > 500.00) {
    this.checkForToastMessageAmountError();
    this.disableContinueButton();
    }else if (amount > availableBalance) {
    this.checkForToastMessageBalanceError();
    this.disableContinueButton();
    }else{
    this.enableOrDisableBtnContinue();

    }    
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },

    setUI:function(account){
    try{
    var scope=this;
    var transfMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule"); 
    var transferMod =applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var transferType =transferMod.transferFlow; 
    if(transferType == "sameBank"){
    scope.view.btnCharges.setVisibility(false);
    scope.view.flxCharges.setVisibility(false);
    }
    }catch(e){
    kony.print("****************Erron in setUI**************"+e);
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
    }
    },
    currencyClick: function(){
    try{  
    var scope = this;
    this.segFlag ="currencyCode";
    var cCode = (scope.view.lblBalance.text).slice(0,3);
    var currencyCode= [
    {"C1":"NPR"},
    {"C1":cCode}
    ];
    var obj={"title":kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),"key":"C1","currencyCode":freqArr,"rowClickCallback":scope.dataFromSeg.bind(scope)}
    applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);
    /* scope.view.segTransactions.rowTemplate ="flxBankList";
    scope.view.segTransactions.widgetDataMap={
    "lblBankList":"lblBankList",
    "lblSeperstor":"lblSeperstor",
    "flxBankList":"flxBankList",
    };
    var data =[];
    for(i=0;i<currencyCode.length;i++){
    data.push({
    "lblBankList":{"text":currencyCode[i].C1,"isVisible":true},
    "lblSeperstor":{"isVisible":true},
    })
    scope.view.segTransactions.onRowClick =scope.dataFromSeg;
    scope.view.imgclose.onTouchStart = scope.closeFlx;
    scope.view.segTransactions.setData(data);
    }
    this.view.flxPopupfrombottom.setVisibility(true);
    this.view.lblselectaccount.text =kony.i18n.getLocalizedString("kony.mb.checkDeposit.toAccount");
    this.view.flxPopupcontainer.animate(kony.ui.createAnimation({
    "100": {
    "bottom": "-5%",
    "stepConfig": {
    "timingFunction": kony.anim.EASE
    }
    }
    }), {
    "delay": 0,
    "iterationCount": 1,
    "fillMode": kony.anim.FILL_MODE_FORWARDS,
    "duration": 1.0
    },)*/
    }catch(err){
    kony.print("currencyclick:"+err);
    }
    },
    resetUI:function(){
    try{
    var scope =this;
    var account;
    var transfMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule"); 
    var transferMod =applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var transerfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'MoneyMovementUIModule'
    });
    var externaldata = kony.sdk.isNullOrUndefined(transerfMod.externalPayee[0])?false:transerfMod.externalPayee[0];
    if(externaldata){
    if(externaldata.length>0){
    var segData = applicationManager.getNavigationManager().getCustomInfo("segSelectedDetails");
    for(var i=0;i<externaldata.length;i++){
    if(externaldata[i].accountNumber ==segData.lblAccountNumber.text){
    var accDatas =externaldata[i]
    }
    }
    this.view.lblTxtAccNo.text=accDatas.accountNumber;
    this.view.txtAccountholder.text=accDatas.beneficiaryName;
    this.view.txtAmount.text ="";
    this.view.txtRemarks.text ="";
    this.view.transferToExistingPayee.enable =false;
    this.view.flxToAccount.enable=false;
    this.view.flxToAccName.enable=false;
    }else{
    this.view.lblTxtAccNo.text="";
    this.view.txtAccountholder.text="";
    this.view.txtAmount.text ="";
    this.view.txtRemarks.text ="";
    this.view.flxSpecficDate.setVisibility(false);
    this.view.flxSendEnd.setVisibility(false);
    this.view.flxRecurrence.setVisibility(false);
    this.view.flxFrequency.setVisibility(true);
    this.view.lblFrequencySelect.text =kony.i18n.getLocalizedString("i18n.transfers.frequency.once")
    this.view.flxSendOn.setVisibility(true);
    //this.view.lblSendOnvalue.text =transferMod.getBankDatees[0].currentWorkingDate;
    this.view.transferToExistingPayee.enable =true;
    this.view.flxToAccount.enable=true;
    this.view.flxToAccName.enable=true;
    }
    }else{
    this.view.lblTxtAccNo.text="";
    this.view.txtAccountholder.text="";
    this.view.txtAmount.text ="";
    this.view.txtRemarks.text ="";
    this.view.flxSpecficDate.setVisibility(false);
    this.view.flxSendEnd.setVisibility(false);
    this.view.flxRecurrence.setVisibility(false);
    this.view.flxFrequency.setVisibility(true);
    this.view.lblFrequencySelect.text =kony.i18n.getLocalizedString("i18n.transfers.frequency.once")
    this.view.flxSendOn.setVisibility(true);
    // this.view.lblSendOnvalue.text =transferMod.getBankDatees[0].currentWorkingDate;
    this.view.transferToExistingPayee.enable =true;
    this.view.flxToAccount.enable=true;
    this.view.flxToAccName.enable=true;
    }
    this.addClientProperty();
    this.view.calStartDate.dateComponents = [];
    this.view.calEndDate.dateComponents = [];
    if(account){
    scope.view.lblAccountName.text=account.accountHolder.fullname;
    scope.view.lblAccountNumber.text=account.accountID;
    scope.view.lblAccountType.text=account.productId;
    scope.view.lblBalance.text=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(account.availableBalance,account.currencyCode);
    scope.view.lblCurrencyValue.text=account.currencyCode;
    }else{
    //var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
    var accounts = transfMod.presentationController.getListPayee[0];
    var defaultAccount=applicationManager.getUserPreferencesManager().getDefaultAccountforTransfers();
    var defaultAccountData;
    /*if(accounts.length){
    this.setSegmentData(accounts);
    }*/
    if(defaultAccount&&accounts.length){
    defaultAccountData=accounts.filter(function (acc){
    if(acc.accountID==defaultAccount)
    return acc;
    });
    }
    if(defaultAccountData.length==0){
    scope.view.lblAccountName.text=JSON.parse(accounts[0].accountHolder).fullname;
    scope.view.lblAccountNumber.text=accounts[0].accountID;
    scope.view.lblAccountType.text=accounts[0].productId;
    scope.view.lblBalance.text=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[0].availableBalance,accounts[0].currencyCode);
    scope.view.lblCurrencyValue.text=accounts[0].currencyCode;
    this.currentBalance = accounts[0].currentBalance;
    }else{
    scope.view.lblAccountName.text=JSON.parse(defaultAccountData[0].accountHolder).fullname;
    scope.view.lblAccountNumber.text=defaultAccountData[0].accountID;
    scope.view.lblAccountType.text=defaultAccountData[0].productId;
    scope.view.lblBalance.text=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(defaultAccountData[0].availableBalance,defaultAccountData[0].currencyCode);
    this.currentBalance = defaultAccountData[0].currentBalance;
    if(defaultAccountData[0].currencyCode =="NPR"){
    scope.view.flxCurrency.onClick =function(){};
    scope.view.flxcurrencyrightarrow.setVisibility(false);
    scope.view.lblCurrencyValue.centerX ="50%";
    }else{
    scope.view.flxCurrency.onClick =this.currencyClick;
    scope.view.flxcurrencyrightarrow.setVisibility(true);
    scope.view.lblCurrencyValue.centerX ="35%";
    }
    scope.view.lblCurrencyValue.text= defaultAccountData[0].currencyCode;

    }
    }
    }
    catch(err){
    kony.print("resetUI:"+err);
    }
    },

    setSegmentData:function(accounts){
    try{
    var scope=this;
    //scope.view.segTransactions.rowTemplate="flxSelectAcc";
    scope.view.segTransactions.widgetDataMap={
    "lblAccname":"lblAccname",
    "lblBalance":"lblBalance",
    "lblAccNumber":"lblAccNumber",
    "lblAccType":"lblAccType",
    "flxRow":"flxRow",
    "flxSeperator":"flxSeperator"
    };
    //  var segData=[];
    var data=[];
    if(accounts.length > 0){
    for(i=0;i<accounts.length;i++){
    if(accounts[i].accountName){
    var rowdata={};
    data.push({
    "lblAccname":{"text":JSON.parse(accounts[i].accountHolder).fullname,"isVisible":true,"info":accounts[i].transferFlow},
    "lblBalance":{"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance, accounts[i].currencyCode),"isVisible":true},
    "lblAccNumber":{"text":accounts[i].accountID,"isVisible":true,"info":accounts[i].currentBalance},
    "lblAccType":{"text":accounts[i].productId,"isVisible":true},
    "flxSeperator":{"isVisible":true}
    })
    /*rowdata.lblField4=accounts[i].accountType;
    rowdata.lblField3=accounts[i].accountID;
    rowdata.lblField1= JSON.parse(accounts[i].accountHolder).fullname;
    rowdata.lblField2=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance,accounts[i].currencyCode);
    rowdata.flxRow={"isVisible":true};
    segData.push(data)*/
    }else{
    data.push({
    "lblAccname":{"text":accounts[i].beneficiaryName,"isVisible":true,"info":accounts[i].transferFlow},
    "lblAccNumber":{"text":accounts[i].accountNumber,"isVisible":true}, 
    "lblBalance":{"isVisible":false},
    "lblAccType":{"isVisible":false},
    "flxSeperator":{"isVisible":true}
    }) 
    }
    }
    scope.view.segTransactions.setData(data);
    }else{

    //applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");    
    }
    // this.roundAmountField();
    this.validateContinueButton();
    scope.view.forceLayout();

    }catch(e){
    kony.print("****************Erron in setSegmentData**************"+e);
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
    }

    },
    formatAmount:function(amount){
    //	var formatedAmount=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount,"NPR");
    //	return formatedAmount;

    },
    validateContinueButton: function(){
    try{

    /*if (!((kony.sdk.isNullOrUndefined(this.view.lblAccountNumber.text)) && (kony.sdk.isNullOrUndefined(this.view.lblTxtAccNo.text)) && (kony.sdk.isNullOrUndefined(this.view.txtAccountholder.text)) && (kony.sdk.isNullOrUndefined(this.view.txtAmount.text)) && (kony.sdk.isNullOrUndefined(this.view.txtRemarks.text)))){
    this.view.btnContinue.skin="sknBtn0095e4RoundedffffffSSP26px";
    }else{
    this.view.btnContinue.skin="sknBtnE2E9F0Rounded";   
    }*/
    if (
    this.isValid(this.view.lblTxtAccNo.text) &&
    this.isValid(this.view.txtAccountholder.text) &&
    this.isValid(this.view.txtAmount.text) &&
    this.isValid(this.view.txtRemarks.text)
    ) {
    this.view.btnContinue.setEnabled(true);
    this.view.btnContinue.skin="sknBtn0095e4RoundedffffffSSP26px";
    } else {
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin="sknBtnE2E9F0Rounded"; 
    }
    }catch(err){
    kony.print("validateContinueButton:" + err);
    }
    },
    isValid: function(value) {
    return (!kony.sdk.isNullOrUndefined(value) && value.trim() !== "");
    },
    roundAmountField: function(){
    var tbxAmount = this.view.txtAmount.text;
    if(tbxAmount !=""){
    this.view.txtAmount.text = parseFloat(tbxAmount).toFixed(2);
    this.validateContinueButton();
    }
    },
    validAccount: function(payee){
    try{
    /*
    var data= accounts;
    scope.view.txtAccountholder.text = data.beneficiaryName;
    applicationManager.getPresentationUtility().dismissLoadingScreen();*/
    var similarityThreshold = 0.8
    const cleanInput = this.view.txtAccountholder.text.trim().toLowerCase().replace(/\s+/g, ' ');
    const cleanActual = payee.beneficiaryName.trim().toLowerCase().replace(/\s+/g, ' ');
    // Exact match
    if (cleanInput === cleanActual) return true;
    // Calculate similarity using Levenshtein distance
    const similarity = this.calculateNameSimilarity(cleanInput, cleanActual);
    return similarity >= similarityThreshold;
    }catch(err){
    kony.print("validAccount:"+ err )
    }
    },
    calculateNameSimilarity:function(str1, str2) {
    try{
    // Simple implementation - you might want to use a library for production
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    return (longer.length - this.levenshteinDistance(longer, shorter)) / parseFloat(longer.length);      
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    levenshteinDistance:function(a, b) {
    try{
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
    }
    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
    if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
    } else {
        matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
        );
    }
    }
    }
    return matrix[b.length][a.length];  
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    errorResponse: function(err){
    var scope =this;
    if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errorMessage);
    }else if(!kony.sdk.isNullOrUndefined(err.serverErrorRes.dbpErrMsg)){
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.serverErrorRes.dbpErrMsg);
    }else{
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    toastnotPayee: function(data){
    var scope =this;
    if(data){
    var msg = kony.i18n.getLocalizedString("i18n.common.errorCodes.12002")
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, msg);    
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    fromAccountSearch: function(){
    try{ 
    var transferMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var fromListData = transferMod.getListPayee;
    var defaultFrom =this.view.lblAccountNumber.text;
    fromListData = fromListData[0].filter(item => item.accountID !== defaultFrom);
    var searchTerm = this.view.tbxSearch.text;
    if(searchTerm.length>= 3){
    var results = [];
    var lowercaseSearchTerm = searchTerm.toLowerCase().trim();
    for (var i = 0; i < fromListData.length; i++) {
    var category = fromListData[i];
    var lowercaseLabelText = category.AccountName.toLowerCase();
    var lower = category.accountID;
    if (lowercaseLabelText.includes(lowercaseSearchTerm) || lower.includes(lowercaseSearchTerm)) {
    results.push(category);
    }
    }
    this.setSegmentData(results);
    }else{
    if(searchTerm.length==0){
    var fromListData =fromListData;
    this.setSegmentData(fromListData);
    }
    }  
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
}
 }, 
    toAccountSearch: function(){
    try{
    var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'ManageActivitiesUIModule'
    });
    var toList = transfMod.getBankDetailsResponse;
    var lblFromData = (this.view.lblBalance.text).slice(0, 3);
    if (lblFromData == "NPR") {
    toList = toList.filter(item => item.currencyCode === "NPR" && item.accountID != this.view.lblAccountNumber.text);
    }else{
    toList = toList.filter(item => item.transferFlow === "ownAccount" && item.accountID != this.view.lblAccountNumber.text);
    }
    var searchTerm = this.view.tbxSearch.text;
    if(searchTerm.length>= 3){
    var results = [];
    var lowercaseSearchTerm = searchTerm.toLowerCase().trim();
    for (var i = 0; i < toList.length; i++) {
    var category = toList[i];
    var lowercaseLabelText = category.AccountName.toLowerCase();
    var lower = category.accountID;
    if (lowercaseLabelText.includes(lowercaseSearchTerm) || lower.includes(lowercaseSearchTerm)) {
    results.push(category);
    }
    }
    this.setSegmentData(results);
    }else{
    if(searchTerm.length==0){
    var toList =toList;
    this.setSegmentData(toList);
    }
    }  
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }

    },   
    closeFlx: function(){
    this.view.flxPopupfrombottom.setVisibility(false);
    },
    addClientProperty: function(){
    try{
    var CommonUtilities = require('CommonUtilities');
    var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
    var tbxInput = JSON.parse(clientProperties.FT_SAMEBANK_INPUT_CONFIG);
    var tbxAccName = tbxInput.acNameLen;
    var tbxAccNumber = tbxInput.acNumLen;
    var tbxRemark = tbxInput.remarksLen;
    if(typeof tbxAccName=="string"){
        tbxAccName=parseInt(tbxAccName);
    }
    if(typeof tbxAccNumber=="string"){
        tbxAccNumber=parseInt(tbxAccNumber);
    }
    if(typeof tbxRemark=="string"){
        tbxRemark=parseInt(tbxRemark);
    }
    this.view.txtAccountholder.maxTextLength = tbxAccName;
    this.view.lblTxtAccNo.maxTextLength = tbxAccNumber;
    this.view.txtRemarks.maxTextLength =tbxRemark;
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    restrictRegex: function(){
    try{
        var alphaNumerRegex =/[^a-zA-Z0-9 ]/g;
        this.view.txtRemarks.text = this.view.txtRemarks.text.replace(alphaNumerRegex, '');
        this.roundAmountField();
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    flxStartDate: function(){
    try{
    var scope =this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var datee =transferMod.presentationController.getBankDatees[0].currentWorkingDate
    var formatUtility = applicationManager.getFormatUtilManager();
    var todaysDate =formatUtility.getFormattedCalendarDate(datee);
    //
   /* var currentDate = new Date(datee);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var todayDate = new Date();
    var currentDay = todayDate.getDate();
    var currentMonth = todayDate.getMonth() + 1;
    var currentYear = todayDate.getFullYear();
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    this.view.calStartDate.validStartDate = [day, month, year];
    //this.view.calStartDate.validEndDate = [currentDay, currentMonth, currentYear];
    this.view.calStartDate.validEndDate = [31, 12, 2099];
    this.view.calStartDate.viewConfig = {
        gridConfig: {
            allowPastDates: false,
            allowFutureDates: true
        }
    };*/
    var parts = datee.split("-");
    var year  = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day   = parseInt(parts[2], 10);
    this.view.calStartDate.validStartDate = [day, month, year];
    this.view.calStartDate.validEndDate = [31, 12, 2099];
    this.view.calStartDate.viewConfig = {
        gridConfig: {
            allowPastDates: false,
            allowFutureDates: true
        }
    };
    //this.view.calEndDate.validStartDate = [day, month, year];
    //this.view.calEndDate.validEndDate = [currentDay, currentMonth, currentYear];
    //
    //scope.view.customCalendar.currentDate = todaysDate;
    //scope.view.customCalendar.preShow();
    // scope.view.flxMainContainer.setVisibility(false);
    //scope.view.flxCalendar.setVisibility(true);
    scope.view.forceLayout();    
    }catch(err){
    kony.print("err:"+err);
    }

    //var currentDate = new Date(date).toISOString();

    },  
    flxEndDate: function(){
    try{
    var scope =this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var datee =transferMod.presentationController.getBankDatees[0].nextWorkingDate
    var formatUtility = applicationManager.getFormatUtilManager();
    var todaysDate =formatUtility.getFormattedCalendarDate(datee);
    //scope.view.customCalendar.currentDate = todaysDate;
    //
   /* var currentDate = new Date(datee);
    var endDate = new Date(currentDate.setDate(currentDate.getDate() + 1095));
    endDate.setFullYear(currentDate.getFullYear() - 5);
    var month = endDate.getMonth() + 1;
    var year = endDate.getFullYear();
    var todayDate = new Date();
    var currentDay = todayDate.getDate();
    var currentMonth = todayDate.getMonth() + 1;
    var currentYear = todayDate.getFullYear();
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;
    this.view.calEndDate.validEndDate = [day, month, year];
    this.view.calEndDate.validStartDate = [currentDay, currentMonth, currentYear];
    //scope.view.customCalendar.preShow();
    //scope.view.flxMainContainer.setVisibility(false);
    //scope.view.flxCalendar.setVisibility(true);
    */
    var parts = datee.split("-");
    var year  = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day   = parseInt(parts[2], 10);
    this.view.calEndDate.validStartDate = [day, month, year];
    this.view.calEndDate.validEndDate = [31, 12, 2099];
    this.view.calEndDate.viewConfig = {
        gridConfig: {
            allowPastDates: false,
            allowFutureDates: true
        }
    };
    scope.view.forceLayout();  
    }catch(err){
    kony.print("err:"+err);
    }
    },  
    validateScheduleFlx: function(segData){
    try{
    if(segData !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once")){
    this.view.lblSpecficLong.text =kony.i18n.getLocalizedString("i18n.transfers.lbxOnSpecificDate");
    this.view.flxSpecficDate.setVisibility(true);
    this.view.flxSendOn.setVisibility(true);
    this.view.lblSendOn.text =kony.i18n.getLocalizedString("i18n.transfers.start_date");
    this.view.flxSendEnd.setVisibility(true);
    this.view.flxRecurrence.setVisibility(false);
    }else if(segData ===kony.i18n.getLocalizedString("i18n.transfers.frequency.once")){
    this.view.flxSpecficDate.setVisibility(false);
    this.view.flxSendOn.setVisibility(true);
    this.view.lblSendOn.text =kony.i18n.getLocalizedString("i18n.ConfirmEur.SendOn");
    this.view.flxSendEnd.setVisibility(false);
    this.view.flxRecurrence.setVisibility(false);
    }   
    this.validatePeriodFlx()
    }catch(err){
    kony.print("err:"+err);
    }
    },
    validatePeriodFlx: function(segData){
    try{
    var scope =this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var datee =transferMod.presentationController.getBankDatees[0].currentWorkingDate;
    this.view.lblSpecficLong.text = segData;
    if(segData == kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences")){
    this.view.flxSpecficDate.setVisibility(true);
    this.view.flxSendOn.setVisibility(true);
    this.view.lblSendOnvalue.setVisibility(false);
    this.view.lblSendOnvalue.text = datee;
    this.view.lblSendOn.text =kony.i18n.getLocalizedString("i18n.ConfirmEur.SendOn");
    this.view.flxSendEnd.setVisibility(false);
    this.view.flxRecurrence.setVisibility(true);
    }else if(segData == kony.i18n.getLocalizedString("i18n.transfers.lbxOnSpecificDate")){
    this.view.flxSpecficDate.setVisibility(true);
    this.view.flxSendOn.setVisibility(true);
    this.view.lblSendOnvalue.setVisibility(false);
    this.view.lblSendOnvalue.text = datee;
    this.view.lblSendOn.text =kony.i18n.getLocalizedString("i18n.transfers.start_date"); 
    this.view.flxSendEnd.setVisibility(true);
    this.view.lblSendEndValue.setVisibility(true);
    this.view.lblSendEndValue.text =datee;
    this.view.flxRecurrence.setVisibility(false); 
    }else if(segData == kony.i18n.getLocalizedString("i18n.transfers.lblUntilICancel")){
    this.view.flxSpecficDate.setVisibility(true);
    this.view.flxSendOn.setVisibility(true);
    this.view.lblSendOnvalue.setVisibility(false);
    this.view.lblSendOnvalue.text = kony.i18n.getLocalizedString("i18n.transfers.frequency.once");
    this.view.lblSendOn.text =kony.i18n.getLocalizedString("i18n.transfers.start_date"); 
    this.view.flxSendEnd.setVisibility(false);
    this.view.flxRecurrence.setVisibility(false); 
    }
    }catch(err){
    kony.print("validatePeriodFlx"+err);
    }
    },
    popupFrequency: function(){
    try{
    var scope =this;
    var freqArr =[];
    this.segFlag ="Frequency";
    for(i=0;i<Object.keys(this.frequencyTypes).length;i++){
    freqArr.push(
    {"Frequency":Object.values(this.frequencyTypes)[i]}
    )
    }
    var obj={"title":kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),"key":"Frequency","Segdata":freqArr,"rowClickCallback":scope.dataFromSeg.bind(scope)}
    applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);
    }catch(err){
    kony.print("popupFrequency"+ err);
    }
    },
    popupSpecficDate: function(){
    try{
    var scope =this;
    var freqArr =[];
    this.segFlag ="Period";
    for(i=0;i<Object.keys(this.periods).length;i++){
    freqArr.push(
    {"Frequency":Object.values(this.periods)[i]}
    )
    }
    var obj={"title":kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),"key":"Frequency","Segdata":freqArr,"rowClickCallback":scope.dataFromSeg.bind(scope)}
    applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);
    }catch(err){
    kony.print("popupSpecficDate"+err);
    }
    },
    onCustomDateChange: function(){
    try{
    var scope = this;
    var startDate = new Date(scope.view.calStartDate.dateComponents[2], scope.view.calStartDate.dateComponents[1] - 1, scope.view.calStartDate.dateComponents[0]);
    this.view.lblSendOnvalue.setVisibility(false);
    this.view.lblSendOnvalue.text =new Date(startDate).toISOString();
    }catch(err){
    kony.print("err:"+err);
    }
    },
    onCustomDateChangeEnd: function(){
    try{
    var scope = this;
    var endDate = new Date(scope.view.calEndDate.dateComponents[2], scope.view.calEndDate.dateComponents[1] - 1, scope.view.calEndDate.dateComponents[0]);
    this.view.lblSendEndValue.setVisibility(false);
    this.view.lblSendEndValue.text =new Date(endDate).toISOString();
    }catch(err){
    kony.print("err:"+err);
    }
    },
    setTodayDate: function() {
    try{
        var scope = this;
        var today = new Date();
       var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var datee =transferMod.presentationController.getBankDatees[0].nextWorkingDate;
        //   var currentWorkingDate = bankDate?bankDate.currentWorkingDate:null;
       var  today = new Date(datee);
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        var currentWorkingDates = yyyy + "-" + mm + "-" + dd;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        //Backend format is YYYY-MM-DD 
        today = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
        //cope.advanceSearchOptions.searchStartDate = today;
        //scope.advanceSearchOptions.searchEndDate = today;
        var month = new Date().getMonth() + 1;
        var todayDisplay = [new Date().getDate(), month, yyyy];
        if (!kony.sdk.isNullOrUndefined(currentWorkingDates)) {
            var x = []
            var a = currentWorkingDates.split("-");
            for (var i = 2; i >= 0; i--) {
                x.push(Number.parseInt(a[i]));
            }
            todayDisplay = x;
        }
        scope.view.calStartDate.dateComponents = todayDisplay;
        scope.view.calStartDate.validStartDate = todayDisplay;
        scope.view.calStartDate.validEndDate = [31, 12, 2099];
        scope.view.calEndDate.dateComponents = todayDisplay;
        scope.view.calEndDate.validStartDate = todayDisplay;
        scope.view.calStartDate.validEndDate = [31, 12, 2099];
        scope.validateDateWidget(todayDisplay);
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    validateDateWidget: function(endDate) {
    try{
    var scope = this;
    scope.view.calEndDate.validEndDate = endDate;
    scope.view.calStartDate.validEndDate = endDate;
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    constructPayload: function(){
    try{
    var scope =this;
    if(scope.view.lblFrequencySelect.text == kony.i18n.getLocalizedString("i18n.transfers.frequency.once")){
    scope.responseKeys.frequencyStartDate = this.dateFormat(scope.view.calStartDate.date);
    scope.responseKeys.frequencyEndDate ="";
    scope.responseKeys.numberOfRecurrences="";
    scope.responseKeys.frequencyType =scope.view.lblFrequencySelect.text;
    }else if(scope.view.lblFrequencySelect.text !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once") && this.view.lblSpecficLong.text == kony.i18n.getLocalizedString("i18n.transfers.lbxOnSpecificDate")){
    scope.responseKeys.frequencyStartDate=this.dateFormat(scope.view.calStartDate.date);
    scope.responseKeys.frequencyEndDate= this.dateFormat(scope.view.calEndDate.date);
    scope.responseKeys.numberOfRecurrences ="";
    scope.responseKeys.frequencyType =scope.view.lblFrequencySelect.text;
    }else if(scope.view.lblFrequencySelect.text !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once") && this.view.lblSpecficLong.text  == kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences")){
    scope.responseKeys.frequencyStartDate = this.dateFormat(scope.view.calStartDate.date);
    scope.responseKeys.numberOfRecurrences = scope.view.txtRecurrence.text;
    scope.responseKeys.frequencyEndDate = this.dateFormat(scope.view.calEndDate.date);
    scope.responseKeys.frequencyType =scope.view.lblFrequencySelect.text;
    }else if(scope.view.lblFrequencySelect.text !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once") && this.view.lblSpecficLong.text == kony.i18n.getLocalizedString("i18n.transfers.lblUntilICancel")){
    scope.responseKeys.frequencyStartDate = this.dateFormat(scope.view.calStartDate.date);
    scope.responseKeys.frequencyEndDate ="";
    scope.responseKeys.numberOfRecurrences="";
    scope.responseKeys.frequencyType =scope.view.lblFrequencySelect.text;
    }
    this.btnContinueOnClick();
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    dateFormat: function(input){
    var [day, month, year] = input.split('/').map(Number);
    var ac = new Date(Date.UTC(year, month - 1, day)).toISOString();
    return ac;
    },
    };   
    });
