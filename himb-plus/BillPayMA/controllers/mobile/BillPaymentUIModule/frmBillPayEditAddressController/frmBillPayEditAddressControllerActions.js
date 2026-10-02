define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_b19265ba04d84bf7b45460a32b138bb3: function AS_BarButtonItem_b19265ba04d84bf7b45460a32b138bb3(eventobject) {
        var self = this;
        this.onClickCancel();
    },
    AS_BarButtonItem_c08dc29ed951401b9832a6ae61965a3c: function AS_BarButtonItem_c08dc29ed951401b9832a6ae61965a3c(eventobject) {
        var self = this;
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    /** init defined for frmBillPayEditAddress **/
    AS_Form_de691ff2d4dc41268f0ba311fc5176a3: function AS_Form_de691ff2d4dc41268f0ba311fc5176a3(eventobject) {
        var self = this;
        this.init();
    },
    /** preShow defined for frmBillPayEditAddress **/
    AS_Form_h1278d97abc54556ae245fb10cd7966b: function AS_Form_h1278d97abc54556ae245fb10cd7966b(eventobject) {
        var self = this;
        this.preShow();
    }
});