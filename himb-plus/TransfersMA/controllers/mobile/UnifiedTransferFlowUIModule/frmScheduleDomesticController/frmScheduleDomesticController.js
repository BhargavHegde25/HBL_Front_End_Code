define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    dataforFrom:"",
    dataforTo:"",
    transfersFlow:"",
    currencyCodeList:[],
    bankDetails:{},
    segFlag:"",
    currentBalance:"",
    frequencyTypes : {
        ONCE: kony.i18n.getLocalizedString("i18n.transfers.frequency.once"),
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
        try{
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(scope, "CALLBACK", currentForm, scope.flxBackOnClick);
        }catch(err){
        kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    onNavigate: function(uidata){
    try{
    if(kony.sdk.isNullOrUndefined(uidata)){}else{
    if(uidata.domestic){
    this.resetUI();
    }if(uidata.validateAccnumber){
    this.validAccount(uidata.validateAccnumber);
    }if(uidata.payee){
    this.payeeConfirm(uidata.payee);
    }if(uidata.TransferError){
    this.errorResponse(uidata.TransferError);
    }if(uidata.sucessError){
    this.sucessError(uidata.sucessError);
    }if(uidata.showPopup){
        this.showCommonPopup(uidata.showPopup);
    }
    }
    }catch(err){
    kony.print("onNavigate:"+err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
    }
    }, 
    preShow: function () {
        try{
            var scope =this;
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
                this.view.flxMainScroll.top = "70dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "5dp";
            }
    this.addClientProperty();
    this.setTodayDate();
            this.view.calStartDate.onSelection = function() {
                //scope.customDateCount++;
               // scope.view.calEndDate.validStartDate = [scope.view.calStartDate.dateComponents[0], scope.view.calStartDate.dateComponents[1], scope.view.calStartDate.dateComponents[2]];
                scope.onCustomDateChange();
            };
            this.view.calEndDate.onSelection = function() {
               // scope.customDateCount++;
               // scope.view.calStartDate.validEndDate = [scope.view.calEndDate.dateComponents[0], scope.view.calEndDate.dateComponents[1], scope.view.calEndDate.dateComponents[2]];
                scope.onCustomDateChangeEnd();
            };
        }catch(err){
        kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    },

    postShow: function () {
    try{
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.oncancelClick;
        this.view.btnContinue.onClick = this.constructPayload;//this.btnContinueOnClick;
        this.view.lblTxtAccNo.onTextChange = this.restrictRegex;
        this.view.flxChooseAccount.onClick =this.flxFromClick;
        this.view.transferToExistingPayee.onClick= this.flxToClick;
        this.view.segTransactions.onRowClick =this.dataFromSeg;
        this.view.flxBankListContent.onClick = this.bankList;
        //this.view.txtBankName.onTouchStart = this.bankList;
        //this.view.lblTxtAccNo.onTouchEnd = this.accountNumValidate;
       // this.view.btnContinue.skin="sknBtnE2E9F0Rounded";
        this.view.txtAccountholder.onTouchEnd=this.roundAmountField;
        this.view.txtAmount.onTextChange = this.regexNumeric;//this.validateContinueButton;
         this.view.txtAmount.onEndEditing = this.roundAmountField;
        this.view.txtRemarks.onTextChange = this.restrictRemarks; //this.roundAmountField;
        //this.view.txtBankName.onTextChange =this.validateContinueButton;
        this.view.btnCharges.onClick = this.showTransfersFee;
         this.view.flxPopupfrombottoms.onClick = this.closeFlx;
         this.view.imgclose.onTouchStart = this.closeFlx;
         this.flxStartDate();
         this.flxEndDate();
         //this.view.flxFrequency.onClick = this.popupFrequency;
         this.view.flxSpecficDate.onClick =this.popupSpecficDate;
    
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    flxFromClick: function(){
    try{
        var scope =this;
        this.segFlag ="fromToAcc";
        this.dataforFrom = true;
        this.dataforTo = false;
        var transfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });  
        var fromListData = transfMod.getListPayee;
         var defaultFrom = this.view.lblAccountNumber.text;
        fromListData = fromListData[0].filter(item => item.accountID !== defaultFrom);
        if (!kony.sdk.isNullOrUndefined(fromListData)) {
             this.setSegmentData(fromListData);
        }else{}
        var PopupObj={
            "accounts":fromListData,//should br Array of object[{},{},{}...]
            "flowType":"FT_From",
            "rowClickCallback":scope.dataFromSeg.bind(this)
                    };
        applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
        /*this.view.tbxSearch.text ="";
        this.view.tbxSearch.onTextChange = this.fromAccountSearch;
        this.view.flxPopupfrombottoms.setVisibility(true);
        this.view.flxSearch.setVisibility(true);
        this.view.flxSearch.top ="50dp"
        this.view.flxSegContainer.top ="100dp";
        this.view.lblselectaccount.text =kony.i18n.getLocalizedString("kony.mb.cardLess.FromAccount");
        this.view.flxPopupcontainer.height ="45%";
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
        }, //pld{
        "animationEnd": function() {
        this.view.flxPopupfrombottom.isVisible=false;
        }
        }//old);*/
        this.roundAmountField();
    }catch(err){
        kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    flxToClick: function(){
        try{
            var scope =this;
            this.segFlag ="fromToAcc";
            this.dataforFrom = false;
            this.dataforTo = true;
            var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
            });
            var toList =transfMod.getBankDetailsResponse;
            if(toList[0].length>0){
            if(!kony.sdk.isNullOrUndefined(toList)){
            this.setSegmentData(toList[0]);
            }else{}
            var PopupObj={
                "accounts":toList[0],//should br Array of object[{},{},{}...]
                "flowType":"FT_From",
                "rowClickCallback":scope.dataFromSeg.bind(this)
                        };
            applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
           /* this.view.tbxSearch.text ="";
            this.view.tbxSearch.onTextChange = function(){};
            this.view.flxPopupfrombottoms.setVisibility(true);
            this.view.flxSearch.setVisibility(true);
            this.view.flxSearch.top ="50dp"
            this.view.flxSegContainer.top ="100dp";
            this.view.lblselectaccount.text =kony.i18n.getLocalizedString("kony.mb.checkDeposit.toAccount");
            this.view.flxPopupcontainer.height ="45%";
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
            }, //old{
            "animationEnd": function() {
            this.view.flxPopupfrombottom.isVisible=false;
            }
            }//old);*/
            this.roundAmountField();
            }else{
                var msg =kony.i18n.getLocalizedString("kony.mb.P2P.NoPayeesAvailable");
                this.checkForToastMessageError(msg)
            }
        }catch(err){
            kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
     },
    restrictRegex: function(){
        try{
            var alphaNumerRegex =/[^a-zA-Z0-9]/g;
            this.view.lblTxtAccNo.text = this.view.lblTxtAccNo.text.replace(alphaNumerRegex, '');
        }catch(err){
            kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
 },
    bankList: function(){
    try{
        var scope =this;
    var transferMod = applicationManager.getModulesPresentationController({
                    'appName': 'TransfersMA',
                    'moduleName': 'ManageActivitiesUIModule'
                });
    //this.view.flxBankListContentValue.enable =false;
    var banklist=  transferMod.bankListDetails[0];
    this.view.tbxSearch.text ="";
    this.view.tbxSearch.onTextChange = this.searchBank;
    if(banklist.length>0){
    this.segFlag ="banklist";
    //this.setBankListSegData(banklist); 
    }
    //this.view.txtBankName.enable =false;
    var bankNameArr=[]
    for(var i=0;i<banklist.length;i++){
    bankNameArr.push(
    {"bankName":banklist[i].bankName}
        )
    }
    var obj={"title":kony.i18n.getLocalizedString("i18n.transfers.bankName"),"key":"bankName","Segdata":bankNameArr,"rowClickCallback":scope.dataFromSeg.bind(scope),"size":"70%"}
	applicationManager.getDataProcessorUtility().ShowdropdownSelectionPopup(scope,obj);
   /* this.view.flxPopupfrombottoms.setVisibility(true);
    this.view.flxSearch.setVisibility(true);
    this.view.flxSearch.top ="45dp"
    this.view.flxSegContainer.top ="100dp";
    this.view.lblselectaccount.text =kony.i18n.getLocalizedString("i18n.transfers.bankName");
    this.view.flxPopupcontainer.height ="70%";
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
    );*/
    this.roundAmountField();       
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
    payeeConfirm: function(payee){
    try{
    var scope= this;
    var navManager = applicationManager.getNavigationManager();
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var dates = transferMod.presentationController.getBankDatees[0].currentWorkingDate;
    var currentDate = new Date(dates).toISOString();
    var amount =Number(this.view.txtAmount.text);
    var convertAmount = amount.toFixed(2);
    var wholeAmount =convertAmount.split(".")[0];
    var decimalAmount = convertAmount.split(".")[1];
    applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmScheduleDomestic");
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
    dataFromSeg: function(seg){
    var scope =this;
    try{
    if(this.segFlag == "fees"){
    var segData =scope.view.segTransactions.selectedRowItems[0];
    }else{
    var segData = seg[0];
    }
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
        if(this.segFlag =="fromToAcc"){
    transfMod.transfersFlow = segData.lblAccname.info;
    if(this.dataforFrom){
    scope.view.lblAccountName.text=segData.lblAccname.text;
    scope.view.lblAccountNumber.text=segData.lblAccNumber;
    scope.view.lblAccountType.text=segData.lblAccType.text;
    scope.view.lblBalance.text=segData.lblBalance.text;
    scope.view.lblCurrencyValue.text=segData.lblBalance.text.slice("",3);
     var res=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
     for(var i=0;i<res.length;i++){
    if(res[i].accountID == segData.lblAccNumber){
        this.currentBalance = res[i].currentBalance;
    }
    }
    this.dataforFrom= false;
    }else{
    this.bankDetails={
    "bankCode":segData.lblAccname.info,
    "bankName":segData.lblBalance.info,
    "swiftCode":segData.lblAccType.info
    }; 
    scope.view.lblBankListSelect.text =segData.lblBalance.info;
    scope.view.txtAccountholder.text = segData.lblAccname.text;
    scope.view.lblTxtAccNo.text = segData.lblAccNumber;
    this.dataforTo = false;
    }
    }
    else if(this.segFlag =="banklist"){
        var transferMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
        });
    var banklist = transferMod.bankListDetails[0];
    transfMod.transfersFlow ="domestic";
    this.view.lblBankListSelect.text =segData.lblValue;
    for(i=0;i<banklist.length;i++){
    if(banklist[i].bankName === segData.lblValue){
    this.bankDetails={
    "bankCode":banklist[i].bankCode,
    "bankName":banklist[i].bankName,
    "swiftCode":banklist[i].bankSwift
    }; 
    }
    }
    // this.view.txtBankName.enable =true
    }else if(this.segFlag =="Frequency"){
        this.view.lblFrequencySelect.text =segData.lblValue;
        this.validateScheduleFlx(segData.lblValue);
        }else if(this.segFlag =="Period"){
        //this.view.lblSpecficLong.text =segData.lblValue; 
        this.validatePeriodFlx(segData.lblValue);
        }
    else{}
     if(this.segFlag == "fees" ){
    scope.view.flxPopupfrombottoms.setVisibility(false);
     }else{
    scope.view.flxPopupfrombottom.setVisibility(false);
     }
    // scope.view.flxBankListContentValue.enable =true;
    }
    catch(err){
    kony.print("dataFromSeg:"+ err);
    }
    },
    flxBackOnClick : function () {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    transferMod.presentationController.backToVerifyScreen();
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
    try{
    var scope= this;
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
    //var dates = transferMod.presentationController.getBankDatees[0].currentWorkingDate;
    //var currentDate = new Date(dates).toISOString();
    var amount =Number(this.view.txtAmount.text);
    var avBalance = this.currentBalance;
    var availableBalance = Number(avBalance);
    var convertAmount = amount.toFixed(2);
    var wholeAmount =convertAmount.split(".")[0];
    var decimalAmount = convertAmount.split(".")[1]; 
    var feesObj =  transfMod.feeObj
    var feesCalculate = this.calculateFee(feesObj,wholeAmount);
    var fees = Number(feesCalculate);
    var ttAmount = (amount+ fees).toFixed(2);
    navManager.setCustomInfo("errorScenario","frmScheduleDomestic");
    if(amount<availableBalance){
    var payloadData2 ={
    "fromAccCurrency":(scope.view.lblBalance.text).slice("",3),
    "fromAccName": scope.view.lblAccountName.text,
    "fromAccNumber":scope.view.lblAccountNumber.text,
    "bankName": kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue"),
    "toAccNumber": scope.view.lblTxtAccNo.text,
    "toAccName": scope.view.txtAccountholder.text,
    "totalamount":convertAmount,
    "amount":wholeAmount,
    "decimal":decimalAmount,
    "currencyCode": scope.view.lblCurrencyValue.text,
    "remark":scope.view.txtRemarks.text,
    "toBankName":scope.view.lblBankListSelect.text,
    "bankCode":this.bankDetails.bankCode,
    "bankSwift":this.bankDetails.swiftCode,
    "numberOfRecurrences":this.responseKeys.numberOfRecurrences,
    "frequencyEndDate":this.responseKeys.frequencyEndDate,
    "frequencyStartDate":this.responseKeys.frequencyStartDate,
    "frequencyType":this.responseKeys.frequencyType
    };
    applicationManager.getNavigationManager().setCustomInfo("payloadData2",payloadData2);
    var payloadData={
    "Fees": applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(feesCalculate,this.view.lblCurrencyValue.text),
    "Total Amount":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(ttAmount,this.view.lblCurrencyValue.text),
    "Remarks":this.view.txtRemarks.text,
    "frequencyStartDate":this.responseKeys.frequencyStartDate,
    };
    applicationManager.getNavigationManager().setCustomInfo("payloadData",payloadData);
    var request ={
    "accountId":this.view.lblTxtAccNo.text,
    "bankId":this.bankDetails.bankCode,
    "accountName":this.view.txtAccountholder.text
    };
    transferMod.presentationController.validateOtherBank(request);
    }else{
    applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.mb.FD.lessAvlBalErrMsg"));
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    scope.view.forceLayout();
    }catch(err){
    kony.print("btnContinueOnClick:"+ err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
   applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },

    validateAmountRange : function () {
    var pan = this.view.lblTxtAccNo.text;
    if(kony.isNullOrUndefined(pan)){}else{
        this.enableOrDisableBtnContinue();
    }
    },

    checkForToastMessageError: function (msg) {
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
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
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
    var transferType =transfMod.transferFlow; 
    }catch(e){
    kony.print("****************Erron in setUI**************"+e);
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
    }
    },

    setSegmentData:function(accounts){
    try{
    var scope=this;
    scope.view.segTransactions.rowTemplate="flxAccRow";
    scope.view.segTransactions.widgetDataMap={
    "lblAccName":"lblAccName",
    "lblBalamce":"lblBalamce",
    "lblAccNumber":"lblAccNumber",
    "lblAccType":"lblAccType",
    "flxRow":"flxRow"
    };
    //  var segData=[];
    var data=[];
    if(accounts.length > 0){
    for(i=0;i<accounts.length;i++){
    if(accounts[i].accountName){
    var rowdata={};
    data.push({
    "lblAccName":{"text":JSON.parse(accounts[i].accountHolder).fullname,"isVisible":true,"info":accounts[i].transferFlow},
    "lblBalamce":{"text":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance, accounts[i].currencyCode),"isVisible":true},
    "lblAccNumber":{"text":accounts[i].accountID,"isVisible":true,"info":accounts[i].currentBalance},
    "lblAccType":{"text":accounts[i].productId,"isVisible":true},
    "flxRow":{"isVisible":true}
    })
    /*rowdata.lblField4=accounts[i].accountType;
    rowdata.lblField3=accounts[i].accountID;
    rowdata.lblField1= JSON.parse(accounts[i].accountHolder).fullname;
    rowdata.lblField2=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance,accounts[i].currencyCode);
    rowdata.flxRow={"isVisible":true};
    segData.push(data)*/
    }else{
    data.push({
    "lblAccName":{"text":accounts[i].beneficiaryName,"isVisible":true,"info":accounts[i].IBAN},
    "lblAccNumber":{"text":accounts[i].accountNumber,"isVisible":true}, 
    "lblBalamce":{"isVisible":false,"info":accounts[i].bankName},
    "lblAccType":{"isVisible":false,"info":accounts[i].swiftCode},
    "flxRow":{"isVisible":true}
    }) 
    }
    }
    scope.view.segTransactions.setData(data);
    }else{
    var msg = kony.i18n.getLocalizedString("kony.mb.P2P.NoPayeesAvailable");
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);    
    }
    this.roundAmountField();
    scope.view.forceLayout();

    }catch(e){
    kony.print("****************Erron in setSegmentData**************"+e);
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
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
    showTransfersFee: function(){
    try{
    var scope= this;
    this.segFlag ="fees";
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        });
    var chargers = transfMod.feeObj;    
    scope.view.segTransactions.rowTemplate="flxFees";
    scope.view.segTransactions.sectionHeaderTemplate ="flxFeesHeader";
    var combinedArr =[];
    scope.view.segTransactions.widgetDataMap={
    "lblLimits":"lblLimits",
    "lblLimitsCharges":"lblLimitsCharges",
    "lblTypeName":"lblTypeName",
    "lblTypeValue": "lblTypeValue",
    "flxSeparator":"flxSeparator",
    "flxFessCharge":"flxFessCharge"
    };
    var data =[];
    var sectionHeader =[];
    sectionHeader.push({
    "lblTypeName": {"text":kony.i18n.getLocalizedString("konymb.fundtransfer.maxFeeAmount"),"isVisible":true},
    "lblTypeValue":{"text":kony.i18n.getLocalizedString("konymb.fundtransfer.maxCharges"),"isVisible": true}
    })
    for(var i=0; i<chargers.length;i++){
    data.push({
    "lblLimits":{"text":chargers[i].maxRange,"isVisible":true},
    "lblLimitsCharges":{"text":chargers[i].feeValue,"isVisible":true},
    "flxFessCharge":{"isVisible":true}
    })
    }
    sectionHeader.push(data);
    combinedArr.push(sectionHeader);
    scope.view.segTransactions.setData(combinedArr);
    scope.view.flxPopupfrombottoms.setVisibility(true);
    this.view.flxSearch.setVisibility(false);
    this.view.flxSegContainer.top ="50dp";
    scope.view.lblselectaccount.text ="Charges Slab";
    scope.view.flxPopupcontainer.animate(kony.ui.createAnimation({
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
    }*/);
    }catch(err){
    kony.print("showTransfersFee:"+err);
    }

    },
    formatAmount:function(amount){
    //var formatedAmount=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount,"NPR");
    //return formatedAmount;

    },
    validateContinueButton: function(){
    try{
   if (
    this.isValid(this.view.lblTxtAccNo.text) &&
    this.isValid(this.view.txtAccountholder.text) &&
    this.isValid(this.view.txtAmount.text) &&
    this.isValid(this.view.txtRemarks.text) &&
    this.isValid(this.view.lblBankListSelect.text)
) {
    this.view.btnContinue.setEnabled(true);
   this.view.btnContinue.skin="sknHBLBtn851a1cRounded8pxffffff100pr";
} else {
     this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin="sknHBLBtnf4f5f8Rounded8pxffffff100pr"; 
}
    }catch(err){
    kony.print("validateContinueButton:" + err);
    }
    },
    isValid: function(value) {
    return (
        !kony.sdk.isNullOrUndefined(value) &&
        value.trim() !== ""
    );
},
roundAmountField: function(){
    try{
        var tbxAmount = this.view.txtAmount.text;
        if(tbxAmount !=""){
        this.view.txtAmount.text = parseFloat(tbxAmount).toFixed(2);
        this.validateContinueButton();
        }else{
        this.validateContinueButton();
        }
    }catch(err){
    kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    validAccount: function(accounts){
    try{
    var data= accounts;
    scope.view.txtAccountholder.text = data.beneficiaryName;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){kony.print("validAccount:"+ err )}
    },
      resetUI:function(){
            try{
        var scope= this;
        var account;
        var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
        var transfMod = applicationManager.getModulesPresentationController({
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
        this.view.lblBankListSelect.text =accDatas.bankName;
        this.view.transferToExistingPayee.enable =false;
        this.view.flxToAccount.enable=false;
        this.view.flxToAccName.enable=false;
        this.view.flxBankListContent.enable =false;
        }else{
            this.view.lblTxtAccNo.text="";
            this.view.txtAccountholder.text="";
            this.view.txtAmount.text ="";
            this.view.txtRemarks.text ="";
            this.view.lblBankListSelect.text ="";
            this.view.transferToExistingPayee.enable =true;
        this.view.flxToAccount.enable=true;
        this.view.flxToAccName.enable=true;
        this.view.flxBankListContent.enable =true;
        }
        }else{
         this.view.lblTxtAccNo.text="";
        this.view.txtAccountholder.text="";
        this.view.txtAmount.text ="";
        this.view.txtRemarks.text ="";
        this.view.lblBankListSelect.text ="";
        this.view.transferToExistingPayee.enable =true;
        this.view.flxToAccount.enable=true;
        this.view.flxToAccName.enable=true;
        this.view.flxBankListContent.enable =true;
        }
        if(account){
    scope.view.lblAccountName.text=account.accountHolder.fullname;
    scope.view.lblAccountNumber.text=account.accountID;
    scope.view.lblAccountType.text=account.productId;
    scope.view.lblBalance.text=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(account.availableBalance,account.currencyCode);
    scope.view.lblCurrencyValue.text=account.currencyCode;
    }
    else{
    //var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
    var accounts = transferMod.presentationController.getListPayee[0];
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
    scope.view.lblCurrencyValue.text=="NPR"?this.view.flxcurrencyrightarrow.setVisibility(false):this.view.flxcurrencyrightarrow.setVisibility(true)
    scope.currentBalance = accounts[0].currentBalance
    }else{
    scope.view.lblAccountName.text=JSON.parse(defaultAccountData[0].accountHolder).fullname;
    scope.view.lblAccountNumber.text=defaultAccountData[0].accountID;
    scope.view.lblAccountType.text=defaultAccountData[0].productId;
    scope.view.lblBalance.text=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(defaultAccountData[0].availableBalance,defaultAccountData[0].currencyCode);
    scope.view.lblCurrencyValue.text=defaultAccountData[0].currencyCode;
    scope.view.lblCurrencyValue.text=="NPR"?scope.view.flxcurrencyrightarrow.setVisibility(false):scope.view.flxcurrencyrightarrow.setVisibility(true)
    scope.currentBalance = defaultAccountData[0].currentBalance;
    }
    }
            }catch(err){
                kony.print("resetUI:"+err);
            }
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
    }else{
    applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    calculateFee: function(feeObj,amount){
    amount = amount.split(".")[0];
    amount = Number(amount);
    for (i = 0; i < feeObj.length; i++) {
    if (amount >= feeObj[i].minRange && amount <= feeObj[i].maxRange) {
    return feeObj[i].feeValue;
    }
    }
    },
    fromAccountSearch: function(){
        try{
            var transferMod = applicationManager.getModulesPresentationController({
                'appName': 'TransfersMA',
                'moduleName': 'ManageActivitiesUIModule'
            });
 var fromListData = transfMod.getListPayee;
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
    closeFlx: function(){
    // this.view.flxBankListContentValue.enable =true;
    // this.view.txtBankName.enable =true;
     this.view.flxPopupfrombottoms.setVisibility(false);
    },
    addClientProperty: function(){
        try{
            var CommonUtilities = require('CommonUtilities');
            var clientProperties = CommonUtilities.CLIENT_PROPERTIES;
            var tbxInput = JSON.parse(clientProperties.FT_DOMESTIC_INPUT_CONFIG);
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
    restrictRemarks: function(){
    var alphaNumerRegex =/[^a-zA-Z0-9 ]/g;
    this.view.txtRemarks.text = this.view.txtRemarks.text.replace(alphaNumerRegex, '');
    this.roundAmountField();
    },
    alertPopUp: function(){
        try{
            var scope =this;  
            var basicProperties = {
              "message": kony.i18n.getLocalizedString("i18n.HBL.SameBankTransferTransfersPopupError"),
              "alertType": constants.ALERT_TYPE_CONFIRMATION,
              "alertTitle": kony.i18n.getLocalizedString("i18n.fundtransfer.domesticbank"),
              "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Yes"),
              "noLabel": "",
              "alertIcon": "",
              "alertHandler": function(response) {
                  if (response) {
                      scope.flxBackOnClick();
                  }
              }
          };
          applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
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
    var datee =transferMod.presentationController.getBankDatees[0].nextWorkingDate;
    var formatUtility = applicationManager.getFormatUtilManager();
    var todaysDate =formatUtility.getFormattedCalendarDate(datee);
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
   // var startDate = new Date(scope.view.calStartDate.dateComponents[2], scope.view.calStartDate.dateComponents[1] - 1, scope.view.calStartDate.dateComponents[0]);
    //scope.view.lblSendOnvalue.text =new Date(startDate).toISOString();
    //
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
    
    var currentDate = new Date(datee);
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
    scope.view.forceLayout();  
    }catch(err){
    kony.print("err:"+err);
    }
},  
validateScheduleFlx: function(segData){
    try{
     if(segData ===kony.i18n.getLocalizedString("i18n.transfers.frequency.once")){
        this.view.flxSpecficDate.setVisibility(false);
        this.view.flxSendOn.setVisibility(true);
        this.view.lblSendOn.text =kony.i18n.getLocalizedString("i18n.ConfirmEur.SendOn");
        this.view.flxSendEnd.setVisibility(false);
        this.view.flxRecurrence.setVisibility(false);
    }   
    //this.validatePeriodFlx()
    }catch(err){
    kony.print("err:"+err);
    }
},
validatePeriodFlx: function(segData){
    try{
    var scope =this;
     var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var datee =transferMod.presentationController.getBankDatees[0].currentWorkingDate
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
                scope.responseKeys.frequencyStartDate = (scope.view.calStartDate.date);
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
        try{
            var [day, month, year] = input.split('/').map(Number);
            var ac = new Date(Date.UTC(year, month - 1, day)).toISOString();
            return ac;
        }catch(err){
            kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    },
    showCommonPopup: function(errMsg){
        var scope =this;
        var navManager = applicationManager.getNavigationManager();
      var presentationUtility=applicationManager.getPresentationUtility();
      if(kony.sdk.isNullOrUndefined(errMsg.serverErrorRes)){
        var error = errMsg;
        }else{
        var error = errMsg.serverErrorRes;
        }
      applicationManager.getNavigationManager().setCustomInfo("errNavigate",error);
        if(!kony.sdk.isNullOrUndefined(error)){
        if(error['validateOtherBankAccount'][0].matchPercentage >=60){
            var basicConfig = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": kony.i18n.getLocalizedString("i18n.payments.warning"),
                "message": error['validateOtherBankAccount'][0].responseMessage,
                "alertHandler": scope.alertCallbacks.bind(scope),
                "yesLabel": kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes"),
                "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
              };
              var pspConfig = {};
              var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
              presentationUtility.Alert(basicConfig, pspConfig, {}); 
        }else{
            applicationManager.getDataProcessorUtility().showToastMessageError(scope, errMsg.errorMessage);
        }
      } else{
        applicationManager.getDataProcessorUtility().showToastMessageError(scope, errMsg.errorMessage);
      }
    },
    alertCallbacks: function(res){
        var navManager =applicationManager.getNavigationManager();
        if(res){
           var errs= navManager.getCustomInfo("errNavigate");
           navManager.navigateTo({"appName": "TransfersMA","friendlyName": "UnifiedTransferFlowUIModule/frmScheduleConfirm"},false,{"domesticSuccess":errs});
        }else{}
    },
    };
    });
