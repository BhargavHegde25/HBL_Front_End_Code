define(function () {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj._buttonDisabledSkin = "";
      scopeObj._buttonEnabledSkin = "";
      scopeObj._objectServiceName = "";
      scopeObj._dataModel = "";
      scopeObj._dbxUserDataModel = "";
      scopeObj._updatePassword = "";
      scopeObj._verifyExistingPassword = "";
      scopeObj._textVisiblityOff = "";
      scopeObj._textVisiblityOn = "";
      scopeObj._greenTick = "";
      scopeObj._grayTick = "";
      scopeObj._getPasswordRulesAndPolicy = "";
      scopeObj.passwordPolicies = {
        "minLength": "",
        "maxLength": "",
        "specialCharactersAllowed": "",
        "atleastOneNumber": "",
        "atleastOneSymbol": "",
        "atleastOneUpperCase": "",
        "atleastOneLowerCase": "",
        "charRepeatCount": ""
      };
      scopeObj.passwordRegex = "";
      scopeObj.characterRepeatCountRegex = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineSetter(this, "buttonDisabledSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._buttonDisabledSkin = val;
        }
      });
      defineGetter(this, "buttonDisabledSkin", function () {
        return this._buttonDisabledSkin;
      });
      defineSetter(this, "buttonEnabledSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._buttonEnabledSkin = val;
        }
      });
      defineGetter(this, "buttonEnabledSkin", function () {
        return this._buttonEnabledSkin;
      });
      defineSetter(this, "objectServiceName", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._objectServiceName = val;
        }
      });
      defineGetter(this, "objectServiceName", function () {
        return this._objectServiceName;
      });
      defineSetter(this, "dataModel", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._dataModel = val;
        }
      });
      defineGetter(this, "dataModel", function () {
        return this._dataModel;
      });
      defineSetter(this, "dbxUserDataModel", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._dbxUserDataModel = val;
        }
      });
      defineGetter(this, "dbxUserDataModel", function () {
        return this._dbxUserDataModel;
      });
      defineSetter(this, "updatePassword", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._updatePassword = val;
        }
      });
      defineGetter(this, "updatePassword", function () {
        return this._updatePassword;
      });
      defineSetter(this, "verifyExistingPassword", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._verifyExistingPassword = val;
        }
      });
      defineGetter(this, "verifyExistingPassword", function () {
        return this._verifyExistingPassword;
      });
      defineSetter(this, "textVisiblityOff", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._textVisiblityOff = val;
        }
      });
      defineGetter(this, "textVisiblityOff", function () {
        return this._textVisiblityOff;
      });
      defineSetter(this, "textVisiblityOn", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._textVisiblityOn = val;
        }
      });
      defineGetter(this, "textVisiblityOn", function () {
        return this._textVisiblityOn;
      });
      defineSetter(this, "greenTick", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._greenTick = val;
        }
      });
      defineGetter(this, "greenTick", function () {
        return this._greenTick;
      });
      defineSetter(this, "grayTick", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._grayTick = val;
        }
      });
      defineGetter(this, "grayTick", function () {
        return this._grayTick;
      });
      defineSetter(this, "getPasswordRulesAndPolicy", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._getPasswordRulesAndPolicy = val;
        }
      });
      defineGetter(this, "getPasswordRulesAndPolicy", function () {
        return this._getPasswordRulesAndPolicy;
      });
    },

    preshow: function () {
     //this.setVisiblityForTransactionPin();
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("resetPinDeepLinkFlow" ,null);
      this.setFlowActions();
      this.resetUI();
      this.view.flxSecurityRequirements.setVisibility(true);
    },

    postShow: function () {

    },

    setVisiblityForTransactionPin: function () {
      var navManager = applicationManager.getNavigationManager();
      var transactionPinFlag = navManager.getCustomInfo("transactionPinSetOrNot");
      if (transactionPinFlag === "true") {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Profile.ChangeTransactionPIN");
        this.view.lblNote.setVisibility(false);
        this.view.lblOldTransactionPin.isVisible = true;
        this.view.flxOldTransactionPin.isVisible = true;
      } else {
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.Profile.setTransactionPIN");
        this.view.lblNote.isVisible = true;
        this.view.lblOldTransactionPin.isVisible = false;
        this.view.flxOldTransactionPin.isVisible = false;
      }

    },
    resetUI: function () {
      let scopeObj = this;
      scopeObj.view.txtOldTransactionPin.text = "";
      scopeObj.view.txtNewTransactionPin.text = "";
      scopeObj.view.txtConfirmNewTransactionPIN.text = "";
      scopeObj.view.txtOldTransactionPin.secureTextEntry = true;
      scopeObj.view.txtNewTransactionPin.secureTextEntry = true;
      scopeObj.view.imghideOrShowPwd2.src = scopeObj.textVisiblityOff;
      scopeObj.view.imghideOrShowPwd.src = scopeObj.textVisiblityOff;
      scopeObj.view.imgRenterPass.src = scopeObj.grayTick;
      scopeObj.view.flxSecurityRequirements.setVisibility(true);
      scopeObj.enableDisableButton(false);
      let isAndriod = applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone";
      scopeObj.view.flxHeader.isVisible = isAndriod;
      scopeObj.view.flxMainContainer.top = isAndriod ? "0dp" : "0dp";
    },

    setFlowActions: function () {
      let scopeObj = this;
      scopeObj.view.customHeader.btnRight.onClick = function () {
        scopeObj.resetUI();
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
        settingsModule.presentationController.showSettings();
      };

      scopeObj.view.customHeader.flxBack.onClick = function () {
        //scopeObj.navToSettings();
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"} );
        settingsModule.presentationController.showSettings();
      };

      scopeObj.view.txtOldTransactionPin.onTouchStart = function () {
        //scopeObj.view.lblNote.setVisibility(false);
      };

      scopeObj.view.txtOldTransactionPin.onTextChange = function () {
        scopeObj.enableDisableButton(true);
      };

      scopeObj.view.txtOldTransactionPin.onEndEditing = function () {
        scopeObj.enableDisableButton(true);
      };

      scopeObj.view.txtOldTransactionPin.onDone = function () {
        scopeObj.enableDisableButton(true);
      };

      scopeObj.view.flxPwdVisiblityToggle2.onClick = function () {
        scopeObj.togglePasswordVisibility(scopeObj.view.flxPwdVisiblityToggle2, scopeObj.view.imghideOrShowPwd2, scopeObj.view.txtOldTransactionPin);
      };

      scopeObj.view.txtNewTransactionPin.onTouchStart = function () {
        scopeObj.view.flxSecurityRequirements.setVisibility(true);
        //scopeObj.view.lblNote.setVisibility(false);
      };

      scopeObj.view.txtNewTransactionPin.onTextChange = function () {
        scopeObj.view.flxSecurityRequirements.setVisibility(true);
      };

      scopeObj.view.txtNewTransactionPin.onDone = function () {
        scopeObj.validatePin(scopeObj.view.txtNewTransactionPin);
      };

      scopeObj.view.txtNewTransactionPin.onEndEditing = function () {
        scopeObj.validatePin(scopeObj.view.txtNewTransactionPin);
      };

      scopeObj.view.flxPwdVisiblityToggle.onClick = function () {
        scopeObj.togglePasswordVisibility(scopeObj.view.flxPwdVisiblityToggle, scopeObj.view.imghideOrShowPwd, scopeObj.view.txtNewTransactionPin);
      };

      scopeObj.view.txtConfirmNewTransactionPIN.onTouchStart = function () {
        scopeObj.view.flxSecurityRequirements.setVisibility(true);
        //scopeObj.view.lblNote.setVisibility(false);
      };
      /*
      scopeObj.view.txtConfirmNewTransactionPIN.onDone = function(){
        scopeObj.validatePin(scopeObj.view.txtConfirmNewTransactionPIN);
      };
  	
      scopeObj.view.txtConfirmNewTransactionPIN.onEndEditing = function(){
        scopeObj.validatePin(scopeObj.view.txtConfirmNewTransactionPIN);
     };
     */
      scopeObj.view.txtConfirmNewTransactionPIN.onTextChange = function () {
        scopeObj.validatePin(scopeObj.view.txtConfirmNewTransactionPIN);
      };
      scopeObj.view.btnUpdate.onClick = function () {
        scopeObj.validateTransactionPin();
      };

    },

    navToSettings: function () {
      var navManager = applicationManager.getNavigationManager();
      //navManager.goBack();
      navManager.navigateTo({
        "appName": "ManageProfileMA",
        "friendlyName": "SettingsUIModule/frmSettings"
      });
    },

    getStringFromi18n: function (stringValue) {
      return kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : "";
    },

    togglePasswordVisibility: function (flx, img, tbx) {
      let scopeObj = this;
      if (img.src === scopeObj.textVisiblityOff) {
        img.src = scopeObj.textVisiblityOn;
        tbx.secureTextEntry = false;
        flx.forceLayout();
      } else {
        img.src = scopeObj.textVisiblityOff;
        tbx.secureTextEntry = true;
        flx.forceLayout();
      }
    },

    validatePin: function (widget) {
      let scopeObj = this;
      let text = widget.text;
      var newTransactionPin = scopeObj.view.txtNewTransactionPin.text;
      var confirmTransactionPin = scopeObj.view.txtConfirmNewTransactionPIN.text;
      let isValidPin = newTransactionPin.length == 6 && confirmTransactionPin.length == 6 ? true : false;
      let isCnfPwdMatch = scopeObj.view.txtNewTransactionPin.text !== "" && scopeObj.view.txtConfirmNewTransactionPIN.text !== "" && scopeObj.view.txtNewTransactionPin.text === scopeObj.view.txtConfirmNewTransactionPIN.text;
      scopeObj.view.imgRenterPass.src = isValidPin && isCnfPwdMatch ? scopeObj.greenTick : scopeObj.grayTick;
      scopeObj.enableDisableButton(isValidPin && isCnfPwdMatch);
    },

    enableDisableButton: function (isValidPin) {
      let scopeObj = this;
      var navManager = applicationManager.getNavigationManager();
      var transactionPinFlag = navManager.getCustomInfo("transactionPinSetOrNot");
      let currentPin = scopeObj.view.txtOldTransactionPin.text;
      let pin = scopeObj.view.txtNewTransactionPin.text;
      let cnfPin = scopeObj.view.txtConfirmNewTransactionPIN.text;
      if (transactionPinFlag === "true") {
        let isEnabled = isValidPin && currentPin !== "" && pin !== "" && cnfPin !== "";
        scopeObj.view.btnUpdate.setEnabled(isEnabled);
        scopeObj.view.btnUpdate.skin = isEnabled ? scopeObj.buttonEnabledSkin : scopeObj.buttonDisabledSkin;
      } else {
        let isEnabled = isValidPin && pin !== "" && cnfPin !== "";
        scopeObj.view.btnUpdate.setEnabled(isEnabled);
        scopeObj.view.btnUpdate.skin = isEnabled ? scopeObj.buttonEnabledSkin : scopeObj.buttonDisabledSkin;
      }
    },

    showErrorMessage: function (errorObj) {
      let scopeObj = this;
      if (errorObj.isServerUnreachable && scopeObj.onFailureCallback) {
        scopeObj.onFailureCallback(errorObj);
      } else {
        applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorObj.errorMessage);
        scopeObj.view.txtOldTransactionPin.text = "";
        scopeObj.view.txtNewTransactionPin.text = "";
        scopeObj.view.txtConfirmNewTransactionPIN.text = "";
        scopeObj.view.imgRenterPass.src = scopeObj.grayTick;
        scopeObj.enableDisableButton(false);
        kony.application.dismissLoadingScreen();
      }
    },

    validateTransactionPin: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      let scopeObj = this;
      param = {
        "temporaryPIN": scopeObj.view.txtOldTransactionPin.text,
        "newPIN": scopeObj.view.txtConfirmNewTransactionPIN.text
      }
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsUIModule", "appName": "ManageProfileMA" });
      settingsMode.presentationController.transactionPinResetValidation(param);
    },
  };
});