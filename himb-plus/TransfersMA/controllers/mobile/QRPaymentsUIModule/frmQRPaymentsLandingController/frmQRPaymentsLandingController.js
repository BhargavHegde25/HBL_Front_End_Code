define({ 

  //invoked everytime when navigated to form
  preShow: function(){
    var scope = this;
    this.initActions();
    var configManager = applicationManager.getConfigurationManager();
	var navMan=applicationManager.getNavigationManager();
    var MenuHandler =  applicationManager.getMenuHandler();
	var TransHistory= navMan.getCustomInfo("QRHistory")
    this.view.customHeader.flxBack.isVisible = false;
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
      this.view.flxFooterMenu.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
      this.view.flxFooterMenu.isVisible = false;
    }     
    MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUQRPAYMENT);
	if(TransHistory.length!=0&&TransHistory){
		scope.SetTransactionHistory(TransHistory);
	}
	else{
		scope.view.flxNoRecords.setVisibility(true);
		scope.view.segTransactions.setVisibility(false);
	}
  },
  //defined actions
  initActions: function(){
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
	var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    scope.view.flxScanAndPay.onClick = function(){
      var defaultAcc = applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;
      if(qrPresentationController.isEmptyOrNullOrUndefined(defaultAcc)){
        scope.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
      } else {
        qrPresentationController.getLatestBalance(defaultAcc);
        qrPresentationController.getProcessedDefaultAccDetails(defaultAcc);
      }
      navMan.setEntryPoint("QRFlow","frmQrScan");
    };
    this.view.flxUploadQR.onClick=function(){
      var defaultAcc = applicationManager.getUserPreferencesManager().getUserObj().default_from_account_qr;
      if(qrPresentationController.isEmptyOrNullOrUndefined(defaultAcc)){
        scope.bindGenericError(kony.i18n.getLocalizedString("kony.error.StandardErrorMessage")); 
      } else {
        qrPresentationController.getLatestBalance(defaultAcc);
        qrPresentationController.getProcessedDefaultAccDetails(defaultAcc);
        if(kony.os.deviceInfo().name != "iPhone"){
		scope.invokeUploadQr();
        }
        else{
            scope.invokeUploadQrForIos();
        }
      }
      navMan.setEntryPoint("QRFlow","frmQRLanding");
    };
    qrPresentationController.clearTransObj();
    this.view.onDeviceBack = this.navigateCustomBack;
  },
  onNavigate:function(){
    // Footer Menu
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      var footerMenuUtility = require("FooterMenuUtility");
      this.footerMenuUtility =
        footerMenuUtility.getFooterMenuUtilityInstance();
      var cm = applicationManager.getConfigurationManager();
      this.footerMenuUtility.entitlements = {
        features: cm.getUserFeatures(),
        permissions: cm.getUserPermissions(),
      };
      this.footerMenuUtility.scope = this;
      this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
    }
  },
  
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  },
  navigateCustomBack: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo({"appName" : "HomepageMA", 
                       "friendlyName": "frmHBLUnifiedDashboard" });
  },
  SetTransactionHistory:function(historyData){
	  var scope=this;
	  scope.view.flxNoRecords.setVisibility(false);
		scope.view.segTransactions.setVisibility(true);
	  var widgetDataMap={
		  "lblTransaction":"lblTransaction",
		  "lblTransactionAmount":"lblTransactionAmount",
		  "lblDate":"lblDate",
		  "imgIndicator":"imgIndicator"
	  }
	  var segData=[];
	  for(i=0;i<historyData.length;i++){
		 segData.push({
			 "lblTransactionAmount":historyData[i].fromAccountCurrency+" "+historyData[i].amount,
			 "lblTransaction":historyData[i].toAccountName+"..."+historyData[i].toAccountNumber.substr(historyData[i].toAccountNumber.length - 4),
			 "lblDate":applicationManager.getFormatUtilManager().getFormatedDateString(new Date(historyData[i].createdts),"d/m/Y")
		 });
	  }
	  this.view.segTransactions.widgetDataMap=widgetDataMap;
	  this.view.segTransactions.setData(segData);
  },
  invokeUploadQr:function(){
    var Uri = java.import("android.net.Uri");
    var ContentResolver = java.import("android.content.ContentResolver");
    var BitmapFactory = java.import("android.graphics.BitmapFactory");
    var KonyMain = java.import("com.konylabs.android.KonyMain");
    var BarcodeScanner = java.import("com.google.mlkit.vision.barcode.BarcodeScanning");
    var InputImage = java.import("com.google.mlkit.vision.common.InputImage");
    var self =this;
    function callBack(rawbytes , permStatus , mimeType){
       if (permStatus === kony.application.PERMISSION_DENIED) {
                //alert("Permission Denied! Go to Settings and allow access.");
				applicationManager.getPresentationUtility().Alert("Permission Denied! Go to Settings and allow access.");
                return;
            }
            if (!rawbytes) {
                //alert("No image selected or rawbytes is null.");
				 applicationManager.getPresentationUtility().Alert("No image selected or rawbytes is null.");
                return;
            }
    try {
                var context = KonyMain.getActivityContext();
                var contentResolver = context.getContentResolver();
                var uri = Uri.parse(rawbytes.getResourcePath());
                var inputStream = contentResolver.openInputStream(uri);
                var bitmap = BitmapFactory.decodeStream(inputStream);
                var inputImage = InputImage.fromBitmap(bitmap, 0);
                var scanner = BarcodeScanner.getClient();
                var OnSuccessListener = java.newClass("OnSuccessListener", "java.lang.Object", ["com.google.android.gms.tasks.OnSuccessListener"], {
                    onSuccess: function(barcodes) {
                    if (barcodes.size() > 0) {
                        var barcode = barcodes.get(0);
                        var qrData = barcode.getRawValue();
                               var controller = applicationManager.getPresentationUtility().getController('frmQRScan', true);
                               controller.onQRScan(qrData);
                        kony.print("Decoded QR Code: " + qrData);
                        } else {
                            self.onQRCustomError();
    }
    }
                });
                var OnFailureListener = java.newClass("OnFailureListener", "java.lang.Object", ["com.google.android.gms.tasks.OnFailureListener"], {
                    onFailure: function(e) {
                        kony.print("QR code decoding failed: " + e.getMessage());
    }
                });
                scanner.process(inputImage)
                .addOnSuccessListener(new OnSuccessListener())
                .addOnFailureListener(new OnFailureListener());
            } catch (error) {
                kony.print("Error Qr decode" + error.message);
    }
    }
   let status =  kony.phone.openMediaGallery(callBack,{mimeType:"image/*"});
  },
    onQRCustomError: function () {
    var scope = this;
    var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.qrpayments.VerificationFailed"),
      "message": kony.i18n.getLocalizedString("i18n.qrpayments.qrNotSupported"),
     
      "yesLabel": kony.i18n.getLocalizedString("i18n.qrpayments.Retry"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);   
  },
    invokeUploadQrForIos:function(){
var querycontext = {
    mimeType:"image/*"
};
kony.print("------querycontext------------"+querycontext);
kony.phone.openMediaGallery(this.onSelectionCallback, querycontext);
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
                    self.onQRCustomError();
            }    else {
                var controller = applicationManager.getPresentationUtility().getController('frmQRScan', true);
                               controller.onQRScan(qrCodeData);
            }
            });
        }    else if (permStatus == kony.application.PERMISSION_DENIED) {
        //alert("PERMISSION_DENIED");
		applicationManager.getPresentationUtility().Alert("PERMISSION_DENIED");
        }
}catch(e){
    kony.print("Error in onSelectionCallback:: "+e);
}
},
});