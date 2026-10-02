define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {

        accNum: {
            "email": null,
            "code": null,
            "phone": null,
            "dob": null,
            "serviceKey": null,
            "captcha": null
        },

        init: function () {
            var scope = this;
            var currentFormObject = kony.application.getCurrentForm();
            var currentForm = currentFormObject.id;
            applicationManager.getPresentationFormUtility().initCommonActions(scope, "YES", currentFormObject);
        },
        preShow: function () {
            this.view.postShow = this.postShow;
            var navManager = applicationManager.getNavigationManager();
            var flow = navManager.getCustomInfo("forgotPassword");
            if (flow === "true") {
                this.view.btnContinue.setEnabled(false);
                this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                this.view.txtAccountNumber.text = "";
                this.view.txtAccountHolderName.text = "";
                this.view.txtCountryCode.text = "+977";
                this.view.txtMobileNumber.text = "";
                this.view.txtEmailId.text = "";
                this.view.tbxEnterCaptcha.text = "";
            }
            this.resetUI();
            if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
                this.view.flxHeader.isVisible = true;
                this.view.flxMainScroll.top = "76dp";
            }
            else {
                this.view.flxHeader.isVisible = false;
                this.view.flxMainScroll.top = "15dp";
            }
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
            this.loadCaptchaImage();
            this.hideErrorMessage();
        },

        loadCaptchaImage: function () {
            // TODO: Backend Call to be made to fetch captcha Image
            const authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            let params = {};
            authMode.presentationController.fetchCaptcha(params);
        },
        fetchCaptchaSuccess: function (data) {
            this.view.imgCaptcha.base64 = data.encodedImage;
            this.accNum.serviceKey = data.serviceKey;
            this.view.tbxEnterCaptcha.setVisibility(true);
        },
        fetchCaptchaFailure: function () {
            this.showCaptchaFailureError();
        },

        showCaptchaFailureError: function () {
            //this.view.lblErrorMessage.text = "Error in Loading Captcha!";
            //this.view.lblErrorMessage.setVisibility(true);
            var errorMessage = "Error in Loading Captcha!";
            applicationManager.getDataProcessorUtility().showToastMessageError(this, errorMessage);
            //this.view.tbxEnterCaptcha.setVisibility(false);
        },

        verifyCaptcha: function () {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("forgotPassword", null);
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            this.accNum.captcha = this.view.tbxEnterCaptcha.text;
            var verifyCaptchaJson = {
                "serviceKey": this.accNum.serviceKey,
                "captchaValue": this.accNum.captcha
            };
            authModule.presentationController.verifyCaptcha(verifyCaptchaJson);
        },

        verifyEnteredDetails: function () {
            this.verifyEnteredDetailsSuccess();
        },

        verifyEnteredDetailsSuccess: function () {
            this.btnContinueOnClick();
        },

        btnContinueOnClick: function () {
            var self = this;
            var accountNumber = self.view.txtAccountNumber.text && self.view.txtAccountNumber.text.trim();
            var name = self.view.txtAccountHolderName.text.trim();
            var mobile = self.view.txtMobileNumber.text && self.view.txtMobileNumber.text.trim();
            var country = self.view.txtCountryCode.text && self.view.txtCountryCode.text.trim();
            var email = self.view.txtEmailId.text && self.view.txtEmailId.text.trim().toLowerCase();
            var captcha = self.view.tbxEnterCaptcha && self.view.tbxEnterCaptcha.text.trim();
            const navManager = applicationManager.getNavigationManager();
            this.accNum.AccNo = accountNumber;
            this.accNum.Name = name;
            this.accNum.captcha = captcha;
            this.accNum.code = country;
            this.accNum.phone = mobile;
            this.accNum.email = email;
            applicationManager.getPresentationUtility().showLoadingScreen();
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            navManager.setCustomInfo("frmForgot", this.accNum);
            let previousData = navManager.getCustomInfo("frmForgot");
            authModule.presentationController.verifyDOB(previousData);
        },

        verifyEnteredDetailsFailure : function () {
            this.showIncorrectDetailsError();
        },

        showIncorrectDetailsError: function () {
            //this.view.lblErrorMessage.text = "Wrong Captcha Entered!";
            //this.view.lblErrorMessage.setVisibility(true);
            var errorMessage = "Wrong Captcha Entered!";
            applicationManager.getDataProcessorUtility().showToastMessageError(this, errorMessage);
        },

        verifyCaptchaSuccess: function (data) {
            this.verifyEnteredDetails();
        },

        verifyCaptchaFailure: function (data) {
            this.view.tbxEnterCaptcha.text = "";
            var errorMessage = data.errorMessage;
            applicationManager.getDataProcessorUtility().showToastMessageError(this, errorMessage);
            this.loadCaptchaImage();
            // this.view.lblErrorMessage.text = data.errorMessage;
            // this.view.lblErrorMessage.setVisibility(true);
            if (data.serverErrorRes.encodedImage) {
                this.accNum.serviceKey = data.serverErrorRes.encodedImage;
                //this.view.imgCaptcha.width = "80%";
                //this.view.imgCaptcha.height = "100%";
                this.view.tbxEnterCaptcha.setVisibility(true);
            }
        },

        verifyError: function (errorMessage) {
            this.view.tbxEnterCaptcha.text = "";
            applicationManager.getDataProcessorUtility().showToastMessageError(this, errorMessage);
            //this.view.lblErrorMessage.text = errorMessage;
            //this.view.lblErrorMessage.setVisibility(true);
        },

        hideErrorMessage: function () {
            this.view.lblErrorMessage.setVisibility(false);
        },

        postShow: function () {
            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
            this.view.btnContinue.onClick = this.verifyCaptcha;
            this.view.txtCountryCode.onTextChange = this.showCountriesList;
            var self = this;
            this.view.imgReloadIcon.onTouchEnd = function () {
                self.loadCaptchaImage();
            };

            this.view.txtAccountNumber.onTextChange = function () {
                self.hideErrorMessage();
                self.validateFormFields();
            };

            this.view.tbxEnterCaptcha.onTextChange = function () {
                self.hideErrorMessage();
                self.validateFormFields();
            };

            this.view.txtAccountNumber.onEndEditing = function () {
                var accountNumber = self.view.txtAccountNumber.text && self.view.txtAccountNumber.text.trim();
                self.hideErrorMessage();
                self.validateAccountNumber(accountNumber);
            };

            this.view.txtAccountHolderName.onTextChange = function () {
                self.hideErrorMessage();
                self.validateFormFields();
            };
            this.view.txtAccountHolderName.onEndEditing = function () {
                self.hideErrorMessage();
                var name = self.view.txtAccountHolderName.text && self.view.txtAccountHolderName.text.trim().replace(/\s+/g, '');
                self.validateAccountHolderName(name);
            };

            this.view.txtMobileNumber.onTextChange = function () {
                self.hideErrorMessage();
                self.validateFormFields();
            };

            this.view.txtMobileNumber.onEndEditing = function () {
                self.hideErrorMessage();
                var mobile = self.view.txtMobileNumber.text && self.view.txtMobileNumber.text.trim();
                var country = self.view.txtCountryCode.text && self.view.txtCountryCode.text.trim();
                self.validateMobileNumber(mobile, country);
            };

            this.view.txtEmailId.onTextChange = function () {
                self.hideErrorMessage();
                self.validateFormFields();
            };
            this.view.txtEmailId.onEndEditing = function () {
                self.hideErrorMessage();
                var email = self.view.txtEmailId.text && self.view.txtEmailId.text.trim().toLowerCase();
                self.validateEmail(email);
            };

            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        flxBackOnClick: function () {
            const navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "AuthenticationMA", "friendlyName": "AuthUIModule/frmLogin" });
        },


        validateAccountNumberOnClick: function () {
            var accountNumber = this.view.txtAccountNumber.text;
            if (!kony.sdk.isNullOrUndefined(accountNumber)) {
                if (accountNumber.length === 14) {

                } else {
                    this.checkForToastMessageError();
                }
            }
        },//j

        showCountriesList: function () {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("forgotPassword", null);
            var navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({
                "appName": "AuthenticationMA",
                "friendlyName": "frmForgotSelectCountry",
            }, true);
        },

        resetUI: function () {
            const navManager = applicationManager.getNavigationManager();
            let previousData = navManager.getCustomInfo("frmForgot");
            if (previousData) {
                this.view.txtCountryCode.text = previousData.code;
            }
        },


        validateFormFields: function () {
    
            var accountNumber = (this.view.txtAccountNumber.text && this.view.txtAccountNumber.text.trim()) || undefined;
            var accountHolderName = (this.view.txtAccountHolderName.text && this.view.txtAccountHolderName.text.trim().replace(/\s+/g, '')) || undefined;
            var countryCode = (this.view.txtCountryCode.text && this.view.txtCountryCode.text.trim()) || undefined;
            var mobileNumber = (this.view.txtMobileNumber.text && this.view.txtMobileNumber.text.trim()) || undefined;
            var emailId = (this.view.txtEmailId.text && this.view.txtEmailId.text.trim().toLowerCase()) || undefined;

            var rawCaptchaText = this.view.tbxEnterCaptcha.text;
            var captchaEntered = rawCaptchaText ? rawCaptchaText.trim() : undefined;

            var isAccountNumberValid = this.validateAccountNumber(accountNumber, false);
            var isAccountHolderNameValid = this.validateAccountHolderName(accountHolderName, false);
            var isMobileNumberValid = this.validateMobileNumber(mobileNumber, countryCode, false);
            var isEmailValid = this.validateEmail(emailId, false);
            var isCaptchaEntered = !!captchaEntered;

            var allValid = isAccountNumberValid &&
                isAccountHolderNameValid &&
                isMobileNumberValid &&
                isEmailValid &&
                isCaptchaEntered;

            this.view.btnContinue.setEnabled(allValid);
            this.view.btnContinue.skin = allValid
                ? "sknHBLBtn851a1cRounded8pxffffff100pr"
                : "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
        },

        validateAccountNumber: function (accountNumber, showError = true) {
            var isValid = accountNumber !== undefined && /^[0-9]{1,30}$/.test(accountNumber);
            if (!isValid && showError) {
                this.showError("i18n.TransfersEur.InvalidAccountNumberMessage");
            }
            return isValid;
        },

        validateAccountHolderName: function (name, showError = true) {
            var nameRegex = /^[A-Za-z0-9\-#&(),./\\]{1,65}$/;
            var isValid = name !== undefined && nameRegex.test(name);
            if (!isValid && showError) {
                this.showError("kony.i18n.common.validAccountName");
            }
            return isValid;
        },

        validateMobileNumber: function (number, code, showError = true) {
            var isValid = false;
            if (number !== undefined && code !== undefined) {
                if (code === "+977") {
                    isValid = /^[0-9]{10}$/.test(number);
                } else {
                    isValid = /^[0-9]{1,30}$/.test(number);
                }
            }
            if (!isValid && showError) {
                this.showError("kony.mb.OnBoarding.InvaliPhoneno");
            }
            return isValid;
        },

        validateEmail: function (email, showError = true) {
            /*
            var emailRegex = /^[A-Za-z0-9!.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            var forbiddenChars = /[<>\[\]:;\s]/;
            */
            var emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,}$/;
            var forbiddenChars = /[<>\[\]:;\s]/;
            var isValid = email !== undefined && emailRegex.test(email) && !forbiddenChars.test(email);
            if (!isValid && showError) {
                this.showError("kony.mb.OnBoarding.InvalidEmail");
            }
            return isValid;
        },

        showError: function (i18nKey) {
            applicationManager.getDataProcessorUtility().showToastMessageError(
                this,
                kony.i18n.getLocalizedString(i18nKey)
            );
        },

        checkForToastMessageError: function () {
            //applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidAccountNumberMessage"));
        },

    };
});
