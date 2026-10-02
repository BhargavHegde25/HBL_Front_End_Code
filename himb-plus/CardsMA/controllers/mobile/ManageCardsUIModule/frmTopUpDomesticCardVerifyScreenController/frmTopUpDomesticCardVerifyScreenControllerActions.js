define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnRight **/
    AS_Button_g438ea124b7c4b89b07eb10c9574e937: function AS_Button_g438ea124b7c4b89b07eb10c9574e937(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation({
            "appName": "CardsMA",
            "friendlyName": "frmTopUpDomesticPrepaidCardAckScreen"
        });
        ntf.navigate();
    },
    /** postShow defined for frmTopUpDomesticCardVerifyScreen **/
    AS_Form_af0503341eac42339bc5cd1a666f6c75: function AS_Form_af0503341eac42339bc5cd1a666f6c75(eventobject) {
        var self = this;
        this.postShow();
    },
    /** preShow defined for frmTopUpDomesticCardVerifyScreen **/
    AS_Form_e7fa1df9b8c6434388c4d45f0a4d08f9: function AS_Form_e7fa1df9b8c6434388c4d45f0a4d08f9(eventobject) {
        var self = this;
        this.preShow();
    },
    AS_BarButtonItem_d6ef6814db3246fb93ab732d60258a29: function AS_BarButtonItem_d6ef6814db3246fb93ab732d60258a29(eventobject) {
        var self = this;
        this.onCancelClick();
    },
    AS_BarButtonItem_cc47f813245843b3bbd7146da433358a: function AS_BarButtonItem_cc47f813245843b3bbd7146da433358a(eventobject) {
        var self = this;
        this.navBack();
    }
});