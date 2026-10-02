define(['CommonUtilities'], function (CommonUtilities) {
  return {
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
    },

    preShow: function () {
      this.populateCardData();
      this.view.flxQrShare.onClick = this.qrShare;
      this.view.flxTextShare.onClick = this.textShare;
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.brwsrQRimg.bounces = false;
      this.view.brwsrQRimg.onSuccess = this.onSuccess;
      this.setTitleBarVisibility();
    },
    setTitleBarVisibility: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.isVisible = false;
      }
      else {
        this.view.flxHeader.isVisible = true;
      }
    },

    postShow: function () {

    },

    onSuccess: function () {
      this.showQR();
    },

    showQR: function () {
      kony.print("showQR");
      var navMan = applicationManager.getNavigationManager();
      var context = navMan.getCustomInfo("frmAccountDetails");
      var params3 = {};
      var evalStr;
      params3 = {
        "accountNumber": context.selectedAccountData.accountID,
        "accountName": context.selectedAccountData.accountName,
        "bankCode": "HIMANPKA"
      }
	   var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	  var account=accounts.filter(function(acc){
		if(acc.accountID==context.selectedAccountData.accountID)
			return acc;
	});
      kony.print("qrShare Details" + JSON.stringify(params3));
		var params=this.generateQRData(account[0]);
      var qrJsonObj = JSON.stringify(params);
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
         evalStr = "makeDefaultQRCode('" + params + "');";
      } else {
         evalStr = "makeDefaultQRCodeiOS('" + params + "');";
      }
      kony.print(evalStr);
      this.view.brwsrQRimg.evaluateJavaScript(evalStr);
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
    const request = scope.buildQRRequest(accountName, accountNumber, config);
    const payload = scope.buildEMVCoPayload(request);
    return payload;
  } catch (e) {
    console.error('Exception occurred while generating QR:', e);
    return 'Exception occurred while generating QR';
  }
},
getConfig:function () {
  var configManager=applicationManager.getConfigurationManager();
  return JSON.parse(configManager.EMVQR_PARAMS);
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

    populateCardData: function () {
      var navMan = applicationManager.getNavigationManager();
      var context = navMan.getCustomInfo("frmAccountDetails");
		res = navMan.getCustomInfo("DashboardCardImg");
		this.view.imgCardMain.src=res;
		var accounts=applicationManager.getAccountManager().getSavingsAndCheckingsAccounts();
	  
      if (context.selectedAccountData !== undefined && context.selectedAccountData !== "" && context.selectedAccountData !== null) {
		  
        var accName = context.selectedAccountData.accountName;
        var accNumber = context.selectedAccountData.accountID;
        var accType = context.selectedAccountData.accountType;
		var account=accounts.filter(function(acc){
		if(acc.accountID==context.selectedAccountData.accountID)
			return acc;
	});
	this.view.flxDetails5.setVisibility(true);
        var bank = account[0].bankName;
		var branchCode = "HIMANPKA";
		this.view.lblBank.text=kony.i18n.getLocalizedString("i18n.unified.branchName");
		this.view.lblBranch.text=kony.i18n.getLocalizedString("i18n.mb.qr.bankcode");
        this.view.lblAccNameValue.text = accName;
        this.view.lblAccNoValue.text = accNumber;
        this.view.lblAccTypeValue.text = accType;
        this.view.lblBankValue.text = bank;
		this.view.lblBranchValue.text=branchCode;

      }
    },

    textShare: function () {
		
		  var accName = this.view.lblAccNameValue.text;
      var accNumber = this.view.lblAccNoValue.text;
      var accType = this.view.lblAccTypeValue.text;
      var branch = this.view.lblBankValue.text;
      var branchCode = this.view.lblBranchValue.text;
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
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.shareTextAndroid(shareBody, shareSubject);
      }
      else {
        this.shareTextIos(shareBody, shareSubject);
      }
    },

    shareTextAndroid: function (shareBody, shareSubject) {
      var Intent = java.import("android.content.Intent");
      var intent = new Intent(Intent.ACTION_SEND);
      intent.setType("text/plain");
      intent.putExtra(Intent.EXTRA_SUBJECT, shareSubject);
      intent.putExtra(Intent.EXTRA_TEXT, shareBody);
      var KonyMain = java.import("com.konylabs.android.KonyMain");
      var contextObject = KonyMain.getActContext();
      contextObject.startActivity(Intent.createChooser(intent, "Share Via"));
    },

    shareTextIos: function (shareBody, shareSubject) {
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
    },
    shareQrImageAndroid: function () {
      var filename = "accountdetailsqr.png";
      var imgDetails = this.view.brwsrQRimg.evaluateJavaScript("getQRImgSrc();");
      var imgBase64 = imgDetails.split(",")[1];
      imgBase64 = imgBase64.replace(/['"]+/g, '');
      kony.print("imgDetails :" + imgBase64);
      kony.print("imgBytes :" + imgBytes);
      //var imgBytes = kony.convertToRawBytes(imgBase64);
      var imgBytes = kony.convertToRawBytes(imgBase64);
      this.androidCheck(imgBytes);
    },
    iosCheck : function(){
       this.showErrorPopup();
    },
    showErrorPopup : function () {
      //kony.ui.Alert({
      //  "alertType": constants.ALERT_TYPE_INFO,
      //  "alertTitle": "",
      //  "message": kony.i18n.getLocalizedString("i18n.HBL.TryAgainLater"),
       // "alertHandler": this.alertCallback,
      //  "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
       // }, {});
		applicationManager.getPresentationUtility().Alert({
        "alertType": constants.ALERT_TYPE_INFO,
        "alertTitle": "",
        "message": kony.i18n.getLocalizedString("i18n.HBL.TryAgainLater"),
        "alertHandler": this.alertCallback,
        "yesLabel": kony.i18n.getLocalizedString("i18n.savingsPot.ok"),
        }, {});
    },
    alertCallback : function () {
    },

    androidCheck: function (fileBytes) {
      var self = this;
      var filename = "hblqrImg" + ".jpg";
      var mainloc = kony.io.FileSystem.getDataDirectoryPath();
      var sharedDir = mainloc + "/images";
      //   var path = "/storage/emulated/0/Download/hblshare";
      //   var myFileLoc = path + "/" + filename;
      var filePath = sharedDir + "/" + filename;
      var options = {
        isAccessModeAlways: true
      };
      var result = kony.application.checkPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, options);
      shareEvent();

      /*
      if (result.status == kony.application.PERMISSION_DENIED) {
        if (result.canRequestPermission) {
          kony.application.requestPermission(kony.os.RESOURCE_EXTERNAL_STORAGE, permissionStatusCallback);
        } else {
          kony.print("--------cant request permission ");
        }
      } else if (result.status == kony.application.PERMISSION_GRANTED) {
        permissionGranted();
      } else if (result.status == kony.application.PERMISSION_RESTRICTED) {
        kony.print("------------Resource Aceess Restricted for User");
      }

      function permissionStatusCallback(response) {
        if (response.status == kony.application.PERMISSION_GRANTED) {
          permissionGranted();
        } else if (response.status === kony.application.PERMISSION_DENIED) {
          kony.print("--------permission denied ");
          }
        }
      */
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

          //var filePath = destinationDirectory.fullPath + "/" + filename;
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
      }
      function shareEvent() {
        //var self = this;
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
          // Use FileProvider to generate a content URI
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
          // Add subject and body for email
          shareIntent.putExtra(Intent.EXTRA_SUBJECT, "QR Code Attachment");
          shareIntent.putExtra(Intent.EXTRA_TEXT, "Please find the attached QR code.");
          // Grant read permission to the email app
          shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
          context.startActivity(Intent.createChooser(shareIntent, "Share QR Code"));
          // Delete the image after 60 seconds to ensure it's shared properly
          // kony.timer.schedule("deleteFileTimer", function () {
          //    // self.deleteFile(filePath);
          // }, 60, false);
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
    }

  };
});