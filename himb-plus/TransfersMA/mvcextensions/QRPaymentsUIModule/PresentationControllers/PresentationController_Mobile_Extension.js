define([], function () {
	return{
		 getFromAccounts : function (scope) {
    var accountManager = applicationManager.getAccountManager();
    accountManager.fetchInternalAccounts(scope_QRPresentationController.fromAccountsPresentationSuccessCallBack.bind(this,scope),
      scope_QRPresentationController.fromAccountsPresentationErrorCallBack);
  },
	 fromAccountsPresentationSuccessCallBack : function (response) {
		 applicationManager.getPresentationUtility().showLoadingScreen();
		 var scopeobj=this;
		 if(!response){
			 response=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
		 }
		  var isCCYAccount=this.getCCYAccounts(this.getSavingsAndCheckingsAccounts(response));
		  var navMan = applicationManager.getNavigationManager();
		  var navigationData=navMan.getCustomInfo("QRNavigationData");
		  navMan.getEntryPoint("frmQRFromAccount", "frmQRActivation");
		  var res=this.getSavingsAndCheckingsAccounts(response);
		  var accounts=res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    });
		  if(isCCYAccount&&accounts.length){
		 if(accounts.length>1 && navigationData=="frmQRActivation"){
   /*accounts = res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    });*/
    navMan.setCustomInfo("frmQRFromAccount", {
      "fromaccounts": accounts
    });
	navMan.setCustomInfo("frmQRFromAccountdata", "");
    navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRActivation" });
		 }
		 else if(accounts.length==1 && navigationData=="frmQRActivation"){
			  /*accounts = res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    });*/
   var proccesedData=this.processAccountsData(accounts);
   navMan.setCustomInfo("frmQRFromAccountdata", {
      "fromaccounts": proccesedData
    });
	if(proccesedData.length){
		this.setFromAccountsForTransactions(proccesedData[0]);
	}
	else{
	this.setFromAccountsForTransactions(proccesedData);
	}
    navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRActivation" }); 
		 }
		 else if(navigationData=="frmQRfromAcc"){
			    /*accounts = res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    });*/
    navMan.setCustomInfo("frmQRFromAccount", {
      "fromaccounts": accounts
    });
	navMan.setCustomInfo("frmQRFromAccountdata", "");
    navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRFromAccount" });
		 }
		 else if(navigationData=="frmAccountSelection"){
			   /*accounts = res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    });*/
    navMan.setCustomInfo("frmQRFromAccount", {
      "fromaccounts": accounts
    });
	navMan.setCustomInfo("frmQRFromAccountdata", "");
    navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRFromAccount" });
		 }
		  }
		  else{
			  applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("i18n.qr.mb.noeligibleaccounts"));
		  }
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  getCCYAccounts:function(accountsData){
	  var NonCCYAccounts=0;
	  var CCYAccounts=0;
	  if(accountsData.length>0){
		  for(i=0;i<accountsData.length;i++){
			  if(accountsData[i].currencyCode=="NPR"){
				  NonCCYAccounts++;
			  }
			  else{
				  CCYAccounts++;
			  }
		  }
		  if(NonCCYAccounts>=CCYAccounts){
			  return true;
		  }
		  else{
			  return false;
		  }
	  }
	  else{
		  return false;
	  }
  },
  getTransactionHistory:function(){
	  //applicationManager.getPresentationUtility().showLoadingScreen();
	   var transactionManager = applicationManager.getTransactionManager();
	   transactionManager.getQRTransactionHistory({},scope_QRPresentationController.getTransactionHistorySuccesscallBack,scope_QRPresentationController.getTransactionHistoryFailureCallback)
  },
  getTransactionHistorySuccesscallBack:function(res){
	  try{
	  var scope=this;
	  kony.print(res);
	  var ManageActivity = applicationManager.getModulesPresentationController({
      "moduleName": "ManageActivitiesUIModule",
      "appName": "TransfersMA"
    });
	  var navMan = applicationManager.getNavigationManager();
	  if((res.success==true||res.success=="true")&&res.qrtransaction_history.length!=0){
		  navMan.setCustomInfo("QRHistory",res.qrtransaction_history);
		  //navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRPaymentsLanding" });
		  var defaultAcc = applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;
      if(scope.isEmptyOrNullOrUndefined(defaultAcc)){
        applicationManager.getDataProcessorUtility().showToastMessageError(scope,kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
      } else {
        scope.getLatestBalance(defaultAcc);
        scope.getProcessedDefaultAccDetails(defaultAcc);
      }
	  applicationManager.getTransfersManager().getBankList("", scope.getBankListSuccess, scope.getBankListFailure);
	  navMan.setCustomInfo("isQRHistorySuccess",true);
      //navMan.setEntryPoint("QRFlow","frmQRScan");
	  }
	  else{
		  navMan.setCustomInfo("QRHistory",false);
		  navMan.setCustomInfo("isQRHistorySuccess",true);
		   applicationManager.getTransfersManager().getBankList("", scope.getBankListSuccess, scope.getBankListFailure);
		   if(kony.application.getCurrentForm().id!="frmQRScan"){
		  navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
		   }
	  }
	  //applicationManager.getPresentationUtility().dismissLoadingScreen();
	  }catch(e){
		 applicationManager.getPresentationUtility().dismissLoadingScreen(); 
	  }
  },
  getBankListSuccess:function(response){
	  try{
		  var navMan = applicationManager.getNavigationManager();
		  if(!kony.sdk.isNullOrUndefined(response.bankDetails)){
			  navMan.setCustomInfo("BankDetails",response.bankDetails);
		  }
		  else{
			applicationManager.getPresentationUtility().Alert("Please try again later"); 
		  }
	  }catch(e){
		  kony.print("Error in getBankListSuccess");
	  }
  },
  getBankListFailure:function(err){
	  applicationManager.getPresentationUtility().Alert("Please try again later");
  },
  getTransactionHistoryFailureCallback:function(err){
	  kony.print(err);
	  var navMan = applicationManager.getNavigationManager();
	   navMan.setCustomInfo("QRHistory",false);
		  navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
   updateQRPreferredAccPresentationSuccessCallBack : function () {
    var navMan = applicationManager.getNavigationManager();
   var transactionManager = applicationManager.getTransactionManager();
	   transactionManager.getQRTransactionHistory({},scope_QRPresentationController.getTransactionHistorySuccesscallBack,scope_QRPresentationController.getTransactionHistoryFailureCallback)
  },
   validateQR:function(){
	  var self=this;
	  try{
		  applicationManager.getPresentationUtility().showLoadingScreen();
	   var transactionManager = applicationManager.getTransactionManager();
	   var param={"qrData":""};
	   
	   var transObj = self.getTransObject();
	   var qrData=applicationManager.getNavigationManager().getCustomInfo("QrDatafromQR");
	   if(qrData){
		   param.qrData=Base64.encode(qrData);
	   }
	     if(transObj.hasOwnProperty("amount")&&transObj.amount){
		   param.amount=transObj.amount;
	   }
	   else{
		   param.amount="";
	   }
	    if(transObj.hasOwnProperty("SelectedAggType")&&transObj.SelectedAggType!==kony.i18n.getLocalizedString("i18n.mb.qr.choose")){
		   param.aggSelected=transObj.SelectedAggType;
	   }
	   else{
		   param.aggSelected="";
	   }
	    if(transObj.hasOwnProperty("fromAccountNumber")&&transObj.fromAccountNumber){
		   param.fromAccountNumber=transObj.fromAccountNumber;
	   }
	   else{
		   param.fromAccountNumber="";
	   }
	   //for future use
	   param.aggPayload=""
	   
	   transactionManager.invokeValidateQR(param,scope_QRPresentationController.validateQRSuccesscallBack,scope_QRPresentationController.validateQRFailureCallback);
	  }catch(e){
		  kony.print("**************Error in validateQR:*************: "+e);
	  }
	  
  },
  validateQRSuccesscallBack:function(res){
	  var self=this;
	  try{
		  var errData;
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  //alert("res: "+JSON.stringify(res));
		  if(res.success==true || res.success=="true"){
			  
			  try{
				 errData= JSON.parse(res.errorDetails);
			  }catch(e){
				errData=  res.errorDetails;
			  }
		  if(errData&&errData.dbpErrCode=="1016"){
			  var transMan=applicationManager.getTransactionManager();
		   if(res.debitAmount)
		   transMan.setTransactionAttribute("qrTotalDebitAmount",res.debitAmount);
	   else
		   transMan.setTransactionAttribute("qrTotalDebitAmount","");
	   if(res.transactionFee)
		   transMan.setTransactionAttribute("qrTransactionFee",res.transactionFee);
	   else if(res["transactionFee "])
			transMan.setTransactionAttribute("qrTransactionFee",res["transactionFee "]);
	   else
		    transMan.setTransactionAttribute("qrTransactionFee","");
		if(res.transactionId)
			transMan.setTransactionAttribute("transactionId",res.transactionId);
	   else
		    transMan.setTransactionAttribute("transactionId","");
		  
		  var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRVerify", "frmQRAmount");
	 let msg=kony.i18n.getLocalizedString("i18n.mb.errorcode."+errData.dbpErrCode)+" "+kony.i18n.getLocalizedString("i18n.BillPay.Doyouwanttocontinue");
	
			 if(msg){
			  var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("kony.mb.MM.Confirmation"),
      "message": msg,
      "alertHandler": function(res){
		  if(res)
		  {
		  navMan.navigateTo('frmQRVerify');
	  }
	  else{
		  
	  }
	  },
      "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig, {})
			 }
		 else{
			applicationManager.getPresentationUtility().Alert(res.dbpErrMsg);   
		 }
		  }
		  else{
		   var transMan=applicationManager.getTransactionManager();
		   if(res.debitAmount)
		   transMan.setTransactionAttribute("qrTotalDebitAmount",res.debitAmount);
	   else
		   transMan.setTransactionAttribute("qrTotalDebitAmount","");
	   if(res.transactionFee)
		   transMan.setTransactionAttribute("qrTransactionFee",res.transactionFee);
	   else if(res["transactionFee "])
			transMan.setTransactionAttribute("qrTransactionFee",res["transactionFee "]);
	   else
		    transMan.setTransactionAttribute("qrTransactionFee","");
		if(res.transactionId)
			transMan.setTransactionAttribute("transactionId",res.transactionId);
	   else
		    transMan.setTransactionAttribute("transactionId","");
		  
		  var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRVerify", "frmQRAmount");
    navMan.navigateTo('frmQRVerify');
		  }
		  }
		  else{
			 //var controller = applicationManager.getPresentationUtility().getController("frmQRAmount", true);
			//controller.bindGenericError();
			applicationManager.getPresentationUtility().dismissLoadingScreen();
			 applicationManager.getPresentationUtility().Alert("Something went wrong,Please try again later");
		  }
	//applicationManager.getPresentationUtility().dismissLoadingScreen();
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  kony.print("************error in validateQRSuccesscallBack:*************: "+e)
	  }
	  
  },
  validateQRFailureCallback:function(err){
	  	  try{
		 // alert("err: "+JSON.stringify(err));
		 applicationManager.getPresentationUtility().dismissLoadingScreen();
		 if(err.errorMessage.indexOf("CRC validation failed")==0){
			 var basicConfig = {message: "QR checksum verification failed",
                       alertTitle:"QR Verification",
                       alertIcon:null,
                       alertType: constants.ALERT_TYPE_CONFIRMATION,
                       yesLabel:"Proceed",
                       noLabel:"",
                       alertHandler: alertCallback
                       };
    var pspConfig = {"iconPosition" : constants.ALERT_CONTENT_ALIGN_CENTER,
                    "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER};
			 //kony.ui.Alert(basicConfig, pspConfig)
			 applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig)
			 
		 }
		 else if(err&&err.serverErrorRes&&err.serverErrorRes.dbpErrCode){
			 
			 let msg=kony.i18n.getLocalizedString("i18n.mb.errorcode."+err.serverErrorRes.dbpErrCode);
			 if(msg)  
			 {
				 var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("kony.mb.MM.Confirmation"),
      "message": msg,
      "alertHandler": function(){
	  },
      "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig, {})
		 }
		 else{
			 	 var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("kony.mb.MM.Confirmation"),
      "message": err.errorMessage,
      "alertHandler": function(){
	  },
      "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig, {})
			//applicationManager.getPresentationUtility().Alert(err.errorMessage);   
		 }
		 }
		 else if(err&&err.errorMessage){
			applicationManager.getPresentationUtility().Alert(err.errorMessage);  
		 }
		 else{
			//alert(kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinFailureMessage")); 
			applicationManager.getPresentationUtility().Alert(kony.i18n.getLocalizedString("kony.mb.Profile.TransactionPinFailureMessage")); 
		 }
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  function alertCallback(){
			  applicationManager.getNavigationManager().navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
		  }
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		  kony.print("************error in validateQRFailureCallback:*************: "+e)
	  }
  },
  latestBalancePresentationSuccessCallBack : function (accountId, res) {
    var navMan = applicationManager.getNavigationManager();
    var accounts = res;
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].account_id === accountId) {
        var trasMan = applicationManager.getTransactionManager();
        var formattedBalance = scope_QRPresentationController.getFormattedAmount(accounts[i].availableBalance, accounts[i].currencyCode);
        trasMan.setTransactionAttribute("fromProcessedAvailableBalance", formattedBalance);
      }
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	if(navMan.getEntryPoint("QRFlow")=="frmQRScan"){
    //navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
	}
  },
    getRequestPayload :function () {
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = transactionManager.getTransactionObject();
    var param = {
		"transactionId":transObj.transactionId,
		"narration":transObj.narration
		};
    if(transObj.hasOwnProperty("qrString")){
      param.qrString = transObj.qrString;
    }
    return param;
  },
    presentationMakeATransferSuccess :function (response) {
		if (response.MFAAttributes && response.MFAAttributes.isMFARequired === "true") {
        var mfaJSON = {
          "flowType": "QR_PAYMENT",
          "response": response,
          "objectServiceDetails": {
            "serviceName": "QRPayments",
            "dataModel": "qrPayment",
            "operationName": "qrPaymentService"
          }
        }
        applicationManager.getMFAManager().initMFAFlow(mfaJSON);
      }
    else if (!response.referenceId) {
      errmsg = {
        errorMessage: kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")
      };
      scope_QRPresentationController.presentationMakeATransferError(errmsg);
    }
    else {
      var transactionManager = applicationManager.getTransactionManager();
      var navMan = applicationManager.getNavigationManager();
      if (response.referenceId) {
        transactionManager.setTransactionAttribute("referenceId", response.referenceId);
      }
      navMan.navigateTo({ "appName": "TransfersMA", "friendlyName":"frmQRAcknowledgement"});
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  presentationMakeATransferError : function (response) {
	  try{
    if (response["isServerUnreachable"]) {
      applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", response);
    } else {
      var transactionManager = applicationManager.getTransactionManager();
      var navMan = applicationManager.getNavigationManager();
      if (response.serverErrorRes&&response.serverErrorRes.errorDetails) {
		  var errorDetails;
		  try{
         errorDetails= JSON.parse(response.serverErrorRes.errorDetails);
	  }catch(e){
		  errorDetails=response.serverErrorRes.errorDetails;
	  }
        if (errorDetails != null && errorDetails != "")
          transactionManager.setTransactionAttribute("errmsg", errorDetails);
      } else {
        var formattedResponse = [];
        var errMsg = {};
        errMsg.errorMessage = response.errorMessage;
        errMsg.imgIcon = " ";
        formattedResponse.push(errMsg)
       // transactionManager.setTransactionAttribute("errmsg", formattedResponse);
      }
	  applicationManager.getNavigationManager().navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRVerify" });
	 var controller = applicationManager.getPresentationUtility().getController("QRPaymentsUIModule/frmQRVerify", true, { "appName": "TransfersMA" });
	  controller.bindGenericError(response.errorMessage);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	}catch(e){
	 applicationManager.getPresentationUtility().dismissLoadingScreen();
kony.print("error in presentationMakeATransferError"+e);
	}
	
  },
   getAcknowledgmentScreenData :function () {
    var segData = [];
    var transObj = scope_QRPresentationController.getTransObject();
    if (!kony.sdk.isNullOrUndefined(transObj.referenceId)) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MM.ReferenceID"),
        "value": transObj.referenceId
      });
    }
    else if (!kony.sdk.isNullOrUndefined(transObj.transactionId)) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.i18n.common.transactionID"),
        "value": transObj.transactionId
      });
    }
	 segData.push({
      "property": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.from"),
      "value": transObj.fromProcessedName
    }, {
      "property": applicationManager.getPresentationUtility().getStringFromi18n("i18n.common.To"),
      "value": transObj.toProcessedName
    });
	if (!kony.sdk.isNullOrUndefined(transObj.qrTotalDebitAmount)) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("i18n.transfers.amountlabel"),
        "value":"NPR "+transObj.qrTotalDebitAmount
      });
    }
	if (!kony.sdk.isNullOrUndefined(transObj.SelectedAggType)&&transObj.qrTransactionFee!="0.00") {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("i18n.qrpayments.AggregatorType"),
        "value": transObj.SelectedAggType
      });
    }
	if (!kony.sdk.isNullOrUndefined(transObj.qrBankCode)&&transObj.qrTransactionFee=="0.00") {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("i18n.qrpayments.BankCode"),
        "value": transObj.qrBankCode
      });
    }
	if (!kony.sdk.isNullOrUndefined(transObj.narration)) {
      segData.push({
        "property": applicationManager.getPresentationUtility().getStringFromi18n("i18n.transfers.Description"),
        "value": transObj.narration
      });
    }
    return segData;
  },
  getTermsandConditionsSuccessCallBack :function (response) {
	  var scope=this;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    navManager.setCustomInfo("frmQRTAndC", { "richTextData": "<font face='SourceSansPro-Regular'>" + response.termsAndConditionsContent });
	applicationManager.getDataProcessorUtility().ShowTandC("<font face='SourceSansPro-Regular'>" + response.termsAndConditionsContent,scope.activateQRPayment);
  },
  processAccountsData :function (data) {
    var accProcessedData = [];
    for (var i = 0; i < data.length; i++) {
      accProcessedData[i] = {};
      var name = "";
      name = data[i].accountName;
      accProcessedData[i].accountName = data[i].accountName;
      accProcessedData[i].nickName = data[i].nickName;
      accProcessedData[i].availableBalance = scope_QRPresentationController.getAvailableBalanceCurrencyString(data[i]);
      accProcessedData[i].accountID = data[i].accountID;
      accProcessedData[i].bankName = (data[i].bankName) ? data[i].bankName.trim() : data[i].bankName;
      accProcessedData[i].accountBalanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
      accProcessedData[i].accountType = data[i].accountType;
      accProcessedData[i].fromAccountCurrency = data[i].currencyCode;
      accProcessedData[i].toAccountCurrency = data[i].currencyCode;
      accProcessedData[i].fromAccountBalance = data[i].availableBalance;
      accProcessedData[i].accountPreference = data[i].accountPreference;
      accProcessedData[i].transactionMode = data[i].transactionMode;
      accProcessedData[i].processedName = applicationManager.getPresentationUtility().formatText(name, 10, data[i].accountID, 4);
      accProcessedData[i].nextPaymentDate = data[i].nextPaymentDate;
      accProcessedData[i].nextPaymentAmount = data[i].nextPaymentAmount;
      accProcessedData[i].paymentDue = data[i].paymentDue;
      accProcessedData[i].accountTypeFlx = { isVisible: false };
      accProcessedData[i].flximgBankIcon = { isVisible: false };
      accProcessedData[i].imgBankIcon = { isVisible: false };
      accProcessedData[i].membershipID = data[i].Membership_id;
      accProcessedData[i].membershipName = data[i].MembershipName;
      accProcessedData[i].isBusinessAccount = data[i].isBusinessAccount;
      accProcessedData[i].flximgBank = { isVisible: false };
      accProcessedData[i].flxAccountType = { isVisible: false };
	  accProcessedData[i].productId = data[i].productId;
    }
    return accProcessedData;
  },
   activateQRPresentationSuccessCallBack : function (response) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_QRPresentationController.updateQRPaymentPreferredAccount();
	applicationManager.getNavigationManager().navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
  },
	};
});