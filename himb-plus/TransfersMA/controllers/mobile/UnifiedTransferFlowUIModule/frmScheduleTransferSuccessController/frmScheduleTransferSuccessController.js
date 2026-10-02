define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
    init: function () {
        try{
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
        }catch(err){
            kony.print("err"+err);
        }
    },
    onNavigate: function(uidata){
        try{
            if(uidata.transferSuccess){
                this.getResponseData(uidata.transferSuccess);
                }
                if(uidata.TransferError){
                this.errorResponse(uidata.TransferError);
                }
        }catch(err){
            kony.print("err"+err);
        }
    },

        preShow: function () {
            try{
                if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                    this.view.flxHeader.isVisible = true;
                    this.view.flxMainScroll.top = "56dp";
                }
                else {
                    this.view.flxHeader.isVisible = false;
                      this.view.flxMainScroll.top = "10dp";
                }
                var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
                var transFlow = transferMod.transfersFlow;
                this.view.postShow = this.postShow;
            }catch(err){
                kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
            }
        },

    postShow: function () {
        try{
            this.view.btnPrimary.onClick = this.btnPrimaryOnclick;
            this.view.btnSecondary1.onClick = this.navToManageActivity;
            this.view.btnSecondary.onClick = this.btnSecondaryOnclick;
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }catch(err){
            kony.print("err"+err);
            applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    },

    btnSecondaryOnclick: function () {
    try{
    applicationManager.getPresentationUtility().showLoadingScreen();
        var navMan = applicationManager.getNavigationManager();
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
     var transfMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        }); 
    var transf = transfMod.transferFlow;
    if(transf =="sameBank"){ 
        transfMod.transferFlow ="sameBank";
        transfMod.addpayeeFlow ="addSameBank";
        transfMod.transferAutoPopulated =true;
        transferMod.presentationController.getList();
    }else{
        transfMod.transferFlow ="domesticBank";
        transfMod.addpayeeFlow ="addSameBank";
        transfMod.transferAutoPopulated =true;
        transferMod.presentationController.getList();
    }
    }catch(err){
    kony.print("btnSecondaryOnclick:"+err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },

    btnPrimaryOnclick: function () {
     var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    transferMod.presentationController.onCancelClick();   
    },


    flxBackOnClick: function () {

    },
    getResponseData: function(response){
    try{
    var res = response;
    var transferMod = applicationManager.getModulesPresentationController({
            'appName': 'TransfersMA',
            'moduleName': 'ManageActivitiesUIModule'
        }); 
    this.setFromToData(response);
    if(transferMod.transferFlow == "domesticBank"){
    this.compareSegmentData(response);
    }else{
    this.compareAccSegmentData(response);
    }
    //this.setSegmentData(response);
    }catch(err){
    kony.print("getResponseData:"+err)
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    setFromToData: function(response){
    try{
       var transferMod = applicationManager.getModulesPresentationController({
                    'appName': 'TransfersMA',
                    'moduleName': 'ManageActivitiesUIModule'
                });
    var toList =transferMod.getBankDetailsResponse;
    var fromToData = applicationManager.getNavigationManager().getCustomInfo("payloadData2");
    if(transferMod.transferFlow == "domesticBank"){
        var maskedFrom = `XXX XXXXXXX ${(fromToData.fromAccNumber).slice(-4)}`;
    var maskedTo = `XXX XXXXXXX ${(fromToData.toAccNumber).slice(-4)}`;
    }else{
    var maskedFrom = `XXX XXXXXXX ${(response.fromAccountNumber).slice(-4)}`;
    var maskedTo = `XXX XXXXXXX ${(response.toAccountNumber).slice(-4)}`;
    }
     this.view.lblFromAccountName.text =fromToData.fromAccName;
    this.view.lblFromAccountNumber.text = maskedFrom;
    this.view.lblToAccountName.text =fromToData.toAccName;
    this.view.lblToAccountNumber.text=maskedTo;
    this.view.lblCurrency.text = fromToData.currencyCode;
    this.view.lblWholeAmount.text =fromToData.amount;
    this.view.lblDecimal.text= "."+fromToData.decimal;
    this.view.lblSuccessMessage.text = response.message;
    for(var i=0;i<toList.length;i++){
    if(toList[i].accountID == response.toAccountNumber){
      this.view.btnSecondary.setVisibility(false);
      this.view.btnSecondary1.setVisibility(true);
      return;
    }else{
    this.view.btnSecondary.setVisibility(true);
    this.view.btnSecondary1.setVisibility(false);
    }
    }
    }catch(err){
    kony.print("setFromToData:"+err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    compareSegmentData: function(response){
    try{
        var scope = this;
    var compareRes = response;
    scope.view.segTransferDetails.rowTemplate="flxSegTransferNew";
    scope.view.segTransferDetails.widgetDataMap={
    "lblKey":"lblKey",
    "lblValue":"lblValue",
    "lblLineSeperator":"lblLineSeperator",
    "flxSegTransferNew":"flxSegTransferNew"
    };
    var dateFormat = this.formatDate(response);
    var chrge = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(response.charges,response.currency);
    var ttAmount = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(response.totalAmount,response.currency);// correct this
    var payload =[];
    if(response.referenceId){
		payload.push({"lblKey":"i18n.konybb.common.ReferenceId","lblValue":response.referenceId})
	}
    if(chrge){
         payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.feecolon"),"lblValue":chrge})
    }
	if(ttAmount){
		payload.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.achtransactionsdetail.TotalAmount"),"lblValue":ttAmount})
	}
	if(response.transactionsNotes){
		payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.hbl.mb.remarks"),"lblValue":response.transactionsNotes})
	}if(response.frequencyType){
		payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.transfers.lblFrequency"),"lblValue":response.frequencyType})
	}if(response.frequencyEndDate){
		payload.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.Transfers.EndDate"),"lblValue":this.formattedDate(response.frequencyEndDate)})
	}if(response.numberOfRecurrences){
        payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.accounts.recurrence"),"lblValue":response.numberOfRecurrences})  
    }
    scope.view.segTransferDetails.setData(payload);
    //this.setSegmentData(segPayload);
    }catch(err){
    kony.print("compareSegmentData:"+err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    compareAccSegmentData: function(response){
    try{
    var compareRes = response;
    var dateFormat = this.formatDate(response);
    var ttAmount = response.transactionCurrency +" "+response.totalAmount;
    
    //old code
    var segPayload = {
    "Reference ID":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.referenceId)?response.referenceId:"NA"),
    "Fee":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.charges)?response.charges:"NA"),
    "Total Amount":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(ttAmount)?ttAmount:"NA"),
    "Exchange Rate":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.exchangeRate)?response.exchangeRate:"NA"),
    "Remarks": (!kony.sdk.util.isNullOrUndefinedOrEmptyObject(response.transactionsNotes)?response.transactionsNotes:""),
    "Date & Time":(!kony.sdk.util.isNullOrUndefinedOrEmptyObject(dateFormat)?dateFormat:"")
    };
    // old code
    this.setSegmentData(segPayload);
    }catch(err){
    kony.print("compareSegmentData:"+err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    setSegmentData: function(data){
    try{
    var scope=this;
    var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var transferType =transferMod.transferFlow;
    scope.view.segTransferDetails.rowTemplate="flxSegTransferNew";
    scope.view.segTransferDetails.widgetDataMap={
    "lblKey":"lblKey",
    "lblValue":"lblValue",
    "lblLineSeperator":"lblLineSeperator",
    "flxSegTransferNew":"flxSegTransferNew"
    };
    var payload =[]
    if(Object.keys(data).length > 0){
    for(i=0;i<Object.keys(data).length;i++){
    var rowdata={};
    payload.push({
    "lblKey":{"text":Object.keys(data)[i],"isVisible":true},
    "lblValue":{"text":Object.values(data)[i],"isVisible":true},
    "lblLineSeperator":{"isVisible":true},
    "flxSegTransferNew":{"isVisible":true}
    })
    /*rowdata.lblField4=accounts[i].accountType;
    rowdata.lblField3=accounts[i].accountID;
    rowdata.lblField1= JSON.parse(accounts[i].accountHolder).fullname;
    rowdata.lblField2=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance,accounts[i].currencyCode);
    rowdata.flxRow={"isVisible":true};
    segData.push(data)*/
    }
    }
    scope.view.segTransferDetails.setData(payload);
    }catch(err){
    kony.print("setSegmentData:" + err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    formatDate: function(response){
    try{
    var isoDate = response.scheduledDate;
    var date = new Date(isoDate);
    date.setUTCHours(11, 20, 0, 0);
    var options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
    }catch(err){
    kony.print("formatDate:" + err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    navToManageActivity: function(){
    try{
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
                    navMan.setCustomInfo("removeAttachments", true);
                    //var transMod = applicationManager.getModulesPresentationController("TransactionModule");
                    var moneyMovementModule = applicationManager.getModulesPresentationController({
                        "moduleName": "MoneyMovementUIModule",
                        "appName": "TransfersMA"
                    });
                    moneyMovementModule.clearMMFlowAtributes();
                    navMan.setEntryPoint("centralmoneymovement", "frmTransferActivitiesTransfers");
                    navMan.navigateTo({
                        "appName": "TransfersMA",
                        "friendlyName": "MoneyMovementUIModule/frmTransferActivitiesTransfers"
                    });
    }catch(err){
    kony.print("navToManageActivity:"+err);
    applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
    },
    errorResponse: function(err){
    try{

    }catch(err){
    kony.print("errorResponse:"+err);
    }
    },
    formattedDate: function(datestring){
        var date = new Date(datestring);
    var formatted = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;
    return formatted;
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
