define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
        return {
        status:"",
        banksData:{},
        bankDetails:{},
        isEnable :false,
        init: function () {
        var scope = this;
        var currentFormObject = kony.application.getCurrentForm();
        var currentForm = currentFormObject.id;
        applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        },
        onNavigate: function(uidata){
        try{
        if(uidata.sameBank){
        this.setUI();
        }if(uidata.domestic){
        this.setUI();
        }if(uidata.payee){
        this.btnContinueOnClick(uidata.payee);
        }if(uidata.notpayee){
        this.toastnotPayee(uidata.notpayee);
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
                this.view.flxMainScroll.top = "60dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "5dp";
            }
            this.addClientProperty();
        this.view.postShow = this.postShow;
        },

        postShow: function () {
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.flxCancelOnclick;
        this.view.txtAccountHolderName.onTextChange = this.enableChk;
        this.view.txtNickName.onTextChange = this.validateContinueButton;
         this.view.txtAccountHolderName.onDone =this.validateContinueButton;
        this.view.txtAccountHolderName.onEndEditing = this.validateContinueButton;
       // this.view.segTransactions.onRowClick =this.dataFromSeg;
        this.view.txtAccountNumber.onEndEditing = this.validateContinueButton;
         this.view.txtAccountNumber.onDone =this.validateContinueButton;
         this.view.txtNickName.onDone =this.validateContinueButton;
         this.view.txtNickName.onEndEditing =this.validateContinueButton;
        this.view.btnContinue.onClick = this.validatePayeeAccount;//this.btnContinueOnClick;
            this.view.btnCancel.onClick =this.domesticValidate;
           // this.view.flxPopupfrombottom.onClick =this.closeFlx;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        setUI: function(){
        try{
        var transferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });  
        var flow = transferMod.transferFlow;
        var fromToData = applicationManager.getNavigationManager().getCustomInfo("payloadData2");
        if(flow !="domesticBank"){
        this.view.flxRightArrow.setVisibility(false);   
        this.view.flxSelectBank.onClick= function(){};
       this.view.txtAccountNumber.onTextChange = this.enableChk;
        this.view.lblSelectedBankName.text= kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue");
        this.view.btnContinue.setVisibility(true);
        this.view.btnCancel.setVisibility(false);
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin ="sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        }else{
        this.view.btnCancel.text =kony.i18n.getLocalizedString("i18n.TransfersEur.btnContinue");
        this.view.lblSelectedBankName.text= kony.i18n.getLocalizedString("kony.mb.SelectExternalBank.Title");
        this.view.btnContinue.setVisibility(false);
        this.view.btnCancel.setVisibility(true);
        this.view.flxRightArrow.setVisibility(true);  
        this.view.txtAccountNumber.onTextChange = this.restrictRegex;
        this.view.flxSelectBank.onClick= this.bankDetailss; 
        this.view.btnCancel.skin ="sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        }
        if((!kony.sdk.isNullOrUndefined(transferMod.transferAutoPopulated)) && (!kony.sdk.isNullOrUndefined(fromToData))){
        this.view.txtAccountNumber.text=fromToData.toAccNumber;
        this.view.txtAccountHolderName.text =fromToData.toAccName;
        this.view.lblSelectedBankName.text =fromToData.toBankName;
        this.view.txtNickName.text ="";
        this.view.flxSelectBank.onClick= function(){};
		this.matchBankDetails();
		applicationManager.getNavigationManager().setCustomInfo("payloadData2",null);
        }else{
        this.view.txtAccountNumber.text="";
        this.view.txtAccountHolderName.text ="";
        this.view.txtNickName.text ="";
        }
        }catch(err){
        kony.print("setUI:"+err);
        }
        },
        restrictRegex: function(){
        var alphaNumerRegex =/[^a-zA-Z0-9]/g;
        this.view.txtAccountNumber.text = this.view.txtAccountNumber.text.replace(alphaNumerRegex, '');
        this.enableChk();
        },
        bankDetailss: function(){
            var scope = this;
        try{
        var transferMod = applicationManager.getModulesPresentationController({
                    'appName': 'TransfersMA',
                    'moduleName': 'ManageActivitiesUIModule'
                });
        var banklist=  transferMod.bankListDetails[0];
       // this.view.tbxSearch.text ="";
        //this.view.tbxSearch.onTextChange = this.searchBank;
        if(banklist.length>0){
        // this.setBankListSegData(banklist[0]); 
        }
        var bankNameArr=[]
        for(var i=0;i<banklist.length;i++){
        bankNameArr.push(
        {"bankName":banklist[i].bankName}
        )
        }
        var obj={"title":kony.i18n.getLocalizedString("i18n.transfers.bankName"),"key":"bankName","Segdata":bankNameArr,"rowClickCallback":scope.dataFromSeg.bind(scope),"size":"70%"}
        applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);  
        }catch(err){
        kony.print("bankList:"+err);
        }
        },
        searchBank: function(){
        var transferMod = applicationManager.getModulesPresentationController({
                    'appName': 'TransfersMA',
                    'moduleName': 'ManageActivitiesUIModule'
                });
        var banklist=  transferMod.bankListDetails[0];
        var searchTerm = this.view.tbxSearch.text;
        if(searchTerm.length>= 3){
        var results = [];
        var lowercaseSearchTerm = searchTerm.toLowerCase().trim();
        for (var i = 0; i < banklist.length; i++) {
            var category = banklist[i];
            var lowercaseLabelText = category.bankName.toLowerCase();
            if (lowercaseLabelText.includes(lowercaseSearchTerm)) {
            results.push(category);
            }
        }
        this.setBankListSegData(results);
        }else{
        if(searchTerm.length==0){
            var banklist =banklist;
            this.setBankListSegData(banklist);
        }
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
        closeFlx: function(){
        this.view.flxPopupfrombottom.setVisibility(false);
        },
        dataFromSeg: function(segdata){
        var scope =this;
        try{
        var seg = segdata[0];
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
        var banklist = transfMod.bankListDetails[0];
        scope.view.lblSelectedBankName.text =seg.lblValue;
        for(i=0;i<banklist.length;i++){
        if(banklist[i].bankName === seg.lblValue){
        this.bankDetails={
        "bankCode":banklist[i].bankCode,
        "bankName":banklist[i].bankName,
        "swiftCode":banklist[i].bankSwift
        }; 
        }
        }
        scope.view.flxPopupfrombottom.setVisibility(false);
        }catch(err){
        kony.print("dataFromseg:"+ err);
        }
        },
        flxBackOnClick: function () {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var transerfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'MoneyMovementUIModule'
        });
        var navMan = applicationManager.getNavigationManager();
        var checkForm = navMan.getCustomInfo("checkForm");
         transerfMod.externalPayee =[];
            navMan.setCustomInfo("segSelectedDetails",null);
            if(kony.sdk.isNullOrUndefined(checkForm)){
                navMan.goBack();
            }else{
                navMan.setCustomInfo("checkForm",null); 
                navMan.navigateTo({
                    "appName": "TransfersMA",
                    "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew"
                }); 
            }
        /*if(transerfMod.externalPayee){
        if(transerfMod.externalPayee.length == 0){
            transerfMod.externalPayee =[];
            navMan.setCustomInfo("segSelectedDetails",null);
       
        applicationManager.getNavigationManager().goBack();
        }else{
        transerfMod.externalPayee =[];
        navMan.setCustomInfo("segSelectedDetails",null);
        navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew"
                    });
        }
        }else{
            transerfMod.externalPayee =[];
        applicationManager.getNavigationManager().setCustomInfo("segSelectedDetails",null);
        navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew"
                    });
        }*/
        },

        flxCancelOnclick : function () {
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
        validateContinueButton: function(){
        try{
        var transferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });  
        var flow = transferMod.transferFlow;
        if (
        this.isValid(this.view.txtAccountNumber.text) &&
        this.isValid(this.view.txtAccountHolderName.text)  &&  
        this.isValid(this.view.txtNickName.text)
        ) {
        if(flow !="domesticBank"){
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin="sknHBLBtn851a1cRounded8pxffffff100pr";
        }else{
        if(this.view.lblSelectedBankName.text !== kony.i18n.getLocalizedString("kony.mb.SelectExternalBank.Title")){
        this.view.btnCancel.setEnabled(true);
        this.view.btnCancel.skin="sknHBLBtn851a1cRounded8pxffffff100pr";
        }else{
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin="sknHBLBtnf4f5f8Rounded8pxffffff100pr";  
        }
        }
        // this.txtbxValidation();
        } else {
        if(flow !="domesticBank"){
        this.view.btnContinue.setEnabled(false);
        this.view.btnContinue.skin="sknHBLBtnf4f5f8Rounded8pxffffff100pr"; 
        }else{
        this.view.btnCancel.setEnabled(false);
        this.view.btnCancel.skin="sknHBLBtnf4f5f8Rounded8pxffffff100pr"; 
        }
        }
        this.resetFlxUI();
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
        this.view.btnContinue.skin="sknHBLBtnf4f5f8Rounded8pxffffff100pr"; 
        this.status = false;
        break;
        }else{
        this.status = true;
        this.view.btnContinue.setEnabled(true);
        this.view.btnContinue.skin="sknHBLBtn851a1cRounded8pxffffff100pr";
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
        applicationManager.getPresentationUtility().showLoadingScreen();
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
        }else if(!kony.sdk.isNullOrUndefined(err.responseMessage)){
            applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.responseMessage);
        }else if(!kony.sdk.isNullOrUndefined(err.serverErrorRes)){
            applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.serverErrorRes.dbpErrMsg);
        }else if(!kony.sdk.isNullOrUndefined(err.errMsg)){
            applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errMsg);
        }else{
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
        addClientProperty: function(){
        try{
        var transferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });  
        var CommonUtilities = require('CommonUtilities');
        var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
        var flow = transferMod.transferFlow;
        if(flow !="domesticBank"){
         var tbxInput = JSON.parse(clientProperties.ADDPAYEE_SAMEBANK_INPUT_CONFIG);   
        }
        else{
         var tbxInput = JSON.parse(clientProperties.ADDPAYEE_OTHERBANK_INPUT_CONFIG);
        }
        var tbxAccName = tbxInput.acNameLen;
        var tbxAccNumber = tbxInput.acNumLen;
        var tbxNick = tbxInput.nickNameLen;
         if(typeof tbxAccName=="string"){
        tbxAccName=parseInt(tbxAccName);
    }
    if(typeof tbxAccNumber=="string"){
        tbxAccNumber=parseInt(tbxAccNumber);
    }
    if(typeof tbxNick=="string"){
        tbxNick=parseInt(tbxNick);
    }
        this.view.txtAccountHolderName.maxTextLength = tbxAccName;
        this.view.txtAccountNumber.maxTextLength = tbxAccNumber;
        this.view.txtNickName.maxTextLength =tbxNick;
        }catch(err){
            kony.print("err"+err);
        }
        },
        enableChk: function(){
            try{
            this.view.flxMainContainer.height ="150%";
            }catch(err){
             kony.print("enableChk:"+err);   
            }
        },
        resetFlxUI: function(){
        try{
        this.view.flxMainContainer.height ="80%";
        }catch(err){
        kony.print("resetFlxUI:"+err);
        }
        },
		matchBankDetails: function(){
		var scope =this;
		var transferMod = applicationManager.getModulesPresentationController({
		'appName': 'TransfersMA',
		'moduleName': 'ManageActivitiesUIModule'
		});
		var banklist = transferMod.bankListDetails[0];
		for(var i=0;i<banklist.length;i++){
		if(this.view.lblSelectedBankName.text == banklist[i].bankName){
		scope.bankDetails = {
				"bankCode": banklist[i].bankCode,
				"bankName": banklist[i].bankName,
				"swiftCode": banklist[i].bankSwift
			};
		}
		}
		},
        };
        });