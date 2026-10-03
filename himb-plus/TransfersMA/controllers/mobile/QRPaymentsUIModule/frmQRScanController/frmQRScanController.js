define({
  //invoked everytime when navigated to form
  preShow: function () {
	  try{
	  this.resetUI();
    if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
      this.view.flxHeader.isVisible = false;
	  this.view.flxShare.top="0dp";
	  this.view.flxMainContainer.top="0dp";
	  this.view.flxRecentTransactions.top="0dp";
    }
    else {
      this.view.flxHeader.isVisible = true;
	   this.view.flxShare.top = "56dp";
      this.view.flxMainContainer.top = "56dp";
	  this.view.flxRecentTransactions.top = "56dp";
    }
	this.view.lblNoRecords.text=kony.i18n.getLocalizedString("i18n.accounts.noTransactionFound");
	this.view.lblScanMsg.skin="sknFontFFFFFSemioild";
	this.applySupportedMerchants();
    this.initActions();
	 applicationManager.getPresentationUtility().dismissLoadingScreen();
	  }catch(e){
		  applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa preShow*********************************"+e);
	  }
  },

  //defined actions
  initActions: function () {
	  try{
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    scope.view.customHeader.flxBack.onClick = function () {
      //navMan.navigateTo("frmQRPaymentsLanding");
    navMan.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
    };
	this.view.lblRecent.onTouchEnd=scope.recentOnlick;
    this.view.onDeviceBack=function(){
		 navMan.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
	};
	this.view.flxUpload.onClick=scope.uploadQR.bind(this);
    scope.view.barcodeqrscanner.afterScan = scope.onQRScan.bind(scope);
    scope.view.barcodeqrscanner.errorCallback = scope.errorCallBack.bind(scope);
    this.populateCardData();
      this.view.flxQrShare.onClick = this.qrShare;
      this.view.flxTextShare.onClick = this.textShare;
      this.view.brwsrQRimg.bounces = false;
      this.view.brwsrQRimg.onSuccess = this.onSuccess;
	  this.view.flxChooseAccount.onClick=this.invokeAccSelection;
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa initActions*********************************"+e);
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
				applicationManager.getDataProcessorUtility().ShowAccountSelectionPopup(scope,PopupObj);
	   }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa invokeAccSelection*********************************"+e);
		}
  },
