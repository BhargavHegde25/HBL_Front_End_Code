define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for frmCustomerDashboard **/
    AS_Form_bb6eb1496cfb437797a24347605e41ff: function AS_Form_bb6eb1496cfb437797a24347605e41ff(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** init defined for frmCustomerDashboard **/
    AS_Form_c25b0d26cacf460788b0e38a5b51bd9b: function AS_Form_c25b0d26cacf460788b0e38a5b51bd9b(eventobject) {
        var self = this;
        this.initActions();
    },
    /** postShow defined for frmCustomerDashboard **/
    AS_Form_cae1ae1b7ed549afa3a84ebb5e8adda1: function AS_Form_cae1ae1b7ed549afa3a84ebb5e8adda1(eventobject) {
        var self = this;
        this.onLoadChangePointer();
        this.postShow();
        this.setContextualMenuLeft();
    },
    /** onBreakpointChange defined for frmCustomerDashboard **/
    AS_Form_f262befa4a7d435796a7c625e9e7be2b: function AS_Form_f262befa4a7d435796a7c625e9e7be2b(eventobject, breakpoint) {
        var self = this;
        this.onBreakpointChange(breakpoint);
    },
    /** onDeviceBack defined for frmCustomerDashboard **/
    AS_Form_h784ff98d71e4013aa166855b9c6ab5d: function AS_Form_h784ff98d71e4013aa166855b9c6ab5d(eventobject) {
        var self = this;
        kony.print("Back Button is clicked");
    },
    /** preShow defined for frmCustomerDashboard **/
    AS_Form_h8a1e72a088c4198a505e7dce011ed36: function AS_Form_h8a1e72a088c4198a505e7dce011ed36(eventobject) {
        var self = this;
        this.preShow();
        this.preShowFrmAccountsLanding();
        this.setAccountListData();
    },
    /** onKeyUp defined for LoginUsingSelectedBank.tbxNewUsername **/
    AS_TextField_d17503683a5b4245ab638d74249819d8: function AS_TextField_d17503683a5b4245ab638d74249819d8(eventobject) {
        var self = this;
        this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text);
    },
    /** onKeyUp defined for SelectBankOrVendor.tbxName **/
    AS_TextField_g0658ad38fdb4668abebb3332301c07d: function AS_TextField_g0658ad38fdb4668abebb3332301c07d(eventobject) {
        var self = this;
        this.onTextChangeOfExternalBankSearch();
    },
    /** onKeyUp defined for LoginUsingSelectedBank.tbxEnterpassword **/
    AS_TextField_g549b9bdf0a4413baacb4ad5d387e2a3: function AS_TextField_g549b9bdf0a4413baacb4ad5d387e2a3(eventobject) {
        var self = this;
        this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text);
    }
});