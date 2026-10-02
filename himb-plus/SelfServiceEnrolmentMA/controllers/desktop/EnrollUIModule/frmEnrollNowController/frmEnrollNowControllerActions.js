define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnNext **/
    AS_Button_a4ac98db97304acd816953d2fd45cd6e: function AS_Button_a4ac98db97304acd816953d2fd45cd6e(eventobject) {
        var self = this;
        this.isOTPCorrect();
    },
    /** onClick defined for btnBackToLogin **/
    AS_Button_a8eef43fd77c4b69b0a0d7354e48117b: function AS_Button_a8eef43fd77c4b69b0a0d7354e48117b(eventobject) {
        var self = this;
        this.goToLogin();
    },
    /** onClick defined for btnLoginLater **/
    AS_Button_ad9b6bbadb884deca296b8fb15cf8c27: function AS_Button_ad9b6bbadb884deca296b8fb15cf8c27(eventobject) {
        var self = this;
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.showLoginScreen();
    },
    /** onClick defined for btnSetSecurityQuestionsCancel **/
    AS_Button_b421538571184a66b388559812a6d86b: function AS_Button_b421538571184a66b388559812a6d86b(eventobject) {
        var self = this;
        this.onCancelSecurityQuestions();
    },
    /** onClick defined for btnSetSecurityQuestionsProceed **/
    AS_Button_c7b59ffb265244959417dfc45f9b7ffb: function AS_Button_c7b59ffb265244959417dfc45f9b7ffb(eventobject) {
        var self = this;
        this.onProceedSQ();
    },
    /** onClick defined for btnResendOTP **/
    AS_Button_dcd6d43d9f934985991e420eea27c094: function AS_Button_dcd6d43d9f934985991e420eea27c094(eventobject) {
        var self = this;
        this.resendOTPValue();
    },
    /** onClick defined for btnProceed **/
    AS_Button_dcf8539756e4499993bbc38c7718b40b: function AS_Button_dcf8539756e4499993bbc38c7718b40b(eventobject) {
        var self = this;
        this.updateSecurityQuestions();
    },
    /** onClick defined for btnUseOTP **/
    AS_Button_e1f38c4db7644c9bb10877bb3c1ca82a: function AS_Button_e1f38c4db7644c9bb10877bb3c1ca82a(eventobject) {
        var self = this;
        this.useOTPForReset();
    },
    /** onClick defined for btnProceed **/
    AS_Button_ee8bfbf413e041f984cfa55c03dffb65: function AS_Button_ee8bfbf413e041f984cfa55c03dffb65(eventobject) {
        var self = this;
        this.verifyUserDetails();
    },
    /** onClick defined for btnUseCVV **/
    AS_Button_f3a27dd0c5884e79ba8975b6800e8ea4: function AS_Button_f3a27dd0c5884e79ba8975b6800e8ea4(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnUseCVV **/
    AS_Button_fc10b48d9d1c467690881dd39a1433f3: function AS_Button_fc10b48d9d1c467690881dd39a1433f3(eventobject) {
        var self = this;
        this.useCVVForReset();
    },
    /** onClick defined for btnProceed **/
    AS_Button_feae1769d354440b8d25b5581061d8c7: function AS_Button_feae1769d354440b8d25b5581061d8c7(eventobject) {
        var self = this;
        this.securityQuesAnsProceed();
    },
    /** onClick defined for btnProceed **/
    AS_Button_gc2fe90b98d04ef9b8125963a55311b6: function AS_Button_gc2fe90b98d04ef9b8125963a55311b6(eventobject) {
        var self = this;
        this.verifyUserDetails();
    },
    /** onClick defined for btnNext **/
    AS_Button_h08129946fca478c8d44c0ab65511028: function AS_Button_h08129946fca478c8d44c0ab65511028(eventobject) {
        var self = this;
        this.requestOTPValue();
    },
    /** onClick defined for btnNext **/
    AS_Button_ifacc90ce3d342c5b32da91c7a6c6e42: function AS_Button_ifacc90ce3d342c5b32da91c7a6c6e42(eventobject) {
        var self = this;
        this.isCVVCorrect();
    },
    /** onClick defined for flxViewHideCVV **/
    AS_FlexContainer_fe0be06b9ac64653bf2b2d24a1df08ed: function AS_FlexContainer_fe0be06b9ac64653bf2b2d24a1df08ed(eventobject) {
        var self = this;
        this.showCVV();
    },
    /** postShow defined for frmEnrollNow **/
    AS_Form_a96fba2f050442c6ac1ebee41f29e2b9: function AS_Form_a96fba2f050442c6ac1ebee41f29e2b9(eventobject) {
        var self = this;
        this.onPostShow();
    },
    /** preShow defined for frmEnrollNow **/
    AS_Form_b4ec7767960e4f978c897f3f29856a8c: function AS_Form_b4ec7767960e4f978c897f3f29856a8c(eventobject) {
        var self = this;
        this.preshowFrmLogin();
    },
    /** onBreakpointChange defined for frmEnrollNow **/
    AS_Form_ccd28ca812444b5abec806a14c54973d: function AS_Form_ccd28ca812444b5abec806a14c54973d(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** onTouchEnd defined for frmEnrollNow **/
    AS_Form_g92f0de3822e4f0eaacec0708d95cf05: function AS_Form_g92f0de3822e4f0eaacec0708d95cf05(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** onDeviceBack defined for frmEnrollNow **/
    AS_Form_i750d7fa3a424782b31515a203b6b1ca: function AS_Form_i750d7fa3a424782b31515a203b6b1ca(eventobject) {
        var self = this;
        //Need to Consolidate
        kony.print("Back button pressed");
    },
    /** init defined for frmEnrollNow **/
    AS_Form_j2c694db7f3b4081815dbdb9e6669ba0: function AS_Form_j2c694db7f3b4081815dbdb9e6669ba0(eventobject) {
        var self = this;
        this.frmEnrollInit();
    },
    /** onTouchStart defined for imgViewCVV **/
    AS_Image_e8fd4567261c422d80f7845cc2af7b71: function AS_Image_e8fd4567261c422d80f7845cc2af7b71(eventobject, x, y) {
        var self = this;
        this.showOTP();
    },
    /** onTouchStart defined for imgViewCVV **/
    AS_Image_j2acf91c13184a85b4b76aedbed08508: function AS_Image_j2acf91c13184a85b4b76aedbed08508(eventobject, x, y) {
        var self = this;
        //this.showCVV();/
    },
    /** onTouchStart defined for lblHowToEnroll **/
    AS_Label_i91cb93887364b769b9fd4dce05b1fbd: function AS_Label_i91cb93887364b769b9fd4dce05b1fbd(eventobject, x, y) {
        var self = this;
        this.returnToLogin();
    },
    /** onSelection defined for lbxQuestion4 **/
    AS_ListBox_af31dd4e16594b71afd33203d7a38413: function AS_ListBox_af31dd4e16594b71afd33203d7a38413(eventobject) {
        var self = this;
        this.setQuestionForListBox4();
    },
    /** onSelection defined for lbxQuestion1 **/
    AS_ListBox_d19715af59fa4e5691aab2465284e2bf: function AS_ListBox_d19715af59fa4e5691aab2465284e2bf(eventobject) {
        var self = this;
        this.setQuestionForListBox1();
    },
    /** onSelection defined for lbxQuestion5 **/
    AS_ListBox_e2882689029844fc9c6286c39a7a2cfc: function AS_ListBox_e2882689029844fc9c6286c39a7a2cfc(eventobject) {
        var self = this;
        this.setQuestionForListBox5();
    },
    /** onSelection defined for lbxQuestion3 **/
    AS_ListBox_g189f4e38a0a49689bfa3ddc2687e0e7: function AS_ListBox_g189f4e38a0a49689bfa3ddc2687e0e7(eventobject) {
        var self = this;
        this.setQuestionForListBox3();
    },
    /** onSelection defined for lbxQuestion2 **/
    AS_ListBox_j3b62e329c1b4fa0981ced02b8d6c257: function AS_ListBox_j3b62e329c1b4fa0981ced02b8d6c257(eventobject) {
        var self = this;
        this.setQuestionForListBox2();
    },
    /** onRowClick defined for segLanguagesList **/
    AS_Segment_e50707bd4e63473484ac4cb446dbe93f: function AS_Segment_e50707bd4e63473484ac4cb446dbe93f(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.selectYourLanguage();
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_afab8107f8e446c2b86876e1f394949a: function AS_TextField_afab8107f8e446c2b86876e1f394949a(eventobject, changedtext) {
        var self = this;
        this.reEnterCVV();
    },
    /** onEndEditing defined for tbxAnswer4 **/
    AS_TextField_b3e04719ffc1405ead6a81ae062ea865: function AS_TextField_b3e04719ffc1405ead6a81ae062ea865(eventobject, changedtext) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onEndEditing defined for tbxAnswer5 **/
    AS_TextField_b42641c18e0f4b45a35596c73b2aa689: function AS_TextField_b42641c18e0f4b45a35596c73b2aa689(eventobject, changedtext) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onKeyUp defined for tbxAnswer4 **/
    AS_TextField_bc7f3173e2734cc0aab8572a6e8a76cc: function AS_TextField_bc7f3173e2734cc0aab8572a6e8a76cc(eventobject) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onEndEditing defined for tbxAnswer2 **/
    AS_TextField_c55b57730f0b46b0b9a45f857d35b941: function AS_TextField_c55b57730f0b46b0b9a45f857d35b941(eventobject, changedtext) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onBeginEditing defined for tbxAnswer2 **/
    AS_TextField_ccd36a5b84df4221926ce36f4c8ddba6: function AS_TextField_ccd36a5b84df4221926ce36f4c8ddba6(eventobject, changedtext) {
        var self = this;
        this.onEditingAnswer2();
    },
    /** onKeyUp defined for tbxAnswer3 **/
    AS_TextField_cd23a36a257f4fbfad519df3e8f4532a: function AS_TextField_cd23a36a257f4fbfad519df3e8f4532a(eventobject) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onBeginEditing defined for tbxAnswer5 **/
    AS_TextField_cf41c99d9b1e4f398a4246848d08d195: function AS_TextField_cf41c99d9b1e4f398a4246848d08d195(eventobject, changedtext) {
        var self = this;
        this.onEditingAnswer5();
    },
    /** onBeginEditing defined for tbxAnswer3 **/
    AS_TextField_d1d06aa50cf948de901c477129da4912: function AS_TextField_d1d06aa50cf948de901c477129da4912(eventobject, changedtext) {
        var self = this;
        this.onEditingAnswer3();
    },
    /** onBeginEditing defined for tbxAnswer1 **/
    AS_TextField_e4482e7f2f664429a9315e210712e607: function AS_TextField_e4482e7f2f664429a9315e210712e607(eventobject, changedtext) {
        var self = this;
        this.onEditingAnswer1();
    },
    /** onEndEditing defined for tbxAnswer1 **/
    AS_TextField_e970ae07757c4e969fb123f8b17d3118: function AS_TextField_e970ae07757c4e969fb123f8b17d3118(eventobject, changedtext) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onKeyUp defined for tbxAnswer5 **/
    AS_TextField_e9943a8cade846c1962f647500c80d54: function AS_TextField_e9943a8cade846c1962f647500c80d54(eventobject) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onEndEditing defined for tbxAnswer3 **/
    AS_TextField_ec190dad0597473385edbc20bc8d9a31: function AS_TextField_ec190dad0597473385edbc20bc8d9a31(eventobject, changedtext) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onKeyUp defined for tbxAnswer1 **/
    AS_TextField_ef5e9a24c5504d90b931a2c24fbd16a0: function AS_TextField_ef5e9a24c5504d90b931a2c24fbd16a0(eventobject) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onKeyUp defined for tbxAnswer2 **/
    AS_TextField_efedb0922453453d95970ae6c3aad6d4: function AS_TextField_efedb0922453453d95970ae6c3aad6d4(eventobject) {
        var self = this;
        this.enableSecurityQuestions(this.view.SetSecurityQuestions.tbxAnswer1.text, this.view.SetSecurityQuestions.tbxAnswer2.text, this.view.SetSecurityQuestions.tbxAnswer3.text, this.view.SetSecurityQuestions.tbxAnswer4.text, this.view.SetSecurityQuestions.tbxAnswer5.text);
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_f20dbb4fddca4e45a538f8bf9654a1ca: function AS_TextField_f20dbb4fddca4e45a538f8bf9654a1ca(eventobject) {
        var self = this;
        this.cvvCheck();
    },
    /** onBeginEditing defined for tbxAnswer4 **/
    AS_TextField_ffde4fff69214ab18dc619d7c7367256: function AS_TextField_ffde4fff69214ab18dc619d7c7367256(eventobject, changedtext) {
        var self = this;
        this.onEditingAnswer4();
    },
    /** onBeginEditing defined for tbxCVV **/
    AS_TextField_h030bc5eb17e47d39cbf07fc304cd8fa: function AS_TextField_h030bc5eb17e47d39cbf07fc304cd8fa(eventobject, changedtext) {
        var self = this;
        if (this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible) {
            this.reEnterOTP();
        }
    },
    /** onKeyUp defined for tbxCVV **/
    AS_TextField_j8ae877c189f49b8a0524a2e0b52f219: function AS_TextField_j8ae877c189f49b8a0524a2e0b52f219(eventobject) {
        var self = this;
        this.otpCheck();
    },
    /** onTouchStart defined for AlterneteActionsEnterPIN **/
    AS_UWI_c13e044fb512427b8ea7503d5078016c: function AS_UWI_c13e044fb512427b8ea7503d5078016c(eventobject, x, y) {
        var self = this;
        this.goToResetUsingOTP();
    },
    /** onTouchStart defined for AlterneteActionsEnterCVV **/
    AS_UWI_cad98eb1a8304f689ee3b40cfa08351f: function AS_UWI_cad98eb1a8304f689ee3b40cfa08351f(eventobject, x, y) {
        var self = this;
        this.showEnterCVVPage();
    }
});