define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_df4c6550e4bc492593742867d2510941: function AS_BarButtonItem_df4c6550e4bc492593742867d2510941(eventobject) {
        var self = this;
        var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        transferModule.presentationController.cancelCommon();
    },
    AS_BarButtonItem_e3360441e3ac40cfa3e363cd96612f6c: function AS_BarButtonItem_e3360441e3ac40cfa3e363cd96612f6c(eventobject) {
        var self = this;
        return self.customBack.call(this);
    },
    /** onClick defined for btnSeven **/
    AS_Button_b82af1cd12644430bc32a22636fbecef: function AS_Button_b82af1cd12644430bc32a22636fbecef(eventobject) {
        var self = this;
        this.setKeypadChar(7);
    },
    /** onClick defined for btnChange **/
    AS_Button_c72300d05f6440e38841a8b174ec85f1: function AS_Button_c72300d05f6440e38841a8b174ec85f1(eventobject) {
        var self = this;
        return self.btnContinueOnClick.call(this);
    },
    /** onClick defined for btnContinue **/
    AS_Button_d818649a0fa849218f58d0052887b1a9: function AS_Button_d818649a0fa849218f58d0052887b1a9(eventobject) {
        var self = this;
        return self.btnContinueOnClick.call(this);
    },
    /** onClick defined for btnFive **/
    AS_Button_df0d1a1eeb6c4e37af20fa89f580ac79: function AS_Button_df0d1a1eeb6c4e37af20fa89f580ac79(eventobject) {
        var self = this;
        this.setKeypadChar(5);
    },
    /** onClick defined for btnSix **/
    AS_Button_e07ad692203d457790a74a821af7c955: function AS_Button_e07ad692203d457790a74a821af7c955(eventobject) {
        var self = this;
        this.setKeypadChar(6);
    },
    /** onClick defined for btnTwo **/
    AS_Button_e2128d45f5e94fcc85e492ac104c70aa: function AS_Button_e2128d45f5e94fcc85e492ac104c70aa(eventobject) {
        var self = this;
        this.setKeypadChar(2);
    },
    /** onClick defined for btnDot **/
    AS_Button_e2c7fb9f4e8340e0ac603e9564e2f5c6: function AS_Button_e2c7fb9f4e8340e0ac603e9564e2f5c6(eventobject) {
        var self = this;
        this.setKeypadChar('.');
    },
    /** onClick defined for btnOne **/
    AS_Button_f8c6f7940e1a43579e19e675d8a2659f: function AS_Button_f8c6f7940e1a43579e19e675d8a2659f(eventobject) {
        var self = this;
        this.setKeypadChar(1);
    },
    /** onClick defined for btnEight **/
    AS_Button_fe17aa3f9c134ceaba4f0b4307809089: function AS_Button_fe17aa3f9c134ceaba4f0b4307809089(eventobject) {
        var self = this;
        this.setKeypadChar(8);
    },
    /** onClick defined for btnThree **/
    AS_Button_fe6a7227ee7b4ca9bc2c0f933a0bb351: function AS_Button_fe6a7227ee7b4ca9bc2c0f933a0bb351(eventobject) {
        var self = this;
        this.setKeypadChar(3);
    },
    /** onClick defined for btnFour **/
    AS_Button_g21ccb1e0aa64bada87756e4a335c632: function AS_Button_g21ccb1e0aa64bada87756e4a335c632(eventobject) {
        var self = this;
        this.setKeypadChar(4);
    },
    /** onClick defined for btnZero **/
    AS_Button_h067e162fc9345da99585d343d887fc3: function AS_Button_h067e162fc9345da99585d343d887fc3(eventobject) {
        var self = this;
        this.setKeypadChar(0);
    },
    /** onClick defined for btnNine **/
    AS_Button_jcefc73fc44d4a35ba93da5dedcc1fe3: function AS_Button_jcefc73fc44d4a35ba93da5dedcc1fe3(eventobject) {
        var self = this;
        this.setKeypadChar(9);
    },
    /** init defined for frmBillPayAmount **/
    AS_Form_gcbb1c170143426280794a2c2a96dd6e: function AS_Form_gcbb1c170143426280794a2c2a96dd6e(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmBillPayAmount **/
    AS_Form_hbe49153656c471facf5d27f63ffcf79: function AS_Form_hbe49153656c471facf5d27f63ffcf79(eventobject) {
        var self = this;
        this.preShow();
    },
    /** onTouchEnd defined for imgClearKeypad **/
    AS_Image_h06747e2dadc4fdb88cc1a43838554aa: function AS_Image_h06747e2dadc4fdb88cc1a43838554aa(eventobject, x, y) {
        var self = this;
        this.clearKeypadChar();
    }
});