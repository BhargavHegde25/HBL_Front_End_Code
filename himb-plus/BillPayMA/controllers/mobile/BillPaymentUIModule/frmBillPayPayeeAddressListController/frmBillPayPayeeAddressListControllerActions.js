define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_dc031b42a7bb4ae9b60cc6f30e76f9b7: function AS_BarButtonItem_dc031b42a7bb4ae9b60cc6f30e76f9b7(eventobject) {
        var self = this;
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.commonFunctionForNavigation("frmTransfers");
    },
    /** preShow defined for frmBillPayPayeeAddressList **/
    AS_Form_d8edde9aaedb4809a0ced1972b357ba1: function AS_Form_d8edde9aaedb4809a0ced1972b357ba1(eventobject) {
        var self = this;
        this.preShow();
    }
});