define({
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
  },

  preShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMain.top = "56dp";
    }
    this.setupUI();
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  initActions: function () {
	   var transMan = applicationManager.getTransactionManager();
	    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    this.view.btnContinue.onClick = function () {
		transMan.setTransactionAttribute("SelectedAggType","");
		transMan.clearTransferObject();
      var navMan = applicationManager.getNavigationManager();
     
      qrPresentationController.clearTransObj();
	  qrPresentationController.getTransactionHistory();
      navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
	  qrPresentationController.clearTransObj();
      //navMan.navigateTo("frmQRPaymentsLanding");
    };
    this.view.btnBacktoDashboard.onClick=function(){
		transMan.clearTransferObject();
		transMan.setTransactionAttribute("SelectedAggType","");
		var navMan = applicationManager.getNavigationManager();
         /*var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                });
				qrPresentationController.clearTransObj();
                accountsModule.presentationController.showDashboard();*/
				navMan.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
				qrPresentationController.clearTransObj();
    };

  },

  setupUI: function () {
    var transactionManager = applicationManager.getTransactionManager();
    var formatUtilManager = applicationManager.getFormatUtilManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var transObj = transactionManager.getTransactionObject();
    if (transObj.dbpErrCode === "1036") {
      // Fonepay outcome UNKNOWN: the customer has already been debited and the payment
      // may have completed at Fonepay. Show the pending state (not the failure state),
      // with the referenceId, which is the only handle support/reconciliation has for it.
      this.view.flxSuccess.isVisible = false;
      this.view.flxFail.isVisible = true;
      this.view.imgFail.isVisible = false;
      // getLocalizedString returns null for a key missing from the bundle, which rendered as
      // "null Reference Id : ..." on device (the keys once existed only in the web bundles).
      // Fall back to the English text so this screen can never show "null".
      this.view.lblFailTitle.text = kony.i18n.getLocalizedString("i18n.qrpayments.pendingTitle")
        || "Payment being confirmed";
      var pendingMsg = kony.i18n.getLocalizedString("i18n.qrpayments.pendingMessage")
        || "We are confirming this payment with Fonepay. Please check your transaction history shortly.";
      if (transObj.referenceId) {
        pendingMsg = pendingMsg + " " + (kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceId") || "Reference Id")
          + ": " + transObj.referenceId;
      }
      this.view.lblError.text = pendingMsg;
      this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.close");
      this.view.btnBacktoDashboard.setVisibility(false);
    }
    else if (!qrPresentationController.isEmptyOrNullOrUndefined(transObj.errmsg)) {
      this.view.flxSuccess.isVisible = false;
      this.view.flxFail.isVisible = true;
      this.view.imgFail.isVisible = true;
      this.view.lblFailTitle.text = kony.i18n.getLocalizedString("i18n.qrpayments.TransactionFailed");
      var errDetails = transObj.errmsg;
      this.view.lblError.text = errDetails[0].errorMessage;
      this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.close");
      this.view.btnBacktoDashboard.setVisibility(false);
    }
    else {
      this.view.btnContinue.text = kony.i18n.getLocalizedString("i18n.billPay.MakeAnotherPayment");
      this.view.btnBacktoDashboard.setVisibility(true);
      this.view.lblAmount.text =  "NPR "+qrPresentationController.getTransObject().qrTotalDebitAmount;
	  this.view.lblCurrency.text ="NPR ";
	  this.view.lblPrefix.text=transObj.qrTotalDebitAmount.split(".")[0];
	  this.view.lblSuffix.text="."+transObj.qrTotalDebitAmount.split(".")[1];
	  this.view.lblBalance.text=transObj.fromAccountName;
	  this.view.lblAccountNumber.text=transObj.fromAccountNumber;
      this.view.flxSuccess.isVisible = true;
      this.view.flxFail.isVisible = false;
	  this.view.segAck.widgetDataMap={"lblKey":"lblKey","lblValue":"lblValue"};
	  var formatedTransFee=qrPresentationController.getFormattedAmount(transObj.qrTransactionFee,transObj.fromAccountCurrency);
	var segData=[];
if(transObj.isQRP2P || transObj.isDomestic){
	if(transObj.referenceId){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.konybb.common.ReferenceId"),"lblValue":transObj.referenceId})
	}
		if(transObj.toAccountName){
		segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.CardMng.AccountName"),"lblValue":transObj.toAccountName})
	}
	if(transObj.toAccountNumber!=null){
		segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.accdetails.accNumber"),"lblValue":transObj.toAccountNumber})
	}
	if(transObj.qrBankCode){
		segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.externalAccounts.bankName"),"lblValue":transObj.qrBankCode})
	}
	if(transObj.formattedAmount){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),"lblValue":transObj.formattedAmount})
	}
	if(transObj.narration){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.hbl.mb.remarks"),"lblValue":transObj.narration})
	}
	if(transObj.qrTransactionFee&&transObj.qrTransactionFee!="0.00"){
		segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.Europe.TransactionFee"),"lblValue":formatedTransFee})
	}
}
	else{
	if(transObj.toAccountName){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.BillPay.MerchantName"),"lblValue":transObj.toAccountName})
	}
	if(transObj.qrBankCode){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.mb.qr.merchantcode"),"lblValue":transObj.qrBankCode})
	}
	if(transObj.formattedAmount){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.konybb.Common.Amount"),"lblValue":transObj.formattedAmount})
	}
	if(transObj.narration){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.hbl.mb.remarks"),"lblValue":transObj.narration})
	}
    if(transObj.SelectedAggType!=null){
		segData.push({"lblKey":kony.i18n.getLocalizedString("i18n.qrpayments.AggregatorType"),"lblValue":transObj.SelectedAggType})
	}
     if(transObj.qrTransactionFee&&transObj.qrTransactionFee!="0.00"){
		segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.Europe.TransactionFee"),"lblValue":formatedTransFee})
	}
	}
    this.view.segAck.rowTemplate="flxSegTransferNew";
	this.view.segAck.setData(segData);
      //this.setSegmentData();
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
	
  },

  setSegmentData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var segData = qrPresentationController.getAcknowledgmentScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    var segmentData = applicationManager.getDataProcessorUtility().removeRowsWithEmptyValueFromSegmentData(segData, this.view.segDetails.widgetDataMap.lblFieldValue);
    this.view.segDetails.setData(segmentData);
    var transObj = qrPresentationController.getTransObject();
    if(qrPresentationController.isEmptyOrNullOrUndefined(transObj.notes)){
      this.view.flxDescription.isVisible= false;
    }else{
      this.view.lblDescriptionValue.text = transObj.notes || "";  
    }             
  },

  getWidgetDataMap: function () {
    var map = {
      lblFieldLabel: "property",
      lblFieldValue: "value",
    };
    return map;
  }

});