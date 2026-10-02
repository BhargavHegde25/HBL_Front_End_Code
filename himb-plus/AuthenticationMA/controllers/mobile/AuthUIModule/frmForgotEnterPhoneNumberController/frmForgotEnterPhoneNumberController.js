define([], function (){ 
    return {
        keypadString: "",
        phoneNumberPreShow: function () {
            this.keypadString = "";
            this.resetUI();
            this.renderTitleBar();
            this.setFlowActions();
        },
        resetUI: function () {
            const navManager = applicationManager.getNavigationManager();
            let previousData = navManager.getCustomInfo("frmForgot");
            if (previousData) {
                this.view.lblCode.text = previousData.code ? previousData.code : "+977";
                this.view.lblPhoneNumber.text = previousData.phone;
                if (previousData.phone) {
                    this.keypadString = previousData.phone;
                }
            } else {
                this.view.lblPhoneNumber.text = "";
                this.view.lblCode.text = this.setCountryCode();
            }
            this.setContinueButtonEnableState();
        },
        setFlowActions: function () {
            const scopeObj = this;
            const navManager = applicationManager.getNavigationManager();
            this.view.customHeader.flxBack.onTouchEnd = function () {
                scopeObj.onBack();
            };
            this.view.onDeviceBack = function () {
                scopeObj.onBack();
            };
            this.view.customHeader.btnRight.onClick = function () {
                scopeObj.onCancel();
            };
            this.view.btnContinue.onClick = function () {
                let phoneNumber = scopeObj.view.lblPhoneNumber.text;
                let code = scopeObj.view.lblCode.text;
                let previousData = navManager.getCustomInfo("frmForgot");
                previousData.phone = phoneNumber;
                previousData.code = code;
                this.keypadString = "";
                scopeObj.view.lblPhoneNumber.text = "";
                scopeObj.view.lblCode.text = "";
                navManager.setCustomInfo("frmForgot", previousData);
                navManager.navigateTo("frmForgotEnterEmailID");
            };
            scopeObj.view.flxCode.onTouchEnd = scopeObj.showCountriesList;
        },
        setKeypadChar: function (char) {
            let cCode = this.view.lblCode.text;
            if (char === '.') return;
            if (cCode == "+977") {
                if (this.keypadString.length > 10) return;
                else {
                    if (this.keypadString.length == 10) {
                        return;
                    }
                    this.view.lblPhoneNumber.height = "31dp";
                    this.keypadString = this.keypadString + char;
                    this.view.lblPhoneNumber.text = this.keypadString;
                    this.setContinueButtonEnableState();
                }
            } else {
                if (this.keypadString.length > 30) return;
                else {
                    if (this.keypadString.length == 30) {
                        return;
                    }
                    this.view.lblPhoneNumber.height = kony.flex.USE_PREFERED_SIZE;
                    this.keypadString = this.keypadString + char;
                    this.view.lblPhoneNumber.text = this.keypadString;
                    this.setContinueButtonEnableState();
                }
            }
        },
        clearKeypadChar: function () {
            if (this.keypadString.length === 1) {
                this.keypadString = "";
            } else if (this.keypadString.length !== 0) {
                this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
            }
            this.setContinueButtonEnableState();
            this.view.lblPhoneNumber.text = this.keypadString;
        },
        setContinueButtonEnableState: function () {
            if (this.keypadString && this.keypadString !== "" && this.keypadString.length >= 10) {
                this.view.btnContinue.skin = "sknBtn055BAF26px";
                this.view.btnContinue.setEnabled(true);
                // this.view.lblPhoneNumber.text = this.keypadString;
            } else {
                this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
                this.view.btnContinue.setEnabled(false);
            }
        },
        showCountriesList: function () {
            // TO DO : Get countries list here
            const navManager = applicationManager.getNavigationManager();
            navManager.navigateTo("frmForgotSelectCountry");
        },
        setCountryCode: function () {
            var nav = applicationManager.getNavigationManager();
            var phoneData = nav.getCustomInfo('frmProfileEditPhoneNumberMain');
            if (!kony.sdk.isNullOrUndefined(phoneData)) {
                if (!kony.sdk.isNullOrUndefined(phoneData.data.phoneCountryCode)) {
                    return phoneData.data.phoneCountryCode;
                } else if (!kony.sdk.isNullOrUndefined(phoneData.phoneCountryCode)) {
                    return phoneData.phoneCountryCode;
                }
            }
            return applicationManager.getConfigurationManager().getConfigurationValue("defaultCountryISDCode");
        },
        onBack: function () {
            let scopeObj = this;
            const navManager = applicationManager.getNavigationManager();
            let phoneNumber = scopeObj.view.lblPhoneNumber.text;
            let code = scopeObj.view.lblCode.text;
            let previousData = navManager.getCustomInfo("frmForgot");
            previousData.phone = phoneNumber;
            previousData.code = code;
            this.keypadString = "";
            navManager.setCustomInfo("frmForgot", previousData);
            navManager.navigateTo("frmForgotEnterLastName");
        },
        onCancel: function () {
            const navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmForgot", undefined);
            this.keypadString = "";
            navManager.navigateTo("frmLogin");
        },
        renderTitleBar: function () {
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