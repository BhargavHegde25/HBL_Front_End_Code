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
        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(scope, "CALLBACK", currentForm, scope.flxBackOnClick);
            
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
         var transfMod = applicationManager.getModulesPresentationController({
                'appName': 'TransfersMA',
                'moduleName': 'ManageActivitiesUIModule'
            });
            var fromListData = transfMod.getListPayee;
            if(fromListData[0].length==0){
                this.alertPopUp();
                applicationManager.getPresentationUtility().dismissLoadingScreen();
                return;
            }
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
            this.addClientProperty();
      },

       postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.oncancelClick;
            this.view.btnContinue.onClick = this.btnContinueOnClick;
           // this.view.lblTxtAccNo.onTextChange = this.validateAmountRange;
            this.view.flxChooseAccount.onClick =this.flxFromClick;
           this.view.transferToExistingPayee.onClick= this.flxToClick;
           //this.view.lblTxtAccNo.onTouchEnd = this.accountNumValidate;
           //this.view.btnContinue.skin="sknBtnE2E9F0Rounded";
           this.view.txtAmount.onTextChange = this.regexNumeric;//this.validateContinueButton;
           //this.view.txtAmount.onDone = this.roundAmountField;
            this.view.txtAmount.onEndEditing = this.roundAmountField;
           this.view.txtRemarks.onTextChange = this.restrictRegex; //this.roundAmountField;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },
        flxFromClick: function(){
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
        },
        flxToClick: function(){
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
        var dates = transferMod.presentationController.getBankDatees[0].currentWorkingDate;
      var currentDate = new Date(dates).toISOString();
      this.dataExisiting=false;
        //scope.view.txtAccountholder.text = payee.beneficiaryName;
        var ccyCode =(scope.view.lblBalance.text).slice(0,3);
        var transferType =transfMod.transferFlow;
        var amount =Number(this.view.txtAmount.text);
        var convertAmount = amount.toFixed(2);
        var wholeAmount =convertAmount.split(".")[0];
        var decimalAmount = convertAmount.split(".")[1];
        var ttAmount = amount.toFixed(2)
        applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmFundTransferMain");
        if(transferType == "sameBank"){
        var payloadData2 ={
    "toAccCurrency":payee.currency,
    "fromAccCurrency":(scope.view.lblBalance.text).slice("",3),
    "fromAccName": scope.view.lblAccountName.text,
    "fromAccNumber":scope.view.lblAccountNumber.text,
    "bankName": kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue"),
    "toAccNumber": scope.view.lblTxtAccNo.text,
    "toAccName": payee.beneficiaryName,//scope.view.txtAccountholder.text,
    "totalamount":convertAmount,
    "amount":wholeAmount,
    "decimal":decimalAmount,
    "currencyCode": scope.view.lblCurrencyValue.text,
    "remark":this.view.txtRemarks.text,
    "toBankName":kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue")
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
    "frequencyEndDate": currentDate,
    "frequencyStartDate": currentDate,
    "frequencyType": "Once",
    "fromAccountCurrency": (scope.view.lblBalance.text).slice("",3),
    "fromAccountNumber": scope.view.lblAccountNumber.text,
    "isScheduled": "0",
    "scheduledDate": currentDate,
    "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
    "toAccountCurrency": payee.currency,
    "toAccountNumber":  scope.view.lblTxtAccNo.text,
    "transactionCurrency": scope.view.lblCurrencyValue.text,
    "transactionType": "InternalTransfer",
    "transactionsNotes": this.view.txtRemarks.text,
    "beneficiaryNickname":"",
    "deletedDocuments":"",
    "iban":"",
    "numberOfRecurrences":"",
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
        "beneficiaryName": payee.beneficiaryName,//scope.view.txtAccountholder.text
        "beneficiaryNickname": "",
        "beneficiaryPhone": "",
        "beneficiaryState": "",
        "beneficiaryZipcode": "",
        "createWithPaymentId": "true",
        "deletedDocuments": "",
        "frequencyEndDate": currentDate,
        "frequencyStartDate": currentDate,
        "frequencyType": "Once",
        "fromAccountCurrency": (scope.view.lblBalance.text).slice("",3),
        "fromAccountNumber": scope.view.lblAccountNumber.text,
        "iban": "",
        "isScheduled": "0",
        "numberOfRecurrences": "",
       "paidBy": "",
        "paymentType": "",
        "scheduledDate": currentDate,
        "serviceName": "INTRA_BANK_FUND_TRANSFER_CREATE",
       "swiftCode": "",
        "toAccountCurrency": payee.currency,
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
             var regex = /^\d+(\.\d*)?$/;
       if (!regex.test(this.view.txtAmount.text )) {
       this.view.txtAmount.text  = ""; // or show an error
        }
       this.validateContinueButton();
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
        if (this.segFlag == "fromToAcc" || this.segFlag == "fromToAcc") {
            var segData = seg[0];
            }else{
               var segData =this.view.segTransactions.selectedRowItems[0];  
            }
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
             this.view.lblCurrencyValue.text =  segData.lblBankList.text;  
            }
            scope.view.flxPopupfrombottom.setVisibility(false);
            this.validateContinueButton();
            }
            catch(err){
                kony.print("dataFromSeg:"+ err)
            }
        },
        flxBackOnClick : function () {
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
        },
        oncancelClick: function(){
             var transerfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'MoneyMovementUIModule'
        });
        transerfMod.externalPayee =[];
            var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
            transferMod.presentationController.onCancelClick();
        },

        btnContinueOnClick : function () {
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
        if(transferType == "sameBank"){
        applicationManager.getNavigationManager().setCustomInfo("accNumber",this.view.lblTxtAccNo.text);
        transferMod.presentationController.getPayeeName(this.view.lblTxtAccNo.text);
        }
        }else{
        applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.mb.FD.lessAvlBalErrMsg"));     
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
        scope.view.segTransactions.rowTemplate ="flxBankList";
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
    },)
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
            this.view.transferToExistingPayee.enable =true;
        this.view.flxToAccount.enable=true;
        this.view.flxToAccName.enable=true;
        }
        }else{
            this.view.lblTxtAccNo.text="";
            this.view.txtAccountholder.text="";
            this.view.txtAmount.text ="";
            this.view.txtRemarks.text ="";
            this.view.transferToExistingPayee.enable =true;
        this.view.flxToAccount.enable=true;
        this.view.flxToAccName.enable=true;
        }
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
            // Simple implementation - you might want to use a library for production
            const longer = str1.length > str2.length ? str1 : str2;
            const shorter = str1.length > str2.length ? str2 : str1;
            if (longer.length === 0) return 1.0;
            return (longer.length - this.levenshteinDistance(longer, shorter)) / parseFloat(longer.length);
        },
        levenshteinDistance:function(a, b) {
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
    }, 
    toAccountSearch: function(){
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
        }
    },
    restrictRegex: function(){
    var alphaNumerRegex =/[^a-zA-Z0-9 ]/g;
    this.view.txtRemarks.text = this.view.txtRemarks.text.replace(alphaNumerRegex, '');
    this.roundAmountField();
 },
    alertPopUp: function(){
  var scope =this;  
  var basicProperties = {
    "message": kony.i18n.getLocalizedString("i18n.HBL.SameBankTransferTransfersPopupError"),
    "alertType": constants.ALERT_TYPE_CONFIRMATION,
    "alertTitle": kony.i18n.getLocalizedString("i18n.fundtransfer.samebank"),
    "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
    "noLabel": "",
    "alertIcon": "",
    "alertHandler": function(response) {
        if (response) {
            scope.flxBackOnClick();
        }
    }
};
var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().CustomAlert(basicProperties, {},custConfig);
},
    };
    
});
