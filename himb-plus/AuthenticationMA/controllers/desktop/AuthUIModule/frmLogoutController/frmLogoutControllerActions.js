define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnYes **/
    AS_Button_c226fb7b57314d28894f20c40ee1ff1b: function AS_Button_c226fb7b57314d28894f20c40ee1ff1b(eventobject) {
        var self = this;
        this.btnYesTakeSurvey();
    },
    /** onClick defined for btnEnroll **/
    AS_Button_e5560a494d924458bc9240c27758a826: function AS_Button_e5560a494d924458bc9240c27758a826(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for btnNo **/
    AS_Button_fa0c887a1cb1471cbd4cf406d78c0655: function AS_Button_fa0c887a1cb1471cbd4cf406d78c0655(eventobject) {
        var self = this;
        this.btnNoTakeSurvey();
    },
    /** onClick defined for btnBackToLogin **/
    AS_Button_hb4e02e809db4e1bae0ba4b9556b99ea: function AS_Button_hb4e02e809db4e1bae0ba4b9556b99ea(eventobject) {
        var self = this;
        this.loginLater(this.view.flxEnrollOrServerError);
    },
    /** onClick defined for flxCross **/
    AS_Button_hd8353e0f2864247ad1de7e3de3de681: function AS_Button_hd8353e0f2864247ad1de7e3de3de681(eventobject) {
        var self = this;
        this.onFeedbackCrossClick();
    },
    /** onClick defined for btnProceed **/
    AS_Button_jd5c081d37894791b4928aedb8beaa5f: function AS_Button_jd5c081d37894791b4928aedb8beaa5f(eventobject) {
        var self = this;
        this.letsGetStarted();
    },
    /** init defined for frmLogout **/
    AS_Form_b7812fe2d9234913a9f7aa9e8775f40e: function AS_Form_b7812fe2d9234913a9f7aa9e8775f40e(eventobject) {
        var self = this;
        this.frmLoginInit();
    },
    /** onDeviceBack defined for frmLogout **/
    AS_Form_df9059e362b6444a82d194b315dc1526: function AS_Form_df9059e362b6444a82d194b315dc1526(eventobject) {
        var self = this;
        kony.print("User pressed back button");
    },
    /** postShow defined for frmLogout **/
    AS_Form_fdde57133c1e42fcb2459cab9b31c488: function AS_Form_fdde57133c1e42fcb2459cab9b31c488(eventobject) {
        var self = this;
        this.onPostShow();
    },
    /** preShow defined for frmLogout **/
    AS_Form_fe0db28461124300ba070ab83648aec3: function AS_Form_fe0db28461124300ba070ab83648aec3(eventobject) {
        var self = this;
        this.onPreShow();
    },
    /** onBreakpointChange defined for frmLogout **/
    AS_Form_j13c2775b263479a9a1d152b0d608c0d: function AS_Form_j13c2775b263479a9a1d152b0d608c0d(eventobject, breakpoint) {
        var self = this;
        return self.onBreakpointChange.call(this, breakpoint);
    },
    /** onTouchEnd defined for frmLogout **/
    AS_Form_ja6a1c95eec5449aad1834e0f47bfc18: function AS_Form_ja6a1c95eec5449aad1834e0f47bfc18(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** onTouchStart defined for lblHowToEnroll **/
    AS_Label_hbeccaed576f4fe2b9a931795bd748aa: function AS_Label_hbeccaed576f4fe2b9a931795bd748aa(eventobject, x, y) {
        var self = this;
        this.returnToLogin();
    },
    /** onRowClick defined for segLanguagesList **/
    AS_Segment_e35327828272483cb069075c61b9360a: function AS_Segment_e35327828272483cb069075c61b9360a(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this.selectYourLanguage();
    },
    /** onTouchStart defined for AlterneteActionsResetPassword **/
    AS_UWI_ca0c9310a1aa47c38fc7ccf76469ece5: function AS_UWI_ca0c9310a1aa47c38fc7ccf76469ece5(eventobject, x, y) {
        var self = this;
        this.goToPasswordResetOptionsPage();
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
    },
    /** onTouchStart defined for AlterneteActionsSignIn **/
    AS_UWI_je608273a6454f06a4d2f35db01cc151: function AS_UWI_je608273a6454f06a4d2f35db01cc151(eventobject, x, y) {
        var self = this;
        this.loginWithVerifiedUserName();
    }
});