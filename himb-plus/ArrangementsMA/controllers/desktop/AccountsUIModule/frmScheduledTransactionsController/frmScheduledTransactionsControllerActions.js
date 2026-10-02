define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnBreadcrumb1 **/
    AS_Button_c8b7fd526d4e44a1be8becac26b9d13a: function AS_Button_c8b7fd526d4e44a1be8becac26b9d13a(eventobject) {
        var self = this;
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsModule");
        accountModule.presentationController.showAccountsDashboard();
    },
    /** postShow defined for frmScheduledTransactions **/
    AS_Form_a9697b784a7744cebee02998aba0ab9e: function AS_Form_a9697b784a7744cebee02998aba0ab9e(eventobject) {
        var self = this;
        this.postShowFrmAccountDetails();
    },
    /** init defined for frmScheduledTransactions **/
    AS_Form_b7b2846c756348d39ac4cc3ce4e38c39: function AS_Form_b7b2846c756348d39ac4cc3ce4e38c39(eventobject) {
        var self = this;
        this.initFrmFunction();
    },
    /** onTouchEnd defined for frmScheduledTransactions **/
    AS_Form_b9567a6c74744f83afc2b8d1aaed1629: function AS_Form_b9567a6c74744f83afc2b8d1aaed1629(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** preShow defined for frmScheduledTransactions **/
    AS_Form_cd2b2d8288474cb39159aa005b051e06: function AS_Form_cd2b2d8288474cb39159aa005b051e06(eventobject) {
        var self = this;
        this.preshowFunction();
    },
    /** onDeviceBack defined for frmScheduledTransactions **/
    AS_Form_j6b43ca03b9f43188be1319b21981bac: function AS_Form_j6b43ca03b9f43188be1319b21981bac(eventobject) {
        var self = this;
        //Have to Consolidate
        kony.print("Back Button Pressed");
    },
    /** onTouchEnd defined for accountTypes **/
    AS_UWI_daf7a45c62774d01beb9bf76f25a9b0a: function AS_UWI_daf7a45c62774d01beb9bf76f25a9b0a(eventobject, x, y) {
        var self = this;
        Popupflag = 1;
    }
});