uploadQR:function(){
	try{
	var scope=this;
	var navMan = applicationManager.getNavigationManager();
	var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
	var defaultAcc = applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;
      if(qrPresentationController.isEmptyOrNullOrUndefined(defaultAcc)){
        scope.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
      } else {
        qrPresentationController.getProcessedDefaultAccDetails(defaultAcc);
        if(applicationManager.getPresentationFormUtility().getDeviceName() != "iPhone"){
		scope.invokeUploadQr();
        }
        else{
            scope.invokeUploadQrForIos();
        }
      }
      navMan.setEntryPoint("QRFlow","frmQRScan");
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa uploadQR*********************************"+e);
		}
},
  //iphone back navigation
  navigateCustomBack: function () {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
   navMan.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
  },

  //invoked when a QR is scanned
  onQRScan: function (result, format) {
	  try{
    var scope = this;
    var isQRStringJSON = false;
    var resObj = {};
    scope.__fpd = ""; scope.fpDiag("1 typeof=" + (typeof result) + " len=" + (result && result.length) + " head=" + String(result).substring(0,32));
	//storing to get from amount screen
	var navMan=applicationManager.getNavigationManager();
	applicationManager.getNavigationManager().setCustomInfo("QrDatafromQR",result);
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    qrPresentationController.clearCustomTransObj();
    try{
      if (typeof result === 'string') {
        try{
          result = JSON.parse(result);  
          isQRStringJSON = true;
        } catch(e){
          isQRStringJSON = false;
        }
      } else {
        scope.fpDiag("2 REJECTED not-a-string typeof=" + (typeof result));
        scope.onQRError();
        return;
      }
if(result.eSewa_id){
	navMan.setCustomInfo("isEsewafromQr",true);
	navMan.setCustomInfo("EsewafromQrdata",result);
	 var transferMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
      "moduleName": "ManageActivitiesUIModule",
      "appName": "TransfersMA"
    });
				transferMod.presentationController.navigateToEsewaLoad();
				return "";
}
      if(isQRStringJSON){
        var isSameBankTransfer = (result.hasOwnProperty('accountNumber') && 
                                  result.hasOwnProperty('accountName') && result.hasOwnProperty('bankCode'));
        var isOtherBankTransfer = (isSameBankTransfer && result.hasOwnProperty('bankCodeCIPS'));
		navMan.setCustomInfo("QRisSameBankTransfer",isSameBankTransfer);
		navMan.setCustomInfo("QRisOtherBankTransfer",isOtherBankTransfer);
        /*if (result.hasOwnProperty('toAccountName') && result.hasOwnProperty('toAccountNumber')) {
          this.onQRSuccess(result);
        } else*/ 

        if(isOtherBankTransfer){
          // Personal QR - Other bank transfer
          resObj = {};
		  resObj.isDomestic=true;
          resObj.toAccountName = result.accountName;
          resObj.toAccountNumber = result.accountNumber;
          resObj.toBankCode = scope.getBankName(result.bankCode);
          resObj.toBranchCode = result.bankCodeCIPS;
          resObj.qrTransactionFee = "0.00";
		  if(resObj.toBankCode){
          this.onQRSuccess(resObj);
		  }
		  else{
			  scope.view.barcodeqrscanner.resumeScan();
			  var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.qrpayments.VerificationFailed"),
      "message": kony.i18n.getLocalizedString("i18n.mb.qr.bankNA"),
      "alertHandler": function(){
		  
	  },
      "yesLabel": kony.i18n.getLocalizedString("i18n.qrpayments.Retry"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig, {});
		  }
        } else if(isSameBankTransfer){
          // Personal QR - same bank transfer
          resObj = {};
          resObj.toAccountName = result.accountName;
          resObj.toAccountNumber = result.accountNumber;
          resObj.toBankCode =scope.getBankName(result.bankCode);
		  resObj.isP2P=true;
          if(resObj.toBankCode){
			  if(resObj.toBankCode!=kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue"))
			  resObj.qrTransactionFee = "0.00";
          this.onQRSuccess(resObj);
		  }
		  else{
			  scope.view.barcodeqrscanner.resumeScan();
			  var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.qrpayments.VerificationFailed"),
      "message": kony.i18n.getLocalizedString("i18n.mb.qr.bankNA"),
      "alertHandler": function(){
		  
	  },
      "yesLabel": kony.i18n.getLocalizedString("i18n.qrpayments.Retry"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().Alert(basicConfig, pspConfig, {});
		  }
        } else {
          scope.onQRError();
        }
      } else {
        var paramsResult = Object.assign({}, this.getFieldsForQRPay(result));  
        scope.fpDiag("3 keys=" + JSON.stringify(Object.keys(paramsResult)));
        if(Object.keys(paramsResult).length > 0){
			if(paramsResult.hasAddDataInfo){
			resObj.toAccountName = paramsResult.addDataInfo.merchantName;
			resObj.toAccountNumber = paramsResult.addDataInfo.merchantAccInfo;
			resObj.toBankCode = this.getBankName(paramsResult.addDataInfo.bankCode);
			resObj.isP2P=paramsResult.addDataInfo.isP2P;
		  } else {
          resObj.toAccountName = paramsResult.merchantName;
          resObj.toAccountNumber = paramsResult.merchantAccInfo;
			resObj.toBankCode =this.getBankName(paramsResult.bankCode); ;
		  }
          resObj.qrString = result;
          //resObj.toBankCode = paramsResult.bankCode;
          resObj.qrTransactionFee = "0.00";
          if(paramsResult.amount){
            resObj.amount = paramsResult.amount ? paramsResult.amount : "";  
          }
          var isOtherAggregator = 
              paramsResult.hasOwnProperty("merchantAccountInfoPix");
          var isNepalPayAggregator = 
              paramsResult.hasOwnProperty("merchantAccountInfo");
          var isSmartQRAggregator = 
              paramsResult.hasOwnProperty("merchantAccountInfoOther");
          var isNepalAndSmartQR = 
              isNepalPayAggregator && isSmartQRAggregator;
var isHBLEmvTransfer = paramsResult.hasAddDataInfo && paramsResult.addDataInfo.isP2P;
          if(isHBLEmvTransfer){
			  resObj.isP2P = true;
		  }
		  else if(isNepalAndSmartQR){
            resObj.qrAggregatorType = 1;
          } else if(isNepalPayAggregator){
            resObj.qrAggregatorType = 2;
          } else if(isSmartQRAggregator){
            resObj.qrAggregatorType = 3;
          } else if(isOtherAggregator){
            scope.fpDiag("4 ladder=FONEPAY enabled=" + scope.isFonepayEnabled());
            // Fonepay. Reached only when neither tag 29 nor tag 27 is present, so no QR that
            // works today changes rail.
            if(!scope.isFonepayEnabled()){
              // Do NOT resumeScan() here. The QR is still in frame, so the scanner
              // re-fires afterScan synchronously, re-enters onQRScan, and recurses
              // until "RangeError: Maximum call stack size exceeded" - which the outer
              // catch then reported as an unreadable QR. Show the alert and let the
              // Retry button resume the scan, the same way onQRCustomError does.
              var fpCfg = {
                "alertType": constants.ALERT_TYPE_CONFIRMATION,
                "alertTitle": kony.i18n.getLocalizedString("i18n.qrpayments.VerificationFailed"),
                "message": kony.i18n.getLocalizedString("i18n.qrpayments.fonepayUnavailable")
                  || "Fonepay QR is temporarily unavailable. Please try another payment method.",
                "alertHandler": scope.alertCallback.bind(scope),
                "yesLabel": kony.i18n.getLocalizedString("i18n.qrpayments.Retry"),
                "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
              };
              applicationManager.getPresentationUtility().CustomAlert(
                fpCfg, {}, { hideCloseButton: true, disableTouchDismiss: true });
              return;
            }
            resObj.qrAggregatorType = 4;
          } else {
            scope.fpDiag("4 ladder=NONE (no tag 26/27/29 key)");
            resObj = {};
            scope.onQRCustomError();
            return;
          }

          this.onQRSuccess(resObj);
        } else {
          scope.onQRError();
        }
      }
    }
    catch(err){
      scope.fpDiag("5 EXCEPTION: " + err);
      scope.onQRError();
    }
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa qrscan*********************************"+e);
		}
  },

  onQRSuccess: function (result) {
	  try{
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmQRScan", result);
    var transactionManager = applicationManager.getTransactionManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var transObj = qrPresentationController.getTransObject();
    var formattedToAccountName = applicationManager.getPresentationUtility().formatText(result.toAccountName, 10, result.toAccountNumber, 4);
    transactionManager.setTransactionAttribute("toAccountName", result.toAccountName);
    transactionManager.setTransactionAttribute("toAccountNumber", result.toAccountNumber);
    transactionManager.setTransactionAttribute("toProcessedName", formattedToAccountName);

    if(result.hasOwnProperty("toBankCode")){
      transactionManager.setTransactionAttribute("qrBankCode", result.toBankCode);
    }
	if(result.hasOwnProperty("isP2P")){
      transactionManager.setTransactionAttribute("isQRP2P", result.isP2P);
    }
	if(result.hasOwnProperty("isDomestic")){
      transactionManager.setTransactionAttribute("isQRDomestic", result.isDomestic);
    }

    if(result.hasOwnProperty("toBranchCode")){
      transactionManager.setTransactionAttribute("qrBranchCode", result.toBranchCode);
    }

    if(result.hasOwnProperty("qrString")){
      transactionManager.setTransactionAttribute("qrString", result.qrString);
    }

    if(result.hasOwnProperty("qrAggregatorType")){
		var typeVal;
		if (result.qrAggregatorType === 2){
        typeVal = "Nepal Pay";
      } else if (result.qrAggregatorType === 3){
        typeVal = "Smart QR";
      } else if (result.qrAggregatorType === 4){
        typeVal = "Fonepay";
      }
      transactionManager.setTransactionAttribute("qrAggregatorType", result.qrAggregatorType);
	   transactionManager.setTransactionAttribute("SelectedAggType", typeVal)
    }

    if(result.hasOwnProperty("qrTransactionFee")){
      transactionManager.
      setTransactionAttribute("qrTransactionFee", result.qrTransactionFee);
    }
      if (result.hasOwnProperty('amount')&&(result.amount!=0||result.amount!="0")) {
      if(result.amount.includes(',')){
        scope.onQRError();
      }
      else{
      transactionManager.setTransactionAttribute("amount", result.amount);
      navMan.setEntryPoint("frmQRVerify", "frmQRScan");
	 qrPresentationController.validateQR();
      //navMan.navigateTo('frmQRVerify');
    }
    }
    else {
        navMan.setEntryPoint("frmQRVerify", "frmQRScan");
      navMan.navigateTo("frmQRScanandPay");
    }
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa qr success*********************************"+e);
    }
  },

  //invoked when QR data is incorrect
  fpDiag: function (m) {
    try {
      this.__fpd = (this.__fpd ? this.__fpd + " | " : "") + m;
      kony.print("FONEPAY-DIAG " + m);
    } catch (e) {}
  },
  onQRError: function () {
    var scope = this;
    var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.qrpayments.VerificationFailed"),
      "message": kony.i18n.getLocalizedString("i18n.qrpayments.UnableToVerifyTheQRCode")
        + "   [DIAG] " + (scope.__fpd || "no checkpoint reached - onQRScan never ran"),
      "alertHandler": scope.alertCallback.bind(scope),
      "yesLabel": kony.i18n.getLocalizedString("i18n.qrpayments.Retry"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().CustomAlert(basicConfig, pspConfig, custConfig);   
  },

  //invoked when user clicks on alert box 
  alertCallback: function (response) {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    if (response) {
		
      scope.view.barcodeqrscanner.resumeScan();
		
    }
    else {
       navMan.navigateTo({"appName" : "HomepageMA", "friendlyName": "frmHBLUnifiedDashboard" });
    }
  },

  //invoked when the QR component has any error
  errorCallBack: function (errMsg) {
    var scope = this;
    kony.print(errMsg);
  },
  
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  getTagsFromTextQR: function (qrString){
    var tags = [];
    try {
      var i = 0;
      while (i < qrString.length) {
        var tag = qrString.substring(i, i + 2);
        i += 2;
        var valueLength = Number(qrString.substring(i, i + 2));
        i += 2;
        var value = qrString.substring(i, i + valueLength);
        i += valueLength;
        tags.push({tag: tag, length: valueLength, value: value});
      }
    } catch (err){

    }
    return tags;
  },
  getFieldsForQRPay: function(qrString){
    var res = {};
    var params = this.getTagsFromTextQR(qrString);
    var len = params.length;
    if(len > 0){
      for(i=0; i < len; i++){
        var tagNum = params[i].tag;
        var tagValue = params[i].value;
        if(tagNum === '02'){
          res.merchantAccInfo = tagValue;
        } else if(tagNum === '26'){
          res.merchantAccountInfoPix = tagValue;
        } else if(tagNum === '27'){
          res.merchantAccountInfoOther = tagValue;
        } else if(tagNum === '29'){
          res.merchantAccountInfo = tagValue;
        } else if(tagNum === '52'){
          res.merchantCategoryCode = tagValue;
        } else if(tagNum === '53'){
          res.currencyCode = tagValue;
        } else if(tagNum === '54'){
          res.amount = tagValue;
        } else if(tagNum === '58'){
          res.countryCode = tagValue;
        } else if(tagNum === '59'){
          res.merchantName = tagValue;
        } else if (tagNum === '60'){
          res.merchantCity = tagValue;
        } else if (tagNum === '62'){
          var addDataInform = this.getTagsFromTextQR(tagValue);
		  if(addDataInform[addDataInform.length-1].value=="P2P"){
			  res.addDataInfo={};
			  res.addDataInfo.merchantName = res.merchantName;
			  res.addDataInfo.merchantAccInfo = addDataInform[addDataInform.length - 2].value;
			  res.addDataInfo.bankCode=res.merchantAccountInfo;
			  res.addDataInfo.isP2P=true;
			  res.hasAddDataInfo = true; 
		  }
        }
      }
    }
    return res;
  },
  // Single place that reads FONEPAY_QR_ENABLED. Returns the trimmed upper-case value, or ""
  // when the property is absent, empty or unreadable. Callers decide what "" means for them -
  // the rail and the merchant badge deliberately answer that differently, see below.
  readFonepayFlag: function(){
    // Read the Fabric CLIENT APP property the way the rest of this project does -
    // through the ConfigurationManager, the same route EMVQR_PARAMS and
    // PERSONAL_QR_FORMAT use. The original CLIENT_PROPERTIES lookup returned nothing
    // here, so the rail was permanently gated off even with the property set.
    var raw = null;
    try{
      var cm = applicationManager.getConfigurationManager();
      if(cm){
        if(typeof cm.getConfigurationValue === "function"){
          raw = cm.getConfigurationValue("FONEPAY_QR_ENABLED");
        }
        if(raw === null || raw === undefined || raw === ""){ raw = cm.FONEPAY_QR_ENABLED; }
      }
    } catch(e){ raw = null; }
    try{
      if((raw === null || raw === undefined || raw === "")
         && typeof CommonUtilities !== "undefined" && CommonUtilities.CLIENT_PROPERTIES){
        raw = CommonUtilities.CLIENT_PROPERTIES.FONEPAY_QR_ENABLED;
      }
    } catch(e){}
    if(raw === null || raw === undefined){ return ""; }
    return String(raw).trim().toUpperCase();
  },
  isFonepayEnabled: function(){
    // Unset or unreadable -> defer to the SERVER gate, which is authoritative and
    // answers with error 1034 and a proper message. Only an explicit FALSE stops the
    // rail on the client. Failing closed here turned a missing property into a dead
    // feature reporting a misleading "cannot verify QR" error.
    return this.readFonepayFlag() !== "FALSE";
  },
  // The merchant badge on the scanner advertises the rail, so it fails CLOSED where the rail
  // fails open: only an explicit "true" shows it. Absent, empty, misspelt or read before the
  // client properties have landed all leave it hidden, so the strip never advertises FonePay
  // on a build where the property was never set.
  isFonepayIconVisible: function(){
    return this.readFonepayFlag() === "TRUE";
  },
  // flxSupportedmerchants is a free-form container and each logo pins on centerx alone, so the
  // row can be laid out for however many are actually showing. n logos split the strip into n
  // equal slots and each sits in the middle of its own: slot i at (i + 0.5) * 100 / n %. Four
  // gives 12.50/37.50/62.50/87.50%, three gives 16.67/50.00/83.33%. Hidden widgets do not
  // collapse in a free-form container, which is why the survivors have to be re-pinned rather
  // than just hiding FonePay and leaving a gap where it was.
  applySupportedMerchants: function () {
    try {
      var strip = [
        { widget: this.view.imgNepalPay, visible: true },
        { widget: this.view.imgFonePay,  visible: this.isFonepayIconVisible() },
        { widget: this.view.imgSmartQR,  visible: true },
        { widget: this.view.imgEsewa,    visible: true }
      ];
      var shown = [];
      var i;
      for (i = 0; i < strip.length; i++) {
        if (!strip[i].widget) { continue; }
        strip[i].widget.setVisibility(strip[i].visible);
        if (strip[i].visible) { shown.push(strip[i].widget); }
      }
      if (this.view.flxSupportedmerchants) {
        this.view.flxSupportedmerchants.setVisibility(shown.length > 0);
      }
      for (i = 0; i < shown.length; i++) {
        // centerX, not centerx. The lower-case spelling is the design-time key in the .sm and is
        // inert at runtime - assigning it just hangs a dead property off the widget and leaves the
        // logo wherever the .sm put it.
        shown[i].centerX = ((((i + 0.5) * 100) / shown.length).toFixed(2)) + "%";
      }
    } catch (e) {
      kony.print("**********************error in applySupportedMerchants*********************************" + e);
    }
  },
  onQRCustomError: function () {
    var scope = this;
    var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.qrpayments.VerificationFailed"),
      "message": kony.i18n.getLocalizedString("i18n.qrpayments.qrNotSupported")
        + "   [DIAG] " + (scope.__fpd || "no checkpoint reached"),
      "alertHandler": scope.alertCallback.bind(scope),
      "yesLabel": kony.i18n.getLocalizedString("i18n.qrpayments.Retry"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
    applicationManager.getPresentationUtility().CustomAlert(basicConfig, pspConfig, custConfig);   
  },
  invokeUploadQr:function(){
	  var scope=this;
    var Uri = java.import("android.net.Uri");
    var ContentResolver = java.import("android.content.ContentResolver");
    var BitmapFactory = java.import("android.graphics.BitmapFactory");
    var KonyMain = java.import("com.konylabs.android.KonyMain");
    var BarcodeScanner = java.import("com.google.mlkit.vision.barcode.BarcodeScanning");
    var InputImage = java.import("com.google.mlkit.vision.common.InputImage");
    var self =this;
    function callBack(rawbytes , permStatus , mimeType){
       if (permStatus === kony.application.PERMISSION_DENIED) {
				var basicConfig={
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "Permission Denied",
        "message": "Permission Denied! Go to Settings and allow access.",
        "alertHandler": self.alertCallback2.bind(self),
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
        };
        var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
		    applicationManager.getPresentationUtility().CustomAlert(basicConfig,{}, custConfig);
                return;
            }
            if (!rawbytes) {
				var basicConfig={
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "Select Image",
        "message": "No image selected or rawbytes is null.",
        "alertHandler": self.alertCallback2.bind(self),
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
        };
        var custConfig = { hideCloseButton : true, disableTouchDismiss : true};
        applicationManager.getPresentationUtility().CustomAlert(basicConfig,{}, custConfig);
                return;
            }
            self.decodeGalleryQrAndroid(rawbytes,
                function (qrData) {
                    scope.onQRScan(qrData);
                },
                function (trail) {
                    self.__fpd = ""; self.fpDiag("G android " + trail);
                    self.onQRCustomError();
                });
    }
   let status =  kony.phone.openMediaGallery(callBack,{mimeType:"image/*"});
  },

  /**
   * Decode a QR from a gallery-picked image on Android. Shared by frmQRScan and
   * frmQRPaymentsLanding.
   *
   * The original path handed ML Kit ONE full-size bitmap with rotation hard-coded to 0. A picked
   * camera photo is typically 3072x4096 with the QR filling a small part of the frame and an EXIF
   * orientation the raw decode ignores - on device that returned barcodes=0 for a QR the live
   * camera reads instantly (the camera feeds ML Kit small frames at the right orientation).
   *
   * So try a short sequence, stopping at the first hit:
   *   file      InputImage.fromFilePath - ML Kit decodes the file itself and applies EXIF rotation
   *   max1600   whole image scaled so the longest side is 1600 px
   *   center60  the central 60% of the image, scaled to <= 1600 px (QR photographed mid-frame)
   *   max1024   whole image at <= 1024 px
   * Each pass is independent: a pass that throws is recorded and skipped, never fatal.
   *
   * onDecoded(rawValue, passName) on the first non-empty QR; onNotFound(trail) otherwise, where
   * trail names every pass and its result, e.g. "file=0 max1600=0 center60=0 max1024=0 bitmap=3072x4096".
   */
  decodeGalleryQrAndroid: function (rawbytes, onDecoded, onNotFound) {
    var trail = [];
    var original = null;
    var finished = false;
    var MAX_LARGE = 1600;
    var MAX_SMALL = 1024;
    try {
      var Uri = java.import("android.net.Uri");
      var Bitmap = java.import("android.graphics.Bitmap");
      var BitmapFactory = java.import("android.graphics.BitmapFactory");
      var KonyMain = java.import("com.konylabs.android.KonyMain");
      var BarcodeScanning = java.import("com.google.mlkit.vision.barcode.BarcodeScanning");
      var InputImage = java.import("com.google.mlkit.vision.common.InputImage");
      var context = KonyMain.getActivityContext();
      var uri = Uri.parse(rawbytes.getResourcePath());
      var scanner = BarcodeScanning.getClient();
    } catch (setupError) {
      onNotFound("setup:ERR " + setupError);
      return;
    }

    function loadOriginal() {
      if (original === null) {
        var stream = context.getContentResolver().openInputStream(uri);
        try {
          original = BitmapFactory.decodeStream(stream);
        } finally {
          try { stream.close(); } catch (ignore) {}
        }
      }
      return original;
    }

    function scaled(src, maxSide) {
      var w = src.getWidth(), h = src.getHeight();
      var ratio = Math.min(1, maxSide / Math.max(w, h));
      if (ratio >= 1) { return src; }
      return Bitmap.createScaledBitmap(src, Math.max(1, Math.round(w * ratio)), Math.max(1, Math.round(h * ratio)), true);
    }

    var passes = [
      { name: "file", build: function () { return InputImage.fromFilePath(context, uri); } },
      { name: "max1600", build: function () { return InputImage.fromBitmap(scaled(loadOriginal(), MAX_LARGE), 0); } },
      { name: "center60", build: function () {
          var src = loadOriginal();
          var w = src.getWidth(), h = src.getHeight();
          var cw = Math.round(w * 0.6), ch = Math.round(h * 0.6);
          var crop = Bitmap.createBitmap(src, Math.round((w - cw) / 2), Math.round((h - ch) / 2), cw, ch);
          return InputImage.fromBitmap(scaled(crop, MAX_LARGE), 0);
        } },
      { name: "max1024", build: function () { return InputImage.fromBitmap(scaled(loadOriginal(), MAX_SMALL), 0); } }
    ];

    function sizeNote() {
      return original ? " bitmap=" + original.getWidth() + "x" + original.getHeight() : "";
    }

    function finish(found, value, passName) {
      if (finished) { return; }
      finished = true;
      var note = sizeNote();
      try { if (original !== null && !original.isRecycled()) { original.recycle(); } } catch (ignore) {}
      if (found) {
        kony.print("FONEPAY-DIAG gallery QR decoded by pass " + passName + " (" + trail.join(" ") + ")" + note);
        onDecoded(value, passName);
      } else {
        onNotFound(trail.join(" ") + note);
      }
    }

    function run(i) {
      if (i >= passes.length) { finish(false); return; }
      var pass = passes[i];
      var image = null;
      try {
        image = pass.build();
      } catch (buildError) {
        trail.push(pass.name + ":ERR " + buildError);
        run(i + 1);
        return;
      }
      try {
        var Success = java.newClass("QrGalleryPassSuccess" + i, "java.lang.Object",
          ["com.google.android.gms.tasks.OnSuccessListener"], {
            onSuccess: function (barcodes) {
              var value = null;
              try {
                for (var b = 0; barcodes && b < barcodes.size() && !value; b++) {
                  var raw = barcodes.get(b).getRawValue();
                  if (raw !== null && raw !== undefined && String(raw).length > 0) { value = String(raw); }
                }
              } catch (readError) {
                trail.push(pass.name + ":READERR " + readError);
              }
              if (value) {
                trail.push(pass.name + "=hit");
                finish(true, value, pass.name);
              } else {
                trail.push(pass.name + "=0");
                run(i + 1);
              }
            }
          });
        var Failure = java.newClass("QrGalleryPassFailure" + i, "java.lang.Object",
          ["com.google.android.gms.tasks.OnFailureListener"], {
            onFailure: function (e) {
              trail.push(pass.name + ":FAIL " + (e && e.getMessage ? e.getMessage() : e));
              run(i + 1);
            }
          });
        scanner.process(image).addOnSuccessListener(new Success()).addOnFailureListener(new Failure());
      } catch (processError) {
        trail.push(pass.name + ":ERR " + processError);
        run(i + 1);
      }
    }

    run(0);
  },
   invokeUploadQrForIos:function(){
	   try{
var querycontext = {
    mimeType:"image/*"
};
kony.print("------querycontext------------"+querycontext);
kony.phone.openMediaGallery(this.onSelectionCallback, querycontext);
}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa invokeUploadQrForIos*********************************"+e);
		}
},
onSelectionCallback:function(rawbytes, permStatus, mimeType){
try{
 var self=this;
    kony.print("-----rawbytes---------"+rawbytes);
    kony.print("-----permStatus---------"+permStatus);
    kony.print("-----mimeType---------"+mimeType);
    var qrCodeFramework = objc.import("QRCodeFramework");
    kony.print("-----imageSelector---------"+qrCodeFramework);
    var uiApplication = objc.import("UIApplication");
    kony.print("-----uiApplication---------"+uiApplication);
    var rootViewController = uiApplication.sharedApplication().keyWindow.rootViewController;
    kony.print("-----rootViewController---------"+rootViewController);
    networkInstance = qrCodeFramework.alloc().jsinit();
    kony.print("-----networkInstance---------"+networkInstance);
    kony.print("-----networkInstance.processBase64QRImageCompletion"+-networkInstance.processBase64QRImageCompletion);
    if (rawbytes !== null) {
         var base64String= kony.convertToBase64(rawbytes);
         kony.print("-------base64String----------"+base64String);
         networkInstance.processBase64QRImageCompletion(base64String,function(qrCodeData,error) {
            if (error) {
                    self.__fpd = ""; self.fpDiag("G ios decodeError=" + error);
                    self.onQRCustomError();
            }    else {
                               self.onQRScan(qrCodeData);
            }
            });
        }    else if (permStatus == kony.application.PERMISSION_DENIED) {
       applicationManager.getPresentationUtility().Alert("PERMISSION_DENIED"); 
        }
}catch(e){
    kony.print("Error in onSelectionCallback:: "+e);
}
},
onSuccess: function () {
      this.showQR();
    },
    showQR: function (accData) {
		try{
      kony.print("showQR");
	  var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
      var navMan = applicationManager.getNavigationManager();
	  var accNum
	  if(accData){
		    accNum= accData;
	  }
	  else{
	 accNum= applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;	  
	  }
	  var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	  var account=accounts.filter(function(acc){
		if(acc.accountID==accNum)
			return acc;
	});
	if(account.length<1){
		account=accounts.filter(function(account) {
                return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom == "1" && account.currencyCode != "USD";
            });
	}
      var params = {};
      var evalStr;
	  var processedAccData=qrPresentationController.processAccountsData(account);
	  this.view.lblAccountName.text=processedAccData[0].accountName;
	  this.view.lblBalance.text=processedAccData[0].availableBalance;
	  this.view.lblAccountNumber.text=processedAccData[0].accountID;
	  this.view.lblAccountType.text=processedAccData[0].productId;
	  this.view.flxChooseAccount.forceLayout();
	  this.view.flxShareAccDetailsQrMain.forceLayout();
      /*params3 = {
        "accountNumber": accNum,
        "accountName": account[0].accountName,
        "bankCode": "HIMANPKA"
      }*/
	  params=this.generateQRData(account[0]);
      kony.print("qrShare Details" + JSON.stringify(params));
      //var qrJsonObj = JSON.stringify(params3);
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
         evalStr = "makeDefaultQRCode('" + params + "');";
      } else {
         evalStr = "makeDefaultQRCodeiOS('" + params + "');";
      }
      kony.print(evalStr);
      this.view.brwsrQRimg.evaluateJavaScript(evalStr);
		}catch(e){
			kony.print("Error in SHow QR"+e);
		}
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
	generateQRData:function(account) {
		var scope=this;
  const accountNumber = account.accountID || '';
  const accountName = account.accountName || '';
  const currencyCode = account.currencyCode || '';
  const categoryId = account.categoryId || '';
  if (!accountNumber.trim()) return '';
  try {
    const config =scope.getConfig();
    const message = scope.validateAccount(categoryId, currencyCode, config);
    if (message) return message;
    const format = scope.getPersonalQRFormat();
    kony.print("PersonalQR: PERSONAL_QR_FORMAT resolved to [" + format + "]");
    if (format !== 'EMVCO') {
      return scope.generateQRJson(accountName, accountNumber);
    }
    const request = scope.buildQRRequest(accountName, accountNumber, config);
    const payload = scope.buildEMVCoPayload(request);
    return payload;
  } catch (e) {
    console.error('Exception occurred while generating QR:', e);
    return 'Exception occurred while generating QR';
  }
},
validateAccount:function(categoryId, currencyCode, config) {
	var scope=this;
  if (!categoryId.trim() || !currencyCode.trim()) {
    return scope.generateQRJson('Unknown', 'Unknown');
  }
  if (currencyCode.trim().toUpperCase() !== 'NPR') {
    return 'Fund Transfer allowed on NPR Accounts only';
  }
  const restrictedCategories = config.RestrictedCategories || {};
  return restrictedCategories[categoryId] || null;
},
buildQRRequest:function (accountName, accountNumber, config) {
  return {
    merchantAccountInfo: config.MerchantAccountInfo || '',
    merchantCategoryCode: config.MerchantCategoryCode || '',
    transactionCurrency: config.TransactionCurrency || '',
    countryCode: config.CountryCode || '',
    customerName: accountName,
    merchantCity: config.MerchantCity || '',
    billNumber: config.BillNumber || '',
    branchCode: config.BranchCode || '',
    accountNumber: accountNumber,
    transactionCategory: config.TransactionCategory || ''
  };
},
generateQRJson:function (accountName, accountNumber) {
  return JSON.stringify({
    accountName: accountName,
    accountNumber: accountNumber,
    bankCode: 'HIMANPKA'
  });
},
 buildEMVCoPayload:function(r) {
	 try{
	 var scope=this;
  let sb = '';
  sb += scope.tag('00', '01') + scope.tag('01', '11');
  sb += scope.tag('29', '0028' + r.merchantAccountInfo);
  sb += scope.tag('52', r.merchantCategoryCode);
  sb += scope.tag('53', r.transactionCurrency);
  sb += scope.tag('58', r.countryCode);
  sb += scope.tag('59', r.customerName);
  sb += scope.tag('60', r.merchantCity);
  const tag62 = scope.tag('01', r.billNumber) +
                scope.tag('03', r.branchCode) +
                scope.tag('07', r.accountNumber) +
                scope.tag('08', r.transactionCategory);
  sb += scope.tag('62', tag62);
  const payload = sb + '6304';
  sb += '6304' + scope.calculateCRC16(payload);
  return sb;
   }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa buildEMVCoPayload*********************************"+e);
		}
},
tag:function(id, value) {
  return id + value.length.toString().padStart(2, '0') + value;
},
calculateCRC16:function (input) {
    try{
  let crc = 0xFFFF;
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  crc &= 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa calculateCRC16*********************************"+e);
		}
},
getConfig:function () {
  var configManager=applicationManager.getConfigurationManager();
  return JSON.parse(configManager.EMVQR_PARAMS);
},
getPersonalQRFormat:function () {
  try {
    var configManager = applicationManager.getConfigurationManager();
    var format = configManager.PERSONAL_QR_FORMAT;
    if (kony.sdk.isNullOrUndefined(format) || !String(format).trim()) {
      return 'JSON';
    }
    return String(format).trim().toUpperCase();
  } catch (e) {
    kony.print("PersonalQR: unable to read PERSONAL_QR_FORMAT, defaulting to JSON - " + e);
    return 'JSON';
  }
},
    populateCardData: function (accData) {
		try{
      var navMan = applicationManager.getNavigationManager();
      var context = navMan.getCustomInfo("frmAccountDetails");
	  res = navMan.getCustomInfo("DashboardCardImg");
		this.view.imgCardMain.src=res;
	 if(accData){
		    accNum= accData;
	  }
	  else{
	 accNum= applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;	  
	  }
	  var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	  var account=accounts.filter(function(acc){
		if(acc.accountID==accNum)
			return acc;
	});
		if(account.length<1){
		account=accounts.filter(function(account) {
                return (account.accountStatus === "ACTIVE" || account.accountStatus === "CLOSURE_PENDING") && account.supportTransferFrom == "1" && account.currencyCode != "USD";
            });
	}
      if (accNum !== undefined && accNum !== "" && accNum !== null) {
       var accName = account[0].accountName;
        var accNumber = accNum;
        var accType = account[0].accountType;
        var branch = account[0].bankName;
		this.view.flxDetails5.setVisibility(true);
        var bank = kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue");
		this.view.lblBank.text=kony.i18n.getLocalizedString("i18n.unified.branchName");
		this.view.lblBranch.text=kony.i18n.getLocalizedString("i18n.mb.qr.bankcode");
        var branchCode = "HIMANPKA";
        this.view.lblAccNameValue.text = accName;
        this.view.lblAccNoValue.text = accNumber;
        this.view.lblAccTypeValue.text = accType;
        this.view.lblBankValue.text = branch;
        this.view.lblBranchValue.text = branchCode;
        this.view.lblBranchCodeValue.text = branchCode;
      }
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa populateCardData*********************************"+e);
		}
    },
    textShare: function () {
		try{
      var accName = this.view.lblAccNameValue.text;
      var accNumber = this.view.lblAccNoValue.text;
      var accType = this.view.lblAccTypeValue.text;
      var branch = this.view.lblBankValue.text;
      var branchCode = this.view.lblBranchCodeValue.text;
      var titleName = kony.i18n.getLocalizedString("kony.mb.Accounts.Name");
      var titleAccNo = kony.i18n.getLocalizedString("kony.mb.Accounts.AccountNo");
      var titleAccType = kony.i18n.getLocalizedString("kony.mb.Accounts.AccountType");
      var titleAccBank = kony.i18n.getLocalizedString("kony.mb.Accounts.Bank");
      var titleAccBranch = kony.i18n.getLocalizedString("i18n.unified.branchName");
      var titleAccBranchCode = kony.i18n.getLocalizedString("i18n.qrpayments.BankCode")+":";
      var bankValue = kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue");
      var title = kony.i18n.getLocalizedString("kony.mb.Accounts.ShareDetails");
      var accountDetails = kony.i18n.getLocalizedString("kony.mb.accdetails.title");
      var subject = accountDetails + " - " + accNumber;
      var accDetails = title + '\n' + '\n' + titleName + " " + accName + '\n' + titleAccNo + " " + accNumber + '\n' + titleAccType + " " + accType + '\n' + titleAccBank + " " + bankValue + '\n' + titleAccBranch + " " + branch + '\n' + titleAccBranchCode + " " + branchCode;
      kony.print(accDetails);
      this.shareText(accDetails, subject);
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa textShare*********************************"+e);
		}
    },
    qrShare: function () {
      this.shareQRImage();
    },
    flxBackOnClick: function () {
      var navMan = applicationManager.getNavigationManager();
      navMan.goBack();
    },
    goBack: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmAccountDetails");
    },
    shareText: function (shareBody, shareSubject) {
		try{
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.shareTextAndroid(shareBody, shareSubject);
      }
      else {
        this.shareTextIos(shareBody, shareSubject);
      }
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa shareText*********************************"+e);
		}
    },
    shareTextAndroid: function (shareBody, shareSubject) {
		try{
      var Intent = java.import("android.content.Intent");
      var intent = new Intent(Intent.ACTION_SEND);
      intent.setType("text/plain");
      intent.putExtra(Intent.EXTRA_SUBJECT, shareSubject);
      intent.putExtra(Intent.EXTRA_TEXT, shareBody);
      var KonyMain = java.import("com.konylabs.android.KonyMain");
      var contextObject = KonyMain.getActContext();
      contextObject.startActivity(Intent.createChooser(intent, "Share Via"));
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa shareTextAndroid*********************************"+e);
		}
    },
    shareTextIos: function (shareBody, shareSubject) {
		try{
      var shareFramework = objc.import("ShareFramework");
      var uiApplication = objc.import("UIApplication");
      var rootViewController = uiApplication.sharedApplication().keyWindow.rootViewController;
      networkInstance = shareFramework.alloc().jsinit();
      var subject = shareSubject;
      var message = shareBody;
      if (networkInstance && rootViewController) {
        networkInstance.shareTextWithSubjectMessageFromViewController(subject, message, rootViewController);
      } else {
        kony.print("Error: Unable to initialize ShareFramework or get root view controller.");
      }
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa shareTextIos*********************************"+e);
		}
    },
    shareQRImage: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.shareQrImageAndroid();
      }
      else {
        this.shareQrImageIos();
      }
    },
    shareQrImageIos: function () {
		try{
      var self = this;
      this.view.brwsrQRimg.evaluateJavaScript("getQRImgSrc();", function (base64Data, error) {
        if (error) {
          kony.print("Error getting QR image: " + JSON.stringify(error));
          return;
        }
        if (base64Data && base64Data.includes(",")) {
          self.imgDetails = base64Data;
          var imgBase64 = self.imgDetails.split(",")[1];
          imgBase64 = imgBase64.replace(/['"]+/g, '');
          kony.print("-----imageBase64----------" + imgBase64);
          var qrScannerFramework = objc.import("QRScannerFramework");
          var networkInstance = qrScannerFramework.alloc().jsinit();
          if (networkInstance && networkInstance.shareImageBase64) {
            networkInstance.shareImageBase64(imgBase64);  // Share the image using Base64
            kony.print("QR Code shared successfully.");
          } else {
            kony.print("Error: networkInstance or shareImageBase64 method is undefined.");
          }
        }
        else {
          kony.print("Base64 image invalid or not ready");
          this.iosCheck();
        }
      });
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa shareQrImageIos*********************************"+e);
		}
    },
    shareQrImageAndroid: function () {
		try{
      var filename = "accountdetailsqr.png";
      var imgDetails = this.view.brwsrQRimg.evaluateJavaScript("getQRImgSrc();");
      var imgBase64 = imgDetails.split(",")[1];
      imgBase64 = imgBase64.replace(/['"]+/g, '');
      kony.print("imgDetails :" + imgBase64);
      kony.print("imgBytes :" + imgBytes);
      var imgBytes = kony.convertToRawBytes(imgBase64);
      this.androidCheck(imgBytes);
	  }catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa shareQrImageAndroid*********************************"+e);
		}
    },
    iosCheck : function(){
       this.showErrorPopup();
    },
    showErrorPopup : function () {
     var basicConfig={
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("i18n.HBL.TryAgainLater"),
        "alertHandler": this.alertCallback2.bind(this),
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
        };
        var custConfig = {hideCloseButton : true, disableTouchDismiss : true};
		    applicationManager.getPresentationUtility().CustomAlert(basicConfig, {}, custConfig);
    },
    alertCallback2 : function () {
    },
    androidCheck: function (fileBytes) {
      var self = this;
      var filename = "hblqrImg" + ".jpg";
      var mainloc = kony.io.FileSystem.getDataDirectoryPath();
      var sharedDir = mainloc + "/images";
      var filePath = sharedDir + "/" + filename;
      var options = {
        isAccessModeAlways: true
      };
      var result = kony.application.checkPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, options);
      shareEvent();
      function saveImageToFile(rawbytes) {
        let mainloc = kony.io.FileSystem.getDataDirectoryPath();
        let sharedDir = mainloc + "/images"; // Must match filepaths.xml
        let fileName = "image_" + new Date().getTime() + ".jpg";
        let filePath = sharedDir + "/" + fileName;
        try {
          var dir = new kony.io.File(sharedDir);
          if (!dir.exists()) {
            dir.createDirectory(); // Create directory if it doesn't exist
          } else {
            dir.remove(true);
          }
          var file = new kony.io.File(filePath);
          if (file.write(rawbytes) !== null) {
            kony.print("Image saved successfully at: " + filePath);
            return filePath;
          } else {
            kony.print("Failed to write image to file.");
          }
        } catch (err) {
          kony.print("Error while writing image to file: " + err.message);
        }
        return null;
      }
      function permissionGranted() {
        try {
          var destinationDirectory = new kony.io.File(sharedDir);
          if (!destinationDirectory.exists()) {
            destinationDirectory.createDirectory();
          }
          else {
            destinationDirectory.remove(true);
          }
          kony.print("filePath : " + filePath);
          var destinationFilePath = new kony.io.File(filePath);
          if (destinationFilePath.exists()) {
            destinationFilePath.remove();
          }
          var createdFile = destinationFilePath.createFile();
          if (!createdFile) {
            kony.print("Unable to create file");
          }
          var write = destinationFilePath.write(fileBytes);
          if (!write) {
            kony.print("Unable to write file");
          } else {
            shareEvent(filePath);
          }
        } catch (err) {
          kony.print("--------exception " + err);
        }
      }
      function shareImageAndroid(filePath) {
		  try{
        kony.print("filePath : " + filePath);
        var KonyMain = java.import("com.konylabs.android.KonyMain");
        var contextObject = KonyMain.getActContext();
        var Intent = java.import("android.content.Intent");
        var Uri = java.import("android.net.Uri");
        var File = java.import("java.io.File");
        var share = new Intent(Intent.ACTION_SEND);
        share.setType("image/*");
        share.putExtra(Intent.EXTRA_STREAM, Uri.parse(filePath));
        contextObject.startActivity(Intent.createChooser(share, "Share Via"));
		}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa shareImageAndroid*********************************"+e);
		}
      }
      function shareEvent() {
        var filePath = saveImageToFile(fileBytes);
        if (!filePath) {
          kony.print("Error saving the image!");
          return;
        }
        try {
          var Intent = java.import('android.content.Intent');
          var URI = java.import("android.net.Uri");
          var File = java.import("java.io.File");
          var FileProvider = java.import("androidx.core.content.FileProvider");
          var KonyMain = java.import('com.konylabs.android.KonyMain');
          var context = KonyMain.getActivityContext();
          var file = new File(filePath);
          var KonyMain = java.import("com.konylabs.android.KonyMain");
          var authority = KonyMain.getAppContext().getPackageName() + ".provider"; // Ensure it matches AndroidManifest.xml
          var contentUri = FileProvider.getUriForFile(context, authority, file);
          if (!contentUri) {
            kony.print("Error generating content URI!");
            return;
          }
          var shareIntent = new Intent();
          shareIntent.setAction(Intent.ACTION_SEND);
          shareIntent.setType("image/*");
          shareIntent.putExtra(Intent.EXTRA_STREAM, contentUri);
          shareIntent.putExtra(Intent.EXTRA_SUBJECT, "QR Code Attachment");
          shareIntent.putExtra(Intent.EXTRA_TEXT, "Please find the attached QR code.");
          shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
          context.startActivity(Intent.createChooser(shareIntent, "Share QR Code"));
        } catch (error) {
          kony.print("Error sharing image: " + error.message);
        }
      }
    },
    deleteFile: function (filePath) {
      try {
        var file = new kony.io.File(filePath);
        if (file.exists()) {
          file.remove();
          kony.print("Temporary file deleted: " + filePath);
        }
      } catch (err) {
        kony.print("Error deleting file: " + err.message);
      }
    },
	onRowSelection:function(row){
		try{
	  var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
	var transactionManager = applicationManager.getTransactionManager();
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
		transactionManager.setTransactionAttribute("SelectedAccountData", acc[0].accountID);
		this.showQR(acc[0].accountID);
		this.populateCardData(acc[0].accountID);
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
   SetTransactionHistory:function(){
	   try{
	  var scope=this;
	  var historyData= applicationManager.getNavigationManager().getCustomInfo("QRHistory");
	if(historyData.length==0||!historyData){
		this.view.flxNoRecords.setVisibility(true);
		this.view.segTransactions.setVisibility(false);
	}
	else{
	  scope.view.flxNoRecords.setVisibility(false);
		scope.view.segTransactions.setVisibility(true);
	 /* var widgetDataMap={
		  "lblTransaction":"lblTransaction",
		  "lblTransactionAmount":"lblTransactionAmount",
		  "lblDate":"lblDate",
		  "imgIndicator":"imgIndicator",
		  "flxWrapper":"flxWrapper"
	  };*/
	  var widgetDataMap={"lblField1":"lblField1","lblField2":"lblField2","lblField3":"lblField3","lblField4":"lblField4"};
	  scope.view.segTransactions.rowTemplate="flxTransfersRowTemplate";
	  var segData=[];
	  for(i=0;i<historyData.length;i++){
		 segData.push({
			 "lblField2":historyData[i].fromAccountCurrency+" "+historyData[i].amount,
			 "lblField1":historyData[i].toAccountName+"..."+historyData[i].toAccountNumber.substr(historyData[i].toAccountNumber.length - 4),
			 "lblField3":applicationManager.getFormatUtilManager().getFormatedDateString(new Date(historyData[i].createdts),"d/m/Y"),
			 "lblField4":{"isVisible":false}
		 });
	  }
	  this.view.segTransactions.widgetDataMap=widgetDataMap;
	  this.view.segTransactions.setData(segData);
	}
	}catch(e){
		applicationManager.getPresentationUtility().dismissLoadingScreen();
		applicationManager.getPresentationUtility().Alert("Something went wrong, please try again later");
		kony.print("**********************error in load esewa SetTransactionHistory*********************************"+e);
		}
  },
  resetUI:function(){
	  try{
	  this.view.lblBalance.setVisibility(false);
	  this.view.flxMainContainer.setVisibility(true);
	  this.view.flxShare.setVisibility(false);
	  this.view.flxRecentTransactions.setVisibility(false);
    this.view.lblRecent.skin = "sknFontFFFFFSemioild";
    this.view.lblScan.skin = "sknFont851A1CSemioild";
    this.view.lblMycode.skin = "sknFontFFFFFSemioild";
    this.view.flxTabmover.left = "33%";
	  }catch(e){
		  kony.print("***********Error in resetUI**********"+e);
	  }
  },
  recentOnlick:function() {
	  try{
		   var self = this;
var navMan=applicationManager.getNavigationManager();
var isQrhistrySuccess=navMan.getCustomInfo("isQRHistorySuccess");
this.view.customHeader.lblLocateUs.text=kony.i18n.getLocalizedString("i18n.mb.qr.recenttrans");
this.view.title=kony.i18n.getLocalizedString("i18n.mb.qr.recenttrans");
    function MOVE_ACTION_a700a803b9154979bd1b41863ea019f6_Callback() {
		
		 self.view.lblRecent.skin = "sknFont851A1CSemioild";
    self.view.lblScan.skin = "sknFontFFFFFSemioild";
    self.view.lblMycode.skin = "sknFontFFFFFSemioild";
    self.view.flxShare.setVisibility(false);
    self.view.flxMainContainer.setVisibility(false);
    self.view.flxRecentTransactions.setVisibility(true);
    //self.view.flxShare.right = "0%";
	self.SetTransactionHistory()
  }
	if(isQrhistrySuccess){
    self.view.flxTabmover.animate(
    kony.ui.createAnimation({
        "100": {
            "left": "1%",
            "stepConfig": {
                "timingFunction": kony.anim.EASE
            }
        }
    }), {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.25
    }, {
        "animationEnd": MOVE_ACTION_a700a803b9154979bd1b41863ea019f6_Callback
    });
	}
	else{
		applicationManager.getPresentationUtility().Alert("History Being loaded, please try again later"); 
	}
	  }catch(e){
		  kony.print("Error in Recent onlick"+e);
	  }
},
getBankName:function(bankCode){
	try{
		var navMan=applicationManager.getNavigationManager()
		var bankData=navMan.getCustomInfo("BankDetails");
        if(bankCode=="HIMANPKA"){
            return kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue");
        }
		if(bankCode&&bankData.length>0){
			if(bankCode.indexOf("MER")!=-1){
			var toBankCode=Number(bankCode.substring(bankCode.indexOf("MER")-4,bankCode.indexOf("MER")));
            if(toBankCode=="701"||toBankCode=="0701")
            {
             return kony.i18n.getLocalizedString("kony.mb.Accounts.BankValue");   
            }
			var toBank=bankData.filter(function(bank){
				if(bank.bankCode==toBankCode){
					return bank.bankName;
				}
			});
			return toBank[0].bankName;
		}
		else{
			var toBank=bankData.filter(function(bank){
				if(bank.bankSwift==bankCode){
					return bank.bankName;
				}
			});
			return toBank[0].bankName;
		}
		}
		else{
			 //applicationManager.getPresentationUtility().Alert("Please try again later");
		}
	}catch(e){
		kony.print("Error in get bank name"+e);
	}
},
});