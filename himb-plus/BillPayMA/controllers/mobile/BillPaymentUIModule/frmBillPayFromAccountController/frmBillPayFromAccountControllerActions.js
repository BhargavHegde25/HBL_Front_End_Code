define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_b6e7109efd364152b38acd22b0d725a8: function AS_BarButtonItem_b6e7109efd364152b38acd22b0d725a8(eventobject) {
        var self = this;
        applicationManager.setBillPayFlow = "onCancel";
        var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPaymentUIModule");
        billPayMod.presentationController.onCancelClick();
    },
    AS_BarButtonItem_dfecdd8b50054735ba4d70388c764dfc: function AS_BarButtonItem_dfecdd8b50054735ba4d70388c764dfc(eventobject) {
        var self = this;
        return self.customBack.call(this);
    },
    /** preShow defined for frmBillPayFromAccount **/
    AS_Form_faaa5747981c4d58bce6f228944315be: function AS_Form_faaa5747981c4d58bce6f228944315be(eventobject) {
        var self = this;
        this.preShow();
    },
    /** init defined for frmBillPayFromAccount **/
    AS_Form_j011bdac71404a5f8d997eeb3c1b8df3: function AS_Form_j011bdac71404a5f8d997eeb3c1b8df3(eventobject) {
        var self = this;
        this.init();
    }
});