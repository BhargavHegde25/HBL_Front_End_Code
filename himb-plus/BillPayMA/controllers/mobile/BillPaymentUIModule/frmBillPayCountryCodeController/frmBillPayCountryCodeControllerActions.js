define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_ca8652e977f540178ccdd06729edb306: function AS_BarButtonItem_ca8652e977f540178ccdd06729edb306(eventobject) {
        var self = this;
        this.onCancel();
    },
    /** onClick defined for btnRight **/
    AS_Button_fcb5b3b7a9fa44279a931fe8808855a0: function AS_Button_fcb5b3b7a9fa44279a931fe8808855a0(eventobject) {
        var self = this;
        var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authMod.presentationController.commonFunctionForNavigation("frmLogin");
    },
    /** onClick defined for flxBack **/
    AS_FlexContainer_fa8a07af79e04e4eb39ac345b0d9015c: function AS_FlexContainer_fa8a07af79e04e4eb39ac345b0d9015c(eventobject) {
        var self = this;
        var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authMod.presentationController.commonFunctionForNavigation("frmLogin");
    },
    /** init defined for frmBillPayCountryCode **/
    AS_Form_b6b5ee83930d49e3bfe4bab566d101aa: function AS_Form_b6b5ee83930d49e3bfe4bab566d101aa(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmBillPayCountryCode **/
    AS_Form_i0228bed171a419fb4ca3e4b2c17b6b4: function AS_Form_i0228bed171a419fb4ca3e4b2c17b6b4(eventobject) {
        var self = this;
        this.preShow();
    }
});