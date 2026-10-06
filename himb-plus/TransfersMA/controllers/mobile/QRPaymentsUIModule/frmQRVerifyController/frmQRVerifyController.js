define({
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function () {
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    if (navMan.getEntryPoint("frmQRVerify") === "frmQRScan") {
      navMan.navigateTo('frmQRScan');
	  qrPresentationController.setAmount('');
    }
    else {
      navMan.navigateTo('frmQRScanandPay');
    }
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    this.initActions();
    this.setFormData();
  },

  postShow: function () {
  },

  initActions: function () {
    this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.flxFromAccount.onTouchEnd = this.navigateToFromAccounts;
    this.view.flxAmount.onTouchEnd = this.navigateToAmountScreen;
    this.view.btnContinue.onClick = this.onContinue;
  },

  setFormData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = qrPresentationController.getTransObject();
    var data = {
      "availableBalance": transObj.amount,
      "currencyCode": transObj.fromAccountCurrency
    };
	var formatedTransFee=qrPresentationController.getFormattedAmount(transObj.qrTransactionFee,transObj.fromAccountCurrency);
	var totalFormatedAmount=qrPresentationController.getFormattedAmount(transObj.qrTotalDebitAmount,transObj.fromAccountCurrency);
    var formattedAmount = qrPresentationController.getFormattedAmount(transObj.amount,transObj.fromAccountCurrency);
    transactionManager.setTransactionAttribute("formattedAmount", formattedAmount);
	this.view.lblfrmAccName.text=transObj.fromAccountName;
	this.view.lblAccountNumber.text=transObj.fromAccountNumber;
	this.view.lblCurrency.text=transObj.fromAccountCurrency+" ";
	this.view.lblPrefix.text=transObj.qrTotalDebitAmount.split(".")[0];
	this.view.lblSuffix.text="."+transObj.qrTotalDebitAmount.split(".")[1];
   /* this.view.lblAmount.text = transObj.formattedAmount;
    this.view.lblFromAccountValue.text = transObj.fromProcessedName;
    this.view.lblFromavailableBal.text = kony.i18n.getLocalizedString("i18n.common.availableBalancewithColon");
    this.view.lblFromBalanceValue.text = transObj.fromProcessedAvailableBalance;
    this.view.lblToAccountValue.text = transObj.toProcessedName;
    this.view.txtDescription.text = transObj.notes || "";
	this.view.lblTotalAmount.text=totalFormatedAmount;
    this.setBankCodeData();
    this.setBranchCodeData();
    this.setAggregatorType();
    this.setTransactionFee();*/
	this.view.segConfirm.widgetDataMap={"lblKey":"lblKey","lblValue":"lblValue"};
	var segData=[];
	if(transObj.isQRP2P){
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
	 if(transObj.qrTransactionFee && transObj.qrTransactionFee!="0.00"){
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
     if(transObj.qrTransactionFee && transObj.qrTransactionFee!="0.00"){
		segData.push({"lblKey":kony.i18n.getLocalizedString("kony.mb.Europe.TransactionFee"),"lblValue":formatedTransFee})
	}
	}
    this.view.segConfirm.rowTemplate="flxSegTransferNew";
	this.view.segConfirm.setData(segData);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  navigateToFromAccounts: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRFromAccount", "frmQRVerify");
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    qrPresentationController.getFromAccounts();
    applicationManager.getPresentationUtility().showLoadingScreen();
  },

  navigateToAmountScreen: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRAmount", "frmQRVerify");
    navMan.navigateTo("frmQRAmount");
  },

  cancelOnClick: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({ "appName": "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
  },
  
  onContinue: function () {
    var transactionManager = applicationManager.getTransactionManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
   // transactionManager.setTransactionAttribute("narration", this.view.txtDescription.text);
    qrPresentationController.makeATransfer();
    applicationManager.getPresentationUtility().showLoadingScreen();
  },
  setBankCodeData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transObj = qrPresentationController.getTransObject();

    if(transObj.hasOwnProperty("qrBankCode")){
      this.view.lblBankCodeValue.text = transObj.qrBankCode;
      this.view.flxBankCode.setVisibility(true);
      this.view.flxSeperator4.setVisibility(true);
    } else {
      this.view.flxBankCode.setVisibility(false);
      this.view.flxSeperator4.setVisibility(false);
    }
  }, 
  setBranchCodeData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transObj = qrPresentationController.getTransObject();
    if(transObj.hasOwnProperty("qrBranchCode")){
      this.view.lblBranchCodeValue.text = transObj.qrBranchCode;
      this.view.flxBranchCode.setVisibility(true);
      this.view.flxSeperator5.setVisibility(true);
    } else {
      this.view.flxBranchCode.setVisibility(false);
      this.view.flxSeperator5.setVisibility(false);
    }
  },
  setAggregatorType: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transObj = qrPresentationController.getTransObject();
    if(transObj.hasOwnProperty("qrAggregatorType")){
      var type = transObj.qrAggregatorType;
      var typeVal;
      if(type === 0){
        typeVal = "Other";
      } else if (type === 1){
        typeVal = "Nepal Pay/Smart QR";
      } else if (type === 2){
        typeVal = "Nepal Pay";
      } else if (type === 3){
        typeVal = "Smart QR";
      } else if (type === 4){
        typeVal = "Fonepay";
      }
      this.view.lblAggregatorValue.text = typeVal;
      this.view.flxAggregator.setVisibility(true);
      this.view.flxSeperator6.setVisibility(true);
    } else {
      this.view.flxAggregator.setVisibility(false);
      this.view.flxSeperator6.setVisibility(false);
    }
  },
  setTransactionFee: function () {
	  var isSamebankTransfer=applicationManager.getNavigationManager().getCustomInfo("QRisSameBankTransfer");
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transObj = qrPresentationController.getTransObject();
    if(transObj.hasOwnProperty("qrTransactionFee")&&transObj.qrTransactionFee!="0.00"){
      
      this.view.lblTrxFeeValue.text = transObj.fromAccountCurrency + " " + transObj.qrTransactionFee;
      this.view.flxTransactionFee.setVisibility(true);
	  this.view.flxTotalDebitAmount.setVisibility(true);
    } else {
      this.view.flxTransactionFee.setVisibility(false);
	  this.view.flxTotalDebitAmount.setVisibility(false);
    }
  },
  bindGenericError:function(errMsg){
	  var basicConfig;
    var pspConfig = {};
	var navMan = applicationManager.getNavigationManager();
	var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig, {});
	  if(errMsg.errorMessage){
		  basicConfig = {
      "alertType": constants.ALERT_TYPE_INFO,
      "alertTitle": kony.i18n.getLocalizedString("i18n.Search.Failed"),
      "message": errMsg.errorMessage,
      "alertHandler": function(){
		   navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
		   qrPresentationController.clearTransObj();
	  },
	  "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      
    };
	  applicationManager.getPresentationUtility().CustomAlert(basicConfig,pspConfig,custConfig);
	  }
	  else if(typeof errMsg=="string"){
		   basicConfig = {
      "alertType": constants.ALERT_TYPE_INFO,
      "alertTitle": kony.i18n.getLocalizedString("i18n.Search.Failed"),
      "message": errMsg,
      "alertHandler": function(){
		   navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
		   qrPresentationController.clearTransObj();
	  },
	  "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      
    };
	  applicationManager.getPresentationUtility().CustomAlert(basicConfig,pspConfig,custConfig);
	  }
	  else{
		    basicConfig = {
      "alertType": constants.ALERT_TYPE_INFO,
      "alertTitle": kony.i18n.getLocalizedString("i18n.Search.Failed"),
      "message": kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"),
      "alertHandler": function(){
		   navMan.navigateTo({ "appName": "TransfersMA", "friendlyName": "frmQRScan" });
		   qrPresentationController.clearTransObj();
	  },
	  "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
      
    };
	  applicationManager.getPresentationUtility().CustomAlert(basicConfig,pspConfig,custConfig);
		
	  }
  },
  
});