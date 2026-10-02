define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    passwordPolicies : {
        "minLength": "",
        "maxLength": "",
        "supportedSymbols": "",
        "atleastOneNumber": "",
        "atleastOneSymbol": "",
        "atleastOneUpperCase": "",
        "atleastOneLowerCase": "",
        "charRepeatCount":""
      },
      passwordRegex: "",
      characterRepeatCountRegex :"",
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.usernamepasswordRules) this.getPasswordRules(viewModel.usernamepasswordRules);
        if (viewModel.usernamepasswordRules){
            this.setPasswordPolicies(viewModel.usernamepasswordRules);
        }
        if (viewModel.showVerificationByChoice) {
          this.updateRequirements();
        }
        if(viewModel.PinNotSet) {
          this.ShowPinNotSetError();
        }
        if (viewModel.verifyOtpError) this.showVerifyOtpError();
        if (viewModel.passwordServerError) this.showPasswordServerError(viewModel.passwordServerError);
        if (viewModel.wrongPassword) this.showWrongPasswordError();
        if (viewModel.passwordExists) this.showExistingPasswordError();
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);   
      }
      this.view.lblEditPasswordHeader.setActive(true);
    },
    preShow:function()
    {
      var self = this;
      this.view.customheadernew.btnSkipNav.onClick = function(){
        self.view.lblHeading.setActive(true);
    };
      this.view.flxRight.setVisibility(true);
      this.view.brsrTerms.skin= "sknlbla0a0a015px";
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Profile Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS","UsernamePassword");
      this.setSelectedValue("i18n.ProfileManagement.Username&Password");
      this.setAccessibility();
      this.view.forceLayout();
      this.view.flxLogout.onKeyPress = this.onKeyPressCallbackLogout;
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
    },

    onKeyPressCallbackLogout: function (eventObject, eventPayload) {
      var scopeObj = this;
      if (eventPayload.keyCode === 27) {
        if (scopeObj.view.flxDialogs.isVisible === true) {
          scopeObj.view.flxDialogs.setVisibility(false);
          scopeObj.view.flxLogout.setVisibility(false);
          scopeObj.view.customheadernew.btnLogout.setActive(true);
        }
      }
    }, 

    init:function(){
      var self=this;
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.preShow=this.preShow;
      this.view.postShow=this.postShow;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      this.setFlowActions();
    },
    ShowPinNotSetError:function(response){
        this.view.flxErrorEditPassword.setVisibility(true);
        this.view.tbxExistingPassword.text = "";
        this.view.tbxNewPassword.text = "";
        this.view.tbxConfirmPassword.text = "";
        this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.TPSetup");
        this.disableButton(this.view.btnEditPasswordProceed);
        this.view.forceLayout();
        FormControllerUtility.hideProgressBar(this.view);
    },
    /**
	* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
      var self = this;
      self.view.lblAccountSettingsMobile.text= kony.i18n.getLocalizedString(text) ;
    },
    getPasswordRules: function(data) {
      FormControllerUtility.hideProgressBar(this.view);
      if (data) {
       // this.view.rtxRulesPassword.text = data.passwordpolicies.content ;
        this.view.brsrTerms.htmlString=data.passwordpolicies.content;
		if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.brsrTerms.left="0dp";
        }
      } else {
        CommonUtilities.showServerDownScreen();
      }
    },
    showPasswordServerError: function(error) {
      this.view.flxErrorEditPassword.setVisibility(true);
      this.view.tbxExistingPassword.text = "";
      this.view.tbxNewPassword.text = "";
      this.view.tbxConfirmPassword.text = "";
      var errMsg;
      (error.dbpErrMsg)?errMsg=error.dbpErrMsg:errMsg=error.errmsg;
      this.view.lblError1.text = errMsg ;
      this.disableButton(this.view.btnEditPasswordProceed);
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
    //   var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   this.view.btnEditPasswordCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
    //   this.view.btnEditPasswordProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
    //    this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
       this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
    //   //this.view.lblEditPasswordHeader= kony.i18n.getLocalizedString("i18n.ProfileManagement.EditPassword"), accessibilityConfig);
    //   //this.view.lblExistingPassword= kony.i18n.getLocalizedString("i18n.ProfileManagement.ExistingPassword"), accessibilityConfig);
    //   //this.view.lblNewPassword= kony.i18n.getLocalizedString("i18n.ProfileManagement.NewPassword"), accessibilityConfig);
    //   //this.view.lblConfirmPassword= kony.i18n.getLocalizedString("i18n.ProfileManagement.ConfirmPassword"), accessibilityConfig);
    //   //this.view.lblEditPasswodRules= kony.i18n.getLocalizedString("i18n.ProfileManagement.Pleasenotethefollowingthings"), accessibilityConfig);
    //   //this.view.btnEditPasswordCancel= kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
    //   //this.view.btnEditPasswordProceed= kony.i18n.getLocalizedString("i18n.common.proceed"), accessibilityConfig);
    //   //this.view.lblHeading= kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      this.view.lblEditPasswordHeader.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "tagName": "h2"
      };
    //   this.view.lblExistingPassword.accessibilityConfig = {
    //     "a11yLabel": ""
    //   };
    //   this.view.lblNewPassword.accessibilityConfig = {
    //     "a11yLabel": ""
    //   };
    //   this.view.lblConfirmPassword.accessibilityConfig = {
    //     "a11yLabel": ""
    //   };
      this.view.btnEditPasswordCancel.accessibilityConfig = {
        "a11yLabel": "Cancel edit password process"
     };
     this.view.btnEditPasswordProceed.accessibilityConfig = {
        "a11yLabel": "Continue to authentication"
     };
    //  this.view.lblCollapseMobile.accessibilityConfig = {
    //     "a11yARIA": {
    //         "tabindex": -1
    //     }
    //   };
    //   this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
    //     "a11yLabel": "Dropdown"
    //   };
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblEditPasswordHeader.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
    this.view.tbxConfirmPassword.accessibilityConfig = {
      "a11yARIA": {
        "tabindex": 0,
        "aria-autocomplete":"none"
    }

    };
    this.view.tbxExistingPassword.accessibilityConfig = {
      "a11yARIA": {
        "tabindex": 0,
        "aria-autocomplete":"none"
    }
    };
    this.view.tbxNewPassword.accessibilityConfig = {
      "a11yARIA": {
        "tabindex": 0,
        "aria-autocomplete":"none"
    }
    }
    
    }, 
    /**
       * Method to show error while updating the password and ad password is not same for the existing password entered by user
       */
    showExistingPasswordError: function() {
      this.disableButton(this.view.btnEditPasswordProceed);
      this.view.flxErrorEditPassword.setVisibility(true);
      this.view.tbxExistingPassword.text = "";
      this.view.tbxNewPassword.text = "";
      this.view.tbxConfirmPassword.text = "";
      this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.passwordExists") ;
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
      * Method used to show the invalid credentials error message when trying to change password.
      */
    showWrongPasswordError: function(){
      this.disableButton(this.view.btnEditPasswordProceed);
      this.view.flxErrorEditPassword.setVisibility(true);
      this.view.tbxExistingPassword.text = "";
      this.view.tbxNewPassword.text = "";
      this.view.tbxConfirmPassword.text = "";
      this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.idm.existingPasswordMismatch") ;
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
       * Method to show error while verifying OTP from backend
       */
    showVerifyOtpError: function() {
      this.view.settings.flxErrorSecuritySettingsVerification.setVisibility(true);
      this.view.settings.lblErrorSecuritySettingsVerification.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.invalidCode") ;
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    updateRequirements: function() {
      var self = this;
      FormControllerUtility.showProgressBar(self.view);
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.updatePassword(self.view.tbxExistingPassword.text,self.view.tbxNewPassword.text);
    },
    onBreakpointChange: function (width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        this.view.customheadernew.lblHeaderMobile.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings");
        this.view.flxLogout.top = "50dp";
        this.view.CustomPopup.height = "250dp";
      }
      this.view.forceLayout();      
    },
    // isPasswordValid: function(enteredPassword) {
    //   var validationUtility = applicationManager.getValidationUtilManager();
    //   var isValidPassword =  validationUtility.isPasswordValidForPolicy(enteredPassword);
    //   var userName = kony.mvc.MDAApplication.getSharedInstance().appContext.username;
    //   if (isValidPassword && !this.hasConsecutiveDigits(enteredPassword) && enteredPassword !== userName && this.view.tbxExistingPassword.text.length > 0) {
    //     return true;
    //   }
    //   return false;
    // },
    // isPasswordValid: function(enteredPassword) {
    //         enteredPassword = enteredPassword.trim();
    //         // Allow all characters, including special characters — only length is validated
    //         if (enteredPassword.length >= 6 && enteredPassword.length <= 64 ) {
    //             return true;
    //         }
    //         return false;
    //     },
      setPasswordPolicies: function (data) {
            var scopeObj = this;
            FormControllerUtility.hideProgressBar(this.view);
            if (data) {
                scopeObj.passwordPolicies.minLength = data.passwordrules.minLength;
                scopeObj.passwordPolicies.maxLength = data.passwordrules.maxLength;
                scopeObj.passwordPolicies.supportedSymbols = data.passwordrules.supportedSymbols;
                scopeObj.passwordPolicies.atleastOneNumber = data.passwordrules.atleastOneNumber;
                scopeObj.passwordPolicies.atleastOneSymbol = data.passwordrules.atleastOneSymbol;
                scopeObj.passwordPolicies.atleastOneUpperCase = data.passwordrules.atleastOneUpperCase;
                scopeObj.passwordPolicies.atleastOneLowerCase = data.passwordrules.atleastOneLowerCase;
                scopeObj.passwordPolicies.charRepeatCount = data.passwordrules.charRepeatCount;
          }
          else {
                CommonUtilities.showServerDownScreen();
            }
    },
    isPasswordValidForLength: function(data, text) {
            let scopeObj = this;
			var flag=false;
			if(data.minLength && data.maxLength){
             var passwordRegexLength = new RegExp("^.{" + data.minLength + "," +data.maxLength + "}$");
            flag= passwordRegexLength.test(text);
			}
			return flag;
        },
    isPasswordValid: function(data, text) {
           let self = this;
            if (self.passwordRegex === "" && self.characterRepeatCountRegex === "") {
                let repeatedCharRules = "(.)\\1{" + data.charRepeatCount + ",}";
                self.characterRepeatCountRegex = new RegExp(repeatedCharRules, "\s");
                let passwordRules = "";
                if (data.supportedSymbols.indexOf("-") > -1) {
                    data.supportedSymbols = data.supportedSymbols.replace("-", "\\-");
                }
                if (data.supportedSymbols && data.supportedSymbols.includes(",")) {
                    data.supportedSymbols = data.supportedSymbols.replaceAll(",", "");
                }
                if (data.atleastOneLowerCase !== undefined && data.atleastOneLowerCase === "true") {
                    passwordRules += "(?=.*\[a-z\])";
                }
                if (data.atleastOneUpperCase !== undefined && data.atleastOneUpperCase === "true") {
                    passwordRules += "(?=.*\[A-Z\])";
                }
                if (data.atleastOneNumber !== undefined && data.atleastOneNumber === "true") {
                    passwordRules += "(?=.*\\d)";
                }
                if (data.atleastOneSymbol !== undefined && data.atleastOneSymbol === "true") {
                    passwordRules = passwordRules + "(?=(.*\[" + data.supportedSymbols + "\]))";
                    self.passwordRegex = new RegExp(passwordRules + "[A-Za-z0-9" + data.supportedSymbols + "]{" + data.minLength + "," + data.maxLength + "}$");
                }
                if (data.charRepeatCount === undefined) {
                    passwordRules += /(.)\1{3,}/;
                } else {
					let minlength = "(?=.*[\\w])^.{" + data.minLength + "," + data.maxLength + "}$";
					passwordRules= passwordRules + minlength;
					self.passwordRegex = new RegExp(passwordRules,"\s");
                }
            }
            if (text.match(self.passwordRegex) && text.match(self.characterRepeatCountRegex) === null) {
                return true;
            }
            return false;
        },
    
    /**
       * Method to Check whether the entered text has consecutive digits or not
       * @param {Int} input - field entered by the User
       */
    hasConsecutiveDigits: function(input) {
      var i;
      var count = 0;
      for (i = 0; i < input.length; i++) {
        // alert(abc[i]);
        if (input[i] >= 0 && input[i] <= 9)
          count++;
        else
          count = 0;
        if (count === 9)
          return true;
      }
      return false;
    },
    setFlowActions:function(){
      var scopeObj=this;
      scopeObj.view.imgView1.src = "view.png";
      scopeObj.view.imgView2.src = "view.png";
      scopeObj.view.imgView3.src = "view.png";
      scopeObj.view.tbxNewPassword.secureTextEntry = true;
      scopeObj.view.imgView1.onTouchStart = function () {
          let isSecuredText = scopeObj.view.tbxExistingPassword.secureTextEntry;
          scopeObj.view.tbxExistingPassword.secureTextEntry = !isSecuredText;
          scopeObj.view.imgView1.src = !isSecuredText ? "view.png" : "eye_slash.png";
        };
        scopeObj.view.imgView2.onTouchStart = function () {
          let isSecuredText = scopeObj.view.tbxNewPassword.secureTextEntry;
          scopeObj.view.tbxNewPassword.secureTextEntry = !isSecuredText;
          scopeObj.view.imgView2.src = !isSecuredText ? "view.png" : "eye_slash.png";
        };
        scopeObj.view.imgView3.onTouchStart = function () {
          let isSecuredText = scopeObj.view.tbxConfirmPassword.secureTextEntry;
          scopeObj.view.tbxConfirmPassword.secureTextEntry = !isSecuredText;
          scopeObj.view.imgView3.src = !isSecuredText ? "view.png" : "eye_slash.png";
        };  
     /* this.view.tbxExistingPassword.onTextChange = function(){
          //scopeObj.view.tbxExistingPassword.text = scopeObj.view.tbxExistingPassword.text.trim() ;
          scopeObj.view.tbxExistingPassword.accessibilityConfig ={
               "a11yValue":scopeObj.view.tbxExistingPassword.text.trim()
          }
      };
      this.view.tbxNewPassword.onTextChange = function(){
          //scopeObj.view.tbxNewPassword.text = scopeObj.view.tbxNewPassword.text.trim() ;
          scopeObj.view.tbxNewPassword.accessibilityConfig ={
               "a11yValue":scopeObj.view.tbxNewPassword.text.trim()
          }
      };
      this.view.tbxConfirmPassword.onTextChange = function(){
          //scopeObj.view.tbxConfirmPassword.text = scopeObj.view.tbxConfirmPassword.text.trim() ;
          scopeObj.view.tbxConfirmPassword.accessibilityConfig ={
               "a11yValue":scopeObj.view.tbxConfirmPassword.text.trim()
          }
      };*/
      this.disableButton(this.view.btnEditPasswordProceed);
      if (CommonUtilities.isCSRMode()) {
        scopeObj.view.btnEditPasswordProceed.onClick = CommonUtilities.disableButtonActionForCSRMode();
        scopeObj.view.btnEditPasswordProceed.skin = CommonUtilities.disableButtonSkinForCSRMode();
      }else{
        scopeObj.view.tbxExistingPassword.onKeyUp = function() {
                    scopeObj.ValidateExistingPassword();
                }.bind(this);
        scopeObj.view.tbxNewPassword.onKeyUp = function() {
            scopeObj.ValidatePassword();
            scopeObj.ValidateExistingPassword();
        }.bind(this);
        scopeObj.view.tbxConfirmPassword.onKeyUp = function() {
          scopeObj.ValidatePassword();
          scopeObj.ValidateExistingPassword();
        }.bind(this);
        scopeObj.view.btnEditPasswordProceed.onClick = function() {
          if (this.view.tbxNewPassword.text != "" && this.view.tbxConfirmPassword.text != "") {
            if(!this.isPasswordValidAndMatchedWithReEnteredValue()){
              this.disableButton(this.view.btnEditPasswordProceed);
              this.view.flxErrorEditPassword.setVisibility(true);
              this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch");
              }
            else if ((!this.isPasswordValid(this.passwordPolicies,this.view.tbxNewPassword.text))||(!this.isPasswordValid(this.passwordPolicies,this.view.tbxConfirmPassword.text))) {
              this.view.lblError1.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.YourPasswordDoesnotMeetTheCriteria");
              this.disableButton(this.view.btnEditPasswordProceed);
              //this.view.tbxNewPassword.text = "" ; this.view.tbxConfirmPassword.text = "";
              this.view.flxErrorEditPassword.setVisibility(true);
              } 
            else {
                this.view.flxErrorEditPassword.setVisibility(false);
                scopeObj.view.flxErrorEditPassword.setVisibility(false);
                    FormControllerUtility.showProgressBar(scopeObj.view);
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "SettingsNewUIModule",
                        "appName": "ManageProfileMA"
                    }).presentationController.checkExistingPassword(scopeObj.view.tbxExistingPassword.text);
               
                        }
                    }
                
                    }.bind(this);
        this.view.btnEditPasswordCancel.onClick = function() {
          applicationManager.getNavigationManager().navigateTo("frmUsernameAndPassword");          
        };
      }
    },
    enableButton: function(button) {
      if(!CommonUtilities.isCSRMode()){
        button.setEnabled(true);
        button.skin = "sknBtnNormalSSPFFFFFF15pxradius6";
        //button.hoverSkin = "sknbtnSSPffffff15px0273e3bg";
        button.focusSkin = "sknBtnNormalSSPFFFFFF15pxradius6";
      }
    },
   /* ValidatePassword: function() {
      if ((this.isPasswordValid(this.view.tbxNewPassword.text)) && (this.isPasswordValid(this.view.tbxConfirmPassword.text))) {
        if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
          this.enableButton(this.view.btnEditPasswordProceed);
          this.view.flxErrorEditPassword.setVisibility(false);
        } else {
          this.disableButton(this.view.btnEditPasswordProceed);
          this.view.flxErrorEditPassword.setVisibility(true);
          this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch");
        }
      } else {
        if (!this.isPasswordValidAndMatchedWithReEnteredValue()) {
          if (this.view.tbxNewPassword.text !== "" && this.view.tbxConfirmPassword.text !== "") 
            this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch");
            this.disableButton(this.view.btnEditPasswordProceed);
            this.view.flxErrorEditPassword.setVisibility(true);
          }
          else {
            if((!this.isPasswordValid(this.view.tbxNewPassword.text)) && this.view.tbxNewPassword.text !== ""){
              this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.YourPasswordDoesnotMeetTheCriteria");
              this.disableButton(this.view.btnEditPasswordProceed);
              this.view.flxErrorEditPassword.setVisibility(true);
            }
            else{
              this.view.flxErrorEditPassword.setVisibility(false);
            }
          }
        }
      }
      this.view.forceLayout();
    },*/
     ValidateExistingPassword: function(){
             if(this.view.tbxExistingPassword.text == ""){
                    this.disableButton(this.view.btnEditPasswordProceed);
                       // this.view.flxErrorEditPassword.setVisibility(true);
                    }
                        else{
                       this.ValidatePassword();
                        }
        },
    /*ValidatePassword: function() {
            this.view.flxErrorEditPassword.setVisibility(false);
            if ((this.isPasswordValid(this.view.tbxNewPassword.text)) && (this.isPasswordValid(this.view.tbxConfirmPassword.text))) {
                if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
                    this.enableButton(this.view.btnEditPasswordProceed);
                    this.view.flxErrorEditPassword.setVisibility(false);
                } else {
                    this.disableButton(this.view.btnEditPasswordProceed);
                    this.view.flxErrorEditPassword.setVisibility(true);
                    this.view.lblError1.text = kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch");
                }
            } else {
                 if (this.view.tbxNewPassword.text == "" || this.view.tbxConfirmPassword.text == "" || this.isPasswordValidAndMatchedWithReEnteredValue() ) {
                        this.view.lblError1.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.YourPasswordDoesnotMeetTheCriteria");
                        this.disableButton(this.view.btnEditPasswordProceed);
                        this.view.flxErrorEditPassword.setVisibility(true);
                    }
                else if (!this.isPasswordValidAndMatchedWithReEnteredValue()) {
                    if(this.view.tbxNewPassword.text != "" || this.view.tbxConfirmPassword.text != ""){
                        this.view.lblError1.text= kony.i18n.getLocalizedString("i18n.ProfileManagement.YourPasswordDoesnotMeetTheCriteria");
                        this.disableButton(this.view.btnEditPasswordProceed);
                        this.view.flxErrorEditPassword.setVisibility(true);
                    }
                   else {
                        if ((!this.isPasswordValid(this.view.tbxNewPassword.text)) && this.view.tbxNewPassword.text !== "" ) {
                            this.view.lblError1.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.YourPasswordDoesnotMeetTheCriteria");
                            this.disableButton(this.view.btnEditPasswordProceed);
                            this.view.flxErrorEditPassword.setVisibility(true);
                        } else {
                            this.view.flxErrorEditPassword.setVisibility(false);
                        }
                        if ((!this.isPasswordValid(this.view.tbxConfirmPassword.text)) && this.view.tbxConfirmPassword.text !== "" ) {
                            this.view.lblError1.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.YourPasswordDoesnotMeetTheCriteria");
                            this.disableButton(this.view.btnEditPasswordProceed);
                            this.view.flxErrorEditPassword.setVisibility(true);
                        } else {
                            this.view.flxErrorEditPassword.setVisibility(false);
                        }
                    }
                }
            }
            this.view.forceLayout();
        },*/
        ValidatePassword: function() {
            this.view.flxErrorEditPassword.setVisibility(false);
            if ((this.isPasswordValidForLength(this.passwordPolicies,this.view.tbxNewPassword.text)) && (this.isPasswordValidForLength(this.passwordPolicies,this.view.tbxConfirmPassword.text))) {
              this.enableButton(this.view.btnEditPasswordProceed);
              this.view.flxErrorEditPassword.setVisibility(false);
            }
            else {
              this.disableButton(this.view.btnEditPasswordProceed);
              this.view.flxErrorEditPassword.setVisibility(false);
              // this.view.lblError1.text = kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch");
              }
          this.view.forceLayout();
        },
    /**
       * Method to Check whether the password is valid and matches with the re entered password
       */
    isPasswordValidAndMatchedWithReEnteredValue: function() {
      if (this.view.tbxNewPassword.text && this.view.tbxConfirmPassword.text) {
        if (this.view.tbxNewPassword.text === this.view.tbxConfirmPassword.text) {
          return true;
        }
      }
      return false;
    },
    /**
       * Method to Disable a button
       * @param {String} button - ID of the button to be disabled
       */
    disableButton: function(button) {
      button.setEnabled(false);
      button.skin = "ICSknbtnDisablede2e9f036px";
      //button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
      button.focusSkin = "ICSknbtnDisablede2e9f036px";
    },
    /**
	*  Method to set ui for the component in mobile breakpoint
	*/
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          a11yARIA:{
            role:"button",
            "aria-expanded": true
          }
        };
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          a11yARIA:{
            role:"button",
            "aria-expanded": false
          }
        };
      }
    }, 
    /**
	* *@param {Boolean} isLoading- True or false to show/hide the progess bar
	*  Method to set show/hide the progess bar
	*/
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    postShow: function() { 
      this.view.lblEditPasswordHeader.skin="sknSSPSemiBold42424215px";
      this.view.flxError.skin="sknFlxffffffBorderRounded";
      this.view.flxLeft.skin="slFbox";
      this.view.flxRight.skin="slFbox";
      this.view.flxMain.skin="flxWhite";
      this.view.tbxExistingPassword.skin="skntbxroundborderhbl";
      this.view.tbxNewPassword.skin="skntbxroundborderhbl";
      this.view.tbxConfirmPassword.skin="skntbxroundborderhbl";
      this.view.btnEditPasswordCancel.skin="sknBtnBorderPx2eaebf1";
      this.view.btnEditPasswordCancel.hoverSkin="SknbtnroundcornerA51C306pxradius";
      this.view.btnEditPasswordCancel.focusSkin="sknBtnBorderPx2eaebf1";
      this.view.flxMainContainer.skin="sknFlxffffffBorderRounded";
      this.view.btnEditPasswordProceed.skin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnEditPasswordProceed.hoverSkin="sknBtnNormalSSPFFFFFF15pxradius6";
      this.view.btnEditPasswordProceed.focusSkin="sknBtnNormalSSPFFFFFF15pxradius6";
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight -this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp"; 
      this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.btnEditPasswordProceed.skin = CommonUtilities.disableButtonSkinForCSRMode();
	    if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.flxFooter.height = "260dp";
                this.view.imgView2.centerY = "50%";
                this.view.imgView3.centerY = "50%";
            }
	this.view.lblEditPasswordHeader.setActive(true); 
    },
  };
});
