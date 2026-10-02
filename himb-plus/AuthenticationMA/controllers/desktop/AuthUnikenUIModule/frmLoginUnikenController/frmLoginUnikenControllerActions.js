define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnNext **/
    AS_Button_a69ab187025245e8b8e5a23462b11af7: function AS_Button_a69ab187025245e8b8e5a23462b11af7(eventobject) {
        var self = this;
        this.requestOTPValue();
    },
    /** onClick defined for btnNext **/
    AS_Button_aa97ec81702a4dbe907684088aed8e96: function AS_Button_aa97ec81702a4dbe907684088aed8e96(eventobject) {
        var self = this;
        this.isOTPCorrect();
    },
    /** onClick defined for btnEnroll **/
    AS_Button_b317fcc30bc84a7b8e66e3c388c28082: function AS_Button_b317fcc30bc84a7b8e66e3c388c28082(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for btnYes **/
    AS_Button_ba2b6685dada4decbb3d8f1262063c55: function AS_Button_ba2b6685dada4decbb3d8f1262063c55(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnProceed **/
    AS_Button_cd03e8575e1749448a545600fbc1e4f6: function AS_Button_cd03e8575e1749448a545600fbc1e4f6(eventobject) {
        var self = this;
        this.letsGetStarted();
    },
    /** onClick defined for btnLoginLater **/
    AS_Button_ceb8e8e116d9495fa2dac1d9957c867c: function AS_Button_ceb8e8e116d9495fa2dac1d9957c867c(eventobject) {
        var self = this;
        this.loginLater(this.view.flxResetSuccessful);
    },
    /** onClick defined for btnNext **/
    AS_Button_d1030ef7501c47ab892ccbd09a02ea39: function AS_Button_d1030ef7501c47ab892ccbd09a02ea39(eventobject) {
        var self = this;
        this.isCVVCorrect();
    },
    /** onClick defined for btnBackToLogin **/
    AS_Button_d6fe194016df4837a132eb8c8950c7e9: function AS_Button_d6fe194016df4837a132eb8c8950c7e9(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for btnUseCVV **/
    AS_Button_e7f28b10ea02435a8cd4fdacc17e7763: function AS_Button_e7f28b10ea02435a8cd4fdacc17e7763(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnProceed **/
    AS_Button_f207b7aeb4074e48bb26498106d62023: function AS_Button_f207b7aeb4074e48bb26498106d62023(eventobject) {
        var self = this;
        this.loginLater(this.view.flxResetSuccessful);
    },
    /** onClick defined for btnNo **/
    AS_Button_f4e2bfa06c4449fc87ce2c81c580bd64: function AS_Button_f4e2bfa06c4449fc87ce2c81c580bd64(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for btnUseCVV **/
    AS_Button_f520703b516543a1b712a60d7776bb2d: function AS_Button_f520703b516543a1b712a60d7776bb2d(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnNext **/
    AS_Button_g43704a22d824df78bbc1978a3089482: function AS_Button_g43704a22d824df78bbc1978a3089482(eventobject) {
        var self = this;
        this.showResetConfirmationPage();
    },
    /** onClick defined for btnUseOTP **/
    AS_Button_i058fa2cd51449b5bc9dbff2379ef0c5: function AS_Button_i058fa2cd51449b5bc9dbff2379ef0c5(eventobject) {
        var self = this;
        this.useOTPForReset();
    },
    /** preShow defined for frmLoginUniken **/
    AS_Form_bcfb5a8749ea43fd881f76b5ca4378cb: function AS_Form_bcfb5a8749ea43fd881f76b5ca4378cb(eventobject) {
        var self = this;
        this.onPreShow();
    },
    /** onBreakpointChange defined for frmLoginUniken **/
    AS_Form_beef4459c1994b948b8d8585716890d2: function AS_Form_beef4459c1994b948b8d8585716890d2(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** postShow defined for frmLoginUniken **/
    AS_Form_d0c0ae09917648da9b8b89ca3a9d4038: function AS_Form_d0c0ae09917648da9b8b89ca3a9d4038(eventobject) {
        var self = this;
        this.onPostShow();
        if (!this.isOriginationFlow) {
            applicationManager.getTypeManager().initialiseAccountTypeManager();
            applicationManager.getTypeManager().initialiseTransactionTypeManager();
            applicationManager.getTypeManager().initialisePfmTypeManager();
        }
    },
    /** init defined for frmLoginUniken **/
    AS_Form_f5839f6238f34ed4ae3943dde2d88e21: function AS_Form_f5839f6238f34ed4ae3943dde2d88e21(eventobject) {
        var self = this;
        this.frmLoginInit();
    },
    /** onDeviceBack defined for frmLoginUniken **/
    AS_Form_g8e34d84884c48fdb6451481811dcf31: function AS_Form_g8e34d84884c48fdb6451481811dcf31(eventobject) {
        var self = this;
        kony.print("User pressed back button");
    },
    /** onTouchStart defined for imgViewCVV **/
    AS_Image_e77b027fd5d84c76964a0ec7604b58aa: function AS_Image_e77b027fd5d84c76964a0ec7604b58aa(eventobject, x, y) {
        var self = this;
        this.showOTP();
    },
    /** onTouchStart defined for lblHowToEnroll **/
    AS_Label_j94daf398aeb4d468fcb9005c6c6d3e5: function AS_Label_j94daf398aeb4d468fcb9005c6c6d3e5(eventobject, x, y) {
        var self = this;
        this.returnToLogin();
    },
    /** onTouchStart defined for lstbxCards **/
    AS_ListBox_ad099bd0f9cc48b9939641ef75360c54: function AS_ListBox_ad099bd0f9cc48b9939641ef75360c54(eventobject, x, y) {
        var self = this;
        // this.presenter.showCVVCards(this);
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_a2d575b1f3af4258a07b38b2012c8e7a: function AS_TextField_a2d575b1f3af4258a07b38b2012c8e7a(eventobject) {
        var self = this;
        this.otpCheck();
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_a3f6ac03a187473bbf2960c91b7852f8: function AS_TextField_a3f6ac03a187473bbf2960c91b7852f8(eventobject, changedtext) {
        var self = this;
        this.reTypeOTP();
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_ac4700dcba57462bbdabb1e9f3bff92b: function AS_TextField_ac4700dcba57462bbdabb1e9f3bff92b(eventobject) {
        var self = this;
        this.cvvCheck();
    },
    /** onKeyUp defined for tbxUserName **/
    AS_TextField_c9e0dcf9fe4b460e9792ee2e97731d2b: function AS_TextField_c9e0dcf9fe4b460e9792ee2e97731d2b(eventobject) {
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
    AS_TextField_d04f9885c6b04f388b784babc2c96fad: function AS_TextField_d04f9885c6b04f388b784babc2c96fad(eventobject) {
        var self = this;
        this.enableLogin(this.view.main.tbxUserName.text.trim(), this.view.main.tbxPassword.text);
        this.capsLockIndicatorForPassword();
    },
    /** onBeginEditing defined for tbxPassword **/
    AS_TextField_eaaf2daa822048279e9bf02ee5adc2ac: function AS_TextField_eaaf2daa822048279e9bf02ee5adc2ac(eventobject, changedtext) {
        var self = this;
        if (this.view.main.flxPassword.skin == "sknBorderFF0101") {
            this.credentialsMissingUIChangesAnti();
        }
    },
    /** onBeginEditing defined for tbxUserName **/
    AS_TextField_f22fd2a344af4391b291c52831287907: function AS_TextField_f22fd2a344af4391b291c52831287907(eventobject, changedtext) {
        var self = this;
        showSuggestion = true;
        this.showUserNamesBasedOnlength()
        this.setFocusSkin(this.view.main.flxUserName);
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_f63dd3d020ef418ca78f8da379b21a9b: function AS_TextField_f63dd3d020ef418ca78f8da379b21a9b(eventobject, changedtext) {
        var self = this;
        this.reEnterCVV();
    },
    /** onEndEditing defined for tbxUserName **/
    AS_TextField_f65ed472cbd1469d86ef56c1751c25d9: function AS_TextField_f65ed472cbd1469d86ef56c1751c25d9(eventobject, changedtext) {
        var self = this;
        this.hideUserNames();
        this.setNormalSkin(this.view.main.flxUserName);
        this.view.main.lblUsernameCapsLocIndicator.setVisibility(false);
    },
    /** onTouchStart defined for AlterneteActionsSignIn **/
    AS_UWI_af77fa861ecd4c86a3125888cf9f1af7: function AS_UWI_af77fa861ecd4c86a3125888cf9f1af7(eventobject, x, y) {
        var self = this;
        this.loginWithVerifiedUserName();
    },
    /** onTouchStart defined for AlterneteActionsEnterPIN **/
    AS_UWI_bde57cc49a854a9eabba11489c85beb4: function AS_UWI_bde57cc49a854a9eabba11489c85beb4(eventobject, x, y) {
        var self = this;
        this.goToResetUsingOTP();
    },
    /** onTouchStart defined for AlterneteActionsResetPassword **/
    AS_UWI_ccb7562f683c415d9d49e6eb78274f99: function AS_UWI_ccb7562f683c415d9d49e6eb78274f99(eventobject, x, y) {
        var self = this;
        this.goToPasswordResetOptionsPage();
    },
    /** onTouchStart defined for AlterneteActionsEnterCVV **/
    AS_UWI_d1d27d2d0cfe417a90fa2641dc000c16: function AS_UWI_d1d27d2d0cfe417a90fa2641dc000c16(eventobject, x, y) {
        var self = this;
        this.showEnterCVVPage();
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