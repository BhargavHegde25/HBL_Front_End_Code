define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_b284f31de0af40a1b455352be2b24c5a: function AS_BarButtonItem_b284f31de0af40a1b455352be2b24c5a(eventobject) {
        var self = this;
        var transferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        transferModule.presentationController.cancelCommon();
    },
    /** preShow defined for frmBillPayFrequency **/
    AS_Form_a39021b32cbc4251b00ffcff371790ef: function AS_Form_a39021b32cbc4251b00ffcff371790ef(eventobject) {
        var self = this;
        this.preShow();
    },
    /** init defined for frmBillPayFrequency **/
    AS_Form_b353ebd5d1c14ef68c9188fecf35245a: function AS_Form_b353ebd5d1c14ef68c9188fecf35245a(eventobject) {
        var self = this;
        this.init();
    }
});