define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnNewDashboard **/
    AS_Button_g810c69807684403b331330cb298b3c4: function AS_Button_g810c69807684403b331330cb298b3c4(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "HomepageMA",
            "friendlyName": "frmHBLDashboard"
        });
        ntf.navigate({
            "_meta_": {
                "eventName": "onClick",
                "widgetId": "btnNewDashboard"
            }
        });
    },
    /** onDeviceBack defined for frmDashboard **/
    AS_Form_d506ed7c52cb4589a33912a0794f9141: function AS_Form_d506ed7c52cb4589a33912a0794f9141(eventobject) {
        var self = this;
        kony.print("Back Button is clicked");
    },
    /** onTouchEnd defined for frmDashboard **/
    AS_Form_d9c1e51b263f438baf5798410c19e950: function AS_Form_d9c1e51b263f438baf5798410c19e950(eventobject, x, y) {
        var self = this;
        hidePopups();
    },
    /** postShow defined for frmDashboard **/
    AS_Form_dfd25b7de82c4bdf8c79d18c84c5312c: function AS_Form_dfd25b7de82c4bdf8c79d18c84c5312c(eventobject) {
        var self = this;
        this.onLoadChangePointer();
        this.postShow();
        this.setContextualMenuLeft();
    },
    /** onBreakpointChange defined for frmDashboard **/
    AS_Form_e0cecb4fa6fa414da4a7eefd732fd884: function AS_Form_e0cecb4fa6fa414da4a7eefd732fd884(eventobject, breakpoint) {
        var self = this;
        this.onBreakpointChange(breakpoint);
    },
    /** init defined for frmDashboard **/
    AS_Form_g600506c0ff3442c97ebbbb5c17cd89f: function AS_Form_g600506c0ff3442c97ebbbb5c17cd89f(eventobject) {
        var self = this;
        this.initActions();
    },
    /** preShow defined for frmDashboard **/
    AS_Form_g7a45b4f0f4245a0868b4f66499f6901: function AS_Form_g7a45b4f0f4245a0868b4f66499f6901(eventobject) {
        var self = this;
        this.preShow();
        this.preShowFrmAccountsLanding();
        this.setAccountListData();
    },
    /** onKeyUp defined for SelectBankOrVendor.tbxName **/
    AS_TextField_d3ff6d78c5f64093a1b76e9bfc518ceb: function AS_TextField_d3ff6d78c5f64093a1b76e9bfc518ceb(eventobject) {
        var self = this;
        this.onTextChangeOfExternalBankSearch();
    },
    /** onKeyUp defined for LoginUsingSelectedBank.tbxEnterpassword **/
    AS_TextField_d9850e72ffdc42efa263e6a04be8a763: function AS_TextField_d9850e72ffdc42efa263e6a04be8a763(eventobject) {
        var self = this;
        this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text);
    },
    /** onKeyUp defined for LoginUsingSelectedBank.tbxNewUsername **/
    AS_TextField_h8eb3d5782684f68a8fd259e816c42be: function AS_TextField_h8eb3d5782684f68a8fd259e816c42be(eventobject) {
        var self = this;
        this.enableOrDisableExternalLogin(this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxNewUsername.text, this.view.AddExternalAccounts.LoginUsingSelectedBank.tbxEnterpassword.text);
    }
});