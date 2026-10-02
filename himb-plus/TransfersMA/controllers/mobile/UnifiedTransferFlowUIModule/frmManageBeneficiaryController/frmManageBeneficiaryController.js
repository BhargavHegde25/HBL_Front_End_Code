    define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxCancelOnClick);
    //this.view.onNavigate = this.onNavigate;
    },
    onNavigate: function(uidata){
    try{
    if(uidata.external){
    this.segregateData(uidata.external);
    }if(uidata.deletes){
    this.deleteToast();
     this.segregateData(uidata.deletes);
    }
    if(uidata.externalNoData){
    this.noDataSegment(uidata.externalNoData);
    }
	if(uidata.showGenericErrorMsg){
	this.showGenericErrorMsg();
	}
    }catch(err){
    kony.print("onNavigate:"+err);
    }
    },
    preShow: function () {
    if(applicationManager.getPresentationFormUtility().getDeviceName() == "iPhone"){
     this.view.flxHeader.setVisibility(false);   
     this.view.flxMainScroll.top="5dp";
    }else{
        this.view.flxHeader.setVisibility(true);
        this.view.flxMainScroll.top="60dp";
    }
    this.view.postShow = this.postShow;
    },

    postShow: function () {
    this.view.customHeader.flxBack.onClick = this.flxCancelOnClick;
    this.view.customHeader.btnRight.onClick = this.flxCancelOnClick;
    this.view.btnPrimary.onClick = this.btnPrimaryOnclick;
    this.view.segSameBank.onRowClick =this.rowClickSameBank;
    this.view.segOtherBank.onRowClick= this.rowClickOtherBank;
    this.view.segTransactions.onRowClick = this.chooseBenefFlow;
    this.view.flxPopupfrombottom.onClick = this.setFlxOFF;
    this.view.flxpopupheader.onClick = this.setFlxOFF;
    this.view.btnPrimary.onClick = this.navAddPayee;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    segregateData: function(data){
    try{
    var res =data;
    var sameBankAccounts = data.filter(acc => acc.isSameBankAccount === "true");
    var otherBankAccounts = data.filter(acc => acc.isSameBankAccount === "false");
    if(sameBankAccounts.length>0){
    this.view.lblSameBankNodata.setVisibility(false);
    this.sameSegment(sameBankAccounts);
    }else{
    this.view.lblSameBankNodata.setVisibility(true);
    this.view.segSameBank.setVisibility(false);
    }
    if(otherBankAccounts.length>0){
    this.view.lblOtherBankNodata.setVisibility(false);
    this.otherSegment(otherBankAccounts);
    }else{
    this.view.lblOtherBankNodata.setVisibility(true);
    this.view.segOtherBank.setVisibility(false);
    }
    }catch(err){
    kony.print("segregateData:"+err);
    }
    },
    sameSegment: function(data){
    try{
    this.view.segSameBank.widgetDataMap ={
    "lblSeperstor":"lblSeperstor",
    "flxIcon":"flxIcon",
    "flxAccountDetails":"flxAccountDetails",
    "flxThreeDot":"flxThreeDot",
    "imgBankLogo":"imgBankLogo",
    "lblAccountHolderName":"lblAccountHolderName",
    "lblAccountNumber":"lblAccountNumber",
    "imgThreeDot":"imgThreeDot",
    "lblNickName":"lblNickName",
    "lblVerified":"lblVerified"
    };
    var res= [];
    for(var i=0;i<data.length;i++){
    res.push({
    "imgBankLogo":{"src":data[i].logoUrl},
    "lblAccountHolderName":{"text":data[i].beneficiaryName,"info":data[i].isSameBankAccount},
    "lblAccountNumber":{"text":data[i].accountNumber,"info": data[i].isInternationalAccount},
    "lblSeperstor":{"isVisibile":true,"info":kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank")},
    "lblNickName":{"text": data[i].nickName,"info":kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue")},
    "lblVerified":{"text" :(data[i].isVerified)?kony.i18n.getLocalizedString("i18n.transfers.verified"):kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Pending")},
    "imgThreeDot":{"src":"threereddot.png"},
    })
    }
    this.view.segSameBank.setData(res);
    this.view.segSameBank.setVisibility(true);
    }catch(err){
    kony.print("sameSegment:"+err);   
    }
    },
    otherSegment: function(data){
    try{
    var res =[];
    this.view.segOtherBank.widgetDataMap ={
    "flxBankLogo":"flxBankLogo",
    "flxAccountDetails":"flxAccountDetails",
    "flxThreeDot":"flxThreeDot",
    "imgBankLogo":"imgBankLogo",
    "lblAccountHolderName":"lblAccountHolderName",
    "lblAccountNumber":"lblAccountNumber",
    "lblBankName":"lblBankName",
    "imgThreeDot":"imgThreeDot",
    "lblNickName":"lblNickName",
    "lblVerified":"lblVerified"
    };  
    for(var i=0;i<data.length;i++){
    res.push({
    "imgBankLogo":{"src":data[i].logoUrl},
    "lblAccountHolderName":{"text":data[i].beneficiaryName},
    "lblAccountNumber":{"text":data[i].accountNumber,"info":data[i].isSameBankAccount},
    "lblBankName":{"text": data[i].bankName,"info": data[i].isInternationalAccount},
    "lblSeperstor":{"isVisibile":true,"info":kony.i18n.getLocalizedString("kony.mb.transfer.OtherBank")},
    "lblNickName":{"text": data[i].nickName,"info":data[i].bankName},
    "lblVerified":{"text" :(data[i].isVerified)?kony.i18n.getLocalizedString("i18n.transfers.verified"):kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Pending")},
    "imgThreeDot":{"src":"threereddot.png"},
    })
    } 
    this.view.segOtherBank.setData(res);
    this.view.segOtherBank.setVisibility(true);
    }catch(err){
    kony.print("otherSegment:"+err);   
    }
    },
    noDataSegment: function(data){
    this.view.lblSameBankNodata.setVisibility(true);
    this.view.segSameBank.setVisibility(false);
    this.view.lblOtherBankNodata.setVisibility(true);
    this.view.segOtherBank.setVisibility(false);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    rowClickSameBank: function(segRow){
    try{
    var segData = this.view.segSameBank.selectedRowItems[0];
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",segData);
    this.flxPopupDetails("seg");
    }catch(err){
    kony.print("rowClickSameBank:"+err);
    }
    },
    rowClickOtherBank: function(segRow){
    try{
    var segData = this.view.segOtherBank.selectedRowItems[0];   
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",segData);
    this.flxPopupDetails("seg");
    }catch(err){
    kony.print("rowClickOtherBank:"+err);
    }
    },
    flxPopupDetails: function(input){
    try{
    var scope =this;
    scope.view.segTransactions.rowTemplate ="flxBankList";
    scope.view.segTransactions.widgetDataMap={
    "lblBankList":"lblBankList",
    "lblSeperstor":"lblSeperstor",
    "flxBankList":"flxBankList",
    };
    if(input =="seg"){
    var benefeKeys =  [
    {"key":kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent"),},
    {"key":kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount"),},
    { "key":kony.i18n.getLocalizedString("kony.mb.Transfer.SendMoney"),},
    ]
    }else{
    var benefeKeys =  [
    {"key":kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank"),},
    {"key":kony.i18n.getLocalizedString("kony.mb.transfer.OtherBank"),},
    ] 
    }

    var data =[];
    for(i=0;i<benefeKeys.length;i++){
    data.push({
    "lblBankList":{"text":benefeKeys[i].key,"isVisible":true},
    "lblSeperstor":{"isVisible":true},
    })
    scope.view.segTransactions.setData(data);
    }
    this.view.flxPopupfrombottom.setVisibility(true);
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
    "duration": 0.5
    },);
    }catch(err){
    kony.print("setBankListSegData:"+err);
    }
    },
    navAddPayee: function(){
    try{
    this.flxPopupDetails("data");
    }catch(err){
    kony.print("navAddPayee:"+err);    
    }
    },
    chooseBenefFlow: function(){
    try{
    var scope =this;
    var navManager = applicationManager.getNavigationManager();
    this.setFlxOFF();
    var segData = this.view.segTransactions.selectedRowItems[0];
    if(segData.lblBankList.text ==kony.i18n.getLocalizedString("i18n.ProfileManagement.EditConsent")){
    applicationManager.getPresentationUtility().showLoadingScreen();
    navManager.navigateTo({ "appName": "TransfersMA", "friendlyName": "UnifiedTransferFlowUIModule/frmAddNewBenefePayee"},false,{"sameBank":true}); 
    }else if(segData.lblBankList.text == kony.i18n.getLocalizedString("i18n.transfers.deleteExternalAccount")){
        this.deletePopup();
    }else if(segData.lblBankList.text == kony.i18n.getLocalizedString("kony.mb.Transfer.SendMoney")){
        this.sendMoneyFlow();
    }else if(segData.lblBankList.text == kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank")){
     this.navToSameBankPayee();   
    }else if(segData.lblBankList.text == kony.i18n.getLocalizedString("kony.mb.transfer.OtherBank")){
        this.navToOtherBankPayee();
    }
    }catch(err){
    kony.print("chooseBenefFlow:"+err);
    }
    },
    deletePopup: function(){
     var scope = this;
    var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("kony.mb.BillPay.DeletePayee"),
      "message": kony.i18n.getLocalizedString("i18n.payments.deleteBeneficiariesList"),
      "alertHandler": scope.alertCallback.bind(scope),
      "yesLabel": kony.i18n.getLocalizedString("i18n.common.yes"),
      "noLabel": kony.i18n.getLocalizedString("kony.mb.common.AlertNo")
    };
    var pspConfig = {};
    applicationManager.getPresentationUtility().Alert(basicConfig,pspConfig);   
  },

  //invoked when user clicks on alert box 
  alertCallback: function (response) {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    if (response) {
		scope.deletePayee();
    }
    else {
      // navMan.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
    }
  },

  //invoked when the QR component has any error
  errorCallBack: function (errMsg) {
    var scope = this;
    kony.print(errMsg);
  },
    deletePayee: function(){
    try{
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'MoneyMovementUIModule'
    }); 
    transfMod.deleteFlow =true;  
    var segData =applicationManager.getNavigationManager().getCustomInfo("segSelectedDetails");
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MoneyMovementUIModule");
    var externaldata = transfMod.externalPayee[0]; 
    if(externaldata.length>0){
    for(var i=0;i<externaldata.length;i++){
    if(externaldata[i].accountNumber ==segData.lblAccountNumber.text){
        var accDatas =externaldata[i]
    }
    }
    }
    var payload ={
    "accountNumber":accDatas.accountNumber,
    "Id":accDatas.Id,
    "isSameBankAccount":accDatas.isSameBankAccount,
    "isInternationalAccount":accDatas.isInternationalAccount
    }
    transferMod.presentationController.deletePayeeList(payload);
    }catch(err){
    kony.print("deletePayee:"+err);
    }
    },
    deleteToast: function(){
      var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'MoneyMovementUIModule'
    });
    transfMod.deleteFlow =false;  
        var msg =kony.i18n.getLocalizedString("i18n.payments.deletePayeeSuccessMsg");
         applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
         applicationManager.getPresentationUtility().dismissLoadingScreen();
             },
    setFlxOFF: function(){
    this.view.flxPopupfrombottom.setVisibility(false);
    },
    sendMoneyFlow: function(){
    try{
        applicationManager.getPresentationUtility().showLoadingScreen();
     var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
     var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var segData =applicationManager.getNavigationManager().getCustomInfo("segSelectedDetails");
    if(segData.lblSeperstor.info == kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank")){
    transfMod.transferFlow ="sameBank";
    transfMod.addpayeeFlow ="";
    transferMod.presentationController.getList();
    }else{
    transfMod.transferFlow = "domesticBank";
    transfMod.addpayeeFlow ="";
    transferMod.presentationController.getList();
    }
    }catch(err){
    kony.print("sendMoneyFlow:"+err);
    }
    },
    navToSameBankPayee: function(){
        try{
        applicationManager.getPresentationUtility().showLoadingScreen();
            var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
         var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });  
        transfMod.transferFlow ="sameBank";
        transfMod.addpayeeFlow ="addSameBank";
        transferMod.presentationController.getList();
        }catch(err){
        kony.print("navToSameBankPayee:"+err);
        }
    },
    navToOtherBankPayee: function(){
        try{
            applicationManager.getPresentationUtility().showLoadingScreen();
         var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
         var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });  
        transfMod.transferFlow ="domesticBank";
        transfMod.addpayeeFlow ="addSameBank";
        transferMod.presentationController.getList();
        }catch(err){
        kony.print("navToOtherBankPayee:"+err);
        }
    },
    btnPrimaryOnclick: function () {

    },

    flxBackOnClick: function () {

    },

    flxCancelOnClick: function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transerfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'MoneyMovementUIModule'
        });
        transerfMod.externalPayee =[];
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",null);
         var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        transferMod.presentationController.onCancelClick();
    },
	showGenericErrorMsg: function(){
	try{
	var scope =this;
	applicationManager.getDataProcessorUtility().showToastMessageError(scope, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
	applicationManager.getPresentationUtility().dismissLoadingScreen();
	}catch(err){
	kony.print("err"+err);
	}
	},
    };
    });
