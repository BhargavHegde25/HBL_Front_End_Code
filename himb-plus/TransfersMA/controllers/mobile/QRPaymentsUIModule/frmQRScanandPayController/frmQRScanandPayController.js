define({ 
preshow:function(){
	try{
        var scope=this;
	if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      scope.view.flxHeader.isVisible = false;
	  scope.view.flxMain.top = "20dp";
      scope.view.title=kony.i18n.getLocalizedString("i18n.qrpayments.QRPayments");
    }
    else {
      scope.view.flxHeader.isVisible = true;
      scope.view.flxMain.top = "70dp";
      scope.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("i18n.qrpayments.QRPayments");
    }
	scope.setMerchantData();
	scope.setFromAccountData();
	scope.initActions();
	scope.postshow();
	scope.resetUI();
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa preshow*********************************"+e);
		}
},
postshow:function(){
	this.inputValidation();
},
initActions:function(){
	try{
	var scope=this;
	this.view.flxChooseAccount.onClick=scope.invokeAccSelection;
	this.view.customHeader.flxBack.onTouchEnd = scope.navigateCustomBack.bind(scope);
	this.view.customHeader.btnRight.onClick = scope.navigateCustomBack.bind(scope);
	this.view.btnContinue.onClick=scope.btnOnclick.bind(scope);
	this.view.txtAmount.onTextChange=scope.inputValidation.bind(scope);
	this.view.txtAmount.onEndEditing=scope.formatAmtfield.bind(scope);
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa initActions*********************************"+e);
		}
},
 //Type your controller code here  
 setMerchantData:function(){
	 try{
	 var scope=this;
	 var navMan = applicationManager.getNavigationManager();
        var MerchantData=navMan.getCustomInfo("frmQRScan");
		if(MerchantData){
		scope.view.lblMerchantnameData.text=	MerchantData.toAccountName;
		scope.view.lblmerchantCodeData.text=	MerchantData.toAccountNumber;
		this.setAggregatorType();
        if(MerchantData.toBankCode){
			if(MerchantData.isP2P){
            scope.view.flxMerchantcode.setVisibility(true);
            scope.view.lblMerchantcode.setVisibility(true);
		scope.view.lblMerchantName.text=kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.accountNameHeader");
		scope.view.lblMerchantcode.text=kony.i18n.getLocalizedString("i18n.payments.accountNumberSpaceColon");
		scope.view.flxAggregator.setVisibility(true);
		scope.view.lblAggregator.text=kony.i18n.getLocalizedString("kony.mb.addBen.bankName");
		scope.view.lblAggregatorValue.text=MerchantData.toBankCode;
			}
			else if(MerchantData.isDomestic){
			    scope.view.flxMerchantcode.setVisibility(true);
            scope.view.lblMerchantcode.setVisibility(true);
		scope.view.lblMerchantName.text=kony.i18n.getLocalizedString("kony.i18n.approvalMatrix.accountNameHeader");
		scope.view.lblMerchantcode.text=kony.i18n.getLocalizedString("i18n.payments.accountNumberSpaceColon");
		scope.view.flxAggregator.setVisibility(true);
		scope.view.lblAggregator.text=kony.i18n.getLocalizedString("kony.mb.addBen.bankName");
		scope.view.lblAggregatorValue.text=MerchantData.toBankCode;	
			}
			else{
		scope.view.lblMerchantName.text=kony.i18n.getLocalizedString("i18n.BillPay.MerchantName")+":";
		scope.view.lblMerchantcode.text=kony.i18n.getLocalizedString("i18n.mb.qr.merchantcodewitcolon");
			scope.view.lblAggregator.text=kony.i18n.getLocalizedString("i18n.qrpayments.AggregatorTypewithcolon");
				 scope.view.flxMerchantcode.setVisibility(true);
            scope.view.lblMerchantcode.setVisibility(true);
			//scope.view.lblmerchantCodeData.text=	MerchantData.toBankCode;
		//this.view.lblmerchantCodeData.text=	MerchantData.toBankCode;
			}
        }
        else{
			scope.view.lblMerchantName.text=kony.i18n.getLocalizedString("i18n.BillPay.MerchantName")+":";
		scope.view.lblMerchantcode.text=kony.i18n.getLocalizedString("i18n.mb.qr.merchantcodewitcolon");
			scope.view.lblAggregator.text=kony.i18n.getLocalizedString("i18n.qrpayments.AggregatorTypewithcolon");
this.view.flxMerchantcode.setVisibility(false);
this.view.lblMerchantcode.setVisibility(false);
        }
		}
        }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setMerchantData*********************************"+e);
		}
		
 },
  setFromAccountData: function () {
	  try{
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
	var defaultQRacc=applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;
	var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	var QRFromAccountdata=accounts.filter(function(acc){
		if(acc.accountID==defaultQRacc)
			return acc;
	});
  qrPresentationController.setFromAccountsForTransactions(qrPresentationController.processAccountsData(QRFromAccountdata)[0]);
	this.view.lblAccountName.text = QRFromAccountdata[0].accountName;
    this.view.lblBalance.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(QRFromAccountdata[0].availableBalance,QRFromAccountdata[0].currencyCode);
	this.view.lblAccountNumber.text=QRFromAccountdata[0].accountID;
	this.view.lblAccountType.text=QRFromAccountdata[0].productId;
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setFromAccountData*********************************"+e);
		}
  },
  invokeAccSelection:function(){
	  try{
	  var scope=this;
	   var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
	  var res=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	  var accounts=res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    });
	accounts=qrPresentationController.processAccountsData(accounts);
	var PopupObj={
					"accounts":accounts,//should br Array of object[{},{},{}...]
					"flowType":"QR",
					"rowClickCallback":scope.onRowSelection.bind(this)
				};
				//this.setSegmentData(accounts);
				//scope.view.AccountSelectionPopup.initComponent(PopupObj);
				applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
	  }catch(e){
		  kony.print("eror in acc selection"+e);
	  }
	  
  },
  onRowSelection:function(row){
	  try{
	  var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
		var accountNumber=row[0].lblAccNumber;
		this.view.flxPopupfrombottom.setVisibility(false);
 var res=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	  var accounts=res.filter(function (account) {
      return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom=="1"&& account.currencyCode!="USD";
    });
		var processedaccounts=qrPresentationController.processAccountsData(accounts);
		var acc=processedaccounts.filter(function(account){
			if(accountNumber==account.accountID)
				return account;
		});
		qrPresentationController.setFromAccountsForTransactions(acc[0]);
		this.view.lblAccountName.text = acc[0].accountName;
    this.view.lblBalance.text = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(acc[0].fromAccountBalance,acc[0].currencyCode);
	this.view.lblAccountNumber.text=acc[0].accountID;
	this.view.lblAccountType.text=acc[0].accountType
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa onRowSelection*********************************"+e);
		}
  },
   navigateCustomBack: function () {
	   try{
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    // if (navMan.getEntryPoint("frmQRAmount") === "frmQRVerify") {
    //   navMan.navigateTo("frmQRVerify");
    //   navMan.setEntryPoint("frmQRAmount","");
     var flow=navMan.getEntryPoint("QRFlow");
    /* if(flow&&flow =="frmQRLanding"){
        navMan.navigateTo("frmQRPaymentsLanding");
        qrPresentationController.setAmount('');
    }
     else*/		
 if(flow&&flow =="frmQrScan"){
         navMan.navigateTo("frmQRScan");
         qrPresentationController.setAmount('');
     }
    else {
        navMan.goBack();
    }
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa navigateCustomBack*********************************"+e);
		}
  },
  btnOnclick:function(){
	  try{
	var scope=this;
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var transObj = qrPresentationController.getTransObject();
    var aggType=this.view.lblAggregatorValue.text;
    var transactionManager = applicationManager.getTransactionManager();
	var fromAccAmount=transObj.fromProcessedAvailableBalance;
    var amount = this.view.txtAmount.text.trim();
	amount=amount.replace(/,/g, "");
	var errorMsg=kony.i18n.getLocalizedString("i18n.mb.FD.lessAvlBalErrMsg");
	if(fromAccAmount.indexOf("NPR")!=-1){
		fromAccAmount=Number(fromAccAmount.split(" ")[1].replace(/,/g, ""));
		if(Number(amount)>=fromAccAmount){
			applicationManager.getDataProcessorUtility().showToastMessageError(scope, errorMsg);
			return;
		}
	}
	else if(fromAccAmount.indexOf("USD")!=-1){
		fromAccAmount=Number(fromAccAmount.split(" ")[1].replace(/,/g, ""));
		if(Number(amount)>fromAccAmount){
			applicationManager.getDataProcessorUtility().showToastMessageError(scope, errorMsg)
			return;
		}
	}
	else{
		if(Number(amount)>=Number(fromAccAmount)){
			applicationManager.getDataProcessorUtility().showToastMessageError(scope, errorMsg)
			return;
		}
	}
    if(aggType){
        transObj.SelectedAggType=aggType;
    }
    if (amount.charAt(amount.length - 1) === ".") {
      amount = amount.substring(0, amount.length - 1);
    }
    qrPresentationController.setAmount(amount);
    var formattedAmount = qrPresentationController.getFormattedAmount(amount,transObj.fromAccountCurrency);
    transactionManager.setTransactionAttribute("formattedAmount", formattedAmount);
	transactionManager.setTransactionAttribute("narration", this.view.txtRemarks.text)
	qrPresentationController.validateQR();
    /*var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRVerify", "frmQRAmount");
    navMan.navigateTo('frmQRVerify');*/  
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa btnOnclick*********************************"+e);
		}
  },
  formatAmtfield:function(){
	  var scope=this;
	  var amount=this.view.txtAmount.text;
	    if(amount !=""){
    scope.view.txtAmount.text = parseFloat(amount).toFixed(2);
    }
	
	scope.view.forceLayout();
  },
  inputValidation:function(){
	  try{
	  var scope=this;
	  var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
   
	var amount=this.view.txtAmount.text;
	var isFromAccSelected=qrPresentationController.isEmptyOrNullOrUndefined(qrPresentationController.getTransObject().fromProcessedName);
if (amount === "" || amount === null || amount === undefined || isFromAccSelected) {
      this.view.btnContinue.setEnabled(false);
	  this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
	  //applicationManager.getDataProcessorUtility().showToastMessageError(scope, "Amount field cant be empty");
    } else {
      this.view.btnContinue.setEnabled(true);
	  this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
    }
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa inputValidation*********************************"+e);
		}
  },
 
