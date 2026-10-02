define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnUseCVV **/
    AS_Button_b2f845f5cf7e4ae59a8c251b5d1f7bfb: function AS_Button_b2f845f5cf7e4ae59a8c251b5d1f7bfb(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnUseCVV **/
    AS_Button_b77f9ef8afce487293ddc25e7193099f: function AS_Button_b77f9ef8afce487293ddc25e7193099f(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnNext **/
    AS_Button_cb769b4a12544911bf9472ca42016aae: function AS_Button_cb769b4a12544911bf9472ca42016aae(eventobject) {
        var self = this;
        this.showResetConfirmationPage();
    },
    /** onClick defined for btnNo **/
    AS_Button_d16c49eba9754b039ce026728c664e14: function AS_Button_d16c49eba9754b039ce026728c664e14(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for btnProceed **/
    AS_Button_d1f534e4fca646bf96ba33d270454a5d: function AS_Button_d1f534e4fca646bf96ba33d270454a5d(eventobject) {
        var self = this;
        this.loginLater(this.view.flxResetSuccessful);
    },
    /** onClick defined for btnEnroll **/
    AS_Button_dd516463bf284c4c99016527ec6a46cb: function AS_Button_dd516463bf284c4c99016527ec6a46cb(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for btnLoginLater **/
    AS_Button_e36d3c931e66482b9543cb8b8f6502c5: function AS_Button_e36d3c931e66482b9543cb8b8f6502c5(eventobject) {
        var self = this;
        this.loginLater(this.view.flxResetSuccessful);
    },
    /** onClick defined for btnBackToLogin **/
    AS_Button_e594e61dca63424394988008ed9111b8: function AS_Button_e594e61dca63424394988008ed9111b8(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for btnNext **/
    AS_Button_e9b1a255532f4f94844b8c8b684b6127: function AS_Button_e9b1a255532f4f94844b8c8b684b6127(eventobject) {
        var self = this;
        this.isCVVCorrect();
    },
    /** onClick defined for btnProceed **/
    AS_Button_fd159e852a9b435aad46a3f89a07a00b: function AS_Button_fd159e852a9b435aad46a3f89a07a00b(eventobject) {
        var self = this;
        this.letsGetStarted();
    },
    /** onClick defined for btnYes **/
    AS_Button_fff3ef302d65405c97d3671c20687ff6: function AS_Button_fff3ef302d65405c97d3671c20687ff6(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnUseOTP **/
    AS_Button_g7fee8bf487e4e7a85f42759e1ef3f7c: function AS_Button_g7fee8bf487e4e7a85f42759e1ef3f7c(eventobject) {
        var self = this;
        this.useOTPForReset();
    },
    /** onClick defined for btnNext **/
    AS_Button_ha4c0903beca46208dd3ba8551edfa0f: function AS_Button_ha4c0903beca46208dd3ba8551edfa0f(eventobject) {
        var self = this;
        this.requestOTPValue();
    },
    /** onClick defined for btnNext **/
    AS_Button_i593ef8879bb42e3b2501a0230d38da1: function AS_Button_i593ef8879bb42e3b2501a0230d38da1(eventobject) {
        var self = this;
        this.isOTPCorrect();
    },
    /** postShow defined for frmLoginHID **/
    AS_Form_aeec0dd7003f4da68db7dd88d59ee694: function AS_Form_aeec0dd7003f4da68db7dd88d59ee694(eventobject) {
        var self = this;
        this.onPostShow();
        if (!this.isOriginationFlow) {
            applicationManager.getTypeManager().initialiseAccountTypeManager();
            applicationManager.getTypeManager().initialiseTransactionTypeManager();
            applicationManager.getTypeManager().initialisePfmTypeManager();
        }
    },
    /** onBreakpointChange defined for frmLoginHID **/
    AS_Form_c9b1074774c146c49c05e5e3e32857c9: function AS_Form_c9b1074774c146c49c05e5e3e32857c9(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** onDeviceBack defined for frmLoginHID **/
    AS_Form_f7477ae01a7141a789c0e557b6d4ce5c: function AS_Form_f7477ae01a7141a789c0e557b6d4ce5c(eventobject) {
        var self = this;
        kony.print("User pressed back button");
    },
    /** preShow defined for frmLoginHID **/
    AS_Form_ie0ea2624c1c4ec58109b1ac1de4d639: function AS_Form_ie0ea2624c1c4ec58109b1ac1de4d639(eventobject) {
        var self = this;
        this.onPreShow();
    },
    /** init defined for frmLoginHID **/
    AS_Form_jcb845d499a9435ba923e5832be086de: function AS_Form_jcb845d499a9435ba923e5832be086de(eventobject) {
        var self = this;
        this.frmLoginInit();
    },
    /** onTouchStart defined for imgViewCVV **/
    AS_Image_a48dfe1ed6ad44a293f1b6b2143f9ad9: function AS_Image_a48dfe1ed6ad44a293f1b6b2143f9ad9(eventobject, x, y) {
        var self = this;
        this.showOTP();
    },
    /** onTouchStart defined for lblHowToEnroll **/
    AS_Label_bc60f9f54b7a42dbab671e9a6782619b: function AS_Label_bc60f9f54b7a42dbab671e9a6782619b(eventobject, x, y) {
        var self = this;
        this.returnToLogin();
    },
    /** onTouchStart defined for lstbxCards **/
    AS_ListBox_i1da16a3e3754092bcb462916c9e2557: function AS_ListBox_i1da16a3e3754092bcb462916c9e2557(eventobject, x, y) {
        var self = this;
        // this.presenter.showCVVCards(this);
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_ac24ea3b7a074a8d848807d03893de67: function AS_TextField_ac24ea3b7a074a8d848807d03893de67(eventobject) {
        var self = this;
        this.cvvCheck();
    },
    /** onBeginEditing defined for tbxUserName **/
    AS_TextField_b0575a0a11f040f797d37f5bce086744: function AS_TextField_b0575a0a11f040f797d37f5bce086744(eventobject, changedtext) {
        var self = this;
        showSuggestion = true;
        this.showUserNamesBasedOnlength()
        this.setFocusSkin(this.view.main.flxUserName);
    },
    /** onEndEditing defined for tbxUserName **/
    AS_TextField_b1c4f184bb1945bf8e47ea059f3943df: function AS_TextField_b1c4f184bb1945bf8e47ea059f3943df(eventobject, changedtext) {
        var self = this;
        this.hideUserNames();
        this.setNormalSkin(this.view.main.flxUserName);
        this.view.main.lblUsernameCapsLocIndicator.setVisibility(false);
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_bf1de934112b4f70977901807615e61a: function AS_TextField_bf1de934112b4f70977901807615e61a(eventobject) {
        var self = this;
        this.otpCheck();
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_c6a7a82462c546b9abba02eda9cff2b4: function AS_TextField_c6a7a82462c546b9abba02eda9cff2b4(eventobject, changedtext) {
        var self = this;
        this.reTypeOTP();
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_fb0806dafe244e4da987e61bd9d771c4: function AS_TextField_fb0806dafe244e4da987e61bd9d771c4(eventobject, changedtext) {
        var self = this;
        this.reEnterCVV();
    },
    /** onKeyUp defined for tbxUserName **/
    AS_TextField_g643432d89eb4ebb89eac19d93014aa2: function AS_TextField_g643432d89eb4ebb89eac19d93014aa2(eventobject) {
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
    AS_TextField_gc57eeba6c864856b1a1998511dc1d39: function AS_TextField_gc57eeba6c864856b1a1998511dc1d39(eventobject) {
        var self = this;
        this.enableLogin(this.view.main.tbxUserName.text.trim(), this.view.main.tbxPassword.text);
        this.capsLockIndicatorForPassword();
    },
    /** onBeginEditing defined for tbxPassword **/
    AS_TextField_j2b4a6971d904ba39e9041b126505309: function AS_TextField_j2b4a6971d904ba39e9041b126505309(eventobject, changedtext) {
        var self = this;
        if (this.view.main.flxPassword.skin == "sknBorderFF0101") {
            this.credentialsMissingUIChangesAnti();
        }
    },
    /** onTouchStart defined for AlterneteActionsSignIn **/
    AS_UWI_a7b9d0f78ffb4359b7302a52cbfe5fa6: function AS_UWI_a7b9d0f78ffb4359b7302a52cbfe5fa6(eventobject, x, y) {
        var self = this;
        this.loginWithVerifiedUserName();
    },
    /** onTouchStart defined for AlterneteActionsEnterPIN **/
    AS_UWI_d63f35e0cf744eaab601100605282f5d: function AS_UWI_d63f35e0cf744eaab601100605282f5d(eventobject, x, y) {
        var self = this;
        this.goToResetUsingOTP();
    },
    /** onTouchStart defined for AlterneteActionsEnterCVV **/
    AS_UWI_d746adef8e92401ab5dfb7e30e1ffe4e: function AS_UWI_d746adef8e92401ab5dfb7e30e1ffe4e(eventobject, x, y) {
        var self = this;
        this.showEnterCVVPage();
    },
    /** onTouchStart defined for AlterneteActionsEnterPIN **/
    AS_UWI_d778b9bcc41d45b0a469db45623da3f3: function AS_UWI_d778b9bcc41d45b0a469db45623da3f3(eventobject, x, y) {
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