        define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
        return {
        cif:[],
        init: function () {
        var scope = this;
        var currentFormObject = kony.application.getCurrentForm();
        var currentForm = currentFormObject.id;
        applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },
        onNavigate: function(uidata){
        try{
        if(uidata.sameBank){
        this.setUI(uidata.sameBank);
        }if(uidata.TransferError){
            this.errorResponse(uidata.TransferError);
        }if(uidata.btnCancelClick){
            this.btnCancelOnClick()
        }
        }catch(err){
        kony.print("onNavigate:"+ err);
        }
        },

        preShow: function () {
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.flxMainScroll.top = "70dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "15dp";
            }
         this.view.txtNickName.onEndEditing =this.flxHeight;
            this.view.txtNickName.onDone = this.flxHeight;
        this.view.postShow = this.postShow;
        },

        postShow: function () {
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.flxCancelOnclick;
        this.view.txtNickName.onTextChange = this.enableContinuebtn;
       // this.view.txtAccountHolderName.onEndEditing = this.validateContinueButton;
        //this.view.segTransactions.onRowClick =this.dataFromSeg;
       // this.view.txtAccountNumber.onEndEditing = this.validateContinueButton;
        this.view.btnContinue.onClick = this.payeeEditConfirm;//this.validatePayeeAccount;//this.btnContinueOnClick;
         //this.view.btnCancel.onClick =this.domesticValidate;

        applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        setUI: function(data){
        try{
        //this.view.flxBankName.enable =false;
        var data = applicationManager.getNavigationManager().getCustomInfo("segSelectedDetails");
        this.view.flxSelectBank.enable=false;
        this.view.flxAccountNumber.enable =false;
        this.view.flxAccountHolderName.enable= false;
        this.view.flxRightArrow.setVisibility(false);
        this.view.lblSelectedBankName.text =data.lblNickName.info;
        this.view.txtAccountNumber.text = data.lblAccountNumber.text;
        this.view.txtAccountHolderName.text =data.lblAccountHolderName.text;
        this.view.flxMainContainer.height ="100%";
        if(!kony.sdk.isNullOrUndefined(data.lblNickName.text)){
            this.view.txtNickName.text = data.lblNickName.text;
        }else{
            this.view.txtNickName.text = "";
        }
        this.view.imgBankLogo.src = data.imgBankLogo.src;
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin ="sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        }catch(err){
            kony.print("setUI:"+err);
        }
        },
        enableContinuebtn: function(){
        try{
        if(this.view.txtNickName.text.length>0){
        this.view.flxMainContainer.height ="150%";
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin ="sknHBLBtn851a1cRounded8pxffffff100pr";
        }
        }catch(err){
        kony.print("enableContinuebtn:"+err);
        }
        },
        payeeEditConfirm: function(){
        var scope =this;
        applicationManager.getPresentationUtility().showLoadingScreen();
        var segData =applicationManager.getNavigationManager().getCustomInfo("segSelectedDetails");
        this.view.flxMainContainer.height ="100%";
         var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MoneyMovementUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'MoneyMovementUIModule'
    }); 
    var externaldata = transfMod.externalPayee[0]; 
    if(externaldata.length>0){
    for(var i=0;i<externaldata.length;i++){
    if(externaldata[i].accountNumber ==segData.lblAccountNumber.text){
        var accDatas =externaldata[i]
    }
    }
      var payload ={
  "accountNumber": accDatas.accountNumber,
  "bankName":accDatas.bankName ,
  "beneficiaryName": accDatas.beneficiaryName,
  "createdOn": accDatas.createdOn,
  "isInternationalAccount": accDatas.isInternationalAccount,
  "isSameBankAccount": accDatas.isSameBankAccount,
  "isVerified": accDatas.isVerified,
  "nickName": this.view.txtNickName.text,
  "routingNumber": "N/A",
  "swiftCode": "N/A",
  "IBAN": accDatas.accountNumber,
  "cif":accDatas.cif,
  "Id": accDatas.Id,
  "noOfCustomersLinked": accDatas.noOfCustomersLinked,
  "logoUrl": accDatas.logoUrl,
  "beneficiaryType": segData.lblSeperstor.info,
  "recipientName": accDatas.beneficiaryName,
  "flowType": "edit",
  "payeeId": accDatas.Id
}
var rees =applicationManager.getNavigationManager().getCustomInfo("segSelectedDetails");
rees.newNick =this.view.txtNickName.text;
applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",rees);
transferMod.presentationController.editPayeeList(payload);
    }else{
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
    }
        },
        bankDetails: function(){
            var scope = this;
        try{
        var transferMod = applicationManager.getModulesPresentationController({
                    'appName': 'TransfersMA',
                    'moduleName': 'ManageActivitiesUIModule'
                });
    var banklist=  transferMod.bankListDetails;
    if(banklist.length>0){
    this.setBankListSegData(banklist[0]); 
    }
    this.view.flxPopupfrombottom.setVisibility(true);
    this.view.flxSearch.setVisibility(true);
    this.view.flxSearch.top ="50dp"
    this.view.flxSegContainer.top ="100dp";
    this.view.lblselectaccount.text =kony.i18n.getLocalizedString("i18n.transfers.bankName");
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
    },
    );      
    }catch(err){
    kony.print("bankList:"+err);
    }
        },
       setBankListSegData: function(banklist){
    try{
    var scope = this;
    scope.view.segTransactions.rowTemplate ="flxBankList";
    scope.view.segTransactions.widgetDataMap={
    "lblBankList":"lblBankList",
    "lblSeperstor":"lblSeperstor",
    "flxBankList":"flxBankList",
    };
    var data =[];
     for(i=0;i<banklist.length;i++){
    data.push({
    "lblBankList":{"text":banklist[i].bankName,"info":banklist[i].bankCode,"isVisible":true},
    "lblSeperstor":{"info":banklist[i].bankSwift,"isVisible":true},
    })
    scope.view.segTransactions.setData(data);
    }
    }catch(err){
        kony.print("setBankListSegData:"+err);
    }

    },
    dataFromSeg: function(){
    var scope =this;
    try{
    var segData = this.view.segTransactions.selectedRowItems[0];
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
    scope.view.lblSelectedBankName.text =segData.lblBankList.text;
    this.bankDetails={
    "bankCode":segData.lblBankList.info,
    "bankName":segData.lblBankList.text,
    "swiftCode":segData.lblSeperstor.info
    }; 
    scope.view.flxPopupfrombottom.setVisibility(false);
    }catch(err){
        kony.print("dataFromseg:"+ err);
    }
    },
        flxBackOnClick: function () {
         var navMan = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();
         navMan.goBack();
        },

        flxCancelOnclick : function () {
        var transerfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'MoneyMovementUIModule'
        });
        transerfMod.externalPayee =[];
    applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",null);
         var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        transferMod.presentationController.onCancelClick();
        },
        validateContinueButton: function(){
        try{
        var transferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });  
        var flow = transferMod.transferFlow;
        if (
        this.isValid(this.view.txtAccountNumber.text) &&
        this.isValid(this.view.txtAccountHolderName.text) 
        ) {
        if(flow !="domesticBank"){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin="sknBtn0095e4RoundedffffffSSP26px";
        }else{
        this.view.btnCancel.setEnabled(true);
        this.view.btnCancel.skin="sknBtn0095e4RoundedffffffSSP26px";
        }
       // this.txtbxValidation();
        } else {
        if(flow !="domesticBank"){
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin="sknBtnE2E9F0Rounded"; 
        }else{
        this.view.btnCancel.setEnabled(false);
        this.view.btnCancel.skin="sknBtnE2E9F0Rounded"; 
        }
        }
        }catch(err){
        kony.print("validateContinueButton:" + err);
        }
        },
        isValid: function(value) {
        return (!kony.sdk.isNullOrUndefined(value) && value.trim() !== "");
        },

        txtbxValidation: function(){
        var transferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });
        var toAcc = transferMod.getBankDetailsResponse;
        for(var i=0;i<toAcc.length;i++){
        if(toAcc[i].accountID==this.view.txtAccountNumber.text){
        applicationManager.getDataProcessorUtility().showToastMessageError(this, "Beneficiary your trying to add is already listed in your payee list");
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin="sknBtnE2E9F0Rounded"; 
        this.status = false;
        break;
        }else{
        this.status = true;
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin="sknBtn0095e4RoundedffffffSSP26px";
        }
        }
        },
        validatePayeeAccount: function(){
        try{
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        transferMod.presentationController.getPayeeName(this.view.txtAccountNumber.text);
        }catch(err){
        kony.print("validatePayeeAccount:"+ err);
        }
        },
        btnContinueOnClick: function (data) {
            var screen = applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmAddNewPayee");
         var screen = applicationManager.getNavigationManager().getCustomInfo("errorScenario","frmAddNewPayee");
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var tranferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });
        this.view.txtAccountHolderName.text = data.beneficiaryName;
        var flow = tranferMod.addpayeeFlow;  
        var contract = tranferMod.contracts;
        var cif = [{
        "contractId":contract[0].contractId,
        "coreCustomerId": contract[0].contractCustomers[0].coreCustomerId
        }];
        cif= JSON.stringify(cif);
        var segmentData ={
        "transferflow":"Same Bank",
        "benefname":this.view.txtAccountHolderName.text,
        "accNumber":this.view.txtAccountNumber.text,
        "nickname":this.view.lblSelectedBankName.text
        };
        applicationManager.getNavigationManager().setCustomInfo("segData", segmentData);
        var payload = {
        "accountNumber": this.view.txtAccountNumber.text,
        "IBAN": this.view.txtAccountNumber.text,
        "beneficiaryName": this.view.txtAccountHolderName.text,
        "bankName":this.view.lblSelectedBankName.text,
        "nickName": this.view.txtNickName.text,
        "addressLine1": "",
        "addressLine2": "",
        "city": "",
        "zipcode": "",
        "email": "",
        "state": "",
        "country": "",
        "phone": "",
        "swiftCode": "",
        "sameBank": "",
        "otherBank": "",
        "isVerified": "true",
        "isSameBankAccount": "true",
        "isInternationalAccount": "false",
        "feature": "",
        "singleCustomer": "true",
        "cif": cif,
        "verifyPayee": "false" 
        };
        transferMod.presentationController.createPayee(payload);
        },
        btnCancelOnClick :function(){
        try{
        var scope =this;
         var screen = applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmAddNewPayee");
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var tranferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });
        var contract = tranferMod.contracts;
        var cif = [{
        "contractId":contract[0].contractId,
        "coreCustomerId": contract[0].contractCustomers[0].coreCustomerId
        }];
        cif= JSON.stringify(cif);
        var segmentData ={
        "transferflow":"Other Bank",
        "benefname":this.view.txtAccountHolderName.text,
        "accNumber":this.view.txtAccountNumber.text,
        "nickname":this.view.lblSelectedBankName.text
        };
        applicationManager.getNavigationManager().setCustomInfo("segData", segmentData);
        var payload = {
        "accountNumber": this.view.txtAccountNumber.text,
        "IBAN": this.bankDetails.bankCode,
        "beneficiaryName": this.view.txtAccountHolderName.text,
        "bankName": this.view.lblSelectedBankName.text,
        "nickName": this.view.txtNickName.text,
        "addressLine1": "",
        "addressLine2": "",
        "city": "",
        "zipcode": "",
        "email": "",
        "state": "",
        "country": "",
        "phone": "",
        "swiftCode": this.bankDetails.swiftCode,
        "sameBank": "",
        "otherBank": "",
        "isVerified": "true",
        "isSameBankAccount": "false",
        "isInternationalAccount": "false",
        "feature": "",
        "singleCustomer": "true",
        "cif": cif,
        "clearingCode": "",
        "clearingIdentifierCode": "",
        "verifyPayee": "true",
        "bankId":this.bankDetails.bankCode
        };
        transferMod.presentationController.createPayee(payload);
        }catch(err){
        kony.print("btnCancelOnClick:"+err);
        }
        },
        domesticValidate: function(){
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var screen = applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmAddNewPayee");
        var request ={
    "accountId":this.view.txtAccountNumber.text,
    "bankId":this.bankDetails.bankCode,
    "accountName":this.view.txtAccountHolderName.text
    };
    transferMod.presentationController.validateOtherBank(request);
        },
        checkForToastMessageError: function () {

        },
        sucessError: function(err){
    try{
    var scope =this;
    if(!kony.sdk.isNullOrUndefined(err.responseMessage)){
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.responseMessage);
    }else{
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){
    kony.print("sucessError:"+ err);
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");   
    }
    },
        errorResponse: function(err){
        var scope =this;
        if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
            applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errorMessage);
        }else if(!kony.sdk.isNullOrUndefined(err.serverErrorRes.dbpErrMsg)){
             applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.serverErrorRes.dbpErrMsg);
        }else if(!kony.sdk.isNullOrUndefined(err.responseMessage)){
        applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.responseMessage);
    } else{
             applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
        toastnotPayee: function(data){
        var scope =this;
        if(data){
        var msg = kony.i18n.getLocalizedString("i18n.payments.validAccountNumberError")
        applicationManager.getDataProcessorUtility().showToastMessageError(scope, msg);    
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        flxHeight: function(){
        this.view.flxMainContainer.height ="100%";
        },
        };
        });