formatAmount:function(amount){
	try{
			var formatedAmount=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount,"NPR");
			return formatedAmount.split(" ")[1];
            }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa formatAmount*********************************"+e);
		}
			
		},
		resetUI:function(){
            try{
			var navMan = applicationManager.getNavigationManager();
			var entryPoint=navMan.getEntryPoint("frmQRVerify");
			if(entryPoint=="frmQRScan"){
				this.view.txtAmount.text="";
				this.view.txtRemarks.text="";
			}
			}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa formatAmount*********************************"+e);
		}
			
		},
    setAggregatorType: function () {
		try{
    var scopeObj=this;
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transObj = qrPresentationController.getTransObject();
	var transMan=applicationManager.getTransactionManager();
    if(transObj.hasOwnProperty("qrAggregatorType")){
      var type = transObj.qrAggregatorType;
      var typeVal;
      if(type === 0){
        typeVal = "Other";
		transMan.setTransactionAttribute("AggType",true);
      } else if (type === 1){
        typeVal = "Nepal Pay/Smart QR";
      } else if (type === 2){
        typeVal = "Nepal Pay";
      } else if (type === 3){
        typeVal = "Smart QR";
		}
      if(typeVal){
      this.view.lblAggregatorValue.text = typeVal;  
      }
      this.view.flxAggregator.setVisibility(true);
      this.view.lblAggregator.text=kony.i18n.getLocalizedString("i18n.qrpayments.AggregatorTypewithcolon");
    } else {
		transMan.setTransactionAttribute("AggType",true);
      this.view.flxAggregator.setVisibility(false);
	  this.view.lblAggregatorValue.text = "";  
    }
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa setAggregatorType*********************************"+e);
		}
  },
 });