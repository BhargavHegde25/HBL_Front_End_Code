define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_e20f3bdd24864eaaadf9153ccc3c8a96: function AS_BarButtonItem_e20f3bdd24864eaaadf9153ccc3c8a96(eventobject) {
        var self = this;
        var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        transferModule.presentationController.cancelCommon();
    },
    /** onClick defined for btnContinue **/
    AS_Button_b549d8029bc04149a051d6c0b5834f68: function AS_Button_b549d8029bc04149a051d6c0b5834f68(eventobject) {
        var self = this;
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        billPayMod.presentationController.commonFunctionForNavigation("frmBillPayConfirmation");
    },
    /** init defined for frmBillPayEndDate **/
    AS_Form_a69b60482b6a4f2c90c44adeacc4970c: function AS_Form_a69b60482b6a4f2c90c44adeacc4970c(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmBillPayEndDate **/
    AS_Form_e759029b699349b680ce42acc6798565: function AS_Form_e759029b699349b680ce42acc6798565(eventobject) {
        var self = this;
        this.preShow();
    }
});