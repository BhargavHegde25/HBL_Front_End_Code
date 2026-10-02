define(['CampaignUtility', 'CommonUtilities'], function (CampaignUtility, CommonUtilities) {
    return {
        init: function () {
        var scopeObj = this;
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility()
            .initCommonActions(scopeObj, "YES", currentForm);
    },

        preShow: function () {
            var CommonUtilities = require('CommonUtilities');
            var clientKyc = CommonUtilities.CLIENT_PROPERTIES.KYC_REG_KEY;
			if(!kony.sdk.isNullOrUndefined(clientKyc)){
			this.view.lblTopUpmessage.text =clientKyc;	
			}else{
            this.view.lblTopUpmessage.text =kony.i18n.getLocalizedString("kony.i18n.kycBank");
			}
            this.view.postShow = this.postShow;
            var previousForm = kony.application.getPreviousForm().id;
            if (previousForm === "frmEnrollActivateProfile") {
                this.view.btnContinue.setEnabled(false);
                this.view.btnContinue.skin = "sknHBLBtnf4f5f8Rounded8pxffffff100pr";
                this.view.txtAccountNumber.text = "";
                this.view.txtAccountHolderName.text = "";
                this.view.txtCountryCode.text = "+977";
                this.view.txtMobileNumber.text = "";
                this.view.txtEmailId.text = "";
            } else if (previousForm === "frmEnroll") {
                this.view.btnContinue.setEnabled(true);
                this.view.btnContinue.skin = "sknHBLBtn851a1cRounded8pxffffff100pr";
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
        },

        postShow: function () {

            this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
            this.view.customHeader.btnRight.onClick = this.flxBackOnClick;
            this.view.btnContinue.onClick = this.btnContinueOnClick;
            this.view.txtCountryCode.onTextChange = this.showCountriesList;
            var self = this;

            this.view.txtAccountNumber.onTextChange = function () {
                self.validateFormFields();
            };
            this.view.txtAccountNumber.onEndEditing = function () {
                var accountNumber = self.view.txtAccountNumber.text && self.view.txtAccountNumber.text.trim();
                self.validateAccountNumber(accountNumber);
            };

            this.view.txtAccountHolderName.onTextChange = function () {
                self.validateFormFields();
            };
            this.view.txtAccountHolderName.onEndEditing = function () {
                var name = self.view.txtAccountHolderName.text && self.view.txtAccountHolderName.text.trim().replace(/\s+/g, '');
                self.validateAccountHolderName(name);
            };

            this.view.txtMobileNumber.onTextChange = function () {
                self.validateFormFields();
            };

            this.view.txtMobileNumber.onEndEditing = function () {
                var mobile = self.view.txtMobileNumber.text && self.view.txtMobileNumber.text.trim();
                var country = self.view.txtCountryCode.text && self.view.txtCountryCode.text.trim();
                self.validateMobileNumber(mobile, country);
            };

            this.view.txtEmailId.onTextChange = function () {
                self.validateFormFields();
            };
            this.view.txtEmailId.onEndEditing = function () {
                var email = self.view.txtEmailId.text && self.view.txtEmailId.text.trim().toLowerCase();
                self.validateEmail(email);
            };
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        },

        flxBackOnClick: function () {
            const navManager = applicationManager.getNavigationManager();
            navManager.navigateTo({ "appName": "SelfServiceEnrolmentMA", "friendlyName": "EnrollUIModule/frmEnrollActivateProfile" });
        },

        validateAccountNumberOnClick: function () {
            var accountNumber = this.view.txtAccountNumber.text;
            if (!kony.sdk.isNullOrUndefined(accountNumber)) {
                if (accountNumber.length === 14) {

                } else {
                    this.checkForToastMessageError();
                }
            }
        },

        showCountriesList: function () {
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


        validateFormFields : function () {
            var accountNumber = (this.view.txtAccountNumber.text && this.view.txtAccountNumber.text.trim()) || undefined;
            var accountHolderName = (this.view.txtAccountHolderName.text && this.view.txtAccountHolderName.text.trim().replace(/\s+/g, '')) || undefined;
            var countryCode = (this.view.txtCountryCode.text && this.view.txtCountryCode.text.trim()) || undefined;
            var mobileNumber = (this.view.txtMobileNumber.text && this.view.txtMobileNumber.text.trim()) || undefined;
            var emailId = (this.view.txtEmailId.text && this.view.txtEmailId.text.trim().toLowerCase()) || undefined;

            var isAccountNumberValid = this.validateAccountNumber(accountNumber, false);
            var isAccountHolderNameValid = this.validateAccountHolderName(accountHolderName, false);
            var isMobileNumberValid = this.validateMobileNumber(mobileNumber, countryCode, false);
            var isEmailValid = this.validateEmail(emailId, false);

            var allValid = isAccountNumberValid && isAccountHolderNameValid && isMobileNumberValid && isEmailValid;

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

        btnContinueOnClick: function () {
            var accountNumber = this.view.txtAccountNumber.text;
            var accountHolderName = this.view.txtAccountHolderName.text;
            var countryCode = this.view.txtCountryCode.text;
            var mobileNumber = this.view.txtMobileNumber.text;
            var emailId = this.view.txtEmailId.text;
            var formattedMobileNo = countryCode + "-" + mobileNumber;

            var params = {
                "accountNumber": accountNumber,
                "accountName": accountHolderName,
                "mobileNumber": formattedMobileNo,
                "email": emailId
            };

            const navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("Enrolldata", params);
			this.getTermsandConditions();
           // navManager.navigateTo({ "appName": "SelfServiceEnrolmentMA", "friendlyName": "EnrollUIModule/frmEnroll" }, false);
        },
		 getTermsandConditions: function() {
            var config = applicationManager.getConfigurationManager();
			applicationManager.getPresentationUtility().showLoadingScreen();
            var locale = config.getLocale();
            if(!locale){
                locale =kony.i18n.getCurrentLocale();
            }
            var termsAndConditions = config.getTermsAndConditions();
            var param = {
                "languageCode": termsAndConditions[locale],
                "termsAndConditionsCode": "Enroll_TnC"
            };
            var termsAndConditions = applicationManager.getTermsAndConditionsManager();
            termsAndConditions.fetchTermsAndConditionsPreLogin(param, this.getTermsandConditionsSuccessCallBack, this.getTermsandConditionsErrorCallback);
        },
 getTermsandConditionsSuccessCallBack: function(data){
     var config = applicationManager.getConfigurationManager();
    var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("getTandC", {
            "richTextData": "<font face='SourceSansPro-Regular' >" + data.termsAndConditionsContent,
            "flowType": "AccountAggregation",
            "contentTypeID": data.contentTypeId,
            "header": config.constants.TERMS
        });
      //navManager.setCustomInfo("getTandC", data);
     var enrollMod = kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
			applicationManager.getDataProcessorUtility().ShowTandC("<font face='SourceSansPro-Regular' >" + data.termsAndConditionsContent,enrollMod.presentationController.commonFunctionForNavigation.bind(this,"frmEnroll"));
			 applicationManager.getPresentationUtility().dismissLoadingScreen();
       // enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSupport");
  },
  getTermsandConditionsErrorCallback: function(){},
  
        checkForToastMessageError: function () {
            //applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("i18n.TransfersEur.InvalidAccountNumberMessage"));
        },
    };
});


