define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_f1c6ee9e787b4f82bdeecab60260c466: function AS_BarButtonItem_f1c6ee9e787b4f82bdeecab60260c466(eventobject) {
        var self = this;
        var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        transferModule.presentationController.cancelCommon();
    },
    /** onClick defined for btnContinue **/
    AS_Button_jf9de2a245f04ad79bce9b4de67dc9c9: function AS_Button_jf9de2a245f04ad79bce9b4de67dc9c9(eventobject) {
        var self = this;
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
        billPayMod.presentationController.commonFunctionForNavigation("frmBillPay");
    },
    /** init defined for frmBillPayConfirmation **/
    AS_Form_f58adfd38d30494a833dc7970d5049c7: function AS_Form_f58adfd38d30494a833dc7970d5049c7(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmBillPayConfirmation **/
    AS_Form_fc9fa43e93794226be55b07e7d5811c4: function AS_Form_fc9fa43e93794226be55b07e7d5811c4(eventobject) {
        var self = this;
        this.preShow();
    }
});