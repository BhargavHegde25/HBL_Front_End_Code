define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnUseCVV **/
    AS_Button_b014ab53d3c6421cb0d39f83ae5e147f: function AS_Button_b014ab53d3c6421cb0d39f83ae5e147f(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnUseCVV **/
    AS_Button_bdb7d79246ab43e38d477d71090512cd: function AS_Button_bdb7d79246ab43e38d477d71090512cd(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnProceed **/
    AS_Button_c3f3b614ef974d01822ba57f93ce1714: function AS_Button_c3f3b614ef974d01822ba57f93ce1714(eventobject) {
        var self = this;
        this.letsGetStarted();
    },
    /** onClick defined for btnUseOTP **/
    AS_Button_da99080919b041c4ac365b2690a28094: function AS_Button_da99080919b041c4ac365b2690a28094(eventobject) {
        var self = this;
        this.useOTPForReset();
    },
    /** onClick defined for btnEnroll **/
    AS_Button_e5560a494d924458bc9240c27758a826: function AS_Button_e5560a494d924458bc9240c27758a826(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for btnNext **/
    AS_Button_e674540514d44d46a690c2ba43e3d1bf: function AS_Button_e674540514d44d46a690c2ba43e3d1bf(eventobject) {
        var self = this;
        this.isOTPCorrect();
    },
    /** onClick defined for btnProceed **/
    AS_Button_ea17702b24d74d10b184d18ad2c0577a: function AS_Button_ea17702b24d74d10b184d18ad2c0577a(eventobject) {
        var self = this;
        this.loginLater(this.view.flxResetSuccessful);
    },
    /** onClick defined for btnNext **/
    AS_Button_ec982f6c3e4d43dda32d288ea7cb89ea: function AS_Button_ec982f6c3e4d43dda32d288ea7cb89ea(eventobject) {
        var self = this;
        this.isCVVCorrect();
    },
    /** onClick defined for btnYes **/
    AS_Button_f30ad6790c514d8b9e3a3b6642ab8841: function AS_Button_f30ad6790c514d8b9e3a3b6642ab8841(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnNext **/
    AS_Button_g8926370565949d99200dc018568c10c: function AS_Button_g8926370565949d99200dc018568c10c(eventobject) {
        var self = this;
        this.showResetConfirmationPage();
    },
    /** onClick defined for btnBackToLogin **/
    AS_Button_hb4e02e809db4e1bae0ba4b9556b99ea: function AS_Button_hb4e02e809db4e1bae0ba4b9556b99ea(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for btnLoginLater **/
    AS_Button_ie4688df9bed49909277fa74cc9a8cce: function AS_Button_ie4688df9bed49909277fa74cc9a8cce(eventobject) {
        var self = this;
        this.loginLater(this.view.flxResetSuccessful);
    },
    /** onClick defined for btnNo **/
    AS_Button_ja24bde46bf44018b58917cff76e85aa: function AS_Button_ja24bde46bf44018b58917cff76e85aa(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for btnNext **/
    AS_Button_je1a71e9e3a441829c006de52cf56f16: function AS_Button_je1a71e9e3a441829c006de52cf56f16(eventobject) {
        var self = this;
        this.requestOTPValue();
    },
    /** preShow defined for frmLogin **/
    AS_Form_a00d69b6a6fe4e8f982b0de8159a5f3b: function AS_Form_a00d69b6a6fe4e8f982b0de8159a5f3b(eventobject) {
        var self = this;
        this.onPreShow();
    },
    /** onDeviceBack defined for frmLogin **/
    AS_Form_c876da882d124a0aa022ca5dc35ec6d6: function AS_Form_c876da882d124a0aa022ca5dc35ec6d6(eventobject) {
        var self = this;
        kony.print("User pressed back button");
    },
    /** onBreakpointChange defined for frmLogin **/
    AS_Form_c9b1074774c146c49c05e5e3e32857c9: function AS_Form_c9b1074774c146c49c05e5e3e32857c9(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** postShow defined for frmLogin **/
    AS_Form_df5e80bd9a794da2b4e45afaa435f2e4: function AS_Form_df5e80bd9a794da2b4e45afaa435f2e4(eventobject) {
        var self = this;
        this.onPostShow();
        if (!this.isOriginationFlow) {
            applicationManager.getTypeManager().initialiseAccountTypeManager();
            applicationManager.getTypeManager().initialiseTransactionTypeManager();
            applicationManager.getTypeManager().initialisePfmTypeManager();
        }
    },
    /** init defined for frmLogin **/
    AS_Form_g3cb493f4556464f917fe3924464890b: function AS_Form_g3cb493f4556464f917fe3924464890b(eventobject) {
        var self = this;
        this.frmLoginInit();
    },
    /** onTouchStart defined for imgViewCVV **/
    AS_Image_a77ff3d5f598477d96ba8a7a74a917ea: function AS_Image_a77ff3d5f598477d96ba8a7a74a917ea(eventobject, x, y) {
        var self = this;
        this.showOTP();
    },
    /** onTouchStart defined for lblHowToEnroll **/
    AS_Label_hbeccaed576f4fe2b9a931795bd748aa: function AS_Label_hbeccaed576f4fe2b9a931795bd748aa(eventobject, x, y) {
        var self = this;
        this.returnToLogin();
    },
    /** onTouchStart defined for lstbxCards **/
    AS_ListBox_c790c4d06bea4977bc373f4d4d1d535c: function AS_ListBox_c790c4d06bea4977bc373f4d4d1d535c(eventobject, x, y) {
        var self = this;
        // this.presenter.showCVVCards(this);
    },
    /** onEndEditing defined for tbxUserName **/
    AS_TextField_ba5381fb58bc4e69a7e5366199a2aecb: function AS_TextField_ba5381fb58bc4e69a7e5366199a2aecb(eventobject, changedtext) {
        var self = this;
        this.hideUserNames();
        this.setNormalSkin(this.view.main.flxUserName);
        this.view.main.lblUsernameCapsLocIndicator.setVisibility(false);
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_c2d9de5f0b544570a165739090cb744c: function AS_TextField_c2d9de5f0b544570a165739090cb744c(eventobject, changedtext) {
        var self = this;
        this.reEnterCVV();
    },
    /** onKeyUp defined for tbxUserName **/
    AS_TextField_cfa0d44f49e44ed09ae7f7c35af168f4: function AS_TextField_cfa0d44f49e44ed09ae7f7c35af168f4(eventobject) {
        var self = this;
        this.checkifUserNameContainsMaskCharacter();
        this.capsLockIndicatorForUserName();
        /*var orientationHandler = new OrientationHandler();
        if (kony.application.getCurrentBreakpoint() > 1024 && orientationHandler.isDesktop) {
          if (event.getModifierState("CapsLock")) {
            this.view.main.lblUsernameCapsLocIndicator.setVisibility(true);
          } else {
            this.view.main.lblUsernameCapsLocIndicator.setVisibility(false);
          }
          this.view.forceLayout();
        }*/
    },
    /** onKeyUp defined for tbxPassword **/
    AS_TextField_d95ee59d841c471cb206a8bf70db7295: function AS_TextField_d95ee59d841c471cb206a8bf70db7295(eventobject) {
        var self = this;
        this.enableLogin(this.view.main.tbxUserName.text.trim(), this.view.main.tbxPassword.text);
        this.capsLockIndicatorForPassword();
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_e1039fff3fb44a11822e0ea10aa5484e: function AS_TextField_e1039fff3fb44a11822e0ea10aa5484e(eventobject) {
        var self = this;
        this.cvvCheck();
    },
    /** onBeginEditing defined for tbxPassword **/
    AS_TextField_e48f6a4124bf4de286d0c4a912983d38: function AS_TextField_e48f6a4124bf4de286d0c4a912983d38(eventobject, changedtext) {
        var self = this;
        if (this.view.main.flxPassword.skin == "sknBorderFF0101") {
            this.credentialsMissingUIChangesAnti();
        }
    },
    /** onBeginEditing defined for tbxUserName **/
    AS_TextField_ed806356b3314d86b37761258f426fca: function AS_TextField_ed806356b3314d86b37761258f426fca(eventobject, changedtext) {
        var self = this;
        showSuggestion = true;
        this.showUserNamesBasedOnlength()
        this.setFocusSkin(this.view.main.flxUserName);
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_g6943b93f48a40b4b3253ac5cc4bacc3: function AS_TextField_g6943b93f48a40b4b3253ac5cc4bacc3(eventobject) {
        var self = this;
        this.otpCheck();
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_j0019f86f656471d85690a0d9c52a0fe: function AS_TextField_j0019f86f656471d85690a0d9c52a0fe(eventobject, changedtext) {
        var self = this;
        this.reTypeOTP();
    },
    /** onTouchStart defined for AlterneteActionsEnterPIN **/
    AS_UWI_d63f35e0cf744eaab601100605282f5d: function AS_UWI_d63f35e0cf744eaab601100605282f5d(eventobject, x, y) {
        var self = this;
        this.goToResetUsingOTP();
    },
    /** onTouchStart defined for AlterneteActionsEnterCVV **/
    AS_UWI_ed53609c73864a7187559ff06aed44c6: function AS_UWI_ed53609c73864a7187559ff06aed44c6(eventobject, x, y) {
        var self = this;
        this.showEnterCVVPage();
    },
    /** onTouchStart defined for AlterneteActionsSignIn **/
    AS_UWI_febaf38267ab420ea10a7175c9a77888: function AS_UWI_febaf38267ab420ea10a7175c9a77888(eventobject, x, y) {
        var self = this;
        this.loginWithVerifiedUserName();
    },
    /** onTouchStart defined for AlterneteActionsResetPassword **/
    AS_UWI_g49f33dc26c54fb5af2ced556a943d58: function AS_UWI_g49f33dc26c54fb5af2ced556a943d58(eventobject, x, y) {
        var self = this;
        this.goToPasswordResetOptionsPage();
    }
});