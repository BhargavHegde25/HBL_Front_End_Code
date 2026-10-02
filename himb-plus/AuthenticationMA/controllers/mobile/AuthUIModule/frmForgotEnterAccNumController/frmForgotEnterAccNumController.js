define([], function (){ 
return {
accNum: {
"email": null,
"code": null,
"phone": null,
"dob": null,
"serviceKey": null,
"captcha": null
},
emailIDPreShow: function() {
this.resetUI();
this.renderTitleBar();
this.setFlowActions();
},
resetUI: function() {
const navManager = applicationManager.getNavigationManager();
    this.accNum = navManager.getCustomInfo("frmForgot");
    if (!this.accNum) {
        this.accNum = {
            "email": null,
            "code": null,
            "phone": null,
            "dob": null,
            "serviceKey": null,
            "captcha": null
        };
}
if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
this.view.title = kony.i18n.getLocalizedString("i18n.login.CantSignIn.Letsverifyitsyou");
}
this.view.tbxEnterAccNum.textCopyable = false;
if (this.accNum.AccNo && this.accNum.captcha) {
this.view.tbxEnterAccNum.text = this.accNum.AccNo;
this.view.tbxEnterCaptcha.text = this.accNum.captcha;
} else {
this.view.tbxEnterAccNum.text = "";
this.view.tbxEnterCaptcha.text = "";
}
this.loadCaptchaImage();
this.setContinueButtonEnableState();
this.hideErrorMessage();
},
setFlowActions: function() {
const scopeObj = this;
this.view.customHeader.flxBack.onTouchEnd = function() {
scopeObj.navigateToPreviousForm();
};
this.view.onDeviceBack = function() {
scopeObj.navigateToPreviousForm();
};
this.view.customHeader.btnRight.onClick = function() {
scopeObj.navigateToPreviousForm();
};
this.view.tbxEnterAccNum.onTextChange = function() {
scopeObj.setContinueButtonEnableState();
scopeObj.hideErrorMessage();
};
this.view.tbxEnterCaptcha.onTextChange = function() {
scopeObj.setContinueButtonEnableState();
scopeObj.hideErrorMessage();
};
this.view.imgReloadIcon.onTouchEnd = function() {
scopeObj.loadCaptchaImage();
};
scopeObj.view.btnContinue.onClick = function() {
scopeObj.verifyCaptcha();
};
},
navigateToPreviousForm: function() {
const navManager = applicationManager.getNavigationManager();
navManager.navigateTo("frmLogin")
},
navigateToNextForm: function() {
const navManager = applicationManager.getNavigationManager();
this.accNum.AccNo = this.view.tbxEnterAccNum.text;
this.accNum.captcha = this.view.tbxEnterCaptcha.text;
navManager.setCustomInfo("frmForgot", this.accNum);
this.view.tbxEnterAccNum.text = "";
this.view.tbxEnterCaptcha.text = "";
navManager.navigateTo("frmForgotEnterLastName");
},
setContinueButtonEnableState: function() {
const scopeObj = this;
let isTbxEmailNotEmpty = this.view.tbxEnterAccNum.text !== "" && this.view.tbxEnterAccNum.text !== null && this.view.tbxEnterAccNum.text !== undefined;
let isTbxCaptchalledNotEmpty = this.view.tbxEnterCaptcha.text !== "" && this.view.tbxEnterCaptcha.text !== null && this.view.tbxEnterCaptcha.text !== undefined;
if (isTbxEmailNotEmpty && isTbxCaptchalledNotEmpty && this.isValidAccountNum()) {
scopeObj.view.btnContinue.skin = "sknBtn055BAF26px";
scopeObj.view.btnContinue.setEnabled(true);
} else {
scopeObj.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
scopeObj.view.btnContinue.setEnabled(false);
}
},
isValidAccountNum: function() {
var accNumTxt = this.view.tbxEnterAccNum.text.trim();
var accLen = accNumTxt.length;
return (accLen >= 1 && accLen <= 30);
},
verifyCaptcha: function() {
applicationManager.getPresentationUtility().showLoadingScreen();
var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
this.accNum.captcha = this.view.tbxEnterCaptcha.text;
var verifyCaptchaJson = {
"serviceKey": this.accNum.serviceKey,
"captchaValue": this.accNum.captcha
};
authModule.presentationController.verifyCaptcha(verifyCaptchaJson);
},
verifyEnteredDetails: function() {
// Check whether entered Captcha is correct or not
// SuccessCallback: verifyEnteredDetailsSuccess
// FailureCallback: verifyEnteredDetailsFailure
// Following line for Demo Purpose only
this.verifyEnteredDetailsSuccess();
// Following line for Demo Purpose only
},
verifyEnteredDetailsSuccess: function() {
// TODO: Successcallback for verifyEnteredDetails()
this.navigateToNextForm();
},
verifyEnteredDetailsFailure: function() {
// TODO: FailureCallback for verifyEnteredDetails();
this.showIncorrectDetailsError();
},
showIncorrectDetailsError: function() {
this.view.lblErrorMessage.text = "Wrong Captcha Entered!";
this.view.lblErrorMessage.setVisibility(true);
},
loadCaptchaImage: function() {
// TODO: Backend Call to be made to fetch captcha Image
const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
let params = {};
authMode.presentationController.fetchCaptcha(params);
},
fetchCaptchaSuccess: function(data) {
this.view.imgCaptcha.base64 = data.encodedImage;
this.accNum.serviceKey = data.serviceKey;
this.view.imgCaptcha.width = "80%";
this.view.imgCaptcha.height = "100%";
this.view.tbxEnterCaptcha.setVisibility(true);
},
fetchCaptchaFailure: function() {
// TODO: FailureCallback for loadCaptchaImage()
this.showCaptchaFailureError();
},
showCaptchaFailureError: function() {
this.view.lblErrorMessage.text = "Error in Loading Captcha!";
this.view.lblErrorMessage.setVisibility(true);
this.view.tbxEnterCaptcha.setVisibility(false);
},
verifyCaptchaSuccess: function(data) {
this.verifyEnteredDetails();
},
verifyCaptchaFailure: function(data) {
this.loadCaptchaImage();
this.view.lblErrorMessage.text = data.errorMessage;
this.view.lblErrorMessage.setVisibility(true);
this.view.tbxEnterCaptcha.text = "";
if (data.serverErrorRes.encodedImage) {
this.accNum.serviceKey = data.serverErrorRes.encodedImage;
this.view.imgCaptcha.width = "80%";
this.view.imgCaptcha.height = "100%";
this.view.tbxEnterCaptcha.setVisibility(true);
}
},
verifyError: function(errorMessage) {
    applicationManager.getDataProcessorUtility().showToastMessageError(this,errorMessage);
//this.view.lblErrorMessage.text = errorMessage;
//this.view.lblErrorMessage.setVisibility(true);
const scopeObj = this;
},
hideErrorMessage: function() {
this.view.lblErrorMessage.setVisibility(false);
},
renderTitleBar: function() {
var deviceUtilManager = applicationManager.getDeviceUtilManager();
var isIphone = deviceUtilManager.isIPhone();
if (!isIphone) {
this.view.flxHeader.isVisible = true;
this.view.flxMainContainer.top = "56dp";
} else {
this.view.flxHeader.isVisible = false;
this.view.flxMainContainer.top = "0dp";
}
},
};
});