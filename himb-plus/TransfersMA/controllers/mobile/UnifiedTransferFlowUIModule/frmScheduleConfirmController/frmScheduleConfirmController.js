define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    chargers ="";
    refId ="";
    totalAmount ="";
    amountfield="";
   enableTransferFlag="";
   toaccountCurrency="";
   exchangeRate="";
   return {
   init: function () {
    try{
        var scope = this;
        var currentFormObject = kony.application.getCurrentForm();
        var currentForm = currentFormObject.id;
        applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.flxBackOnClick);
    }catch(err){
        kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
   },
   onNavigate: function(uiData){
   try{
   if(uiData.validPayload){
   this.enableTransferFlag =true;
   this.chargers = uiData.validPayload.charges;
   this.refId = uiData.validPayload.referenceId;
   this.totalAmount = uiData.validPayload.totalAmount;
   this.amountfield = uiData.validPayload.convertedAmount;
   this.exchangeRate = uiData.validPayload.exchangeRate;
       //  this.setSegmentData(uiData.payloadData);
   }if(uiData.domesticSuccess){
   this.enableTransferFlag =false;
   this.toaccountCurrency = uiData.domesticSuccess.currency;
   //this.domesticPayment(uiData.domesticSuccess);
   }if(uiData.TransferError){
       this.errorResponse(uiData.TransferError);
   }if(uiData.sucessError){
           this.sucessError(uiData.sucessError);
         }
   }catch(err){
       kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
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
        this.view.postShow = this.postShow;
        this.setFromToData();
        if(this.enableTransferFlag){
        this.setSegmentData();
        this.view.btnPrimary.setVisibility(true);
         this.view.btnPrimary1.setVisibility(false);
        }else{
         this.setDomesticSegData();
         this.view.btnPrimary.setVisibility(false);
         this.view.btnPrimary1.setVisibility(true);   
        }
    }catch(err){
        kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
   },
   postShow: function () {
    try{
        this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
        this.view.customHeader.btnRight.onClick = this.flxCancelClick;
        this.view.btnPrimary.onClick = this.btnPrimaryOnclick;
         this.view.btnPrimary1.onClick = this.btnPrimary1OnClick;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    }catch(err){
        kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
   },
   setFromToData: function(){
   try{
   var fromToData = applicationManager.getNavigationManager().getCustomInfo("payloadData2");
   this.view.lblFromAccountName.text =fromToData.fromAccName;
   this.view.lblFromAccountNumber.text =fromToData.fromAccNumber;      
   this.view.lblFromBankName.text =fromToData.bankName;
   this.view.lblToAccountName.text =fromToData.toAccName;
   this.view.lblToAccountNumber.text =fromToData.toAccNumber;
   this.view.lblToBankName.text =fromToData.toBankName;
   this.view.lblCurrency.text = fromToData.currencyCode;
   this.view.lblWholeNumber.text =fromToData.amount;
   this.view.lblDecimal.text= "."+fromToData.decimal;
   }catch(err){
   kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
   }
   },
   btnPrimaryOnclick: function () {
   try{
   applicationManager.getPresentationUtility().showLoadingScreen();
   var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
       var transfMod = applicationManager.getModulesPresentationController({
           'appName': 'TransfersMA',
           'moduleName': 'ManageActivitiesUIModule'
       });
        var transerfMod = applicationManager.getModulesPresentationController({
       'appName': 'TransfersMA',
       'moduleName': 'MoneyMovementUIModule'
       });
       transerfMod.externalPayee =[];
   var date = transferMod.presentationController.getBankDatees[0].currentWorkingDate;
   var currentDate = new Date(date).toISOString();
   applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmScheduleConfirm");
   var fromToData = applicationManager.getNavigationManager().getCustomInfo("payloadData2");
   var serviceDetails = (transfMod.transfersFlow =="intra")?"INTRA_BANK_FUND_TRANSFER_CREATE":"TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE";
   var commonPayload = {
   "amount": this.totalAmount,
   "transactionId": this.refId,
   "frequencyType": fromToData.responseKey.frequencyType,
   "fromAccountNumber": fromToData.fromAccNumber,
   "iban": "",
   "isScheduled": "1",
   "frequencyStartDate": fromToData.responseKey.frequencyStartDate,
   "frequencyEndDate":fromToData.responseKey.frequencyEndDate,
   "scheduledDate": fromToData.responseKey.frequencyStartDate,
   "numberOfRecurrences": fromToData.responseKey.numberOfRecurrences,
   "paymentType": "",
   "paidBy": "",
   "swiftCode": "",
   "transactionCurrency":  fromToData.currencyCode,
   "fromAccountCurrency": fromToData.fromAccCurrency,
   "toAccountCurrency": fromToData.toAccCurrency,
   "toAccountNumber":fromToData.toAccNumber,
   "charges":chargers,
   "beneficiaryName":  fromToData.toAccName,
   "uploadedattachments": "",
   "clearingCode": "",
   "intermediaryBicCode": "",
   "e2eReference": "",
   "exchangeRate": "",
   "totalAmount": fromToData.totalamount,
   "transactionAmount":fromToData.totalamount,
   "userId": "",
   "deletedDocuments": "",
   "serviceName":serviceDetails,
   "beneficiaryNickname":"",
   "transactionsNotes": fromToData.remark,
   "createWithPaymentId": "true"
   }; 
   if(transfMod.transfersFlow == "intra"){
   var intraPayload ={
   "ExternalAccountNumber": fromToData.toAccNumber,
   "transactionType":"ExternalTransfer",
   "beneficiaryAddressLine1": "",
   "beneficiaryAddressLine2": "",
   "beneficiarycountry": "",
   "beneficiaryState": "",
   "beneficiaryCity": "",
   "beneficiaryZipcode": "",
   "beneficiaryPhone": "",
   "beneficiaryEmail": ""
   };
   var payload ={...commonPayload, ...intraPayload};
   transferMod.presentationController.intraBankTransfer(payload); 
   }else{
   var ownAccPayload ={
   "transactionType":"InternalTransfer",
   }; 
   var payloads ={...commonPayload, ...ownAccPayload};
   transferMod.presentationController.ownAccountTransfer(payloads);
   }
    //old code
   }catch(err){
   kony.print("btnPrimaryOnclick:"+err);
   applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
   applicationManager.getPresentationUtility().dismissLoadingScreen();
   }   
   },
   btnPrimary1OnClick: function(){
   try{
   applicationManager.getPresentationUtility().showLoadingScreen();
   var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
    var transfMod = applicationManager.getModulesPresentationController({
        'appName': 'TransfersMA',
        'moduleName': 'ManageActivitiesUIModule'
    });
    var transerfMod = applicationManager.getModulesPresentationController({
    'appName': 'TransfersMA',
    'moduleName': 'MoneyMovementUIModule'
    });
    transerfMod.externalPayee =[];
    applicationManager.getNavigationManager().setCustomInfo("errorScenario","frmScheduleConfirm");
   var fromToData = applicationManager.getNavigationManager().getCustomInfo("payloadData2");
   var stDate = this.formatDateToISO(fromToData.frequencyStartDate);
   var edDate =  this.formatDateToISO(fromToData.frequencyEndDate);
 //var currentDate = new Date(date).toISOString();
   var feesObj =  kony.sdk.isNullOrUndefined(transfMod.feeObj)?"0.00":transfMod.feeObj;
   var amount =fromToData.totalamount;
   var feesCalculate = (!kony.sdk.isNullOrUndefined(feesObj =="0.00")?this.calculateFee(feesObj,amount):"0.00");
   var nAmount =Number(amount);
   var nFees =Number(feesCalculate);
   var ttAmount = (nAmount+nFees).toFixed(2);
   var payload =  {
   "amount": ttAmount,
   "currency": fromToData.currencyCode,
   "debtorAgent": "0701",
   "debtorBranch": "1",
   "debtorName":fromToData.fromAccName,
   "debtorAccount": fromToData.fromAccNumber,
   "creditorAgent": fromToData.bankCode,
   "beneficiaryBankName": fromToData.bankName,
   "creditorBranch": "1",
   "creditorName": fromToData.toAccName,
   "creditorAccount": fromToData.toAccNumber,
   "serviceCharge": feesCalculate,
   "bankId": fromToData.bankCode,
   "feeCurrency": fromToData.currencyCode,
   "beneficiaryName": fromToData.toAccName,
   "transactionId": "",
   "frequencyType": fromToData.frequencyType,
   "fromAccountNumber": fromToData.fromAccNumber,
   "iban": "",
   "isScheduled": "1",
   "frequencyStartDate": stDate,
   "frequencyEndDate": edDate,
   "scheduledDate": stDate,
   "numberOfRecurrences": kony.sdk.isNullOrUndefined(fromToData.numberOfRecurrences)?"":fromToData.numberOfRecurrences,
   "toAccountNumber":fromToData.toAccNumber,
   "paymentType": "CIPS",
   "paidBy": "SHA",
   "swiftCode": fromToData.bankSwift,
   "serviceName": "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE",
   "beneficiaryNickname": "",
   "transactionsNotes": fromToData.remark,
   "transactionType": "ExternalTransfer",
   "transactionCurrency":fromToData.currencyCode,
   "fromAccountCurrency": fromToData.fromAccCurrency,
   "toAccountCurrency": this.toaccountCurrency,
   "ExternalAccountNumber": "",
   "uploadedattachments": "",
   "clearingCode": "",
   "intermediaryBicCode": "",
   "e2eReference": "",
   "charges": "",
   "exchangeRate": "",
   "totalAmount": ttAmount,
   "creditValueDate": "",
   "transactionAmount": amount,
   "userId": "",
   "deletedDocuments": "",
   "createWithPaymentId": "false",
   "beneficiaryAddressLine1": "",
   "beneficiaryAddressLine2": "",
   "beneficiarycountry": "",
   "beneficiaryState": "",
   "beneficiaryCity": "",
   "beneficiaryZipcode": "",
   "beneficiaryPhone": "",
   "beneficiaryEmail": "",
   "clearingIdentifierCode": "",
   "verifyPayee": "true",
   "payeeCurrency": this.toaccountCurrency
   };
   applicationManager.getNavigationManager().setCustomInfo("domesticPayload",payload);
   transferMod.presentationController.domesticTransferPayment(payload);
   }catch(err){
   kony.print("err"+err);
applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
applicationManager.getPresentationUtility().dismissLoadingScreen();
   }
   },
   flxBackOnClick: function () {
   try{
   applicationManager.getNavigationManager().goBack();
   } catch(err){
   kony.print("flxBackOnClick:"+err);
   applicationManager.getDataProcessorUtility().showToastMessageError(this, "Something went wrong....");
   applicationManager.getPresentationUtility().dismissLoadingScreen();
   }
   },
   sucessError: function(err){
       try{
       var scope =this;
       if(!kony.sdk.isNullOrUndefined(err.message)){
       applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.message);
       }else if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
       applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errorMessage);
       }else{
       applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
       }
       applicationManager.getPresentationUtility().dismissLoadingScreen();
       }catch(err){
       kony.print("err"+err);
applicationManager.getPresentationUtility().dismissLoadingScreen();
       applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");   
       }
       },
       
   flxCancelClick: function () {
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
   setSegmentData: function(){
   try{
   var data1 =applicationManager.getNavigationManager().getCustomInfo("payloadData2");
   var scope=this;
   var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
       var transfMod = applicationManager.getModulesPresentationController({
           'appName': 'TransfersMA',
           'moduleName': 'ManageActivitiesUIModule'
       });
   var transferType =transfMod.transferFlow;
   scope.view.segConfirmDetails.rowTemplate="flxSegTransferNew";
   scope.view.segConfirmDetails.widgetDataMap={
       "lblKey":"lblKey",
       "lblValue":"lblValue",
       "lblLineSeperator":"lblLineSeperator",
       "flxSegTransferNew":"flxSegTransferNew"
   };
   if(transferType =="sameBank"){
   if(Object.keys(data1).length > 0){
   var payload =[]
   if(this.exchangeRate){
       payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.ForeignExchange.ExchangeRate"),"lblValue":"1 "+data1.fromAccCurrency +"= "+this.exchangeRate+data1.toAccCurrency})
   }
   if(this.totalAmount){
        payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.TradeFinance.totalAmount"),"lblValue":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(this.totalAmount,"NPR")})
   }
   if(this.amountfield){
       payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),"lblValue":applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(this.amountfield,data1.currencyCode)})
   }
   if(data1.remark){
       payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.hbl.mb.remarks"),"lblValue":data1.remark})
   }if(data1.responseKey.numberOfRecurrences){
    payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences"),"lblValue":data1.responseKey.numberOfRecurrences})
   }if(data1.responseKey.frequencyEndDate){
    payload.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.Transfers.EndDate"),"lblValue":this.formattedDate(data1.responseKey.frequencyEndDate)})
   }if(data1.responseKey.frequencyStartDate){
    payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.transfers.start_date"),"lblValue":this.formattedDate(data1.responseKey.frequencyStartDate)})
   }if(data1.responseKey.frequencyType){
    payload.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.common.FrequencyType"),"lblValue":data1.responseKey.frequencyType})
   }
   /* if(Object.keys(data).length > 0){
   for(i=0;i<Object.keys(data).length;i++){
   var rowdata={};
   payload.push({
   "lblKey":{"text":Object.keys(data)[i],"isVisible":true},
   "lblValue":{"text":Object.values(data)[i],"isVisible":true},
   "lblLineSeperator":{"isVisible":true},
   "flxSegTransferNew":{"isVisible":true}
       })
       rowdata.lblField4=accounts[i].accountType;
       rowdata.lblField3=accounts[i].accountID;
       rowdata.lblField1= JSON.parse(accounts[i].accountHolder).fullname;
       rowdata.lblField2=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(accounts[i].availableBalance,accounts[i].currencyCode);
       rowdata.flxRow={"isVisible":true};
       segData.push(data)

   }*/
   scope.view.segConfirmDetails.setData(payload);
   }else{
   applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");    
   }
   scope.view.forceLayout();
   }else{}	
   }catch(e){
       kony.print("****************Erron in setSegmentData**************"+e);
       applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
       applicationManager.getPresentationUtility().dismissLoadingScreen();
   }
   },
   setDomesticSegData: function(){
     try{
      var scope=this; var addData ={};
       var data =  applicationManager.getNavigationManager().getCustomInfo("payloadData");
       var para =applicationManager.getNavigationManager().getCustomInfo("payloadData2");
       var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageActivitiesUIModule");
       var transfMod = applicationManager.getModulesPresentationController({
           'appName': 'TransfersMA',
           'moduleName': 'ManageActivitiesUIModule'
       });
       scope.view.segConfirmDetails.rowTemplate="flxSegTransferNew";
       scope.view.segConfirmDetails.widgetDataMap = this.widgetMappingSeg();
       var amount = para.totalamount;
      var feesObj =  transfMod.feeObj
       //var feesCalculate = this.calculateFee(feesObj,amount);
       //data.fees ="NPR "+feesCalculate;
   var payload =[]
   if(Object.keys(data).length > 0){
   for(i=0;i<Object.keys(data).length;i++){
   var rowdata={};
   if(Object.keys(data)[i].frequencyEndDate){
    payload.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.Transfers.EndDate"),"lblValue":this.formattedDate(Object.keys(data)[i].frequencyEndDate),"lblLineSeperator":{"isVisible":true},
   "flxSegTransferNew":{"isVisible":true}})
   }else if(Object.keys(data)[i].frequencyStartDate){
    payload.push({"lblKey":kony.i18n.getLocalizedString("i18n.transfers.start_date"),"lblValue":this.formattedDate(Object.keys(data)[i].frequencyStartDate),"lblLineSeperator":{"isVisible":true},
   "flxSegTransferNew":{"isVisible":true}})
   }else{
   payload.push({
   "lblKey":{"text":Object.keys(data)[i],"isVisible":true},
   "lblValue":{"text":Object.values(data)[i],"isVisible":true},
   "lblLineSeperator":{"isVisible":true},
   "flxSegTransferNew":{"isVisible":true}
       })
    }
   }
   scope.view.segConfirmDetails.setData(payload);
   }
     }catch(err){
       kony.print("setDomesticSegData:"+ err);
       applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");  
       applicationManager.getPresentationUtility().dismissLoadingScreen();
     } 
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
   errorResponse: function(err){
   var scope =this;
   if(!kony.sdk.isNullOrUndefined(err.errorMessage.errorMessage)){
   applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errorMessage.errorMessage);
   }else if(!kony.sdk.isNullOrUndefined(err.errorMessage)){
   applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.errorMessage);
   }else if(!kony.sdk.isNullOrUndefined(err.serverErrorRes.dbpErrMsg)){
   applicationManager.getDataProcessorUtility().showToastMessageError(scope, err.serverErrorRes.dbpErrMsg);
   }else{
   applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Something went wrong....");
   }
   applicationManager.getPresentationUtility().dismissLoadingScreen();
   },
    widgetMappingSeg : function(){
       var segWidget ={
       "lblKey":"lblKey",
       "lblValue":"lblValue",
       "lblLineSeperator":"lblLineSeperator",
       "flxSegTransferNew":"flxSegTransferNew"
   };
   return segWidget;
   },
   formattedDate: function(datestring){
    var date = new Date(datestring);
var formatted = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;
return formatted;
   },
    formatDateToISO:function(dateStr) {
    if(kony.sdk.util.isNullOrUndefinedOrEmptyObject(dateStr)){
        return "";
    }else{
        var [day, month, year] = dateStr.split("/").map(Number);
        var date = new Date(Date.UTC(year, month - 1, day));
        return date.toISOString();
      }
    }
  
   };
});
