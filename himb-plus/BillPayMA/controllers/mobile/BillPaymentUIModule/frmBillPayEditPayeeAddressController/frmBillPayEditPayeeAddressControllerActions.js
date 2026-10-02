define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_BarButtonItem_e2757afb4342466ea660eceac14f4f0b: function AS_BarButtonItem_e2757afb4342466ea660eceac14f4f0b(eventobject) {
        var self = this;
        var navMan = applicationManager.getNavigationManager();
        navMan.goBack();
    },
    AS_BarButtonItem_f375eb8ffc7d40d8a922801abda4d10c: function AS_BarButtonItem_f375eb8ffc7d40d8a922801abda4d10c(eventobject) {
        var self = this;
        return self.onClickCancel.call(this);
    },
    /** preShow defined for frmBillPayEditPayeeAddress **/
    AS_Form_fead43d589694f7f8c9b297c28a3ddfd: function AS_Form_fead43d589694f7f8c9b297c28a3ddfd(eventobject) {
        var self = this;
        this.preShow();
    }
});