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
    /** init defined for frmFirst **/
    AS_Form_b9c1707ed3fc40ba8e0060b47329a64b: function AS_Form_b9c1707ed3fc40ba8e0060b47329a64b(eventobject) {
        var self = this;
        return self.init.call(this);
    },
    /** preShow defined for frmFirst **/
    AS_Form_f9995c65d8c34bdeae481c5ac249a469: function AS_Form_f9995c65d8c34bdeae481c5ac249a469(eventobject) {
        var self = this;
        this.preShow();
        this.TransferNew();
    },
    /** postShow defined for frmFirst **/
    AS_Form_gb7ee1aae75b4534b15c2c77b5b387f6: function AS_Form_gb7ee1aae75b4534b15c2c77b5b387f6(eventobject) {
        var self = this;
        this.postShow();
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