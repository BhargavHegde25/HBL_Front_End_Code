define(['CommonUtilities', 'FormControllerUtility', 'OLBConstants', 'ViewConstants'], function (CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  return {
    updateFormUI: function (context) {
      if (context.TnCcontent) {
        this.view.rtxErrorMsg.text="";
        this.view.flxContainer.height=kony.os.deviceInfo().screenHeight-100 +"dp";
        this.view.flxTermsAndConditions.height=kony.os.deviceInfo().screenHeight-100 +"dp";
        this.view.flxQRScanner.height=kony.os.deviceInfo().screenHeight-100 +"dp";
        this.view.flxTermsAndConditions.isVisible = true;
        this.view.flxContainer.isVisible = false;
        this.view.flxQRScanner.isVisible=false;
        this.view.lblCheckbox.text = "D";
        this.setTnCDATASection(context.TnCcontent);
      }
      if (context.error) {
        this.showError(context.error);

        this.view.flxtncClose.onClick = this.showfrmLogin;
        this.view.flxtncClose.setEnabled(true);
        this.view.flxtncClose.setVisibility(true);
      }
      if (context.isUserAuthenticationSuccess) {
        this.view.flxTermsAndConditions.isVisible = true;
        this.showQRPage(context);
      }
      if (context.qrcode) {
        this.showQRimage(context);
      }
      if (context.totp) {
        this.ValidateOTP(context);
      }
    },
    preShow: function () {
      let scopeObj = this;
      scopeObj.view.tbxPassword.text = "";
      scopeObj.view.tbxUserName.text = "";
      scopeObj.CHECKBOX_UNSELECTED_SKIN = 'skn0273e320pxolbfonticons';
      scopeObj.CHECKBOX_SELECTED_SKIN = 'sknFontIconCheckBoxSelected';
      this.view.btnLogin.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.btnLogin.setEnabled(false);
      //this.view.flxTermsAndConditions.isvisible = true;
      //this.view.flxContainer.isVisible = false;
      this.view.flxQRScanner.isVisible = false;
      CommonUtilities.disableButton(this.view.btnProceed);
      this.view.lblCheckbox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
      scopeObj.view.lblCheckbox.skin = scopeObj.CHECKBOX_UNSELECTED_SKIN;
      this.view.flxCloseFontIcon.onClick = this.showLogoutOnCancel;
      this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_MAIN_BAKGROUND;
      //this.view.flxFooterMenu.setVisibility(false);
      this.view.flxLoading.isModalContainer = true;
      this.view.flxLoadingWrapper.isModalContainer = true;
      this.view.flxImageContainer.isModalContainer = true;
      scopeObj.enableLogin();
      //this.view.flxTC.doLayout = this.centerPopupFlex;
    },
    postShow: function () {
      this.view.flxtncClose.centerY="50%";
      this.view.btnLogin.text=kony.i18n.getLocalizedString("i18n.enrollNow.proceed");
      this.view.flxErrorMsg.isVisible = false;
      this.view.rtxErrorMsg.isVisible = false;
      this.view.rtxErrorMessage.text="";
      this.view.tbxOTP.text="";
      this.view.flxTermsAndConditions.isVisible = false;
      this.view.flxContainer.isVisible = true;
      this.view.flxContainer.height = kony.os.deviceInfo().screenHeight - 100 + "dp";
      this.view.flxTermsAndConditions.height = kony.os.deviceInfo().screenHeight - 100 + "dp";
      this.view.flxQRScanner.height = kony.os.deviceInfo().screenHeight - 100 + "dp";
      this.view.btnExchange.onClick = this.ExchangeScreen;
      this.view.btnExchange.cursorType = "pointer";
      this.view.btnDepositInterest.onClick = this.DepositIntrestScreen;
      this.view.btnDepositInterest.cursorType = "pointer";
      this.view.btnLoanIntrest.onClick = this.LoanIntrestScreen;
      this.view.btnLoanIntrest.cursorType = "pointer";
      this.view.btnExchange.toolTip = kony.i18n.getLocalizedString("i18n.prelogin.ExchangeRates");
      this.view.btnLoanIntrest.toolTip = kony.i18n.getLocalizedString("i18n.prelogin.LoanIntrestrates");
      this.view.btnDepositInterest.toolTip = kony.i18n.getLocalizedString("i18n.prelogin.DepositIntrestrates");
      this.view.btnExchange.text = kony.i18n.getLocalizedString("i18n.prelogin.ExchangeRates");
      this.view.btnLoanIntrest.text = kony.i18n.getLocalizedString("i18n.prelogin.LoanIntrestrates");
      this.view.btnDepositInterest.text = kony.i18n.getLocalizedString("i18n.prelogin.DepositIntrestrates");
      this.view.btnAgree.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.flxTCContents.height="70%";
      var scope = this;
      applicationManager.getNavigationManager().applyUpdates(this);
      //this.view.lblCopyright.setVisibility(false);
      this.setAccessibility();
      // this.view.flxTermsAndConditions.setVisibility(false);
      document.addEventListener('keydown', function (event) {
        if (event.which === 27) {
          //scope.view.flxTermsAndConditions.setVisibility(false);
          scope.view.flxTC.isModalContainer = false;
          scope.view.btnTandC.setFocus(true);
        }
      });
    },
    centerPopupFlex: function (popupWidget) {
      popupWidget = this.view.flxTC;
      popupWidget.info = popupWidget.frame;
      if (kony.os.deviceInfo().screenHeight - 40 <= popupWidget.info.height) {
        popupWidget.top = "20dp";
        popupWidget.height = kony.os.deviceInfo().screenHeight - 40 + "dp";
        this.view.brwScroll.height = kony.os.deviceInfo().screenHeight - 124 + "dp";
        popupWidget.centerY = "";
      } else {
        if (kony.application.getCurrentBreakpoint() === 640) {
          popupWidget.height = "325dp";
        } else if (kony.application.getCurrentBreakpoint() === 768) {
          popupWidget.height = "400dp";
        } else if (kony.application.getCurrentBreakpoint() === 1024) {
          popupWidget.height = "500dp";
        } else {
          popupWidget.height = "650dp";
        }
        popupWidget.top = "";
        popupWidget.centerY = "50%";
      }
      this.view.forceLayout();
    },
    setAccessibility: function () {
      this.view.flxLoading.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxLoadingWrapper.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxImageContainer.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxTCContents.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxSeperator1.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.imgClose.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxTermsAndConditions.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.lblWrongInformation.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxMain.accessibilityConfig = {
        a11yARIA: {
          "role": "main",
          tabindex: -1,
        }
      }
      this.view.flxCloseFontIconParent.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxCloseFontIcon.accessibilityConfig = {
        a11yLabel: "Close",
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.lblCloseFontIconCommon.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.imgKony.accessibilityConfig = {
        a11yLabel: "Infinity Digital Banking",
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.lblWelcome.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.imgDowntimeWarning.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          role: "presentation",
          tabindex: -1,
        }
      }
      this.view.lblDowntimeWarning.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.lblBeyondBanking.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.lblBeyondBankingDesc.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxLblFontIcon.accessibilityConfig = {
        a11yLabel: "terms and conditions",
        a11yARIA: {
          "role": "checkbox",
          "aria-checked": false,
        }
      }
      this.view.lblCheckbox.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.lblIAccept.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.btnTandC.accessibilityConfig = {
        a11yARIA: {
          // "role": "button"
        }
      }
      this.view.btnProceed.accessibilityConfig = {
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.btnViewMore.accessibilityConfig = {
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.flxFooterContainer.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxVBar1.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxVBar2.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxVBar3.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxVBar4.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.btnLocateUs.accessibilityConfig = {
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.btnContactUs.accessibilityConfig = {
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.btnPrivacy.accessibilityConfig = {
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.btnTermsAndConditions.accessibilityConfig = {
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.btnFaqs.accessibilityConfig = {
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.lblTermsAndConditions.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.btnClose.accessibilityConfig = {
        a11yLabel: "close",
        a11yARIA: {
          "role": "button"
        }
      }
      this.view.imgClose.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.rtxTC.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.brwBodyTnC.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.lblCopyrightTab1.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.lblCopyrightTab2.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        }
      }
      this.view.flxTC.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
          "aria-labelledby": "lblTermsAndConditions",
          "role": "dialog",
          "aria-modal": "true"
        },
      }
      this.view.imgLoading.accessibilityConfig = {
        a11yHidden: true,
        a11yARIA: {
          tabindex: -1,
        }
      }
    },
    ExchangeScreen: function () {
      var config = applicationManager.getConfigurationManager();
      let URL = config.getExchangerateURL();
      //let Url = "https://www.himalayanbank.com/int/rate/";
      kony.application.openURL(URL);
    },
    DepositIntrestScreen: function () {
      var config = applicationManager.getConfigurationManager();
      let URL = config.getDepositrateURL();
      //let Url = "https://www.himalayanbank.com/en/rates/deposit-products-rate";
      kony.application.openURL(URL);
    },
    LoanIntrestScreen: function () {
      var config = applicationManager.getConfigurationManager();
      let URL = config.getLoanrateURL();
      //let Url = "https://www.himalayanbank.com/en/rates/loan-products-rates";
      kony.application.openURL(URL);
    },
    initActions: function () {
      this.view.imgViewPassword.src = "view.png";
      FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
      this.view.btnClose.onClick = this.hideTermsAndConditionPopUp;
      this.view.btnViewMore.onClick = function () {
        var config = applicationManager.getConfigurationManager();
        kony.application.openURL(config.getConfigurationValue("LINK_TO_DBX"));
      };
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      this.view.btnLogin.onClick = function() {
        var uName = this.view.tbxUserName.text;
        var pWord = this.view.tbxPassword.text;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("uName", uName);
        var param = {
          "userName":uName, 
          "password":pWord
        };
        authModule.presentationController.getUsernamePasswordDetails(param);
      }.bind(this);
      //this.view.btnProceed.onClick = this.agreeTnc;
      this.view.btnProceed.onClick = function () {
        //applicationManager.getNavigationManager().navigateTo("frmLoginLanguage");
        //var navigationManager=applicationManager.getNavigationManager();
        applicationManager.getNavigationManager().navigateTo({
          appName: 'SelfServiceEnrolmentMA',
          friendlyName: 'frmEnrollNow'
        });
        //applicationManager.getNavigationManager().navigateTo("frmEnrollNow");
      }.bind(this);
      this.view.tbxPassword.secureTextEntry = true;
      this.view.imgViewPassword.onTouchStart = function () {
        let isSecuredText = this.view.tbxPassword.secureTextEntry;
        this.view.tbxPassword.secureTextEntry = !isSecuredText;
        this.view.imgViewPassword.src = !isSecuredText ? "view.png" : "eye_slash.png";
      }.bind(this);
      this.view.tbxUserName.onKeyUp = function () {
          this.enableLogin();
        }.bind(this);
        this.view.tbxPassword.onKeyUp = function () {
          this.enableLogin();
        }.bind(this);
        this.view.btnReset.setEnabled(false);
        this.view.btnReset.skin="sknBtnBlockedSSPFFFFFF15Px";
        this.view.tbxOTP.onKeyUp = function () {
          this.enableProceed();
        }.bind(this);
        this.view.btnReset.onClick =function(){
        var totp = this.view.tbxOTP.text;
        var navManager = applicationManager.getNavigationManager();
        var uName=navManager.getCustomInfo("uName");
        var payLoad={
          "totp": totp,
          "userName":uName
        };
        authModule.presentationController.Settotp(payLoad);
      }.bind(this);
      this.view.btnAgree.onClick = this.AgreeConditions;
      this.view.flxLblFontIcontick.onClick = this.CheckboxText;
      //this.view.btnLogin.onClick=this.showQRPage;
      this.view.imgBackarrow.onTouchEnd=this.showPreviousPage;
      this.view.flxtncClose.onClick = this.showfrmLogin;
      
      this.view.btnDisAgree.onClick=this.showfrmLogin;
      this.view.btnClose.onClick=this.showfrmLogin;
      //this.view.btnReset.onClick=this.showfrmLogin;
      this.view.flxLblFontIcon.onClick = this.toggleTnC.bind(this, this.view.lblCheckbox);
    },
    enableLogin: function () {
      let self = this;
      let username = self.view.tbxUserName.text;
      let password = self.view.tbxPassword.text;
      let isEnabled = (username && password) ? true : false;
      self.view.btnLogin.setEnabled(isEnabled);
      let skins = isEnabled ? "sknBtnNormalSSPFFFFFF15Px" : "sknBtnBlockedSSPFFFFFF15Px";
      self.view.btnLogin.skin = skins;
    },
    enableProceed: function(){
      let self = this;
      let OTP = this.view.tbxOTP.text;
      let isEnabled = OTP ? true : false;
      self.view.btnReset.setEnabled(isEnabled);
      let skins = isEnabled ? "sknBtnNormalSSPFFFFFF15Px" : "sknBtnBlockedSSPFFFFFF15Px";
      self.view.btnReset.skin = skins;
    },
    /*showLoginOnCancel: function() {
            var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
            authModule.presentationController.showLoginScreen();
        },*/
    showfrmLogin: function(){
      this.view.flxTermsAndConditions.isVisible = true;
      this.view.btnAgree.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.lblCheckbox.text = "D";
      var navigationManager = applicationManager.getNavigationManager();
      navigationManager.navigateTo("frmLogin");
    },
    showPreviousPage:function(){
      this.view.flxTermsAndConditions.isVisible = true;
      this.view.flxContainer.isVisible = false;
      this.view.flxQRScanner.isVisible= false;
    },
    showQRPage: function(context) {
      if (context.isUserAuthenticationSuccess.isThirdpartyAuthEnable == "true") {
        var navManager = applicationManager.getNavigationManager();
        var a = navManager.getCustomInfo("flag");
        if (a == true) {
          this.view.flxErrorMsg.isVisible = true;
          this.view.rtxErrorMsg.isVisible = true;
          this.view.rtxErrorMsg.text = kony.i18n.getLocalizedString("i18n.HBL.mfaResetPending");
          var flag = false;
          var navManager = applicationManager.getNavigationManager();
          navManager.setCustomInfo("flag", flag);
        } else {
          this.view.flxErrorMsg.isVisible = true;
          this.view.rtxErrorMsg.isVisible = true;
          this.view.rtxErrorMsg.text = kony.i18n.getLocalizedString("i18n.HBL.alreadyActivated");
        }
      } else {
        if (context.isUserAuthenticationSuccess.isUserAuthenticationSuccess == "true") {
          var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
          var navManager = applicationManager.getNavigationManager();
          var uName =navManager.getCustomInfo("uName");
          var payload = {
            "userName": uName
          };
          authModule.presentationController.SetQRCode(payload);
          this.view.flxTermsAndConditions.isVisible = false;
          this.view.flxContainer.isVisible = false;
          this.view.flxQRScanner.isVisible = true;
          this.view.flxErrorMsg.isVisible = false;
          this.view.rtxErrorMsg.isVisible = false;
        } else {
          this.view.flxErrorMsg.isVisible = true;
          this.view.rtxErrorMsg.isVisible = true;
          this.view.flxErrorMsg.left = "10%";
          this.view.rtxErrorMsg.text = kony.i18n.getLocalizedString("i18n.transfers.incorrectCredentials");
        }
      }
    },
    showQRimage: function(param){
      this.view.imgQR.base64 = param.qrcode.qrcode;
    },
    ValidateOTP: function(context) {
      if (context.totp.message == 'totp validation Failed!') {
        this.view.flxErrorMessage.isVisible = true;
        this.view.rtxErrorMessage.isVisible = true;
        this.view.rtxErrorMessage.text = kony.i18n.getLocalizedString("i18n.HBL.InvalidOTP");
      } else {
        this.view.flxErrorMessage.isVisible = false;
        this.view.rtxErrorMessage.isVisible = false;
      }
      if (context.totp.is2FAEnrollSuccess == "true") {
        var Service = 1;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("Service", Service);
        applicationManager.getNavigationManager().navigateTo("frmLogin");
      }
    },
    CheckboxText: function () {
      if (this.view.lblCheckbox.text == "D") {
        this.view.btnAgree.skin = "sknBtnNormalSSPFFFFFF15Px";
        this.view.lblCheckbox.text = "C";
        this.view.lblCheckbox.skin = this.CHECKBOX_SELECTED_SKIN;
        this.view.btnAgree.setEnabled(true);
    } else if (this.view.lblCheckbox.text == "C") {
        this.view.lblCheckbox.text = "D";
        this.view.lblCheckbox.skin = this.CHECKBOX_UNSELECTED_SKIN; 
        this.view.btnAgree.skin = "sknBtnBlockedSSPFFFFFF15Px";
        this.view.btnAgree.setEnabled(false);
    }
},
    AgreeConditions: function () {
      this.view.flxTermsAndConditions.isVisible = false;
      this.view.flxContainer.isVisible = true;
      this.enableLogin();
    },
    showLogoutOnCancel: function () {
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
      authModule.presentationController.onTnCNotSelect();
    },
    showTermsAndConditionPopUp: function () {
      this.view.flxTermsAndConditions.setVisibility(true);
      this.view.flxTC.isModalContainer = true;
      this.view.btnClose.setFocus(true);
      var collection = document.getElementsByTagName("iframe");
      for (let i = 0; i < collection.length; i++) {
        collection[i].tabIndex = -1;
        collection[i].ariaLabel = "Terms and conditions";
      }
    },
    hideTermsAndConditionPopUp: function () {
      this.view.flxTermsAndConditions.setVisibility(false);
      this.view.flxTC.isModalContainer = false;
      this.view.btnTandC.setFocus(true);
    },
    setTnCDATASection: function (content) {
      this.view.lblWrongInformation.setVisibility(false);
      if (content.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
        this.view.btnTandC.onClick = function () {
          window.open(content.termsAndConditionsContent);
        }
      } else {
        //this.view.btnTandC.onClick = this.showTermsAndConditionPopUp;
        this.view.rtxTC.text = content.termsAndConditionsContent;
        FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, content.termsAndConditionsContent);
      }
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view)
      var collection = document.getElementsByTagName("iframe");
      for (let i = 0; i < collection.length; i++) {
        collection[i].tabIndex = -1;
        collection[i].ariaLabel = "Terms and conditions";
      }
    },
	toggleTnC: function (widget) {
      CommonUtilities.toggleFontCheckbox(widget);
      if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
        this.view.flxLblFontIcon.accessibilityConfig = {
          a11yLabel: "terms and conditions",
          a11yARIA: {
            "role": "checkbox",
            "aria-checked": false,
          }
        };
        CommonUtilities.disableButton(this.view.btnProceed);
        widget.skin = OLBConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
      }
      else {
        this.view.flxLblFontIcon.accessibilityConfig = {
          a11yLabel: "terms and conditions",
          a11yARIA: {
            "role": "checkbox",
            "aria-checked": true,
          }
        };
        CommonUtilities.enableButton(this.view.btnProceed);
        widget.skin = OLBConstants.SKINS.CHECKBOX_SELECTED_SKIN;
      }
    },
    agreeTnc: function () {
      FormControllerUtility.showProgressBar(this.view);
      var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsUIModule");
      termsAndConditionModule.presentationController.createTnC(OLBConstants.TNC_FLOW_TYPES.Login_TnC);
    },
    showError: function (error) {
      this.view.lblWrongInformation.setVisibility(true);
      this.view.lblWrongInformation.text = error.errorMessage;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    bindViewError : function(context){
      this.view.flxErrorMsg.isVisible = true;
      this.view.rtxErrorMsg.isVisible = true;
      this.view.flxErrorMsg.left = "10%";
      this.view.rtxErrorMsg.text = context;
    }
  };
});